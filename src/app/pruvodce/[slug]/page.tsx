import { notFound } from "next/navigation";
import { steps } from "@/data/steps";
import StepProgress from "@/components/pruvodce/StepProgress";
import StepContentPanel from "@/components/pruvodce/StepContentPanel";
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
    <div className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Progress bar */}
        <div className="mb-8 flex justify-center">
          <StepProgress currentStep={step.number} />
        </div>

        {/* 2-panel layout */}
        <StepContentPanel
          step={step}
          prevStep={prevStep ? { slug: prevStep.slug, title: prevStep.title } : null}
          nextStep={nextStep ? { slug: nextStep.slug, title: nextStep.title } : null}
        />
      </div>
    </div>
  );
}
