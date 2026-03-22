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

  // Drawer state for guide panel
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toast: show tip when entering a new sub-step
  const [showToast, setShowToast] = useState(true);
  const prevSubStepRef = useRef(0);

  useEffect(() => {
    if (activeSubStep !== prevSubStepRef.current) {
      prevSubStepRef.current = activeSubStep;
      setShowToast(true);
    }
  }, [activeSubStep]);

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

  // Tool helpers mapped to flow[] indices
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
    setDrawerOpen(false);
  };

  return (
    <div className="relative">
      {/* MAIN: Full-width text */}
      <div className="mx-auto max-w-4xl">
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
              <BibleTextPanel currentSlug={subSlug} />
            </div>
          )}
        </div>

        {/* Desktop: always visible */}
        <div className="hidden lg:block">
          <BibleTextPanel currentSlug={subSlug} />
        </div>

        {/* Mobile: show guide inline below text */}
        <div className="lg:hidden mt-6">
          <MobileGuide
            phase={phase}
            currentSub={currentSub}
            subSlug={subSlug}
            activeSubStep={activeSubStep}
            completedSubSteps={completedSubSteps}
            flowToolHelpers={flowToolHelpers}
            notepadHasContent={notepadHasContent}
            onSubStepSelect={handleSubStepSelect}
            onFlowCountChange={handleFlowCountChange}
            onNotepadContent={handleNotepadContent}
            prevPhase={prevPhase}
            nextPhase={nextPhase}
          />
        </div>
      </div>

      {/* FLOATING TOAST: tip when entering a sub-step */}
      {showToast && (
        <div className="hidden lg:block fixed top-24 right-6 z-40 max-w-sm animate-in slide-in-from-right duration-300">
          <div className="rounded-xl border border-sage/20 bg-white shadow-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sage-pale text-sm">
                  {currentSub.icon}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sage">
                    {currentSub.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-muted">
                    {currentSub.tip}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="shrink-0 text-text-light hover:text-text"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
            <button
              onClick={() => { setShowToast(false); setDrawerOpen(true); }}
              className="mt-3 w-full rounded-lg bg-brick/10 px-3 py-1.5 text-[12px] font-medium text-brick transition-colors hover:bg-brick/20"
            >
              {`Otev\u0159\u00EDt pr\u016Fvodce \u2192`}
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON: open guide drawer (desktop) */}
      {!drawerOpen && !showToast && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="hidden lg:flex fixed top-24 right-6 z-40 items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 shadow-md transition-all hover:shadow-lg hover:border-brick/30"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brick-pale text-sm">
            {currentSub.icon}
          </span>
          <div className="text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brick">
              {`Pr\u016Fvodce`}
            </p>
            <p className="text-[12px] font-medium text-text">
              {currentSub.title}
            </p>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light ml-1">
            <path d="M14 3l-5 5 5 5" />
          </svg>
        </button>
      )}

      {/* DRAWER OVERLAY */}
      {drawerOpen && (
        <div
          className="hidden lg:block fixed inset-0 z-50 bg-black/10"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* DRAWER: Guide panel slides from right */}
      <div
        className={`hidden lg:block fixed top-0 right-0 z-50 h-full w-[420px] transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto border-l border-border bg-white px-6 py-6 shadow-xl">
          {/* Close button */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brick-pale text-base">
                {phase.icon}
              </span>
              <div>
                <p className="font-cormorant text-[10px] font-semibold uppercase tracking-[0.12em] text-brick">
                  {`F\u00E1ze ${phase.number} ze 4`}
                </p>
                <h1 className="font-lora text-base font-bold text-text">
                  {phase.title}
                </h1>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-light transition-colors hover:bg-cream hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>

          {/* Sub-step navigation */}
          <SubStepNav
            subSteps={phase.subSteps}
            activeIndex={activeSubStep}
            completedIndices={completedSubSteps}
            onSelect={handleSubStepSelect}
          />

          {/* Sub-step title */}
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

          {/* Theory — at the top, auto-open */}
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
            onCountChange={handleFlowCountChange}
          />

          {/* Previous step outputs */}
          <PreviousStepOutputs subStepSlug={subSlug} />

          {/* Notepad */}
          <div className="mt-3">
            <Notepad
              slug={subSlug}
              isOpen={false}
              onToggle={() => {}}
              onHasContentChange={handleNotepadContent}
            />
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
        </div>
      </div>
    </div>
  );
}

/** Mobile: guide content inline (no drawer needed) */
function MobileGuide({
  phase,
  currentSub,
  subSlug,
  activeSubStep,
  completedSubSteps,
  flowToolHelpers,
  notepadHasContent,
  onSubStepSelect,
  onFlowCountChange,
  onNotepadContent,
  prevPhase,
  nextPhase,
}: {
  phase: Phase;
  currentSub: SubStep;
  subSlug: string;
  activeSubStep: number;
  completedSubSteps: Set<number>;
  flowToolHelpers: FlowToolHelper[];
  notepadHasContent: boolean;
  onSubStepSelect: (index: number) => void;
  onFlowCountChange: (completed: number, total: number) => void;
  onNotepadContent: (hasContent: boolean) => void;
  prevPhase: { slug: string; title: string } | null;
  nextPhase: { slug: string; title: string } | null;
}) {
  return (
    <>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brick-pale text-base">
            {phase.icon}
          </span>
          <div>
            <p className="font-cormorant text-[10px] font-semibold uppercase tracking-[0.12em] text-brick">
              {`F\u00E1ze ${phase.number} ze 4`}
            </p>
            <h1 className="font-lora text-base font-bold text-text">
              {phase.title}
            </h1>
          </div>
        </div>
      </div>

      <SubStepNav
        subSteps={phase.subSteps}
        activeIndex={activeSubStep}
        completedIndices={completedSubSteps}
        onSelect={onSubStepSelect}
      />

      <StepContext theory={currentSub.theory} tip={currentSub.tip} slug={subSlug} />

      <p className="mb-4 text-[13px] font-light leading-[1.8] text-text-muted">
        {currentSub.description}
      </p>

      <UnifiedFlow
        slug={subSlug}
        items={currentSub.flow}
        toolHelpers={flowToolHelpers}
        onCountChange={onFlowCountChange}
      />

      <PreviousStepOutputs subStepSlug={subSlug} />

      <div className="mt-3">
        <Notepad
          slug={subSlug}
          isOpen={false}
          onToggle={() => {}}
          onHasContentChange={onNotepadContent}
        />
      </div>

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
  );
}
