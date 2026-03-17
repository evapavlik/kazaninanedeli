import Link from "next/link";
import { steps } from "@/data/steps";
import { workedExample } from "@/data/example";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Uk\u00E1zkov\u00FD p\u0159\u00EDklad \u2014 Lk 15,1\u20137`,
  description: `Kompletn\u011B zpracovan\u00E1 p\u0159\u00EDprava k\u00E1z\u00E1n\u00ED na Podobenstv\u00ED o ztracen\u00E9 ovci.`,
};

export default function UkazkaPage() {
  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="mb-10">
          <Link
            href="/pruvodce"
            className="mb-4 inline-flex items-center gap-1 text-sm text-text-muted no-underline transition-colors hover:text-brick"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 3L5 8l5 5" />
            </svg>
            {`Zp\u011Bt na p\u0159ehled`}
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
            {`P\u0159\u00EDklad`}
          </div>
          <h1 className="mb-2 font-lora text-[clamp(28px,3.5vw,40px)] font-bold text-text">
            {`Uk\u00E1zkov\u00FD p\u0159\u00EDklad`}
          </h1>
          <p className="mb-1 font-lora text-lg font-semibold text-brick">
            {workedExample.title}
          </p>
          <p className="text-sm font-light leading-[1.8] text-text-muted">
            {workedExample.introduction}
          </p>
        </div>

        {/* Bible text */}
        <section className="mb-10 rounded-xl border border-sage/30 bg-sage-pale p-6">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
            {workedExample.bibleReference}
          </h2>
          <p className="font-lora text-sm leading-relaxed italic text-text">
            {workedExample.bibleText}
          </p>
        </section>

        {/* Steps */}
        <div className="space-y-10">
          {workedExample.steps.map((exStep) => {
            const stepData = steps.find(
              (s) => s.slug === exStep.stepSlug
            );
            if (!stepData) return null;

            return (
              <section
                key={exStep.stepNumber}
                className="rounded-xl border border-border bg-white p-6"
              >
                {/* Step header */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brick-pale text-xl">
                    {stepData.icon}
                  </span>
                  <div>
                    <p className="font-cormorant text-[13px] font-semibold tracking-[0.1em] text-brick">
                      {`Krok 0${exStep.stepNumber}`}
                    </p>
                    <h3 className="font-lora text-lg font-bold text-text">
                      {stepData.title}
                    </h3>
                  </div>
                </div>

                {/* Checklist (read-only) */}
                <div className="mb-5">
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick">
                    {`Praktick\u00E9 kroky`}
                  </h4>
                  <ol className="space-y-2">
                    {stepData.practicalSteps.map((ps, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                            exStep.checkedItems[i]
                              ? "bg-brick text-white"
                              : "bg-brick-pale text-brick"
                          }`}
                        >
                          {exStep.checkedItems[i] ? (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 14 14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 7l3 3 5-6" />
                            </svg>
                          ) : (
                            <span className="font-bold">{i + 1}</span>
                          )}
                        </span>
                        <span
                          className={`text-sm leading-relaxed ${
                            exStep.checkedItems[i]
                              ? "text-text-muted line-through"
                              : "text-text"
                          }`}
                        >
                          {ps}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Question answers */}
                <div className="mb-5">
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
                    {`Ot\u00E1zky a odpov\u011Bdi`}
                  </h4>
                  <div className="space-y-3">
                    {stepData.questions.map((q, i) => (
                      <div key={i}>
                        <div className="mb-1 flex gap-2 text-sm">
                          <span className="shrink-0 font-bold text-sage">
                            ?
                          </span>
                          <span className="font-medium text-text">{q}</span>
                        </div>
                        {exStep.questionAnswers[i] && (
                          <div className="ml-5 rounded-lg bg-sage-pale px-3 py-2 text-sm leading-relaxed text-text-muted">
                            {exStep.questionAnswers[i]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {exStep.notes && (
                  <div className="mb-5">
                    <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick">
                      {`Z\u00E1pisky`}
                    </h4>
                    <div className="rounded-lg border border-brick/10 bg-brick-pale p-3 text-sm leading-relaxed text-text whitespace-pre-line">
                      {exStep.notes}
                    </div>
                  </div>
                )}

                {/* Commentary */}
                <div className="border-l-3 border-sage/40 pl-4">
                  <p className="text-sm leading-relaxed italic text-text-muted">
                    <span className="not-italic font-bold text-sage">
                      {`Koment\u00E1\u0159: `}
                    </span>
                    {exStep.commentary}
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom navigation */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/pruvodce"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-text-muted no-underline transition-all hover:bg-cream hover:text-text"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 3L5 8l5 5" />
            </svg>
            {`Zp\u011Bt na p\u0159ehled`}
          </Link>
          <Link
            href="/pruvodce/modlitba"
            className="inline-block rounded-md bg-brick px-6 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
          >
            {`Za\u010D\u00EDt vlastn\u00ED p\u0159\u00EDpravu \u2192`}
          </Link>
        </div>
      </div>
    </div>
  );
}
