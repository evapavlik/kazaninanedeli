import Link from "next/link";
import { steps } from "@/data/steps";

interface StepProgressProps {
  currentStep?: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2">
      {steps.map((step, index) => {
        const isActive = currentStep === step.number;
        const isPast = currentStep !== undefined && step.number < currentStep;

        return (
          <div key={step.slug} className="flex items-center">
            <Link
              href={`/pruvodce/${step.slug}`}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold no-underline transition-all ${
                isActive
                  ? "bg-brick text-white shadow-md"
                  : isPast
                    ? "bg-brick/20 text-brick"
                    : "bg-border text-text-muted hover:bg-brick/10"
              }`}
              title={step.title}
            >
              {step.number}
            </Link>
            {index < steps.length - 1 && (
              <div
                className={`mx-1 h-0.5 w-4 sm:w-8 ${
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
