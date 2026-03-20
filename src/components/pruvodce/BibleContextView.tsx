"use client";

import { useEffect, useRef, useState } from "react";
import { useBibleContext } from "@/hooks/useBibleContext";
import {
  type BibleTranslation,
  type BibleChapter,
  type BibleVerse,
  TRANSLATION_LABELS,
  getChapterCount,
} from "@/lib/getbible";

interface BibleContextViewProps {
  reference: string;
}

/**
 * Vertical scrollable context view showing surrounding chapters.
 * The user's pericope is highlighted; surrounding text is shown in muted style.
 * Auto-scrolls to the highlighted passage on load.
 */
export default function BibleContextView({ reference }: BibleContextViewProps) {
  const { data, loading, error, translation, setTranslation } =
    useBibleContext(reference);
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Auto-scroll to highlighted pericope when data loads
  useEffect(() => {
    if (data && highlightRef.current && containerRef.current && !hasScrolled) {
      const timer = setTimeout(() => {
        highlightRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setHasScrolled(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data, hasScrolled]);

  // Reset scroll tracking when reference changes
  useEffect(() => {
    setHasScrolled(false);
  }, [reference, translation]);

  if (!reference.trim()) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-cream p-8">
        <p className="text-sm italic text-text-muted">
          {`Zadejte odkaz na biblick\u00FD text pro zobrazen\u00ED kontextu.`}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-sage/30 border-t-sage" />
            <p className="text-xs text-text-muted">
              {`Na\u010D\u00EDt\u00E1m kontext\u2026`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.current) {
    return (
      <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
        <p className="text-sm text-text-muted">
          {error ||
            `Nepoda\u0159ilo se na\u010D\u00EDst kontext pro \u201E${reference}\u201C.`}
        </p>
      </div>
    );
  }

  const { prev, current, next, chapter, verseStart, verseEnd } = data;
  const maxChapters = getChapterCount(data.bookNumber);

  // Book name from API data
  const bookName = current.verses[0]?.name.replace(/\s*\d+:\d+$/, "") || "";

  return (
    <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
      {/* Header with translation switcher */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
            {`Liter\u00E1rn\u00ED kontext`}
          </p>
          <p className="mt-0.5 font-cormorant text-[15px] font-semibold text-brick">
            {bookName} {chapter}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-white/80 p-0.5">
          {(["cep", "bkr"] as BibleTranslation[]).map((t) => (
            <button
              key={t}
              onClick={() => setTranslation(t)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                translation === t
                  ? "bg-sage text-white shadow-sm"
                  : "text-text-light hover:text-text"
              }`}
            >
              {TRANSLATION_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable context */}
      <div
        ref={containerRef}
        className="relative max-h-[70vh] overflow-y-auto scroll-smooth rounded-lg"
      >
        {/* Previous chapter */}
        {prev && (
          <ContextChapter
            chapter={prev}
            label={`${bookName} ${chapter - 1}`}
            variant="context"
          />
        )}
        {prev && (
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-brick/20" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brick/50">
              {`Kapitola ${chapter}`}
            </span>
            <div className="h-px flex-1 bg-brick/20" />
          </div>
        )}

        {/* Current chapter with pericope highlighted */}
        <div ref={highlightRef}>
          <ContextChapter
            chapter={current}
            label={`${bookName} ${chapter}`}
            variant="current"
            highlightStart={verseStart}
            highlightEnd={verseEnd}
          />
        </div>

        {next && (
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-light/50">
              {`Kapitola ${chapter + 1}`}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
        )}

        {/* Next chapter */}
        {next && (
          <ContextChapter
            chapter={next}
            label={`${bookName} ${chapter + 1}`}
            variant="context"
          />
        )}

        {/* Book boundary indicators */}
        {!prev && chapter === 1 && (
          <div className="mb-3 text-center text-[10px] italic text-text-light/50">
            {`\u2190 Za\u010D\u00E1tek knihy ${bookName}`}
          </div>
        )}
        {!next && chapter === maxChapters && (
          <div className="mt-3 text-center text-[10px] italic text-text-light/50">
            {`Konec knihy ${bookName} \u2192`}
          </div>
        )}
      </div>
    </div>
  );
}

/** Render a single chapter's verses, grouping highlighted pericope into a block */
function ContextChapter({
  chapter,
  label,
  variant,
  highlightStart,
  highlightEnd,
}: {
  chapter: BibleChapter;
  label: string;
  variant: "context" | "current";
  highlightStart?: number | null;
  highlightEnd?: number | null;
}) {
  const isContext = variant === "context";
  const hasHighlight = variant === "current" && highlightStart != null;

  // Split verses into groups: before, highlighted, after
  const beforeVerses: BibleVerse[] = [];
  const highlightedVerses: BibleVerse[] = [];
  const afterVerses: BibleVerse[] = [];

  if (hasHighlight) {
    for (const verse of chapter.verses) {
      if (verse.verse < highlightStart!) {
        beforeVerses.push(verse);
      } else if (highlightEnd == null || verse.verse <= highlightEnd) {
        highlightedVerses.push(verse);
      } else {
        afterVerses.push(verse);
      }
    }
  }

  const contextStyle = "font-literata text-[15px] leading-[1.9] text-text-muted";
  const beforeAfterStyle = "font-literata text-[15px] leading-[1.9] text-text-muted";

  if (!hasHighlight) {
    return (
      <div className={isContext ? "opacity-50" : ""}>
        {chapter.verses.map((verse) => (
          <VerseSpan key={verse.verse} verse={verse} className={isContext ? contextStyle : "font-literata text-[17px] leading-[2.0] text-text"} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Verses before pericope */}
      {beforeVerses.length > 0 && (
        <div className="opacity-50">
          {beforeVerses.map((verse) => (
            <VerseSpan key={verse.verse} verse={verse} className={beforeAfterStyle} />
          ))}
        </div>
      )}

      {/* Highlighted pericope block */}
      {highlightedVerses.length > 0 && (
        <div className="my-3 rounded-lg border-l-4 border-brick/40 bg-brick-pale/50 px-4 py-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brick/60">
            {`Va\u0161e perikopa`}
          </div>
          {highlightedVerses.map((verse) => (
            <VerseSpan key={verse.verse} verse={verse} className="font-literata text-[17px] leading-[2.0] text-text" />
          ))}
        </div>
      )}

      {/* Verses after pericope */}
      {afterVerses.length > 0 && (
        <div className="opacity-50">
          {afterVerses.map((verse) => (
            <VerseSpan key={verse.verse} verse={verse} className={beforeAfterStyle} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Single verse as inline span with verse number */
function VerseSpan({ verse, className }: { verse: BibleVerse; className: string }) {
  return (
    <span className={className}>
      <sup className="mr-0.5 text-[10px] font-semibold text-text-light/60">
        {verse.verse}
      </sup>
      {verse.text.trim()}{" "}
    </span>
  );
}
