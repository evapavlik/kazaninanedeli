import Link from "next/link";
import { phases } from "@/data/phases";

interface StepProgressProps {
  currentStep?: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2">
      {phases.map((phase, index) => {
        const isActive = currentStep === phase.number;
        const isPast = currentStep !== undefined && phase.number < currentStep;

        return (
          <div key={phase.slug} className="flex items-center">
            <Link
              href={`/pruvodce/${phase.slug}`}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold no-underline transition-all ${
                isActive
                  ? "bg-brick text-white shadow-md"
                  : isPast
                    ? "bg-brick/20 text-brick"
                    : "bg-border text-text-muted hover:bg-brick/10"
              }`}
              title={phase.title}
            >
              {phase.number}
            </Link>
            {index < phases.length - 1 && (
              <div
                className={`mx-1 h-0.5 w-6 sm:w-10 ${
                  isPast ? "bg-brick/30" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
