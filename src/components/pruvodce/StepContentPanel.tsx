"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Phase, SubStep } from "@/types";
import { checklistToolMap } from "@/data/checklist-tool-map";
import { phases } from "@/data/phases";
import type { FlowToolHelper } from "./UnifiedFlow";
import BibleTextPanel from "./BibleTextPanel";
import BuildingBlocks from "./BuildingBlocks";
import GuideRail from "./GuideRail";
import GuideChip from "./GuideChip";
import ReadingToolbar from "./ReadingToolbar";
import BubbleDrawer from "./BubbleDrawer";
import ToolPanel from "./ToolPanel";
import SermonPanel from "./SermonPanel";
import { ReturningBanner, SundayHeader, SundayArchive } from "./SundayLifecycle";
import { useSermonArtifacts, type SermonArtifacts } from "@/hooks/useSermonArtifacts";

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
  const router = useRouter();
  const [textPanelOpen, setTextPanelOpen] = useState(false);
  const [activeSubStep, setActiveSubStep] = useState(0);

  // The open tool, if any. Lives here rather than in GuideRail because the tool
  // renders on the main surface beside the text, not inside the rail.
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const toolRef = useRef<HTMLDivElement | null>(null);

  // Connected workflow — sermon artifacts
  const { artifacts, updateField, getStepContext } = useSermonArtifacts();

  // Read the reference through the hook: SSR-safe (no render-time localStorage
  // read → no hydration mismatch), crash-safe (guarded parse), and reactive —
  // it now stays in sync with BibleTextPanel, which writes the same key.
  const [savedRef] = useLocalStorage<string>("kazani-bible-ref", "");

  // Guide rail: open by default, remembers the reader's choice across visits.
  // When quiet it shrinks to a 56px strip so the text stays dominant.

  // Pace: the full method, or just the sermon spine on a tight week.
  // Remembered like the quiet choice, so a hurried week stays hurried.
  const [minimalPath, setMinimalPath] = useLocalStorage<boolean>("kazani-minimal-path", false);

  // Reading screen state. „Soustředění" quiets everything but the text; the
  // notebook and „Moje kázání" are reached from the floating bar, so neither
  // needs a column of its own.
  const [focus, setFocus] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [sermonOpen, setSermonOpen] = useState(false);

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
    // A tool belongs to the step that opened it — moving on closes it.
    setActiveTool(null);
  };

  /** Open a tool, or close it if the same one is already open (toggle). */
  const handleOpenTool = useCallback((key: string) => {
    setActiveTool((prev) => (prev === key ? null : key));
    // Scroll to the panel once it has rendered.
    setTimeout(() => {
      toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  /**
   * The breathing practice IS the guide's prayer step ("Začni modlitbou — pros
   * o otevřenost a vnímavost.", index 1 of the modlitba flow), so finishing it
   * ticks that box off rather than leaving the reader to tick it manually. We
   * write the same kazani-flow-* key UnifiedFlow uses; its sibling instance
   * picks the change up live through the storage sync.
   */
  const handleBreathingComplete = useCallback(() => {
    const PRAYER_STEP_INDEX = 1;
    const key = "kazani-flow-modlitba";
    try {
      const raw = window.localStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      const total = phases[0].subSteps[0].flow.length;
      const checked = Array.isArray(parsed)
        ? [...(parsed as boolean[])]
        : new Array(total).fill(false);
      while (checked.length < total) checked.push(false);
      if (checked[PRAYER_STEP_INDEX]) return; // already done — don't churn storage
      checked[PRAYER_STEP_INDEX] = true;
      window.localStorage.setItem(key, JSON.stringify(checked));
      window.dispatchEvent(
        new CustomEvent("kazani:local-storage", { detail: { key } })
      );
    } catch {
      // A blocked or full localStorage must not break the practice.
    }
  }, []);

  // „Soustředění" also quiets chrome this component does not own — the phase
  // stepper above it. Marked with data-guide-chrome, hidden from the root.
  useEffect(() => {
    const root = document.documentElement;
    if (focus) root.setAttribute("data-focus", "true");
    else root.removeAttribute("data-focus");
    return () => root.removeAttribute("data-focus");
  }, [focus]);

  /** Once the reader is ready, move on to the text phase. */
  const handleOpenText = useCallback(() => {
    router.push("/pruvodce/text");
  }, [router]);

  return (
    <div className="relative">
      {/* After a break: the work on the desk belongs to another Sunday. */}
      <ReturningBanner />

      {/* MAIN: Full-width text */}
      <div className="mx-auto w-full">
        {/* Mobile toggle */}
        <div className="lg:hidden mb-4">
          <SundayHeader />
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

        {/* Desktop — one reading column. The guide folds into a chip above
            the text, tools and the notebook wait in a floating bar below it,
            and „soustředění" fades both away. */}
        <div className="hidden lg:block">
          <div className="mx-auto w-full max-w-[820px]">
            <div
              className={`transition-opacity duration-300 ${
                focus ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <OnboardingHint />
              <SundayHeader />
              <BuildingBlocksForStep slug={currentSub.slug} getStepContext={getStepContext} />

              <GuideChip
                phase={phase}
                currentSub={currentSub}
                activeSubStep={activeSubStep}
                checkCount={checkCount}
              >
                <GuideRail
                  phase={phase}
                  currentSub={currentSub}
                  subSlug={subSlug}
                  activeSubStep={activeSubStep}
                  completedSubSteps={completedSubSteps}
                  onSubStepSelect={handleSubStepSelect}
                  flowToolHelpers={flowToolHelpers}
                  onFlowCountChange={handleFlowCountChange}
                  artifacts={artifacts}
                  onArtifactChange={(field, value) =>
                    updateField(field as keyof typeof artifacts, value)
                  }
                  prevPhase={prevPhase}
                  nextPhase={nextPhase}
                  onOpenTool={handleOpenTool}
                  checkCount={checkCount}
                  collapsed={false}
                  onToggleCollapse={() => {}}
                  minimal={minimalPath}
                  onMinimalChange={setMinimalPath}
                  bare
                />
              </GuideChip>
            </div>

            {/* An open tool sits above the text at full reading width — the
                text stays right below it, never replaced. */}
            {activeTool && !focus && (
              <div ref={toolRef} className="mb-5">
                <ToolPanel
                  toolKey={activeTool}
                  reference={savedRef}
                  onClose={() => setActiveTool(null)}
                />
              </div>
            )}

            <BibleTextPanel
              currentSlug={subSlug}
              onBreathingComplete={handleBreathingComplete}
              onOpenText={handleOpenText}
            />

            <ReadingToolbar
              activeTool={activeTool}
              onOpenTool={handleOpenTool}
              onOpenNotebook={() => setNotebookOpen(true)}
              onOpenSermon={() => setSermonOpen(true)}
              focus={focus}
              onToggleFocus={() => setFocus((f) => !f)}
            />

            {/* Leaving „soustředění" — the only thing still on screen. */}
            {focus && (
              <button
                onClick={() => setFocus(false)}
                className="fixed bottom-6 right-6 z-30 rounded-full border border-border bg-white/95 px-4 py-2 text-[13px] font-medium text-text-muted shadow-[0_6px_20px_rgba(0,0,0,0.08)] backdrop-blur hover:text-text"
              >
                {`Ukončit soustředění`}
              </button>
            )}

            <div className={focus ? "hidden" : "mt-10"}>
              <SundayArchive />
            </div>
          </div>

          {/* „Moje kázání" — a sheet from the bar, not a permanent column. */}
          {sermonOpen && (
            <>
              <div
                className="fixed inset-0 z-[55] bg-text/30"
                onClick={() => setSermonOpen(false)}
              />
              <aside
                role="dialog"
                aria-label="Moje kázání"
                className="fixed right-0 top-0 bottom-0 z-[56] w-[min(380px,94vw)] overflow-y-auto border-l border-border bg-white shadow-[-4px_0_30px_rgba(0,0,0,0.12)]"
              >
                <div className="flex items-center justify-end border-b border-border px-4 py-2">
                  <button
                    onClick={() => setSermonOpen(false)}
                    aria-label="Zavřít"
                    className="rounded-lg px-2 py-0.5 text-lg text-text-muted hover:bg-cream hover:text-brick"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-2">
                  <SermonPanel
                    artifacts={artifacts}
                    onArtifactChange={(field, value) =>
                      updateField(field as keyof typeof artifacts, value)
                    }
                    embedded
                  />
                </div>
              </aside>
            </>
          )}

          {/* One drawer for the whole reading screen, opened from the bar. */}
          <BubbleDrawer
            open={notebookOpen}
            onClose={() => setNotebookOpen(false)}
            artifacts={artifacts}
            onArtifactChange={(field, value) =>
              updateField(field as keyof typeof artifacts, value)
            }
          />
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
            artifacts={artifacts}
            onArtifactChange={(field, value) => updateField(field as keyof typeof artifacts, value)}
            prevPhase={prevPhase}
            nextPhase={nextPhase}
            reference={savedRef}
          />
          <div className="mt-6">
            <SundayArchive />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Onboarding hint — shown once on first visit */
function OnboardingHint() {
  // Decide visibility after mount only — reading localStorage during the initial
  // render would diverge from the server-rendered HTML and trip a hydration
  // mismatch. Start hidden, then reveal once we've checked storage on the client.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("kazani-onboarding-seen")) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem("kazani-onboarding-seen", "1");
    setVisible(false);
  };

  return (
    <div className="mb-5 flex items-center gap-2.5 rounded-[10px] border border-brick/15 bg-brick-pale px-4 py-2.5 text-[13px] text-brick animate-in fade-in slide-in-from-top-1 duration-500 delay-1000 fill-mode-both">
      <span className="shrink-0 text-base">{"\uD83D\uDC48"}</span>
      <span>{`Pr\u016Fvodce m\u00E1\u0161 nad textem \u2014 jedno kliknut\u00ED a provede t\u011B krok za krokem.`}</span>
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
  artifacts,
  onArtifactChange,
  prevPhase,
  nextPhase,
  reference,
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
  artifacts: SermonArtifacts;
  onArtifactChange: (field: string, value: string) => void;
  prevPhase: { slug: string; title: string } | null;
  nextPhase: { slug: string; title: string } | null;
  reference: string;
}) {
  const [activeToolView, setActiveToolView] = useState<string | null>(null);
  const toolPanelRef = useRef<HTMLDivElement | null>(null);

  const handleOpenTool = useCallback((key: string) => {
    setActiveToolView(key);
    // Scroll the tool panel into view after render
    setTimeout(() => {
      toolPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  return (
    <>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brick-pale text-base">
            {phase.icon}
          </span>
          <div>
            <p className="font-cormorant text-[12px] font-semibold uppercase tracking-[0.12em] text-brick">
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

      <StepContext theory={currentSub.theory} tip={currentSub.tip} />

      <p className="mb-4 text-[13px] font-light leading-[1.8] text-text-muted">
        {currentSub.description}
      </p>

      <UnifiedFlow
        slug={subSlug}
        items={currentSub.flow}
        toolHelpers={flowToolHelpers}
        onCountChange={onFlowCountChange}
        onOpenTool={handleOpenTool}
        artifacts={artifacts}
        onArtifactChange={onArtifactChange}
      />

      {/* Inline tool panel — shown when user taps a tool button */}
      {activeToolView && (
        <div ref={toolPanelRef} className="mt-4">
          <ToolPanel
            toolKey={activeToolView}
            reference={reference}
            onClose={() => setActiveToolView(null)}
          />
        </div>
      )}

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
    kontext: `Vra\u0165 se ke \u010Dten\u00ED a zaznamenej sv\u016Fj celkov\u00FD dojem \u2014 pom\u016F\u017Ee ti p\u0159i v\u00FDkladu.`,
    vyklad: `Nejd\u0159\u00EDve si text p\u0159e\u010Dti a zasa\u010F do kontextu \u2014 tvoje pozn\u00E1mky se zde zobraz\u00ED.`,
    aktualizace: `Formuluj nejd\u0159\u00EDve centr\u00E1ln\u00ED my\u0161lenku textu \u2014 bude z\u00E1kladem pro aktualizaci.`,
    stavba: `Nejd\u0159\u00EDve propoj text s poslucha\u010Di \u2014 tvoje poznatky se zobraz\u00ED jako stavebn\u00ED materi\u00E1l.`,
    prednes: `Dokon\u010Di nejd\u0159\u00EDve osnovu k\u00E1z\u00E1n\u00ED \u2014 pak se p\u0159iprav\u00ED\u0161 na p\u0159ednes.`,
  };

  if (context.items.length === 0 && !EMPTY_HINTS[slug]) return null;

  return (
    <BuildingBlocks
      items={context.items as { label: string; value: string; highlight?: boolean }[]}
      emptyHint={context.items.length === 0 ? EMPTY_HINTS[slug] : undefined}
    />
  );
}
