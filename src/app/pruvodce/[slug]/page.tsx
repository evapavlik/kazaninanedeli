import Link from "next/link";
import { notFound } from "next/navigation";
import { steps } from "@/data/steps";
import StepProgress from "@/components/pruvodce/StepProgress";
import TheoryPanel from "@/components/pruvodce/TheoryPanel";
import Checklist from "@/components/pruvodce/Checklist";
import Notepad from "@/components/pruvodce/Notepad";
import QuestionNotes from "@/components/pruvodce/QuestionNotes";
import StepTools from "@/components/pruvodce/StepTools";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return steps.map((step) => ({ slug: step.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const step = steps.find((s) => s.slug === slug);
  if (!step) return {};
  return {
    title: `${step.number}. ${step.title}`,
    description: step.description,
  };
}

export default async function StepPage({ params }: PageProps) {
  const { slug } = await params;
  const step = steps.find((s) => s.slug === slug);
  if (!step) notFound();

  const prevStep = steps.find((s) => s.number === step.number - 1);
  const nextStep = steps.find((s) => s.number === step.number + 1);

  return (
    <div className="px-6 py-8 md:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Progress bar */}
        <div className="mb-8 flex justify-center">
          <StepProgress currentStep={step.number} />
        </div>

        {/* Step header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-brick-pale text-3xl">
              {step.icon}
            </span>
            <div>
              <p className="font-cormorant text-[13px] font-semibold uppercase tracking-[0.1em] text-brick">
                {`Krok 0${step.number} ze 7`}
              </p>
              <h1 className="font-lora text-2xl font-bold text-text sm:text-3xl">
                {step.title}
              </h1>
            </div>
          </div>
          <p className="mt-4 text-base font-light leading-[1.85] text-text-muted">
            {step.description}
          </p>
        </div>

        {/* Practical steps — interactive checklist */}
        <Checklist slug={step.slug} items={step.practicalSteps} />

        {/* Questions — with note fields */}
        <QuestionNotes slug={step.slug} questions={step.questions} />

        {/* Phase 3 tools */}
        <StepTools slug={step.slug} />

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
