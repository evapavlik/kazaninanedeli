"use client";

import { useState } from "react";
import Link from "next/link";
import type { Step } from "@/types";
import { checklistToolMap } from "@/data/checklist-tool-map";
import type { ChecklistToolHelper } from "./Checklist";
import BibleTextPanel from "./BibleTextPanel";
import Checklist from "./Checklist";
import QuestionNotes from "./QuestionNotes";
import TheoryPanel from "./TheoryPanel";
import Notepad from "./Notepad";

// Tool components
import NarrativeTypeIdentifier from "@/components/tools/NarrativeTypeIdentifier";
import BibleBookContext from "@/components/tools/BibleBookContext";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import TextAnnotation from "@/components/tools/TextAnnotation";
import RoleIdentifier from "@/components/tools/RoleIdentifier";
import FCFHelper from "@/components/tools/FCFHelper";
import OutlineBuilder from "@/components/tools/OutlineBuilder";

interface StepContentPanelProps {
  step: Step;
  prevStep: { slug: string; title: string } | null;
  nextStep: { slug: string; title: string } | null;
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
    case "TextAnnotation":
      return <TextAnnotation slug={slug} />;
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
  step,
  prevStep,
  nextStep,
}: StepContentPanelProps) {
  const [textPanelOpen, setTextPanelOpen] = useState(false);

  // Resolve tool helpers for checklist
  const mappings = checklistToolMap[step.slug] || [];
  const toolHelpers: ChecklistToolHelper[] = mappings.map((m) => ({
    itemIndex: m.itemIndex,
    label: m.label,
    icon: m.icon,
    component: resolveToolComponent(m.componentKey, step.slug),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]">
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
              <BibleTextPanel currentSlug={step.slug} />
            </div>
          )}
        </div>

        {/* Desktop: always visible */}
        <div className="hidden lg:block">
          <BibleTextPanel currentSlug={step.slug} />
        </div>
      </div>

      {/* Right panel: Step content */}
      <div>
        {/* Step header — compact, secondary to text */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brick-pale text-xl">
              {step.icon}
            </span>
            <div>
              <p className="font-cormorant text-[11px] font-semibold uppercase tracking-[0.12em] text-brick">
                {`Krok 0${step.number} ze 7`}
              </p>
              <h1 className="font-lora text-lg font-bold text-text sm:text-xl">
                {step.title}
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm font-light leading-[1.8] text-text-muted">
            {step.description}
          </p>
        </div>

        {/* Practical steps — interactive checklist with inline tools */}
        <Checklist
          slug={step.slug}
          items={step.practicalSteps}
          toolHelpers={toolHelpers}
        />

        {/* Questions — with note fields */}
        <QuestionNotes slug={step.slug} questions={step.questions} />

        {/* Theory panel */}
        <TheoryPanel theory={step.theory} />

        {/* Tip */}
        <section className="mb-8 rounded-xl border border-sage/20 bg-sage-pale p-6">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
            Tip
          </h2>
          <p className="text-sm font-light leading-[1.8] italic text-text-muted">
            {step.tip}
          </p>
        </section>

        {/* Notepad */}
        <Notepad slug={step.slug} />

        {/* Navigation */}
        <nav className="flex items-center justify-between border-t border-border pt-6">
          {prevStep ? (
            <Link
              href={`/pruvodce/${prevStep.slug}`}
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3L5 8l5 5" />
              </svg>
              {prevStep.title}
            </Link>
          ) : (
            <Link
              href="/pruvodce"
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3L5 8l5 5" />
              </svg>
              {`P\u0159ehled`}
            </Link>
          )}

          {nextStep ? (
            <Link
              href={`/pruvodce/${nextStep.slug}`}
              className="flex items-center gap-2 rounded-md bg-brick px-6 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              {nextStep.title}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/pruvodce"
              className="flex items-center gap-2 rounded-md bg-brick px-6 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              Hotovo!
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
