import Link from "next/link";
import { phases } from "@/data/phases";

interface StepProgressProps {
  currentStep?: number;
}

const SHORT_TITLES: Record<string, string> = {
  priprava: "P\u0159\u00EDprava",
  text: "Text",
  kazani: "Tvorba",
  prednes: "P\u0159ednes",
};

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-start gap-1 overflow-x-auto py-2">
      {phases.map((phase, index) => {
        const isActive = currentStep === phase.number;
        const isPast = currentStep !== undefined && phase.number < currentStep;
        const shortTitle = SHORT_TITLES[phase.slug] ?? phase.title;

        return (
          <div key={phase.slug} className="flex items-start">
            <div className="flex flex-col items-center gap-1">
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
              <span
                className={`max-w-[44px] text-center text-[9px] leading-tight ${
                  isActive ? "font-semibold text-brick" : "text-text-light"
                }`}
              >
                {shortTitle}
              </span>
            </div>
            {index < phases.length - 1 && (
              <div
                className={`mx-1 mt-4 h-0.5 w-6 sm:w-10 ${
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
