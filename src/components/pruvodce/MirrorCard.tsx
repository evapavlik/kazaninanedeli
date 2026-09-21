"use client";

import { useState } from "react";
import type { Bubble } from "@/hooks/useBubbles";
import { useAiNotes } from "@/hooks/useAiNotes";
import { useSunday } from "@/hooks/useSunday";
import { readStream } from "./TermAnswer";

/**
 * The notebook seen from above. A button, never automatic: the preacher asks
 * for the mirror when she wants it. What comes back reflects her own notes —
 * what repeats, what she asked — and proposes nothing. Kept only on request.
 */
export default function MirrorCard({ bubbles }: { bubbles: Bubble[] }) {
  const [text, setText] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const { add } = useAiNotes();
  const sunday = useSunday();

  const run = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    setSaved(false);
    setText("");
    const notes = bubbles
      .filter((b) => b.source !== "artifact") // the sermon fields aren't notes about the text
      .map((b) => (b.title ? `${b.tag}: ${b.title} — ${b.body}` : `${b.tag}: ${b.body}`));
    try {
      const res = await fetch("/api/ai/mirror", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sunday: sunday.entry?.sundayName ?? "",
          readings: sunday.readings.filter((r) => r.lectionary).map((r) => ({ label: r.label, reference: r.lectionary!.reference })),
          notes,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Chyba ${res.status}`);
      }
      await readStream(res, (s) => setText((t) => (t ?? "") + s));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Zrcadlo se nepodařilo sestavit.");
    } finally {
      setBusy(false);
    }
  };

  const noteCount = bubbles.filter((b) => b.source !== "artifact").length;

  return (
    <div className="mb-3">
      {text === null ? (
        <button
          onClick={run}
          disabled={noteCount === 0}
          title={noteCount === 0 ? "Nejdřív si něco poznamenej" : "Podívat se na poznámky z výšky"}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-sage/40 bg-white px-3 py-2 text-[12px] font-semibold text-sage transition-colors hover:bg-sage-pale disabled:opacity-50"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="8" cy="8" r="5.5" />
            <path d="M8 5v3l2 1.5" />
          </svg>
          {`Zrcadlo — co se v poznámkách opakuje`}
        </button>
      ) : (
        <div className="rounded-xl border border-sage/35 bg-sage-pale px-3.5 py-3 text-[12.5px] leading-[1.65] text-text">
          {error ? (
            <p className="text-brick">{error}</p>
          ) : (
            <MirrorText text={text} busy={busy} />
          )}
          {!busy && !error && (
            <>
              <p className="mt-2.5 border-t border-sage/25 pt-2 text-[11px] italic text-text-light">
                {`Tohle není návrh kázání. Jen tvoje poznámky viděné z výšky — co s tím uděláš, je na tobě.`}
              </p>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => setText(null)}
                  className="rounded-lg px-2.5 py-1 text-[11.5px] font-semibold text-text-muted hover:text-text"
                >
                  {`Zavřít`}
                </button>
                <button
                  onClick={run}
                  className="rounded-lg border border-border bg-white px-2.5 py-1 text-[11.5px] font-semibold text-text-muted hover:border-sage hover:text-sage"
                >
                  {`Znovu`}
                </button>
                <button
                  onClick={() => {
                    add({ kind: "mirror", reference: "", text: text ?? "" });
                    setSaved(true);
                  }}
                  disabled={saved}
                  className="rounded-lg bg-sage px-2.5 py-1 text-[11.5px] font-semibold text-white hover:bg-sage-light disabled:opacity-60"
                >
                  {saved ? `Uloženo ✓` : `Uložit do zápisníku`}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/** The three sections come back as „Nadpis" lines followed by prose — set the headings apart. */
function MirrorText({ text, busy }: { text: string; busy: boolean }) {
  const lines = text.split("\n").filter((l, i, a) => l.trim() || (i > 0 && a[i - 1].trim()));
  const HEADINGS = ["Co se ti opakuje", "Tvoje otázky", "Kde se čtení potkávají"];
  return (
    <div>
      {lines.map((l, i) => {
        const clean = l.replace(/^[#*\s]+|[*:\s]+$/g, "");
        if (HEADINGS.includes(clean)) {
          return (
            <p key={i} className="mb-0.5 mt-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-sage first:mt-0">
              {clean}
            </p>
          );
        }
        return (
          <p key={i} className="mb-1.5">
            {l.replace(/\*\*/g, "")}
          </p>
        );
      })}
      {busy && <span className="animate-pulse text-sage">{"▍"}</span>}
    </div>
  );
}
