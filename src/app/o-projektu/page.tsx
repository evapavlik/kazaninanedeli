import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O projektu",
  description: "Informace o projektu Kázání na neděli a jeho zasazení do kontextu CČSH.",
};

export default function OProjektuPage() {
  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
          {`O projektu`}
        </div>
        <h1 className="mb-3 font-lora text-[clamp(28px,3.5vw,40px)] font-bold text-text">
          {`O projektu`}
        </h1>
        <p className="mb-10 text-base font-light leading-[1.85] text-text-muted">
          {`K\u00E1z\u00E1n\u00ED na ned\u011Bli je interaktivn\u00ED pr\u016Fvodce pro za\u010D\u00EDnaj\u00EDc\u00ED kazatele v\u00A0C\u00EDrkvi \u010Deskoslovensk\u00E9 husitsk\u00E9.`}
        </p>

        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-3 font-lora text-xl font-bold text-text">
              {`Pro\u010D tento pr\u016Fvodce?`}
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-text">
              {`P\u0159\u00EDprava k\u00E1z\u00E1n\u00ED je n\u00E1ro\u010Dn\u00E1 discipl\u00EDna \u2014 vy\u017Eaduje pr\u00E1ci s\u00A0biblick\u00FDm textem, porozum\u011Bn\u00ED jeho kontextu, schopnost naj\u00EDt aktu\u00E1ln\u00ED sd\u011Blen\u00ED a\u00A0p\u0159edat ho srozumiteln\u011B poslucha\u010D\u016Fm. Pro za\u010D\u00EDnaj\u00EDc\u00ED kazatele m\u016F\u017Ee b\u00FDt tento \u00FAkol zahlcuj\u00EDc\u00ED.`}
            </p>
            <p className="text-sm leading-relaxed text-text">
              {`Tento pr\u016Fvodce nab\u00EDz\u00ED jasnou, krok-za-krokem cestu od prvn\u00EDho setk\u00E1n\u00ED s\u00A0textem a\u017E k\u00A0p\u0159ipraven\u00E9mu k\u00E1z\u00E1n\u00ED. Kombinuje akademickou hermeneutickou metodologii s\u00A0praktick\u00FDmi zahrani\u010Dn\u00EDmi p\u0159\u00EDstupy a\u00A0p\u0159ev\u00E1d\u00ED je do srozumiteln\u00E9 formy.`}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-3 font-lora text-xl font-bold text-text">
              {`C\u00EDrkev \u010Deskoslovensk\u00E1 husitsk\u00E1`}
            </h2>
            <p className="text-sm leading-relaxed text-text">
              {`C\u010CSH je k\u0159es\u0165ansk\u00E1 c\u00EDrkev navazuj\u00EDc\u00ED na tradici \u010Desk\u00E9 reformace. K\u00E1z\u00E1n\u00ED m\u00E1 v\u00A0jej\u00ED bohoslu\u017Eebn\u00E9 praxi \u00FAst\u0159edn\u00ED m\u00EDsto \u2014 je prostorem, kde se biblick\u00FD text setk\u00E1v\u00E1 se \u017Eivotem sboru. Pr\u016Fvodce respektuje specifika C\u010CSH: liturgick\u00FD kontext, ekumenickou otev\u0159enost a\u00A0d\u016Fraz na propojen\u00ED tradice se sou\u010Dasnost\u00ED.`}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-3 font-lora text-xl font-bold text-text">
              {`Na \u010Dem pr\u016Fvodce stoj\u00ED`}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text">
              <p>
                <strong>{`Hermeneutick\u00E1 teorie:`}</strong>
                {` Vych\u00E1z\u00EDme z\u00A0d\u00EDla Petra Pokorn\u00E9ho `}
                <em>{`Hermeneutika jako teorie porozum\u011Bn\u00ED`}</em>
                {`, kter\u00E9 je nejucelel\u011Bj\u0161\u00EDm \u010Desk\u00FDm zpracov\u00E1n\u00EDm hermeneutiky.`}
              </p>
              <p>
                <strong>{`Zahrani\u010Dn\u00ED metody:`}</strong>
                {` \u010Cerp\u00E1me z\u00A0osv\u011Bd\u010Den\u00FDch postup\u016F evangelick\u00FDch (Robinson, Richard, Chapell) i\u00A0anglik\u00E1nsk\u00FDch (Licensed Lay Minister programy, kurzy pro za\u010D\u00EDnaj\u00EDc\u00ED kazatele) c\u00EDrkv\u00ED.`}
              </p>
              <p>
                <strong>{`UX inspirace:`}</strong>
                {` Design pr\u016Fvodce se inspiruje workflow syst\u00E9mem aplikace Logos Bible Software \u2014 profesion\u00E1ln\u00EDho n\u00E1stroje pro studium Bible.`}
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
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
