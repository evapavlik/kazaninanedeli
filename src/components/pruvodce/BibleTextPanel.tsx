"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentReading } from "@/hooks/useCurrentReading";
import { useLectionaryReading } from "@/hooks/useLectionaryReading";
import { useAnnotations } from "@/hooks/useAnnotations";
import { annotationCategories } from "@/data/annotation-categories";
import type { LectionaryReading } from "@/data/lectionary";
import AnnotatedTextDisplay from "./AnnotatedTextDisplay";
import BibleContextView from "./BibleContextView";
import TranslationCompare from "./TranslationCompare";
import OriginalLanguagesPanel from "./OriginalLanguagesPanel";
import SermonInspirationPanel from "./SermonInspirationPanel";
import CentralIdeaField from "./CentralIdeaField";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import { getCommentary, type PericopeCommentary } from "@/data/commentary-notes";
import { fetchCommentary } from "@/lib/supabase-cteni";
import { parseReferenceForApi, getBibleHubCommentaryUrl, fetchChapter, formatReference } from "@/lib/getbible";

interface BibleTextPanelProps {
  currentSlug: string;
  focusMode?: boolean;
  onFocusToggle?: () => void;
  /** Expose tool opener to parent (drawer can open tools on workspace) */
  onToolOpenerReady?: (opener: (key: string) => void) => void;
}

export default function BibleTextPanel({ currentSlug, focusMode, onFocusToggle, onToolOpenerReady }: BibleTextPanelProps) {
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

  // Tool bubbles: which tool is open on the workspace
  const [openTool, setOpenTool] = useState<string | null>(null);
  const toggleTool = (key: string) => setOpenTool((prev) => (prev === key ? null : key));
  const openToolDirect = useCallback((key: string) => setOpenTool(key), []);

  // Expose tool opener to parent
  useEffect(() => {
    onToolOpenerReady?.(openToolDirect);
  }, [onToolOpenerReady, openToolDirect]);

  const hasText = localText.trim().length > 0;
  const isFirstStep = currentSlug === "modlitba";
  const isContextStep = currentSlug === "kontext";
  const isReadingStep = currentSlug === "cteni";
  const isExegesisStep = currentSlug === "vyklad";
  const showTextarea = !hasText || editing || isFirstStep;

  // Show reading suggestion when no text is entered yet.
  // Prefer Supabase (has full text), fall back to static lectionary (always works).
  const showSupabaseSuggestion =
    !hasText && !readingLoading && currentReading && currentReading.readings.length > 0;
  const showLectionarySuggestion = !hasText && !showSupabaseSuggestion && lectionary.entry;

  // Annotations enabled only from step 2 onwards
  const annotationsEnabled = !isFirstStep && currentSlug !== "modlitba";

  // Step 1: breathing exercise first, blurred text underneath
  if (isFirstStep) {
    return (
      <div className="rounded-xl border border-border bg-cream p-5 lg:p-6">
        {/* Breathing exercise — always visible, always first */}
        <BreathingExercise />

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
              {`V dal\u0161\u00EDm kroku sem vlo\u017E\u00EDte text perikopy, se kterou budete pracovat.`}
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



/** Unified tool list — numbered, always visible, follows Pokorn\u00FD's method */
interface ToolBubble {
  key: string;
  icon: string;
  label: string;
  number: number;
}

const ALL_TOOLS: ToolBubble[] = [
  { key: "translations", icon: "\uD83D\uDD04", label: `Porovnat p\u0159eklady`, number: 1 },
  { key: "bookContext", icon: "\uD83D\uDCD6", label: `Kontext knihy`, number: 2 },
  { key: "liturgy", icon: "\uD83D\uDCC5", label: `Liturgick\u00FD kalend\u00E1\u0159`, number: 3 },
  { key: "originals", icon: "\u03B1", label: `P\u016Fvodn\u00ED jazyky`, number: 4 },
  { key: "commentary", icon: "\uD83D\uDCDA", label: `V\u00FDkladov\u00E9 koment\u00E1\u0159e`, number: 5 },
];

/** Sticky toolbar — minimal, integrated with text aesthetic */
function ToolBubbles({
  openTool,
  onToggle,
}: {
  openTool: string | null;
  onToggle: (key: string) => void;
}) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex items-center gap-1">
        {ALL_TOOLS.map((tool, i) => {
          const isActive = openTool === tool.key;
          return (
            <button
              key={tool.key}
              onClick={() => onToggle(tool.key)}
              className={`group relative flex items-center gap-1 rounded-md px-2 py-1 text-[11px] transition-all ${
                isActive
                  ? "bg-brick/10 text-brick"
                  : "text-text-light hover:bg-brick-pale/50 hover:text-brick"
              }`}
              style={{
                animation: animated && !isActive
                  ? `tool-fade 0.4s ease-out ${i * 0.06}s both`
                  : undefined,
              }}
              title={tool.label}
            >
              <span className={`text-[9px] font-bold tabular-nums ${
                isActive ? "text-brick" : "text-text-light/60 group-hover:text-brick/60"
              }`}>
                {tool.number}
              </span>
              <span className="text-[13px]">{tool.icon}</span>
              <span className={`hidden sm:inline text-[11px] font-medium ${
                isActive ? "text-brick" : ""
              }`}>
                {tool.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-[5px] left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-brick" />
              )}
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes tool-fade {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

/** Expanded tool content — rendered separately below text */
function ToolContent({ openTool, reference }: { openTool: string | null; reference: string }) {
  if (!openTool) return null;

  return (
    <div className="mt-4 rounded-xl border border-border bg-white p-4">
      {openTool === "translations" && <TranslationCompare reference={reference} />}
      {openTool === "bookContext" && <BibleContextView reference={reference} />}
      {openTool === "liturgy" && <LiturgicalCalendar />}
      {openTool === "originals" && <OriginalLanguagesPanel reference={reference} />}
      {openTool === "commentary" && <CommentaryPanel reference={reference} />}
      {openTool === "sermons" && <SermonInspirationPanel reference={reference} />}
    </div>
  );
}

/**
 * Commentary panel — exegetical notes (AI) + BibleHub link.
 * Farský postily moved to separate SermonInspirationPanel.
 */
function CommentaryPanel({ reference }: { reference: string }) {
  const parsed = parseReferenceForApi(reference);
  const commentaryUrl = parsed ? getBibleHubCommentaryUrl(parsed.bookNumber, parsed.chapter) : null;

  // Fetch commentary from DB, fallback to local
  const [commentary, setCommentary] = useState<PericopeCommentary | null>(
    parsed ? getCommentary(parsed.bookNumber, parsed.chapter) : null
  );
  const [commentaryLoading, setCommentaryLoading] = useState(false);

  useEffect(() => {
    if (!parsed) return;
    setCommentaryLoading(true);
    fetchCommentary(parsed.bookNumber, parsed.chapter)
      .then((dbData) => {
        if (dbData) {
          // Map DB format to local format
          setCommentary({
            reference: dbData.reference,
            title: dbData.title,
            context: dbData.context,
            keyWords: dbData.key_words,
            structure: dbData.structure,
            theologicalThemes: dbData.theological_themes,
            applicationHints: dbData.application_hints,
            verseNotes: dbData.verse_notes,
            cross_references: dbData.cross_references || [],
          });
        }
        // If DB returns nothing, keep local fallback (already set in useState)
      })
      .catch(() => {
        // Keep local fallback
      })
      .finally(() => setCommentaryLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (!commentary && !commentaryUrl && !commentaryLoading) {
    return (
      <p className="text-sm italic text-text-muted">
        {`Koment\u00E1\u0159e k tomuto textu zat\u00EDm nejsou k dispozici.`}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {commentary && (
        <>
          {/* AI-generated content warning */}
          <div className="rounded-lg border border-amber-300/60 bg-amber-50/70 px-3.5 py-3">
            <div className="flex gap-2.5">
              <span className="shrink-0 text-amber-600 mt-0.5" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v4M10 13.5v.5" />
                </svg>
              </span>
              <p className="text-[13px] leading-[1.65] text-amber-900">
                <span className="font-semibold">{`Pozn\u00E1mka: `}</span>
                {`Tyto podn\u011Bty jsou AI-generovan\u00FD n\u00E1vrh, ne autoritativn\u00ED v\u00FDklad. Pracuj s nimi kriticky a ov\u011B\u0159 v odborn\u00E9 literatu\u0159e.`}
              </p>
            </div>
          </div>

          {/* Title + context */}
          <div>
            <h3 className="font-lora text-lg font-bold text-text">
              {commentary.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.75] text-text">
              {commentary.context}
            </p>
          </div>

          {/* Key words */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Kl\u00ED\u010Dov\u00E1 slova`}
            </p>
            <div className="space-y-2.5">
              {commentary.keyWords.map((kw, i) => (
                <div key={i} className="rounded-lg bg-sage-pale/30 px-3.5 py-2.5">
                  <p className="text-[15px] font-semibold text-text">{kw.word}</p>
                  <p className="mt-1 text-[14px] leading-[1.7] text-text">{kw.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Structure */}
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Struktura textu`}
            </p>
            <p className="text-[15px] leading-[1.75] text-text">{commentary.structure}</p>
          </div>

          {/* Verse notes */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Pozn\u00E1mky k ver\u0161\u016Fm`}
            </p>
            <div className="space-y-2.5">
              {commentary.verseNotes.map((vn) => (
                <div key={vn.verse} className="flex gap-2.5">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brick-pale text-[11px] font-bold text-brick">
                    {vn.verse}
                  </span>
                  <p className="text-[14px] leading-[1.7] text-text">{vn.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Theological themes */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Teologick\u00E1 t\u00E9mata`}
            </p>
            <ul className="space-y-1.5">
              {commentary.theologicalThemes.map((theme, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.7] text-text">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brick/40" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          {/* Application hints */}
          <div className="rounded-lg border border-brick/10 bg-brick-pale/30 px-4 py-3.5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick/70">
              {`N\u00E1m\u011Bty pro k\u00E1z\u00E1n\u00ED`}
            </p>
            <ul className="space-y-2">
              {commentary.applicationHints.map((hint, i) => (
                <li key={i} className="text-[14px] leading-[1.7] text-text">
                  {`\u2192 ${hint}`}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Cross references with inline Bible text */}
      {commentary?.cross_references && commentary.cross_references.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
            {`K\u0159\u00ED\u017Eov\u00E9 reference`}
          </p>
          <div className="space-y-3">
            {commentary.cross_references.map((ref, i) => (
              <div key={i} className="rounded-lg border border-sage/15 bg-sage-pale/20 px-3.5 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[12px] font-bold text-sage">{ref.reference}</span>
                  <span className="text-[11px] text-text-muted">({ref.translation})</span>
                </div>
                <p className="text-[14px] leading-[1.7] text-text italic border-l-2 border-sage/30 pl-2.5">
                  {ref.text}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-text-muted">
                  {`\u2192 ${ref.relevance}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BibleHub link — always show as additional resource */}
      {commentaryUrl && (
        <a
          href={commentaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-sage/20 bg-white/70 px-3 py-2.5 transition-all hover:border-sage/40 hover:bg-white"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sage/10">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage">
              <path d="M4 3h12v14H4z" />
              <path d="M7 7h6M7 10h6M7 13h4" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-text">
              {`BibleHub Commentaries`}
            </p>
            <p className="text-[10px] text-text-muted">
              {`Dal\u0161\u00ED v\u00FDkladov\u00E9 koment\u00E1\u0159e (anglicky)`}
            </p>
          </div>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-sage/50">
            <path d="M5 15L15 5M15 5H8M15 5v7" />
          </svg>
        </a>
      )}
    </div>
  );
}

/** Pericope text shown above context view in step 3 — clearly marked as sermon text */
function PericopeCard({ refText, text }: { refText: string; text: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-4 rounded-lg border-2 border-brick/30 bg-white/90 shadow-sm">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-brick">
              <path d="M4 4h12M4 8h12M4 12h8" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brick">
              {`Text ke k\u00E1z\u00E1n\u00ED`}
            </span>
          </span>
          <span className="font-cormorant text-[14px] font-semibold text-text">
            {refText}
          </span>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-light/50 transition-transform ${collapsed ? "" : "rotate-180"}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>
      {!collapsed && (
        <div className="border-t border-brick/15 px-4 py-3">
          <div className="font-literata text-[16px] leading-[1.9] text-text whitespace-pre-wrap text-justify hyphens-auto">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

/** Breathing exercise for step 1 — inspired by meditation apps */
function BreathingExercise() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("exhale");
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const INHALE = 4;
  const HOLD = 2;
  const EXHALE = 6;
  const TOTAL_CYCLES = 3;

  const phaseLabels = {
    inhale: `N\u00E1dech`,
    hold: `Zadr\u017Eet`,
    exhale: `V\u00FDdech`,
  };

  useEffect(() => {
    if (!active) return;

    let currentPhase: "inhale" | "hold" | "exhale" = "inhale";
    let tick = 0;
    let cycles = 0;

    setPhase("exhale");
    setCount(INHALE);

    // Brief delay so browser renders small circle, then start growing
    const startDelay = setTimeout(() => {
      setPhase("inhale");
    }, 50);

    const phaseDurations = { inhale: INHALE, hold: HOLD, exhale: EXHALE };

    intervalRef.current = setInterval(() => {
      tick++;
      const duration = phaseDurations[currentPhase];
      const remaining = duration - (tick % duration === 0 ? duration : tick % duration);

      if (tick % duration === 0) {
        // Move to next phase
        if (currentPhase === "inhale") {
          currentPhase = "hold";
          tick = 0;
          setPhase("hold");
          setCount(HOLD);
        } else if (currentPhase === "hold") {
          currentPhase = "exhale";
          tick = 0;
          setPhase("exhale");
          setCount(EXHALE);
        } else {
          cycles++;
          if (cycles >= TOTAL_CYCLES) {
            setActive(false);
            return;
          }
          currentPhase = "inhale";
          tick = 0;
          setPhase("inhale");
          setCount(INHALE);
        }
      } else {
        setCount(remaining);
      }
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!active) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center py-12">
        <p className="mb-2 font-cormorant text-[13px] font-semibold uppercase tracking-[0.2em] text-sage/70">
          {`P\u0159\u00EDprava srdce`}
        </p>
        <p className="mb-10 max-w-[240px] text-center font-literata text-[15px] italic leading-relaxed text-text-muted">
          {`Zti\u0161te se a otev\u0159ete se Bohu i textu.`}
        </p>
        <button
          onClick={() => setActive(true)}
          className="group flex flex-col items-center gap-4"
        >
          <div className="relative flex h-40 w-40 items-center justify-center">
            {/* Outer pulsing ring */}
            <div className="breathe-ring absolute inset-0 rounded-full border border-sage/20" />
            {/* Inner breathing circle */}
            <div className="breathe-idle flex h-32 w-32 items-center justify-center rounded-full bg-sage-pale/60 backdrop-blur-sm transition-colors duration-500 group-hover:bg-sage-pale">
              <span className="font-literata text-base font-medium text-sage">{`D\u00FDchat`}</span>
            </div>
          </div>
          <span className="text-[11px] tracking-wide text-text-light/60">
            {`3 klidn\u00E9 cykly`}
          </span>
        </button>
      </div>
    );
  }

  // Circle scale: small at start/exhale, grows on inhale, holds at full
  const expanded = phase === "inhale" || phase === "hold";
  const duration = phase === "inhale" ? INHALE : phase === "exhale" ? EXHALE : 0.3;

  const circleStyle: React.CSSProperties = {
    transform: expanded ? "scale(1)" : "scale(0.55)",
    transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  const ringOuterStyle: React.CSSProperties = {
    transform: expanded ? "scale(1)" : "scale(0.6)",
    opacity: expanded ? 0.35 : 0.1,
    transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  const ringInnerStyle: React.CSSProperties = {
    transform: expanded ? "scale(1)" : "scale(0.58)",
    opacity: expanded ? 0.15 : 0.05,
    transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center py-12">
      <p className="mb-10 font-cormorant text-[13px] font-semibold uppercase tracking-[0.2em] text-sage/60">
        {`P\u0159\u00EDprava srdce`}
      </p>

      {/* Breathing circle — large, immersive */}
      <div className="relative mb-10 flex h-64 w-64 items-center justify-center">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border border-sage/30"
          style={ringOuterStyle}
        />
        {/* Middle ring */}
        <div
          className="absolute inset-4 rounded-full bg-sage/10"
          style={ringInnerStyle}
        />
        {/* Main breathing circle */}
        <div
          className="flex h-48 w-48 items-center justify-center rounded-full bg-sage-pale/80 shadow-[0_0_60px_rgba(74,124,111,0.12)]"
          style={circleStyle}
        >
          <div className="flex flex-col items-center">
            <span className="font-literata text-6xl font-light text-sage">{count}</span>
            <span className="mt-2 font-cormorant text-[15px] font-semibold uppercase tracking-[0.25em] text-sage/70">
              {phaseLabels[phase]}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setActive(false)}
        className="text-[11px] tracking-wide text-text-light/50 transition-colors hover:text-text-muted"
      >
        {`Ukon\u010Dit`}
      </button>
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
            {`Ozna\u010Dov\u00E1n\u00ED v\u00E1m pom\u016F\u017Ee vid\u011Bt text hloub\u011Bji. Ozna\u010Dte my\u0161\u00ED libovolnou fr\u00E1zi a vyberte kategorii. Pozn\u00E1mky z\u016Fstanou ulo\u017Een\u00E9 a prov\u00E1z\u00ED v\u00E1s v\u0161emi kroky.`}
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${annotationCategories[0].bg} ${annotationCategories[0].color}`}>
                {annotationCategories[0].name}
              </span>
              <p className="text-[11px] leading-relaxed text-text-muted">
                {`Opakuj\u00EDc\u00ED se slova a hlavn\u00ED pojmy. Ve v\u00FDkladu z nich vych\u00E1z\u00EDte.`}
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
                {`Co v\u00E1m nen\u00ED jasn\u00E9 nebo v\u00E1s zarazilo. Stoj\u00ED za to hledat odpov\u011B\u010F.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Commentary link for step 4 — matches checklist step 5 */
function CommentaryLink({ reference }: { reference: string }) {
  const parsed = parseReferenceForApi(reference);
  if (!parsed) return null;

  const commentaryUrl = getBibleHubCommentaryUrl(parsed.bookNumber, parsed.chapter);
  if (!commentaryUrl) return null;

  return (
    <div className="rounded-lg border border-border/50 bg-white/60 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brick/10 text-[11px] font-bold text-brick">
          {`5`}
        </span>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-light">
          <path d="M4 3h12v14H4z" />
          <path d="M7 7h6M7 10h4" />
        </svg>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-light">
          {`Koment\u00E1\u0159e k textu`}
        </p>
      </div>
      <a
        href={commentaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg border border-sage/20 bg-white/70 px-3 py-2.5 transition-all hover:border-sage/40 hover:bg-white"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sage/10">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage">
            <path d="M4 3h12v14H4z" />
            <path d="M7 7h6M7 10h6M7 13h4" />
          </svg>
        </span>
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-text">
            {`BibleHub Commentaries`}
          </p>
          <p className="text-[10px] text-text-muted">
            {`V\u00FDkladov\u00E9 koment\u00E1\u0159e k dan\u00E9 kapitole (anglicky)`}
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-sage/50">
          <path d="M5 15L15 5M15 5H8M15 5v7" />
        </svg>
      </a>
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

/**
 * Card showing current Sunday's readings from static CČSH lectionary
 * (works without Supabase). Fetches full text from ČEP on demand.
 */
function LectionarySuggestion({
  entry,
  onApply,
}: {
  entry: NonNullable<ReturnType<typeof useLectionaryReading>["entry"]>;
  onApply: (reference: string, text: string) => void;
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
      onApply(ref, text);
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
            {`Klikn\u011Bte na \u010Dten\u00ED \u2014 na\u010Dte se text z \u010CEP p\u0159ekladu.`}
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
