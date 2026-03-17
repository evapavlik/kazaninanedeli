"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentReading } from "@/hooks/useCurrentReading";
import { useAnnotations } from "@/hooks/useAnnotations";
import { annotationCategories } from "@/data/annotation-categories";
import AnnotatedTextDisplay from "./AnnotatedTextDisplay";

interface BibleTextPanelProps {
  currentSlug: string;
}

export default function BibleTextPanel({ currentSlug }: BibleTextPanelProps) {
  const [savedText, setSavedText] = useLocalStorage<string>(
    "kazani-bible-text",
    ""
  );
  const [savedRef, setSavedRef] = useLocalStorage<string>(
    "kazani-bible-ref",
    ""
  );
  const [localText, setLocalText] = useState("");
  const [localRef, setLocalRef] = useState("");
  const [editing, setEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedIndicatorRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fetch current Sunday reading from CČSH lectionary
  const { data: currentReading, loading: readingLoading } = useCurrentReading();

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
  }, [savedText, savedRef]);

  const saveText = useCallback(
    (text: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSavedText(text);
        setShowSaved(true);
        if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
        savedIndicatorRef.current = setTimeout(() => setShowSaved(false), 1500);
      }, 300);
    },
    [setSavedText]
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

  const applyReading = (reference: string, text: string) => {
    setLocalRef(reference);
    setLocalText(text);
    setSavedRef(reference);
    setSavedText(text);
    setEditing(false);
  };

  const hasText = localText.trim().length > 0;
  const isFirstStep = currentSlug === "modlitba";
  const showTextarea = !hasText || editing || isFirstStep;

  // Show reading suggestion when no text is entered yet
  const showSuggestion = !hasText && !readingLoading && currentReading && currentReading.readings.length > 0;

  // Annotations enabled only from step 2 onwards
  const annotationsEnabled = !isFirstStep && currentSlug !== "modlitba";

  // Step 1: quiet preview — no annotations, no editing, just text if present
  if (isFirstStep) {
    return (
      <div className="rounded-xl border border-border bg-cream p-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
          {`Biblick\u00FD text`}
        </p>
        {hasText ? (
          <div>
            {localRef && (
              <p className="mb-3 font-cormorant text-[15px] font-semibold uppercase tracking-[0.06em] text-brick">
                {localRef}
              </p>
            )}
            <div className="relative">
              <div className="font-literata text-[18px] leading-[2.0] text-text whitespace-pre-wrap text-justify hyphens-auto blur-[3px] select-none">
                {localText}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded-lg bg-cream/90 px-4 py-2 text-xs italic text-text-muted shadow-sm">
                  {`S textem budete pracovat od dal\u0161\u00EDho kroku.`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm italic leading-relaxed text-text-muted">
              {`V dal\u0161\u00EDm kroku sem vlo\u017E\u00EDte text perikopy, se kterou budete pracovat.`}
            </p>
            {/* Sunday reading suggestion */}
            {showSuggestion && (
              <SundaySuggestion reading={currentReading} onApply={applyReading} />
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
          {`Biblick\u00FD text`}
        </p>
        <div className="flex items-center gap-2">
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
      {showSuggestion && (
        <SundaySuggestion reading={currentReading} onApply={applyReading} />
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

      {/* Annotation guide — shown when no annotations yet */}
      {annotationsEnabled && annotations.length === 0 && hasText && !editing && (
        <AnnotationGuide />
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
        <div>
          {localRef && (
            <p className="mb-3 font-cormorant text-[15px] font-semibold uppercase tracking-[0.06em] text-brick">
              {localRef}
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

/** Short guide explaining how to use annotations */
function AnnotationGuide() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="mb-3 rounded-lg border border-sage/20 bg-sage-pale/50 px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-sage">
            {`Ozna\u010Dov\u00E1n\u00ED textu`}
          </p>
          <p className="mb-2 text-[11px] leading-relaxed text-text-muted">
            {`Ozna\u010Dte my\u0161\u00ED libovolnou fr\u00E1zi v textu a vyberte kategorii:`}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {annotationCategories.map((cat) => (
              <span
                key={cat.id}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.bg} ${cat.color}`}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-[11px] text-text-light hover:text-text-muted"
          title="Skr\u00FDt"
        >
          {"\u2715"}
        </button>
      </div>
    </div>
  );
}

/** Compact card showing current Sunday's readings from CČSH lectionary */
function SundaySuggestion({
  reading,
  onApply,
}: {
  reading: NonNullable<ReturnType<typeof useCurrentReading>["data"]>;
  onApply: (reference: string, text: string) => void;
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
              onClick={() => onApply(r.reference, r.text)}
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
