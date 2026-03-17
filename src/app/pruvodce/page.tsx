import Link from "next/link";
import { steps } from "@/data/steps";
import StepCardWithProgress from "@/components/pruvodce/StepCardWithProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Průvodce přípravou kázání",
  description: "7 kroků od biblického textu ke kázání. Interaktivní průvodce pro začínající kazatele.",
};

export default function PruvodcePage() {
  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
            {`Pr\u016Fvodce`}
          </div>
          <h1 className="mb-4 font-lora text-[clamp(28px,3.5vw,40px)] font-bold leading-[1.2] text-text">
            {`Cesta ke k\u00E1z\u00E1n\u00ED`}
          </h1>
          <p className="text-base font-light leading-[1.85] text-text-muted">
            {`Sedm krok\u016F, kter\u00E9 v\u00E1s provedou od prvn\u00EDho setk\u00E1n\u00ED s\u00A0biblick\u00FDm textem a\u017E k\u00A0p\u0159ipraven\u00E9mu k\u00E1z\u00E1n\u00ED. Ka\u017Ed\u00FD krok obsahuje praktick\u00E9 instrukce, ot\u00E1zky k\u00A0zamy\u0161len\u00ED i\u00A0teoretick\u00E9 pozad\u00ED.`}
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <StepCardWithProgress
              key={step.slug}
              slug={step.slug}
              totalItems={step.practicalSteps.length}
            >
              <Link
                href={`/pruvodce/${step.slug}`}
                className="group flex gap-5 rounded-xl border border-border bg-white p-6 no-underline transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(196,30,30,0.08)]"
              >
                <div className="flex shrink-0 flex-col items-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-brick-pale text-2xl">
                    {step.icon}
                  </span>
                  <span className="mt-1.5 font-cormorant text-[12px] font-semibold tracking-[0.1em] text-brick">
                    {`0${step.number}`}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="mb-1 font-lora text-lg font-semibold text-text group-hover:text-brick">
                    {step.title}
                  </h2>
                  <p className="mb-2 text-sm font-medium text-brick">
                    {step.subtitle}
                  </p>
                  <p className="text-sm font-light leading-[1.8] text-text-muted line-clamp-2">
                    {step.description}
                  </p>
                </div>

                <div className="hidden shrink-0 items-center text-text-muted transition-transform group-hover:translate-x-1 sm:flex">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 4l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            </StepCardWithProgress>
          ))}

          {/* Link to worked example */}
          <Link
            href="/pruvodce/ukazka"
            className="group flex gap-5 rounded-xl border-2 border-dashed border-brick/30 bg-brick-pale p-6 no-underline transition-all duration-[250ms] hover:border-brick/50 hover:shadow-[0_4px_20px_rgba(196,30,30,0.06)]"
          >
            <div className="flex shrink-0 items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-white text-2xl">
                {"\uD83D\uDCDD"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="mb-1 font-lora text-lg font-semibold text-brick">
                {`Uk\u00E1zkov\u00FD p\u0159\u00EDklad`}
              </h2>
              <p className="text-sm font-light leading-[1.8] text-text-muted">
                {`Pod\u00EDvejte se, jak vypad\u00E1 kompletn\u011B zpracovan\u00E1 p\u0159\u00EDprava k\u00E1z\u00E1n\u00ED na Lk\u00A015,1\u20137 (Podobenstv\u00ED o ztracen\u00E9 ovci).`}
              </p>
            </div>
            <div className="hidden shrink-0 items-center text-brick transition-transform group-hover:translate-x-1 sm:flex">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 4l6 6-6 6" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
