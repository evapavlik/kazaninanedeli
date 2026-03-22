"use client";

import { useState, useCallback } from "react";
import {
  type BibleTranslation,
  type BibleVerse,
  TRANSLATION_LABELS,
  parseReferenceForApi,
  fetchChapter,
} from "@/lib/getbible";
import {
  getBookHeadings,
  type SectionHeading,
  type ChapterHeadings,
  type BookPart,
} from "@/data/chapter-headings";

interface BibleContextViewProps {
  reference: string;
}

/**
 * Book table-of-contents view for step 3 (context).
 * Shows chapter sections as a TOC; click to expand and read full text from API.
 * User's pericope section is highlighted.
 */
export default function BibleContextView({ reference }: BibleContextViewProps) {
  const parsed = parseReferenceForApi(reference);
  const [translation, setTranslation] = useState<BibleTranslation>("cep");

  if (!parsed) {
    return (
      <div className="rounded-lg border border-border/50 bg-white/60 p-4">
        <p className="text-sm italic text-text-muted">
          {`Nepoda\u0159ilo se rozpoznat odkaz \u201E${reference}\u201C.`}
        </p>
      </div>
    );
  }

  const { bookNumber, chapter, verseStart, verseEnd } = parsed;
  const bookHeadings = getBookHeadings(bookNumber);

  if (!bookHeadings) {
    return (
      <div className="rounded-lg border border-border/50 bg-white/60 p-4">
        <p className="text-sm italic text-text-muted">
          {`Obsah knihy nen\u00ED zat\u00EDm k dispozici. Brzy p\u0159id\u00E1me dal\u0161\u00ED knihy.`}
        </p>
      </div>
    );
  }

  // Find surrounding chapters to show (prev, current, next)
  const chaptersToShow = bookHeadings.chapters.filter(
    (ch) => ch.chapter >= chapter - 1 && ch.chapter <= chapter + 1
  );

  // Book structure: which part contains the current chapter
  const bookStructure = bookHeadings.bookStructure || [];

  return (
    <div className="rounded-lg border border-sage/20 bg-sage-pale/30 p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage/70">
            {`Struktura knihy`}
          </p>
          <p className="mt-0.5 font-cormorant text-[16px] font-semibold text-text">
            {bookHeadings.bookName}
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

      {/* Book structure overview */}
      {bookStructure.length > 0 && (
        <div className="mb-4 space-y-1.5">
          {bookStructure.map((part, i) => {
            // Check if current chapter falls within this part's range
            const rangeMatch = part.chapters.match(/^(\d+)/);
            const rangeEndMatch = part.chapters.match(/(\d+)$/);
            const partStart = rangeMatch ? parseInt(rangeMatch[1]) : 0;
            const partEnd = rangeEndMatch ? parseInt(rangeEndMatch[1]) : partStart;
            const isActivePart = chapter >= partStart && chapter <= partEnd;

            return (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 transition-all ${
                  isActivePart
                    ? "border border-brick/20 bg-white/80"
                    : "bg-white/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 shrink-0 text-[10px] font-bold ${
                    isActivePart ? "text-brick" : "text-text-light/50"
                  }`}>
                    {part.chapters}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-medium leading-snug ${
                      isActivePart ? "text-text" : "text-text-muted"
                    }`}>
                      {part.title}
                      {isActivePart && (
                        <span className="ml-1.5 inline-block rounded bg-brick/10 px-1.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wider text-brick">
                          {`v\u00E1\u0161 text`}
                        </span>
                      )}
                    </p>
                    <p className={`text-[11px] leading-relaxed ${
                      isActivePart ? "text-text-muted" : "text-text-light/60"
                    }`}>
                      {part.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Surrounding chapters detail */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage/50">
          {`Okol\u00ED va\u0161\u00ED perikopy`}
        </p>
        {chaptersToShow.map((ch) => (
          <ChapterTOC
            key={ch.chapter}
            chapter={ch}
            bookNumber={bookNumber}
            bookName={bookHeadings.bookName}
            isCurrent={ch.chapter === chapter}
            verseStart={ch.chapter === chapter ? verseStart : null}
            verseEnd={ch.chapter === chapter ? verseEnd : null}
            translation={translation}
          />
        ))}
      </div>
    </div>
  );
}

/** Single chapter in the TOC */
function ChapterTOC({
  chapter,
  bookNumber,
  bookName,
  isCurrent,
  verseStart,
  verseEnd,
  translation,
}: {
  chapter: ChapterHeadings;
  bookNumber: number;
  bookName: string;
  isCurrent: boolean;
  verseStart: number | null;
  verseEnd: number | null;
  translation: BibleTranslation;
}) {
  return (
    <div
      className={`rounded-lg ${
        isCurrent
          ? "border border-brick/20 bg-white/80"
          : "border border-transparent bg-white/40"
      }`}
    >
      {/* Chapter header */}
      <div className={`px-3 py-2 ${isCurrent ? "" : "opacity-60"}`}>
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${
            isCurrent ? "text-brick" : "text-text-light"
          }`}
        >
          {`Kapitola ${chapter.chapter}`}
        </p>
      </div>

      {/* Sections list */}
      <div className="px-1 pb-1">
        {chapter.sections.map((section, i) => {
          const isActive =
            isCurrent &&
            verseStart != null &&
            section.startVerse <= (verseEnd ?? verseStart) &&
            section.endVerse >= verseStart;

          return (
            <SectionRow
              key={i}
              section={section}
              bookNumber={bookNumber}
              bookName={bookName}
              chapterNumber={chapter.chapter}
              isActive={isActive}
              isCurrent={isCurrent}
              translation={translation}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Single section row — click to expand and show full text */
function SectionRow({
  section,
  bookNumber,
  bookName,
  chapterNumber,
  isActive,
  isCurrent,
  translation,
}: {
  section: SectionHeading;
  bookNumber: number;
  bookName: string;
  chapterNumber: number;
  isActive: boolean;
  isCurrent: boolean;
  translation: BibleTranslation;
}) {
  const [expanded, setExpanded] = useState(false);
  const [verses, setVerses] = useState<BibleVerse[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadText = useCallback(async () => {
    if (verses) {
      setExpanded(!expanded);
      return;
    }
    setLoading(true);
    setExpanded(true);
    const chapter = await fetchChapter(bookNumber, chapterNumber, translation);
    if (chapter) {
      const filtered = chapter.verses.filter(
        (v) => v.verse >= section.startVerse && v.verse <= section.endVerse
      );
      setVerses(filtered);
    }
    setLoading(false);
  }, [verses, expanded, bookNumber, chapterNumber, translation, section]);

  return (
    <div
      className={`rounded-md transition-colors ${
        isActive
          ? "bg-brick-pale/60"
          : "hover:bg-white/60"
      }`}
    >
      <button
        onClick={loadText}
        className={`flex w-full items-center gap-2 px-2 py-1.5 text-left ${
          isCurrent ? "" : "opacity-60"
        }`}
      >
        {/* Active indicator */}
        {isActive ? (
          <span className="shrink-0 text-brick">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="5" cy="5" r="4" />
            </svg>
          </span>
        ) : (
          <span className="w-[10px]" />
        )}

        {/* Section title */}
        <span
          className={`flex-1 text-[13px] leading-snug ${
            isActive
              ? "font-semibold text-text"
              : "text-text-muted"
          }`}
        >
          {section.title}
          {isActive && (
            <span className="ml-1.5 inline-block rounded bg-brick/10 px-1.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wider text-brick">
              {`va\u0161e perikopa`}
            </span>
          )}
        </span>

        {/* Verse range */}
        <span className="shrink-0 text-[10px] text-text-light/60">
          {section.startVerse === section.endVerse
            ? `v. ${section.startVerse}`
            : `v. ${section.startVerse}\u2013${section.endVerse}`}
        </span>

        {/* Expand icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-light/40 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {/* Expanded text */}
      {expanded && (
        <div className="px-6 pb-3 pt-1">
          {loading ? (
            <div className="flex items-center gap-2 py-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-sage/30 border-t-sage" />
              <span className="text-[11px] text-text-muted">{`Na\u010D\u00EDt\u00E1m\u2026`}</span>
            </div>
          ) : verses ? (
            <div className="font-literata text-[15px] leading-[1.9] text-text">
              {verses.map((v) => (
                <span key={v.verse}>
                  <sup className="mr-0.5 text-[10px] font-semibold text-text-light/60">
                    {v.verse}
                  </sup>
                  {v.text.trim()}{" "}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-text-muted">
              {`Text se nepoda\u0159ilo na\u010D\u00EDst.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
