"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Phase, SubStep } from "@/types";
import { checklistToolMap } from "@/data/checklist-tool-map";
import type { FlowToolHelper } from "./UnifiedFlow";
import BibleTextPanel from "./BibleTextPanel";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import UnifiedFlow from "./UnifiedFlow";
import PreviousStepOutputs from "./PreviousStepOutputs";
import Notepad from "./Notepad";

// Tool components
import NarrativeTypeIdentifier from "@/components/tools/NarrativeTypeIdentifier";
import BibleBookContext from "@/components/tools/BibleBookContext";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import RoleIdentifier from "@/components/tools/RoleIdentifier";
import FCFHelper from "@/components/tools/FCFHelper";
import OutlineBuilder from "@/components/tools/OutlineBuilder";

interface StepContentPanelProps {
  phase: Phase;
  prevPhase: { slug: string; title: string } | null;
  nextPhase: { slug: string; title: string } | null;
}

function resolveToolComponent(
  componentKey: string,
  slug: string
): React.ReactNode {
  switch (componentKey) {
    case "NarrativeTypeIdentifier":
      return <NarrativeTypeIdentifier slug={slug} />;
    case "BibleBookContext":
      return <BibleBookContext slug={slug} />;
    case "LiturgicalCalendar":
      return <LiturgicalCalendar />;
    case "RoleIdentifier":
      return <RoleIdentifier slug={slug} />;
    case "FCFHelper":
      return <FCFHelper slug={slug} />;
    case "OutlineBuilder":
      return <OutlineBuilder slug={slug} />;
    default:
      return null;
  }
}

export default function StepContentPanel({
  phase,
  prevPhase,
  nextPhase,
}: StepContentPanelProps) {
  const [textPanelOpen, setTextPanelOpen] = useState(false);
  const [activeSubStep, setActiveSubStep] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  // Auto-minimize: guide shrinks when user focuses on text
  const [autoMinimized, setAutoMinimized] = useState(false);
  const minimizeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleTextEnter = useCallback(() => {
    minimizeTimerRef.current = setTimeout(() => setAutoMinimized(true), 400);
  }, []);

  const handleTextLeave = useCallback(() => {
    if (minimizeTimerRef.current) clearTimeout(minimizeTimerRef.current);
  }, []);

  const handleGuideEnter = useCallback(() => {
    if (minimizeTimerRef.current) clearTimeout(minimizeTimerRef.current);
    setAutoMinimized(false);
  }, []);

  // Track which sub-steps are completed — persist to localStorage
  const [completedSubStepsArr, setCompletedSubStepsArr] = useLocalStorage<number[]>(
    `kazani-completed-substeps-${phase.slug}`,
    []
  );
  const completedSubSteps = useMemo(() => new Set(completedSubStepsArr), [completedSubStepsArr]);
  const setCompletedSubSteps = useCallback((updater: (prev: Set<number>) => Set<number>) => {
    setCompletedSubStepsArr((prev) => [...updater(new Set(prev))]);
  }, [setCompletedSubStepsArr]);

  const currentSub: SubStep = phase.subSteps[activeSubStep];
  const subSlug = currentSub.slug;

  // Focus mode: for text-heavy sub-steps
  const hasFocusMode = subSlug === "cteni" || subSlug === "vyklad";

  // Tool helpers mapped to flow[] indices (no longer split by type)
  const flowToolHelpers: FlowToolHelper[] = useMemo(() => {
    const mappings = checklistToolMap[subSlug] || [];
    return mappings.map((m) => ({
      itemIndex: m.itemIndex,
      label: m.label,
      icon: m.icon,
      component: resolveToolComponent(m.componentKey, subSlug),
    }));
  }, [subSlug]);

  // Progress tracking — only check items count for sub-step completion
  const [checkCount, setCheckCount] = useState({ completed: 0, total: 0 });
  const [notepadHasContent, setNotepadHasContent] = useState(false);

  const checksDone = checkCount.total > 0 && checkCount.completed === checkCount.total;

  // Mark sub-step as complete when all check items are done
  useEffect(() => {
    if (checksDone) {
      setCompletedSubSteps((prev) => {
        if (prev.has(activeSubStep)) return prev;
        const next = new Set(prev);
        next.add(activeSubStep);
        return next;
      });
    }
  }, [checksDone, activeSubStep]);

  // Auto-advance to next sub-step when complete
  useEffect(() => {
    if (checksDone && activeSubStep < phase.subSteps.length - 1) {
      const nextIdx = activeSubStep + 1;
      if (!completedSubSteps.has(nextIdx)) {
        // Small delay for UX
        const timer = setTimeout(() => setActiveSubStep(nextIdx), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [checksDone, activeSubStep, phase.subSteps.length, completedSubSteps]);

  const handleFlowCountChange = useCallback((completed: number, total: number) => {
    setCheckCount({ completed, total });
  }, []);

  const handleNotepadContent = useCallback((hasContent: boolean) => {
    setNotepadHasContent(hasContent);
  }, []);

  // Sub-step navigation
  const handleSubStepSelect = (index: number) => {
    setActiveSubStep(index);
    setFocusMode(false);
  };

  const isMinimized = focusMode || autoMinimized;

  return (
    <div className={`grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out ${
      isMinimized
        ? "lg:grid-cols-[minmax(0,1fr)_48px]"
        : "lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]"
    }`}>
      {/* LEFT PANEL: Clean text + annotations */}
      <div
        className="lg:sticky lg:top-[84px] lg:self-start lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto"
        onMouseEnter={handleTextEnter}
        onMouseLeave={handleTextLeave}
      >
        {/* Mobile toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setTextPanelOpen(!textPanelOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-border bg-cream px-4 py-3 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{"\uD83D\uDCD6"}</span>
              <span className="text-xs font-medium text-text-muted">
                {`Biblick\u00FD text`}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
              className={`text-text-light transition-transform ${textPanelOpen ? "rotate-180" : ""}`}>
              <path d="M5 8l5 5 5-5" />
            </svg>
          </button>
          {textPanelOpen && (
            <div className="mt-2">
              <BibleTextPanel
                currentSlug={subSlug}
                focusMode={focusMode}
                onFocusToggle={hasFocusMode ? () => setFocusMode(!focusMode) : undefined}
              />
            </div>
          )}
        </div>

        {/* Desktop: always visible */}
        <div className="hidden lg:block">
          <BibleTextPanel
            currentSlug={subSlug}
            focusMode={focusMode}
            onFocusToggle={hasFocusMode ? () => setFocusMode(!focusMode) : undefined}
          />
        </div>
      </div>

      {/* RIGHT PANEL: Guide — sticky, auto-minimizes */}
      <div
        className="lg:sticky lg:top-[84px] lg:self-start lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto"
        onMouseEnter={handleGuideEnter}
      >
        {/* Minimized sidebar */}
        {isMinimized && (
          <div className="hidden lg:flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-cream py-4">
            <button
              onClick={() => { setFocusMode(false); setAutoMinimized(false); }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brick/10 text-brick transition-colors hover:bg-brick hover:text-white"
              title={`Zobrazit pr\u016Fvodce`}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 3l-5 5 5 5" />
              </svg>
            </button>
          </div>
        )}

        {/* Full right panel content */}
        <div className={isMinimized ? "hidden" : ""}>
        {/* 1. Phase header */}
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brick-pale text-xl">
              {phase.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-cormorant text-[11px] font-semibold uppercase tracking-[0.12em] text-brick">
                  {`F\u00E1ze ${phase.number} ze 4`}
                </p>
                <span className="flex items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[10px] text-text-light">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-light/70">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 4.5V8l2.5 1.5" />
                  </svg>
                  {`~${phase.estimatedMinutes} min`}
                </span>
              </div>
              <h1 className="font-lora text-lg font-bold text-text sm:text-xl">
                {phase.title}
              </h1>
            </div>
          </div>
        </div>

        {/* 2. Sub-step navigation */}
        <SubStepNav
          subSteps={phase.subSteps}
          activeIndex={activeSubStep}
          completedIndices={completedSubSteps}
          onSelect={handleSubStepSelect}
        />

        {/* 3. Sub-step title (when multi-step) */}
        {phase.subSteps.length > 1 && (
          <div className="mb-3 flex items-center gap-2">
            <span className="text-base">{currentSub.icon}</span>
            <div>
              <h2 className="font-lora text-base font-bold text-text">
                {currentSub.title}
              </h2>
              <p className="text-xs text-text-muted">
                {`~${currentSub.estimatedMinutes} min`}
              </p>
            </div>
          </div>
        )}

        {/* 4. Description */}
        <p className="mb-4 text-[13px] font-light leading-[1.8] text-text-muted">
          {currentSub.description}
        </p>

        {/* 5. Unified flow (check + reflect + tools) */}
        <UnifiedFlow
          slug={subSlug}
          items={currentSub.flow}
          toolHelpers={flowToolHelpers}
          onCountChange={handleFlowCountChange}
        />

        {/* 6. Previous step outputs */}
        <PreviousStepOutputs subStepSlug={subSlug} />

        {/* 7. Theory (collapsed) */}
        <div className="mt-3">
          <StepContext theory={currentSub.theory} tip={currentSub.tip} slug={subSlug} />
        </div>

        {/* 8. Notepad */}
        <div className="mt-3">
          <Notepad
            slug={subSlug}
            isOpen={false}
            onToggle={() => {}}
            onHasContentChange={handleNotepadContent}
          />
        </div>

        {/* 9. Navigation */}
        <nav className="mt-6 flex items-center justify-between border-t border-border pt-6">
          {prevPhase ? (
            <Link
              href={`/pruvodce/${prevPhase.slug}`}
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3L5 8l5 5" />
              </svg>
              {prevPhase.title}
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3L5 8l5 5" />
              </svg>
              {`\u00DAvod`}
            </Link>
          )}

          {nextPhase ? (
            <Link
              href={`/pruvodce/${nextPhase.slug}`}
              className="flex items-center gap-2 rounded-md bg-brick px-6 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              {nextPhase.title}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md bg-brick px-6 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              Hotovo!
            </Link>
          )}
        </nav>
        </div>
      </div>
    </div>
  );
}
