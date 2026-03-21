import Link from "next/link";
import { phases } from "@/data/phases";
import FadeUp from "@/components/FadeUp";
import SundayReadingCard from "@/components/SundayReadingCard";

export default function Home() {
  return (
    <div>
      {/* Hero — compact */}
      <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-off-white px-6 pb-12 pt-10 md:px-12 md:pb-16">
        {/* Background gradients */}
        <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(196,30,30,0.07)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-[80px] -left-[100px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(74,124,111,0.06)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-[760px]">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-brick-pale px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brick">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brick" />
            {`C\u00EDrkev \u010Deskoslovensk\u00E1 husitsk\u00E1`}
          </div>

          <h1 className="mb-5 font-lora text-[clamp(36px,5.5vw,68px)] font-bold leading-[1.08] tracking-tight text-text">
            {`K\u00E1z\u00E1n\u00ED na`}
            <br />
            {`ned\u011Bli`}
          </h1>

          <p className="mb-8 max-w-[480px] text-base font-light leading-[1.75] text-text-muted">
            {`Pr\u016Fvodce p\u0159\u00EDpravou k\u00E1z\u00E1n\u00ED ve 4\u00A0f\u00E1z\u00EDch \u2014 od modlitby p\u0159es pr\u00E1ci s\u00A0textem a\u017E k\u00A0p\u0159ednesu. Srozumiteln\u011B, krok za krokem.`}
          </p>

          {/* Sunday reading card */}
          <SundayReadingCard />
        </div>
      </section>

      {/* 4 phases — one line each */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <div className="mb-8 text-center">
              <h2 className="font-lora text-[clamp(22px,3vw,32px)] font-bold leading-[1.2] text-text">
                {`4 f\u00E1ze p\u0159\u00EDpravy`}
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {phases.map((phase, index) => (
              <FadeUp key={phase.slug} delay={index * 60}>
                <Link
                  href={`/pruvodce/${phase.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(196,30,30,0.06)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brick-pale text-lg">
                    {phase.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-cormorant text-[11px] font-semibold tracking-[0.1em] text-brick">
                        {`0${phase.number}`}
                      </span>
                      <h3 className="font-lora text-base font-semibold text-text group-hover:text-brick">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-muted">
                      {phase.subtitle}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-text-light">
                    {`~${phase.estimatedMinutes}\u00A0min`}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-text-light transition-transform group-hover:translate-x-1 group-hover:text-brick">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </Link>
              </FadeUp>
            ))}
          </div>

          {/* Link to worked example */}
          <FadeUp delay={300}>
            <div className="mt-6 text-center">
              <Link
                href="/pruvodce/ukazka"
                className="text-sm text-text-muted no-underline transition-colors hover:text-brick"
              >
                {`\uD83D\uDCDD Uk\u00E1zkov\u00FD p\u0159\u00EDklad p\u0159\u00EDpravy`}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
