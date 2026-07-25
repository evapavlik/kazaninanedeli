"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentReading } from "@/hooks/useCurrentReading";
import { useLectionaryReading } from "@/hooks/useLectionaryReading";
import { useAnnotations } from "@/hooks/useAnnotations";
import { annotationCategories } from "@/data/annotation-categories";
import type { LectionaryReading } from "@/data/lectionary";
import AnnotatedTextDisplay from "./AnnotatedTextDisplay";
import BreathingPractice from "./BreathingPractice";
import { fetchChapter, formatReference, type BibleTranslation } from "@/lib/getbible";

/** Source of the Bible text: a specific translation code or "custom" for user-pasted text. */
type TextSource = BibleTranslation | "custom";

const TEXT_SOURCE_LABELS: Record<TextSource, string> = {
  cep: "\u010CEP",
  csp: "\u010CSP",
  bkr: "Kralick\u00E1",
  textusreceptus: "\u0158ecky (TR)",
  custom: "Vlastn\u00ED vklad",
};

interface BibleTextPanelProps {
  currentSlug: string;
  /** Step 1 only: the breathing practice finished — tick off the prayer step. */
  onBreathingComplete?: () => void;
  /** Step 1 only: move on to the text phase once the reader is ready. */
  onOpenText?: () => void;
}

export default function BibleTextPanel({
  currentSlug,
  onBreathingComplete,
  onOpenText,
}: BibleTextPanelProps) {
  const [savedText, setSavedText] = useLocalStorage<string>(
    "kazani-bible-text",
    ""
  );
  const [savedRef, setSavedRef] = useLocalStorage<string>(
    "kazani-bible-ref",
    ""
  );
  const [savedSource, setSavedSource] = useLocalStorage<TextSource | "">(
    "kazani-bible-source",
    ""
  );
  const [localText, setLocalText] = useState("");
  const [localRef, setLocalRef] = useState("");
  const [localSource, setLocalSource] = useState<TextSource | "">("");
  const [editing, setEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedIndicatorRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fetch current Sunday reading from Supabase (has full markdown text)
  const { data: currentReading, loading: readingLoading } = useCurrentReading();

  // Fetch current Sunday entry from static lectionary (always works, references only)
  const lectionary = useLectionaryReading();

  // Interactive annotations
  const {
    annotations,
    addAnnotation,
    removeAnnotation,
    updateNote,
    clearAnnotations,
    textMismatch,
    syncHash,
  } = useAnnotations(localText);

  useEffect(() => {
    setLocalText(savedText);
    setLocalRef(savedRef);
    setLocalSource(savedSource);
  }, [savedText, savedRef, savedSource]);

  const saveText = useCallback(
    (text: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSavedText(text);
        // Manually typed/pasted text → source becomes "custom" (unless already set)
        if (text.trim() && !savedSource) {
          setSavedSource("custom");
          setLocalSource("custom");
        }
        setShowSaved(true);
        if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
        savedIndicatorRef.current = setTimeout(() => setShowSaved(false), 1500);
      }, 300);
    },
    [setSavedText, setSavedSource, savedSource]
  );

  const saveRef = useCallback(
    (ref: string) => {
      setSavedRef(ref);
    },
    [setSavedRef]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
    };
  }, []);

  const applyReading = (
    reference: string,
    text: string,
    source: TextSource = "custom"
  ) => {
    setLocalRef(reference);
    setLocalText(text);
    setLocalSource(source);
    setSavedRef(reference);
    setSavedText(text);
    setSavedSource(source);
    setEditing(false);
  };

  const hasText = localText.trim().length > 0;
  const isFirstStep = currentSlug === "modlitba";
  const showTextarea = !hasText || editing || isFirstStep;

  // Show reading suggestion when no text is entered yet.
  // Prefer Supabase (has full text), fall back to static lectionary (always works).
  const showSupabaseSuggestion =
    !hasText && !readingLoading && currentReading && currentReading.readings.length > 0;
  const showLectionarySuggestion = !hasText && !showSupabaseSuggestion && lectionary.entry;

  // Annotations enabled only from step 2 onwards
  const annotationsEnabled = !isFirstStep && currentSlug !== "modlitba";

  // Step 1: breathing practice first, blurred text underneath
  if (isFirstStep) {
    const gospel = lectionary.entry?.readings.gospel;
    return (
      <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
        {/* Breathing practice — part of the guide step, not a separate island:
            finishing it ticks the prayer step off and opens the way to the text. */}
        <BreathingPractice
          onComplete={onBreathingComplete}
          reading={
            lectionary.entry && gospel
              ? { title: lectionary.entry.sundayName, reference: `Evangelium: ${gospel.reference}` }
              : null
          }
          onOpenText={onOpenText}
        />

        {/* Blurred text underneath — fades out at bottom */}
        {hasText ? (
          <div className="relative mt-6">
            <div className="max-h-[280px] overflow-hidden">
              {localRef && (
                <p className="mb-3 font-cormorant text-[15px] font-semibold uppercase tracking-[0.06em] text-brick blur-[2px]">
                  {localRef}
                </p>
              )}
              <div className="font-literata text-[18px] leading-[2.0] text-text whitespace-pre-wrap text-justify hyphens-auto blur-[3px] select-none">
                {localText}
              </div>
            </div>
            {/* Fade-out gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-sm italic leading-relaxed text-text-muted">
              {`V dal\u0161\u00EDm kroku sem vlo\u017E\u00ED\u0161 text perikopy, se kterou bude\u0161 pracovat.`}
            </p>
            {showSupabaseSuggestion && (
              <SundaySuggestion reading={currentReading} onApply={applyReading} />
            )}
            {showLectionarySuggestion && (
              <LectionarySuggestion
                entry={lectionary.entry!}
                onApply={applyReading}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light shrink-0">
            {`Biblick\u00FD text`}
          </p>
          {hasText && localSource && (
            <span
              className="inline-flex items-center rounded-full border border-sage/30 bg-sage-pale/40 px-2 py-0.5 text-[10px] font-medium text-sage"
              title={localSource === "custom"
                ? "Text vlo\u017Een\u00FD u\u017Eivatelem \u2014 p\u0159eklad nen\u00ED ozna\u010Den"
                : `P\u0159eklad na\u010Dten\u00FD z ${TEXT_SOURCE_LABELS[localSource]}`}
            >
              {TEXT_SOURCE_LABELS[localSource]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {showSaved && (
            <span className="text-[11px] text-sage">{`\u2713 Ulo\u017Eeno`}</span>
          )}
          {hasText && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-[11px] font-medium text-text-light hover:text-brick"
            >
              {`Upravit`}
            </button>
          )}
        </div>
      </div>

      {/* Sunday reading suggestion when empty */}
      {showSupabaseSuggestion && (
        <SundaySuggestion reading={currentReading} onApply={applyReading} />
      )}
      {showLectionarySuggestion && (
        <LectionarySuggestion entry={lectionary.entry!} onApply={applyReading} />
      )}

      {/* Reference input */}
      {(showTextarea || !hasText) && (
        <input
          type="text"
          value={localRef}
          onChange={(e) => {
            setLocalRef(e.target.value);
            saveRef(e.target.value);
          }}
          placeholder={`Odkaz (nap\u0159. Mk 4,1\u201320)`}
          className="mb-2 w-full rounded-lg border border-border/70 bg-white/80 px-3 py-1.5 text-xs text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
        />
      )}

      {/* Annotation guide — always available on annotation-enabled steps */}
      {annotationsEnabled && hasText && !editing && (
        <AnnotationGuide hasAnnotations={annotations.length > 0} />
      )}

      {/* Text mismatch warning */}
      {textMismatch && hasText && !editing && (
        <div className="mb-3 flex items-center justify-between rounded-lg border border-brick/20 bg-brick-pale px-3 py-2">
          <p className="text-[11px] text-brick">
            {`Text se zm\u011Bnil, anotace nemus\u00ED odpov\u00EDdat.`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={syncHash}
              className="text-[11px] font-medium text-brick hover:underline"
            >
              {`Ponechat`}
            </button>
            <button
              onClick={clearAnnotations}
              className="text-[11px] font-medium text-text-light hover:text-brick"
            >
              {`Smazat anotace`}
            </button>
          </div>
        </div>
      )}

      {/* Annotation legend */}
      {annotationsEnabled && annotations.length > 0 && hasText && !editing && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-text-light">
            {`${annotations.length} anotac\u00ED`}
          </span>
          {annotationCategories.map((cat) => {
            const count = annotations.filter((a) => a.category === cat.id).length;
            if (count === 0) return null;
            return (
              <span
                key={cat.id}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.bg} ${cat.color}`}
              >
                {cat.name} {count}
              </span>
            );
          })}
        </div>
      )}

      {/* Text display or textarea */}
      {hasText && !editing ? (
        <>
          <div>
              {localRef && (
                <p className="mb-3 flex flex-wrap items-baseline gap-x-2 font-cormorant text-[15px] font-semibold uppercase tracking-[0.06em] text-brick">
                  <span>{localRef}</span>
                  {localSource && (
                    <span className="text-[11px] font-medium tracking-[0.1em] text-text-light">
                      {`\u00B7 ${TEXT_SOURCE_LABELS[localSource]}`}
                    </span>
                  )}
                </p>
              )}
              {annotationsEnabled ? (
                <AnnotatedTextDisplay
                  text={localText}
                  annotations={annotations}
                  onAddAnnotation={addAnnotation}
                  onRemoveAnnotation={removeAnnotation}
                  onUpdateNote={updateNote}
                  className="font-literata text-[18px] leading-[2.0] text-text whitespace-pre-wrap text-justify hyphens-auto"
                />
              ) : (
                <div className="font-literata text-[18px] leading-[2.0] text-text whitespace-pre-wrap text-justify hyphens-auto">
                  {localText}
                </div>
              )}

            </div>

        </>
      ) : (
        <div>
          {localRef && !showTextarea && (
            <p className="mb-3 font-cormorant text-[15px] font-semibold uppercase tracking-[0.06em] text-brick">
              {localRef}
            </p>
          )}
          <textarea
            value={localText}
            onChange={(e) => {
              setLocalText(e.target.value);
              saveText(e.target.value);
            }}
            placeholder={`Vlo\u017Ete text perikopy\u2026`}
            rows={8}
            className="w-full resize-none rounded-lg border border-border/70 bg-white/80 p-4 font-literata text-[17px] leading-[1.9] text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
          />
          {editing && hasText && (
            <button
              onClick={() => setEditing(false)}
              className="mt-2 text-xs font-medium text-brick hover:text-brick-light"
            >
              {`Hotovo`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** Guide explaining annotation categories — collapsible, always available */
function AnnotationGuide({ hasAnnotations }: { hasAnnotations: boolean }) {
  const [open, setOpen] = useState(!hasAnnotations);

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1.5 text-left"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-sage"
        >
          <circle cx="10" cy="10" r="8" />
          <path d="M10 9v4M10 7v0" />
        </svg>
        <span className="text-[11px] font-medium text-sage">
          {`Pro\u010D ozna\u010Dovat text?`}
        </span>
        <svg
          width="12"
          height="12"
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
        <div className="mt-2 rounded-lg border border-sage/20 bg-sage-pale/50 px-3 py-3">
          <p className="mb-3 text-[11px] leading-relaxed text-text-muted">
            {`Ozna\u010Dov\u00E1n\u00ED ti pom\u016F\u017Ee vid\u011Bt text hloub\u011Bji. Ozna\u010D my\u0161\u00ED libovolnou fr\u00E1zi a vyber kategorii. Pozn\u00E1mky z\u016Fstanou ulo\u017Een\u00E9 a prov\u00E1z\u00ED t\u011B v\u0161emi kroky.`}
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${annotationCategories[0].bg} ${annotationCategories[0].color}`}>
                {annotationCategories[0].name}
              </span>
              <p className="text-[11px] leading-relaxed text-text-muted">
                {`Opakuj\u00EDc\u00ED se slova a hlavn\u00ED pojmy. Ve v\u00FDkladu z nich vych\u00E1z\u00ED\u0161.`}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${annotationCategories[1].bg} ${annotationCategories[1].color}`}>
                {annotationCategories[1].name}
              </span>
              <p className="text-[11px] leading-relaxed text-text-muted">
                {`Kdo v textu jedn\u00E1, mluv\u00ED, co se d\u011Bje. Pom\u016F\u017Ee vid\u011Bt p\u0159\u00EDb\u011Bh.`}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${annotationCategories[2].bg} ${annotationCategories[2].color}`}>
                {annotationCategories[2].name}
              </span>
              <p className="text-[11px] leading-relaxed text-text-muted">
                {`P\u0159ed\u011Bly, kontrasty, p\u0159ekvapen\u00ED. Pr\u00E1v\u011B tam b\u00FDv\u00E1 j\u00E1dro k\u00E1z\u00E1n\u00ED.`}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${annotationCategories[3].bg} ${annotationCategories[3].color}`}>
                {annotationCategories[3].name}
              </span>
              <p className="text-[11px] leading-relaxed text-text-muted">
                {`Co ti nen\u00ED jasn\u00E9 nebo t\u011B zarazilo. Stoj\u00ED za to hledat odpov\u011B\u010F.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Compact card showing current Sunday's readings from CČSH lectionary */
function SundaySuggestion({
  reading,
  onApply,
}: {
  reading: NonNullable<ReturnType<typeof useCurrentReading>["data"]>;
  onApply: (reference: string, text: string, source?: TextSource) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-3 rounded-lg border border-brick/15 bg-white/70 p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brick">
            {`Tuto ned\u011Bli v CC\u0160H`}
          </p>
          <p className="mt-0.5 text-xs font-medium text-text">
            {reading.sundayTitle}
          </p>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-light transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {reading.readings.map((r) => (
            <button
              key={r.type}
              onClick={() => onApply(r.reference, r.text, "cep")}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all hover:bg-brick-pale"
            >
              <span className="shrink-0 text-[10px] font-semibold uppercase text-text-light">
                {r.label}
              </span>
              <span className="flex-1 truncate text-xs font-medium text-text">
                {r.reference}
              </span>
              <span className="shrink-0 text-[10px] text-brick">
                {`Pou\u017E\u00EDt \u2192`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Card showing current Sunday's readings from static CČSH lectionary
 * (works without Supabase). Fetches full text from ČEP on demand.
 */
function LectionarySuggestion({
  entry,
  onApply,
}: {
  entry: NonNullable<ReturnType<typeof useLectionaryReading>["entry"]>;
  onApply: (reference: string, text: string, source?: TextSource) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readings = [
    { key: "first", label: entry.readings.first?.label, data: entry.readings.first },
    { key: "second", label: entry.readings.second?.label, data: entry.readings.second },
    { key: "gospel", label: entry.readings.gospel?.label, data: entry.readings.gospel },
  ].filter((r) => r.data !== null && r.data !== undefined) as Array<{
    key: string;
    label: string;
    data: LectionaryReading;
  }>;

  const handleFetch = async (r: LectionaryReading) => {
    setLoadingKey(r.reference);
    setError(null);
    try {
      const chapter = await fetchChapter(r.bookNumber, r.chapter, "cep");
      if (!chapter) {
        setError(`Nepoda\u0159ilo se na\u010d\u00EDst ${r.reference} z \u010CEP.`);
        setLoadingKey(null);
        return;
      }

      // Filter verses by range
      const versesToUse = chapter.verses.filter((v) => {
        if (r.verseStart === null || r.verseStart === undefined) return true;
        if (v.verse < r.verseStart) return false;
        if (r.verseEnd !== null && r.verseEnd !== undefined && v.verse > r.verseEnd) return false;
        return true;
      });

      const text = versesToUse.map((v) => v.text).join(" ");
      const ref = formatReference(r.bookNumber, r.chapter, r.verseStart, r.verseEnd);
      onApply(ref, text, "cep");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Chyba p\u0159i na\u010D\u00EDt\u00E1n\u00ED textu."
      );
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <div className="mt-3 rounded-lg border border-brick/15 bg-white/70 p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brick">
            {`Tuto ned\u011Bli v C\u010CSH`}
          </p>
          <p className="mt-0.5 text-xs font-medium text-text">
            {entry.sundayName}
          </p>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-light transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          <p className="text-[10px] text-text-light">
            {`Klikni na \u010Dten\u00ED \u2014 na\u010Dte se text z \u010CEP p\u0159ekladu.`}
          </p>
          {readings.map((r) => {
            const isLoading = loadingKey === r.data.reference;
            return (
              <button
                key={r.key}
                onClick={() => handleFetch(r.data)}
                disabled={isLoading}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all hover:bg-brick-pale disabled:opacity-50"
              >
                <span className="shrink-0 text-[10px] font-semibold uppercase text-text-light">
                  {r.label}
                </span>
                <span className="flex-1 truncate text-xs font-medium text-text">
                  {r.data.reference}
                </span>
                <span className="shrink-0 text-[10px] text-brick">
                  {isLoading ? `Na\u010D\u00EDt\u00E1m\u2026` : `Na\u010D\u00EDst \u2192`}
                </span>
              </button>
            );
          })}
          {error && (
            <p className="text-[11px] text-brick">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
