import { notFound } from "next/navigation";
import { phases } from "@/data/phases";
import StepProgress from "@/components/pruvodce/StepProgress";
import StepContentPanel from "@/components/pruvodce/StepContentPanel";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return phases.map((phase) => ({ slug: phase.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const phase = phases.find((p) => p.slug === slug);
  if (!phase) return {};
  return {
    title: `${phase.number}. ${phase.title}`,
    description: phase.description,
  };
}

export default async function PhasePage({ params }: PageProps) {
  const { slug } = await params;
  const phase = phases.find((p) => p.slug === slug);
  if (!phase) notFound();

  const prevPhase = phases.find((p) => p.number === phase.number - 1);
  const nextPhase = phases.find((p) => p.number === phase.number + 1);

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Progress bar */}
        <div className="mb-8 flex justify-center">
          <StepProgress currentStep={phase.number} />
        </div>

        {/* 2-panel layout */}
        <StepContentPanel
          key={phase.slug}
          phase={phase}
          prevPhase={prevPhase ? { slug: prevPhase.slug, title: prevPhase.title } : null}
          nextPhase={nextPhase ? { slug: nextPhase.slug, title: nextPhase.title } : null}
        />
      </div>
    </div>
  );
}
