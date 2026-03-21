"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Phase, SubStep } from "@/types";
import { checklistToolMap } from "@/data/checklist-tool-map";
import type { ChecklistToolHelper } from "./Checklist";
import BibleTextPanel from "./BibleTextPanel";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import SectionNav, { type SectionKey } from "./SectionNav";
import Checklist from "./Checklist";
import QuestionNotes from "./QuestionNotes";
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
  const [activeSection, setActiveSection] = useState<SectionKey>("checklist");
  const [focusMode, setFocusMode] = useState(false);

  // Track which sub-steps are completed (all checklist items done)
  const [completedSubSteps, setCompletedSubSteps] = useState<Set<number>>(new Set());

  const currentSub: SubStep = phase.subSteps[activeSubStep];
  const subSlug = currentSub.slug;

  // Focus mode: for text-heavy sub-steps
  const hasFocusMode = subSlug === "cteni" || subSlug === "vyklad";

  // Section progress tracking
  const [checklistCount, setChecklistCount] = useState({ completed: 0, total: 0 });
  const [questionsCount, setQuestionsCount] = useState({ answered: 0, total: 0 });
  const [notepadHasContent, setNotepadHasContent] = useState(false);

  // Questions unlock after checklist is done
  const checklistDone = checklistCount.total > 0 && checklistCount.completed === checklistCount.total;

  // When checklist is done, mark sub-step as completed and auto-advance
  useEffect(() => {
    if (checklistDone) {
      setCompletedSubSteps((prev) => {
        const next = new Set(prev);
        next.add(activeSubStep);
        return next;
      });
      // Auto-switch to questions
      if (activeSection === "checklist") {
        setActiveSection("questions");
      }
    }
  }, [checklistDone, activeSubStep, activeSection]);

  const handleChecklistCount = useCallback((completed: number, total: number) => {
    setChecklistCount({ completed, total });
  }, []);

  const handleQuestionsCount = useCallback((answered: number, total: number) => {
    setQuestionsCount({ answered, total });
  }, []);

  const handleNotepadContent = useCallback((hasContent: boolean) => {
    setNotepadHasContent(hasContent);
  }, []);

  // Resolve tool helpers for current sub-step
  const toolHelpers: ChecklistToolHelper[] = useMemo(() => {
    const mappings = checklistToolMap[subSlug] || [];
    return mappings.map((m) => ({
      itemIndex: m.itemIndex,
      label: m.label,
      icon: m.icon,
      component: resolveToolComponent(m.componentKey, subSlug),
    }));
  }, [subSlug]);

  const toggleSection = (key: SectionKey) => {
    if (key === "questions" && !checklistDone) return;
    setActiveSection(key);
  };

  // Sub-step navigation
  const handleSubStepSelect = (index: number) => {
    setActiveSubStep(index);
    setActiveSection("checklist");
    setFocusMode(false);
  };

  // When switching sub-steps, reset section
  useEffect(() => {
    setActiveSection("checklist");
    setChecklistCount({ completed: 0, total: 0 });
    setQuestionsCount({ answered: 0, total: 0 });
    setNotepadHasContent(false);
  }, [activeSubStep]);

  return (
    <div className={`grid grid-cols-1 gap-6 transition-all duration-300 ${
      focusMode
        ? "lg:grid-cols-[minmax(0,1fr)_56px]"
        : "lg:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]"
    }`}>
      {/* Left panel: Biblical text */}
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
                {`Biblick\u00FD text`}
              </span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-text-light transition-transform ${textPanelOpen ? "rotate-180" : ""}`}
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </button>
          {textPanelOpen && (
            <div className="mt-2">
              <BibleTextPanel currentSlug={subSlug} focusMode={focusMode} onFocusToggle={hasFocusMode ? () => setFocusMode(!focusMode) : undefined} />
            </div>
          )}
        </div>

        {/* Desktop: always visible */}
        <div className="hidden lg:block">
          <BibleTextPanel currentSlug={subSlug} focusMode={focusMode} onFocusToggle={hasFocusMode ? () => setFocusMode(!focusMode) : undefined} />
        </div>
      </div>

      {/* Right panel: Phase content */}
      <div className={focusMode ? "hidden lg:block" : ""}>
        {/* Minimized focus mode sidebar */}
        {focusMode && (
          <div className="sticky top-[84px] flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-cream py-4">
            <button
              onClick={() => setFocusMode(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-brick text-white transition-colors hover:bg-brick-light"
              title={`Zp\u011Bt k \u00FAkol\u016Fm`}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 3l-5 5 5 5" />
                <rect x="12" y="3" width="5" height="14" rx="1" opacity="0.3" />
              </svg>
            </button>
            <div className="h-px w-6 bg-border/50" />
            <button
              onClick={() => { setFocusMode(false); setActiveSection("checklist"); }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-text-light transition-colors hover:bg-white hover:text-brick"
              title={`Kroky ${checklistCount.completed}/${checklistCount.total}`}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 10l4 4 8-8" />
              </svg>
            </button>
            <button
              onClick={() => { setFocusMode(false); setActiveSection("questions"); }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-text-light transition-colors hover:bg-white hover:text-brick"
              title={`Ot\u00E1zky ${questionsCount.answered}/${questionsCount.total}`}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="8" />
                <path d="M8 8a2.5 2.5 0 013 2.5c0 1-1.5 1.5-1.5 2.5M10 15v0" />
              </svg>
            </button>
            <button
              onClick={() => { setFocusMode(false); setActiveSection("notepad"); }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white hover:text-brick ${notepadHasContent ? "text-sage" : "text-text-light"}`}
              title={`Z\u00E1pisky`}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h12M4 8h12M4 12h8" />
              </svg>
            </button>
            {checklistCount.total > 0 && (
              <>
                <div className="h-px w-6 bg-border/50" />
                <span className="text-[9px] font-bold text-text-light">
                  {checklistCount.completed}/{checklistCount.total}
                </span>
              </>
            )}
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

        {/* 2. Sub-step navigation (only if >1 sub-step) */}
        <SubStepNav
          subSteps={phase.subSteps}
          activeIndex={activeSubStep}
          completedIndices={completedSubSteps}
          onSelect={handleSubStepSelect}
        />

        {/* 3. Sub-step title (when multi-step, show current sub-step name) */}
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

        {/* 4. StepContext — theory + tip (collapsed by default) */}
        <StepContext theory={currentSub.theory} tip={currentSub.tip} slug={subSlug} />

        {/* 5. Section navigation pills */}
        <SectionNav
          sections={[
            {
              key: "checklist",
              label: "Kroky",
              completed: checklistCount.completed,
              total: checklistCount.total,
            },
            {
              key: "questions",
              label: `Ot\u00E1zky`,
              completed: questionsCount.answered,
              total: questionsCount.total,
              locked: !checklistDone,
            },
            {
              key: "notepad",
              label: `Z\u00E1pisky`,
              completed: 0,
              total: 0,
              hasContent: notepadHasContent,
            },
          ]}
          activeSection={activeSection}
          onSelect={toggleSection}
        />

        {/* 6. Accordion work sections */}
        <div className="space-y-3">
          {/* a. Checklist */}
          <Checklist
            slug={subSlug}
            items={currentSub.practicalSteps}
            toolHelpers={toolHelpers}
            isOpen={activeSection === "checklist"}
            onToggle={() => toggleSection("checklist")}
            onCountChange={handleChecklistCount}
          />

          {/* b. Questions — locked until checklist done */}
          {checklistDone ? (
            <QuestionNotes
              slug={subSlug}
              questions={currentSub.questions}
              isOpen={activeSection === "questions"}
              onToggle={() => toggleSection("questions")}
              onCountChange={handleQuestionsCount}
            />
          ) : (
            <section className="rounded-xl border border-sage/10 bg-sage-pale/30">
              <button
                className="flex w-full items-center justify-between p-4 text-left opacity-50 cursor-not-allowed"
                disabled
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{"\u2753"}</span>
                  <h2 className="font-lora text-base font-bold text-text-light">
                    {`Ot\u00E1zky k zamy\u0161len\u00ED`}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-light">
                    {`Dokon\u010Dete kroky`}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light">
                    <rect x="3" y="5" width="10" height="8" rx="1.5" />
                    <path d="M5.5 5V3.5a2.5 2.5 0 015 0V5" />
                  </svg>
                </div>
              </button>
            </section>
          )}

          {/* c. Notepad */}
          <Notepad
            slug={subSlug}
            isOpen={activeSection === "notepad"}
            onToggle={() => toggleSection("notepad")}
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
