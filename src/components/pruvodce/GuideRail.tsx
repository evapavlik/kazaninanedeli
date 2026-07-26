"use client";

import Link from "next/link";
import type { Phase, SubStep } from "@/types";
import type { FlowToolHelper } from "./UnifiedFlow";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";
import StepContext from "./StepContext";
import SubStepNav from "./SubStepNav";
import UnifiedFlow from "./UnifiedFlow";
import PreviousStepOutputs from "./PreviousStepOutputs";
import MinimalPath from "./MinimalPath";

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
  /** Opens an on-demand tool. It renders on the main surface beside the text —
      never inside this rail, which is too narrow for it. */
  onOpenTool: (key: string) => void;
  checkCount: { completed: number; total: number };
  collapsed: boolean;
  onToggleCollapse: () => void;
  /** Minimal path: just the sermon spine, for weeks with little time. */
  minimal: boolean;
  onMinimalChange: (minimal: boolean) => void;
}

/**
 * The guide as a permanent left side-rail (desktop). Replaces the old
 * fixed-bottom GuideBar: it sits *beside* the text instead of covering it, and
 * can be quieted to a 56px strip so the text stays the dominant surface.
 * Tools invoked from a flow item open on the main surface (see ToolPanel), not
 * in here — the rail is too narrow to read them in.
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
  onOpenTool,
  checkCount,
  collapsed,
  onToggleCollapse,
  minimal,
  onMinimalChange,
}: GuideRailProps) {
  // ---- QUIET STRIP -------------------------------------------------------
  if (collapsed) {
    // Ripening progress dots — one per sub-step, the current one filled with a
    // conic gradient in proportion to items done. Built here rather than at the
    // top of the component: the open rail shows position via SubStepNav and
    // never renders these, so computing them there is wasted work.
    const fill = checkCount.total
      ? Math.round((checkCount.completed / checkCount.total) * 100)
      : 0;

    const dots = phase.subSteps.map((sub, i) => {
      if (completedSubSteps.has(i)) {
        return (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-brick"
            title={`${sub.title} — hotovo`}
          />
        );
      }
      if (i === activeSubStep) {
        return (
          <span
            key={i}
            className="block h-2.5 w-2.5 rounded-full"
            style={{ background: `conic-gradient(#c41e1e ${fill}%, #fdf0f0 0)` }}
            title={`${sub.title} — hotovo ${checkCount.completed} z ${checkCount.total}`}
          />
        );
      }
      return (
        <span
          key={i}
          className="block h-2 w-2 rounded-full bg-border"
          title={sub.title}
        />
      );
    });

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

      {/* Pace switch. The full path is the method; the minimal path is its
          spine (myšlenka → thesis → text) for the weeks there isn't time for
          more. Both write the same artifact fields, so switching loses nothing. */}
      <div className="mb-1.5 grid grid-cols-2 gap-1 rounded-[11px] bg-cream p-1" role="tablist" aria-label="Rychlost průvodce">
        {([
          { id: "full" as const, label: "Celá cesta" },
          { id: "minimal" as const, label: "Minimální cesta" },
        ]).map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={minimal === (m.id === "minimal")}
            onClick={() => onMinimalChange(m.id === "minimal")}
            className={`rounded-lg px-1 py-[7px] text-[12.5px] font-semibold transition-all ${
              minimal === (m.id === "minimal")
                ? "bg-white text-brick shadow-[0_1px_4px_rgba(0,0,0,.07)]"
                : "text-text-muted hover:text-text"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="mb-3.5 text-center text-[11.5px] italic text-text-light">
        {minimal
          ? `Jen páteř: myšlenka → thesis → text.`
          : `Krok za krokem podle Pokorného hermeneutiky.`}
      </p>

      {minimal ? (
        <MinimalPath artifacts={artifacts} onArtifactChange={onArtifactChange} />
      ) : (
        /* ---- GUIDE VIEW */
        <>
          {phase.subSteps.length > 1 && (
            <div className="mb-4">
              <SubStepNav
                subSteps={phase.subSteps}
                activeIndex={activeSubStep}
                completedIndices={completedSubSteps}
                onSelect={onSubStepSelect}
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
              onOpenTool={onOpenTool}
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
