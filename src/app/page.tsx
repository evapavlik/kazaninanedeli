import Link from "next/link";
import { steps } from "@/data/steps";
import FadeUp from "@/components/FadeUp";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-off-white px-6 pb-16 pt-12 md:px-12 md:pb-20">
        {/* Background gradients */}
        <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(196,30,30,0.07)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-[80px] -left-[100px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(74,124,111,0.06)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-[760px]">
          <div className="mb-9 inline-flex items-center gap-2.5 rounded-full bg-brick-pale px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brick">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brick" />
            {`C\u00EDrkev \u010Deskoslovensk\u00E1 husitsk\u00E1`}
          </div>

          <h1 className="mb-7 font-lora text-[clamp(36px,5.5vw,68px)] font-bold leading-[1.08] tracking-tight text-text">
            {`K\u00E1z\u00E1n\u00ED na`}
            <br />
            {`ned\u011Bli`}
          </h1>

          <p className="mb-13 max-w-[520px] text-lg font-light leading-[1.75] text-text-muted">
            {`Interaktivn\u00ED pr\u016Fvodce p\u0159\u00EDpravou k\u00E1z\u00E1n\u00ED \u2014 od biblick\u00E9ho textu ke \u017Eiv\u00E9mu slovu. Krok za krokem, srozumiteln\u011B a\u00A0s\u00A0teoretick\u00FDm z\u00E1zem\u00EDm.`}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/pruvodce"
              className="inline-block rounded-md bg-brick px-8 py-4 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              {`Za\u010D\u00EDt pr\u016Fvodce`}
            </Link>
            <Link
              href="/metodika"
              className="inline-block rounded-md border-[1.5px] border-border-strong bg-transparent px-8 py-4 text-sm font-medium text-text-muted no-underline transition-all duration-200 hover:border-brick hover:text-brick"
            >
              {`O metodik\u011B`}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-[80px] md:px-12">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
              {`Pro koho`}
            </div>
            <h2 className="mb-6 font-lora text-[clamp(24px,3vw,36px)] font-bold leading-[1.2] text-text">
              {`Pro v\u0161echny, kdo se chystaj\u00ED`}
              <br className="hidden sm:block" />
              {` `}<em className="italic text-brick">{`k\u00E1zat.`}</em>
            </h2>
            <p className="text-base font-light leading-[1.85] text-text-muted">
              {`Pro v\u0161echny, kdo se chystaj\u00ED poprv\u00E9 p\u0159ipravit k\u00E1z\u00E1n\u00ED, i\u00A0pro ty, kdo hledaj\u00ED systematick\u00FD p\u0159\u00EDstup k\u00A0p\u0159\u00EDprav\u011B. Pr\u016Fvodce vych\u00E1z\u00ED z\u00A0hermeneutick\u00E9 tradice a\u00A0osv\u011Bd\u010Den\u00FDch zahrani\u010Dn\u00EDch metod \u2014 a\u00A0p\u0159ev\u00E1d\u00ED je do srozumiteln\u00FDch, praktick\u00FDch krok\u016F.`}
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Steps overview */}
      <section className="bg-white px-6 py-[80px] md:px-12">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <div className="mb-10 text-center">
              <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
                {`Pr\u016Fvodce`}
              </div>
              <h2 className="font-lora text-[clamp(24px,3vw,36px)] font-bold leading-[1.2] text-text">
                {`7 krok\u016F ke k\u00E1z\u00E1n\u00ED`}
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <FadeUp key={step.slug} delay={index * 80}>
                <Link
                  href={`/pruvodce/${step.slug}`}
                  className="group block rounded-xl border border-border bg-white p-7 no-underline transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(196,30,30,0.08)]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-brick-pale text-lg text-brick">
                      {step.icon}
                    </span>
                    <span className="font-cormorant text-[13px] font-semibold tracking-[0.1em] text-brick">
                      {`0${step.number}`}
                    </span>
                  </div>
                  <h3 className="mb-2 font-lora text-lg font-semibold text-text group-hover:text-brick">
                    {step.title}
                  </h3>
                  <p className="text-sm font-light leading-[1.8] text-text-muted">
                    {step.subtitle}
                  </p>
                </Link>
              </FadeUp>
            ))}

            {/* Final CTA card */}
            <FadeUp delay={7 * 80}>
              <Link
                href="/pruvodce"
                className="flex items-center justify-center rounded-xl border-2 border-dashed border-brick/30 bg-brick-pale p-7 text-center no-underline transition-all duration-[250ms] hover:border-brick hover:bg-brick-pale/80"
              >
                <div>
                  <p className="font-lora text-lg font-semibold text-brick">
                    {`Za\u010D\u00EDt cestu`}
                  </p>
                  <p className="text-sm text-text-muted">
                    {`Otev\u0159\u00EDt pr\u016Fvodce`}
                  </p>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream px-6 py-[80px] md:px-12">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <div className="mb-10 text-center">
              <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sage before:h-0.5 before:w-5 before:rounded-sm before:bg-sage before:content-['']">
                {`Co najdete`}
              </div>
              <h2 className="font-lora text-[clamp(24px,3vw,36px)] font-bold leading-[1.2] text-text">
                {`Co v\u00A0pr\u016Fvodci najdete`}
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: "\uD83D\uDCDA",
                title: `Teoretick\u00FD z\u00E1klad`,
                description: `Hermeneutick\u00E1 metodologie podle P.\u00A0Pokorn\u00E9ho \u2014 srozumiteln\u011B a\u00A0prakticky.`,
              },
              {
                icon: "\uD83D\uDDFA\uFE0F",
                title: `Praktick\u00E9 kroky`,
                description: `Osv\u011Bd\u010Den\u00E9 zahrani\u010Dn\u00ED metody p\u0159\u00EDpravy k\u00E1z\u00E1n\u00ED p\u0159eveden\u00E9 do konkr\u00E9tn\u00EDch krok\u016F.`,
              },
              {
                icon: "\uD83D\uDCA1",
                title: `Tipy a ot\u00E1zky`,
                description: `U\u00A0ka\u017Ed\u00E9ho kroku ot\u00E1zky k\u00A0zamy\u0161len\u00ED a\u00A0praktick\u00E9 tipy z\u00A0kazatelsk\u00E9 praxe.`,
              },
            ].map((feature) => (
              <FadeUp key={feature.title}>
                <div className="text-center">
                  <span className="mb-4 inline-block text-3xl">{feature.icon}</span>
                  <h3 className="mb-2 font-lora font-semibold text-text">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-light leading-[1.8] text-text-muted">
                    {feature.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
