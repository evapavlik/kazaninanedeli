"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Phase, SubStep } from "@/types";
import { checklistToolMap } from "@/data/checklist-tool-map";
import type { FlowToolHelper } from "./UnifiedFlow";
import BibleTextPanel from "./BibleTextPanel";
import BuildingBlocks from "./BuildingBlocks";
import TranslationCompare from "./TranslationCompare";
import GuideBar from "./GuideBar";
import SermonPanel from "./SermonPanel";
import { useSermonArtifacts } from "@/hooks/useSermonArtifacts";

// Tool components (for inline flow helpers)
import NarrativeTypeIdentifier from "@/components/tools/NarrativeTypeIdentifier";
import BibleBookContext from "@/components/tools/BibleBookContext";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import RoleIdentifier from "@/components/tools/RoleIdentifier";
import FCFHelper from "@/components/tools/FCFHelper";
import OutlineBuilder from "@/components/tools/OutlineBuilder";

// Mobile-only imports
import Link from "next/link";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import UnifiedFlow from "./UnifiedFlow";
import PreviousStepOutputs from "./PreviousStepOutputs";

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

  // Connected workflow — sermon artifacts
  const { artifacts, updateField, getStepContext } = useSermonArtifacts();

  const isTextPhase = phase.slug === "text";
  const savedRef = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("kazani-bible-ref") || '""')
    : "";

  // Track which sub-steps are completed
  const [completedSubStepsArr, setCompletedSubStepsArr] = useLocalStorage<number[]>(
    `kazani-completed-substeps-${phase.slug}`,
    []
  );
  const completedSubSteps = useMemo(() => new Set(completedSubStepsArr), [completedSubStepsArr]);
  const setCompletedSubSteps = useCallback((updater: (prev: Set<number>) => Set<number>) => {
    setCompletedSubStepsArr((prev) => [...updater(new Set(prev))]);
  }, [setCompletedSubStepsArr]);

  // Clamp activeSubStep to valid range when phase changes
  useEffect(() => {
    if (activeSubStep >= phase.subSteps.length) {
      setActiveSubStep(0);
    }
  }, [phase.slug, activeSubStep, phase.subSteps.length]);

  const safeIndex = Math.min(activeSubStep, phase.subSteps.length - 1);
  const currentSub: SubStep = phase.subSteps[safeIndex];
  const subSlug = currentSub.slug;

  // Tool helpers mapped to flow[] indices
  const flowToolHelpers: FlowToolHelper[] = useMemo(() => {
    const mappings = checklistToolMap[subSlug] || [];
    return mappings.map((m) => ({
      itemIndex: m.itemIndex,
      label: m.label,
      icon: m.icon,
      ...(m.openToolKey
        ? { openToolKey: m.openToolKey, openToolNumber: m.openToolNumber }
        : { component: resolveToolComponent(m.componentKey || "", subSlug) }),
    }));
  }, [subSlug]);

  // Progress tracking
  const [checkCount, setCheckCount] = useState({ completed: 0, total: 0 });
  const [notepadHasContent, setNotepadHasContent] = useState(false);

  const checksDone = checkCount.total > 0 && checkCount.completed === checkCount.total;

  // Mark sub-step as complete
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

  // Auto-advance to next sub-step
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

  const handleSubStepSelect = (index: number) => {
    setActiveSubStep(index);
  };

  // Ref for scrolling to translations
  const translationsRef = useRef<HTMLDivElement>(null);
  const handleScrollToTranslations = useCallback(() => {
    translationsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Brief highlight
    if (translationsRef.current) {
      translationsRef.current.style.boxShadow = "0 0 0 3px rgba(155,74,60,0.25)";
      setTimeout(() => {
        if (translationsRef.current) translationsRef.current.style.boxShadow = "none";
      }, 2500);
    }
  }, []);

  return (
    <div className="relative">
      {/* MAIN: Full-width text */}
      <div className="mx-auto max-w-6xl pb-[100px]">
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

        {/* Desktop: 2-col grid — main content + Moje kázání panel */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[1fr_268px] gap-4 items-start">
            <div>
              <OnboardingHint />
              <BuildingBlocksForStep slug={currentSub.slug} getStepContext={getStepContext} />
              <BibleTextPanel currentSlug={subSlug} />

              {/* Translation compare — inline below text */}
              {isTextPhase && savedRef && (
                <div className="mt-6 transition-shadow duration-400" ref={translationsRef}>
                  <TranslationCompare reference={savedRef} />
                </div>
              )}
            </div>

            {/* Moje kázání — visible throughout all steps */}
            <SermonPanel artifacts={artifacts} />
          </div>
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

      {/* GUIDE BAR — fixed bottom, desktop only */}
      <GuideBar
        phase={phase}
        currentSub={currentSub}
        subSlug={subSlug}
        activeSubStep={activeSubStep}
        completedSubSteps={completedSubSteps}
        onSubStepSelect={handleSubStepSelect}
        flowToolHelpers={flowToolHelpers}
        onFlowCountChange={handleFlowCountChange}
        onNotepadContent={handleNotepadContent}
        artifacts={artifacts}
        onArtifactChange={(field, value) => updateField(field as keyof typeof artifacts, value)}
        prevPhase={prevPhase}
        nextPhase={nextPhase}
        reference={savedRef}
        checkCount={checkCount}
        onScrollToTranslations={isTextPhase ? handleScrollToTranslations : undefined}
      />
    </div>
  );
}

/** Onboarding hint — shown once on first visit */
function OnboardingHint() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("kazani-onboarding-seen");
  });

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem("kazani-onboarding-seen", "1");
    setVisible(false);
  };

  return (
    <div className="mb-5 flex items-center gap-2.5 rounded-[10px] border border-brick/15 bg-brick-pale px-4 py-2.5 text-[13px] text-brick animate-in fade-in slide-in-from-top-1 duration-500 delay-1000 fill-mode-both">
      <span className="shrink-0 text-base">{"\uD83D\uDC47"}</span>
      <span>{`Pr\u016Fvodce p\u0159\u00EDpravou najdete v li\u0161t\u011B dole. Provede v\u00E1s krok za krokem.`}</span>
      <button
        onClick={dismiss}
        className="ml-auto shrink-0 px-1 text-brick/50 transition-opacity hover:text-brick"
      >
        {"\u2715"}
      </button>
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

/** Renders BuildingBlocks for a specific sub-step */
function BuildingBlocksForStep({
  slug,
  getStepContext,
}: {
  slug: string;
  getStepContext: ReturnType<typeof import("@/hooks/useSermonArtifacts").useSermonArtifacts>["getStepContext"];
}) {
  const context = getStepContext(slug);

  const EMPTY_HINTS: Record<string, string> = {
    kontext: `Vra\u0165te se ke \u010Dten\u00ED a zaznamenejte sv\u016Fj celkov\u00FD dojem \u2014 pom\u016F\u017Ee v\u00E1m p\u0159i v\u00FDkladu.`,
    vyklad: `Nejd\u0159\u00EDve si text p\u0159e\u010Dt\u011Bte a zasad\u0165te do kontextu \u2014 va\u0161e pozn\u00E1mky se zde zobraz\u00ED.`,
    aktualizace: `Formulujte nejd\u0159\u00EDve centr\u00E1ln\u00ED my\u0161lenku textu \u2014 bude z\u00E1kladem pro aktualizaci.`,
    stavba: `Nejd\u0159\u00EDve propojte text s poslucha\u010Di \u2014 va\u0161e poznatky se zobraz\u00ED jako stavebn\u00ED materi\u00E1l.`,
    prednes: `Dokon\u010Dete nejd\u0159\u00EDve osnovu k\u00E1z\u00E1n\u00ED \u2014 pak se p\u0159iprav\u00EDte na p\u0159ednes.`,
  };

  if (context.items.length === 0 && !EMPTY_HINTS[slug]) return null;

  return (
    <BuildingBlocks
      items={context.items as { label: string; value: string; highlight?: boolean }[]}
      emptyHint={context.items.length === 0 ? EMPTY_HINTS[slug] : undefined}
    />
  );
}
