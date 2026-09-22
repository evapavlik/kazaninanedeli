"use client";

import { useEffect, useRef, useState } from "react";
import { useAiNotes } from "@/hooks/useAiNotes";

interface TermAnswerProps {
  term: string;
  reference: string;
  text: string;
  readingLabel?: string;
  onClose: () => void;
}

/** Read a plain-text streaming response into state, chunk by chunk. */
export async function readStream(res: Response, onChunk: (s: string) => void) {
  const reader = res.body?.getReader();
  if (!reader) return;
  const dec = new TextDecoder();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    onChunk(dec.decode(value, { stream: true }));
  }
}

/**
 * „Co to znamená?" — the answer sits right under the text it came from, in
 * the context of that pericope. It is an answer, not a note: nothing is kept
 * unless the preacher says so. A follow-up asks on, in the same thread.
 */
export default function TermAnswer({ term, reference, text, readingLabel, onClose }: TermAnswerProps) {
  const [answer, setAnswer] = useState("");
  const [followups, setFollowups] = useState<{ q: string; a: string }[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const [question, setQuestion] = useState("");
  const [saved, setSaved] = useState(false);
  const { add } = useAiNotes();
  const aborted = useRef(false);

  useEffect(() => {
    // Each run owns its request: a cancelled run must not keep writing into
    // state (React's dev double-mount would otherwise interleave two answers),
    // and the request itself is aborted so the tokens aren't paid for twice.
    let cancelled = false;
    const ctrl = new AbortController();
    aborted.current = false;
    setAnswer("");
    setFollowups([]);
    setSaved(false);
    setError(null);
    setBusy(true);
    (async () => {
      try {
        const res = await fetch("/api/ai/term", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ term, reference, text }),
          signal: ctrl.signal,
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `Chyba ${res.status}`);
        }
        await readStream(res, (s) => {
          if (!cancelled) setAnswer((a) => a + s);
        });
      } catch (e) {
        if (!cancelled && !(e instanceof DOMException && e.name === "AbortError")) {
          setError(e instanceof Error ? e.message : "Nepodařilo se odpovědět.");
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
      aborted.current = true;
      ctrl.abort();
    };
  }, [term, reference, text]);

  const askFollowup = async () => {
    const q = question.trim();
    if (!q || busy) return;
    setQuestion("");
    setAsking(false);
    setBusy(true);
    setFollowups((f) => [...f, { q, a: "" }]);
    try {
      const res = await fetch("/api/ai/term", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, reference, text, previousAnswer: answer, followup: q }),
      });
      if (!res.ok) throw new Error(`Chyba ${res.status}`);
      await readStream(res, (s) => {
        if (aborted.current) return;
        setFollowups((f) => f.map((x, i) => (i === f.length - 1 ? { ...x, a: x.a + s } : x)));
      });
    } catch (e) {
      if (!aborted.current) setError(e instanceof Error ? e.message : "Nepodařilo se odpovědět.");
    } finally {
      if (!aborted.current) setBusy(false);
    }
  };

  const save = () => {
    const body = [answer, ...followups.map((f) => `— ${f.q}\n${f.a}`)].join("\n\n").trim();
    add({ kind: "term", reference, readingLabel, term, text: body });
    setSaved(true);
  };

  return (
    <div className="mt-4 rounded-xl border border-sage/35 bg-sage-pale px-4 py-3 font-jakarta text-[13.5px] leading-[1.7] text-text">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="min-w-0 truncate font-lora text-[14px] font-bold">
          {term}
          <span className="ml-2 font-jakarta text-[12px] font-semibold uppercase tracking-[0.12em] text-sage">
            {`Co to znamená?`}
          </span>
        </p>
        <button
          onClick={onClose}
          aria-label="Zavřít odpověď"
          className="shrink-0 rounded p-1 text-text-light transition-colors hover:text-brick"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4L4 12M4 4l8 8" />
          </svg>
        </button>
      </div>

      {error ? (
        <p className="text-[12.5px] text-brick">{error}</p>
      ) : (
        <p className="whitespace-pre-wrap">
          {answer}
          {busy && followups.length === 0 && <span className="ml-0.5 animate-pulse text-sage">{"▍"}</span>}
        </p>
      )}

      {followups.map((f, i) => (
        <div key={i} className="mt-3 border-t border-sage/25 pt-2.5">
          <p className="mb-1 text-[12px] font-semibold text-sage">{`Ty: ${f.q}`}</p>
          <p className="whitespace-pre-wrap">
            {f.a}
            {busy && i === followups.length - 1 && <span className="ml-0.5 animate-pulse text-sage">{"▍"}</span>}
          </p>
        </div>
      ))}

      {asking && (
        <div className="mt-3 border-t border-sage/25 pt-2.5">
          <input
            autoFocus
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") askFollowup();
              if (e.key === "Escape") setAsking(false);
            }}
            placeholder="Na co přesně se ptáš? Enter = zeptat se"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-[13px] outline-none focus:border-sage"
          />
        </div>
      )}

      {!busy && !error && (
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <button
            onClick={() => setAsking((a) => !a)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-[12px] font-semibold text-text-muted transition-colors hover:border-sage hover:text-sage"
          >
            {`Zeptat se jinak`}
          </button>
          <button
            onClick={save}
            disabled={saved}
            className="rounded-lg bg-sage px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-sage-light disabled:opacity-60"
          >
            {saved ? `Uloženo ✓` : `Uložit do zápisníku`}
          </button>
        </div>
      )}
    </div>
  );
}
