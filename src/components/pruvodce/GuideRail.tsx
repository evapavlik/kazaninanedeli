"use client";

import { useState } from "react";
import Link from "next/link";
import type { Phase, SubStep } from "@/types";
import type { FlowToolHelper } from "./UnifiedFlow";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import UnifiedFlow from "./UnifiedFlow";
import PreviousStepOutputs from "./PreviousStepOutputs";
import BibleContextView from "./BibleContextView";
import OriginalLanguagesPanel from "./OriginalLanguagesPanel";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import TranslationCompare from "./TranslationCompare";
import CommentaryPanel from "./CommentaryPanel";
import SermonInspirationPanel from "./SermonInspirationPanel";

const TOOL_LABELS: Record<string, string> = {
  translations: "Porovnání překladů",
  bookContext: "Kontext knihy",
  liturgy: "Liturgický kalendář",
  originals: "Původní jazyky",
  commentary: "Komentáře",
  sermons: "Kázání jiných",
};

interface GuideRailProps {
  phase: Phase;
  currentSub: SubStep;
  subSlug: string;
  activeSubStep: number;
  completedSubSteps: Set<number>;
  onSubStepSelect: (index: number) => void;
  flowToolHelpers: FlowToolHelper[];
  onFlowCountChange: (completed: number, total: number) => void;
  artifacts: SermonArtifacts;
  onArtifactChange: (field: string, value: string) => void;
  prevPhase: { slug: string; title: string } | null;
  nextPhase: { slug: string; title: string } | null;
  reference: string;
  checkCount: { completed: number; total: number };
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SUB_NAMES = (phase: Phase) => phase.subSteps.map((s) => s.title);

/**
 * The guide as a permanent left side-rail (desktop). Replaces the old
 * fixed-bottom GuideBar: it sits *beside* the text instead of covering it, and
 * can be quieted to a 56px strip so the text stays the dominant surface.
 * Progress dots — one per sub-step, the current one "ripening" as its items get
 * done — stay visible even in the quiet strip.
 */
export default function GuideRail({
  phase,
  currentSub,
  subSlug,
  activeSubStep,
  completedSubSteps,
  onSubStepSelect,
  flowToolHelpers,
  onFlowCountChange,
  artifacts,
  onArtifactChange,
  prevPhase,
  nextPhase,
  reference,
  checkCount,
  collapsed,
  onToggleCollapse,
}: GuideRailProps) {
  const [activeToolView, setActiveToolView] = useState<string | null>(null);

  const handleSubStepSelect = (index: number) => {
    onSubStepSelect(index);
    setActiveToolView(null);
  };

  // Ripening progress dots — one per sub-step. The current one fills with a
  // conic gradient in proportion to items done in that step.
  const fill = checkCount.total
    ? Math.round((checkCount.completed / checkCount.total) * 100)
    : 0;
  const names = SUB_NAMES(phase);

  const dots = phase.subSteps.map((_, i) => {
    const done = completedSubSteps.has(i);
    const isCurrent = i === activeSubStep;
    if (done) {
      return (
        <span
          key={i}
          className="block h-2 w-2 rounded-full bg-brick"
          title={`${names[i]} — hotovo`}
        />
      );
    }
    if (isCurrent) {
      return (
        <span
          key={i}
          className="block h-2.5 w-2.5 rounded-full"
          style={{ background: `conic-gradient(#c41e1e ${fill}%, #fdf0f0 0)` }}
          title={`${names[i]} — hotovo ${checkCount.completed} z ${checkCount.total}`}
        />
      );
    }
    return (
      <span
        key={i}
        className="block h-2 w-2 rounded-full bg-border"
        title={names[i]}
      />
    );
  });

  // ---- QUIET STRIP -------------------------------------------------------
  if (collapsed) {
    return (
      <aside
        aria-label="Průvodce přípravou (ztišený)"
        className="sticky top-[84px] flex flex-col items-center gap-4 rounded-2xl border border-border bg-white px-2 py-4"
      >
        <button
          onClick={onToggleCollapse}
          aria-label="Otevřít průvodce"
          title="Otevřít průvodce"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-lg text-text-light transition-all hover:border-brick hover:text-brick"
        >
          {phase.icon}
        </button>
        <div className="flex flex-col items-center gap-2" aria-label="Postup podkroky">
          {dots}
        </div>
        <span
          className="font-cormorant text-[12px] font-semibold uppercase tracking-[0.14em] text-brick [writing-mode:vertical-rl]"
        >
          {`Průvodce`}
        </span>
      </aside>
    );
  }

  // ---- FULL RAIL ---------------------------------------------------------
  return (
    <aside
      aria-label="Průvodce přípravou"
      className="sticky top-[84px] max-h-[calc(100vh-104px)] overflow-y-auto rounded-2xl border border-border bg-white p-[18px]"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brick-pale text-[17px]">
            {phase.icon}
          </span>
          <div>
            <p className="font-cormorant text-[11px] font-semibold uppercase tracking-[0.12em] text-brick">
              {`Fáze ${phase.number} ze 4`}
            </p>
            <h2 className="font-lora text-[15.5px] font-bold leading-tight text-text">
              {phase.title}
            </h2>
          </div>
        </div>
        <button
          onClick={onToggleCollapse}
          aria-label="Ztišit průvodce"
          title="Ztišit průvodce — jen text"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] border border-border bg-white text-text-light transition-all hover:border-brick hover:text-brick"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>
      </div>

      {activeToolView ? (
        /* ---- TOOL VIEW — opens inside the rail; text stays visible beside it */
        <div key={`step-${activeSubStep}`}>
          <button
            onClick={() => setActiveToolView(null)}
            className="mb-2 flex items-center gap-1.5 text-[13px] font-medium text-brick hover:underline"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 3L5 8l5 5" />
            </svg>
            {`Zpět na kroky`}
          </button>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-brick">
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
            {activeToolView === "sermons" && reference && (
              <SermonInspirationPanel reference={reference} />
            )}
          </div>
        </div>
      ) : (
        /* ---- GUIDE VIEW */
        <>
          {phase.subSteps.length > 1 && (
            <div className="mb-4">
              <SubStepNav
                subSteps={phase.subSteps}
                activeIndex={activeSubStep}
                completedIndices={completedSubSteps}
                onSelect={handleSubStepSelect}
              />
            </div>
          )}

          <div key={`step-${activeSubStep}`} style={{ animation: "stepEnter 0.35s ease-out" }}>
            <StepContext theory={currentSub.theory} tip={currentSub.tip} slug={subSlug} />

            <p className="mb-4 text-[13px] font-light leading-[1.8] text-text-muted">
              {currentSub.description}
            </p>

            <UnifiedFlow
              slug={subSlug}
              items={currentSub.flow}
              toolHelpers={flowToolHelpers}
              onCountChange={onFlowCountChange}
              artifacts={artifacts}
              onArtifactChange={onArtifactChange}
              onOpenTool={(key) => setActiveToolView(key)}
            />

            <PreviousStepOutputs subStepSlug={subSlug} />
          </div>

          <nav className="mt-6 flex items-center justify-between border-t border-border pt-5">
            <Link
              href={prevPhase ? `/pruvodce/${prevPhase.slug}` : "/"}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3L5 8l5 5" />
              </svg>
              {prevPhase ? prevPhase.title : `Úvod`}
            </Link>

            <Link
              href={nextPhase ? `/pruvodce/${nextPhase.slug}` : "/"}
              className="flex items-center gap-2 rounded-md bg-brick px-5 py-2 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              {nextPhase ? nextPhase.title : "Hotovo!"}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          </nav>
        </>
      )}
    </aside>
  );
}
