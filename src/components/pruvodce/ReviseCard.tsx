"use client";

import { useMemo, useState } from "react";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";
import { useSunday } from "@/hooks/useSunday";
import { readStream } from "./TermAnswer";

interface ReviseCardProps {
  artifacts: SermonArtifacts;
  /** Replaces the whole sermon text once she accepts the marked version. */
  onReplace: (text: string) => void;
}

/** One run of text: hers, an addition [[…]], or a proposed cut {{…}}. */
interface Chunk {
  kind: "keep" | "add" | "cut";
  text: string;
  /** Index among add/cut chunks — the key her ✓/✕ toggles. */
  markIndex?: number;
}

/** Split the marked stream into runs. Unclosed markers stream fine: the tail is just „add" yet to finish. */
function chunks(text: string): Chunk[] {
  const out: Chunk[] = [];
  const re = /\[\[([\s\S]*?)(?:\]\]|$)|\{\{([\s\S]*?)(?:\}\}|$)/g;
  let last = 0;
  let mark = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ kind: "keep", text: text.slice(last, m.index) });
    const isAdd = m[1] !== undefined;
    out.push({
      kind: isAdd ? "add" : "cut",
      text: (isAdd ? m[1] : m[2]) ?? "",
      markIndex: mark++,
    });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ kind: "keep", text: text.slice(last) });
  return out;
}

/** The text as it would land in the sermon, given which marks she kept. */
function resolve(list: Chunk[], dropped: Set<number>): string {
  return list
    .map((c) => {
      if (c.kind === "keep") return c.text;
      const isDropped = dropped.has(c.markIndex!);
      // An addition she dropped disappears; a cut she dropped stays in.
      if (c.kind === "add") return isDropped ? "" : c.text;
      return isDropped ? c.text : "";
    })
    .join("")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
 * How much of her own text survived. The model is told to copy verbatim, but
 * a silent rewrite is exactly the failure she would not notice in a long
 * text — so count her paragraphs' openings in what came back and say so.
 */
function survival(original: string, revised: string): number {
  const paras = original
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 40);
  if (paras.length === 0) return 1;
  const hay = revised.replace(/\s+/g, " ");
  const found = paras.filter((p) => hay.includes(p.slice(0, 40).replace(/\s+/g, " "))).length;
  return found / paras.length;
}

/**
 * The whole sermon read at once and handed back with the seams showing. Per
 * point proposals can't see the whole text, so they repeat citations and
 * leave endings hanging; this can, and it never replaces anything silently —
 * every addition and every proposed cut is hers to keep or drop.
 */
export default function ReviseCard({ artifacts, onReplace }: ReviseCardProps) {
  const [text, setText] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dropped, setDropped] = useState<Set<number>>(new Set());
  const sunday = useSunday();

  const sermon = artifacts.sermonText ?? "";
  const words = sermon.trim() ? sermon.trim().split(/\s+/).length : 0;
  const tooShort = words < 80;

  const list = useMemo(() => (text === null ? [] : chunks(text)), [text]);
  const markCount = list.filter((c) => c.kind !== "keep").length;
  const kept = markCount - dropped.size;
  const survived = useMemo(
    () => (text === null || busy ? 1 : survival(sermon, text)),
    [text, busy, sermon],
  );

  const run = async () => {
    if (busy || tooShort) return;
    setBusy(true);
    setError(null);
    setDropped(new Set());
    setText("");
    try {
      const res = await fetch("/api/ai/revise", {
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
      await readStream(res, (chunk) => setText((t) => (t ?? "") + chunk));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Projít kázání se nepodařilo.");
    } finally {
      setBusy(false);
    }
  };

  const toggle = (i: number) =>
    setDropped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  if (text === null) {
    return (
      <div className="mt-2 flex flex-wrap items-center gap-2.5">
        <button
          onClick={run}
          disabled={tooShort}
          title={tooShort ? "Nejdřív napiš víc než pár odstavců" : "Celé kázání s vyznačenými doplňky"}
          className="flex items-center gap-2 rounded-lg border border-brick/30 bg-brick-pale px-3 py-2 text-[12px] font-semibold text-brick transition-colors hover:bg-brick/10 disabled:opacity-50"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2h7l3 3v9H3z" />
            <path d="M5.5 7.5h5M5.5 10h3" />
          </svg>
          {`Projít celé kázání`}
        </button>
        <span className="text-[12px] italic text-text-light">
          {`Vrátí celý text s vyznačenými doplňky — přijmeš je po jednom.`}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-brick/30 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-brick/20 bg-brick-pale px-3.5 py-2.5">
        <div>
          <div className="font-lora text-[13.5px] font-bold text-text">{`Celé kázání s doplňky`}</div>
          <div className="mt-0.5 text-[12px] leading-snug text-text-muted">
            {busy
              ? `Průvodce čte celé kázání — chvíli to potrvá.`
              : `Tvůj text beze změny, ${" "}`}
            {!busy && (
              <>
                <span className="rounded bg-brick/15 px-1 text-text">{`doplňky`}</span>
                {` a `}
                <span className="rounded bg-cream px-1 text-text-muted line-through">{`návrhy vypustit`}</span>
                {`. Klikni na kterýkoli a vrátíš ho zpět.`}
              </>
            )}
          </div>
        </div>
        {!busy && markCount > 0 && (
          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[12px] font-semibold text-text-muted">
            {`${kept} z ${markCount}`}
          </span>
        )}
      </div>

      {error ? (
        <p className="px-3.5 py-3 text-[12.5px] text-brick">{error}</p>
      ) : (
        <div className="max-h-[46vh] overflow-y-auto px-4 py-3 font-lora text-[14px] leading-[1.75] text-text">
          {list.map((c, i) => {
            if (c.kind === "keep")
              return (
                <span key={i} className="whitespace-pre-wrap">
                  {c.text}
                </span>
              );
            const isDropped = dropped.has(c.markIndex!);
            return (
              <button
                key={i}
                onClick={() => toggle(c.markIndex!)}
                title={
                  c.kind === "add"
                    ? isDropped
                      ? "Doplněk je vypnutý — klikni a vrátíš ho"
                      : "Doplněk průvodce — klikni a zahodíš ho"
                    : isDropped
                      ? "Necháváš ve svém kázání — klikni a vypustíš"
                      : "Průvodce navrhuje vypustit — klikni a necháš"
                }
                className={`whitespace-pre-wrap rounded px-0.5 text-left transition-colors ${
                  c.kind === "add"
                    ? isDropped
                      ? "bg-cream text-text-light line-through decoration-text-light/50"
                      : "bg-brick/15 hover:bg-brick/25"
                    : isDropped
                      ? "bg-sage-pale text-text"
                      : "bg-cream text-text-muted line-through decoration-text-light/50"
                }`}
              >
                {c.text}
              </button>
            );
          })}
          {busy && <span className="animate-pulse text-brick">{"▍"}</span>}
        </div>
      )}

      {!busy && !error && survived < 0.7 && (
        <p className="mx-3.5 mb-2 rounded-lg border border-[#f0dcb0] bg-[#fff7e6] px-2.5 py-1.5 text-[12px] text-[#7a5a12]">
          {`Pozor: průvodce zřejmě přepsal i tvoje věty, ne jen doplnil. Než to vložíš, projdi text — nebo zkus Znovu.`}
        </p>
      )}

      {!busy && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-3.5 py-2 text-[12px] text-text-light">
          <span>{`Kázání je tvoje — vlož jen to, co ti sedí, a pak si to přepiš.`}</span>
          <span className="flex gap-1.5">
            <button
              onClick={run}
              className="rounded-lg border border-border bg-white px-2.5 py-1 text-[12.5px] font-semibold text-text-muted hover:border-brick hover:text-brick"
            >
              {`Znovu`}
            </button>
            {!error && (
              <button
                onClick={() => {
                  onReplace(resolve(list, dropped));
                  setText(null);
                }}
                className="rounded-lg bg-brick px-2.5 py-1 text-[12.5px] font-semibold text-white hover:bg-brick/90"
              >
                {`Vložit do kázání`}
              </button>
            )}
            <button
              onClick={() => setText(null)}
              className="rounded-lg px-2.5 py-1 text-[12.5px] font-semibold text-text-muted hover:text-text"
            >
              {`Zavřít`}
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
