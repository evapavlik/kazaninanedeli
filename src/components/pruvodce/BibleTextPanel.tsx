"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentReading } from "@/hooks/useCurrentReading";
import { useAnnotations } from "@/hooks/useAnnotations";
import { annotationCategories } from "@/data/annotation-categories";
import AnnotatedTextDisplay from "./AnnotatedTextDisplay";
import BibleContextView from "./BibleContextView";
import TranslationCompare from "./TranslationCompare";
import OriginalLanguagesPanel from "./OriginalLanguagesPanel";
import CentralIdeaField from "./CentralIdeaField";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import { getCommentary } from "@/data/commentary-notes";
import { findPostily, type PostilaMatch } from "@/lib/supabase-cteni";
import { parseReferenceForApi, getBibleHubCommentaryUrl } from "@/lib/getbible";

interface BibleTextPanelProps {
  currentSlug: string;
  focusMode?: boolean;
  onFocusToggle?: () => void;
}

export default function BibleTextPanel({ currentSlug, focusMode, onFocusToggle }: BibleTextPanelProps) {
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

  // Tool bubbles: which tool is open on the workspace
  const [openTool, setOpenTool] = useState<string | null>(null);
  const toggleTool = (key: string) => setOpenTool((prev) => (prev === key ? null : key));

  const hasText = localText.trim().length > 0;
  const isFirstStep = currentSlug === "modlitba";
  const isContextStep = currentSlug === "kontext";
  const isReadingStep = currentSlug === "cteni";
  const isExegesisStep = currentSlug === "vyklad";
  const showTextarea = !hasText || editing || isFirstStep;

  // Show reading suggestion when no text is entered yet
  const showSuggestion = !hasText && !readingLoading && currentReading && currentReading.readings.length > 0;

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
            {showSuggestion && (
              <SundaySuggestion reading={currentReading} onApply={applyReading} />
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

          {/* Tool bubbles — clickable chips, specific per sub-step */}
          {localRef && !isFirstStep && (
            <ToolBubbles
              slug={currentSlug}
              reference={localRef}
              openTool={openTool}
              onToggle={toggleTool}
            />
          )}
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



/** Tool configuration per sub-step */
interface ToolBubble {
  key: string;
  icon: string;
  label: string;
}

const TOOLS_BY_STEP: Record<string, ToolBubble[]> = {
  cteni: [
    { key: "translations", icon: "\uD83D\uDD04", label: `Jak to \u010Dtou jin\u00ED?` },
  ],
  kontext: [
    { key: "bookContext", icon: "\uD83D\uDCD6", label: `Co je kolem textu?` },
    { key: "liturgy", icon: "\uD83D\uDCC5", label: `Pro\u010D zrovna dnes?` },
  ],
  vyklad: [
    { key: "originals", icon: "\u03B1", label: `Co \u0159\u00EDk\u00E1 origin\u00E1l?` },
    { key: "centralIdea", icon: "\uD83D\uDCA1", label: `Hlavn\u00ED my\u0161lenka` },
    { key: "translations", icon: "\uD83D\uDD04", label: `Jak to \u010Dtou jin\u00ED?` },
    { key: "commentary", icon: "\uD83D\uDCD6", label: `Co \u0159\u00EDkaj\u00ED odborn\u00EDci?` },
  ],
};

function ToolBubbles({
  slug,
  reference,
  openTool,
  onToggle,
}: {
  slug: string;
  reference: string;
  openTool: string | null;
  onToggle: (key: string) => void;
}) {
  const tools = TOOLS_BY_STEP[slug] || [];
  const [animated, setAnimated] = useState(false);

  // Trigger bounce animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, [slug]);

  if (tools.length === 0) return null;

  return (
    <div className="mt-4">
      {/* Bubble chips with staggered bounce */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tools.map((tool, i) => (
          <button
            key={tool.key}
            onClick={() => onToggle(tool.key)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium transition-all ${
              openTool === tool.key
                ? "bg-brick text-white shadow-sm scale-105"
                : "border border-border bg-white text-text-muted hover:border-brick/30 hover:text-brick hover:shadow-sm hover:-translate-y-0.5"
            }`}
            style={{
              animation: animated && openTool !== tool.key
                ? `bubble-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s both`
                : undefined,
            }}
          >
            <span className="text-base">{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
      <style>{`
        @keyframes bubble-bounce {
          0% { opacity: 0; transform: scale(0.3) translateY(10px); }
          50% { transform: scale(1.08) translateY(-3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Expanded tool content */}
      {openTool === "translations" && (
        <div className="rounded-xl border border-border bg-white p-4">
          <TranslationCompare reference={reference} />
        </div>
      )}
      {openTool === "bookContext" && (
        <div className="rounded-xl border border-border bg-white p-4">
          <BibleContextView reference={reference} />
        </div>
      )}
      {openTool === "liturgy" && (
        <div className="rounded-xl border border-border bg-white p-4">
          <LiturgicalCalendar />
        </div>
      )}
      {openTool === "originals" && (
        <div className="rounded-xl border border-border bg-white p-4">
          <OriginalLanguagesPanel reference={reference} />
        </div>
      )}
      {openTool === "centralIdea" && (
        <div className="rounded-xl border border-border bg-white p-4">
          <CentralIdeaField />
        </div>
      )}
      {openTool === "commentary" && (
        <div className="rounded-xl border border-border bg-white p-4">
          <CommentaryPanel reference={reference} />
        </div>
      )}
    </div>
  );
}

/** Commentary panel — shows exegetical notes + Farský postily + BibleHub link */
function CommentaryPanel({ reference }: { reference: string }) {
  const parsed = parseReferenceForApi(reference);
  const commentary = parsed ? getCommentary(parsed.bookNumber, parsed.chapter) : null;
  const commentaryUrl = parsed ? getBibleHubCommentaryUrl(parsed.bookNumber, parsed.chapter) : null;

  // Fetch Farský postily from Supabase
  const [postily, setPostily] = useState<PostilaMatch[]>([]);
  const [postilyLoading, setPostilyLoading] = useState(false);
  const [expandedPostila, setExpandedPostila] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) return;
    setPostilyLoading(true);
    findPostily(reference)
      .then((matches) => setPostily(matches))
      .catch(() => setPostily([]))
      .finally(() => setPostilyLoading(false));
  }, [reference]);

  if (!commentary && !commentaryUrl && postily.length === 0 && !postilyLoading) {
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
          {/* Title + context */}
          <div>
            <h3 className="font-lora text-base font-bold text-text">
              {commentary.title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-text-muted">
              {commentary.context}
            </p>
          </div>

          {/* Key words */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Kl\u00ED\u010Dov\u00E1 slova`}
            </p>
            <div className="space-y-2">
              {commentary.keyWords.map((kw, i) => (
                <div key={i} className="rounded-lg bg-sage-pale/30 px-3 py-2">
                  <p className="text-[13px] font-semibold text-text">{kw.word}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-text-muted">{kw.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Structure */}
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Struktura textu`}
            </p>
            <p className="text-[13px] leading-relaxed text-text-muted">{commentary.structure}</p>
          </div>

          {/* Verse notes */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Pozn\u00E1mky k ver\u0161\u016Fm`}
            </p>
            <div className="space-y-2">
              {commentary.verseNotes.map((vn) => (
                <div key={vn.verse} className="flex gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brick-pale text-[10px] font-bold text-brick">
                    {vn.verse}
                  </span>
                  <p className="text-[12px] leading-relaxed text-text-muted">{vn.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Theological themes */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Teologick\u00E1 t\u00E9mata`}
            </p>
            <ul className="space-y-1">
              {commentary.theologicalThemes.map((theme, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brick/40" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          {/* Application hints */}
          <div className="rounded-lg border border-brick/10 bg-brick-pale/30 px-4 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick/70">
              {`N\u00E1m\u011Bty pro k\u00E1z\u00E1n\u00ED`}
            </p>
            <ul className="space-y-1.5">
              {commentary.applicationHints.map((hint, i) => (
                <li key={i} className="text-[12px] leading-relaxed text-text">
                  {`\u2192 ${hint}`}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Farský postily from Supabase */}
      {postilyLoading && (
        <div className="flex items-center gap-2 text-[12px] text-text-light">
          <span className="animate-pulse">{"\u2615"}</span>
          {`Hled\u00E1m postily Karla Farsk\u00E9ho...`}
        </div>
      )}
      {postily.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick/70">
            {`Postily Karla Farsk\u00E9ho`}
          </p>
          <div className="space-y-2">
            {postily.map((p) => (
              <div key={p.id} className="rounded-lg border border-brick/10 bg-brick-pale/20">
                <button
                  onClick={() => setExpandedPostila(expandedPostila === p.id ? null : p.id)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left"
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-text">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-light">
                      {p.biblical_references.join(", ")}
                      {p.liturgical_context ? ` \u2014 ${p.liturgical_context}` : ""}
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-brick/50 transition-transform ${expandedPostila === p.id ? "rotate-180" : ""}`}>
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>
                {expandedPostila === p.id && (
                  <div className="border-t border-brick/10 px-3 py-3">
                    {p.biblical_text && (
                      <div className="mb-3 rounded-md bg-white/60 px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-sage/70 mb-1">
                          {`Biblick\u00FD text`}
                        </p>
                        <p className="text-[12px] italic leading-relaxed text-text-muted">
                          {p.biblical_text}
                        </p>
                      </div>
                    )}
                    <PostilaContent content={p.content} />
                  </div>
                )}
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

/** Clean OCR text from Farský postily — fix line-break word splits */
function cleanOcrText(raw: string): string {
  return raw
    // Join words split across lines (word fragment + newline + continuation)
    .replace(/([a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FD\u010D\u010F\u011B\u0148\u0159\u0161\u0165\u016F\u017E])\n([a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FD\u010D\u010F\u011B\u0148\u0159\u0161\u0165\u016F\u017E])/gi, "$1$2")
    // Collapse remaining single newlines into spaces (keep double newlines as paragraphs)
    .replace(/([^\n])\n([^\n])/g, "$1 $2")
    // Clean up multiple spaces
    .replace(/ {2,}/g, " ")
    .trim();
}

/** Farský postila content — collapsible with cleaned OCR text */
function PostilaContent({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  const cleaned = cleanOcrText(content);
  const isLong = cleaned.length > 600;
  const displayText = isLong && !expanded ? cleaned.slice(0, 600) : cleaned;

  // Split into paragraphs on double newline
  const paragraphs = displayText.split(/\n\n+/).filter(Boolean);

  return (
    <div className="text-[12px] leading-relaxed text-text-muted">
      {paragraphs.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {para}
          {isLong && !expanded && i === paragraphs.length - 1 && "\u2026"}
        </p>
      ))}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-[11px] font-medium text-brick underline decoration-brick/30 hover:decoration-brick"
        >
          {expanded ? `Sbalit` : `Rozbalit cel\u00FD text`}
        </button>
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
          {`Zt\u0161\u00EDte se a otev\u0159ete se Bohu i textu.`}
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
