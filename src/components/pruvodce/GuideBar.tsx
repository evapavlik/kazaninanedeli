"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Phase, SubStep } from "@/types";
import type { FlowToolHelper } from "./UnifiedFlow";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import UnifiedFlow from "./UnifiedFlow";
import PreviousStepOutputs from "./PreviousStepOutputs";
import Notepad from "./Notepad";
import BibleContextView from "./BibleContextView";
import OriginalLanguagesPanel from "./OriginalLanguagesPanel";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import TranslationCompare from "./TranslationCompare";
import CommentaryPanel from "./CommentaryPanel";

interface GuideBarProps {
  phase: Phase;
  currentSub: SubStep;
  subSlug: string;
  activeSubStep: number;
  completedSubSteps: Set<number>;
  onSubStepSelect: (index: number) => void;
  flowToolHelpers: FlowToolHelper[];
  onFlowCountChange: (completed: number, total: number) => void;
  onNotepadContent: (hasContent: boolean) => void;
  artifacts?: SermonArtifacts;
  onArtifactChange?: (field: string, value: string) => void;
  prevPhase: { slug: string; title: string } | null;
  nextPhase: { slug: string; title: string } | null;
  reference: string;
  checkCount: { completed: number; total: number };
  onScrollToTranslations?: () => void;
}

const TOOL_LABELS: Record<string, string> = {
  translations: `Porovn\u00E1n\u00ED p\u0159eklad\u016F`,
  bookContext: "Kontext knihy",
  liturgy: `Liturgick\u00FD kalend\u00E1\u0159`,
  originals: `P\u016Fvodn\u00ED jazyky`,
  commentary: `Koment\u00E1\u0159e`,
};

export default function GuideBar({
  phase,
  currentSub,
  subSlug,
  activeSubStep,
  completedSubSteps,
  onSubStepSelect,
  flowToolHelpers,
  onFlowCountChange,
  onNotepadContent,
  artifacts,
  onArtifactChange,
  prevPhase,
  nextPhase,
  reference,
  checkCount,
  onScrollToTranslations,
}: GuideBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeToolView, setActiveToolView] = useState<string | null>(null);
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(true);
  const prevSubStepRef = useRef(activeSubStep);

  // Auto-expand on first visit
  useEffect(() => {
    if (!hasAutoExpanded) {
      const timer = setTimeout(() => {
        setExpanded(true);
        setHasAutoExpanded(true);
        setShouldPulse(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasAutoExpanded]);

  // Pulse on sub-step change
  useEffect(() => {
    if (activeSubStep !== prevSubStepRef.current) {
      prevSubStepRef.current = activeSubStep;
      setShouldPulse(true);
      setActiveToolView(null);
      const timer = setTimeout(() => setShouldPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeSubStep]);

  const handleToggle = () => {
    setShouldPulse(false);
    if (expanded) {
      setExpanded(false);
      setActiveToolView(null);
    } else {
      setExpanded(true);
    }
  };

  const handleOpenTool = (key: string) => {
    setActiveToolView(key);
  };

  const handleSubStepSelect = (index: number) => {
    onSubStepSelect(index);
    setActiveToolView(null);
  };

  // Portal: render directly in document.body to avoid parent CSS context issues
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const content = (
    <>
      {/* Scrim */}
      {expanded && (
        <div
          className="hidden lg:block fixed inset-0 z-30 bg-black/5"
          onClick={handleToggle}
        />
      )}

      {/* Guide bar */}
      <div
        className={`hidden lg:block fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-[0_-2px_16px_rgba(0,0,0,0.06)] transition-[max-height,border-radius,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          expanded
            ? "max-h-[70vh] overflow-y-auto rounded-t-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)]"
            : "max-h-[72px]"
        } ${shouldPulse && !expanded ? "animate-[guideBarPulse_1.5s_ease-in-out_2]" : ""}`}
      >
        {/* Collapsed bar — always visible */}
        <div
          onClick={handleToggle}
          className="flex h-[72px] cursor-pointer select-none items-center justify-between px-6 mx-auto max-w-4xl hover:bg-cream/50 transition-colors"
        >
          {/* Left: phase + step info */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brick-pale text-lg">
              {currentSub.icon}
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brick">
                {phase.title}
              </p>
              <p className="font-lora text-[15px] font-bold text-text">
                {currentSub.title}
              </p>
              {!expanded && currentSub.tip && (
                <p className="max-w-[280px] truncate text-[12px] text-text-light">
                  {currentSub.tip}
                </p>
              )}
            </div>
          </div>

          {/* Center: progress dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: checkCount.total || currentSub.flow.length }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i < checkCount.completed
                    ? "bg-brick"
                    : i === checkCount.completed
                      ? "border-2 border-brick bg-brick-pale"
                      : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Right: time + expand button */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-text-light">
              {`~${currentSub.estimatedMinutes} min`}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); handleToggle(); }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-text-light transition-all hover:border-brick hover:text-brick ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 10l4-4 4 4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded content */}
        <div className={`mx-auto max-w-4xl px-6 pb-6 transition-opacity duration-200 ${expanded ? "opacity-100 delay-150" : "opacity-0"}`}>
          {activeToolView ? (
            /* ---- TOOL VIEW ---- */
            <>
              <button
                onClick={() => setActiveToolView(null)}
                className="mb-2 flex items-center gap-1.5 text-[13px] font-medium text-brick hover:underline"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 3L5 8l5 5" />
                </svg>
                {`Zp\u011Bt k pr\u016Fvodci`}
              </button>
              <p className="mb-3 text-[11px] text-text-light">
                <span className="font-semibold text-brick">
                  {`Krok ${checkCount.completed + 1} z ${checkCount.total}`}
                </span>
                {" \u203A "}
                {TOOL_LABELS[activeToolView] || activeToolView}
              </p>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-brick">
                {TOOL_LABELS[activeToolView] || activeToolView}
              </h3>
              <div className="rounded-xl border border-border bg-white p-4">
                {activeToolView === "translations" && <TranslationCompare reference={reference} />}
                {activeToolView === "bookContext" && <BibleContextView reference={reference} />}
                {activeToolView === "liturgy" && <LiturgicalCalendar />}
                {activeToolView === "originals" && <OriginalLanguagesPanel reference={reference} />}
                {activeToolView === "commentary" && reference && (
                  <CommentaryPanel reference={reference} />
                )}
              </div>
            </>
          ) : (
            /* ---- GUIDE VIEW ---- */
            <>
              {/* Sub-step navigation — sticky so it stays visible when scrolling */}
              {phase.subSteps.length > 1 && (
                <div className="sticky top-0 z-10 bg-white -mx-6 px-6 mb-4 border-b border-border pb-3 pt-1">
                  <SubStepNav
                    subSteps={phase.subSteps}
                    activeIndex={activeSubStep}
                    completedIndices={completedSubSteps}
                    onSelect={handleSubStepSelect}
                  />
                </div>
              )}

              {/* Guide content — re-mounts on substep change, triggers entry animation */}
              <div key={`step-${activeSubStep}`} style={{ animation: 'stepEnter 0.35s ease-out' }}>

              {/* Theory */}
              <StepContext theory={currentSub.theory} tip={currentSub.tip} slug={subSlug} />

              {/* Description */}
              <p className="mb-4 text-[13px] font-light leading-[1.8] text-text-muted">
                {currentSub.description}
              </p>

              {/* Unified flow */}
              <UnifiedFlow
                slug={subSlug}
                items={currentSub.flow}
                toolHelpers={flowToolHelpers}
                onCountChange={onFlowCountChange}
                artifacts={artifacts}
                onArtifactChange={onArtifactChange}
                onOpenTool={handleOpenTool}
              />

              {/* Previous step outputs */}
              <PreviousStepOutputs subStepSlug={subSlug} />

              {/* Notepad */}
              <div className="mt-3">
                <Notepad
                  slug={subSlug}
                  isOpen={false}
                  onToggle={() => {}}
                  onHasContentChange={onNotepadContent}
                />
              </div>

              </div>

              {/* Navigation */}
              <nav className="mt-6 flex items-center justify-between border-t border-border pt-6">
                {prevPhase ? (
                  <Link
                    href={`/pruvodce/${prevPhase.slug}`}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 3L5 8l5 5" />
                    </svg>
                    {prevPhase.title}
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 3L5 8l5 5" />
                    </svg>
                    {`\u00DAvod`}
                  </Link>
                )}

                {nextPhase ? (
                  <Link
                    href={`/pruvodce/${nextPhase.slug}`}
                    className="flex items-center gap-2 rounded-md bg-brick px-5 py-2 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
                  >
                    {nextPhase.title}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-md bg-brick px-5 py-2 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
                  >
                    Hotovo!
                  </Link>
                )}
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  );

  if (!portalTarget) return null;
  return createPortal(content, portalTarget);
}
