"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  parseReferenceForApi,
  fetchChapter,
  fetchChapterBolls,
  isOldTestament,
  type BibleVerse,
} from "@/lib/getbible";

interface TranslationCompareProps {
  reference: string;
}

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; original: BibleVerse[]; csp: BibleVerse[]; bkr: BibleVerse[]; isOT: boolean };

export default function TranslationCompare({
  reference,
}: TranslationCompareProps) {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<FetchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const fetchTranslations = useCallback(async (ref: string) => {
    const parsed = parseReferenceForApi(ref);
    if (!parsed) {
      setState({
        status: "error",
        message: `Nepoda\u0159ilo se rozpoznat odkaz. Zkuste form\u00E1t nap\u0159. \u201EMk 4,1\u201320\u201C.`,
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

      const filterVerses = (verses: BibleVerse[]): BibleVerse[] => {
        if (parsed.verseStart === null) return verses;
        const end = parsed.verseEnd ?? parsed.verseStart;
        return verses.filter(
          (v) => v.verse >= parsed.verseStart! && v.verse <= end
        );
      };

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
        message: `Chyba p\u0159i na\u010D\u00EDt\u00E1n\u00ED p\u0159eklad\u016F. Zkuste to pros\u00EDm znovu.`,
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

  // Don't render anything if no reference
  if (!reference.trim()) return null;

  // Don't render in idle state
  if (state.status === "idle") return null;

  return (
    <section className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-t-lg border border-sage/20 bg-sage-pale/30 px-4 py-3 text-left transition-colors hover:border-sage/40"
      >
        <div className="flex items-center gap-2">
          {/* Translation compare icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="shrink-0 text-sage"
          >
            <rect x="2" y="3" width="7" height="14" rx="1" />
            <rect x="11" y="3" width="7" height="14" rx="1" />
            <path d="M4 7h3M4 10h3M4 13h2" />
            <path d="M13 7h3M13 10h3M13 13h2" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage/70">
            {`Porovn\u00E1n\u00ED p\u0159eklad\u016F`}
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-sage/50 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div className="rounded-b-lg border border-t-0 border-sage/20 bg-sage-pale/30 p-4">
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

          {/* Success state — columns */}
          {state.status === "success" && (
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
              {/* 1. Original — Hebrew or Greek */}
              <TranslationColumn
                label={state.isOT ? `Hebrejsky (WLC)` : `\u0158ecky (TR)`}
                verses={state.original}
                isOriginal
                isRTL={state.isOT}
              />
              {/* 2. ČSP */}
              <TranslationColumn
                label={`\u010CSP`}
                verses={state.csp}
              />
              {/* 3. Kralická */}
              <TranslationColumn
                label={`Kralick\u00E1`}
                verses={state.bkr}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function TranslationColumn({
  label,
  verses,
  isOriginal,
  isRTL,
}: {
  label: string;
  verses: BibleVerse[];
  isOriginal?: boolean;
  isRTL?: boolean;
}) {
  if (verses.length === 0) {
    return (
      <div className="rounded-lg bg-white/50 p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage/70">
          {label}
        </p>
        <p className="text-[12px] italic text-text-muted">
          {`P\u0159eklad nen\u00ED k dispozici.`}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white/50 p-4">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage/70">
        {label}
      </p>
      <div
        className={`text-[15px] leading-[1.9] text-text ${isOriginal ? "font-serif" : "font-literata"}`}
        dir={isRTL ? "rtl" : undefined}
      >
        {verses.map((v) => (
          <span key={v.verse}>
            <sup className={`${isRTL ? "ml-0.5" : "mr-0.5"} text-[10px] font-semibold text-text-light/60`}>
              {v.verse}
            </sup>
            {v.text}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
