"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  parseReferenceForApi,
  verseInReference,
  fetchChapter,
  fetchChapterBolls,
  isOldTestament,
  type BibleVerse,
} from "@/lib/getbible";

interface TranslationCompareProps {
  reference: string;
}

/**
 * How the translations line up against each other.
 *
 * Both modes align *by verse*, which is what comparing actually means: side-by
 * -side prose columns drift apart after the first verse (the translations have
 * different lengths), so finding v33 means hunting for it in each column
 * separately. "verse" stacks the translations under a verse number and reads
 * top-down; "table" puts each verse on one row so a difference sits at the same
 * height across all columns.
 */
type CompareMode = "verse" | "table";

const MODES: { id: CompareMode; label: string }[] = [
  { id: "verse", label: "Po verši" },
  { id: "table", label: "Tabulka" },
];

interface TranslationSource {
  key: string;
  label: string;
  verses: BibleVerse[];
  /** Hebrew or Greek — the source text, set in a serif face and (for Hebrew) RTL. */
  isOriginal?: boolean;
  isRTL?: boolean;
}

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; original: BibleVerse[]; csp: BibleVerse[]; bkr: BibleVerse[]; isOT: boolean };

export default function TranslationCompare({
  reference,
}: TranslationCompareProps) {
  const [state, setState] = useState<FetchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  // Remembered across visits — a preacher who prefers the table shouldn't have
  // to re-pick it every Sunday.
  const [mode, setMode] = useLocalStorage<CompareMode>("kazani-compare-mode", "verse");

  const fetchTranslations = useCallback(async (ref: string) => {
    const parsed = parseReferenceForApi(ref);
    if (!parsed) {
      setState({
        status: "error",
        message: `Nepoda\u0159ilo se rozpoznat odkaz. Zkus form\u00E1t nap\u0159. \u201EMk 4,1\u201320\u201C.`,
      });
      return;
    }

    // Cancel any in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setState({ status: "loading" });

    try {
      const isOT = isOldTestament(parsed.bookNumber);
      // Original: Hebrew (WLC) for OT, Greek (TR) for NT — both from Bolls
      const originalCode = isOT ? "WLC" : "TR";

      const [originalChapter, cspChapter, bkrChapter] = await Promise.all([
        fetchChapterBolls(parsed.bookNumber, parsed.chapter, originalCode),
        fetchChapterBolls(parsed.bookNumber, parsed.chapter),
        fetchChapter(parsed.bookNumber, parsed.chapter, "bkr"),
      ]);

      // Check if this request was aborted while fetching
      if (abortRef.current?.signal.aborted) return;

      if (!cspChapter && !bkrChapter) {
        setState({
          status: "error",
          message: `Kapitolu se nepoda\u0159ilo na\u010D\u00EDst. Zkontrolujte odkaz a p\u0159ipojen\u00ED k internetu.`,
        });
        return;
      }

      // Segment-aware: discontinuous pericopes ("Mt 13,31-33.44-52") keep
      // exactly the verses the lectionary prescribes — no silent truncation
      // to the first run, no filler verses from the gap.
      const filterVerses = (verses: BibleVerse[]): BibleVerse[] =>
        verses.filter((v) => verseInReference(v.verse, parsed));

      setState({
        status: "success",
        original: originalChapter ? filterVerses(originalChapter.verses) : [],
        csp: cspChapter ? filterVerses(cspChapter.verses) : [],
        bkr: bkrChapter ? filterVerses(bkrChapter.verses) : [],
        isOT,
      });
    } catch {
      if (abortRef.current?.signal.aborted) return;
      setState({
        status: "error",
        message: `Chyba p\u0159i na\u010D\u00EDt\u00E1n\u00ED p\u0159eklad\u016F. Zkus to pros\u00EDm znovu.`,
      });
    }
  }, []);

  useEffect(() => {
    const trimmed = reference.trim();
    if (!trimmed) {
      setState({ status: "idle" });
      return;
    }

    // Debounce to avoid firing on every keystroke
    const timeout = setTimeout(() => {
      fetchTranslations(trimmed);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [reference, fetchTranslations]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // The Czech translations first — that's what gets read — then the source
  // text, which is what you consult once something looks odd.
  const sources: TranslationSource[] = useMemo(() => {
    if (state.status !== "success") return [];
    return [
      { key: "csp", label: "ČSP", verses: state.csp },
      { key: "bkr", label: "Kralická", verses: state.bkr },
      {
        key: "original",
        label: state.isOT ? "Hebrejsky (WLC)" : "Řecky (TR)",
        verses: state.original,
        isOriginal: true,
        isRTL: state.isOT,
      },
    ].filter((s) => s.verses.length > 0);
  }, [state]);

  // Every verse any source has, in order — a translation missing one verse must
  // not shift the rest out of alignment.
  const verseNumbers: number[] = useMemo(() => {
    const all = new Set<number>();
    for (const s of sources) for (const v of s.verses) all.add(v.verse);
    return [...all].sort((a, b) => a - b);
  }, [sources]);

  // Don't render anything if no reference
  if (!reference.trim()) return null;

  // Don't render in idle state
  if (state.status === "idle") return null;

  return (
    /* No viewport breakpoints anywhere below. The old layout keyed three prose
       columns off `lg:grid-cols-3` — a *viewport* breakpoint — so in the 330px
       guide rail on a wide screen it still asked for three columns and got
       ~90px each. Both modes here are width-safe by construction: the verse
       layout stacks, the table scrolls. */
    <section>
      <div>
          {/* Loading state */}
          {state.status === "loading" && (
            <div className="flex items-center justify-center gap-2 py-8">
              <svg
                className="h-4 w-4 animate-spin text-sage"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              <span className="text-[12px] text-text-muted">
                {`Na\u010D\u00EDt\u00E1m\u2026`}
              </span>
            </div>
          )}

          {/* Error state */}
          {state.status === "error" && (
            <div className="py-4 text-center">
              <p className="text-[12px] leading-relaxed text-text-muted">
                {state.message}
              </p>
            </div>
          )}

          {/* Success state */}
          {state.status === "success" && sources.length > 0 && (
            <>
              <div
                className="mb-4 flex flex-wrap items-center gap-1.5"
                role="tablist"
                aria-label="Podoba porovnání"
              >
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    role="tab"
                    aria-selected={mode === m.id}
                    onClick={() => setMode(m.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                      mode === m.id
                        ? "border-brick bg-brick-pale text-brick"
                        : "border-border bg-white text-text-muted hover:text-text"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {mode === "verse" ? (
                <VerseByVerse sources={sources} verseNumbers={verseNumbers} />
              ) : (
                <CompareTable sources={sources} verseNumbers={verseNumbers} />
              )}
            </>
          )}

          {state.status === "success" && sources.length === 0 && (
            <p className="py-4 text-center text-[12px] italic text-text-muted">
              {`Pro tento odkaz se nepodařilo načíst žádný překlad.`}
            </p>
          )}
      </div>
    </section>
  );
}

/** Look up one verse in one source. */
function verseText(source: TranslationSource, n: number): string | null {
  return source.verses.find((v) => v.verse === n)?.text ?? null;
}

const bodyClass = (s: TranslationSource) =>
  `text-[15px] leading-[1.75] text-text ${s.isOriginal ? "font-serif" : "font-literata"}`;

const MISSING = <span className="italic text-text-light">{"—"}</span>;

/**
 * Verse number as a heading, translations stacked beneath it. Reads top-down,
 * one verse at a time, and holds up at any width — so it is the default.
 */
function VerseByVerse({
  sources,
  verseNumbers,
}: {
  sources: TranslationSource[];
  verseNumbers: number[];
}) {
  return (
    <div>
      {verseNumbers.map((n) => (
        <div key={n} className="border-t border-border py-3.5 first:border-t-0 first:pt-0">
          <p className="mb-1.5 font-cormorant text-[15px] font-bold tracking-[0.02em] text-brick">
            {n}
          </p>
          {sources.map((s) => (
            <div key={s.key} className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 py-0.5">
              <p className="pt-[5px] text-[10.5px] font-bold uppercase leading-tight tracking-[0.12em] text-sage">
                {s.label}
              </p>
              <p className={bodyClass(s)} dir={s.isRTL ? "rtl" : undefined}>
                {verseText(s, n) ?? MISSING}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * One row per verse, one column per translation. A difference sits at the same
 * height across all columns, so it is visible without hunting for it. Scrolls
 * sideways rather than squeezing when the container is too narrow.
 */
function CompareTable({
  sources,
  verseNumbers,
}: {
  sources: TranslationSource[];
  verseNumbers: number[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-[38px] border-b border-border pb-2.5 pr-3 text-left" />
            {sources.map((s) => (
              <th
                key={s.key}
                className="min-w-[170px] border-b border-border px-3 pb-2.5 text-left text-[10.5px] font-bold uppercase tracking-[0.12em] text-sage"
              >
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {verseNumbers.map((n) => (
            <tr key={n}>
              <td className="border-b border-border py-2.5 pr-3 align-top font-cormorant text-[14px] font-bold text-brick">
                {n}
              </td>
              {sources.map((s) => (
                <td
                  key={s.key}
                  dir={s.isRTL ? "rtl" : undefined}
                  className={`border-b border-border px-3 py-2.5 align-top ${bodyClass(s)}`}
                >
                  {verseText(s, n) ?? MISSING}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
