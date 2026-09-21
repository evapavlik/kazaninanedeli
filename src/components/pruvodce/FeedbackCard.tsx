"use client";

import { useState, type RefObject } from "react";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";
import { useAiNotes } from "@/hooks/useAiNotes";
import { useSunday } from "@/hooks/useSunday";
import { readStream } from "./TermAnswer";

interface FeedbackCardProps {
  artifacts: SermonArtifacts;
  /** The sermon textarea — „kde:" selects the quoted place in it. */
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

interface Point {
  text: string;
  where?: string;
}
interface Section {
  heading: string;
  points: Point[];
}

const HEADINGS = ["Co se podařilo", "Na čem ještě zapracovat"] as const;

/** The stream comes as „## Nadpis / - bod / kde: úryvek" — fold it into sections as it arrives. */
function parse(text: string): Section[] {
  const sections: Section[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const heading = line.replace(/^[#*\s]+|[*:\s]+$/g, "");
    if ((HEADINGS as readonly string[]).includes(heading)) {
      sections.push({ heading, points: [] });
      continue;
    }
    const cur = sections[sections.length - 1];
    if (!cur) continue;
    const where = line.match(/^[-*]?\s*kde:\s*(.+)$/i);
    if (where) {
      const last = cur.points[cur.points.length - 1];
      if (last) last.where = where[1].replace(/^[„"“]+|["“”]+$/g, "").trim();
      continue;
    }
    const point = line.match(/^[-*•]\s+(.+)$/);
    if (point) cur.points.push({ text: point[1].replace(/\*\*/g, "") });
    else {
      const last = cur.points[cur.points.length - 1];
      if (last) last.text += ` ${line.replace(/\*\*/g, "")}`;
    }
  }
  return sections;
}

/** What the preacher wrote about the sermon before writing it — labelled, non-empty only. */
function preparationLines(a: SermonArtifacts): string[] {
  const fields: [keyof SermonArtifacts, string][] = [
    ["sermonThesis", "Jádro kázání"],
    ["centralIdea", "Centrální myšlenka textu"],
    ["outlinePoints", "Osnova"],
    ["listenerSituation", "Situace posluchačů"],
    ["textListenerBridge", "Most text–život"],
    ["illustrations", "Ilustrace"],
    ["takeaway", "Co si mají odnést"],
  ];
  return fields
    .filter(([k]) => a[k]?.trim())
    .map(([k, label]) => `${label}: ${a[k].trim().replace(/\s+/g, " ")}`);
}

/**
 * The sermon text read by a colleague — on request, under the text. Two
 * sections: what works, what still needs work. Each point names a place in
 * the text; clicking it selects that place. Nothing is rewritten.
 */
export default function FeedbackCard({ artifacts, textareaRef }: FeedbackCardProps) {
  const [text, setText] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [reviewed, setReviewed] = useState<string>("");
  const { add } = useAiNotes();
  const sunday = useSunday();

  const sermon = artifacts.sermonText ?? "";
  const words = sermon.trim() ? sermon.trim().split(/\s+/).length : 0;
  const tooShort = words < 40;
  const stale = text !== null && !busy && sermon !== reviewed;

  const run = async () => {
    if (busy || tooShort) return;
    setBusy(true);
    setError(null);
    setSaved(false);
    setText("");
    setReviewed(sermon);
    try {
      const res = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sunday: sunday.entry?.sundayName ?? "",
          readings: sunday.readings
            .filter((r) => r.lectionary)
            .map((r) => ({ label: r.label, reference: r.lectionary!.reference })),
          sermonText: sermon,
          preparation: preparationLines(artifacts),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Chyba ${res.status}`);
      }
      await readStream(res, (s) => setText((t) => (t ?? "") + s));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Zpětnou vazbu se nepodařilo sestavit.");
    } finally {
      setBusy(false);
    }
  };

  // Select the quoted place in the textarea and scroll it into view. The
  // model quotes „exactly as written", but a stray comma is enough to miss —
  // fall back to the first few words.
  const locate = (quote: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const value = ta.value;
    const lower = value.toLowerCase();
    let needle = quote.toLowerCase();
    let idx = lower.indexOf(needle);
    if (idx < 0) {
      needle = needle.split(/\s+/).slice(0, 4).join(" ");
      idx = lower.indexOf(needle);
    }
    if (idx < 0) return;
    ta.focus();
    ta.setSelectionRange(idx, idx + needle.length);
    const lineHeight = parseFloat(getComputedStyle(ta).lineHeight) || 20;
    const line = value.slice(0, idx).split("\n").length;
    ta.scrollTop = Math.max(0, (line - 3) * lineHeight);
  };

  const saveNote = () => {
    if (!text) return;
    const plain = parse(text)
      .map((s) => `${s.heading}:\n${s.points.map((p) => `• ${p.text}`).join("\n")}`)
      .join("\n\n");
    add({ kind: "feedback", reference: "", text: plain });
    setSaved(true);
  };

  const readingsLine = sunday.readings
    .filter((r) => r.lectionary)
    .map((r) => r.lectionary!.reference)
    .join(" · ");
  const thesis = artifacts.sermonThesis?.trim();

  return (
    <div className="mt-3">
      {text === null ? (
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={run}
            disabled={tooShort}
            title={tooShort ? "Nejdřív napiš aspoň pár odstavců" : "Co se podařilo a na čem ještě zapracovat"}
            className="flex items-center gap-2 rounded-lg border border-sage/40 bg-sage-pale px-3 py-2 text-[12px] font-semibold text-sage transition-colors hover:bg-[#dfece8] disabled:opacity-50"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h12v8H6l-4 3z" />
              <path d="M5 6.5h6M5 8.5h4" />
            </svg>
            {`Chci zpětnou vazbu`}
          </button>
          <span className="text-[11px] italic text-text-light">
            {`Co se podařilo a na čem ještě zapracovat. Nepřepisuje, jen ukazuje.`}
          </span>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-sage/35 bg-[#fbfdfc]">
          <div className="border-b border-sage/20 bg-sage-pale px-3.5 py-2.5">
            <div className="font-lora text-[13.5px] font-bold text-text">{`Zpětná vazba`}</div>
            <div className="mt-0.5 text-[10.5px] leading-snug text-text-muted">
              {thesis ? (
                <>
                  {`Čteno vedle tvého jádra kázání `}
                  <b className="font-semibold text-text">{`„${thesis.length > 90 ? thesis.slice(0, 90) + "…" : thesis}"`}</b>
                  {readingsLine ? ` a čtení · ${readingsLine}` : ""}
                </>
              ) : readingsLine ? (
                `Čteno vedle čtení · ${readingsLine}`
              ) : (
                `Čteno bez tvé přípravy — jádro a osnova zatím prázdné`
              )}
            </div>
          </div>

          {error ? (
            <p className="px-3.5 py-3 text-[12.5px] text-brick">{error}</p>
          ) : (
            <div className="px-3.5 pb-1 pt-3">
              {parse(text).map((s) => (
                <div key={s.heading} className="mb-3">
                  <h4 className="mb-1 flex items-center gap-2 font-lora text-[13px] font-bold text-text">
                    <span
                      className={`h-2 w-2 rounded-full ${s.heading === HEADINGS[0] ? "bg-sage" : "bg-brick"}`}
                    />
                    {s.heading}
                  </h4>
                  {s.points.map((p, i) => (
                    <div
                      key={i}
                      className="flex gap-2.5 border-t border-border py-2 text-[12.5px] leading-[1.6] text-text first:border-t-0"
                    >
                      <span className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-cream text-[10px] font-bold text-text-muted">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        {p.text}
                        {p.where && (
                          <button
                            onClick={() => locate(p.where!)}
                            title="Najít v textu"
                            className="mt-1 block border-l-2 border-sand pl-2 text-left font-lora text-[11px] italic text-text-muted hover:border-brick hover:text-text"
                          >
                            <span className="mr-1 font-sans text-[9.5px] font-semibold uppercase not-italic tracking-[0.1em] text-text-light">
                              kde:
                            </span>
                            {`„${p.where}"`}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {busy && (
                <p className="mb-2 text-[12px] text-text-light">
                  {text ? <span className="animate-pulse text-sage">{"▍"}</span> : `Čtu kázání…`}
                </p>
              )}
            </div>
          )}

          {stale && (
            <p className="mx-3.5 mb-2 rounded-lg border border-[#f0dcb0] bg-[#fff7e6] px-2.5 py-1.5 text-[11px] text-[#7a5a12]">
              {`Text kázání se od té doby změnil — zpětná vazba je k předchozí verzi.`}
            </p>
          )}

          {!busy && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-3.5 py-2 text-[10.5px] text-text-light">
              <span>{`Zpětná vazba není známka. Kázání je tvoje — vezmi si, co ti sedí.`}</span>
              <span className="flex gap-1.5">
                <button
                  onClick={run}
                  className="rounded-lg border border-border bg-white px-2.5 py-1 text-[11.5px] font-semibold text-text-muted hover:border-sage hover:text-sage"
                >
                  {`Znovu`}
                </button>
                {!error && (
                  <button
                    onClick={saveNote}
                    disabled={saved}
                    className="rounded-lg bg-sage px-2.5 py-1 text-[11.5px] font-semibold text-white hover:bg-sage-light disabled:opacity-60"
                  >
                    {saved ? `Uloženo ✓` : `Uložit do zápisníku`}
                  </button>
                )}
                <button
                  onClick={() => setText(null)}
                  className="rounded-lg px-2.5 py-1 text-[11.5px] font-semibold text-text-muted hover:text-text"
                >
                  {`Zavřít`}
                </button>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
