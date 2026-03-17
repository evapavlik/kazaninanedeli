import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodika",
  description: "Teoretické pozadí průvodce přípravou kázání — hermeneutika, zahraniční přístupy, inspirace.",
};

export default function MetodikaPage() {
  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
          {`Metodika`}
        </div>
        <h1 className="mb-3 font-lora text-[clamp(28px,3.5vw,40px)] font-bold text-text">
          {`Metodika`}
        </h1>
        <p className="mb-10 text-base font-light leading-[1.85] text-text-muted">
          {`Pr\u016Fvodce stoj\u00ED na t\u0159ech pil\u00ED\u0159\u00EDch: hermeneutick\u00E9 tradici, osv\u011Bd\u010Den\u00FDch zahrani\u010Dn\u00EDch metod\u00E1ch a\u00A0praktick\u00FDch zku\u0161enostech z\u00A0kazatelsk\u00E9 praxe.`}
        </p>

        {/* Pillar 1 */}
        <section className="mb-10">
          <div className="mb-4 flex items-start gap-4">
            <span className="font-cormorant text-[13px] font-semibold tracking-[0.1em] text-brick pt-1 shrink-0">
              01
            </span>
            <h2 className="font-lora text-xl font-bold text-text">
              {`Hermeneutick\u00E1 tradice`}
            </h2>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <p className="mb-4 text-sm leading-relaxed text-text">
              {`Teoretick\u00FDm z\u00E1kladem pr\u016Fvodce je d\u00EDlo Petra Pokorn\u00E9ho `}
              <em>{`Hermeneutika jako teorie porozum\u011Bn\u00ED`}</em>
              {` (Vy\u0161ehrad, 2005). Pokorn\u00FD p\u0159edstavuje hermeneutiku jako um\u011Bn\u00ED porozum\u011Bn\u00ED text\u016Fm \u2014 od z\u00E1kladn\u00EDch princip\u016F (hermeneutick\u00FD kruh, p\u0159edporozum\u011Bn\u00ED) p\u0159es metody interpretace (filologick\u00E1, historicko-kritick\u00E1, synchronn\u00ED, r\u00E9torick\u00E1) a\u017E po praktick\u00FD v\u00FDklad.`}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-text">
              {`Kl\u00ED\u010Dov\u00E9 koncepty, kter\u00E9 pr\u016Fvodce p\u0159eb\u00EDr\u00E1:`}
            </p>
            <ul className="space-y-2 text-sm">
              {[
                `Hermeneutick\u00FD kruh \u2014 porozum\u011Bn\u00ED celku z\u00E1vis\u00ED na porozum\u011Bn\u00ED \u010D\u00E1stem a naopak`,
                `P\u0159edporozum\u011Bn\u00ED \u2014 uv\u011Bdom\u011Bn\u00ED si vlastn\u00EDho horizontu jako vstupn\u00ED br\u00E1ny k textu`,
                `Spl\u00FDv\u00E1n\u00ED horizont\u016F (Gadamer) \u2014 setk\u00E1n\u00ED sv\u011Bta textu se sv\u011Btem \u010Dten\u00E1\u0159e`,
                `Porozum\u011Bn\u00ED jako sebeporozum\u011Bn\u00ED (Ricoeur) \u2014 text n\u00E1s prom\u011B\u0148uje`,
                `Cizost star\u00FDch text\u016F \u2014 respekt k historick\u00E9 vzd\u00E1lenosti`,
                `Intertextualita \u2014 biblick\u00E9 texty existuj\u00ED v s\u00EDti vz\u00E1jemn\u00FDch odkaz\u016F`,
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="shrink-0 text-sage">{`\u2022`}</span>
                  <span className="text-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pillar 2 */}
        <section className="mb-10">
          <div className="mb-4 flex items-start gap-4">
            <span className="font-cormorant text-[13px] font-semibold tracking-[0.1em] text-brick pt-1 shrink-0">
              02
            </span>
            <h2 className="font-lora text-xl font-bold text-text">
              {`Zahrani\u010Dn\u00ED metody p\u0159\u00EDpravy k\u00E1z\u00E1n\u00ED`}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="mb-2 font-lora font-semibold text-text">
                {`Evangelick\u00E9 p\u0159\u00EDstupy`}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-text">
                {`Evangelick\u00E9 c\u00EDrkve vyvinuly \u0159adu systematick\u00FDch metod p\u0159\u00EDpravy k\u00E1z\u00E1n\u00ED. Pr\u016Fvodce \u010Derp\u00E1 zejm\u00E9na z:`}
              </p>
              <ul className="space-y-1 text-sm text-text">
                <li>
                  <strong>Ramesh Richard</strong>{` \u2014 7 krok\u016F p\u0159\u00EDpravy expozi\u010Dn\u00EDho k\u00E1z\u00E1n\u00ED`}
                </li>
                <li>
                  <strong>Haddon Robinson</strong>{` \u2014 10 f\u00E1z\u00ED od textu ke k\u00E1z\u00E1n\u00ED`}
                </li>
                <li>
                  <strong>Bryan Chapell</strong>{` \u2014 kristocentrick\u00E9 k\u00E1z\u00E1n\u00ED s d\u016Frazem na FCF (Fallen Condition Focus)`}
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="mb-2 font-lora font-semibold text-text">
                {`Anglik\u00E1nsk\u00E1 tradice`}
              </h3>
              <p className="text-sm leading-relaxed text-text">
                {`Anglik\u00E1nsk\u00E9 c\u00EDrkve kladou d\u016Fraz na form\u00E1ln\u00ED vzd\u011Bl\u00E1v\u00E1n\u00ED kazatel\u016F (Licensed Lay Minister programy) a na zasazen\u00ED k\u00E1z\u00E1n\u00ED do liturgick\u00E9ho kontextu. Inspirativn\u00ED je zejm\u00E9na struktura kurzu \u201EFirst Time Preacher\u201C diec\u00E9ze Southwell: `}
                <em>{`Pro\u010D k\u00E1\u017Eeme?`}</em>
                {` \u2192 `}
                <em>{`Co k\u00E1\u017Eeme?`}</em>
                {` \u2192 `}
                <em>{`Jak k\u00E1\u017Eeme?`}</em>
              </p>
            </div>
          </div>
        </section>

        {/* Pillar 3 */}
        <section className="mb-10">
          <div className="mb-4 flex items-start gap-4">
            <span className="font-cormorant text-[13px] font-semibold tracking-[0.1em] text-brick pt-1 shrink-0">
              03
            </span>
            <h2 className="font-lora text-xl font-bold text-text">
              {`Inspirace z Logos Bible Software`}
            </h2>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <p className="text-sm leading-relaxed text-text">
              {`UX design pr\u016Fvodce se inspiruje aplikac\u00ED Logos Bible Software \u2014 profesion\u00E1ln\u00EDm n\u00E1strojem pro pr\u00E1ci s\u00A0biblick\u00FDm textem. P\u0159eb\u00EDr\u00E1me zejm\u00E9na koncept `}
              <strong>{`workflow syst\u00E9mu`}</strong>
              {` (krokov\u00FD postup s\u00A0jasn\u00FDm vizu\u00E1ln\u00EDm pr\u016Fchodem), `}
              <strong>{`kontextov\u00FDch panel\u016F`}</strong>
              {` (teorie dostupn\u00E1, ale nenut\u00EDc\u00ED se) a do budoucna `}
              <strong>{`anota\u010Dn\u00EDho n\u00E1stroje`}</strong>
              {` pro pr\u00E1ci p\u0159\u00EDmo s\u00A0textem.`}
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/pruvodce"
            className="inline-block rounded-md bg-brick px-8 py-4 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
          >
            {`Za\u010D\u00EDt pr\u016Fvodce \u2192`}
          </Link>
        </div>
      </div>
    </div>
  );
}
