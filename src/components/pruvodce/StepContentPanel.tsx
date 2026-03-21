"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Phase, SubStep, FlowItem } from "@/types";
import { checklistToolMap } from "@/data/checklist-tool-map";
import type { ActionToolHelper } from "./ActionChecklist";
import BibleTextPanel from "./BibleTextPanel";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import Checklist from "./Checklist";
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

  // Split flow items: check → left panel, reflect → right panel
  const checkItems = useMemo(
    () => currentSub.flow.filter((f) => f.type === "check"),
    [currentSub.flow]
  );
  const reflectItems = useMemo(
    () => currentSub.flow.filter((f) => f.type === "reflect"),
    [currentSub.flow]
  );

  // Map tool helpers from flow indices to check-item indices
  const checkToolHelpers: ActionToolHelper[] = useMemo(() => {
    const mappings = checklistToolMap[subSlug] || [];
    // Build a map: flow index → check-item index
    let checkIdx = 0;
    const flowToCheckIdx: Record<number, number> = {};
    currentSub.flow.forEach((item, flowIdx) => {
      if (item.type === "check") {
        flowToCheckIdx[flowIdx] = checkIdx;
        checkIdx++;
      }
    });
    return mappings
      .filter((m) => flowToCheckIdx[m.itemIndex] !== undefined)
      .map((m) => ({
        itemIndex: flowToCheckIdx[m.itemIndex],
        label: m.label,
        icon: m.icon,
        component: resolveToolComponent(m.componentKey, subSlug),
      }));
  }, [subSlug, currentSub.flow]);

  // Progress tracking
  const [checkCount, setCheckCount] = useState({ completed: 0, total: 0 });
  const [reflectCount, setReflectCount] = useState({ completed: 0, total: 0 });
  const [notepadHasContent, setNotepadHasContent] = useState(false);

  // Sub-step unlocks after check items are done (reflect items are optional)
  const checksDone = checkCount.total > 0 && checkCount.completed === checkCount.total;

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

  const handleCheckCount = useCallback((completed: number, total: number) => {
    setCheckCount({ completed, total });
  }, []);

  const handleReflectCount = useCallback((completed: number, total: number) => {
    setReflectCount({ completed, total });
  }, []);

  const handleNotepadContent = useCallback((hasContent: boolean) => {
    setNotepadHasContent(hasContent);
  }, []);

  // Sub-step navigation
  const handleSubStepSelect = (index: number) => {
    setActiveSubStep(index);
    setFocusMode(false);
  };

  return (
    <div className={`grid grid-cols-1 gap-6 transition-all duration-300 ${
      focusMode
        ? "lg:grid-cols-[minmax(0,1fr)_56px]"
        : "lg:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]"
    }`}>
      {/* LEFT PANEL: Text + action checklist */}
      <div className="lg:sticky lg:top-[84px] lg:self-start lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto">
        {/* Mobile toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setTextPanelOpen(!textPanelOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-border bg-cream px-4 py-3 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{"\uD83D\uDCD6"}</span>
              <span className="text-xs font-medium text-text-muted">
                {`Biblick\u00FD text + \u00FAkoly`}
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
                checkItems={checkItems}
                checkToolHelpers={checkToolHelpers}
                onCheckCountChange={handleCheckCount}
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
            checkItems={checkItems}
            checkToolHelpers={checkToolHelpers}
            onCheckCountChange={handleCheckCount}
          />
        </div>
      </div>

      {/* RIGHT PANEL: Guide + reflections */}
      <div className={focusMode ? "hidden lg:block" : ""}>
        {/* Minimized focus mode sidebar */}
        {focusMode && (
          <div className="sticky top-[84px] flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-cream py-4">
            <button
              onClick={() => setFocusMode(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-brick text-white transition-colors hover:bg-brick-light"
              title={`Zp\u011Bt k pr\u016Fvodci`}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 3l-5 5 5 5" />
                <rect x="12" y="3" width="5" height="14" rx="1" opacity="0.3" />
              </svg>
            </button>
          </div>
        )}

        {/* Full right panel content */}
        <div className={focusMode ? "hidden" : ""}>
        {/* 1. Phase header */}
        <div className="mb-6">
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
          <p className="mt-2 text-sm font-light leading-[1.8] text-text-muted">
            {phase.description}
          </p>
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
          <div className="mb-4 flex items-center gap-2">
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

        {/* 4. Theory (collapsed) */}
        <StepContext theory={currentSub.theory} tip={currentSub.tip} slug={subSlug} />

        {/* 5. Previous step outputs */}
        <PreviousStepOutputs subStepSlug={subSlug} />

        {/* 6. Reflections (wizard pattern for reflect items) */}
        <div className="space-y-3">
          {reflectItems.length > 0 && (
            <Checklist
              slug={`${subSlug}-reflect`}
              items={reflectItems}
              isOpen={true}
              onToggle={() => {}}
              onCountChange={handleReflectCount}
            />
          )}

          {/* Notepad — always accessible */}
          <Notepad
            slug={subSlug}
            isOpen={false}
            onToggle={() => {}}
            onHasContentChange={handleNotepadContent}
          />
        </div>

        {/* 7. Navigation */}
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
