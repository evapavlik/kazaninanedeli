"use client";

import Link from "next/link";
import { useState } from "react";

const AUTHOR_EMAIL = "eva.pavlik@gmail.com";
const AUTHOR_NAME = "Eva Debora Pavl\u00EDkov\u00E1";

export default function OProjektuPage() {
  const [photoLoaded, setPhotoLoaded] = useState(true);

  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
          {`O projektu`}
        </div>
        <h1 className="mb-3 font-lora text-[clamp(28px,3.5vw,40px)] font-bold text-text">
          {`K\u00E1z\u00E1n\u00ED na ned\u011Bli`}
        </h1>
        <p className="mb-10 text-base font-light leading-[1.85] text-text-muted">
          {`Interaktivn\u00ED pr\u016Fvodce pro za\u010D\u00EDnaj\u00EDc\u00ED kazatele v\u00A0C\u00EDrkvi \u010Deskoslovensk\u00E9 husitsk\u00E9.`}
        </p>

        {/* Personal intro — Eva's letter */}
        <section className="mb-8 overflow-hidden rounded-xl border border-brick/15 bg-brick-pale/30">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:gap-7 sm:p-7">
            {/* Photo */}
            <div className="shrink-0 self-center sm:self-start">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-brick/20 bg-brick flex items-center justify-center sm:h-28 sm:w-28">
                <span className="font-lora text-3xl font-bold text-white sm:text-4xl">
                  {`E`}
                </span>
                {photoLoaded && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/eva.jpg"
                    alt={AUTHOR_NAME}
                    onError={() => setPhotoLoaded(false)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Letter text */}
            <div className="flex-1">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
                {`Od autorky`}
              </p>
              <div className="space-y-3 text-[15px] leading-[1.75] text-text">
                <p>
                  {`Jsem studentkou husitsk\u00E9 teologie, p\u0159ipravuji se na fará\u0159skou slu\u017Ebu a\u00A0z\u00E1rove\u0148 pracuji r\u00E1da s\u00A0AI.`}
                </p>
                <p>
                  {`P\u0159i studiu p\u0159\u00EDpravy k\u00E1z\u00E1n\u00ED m\u011B napadlo mo\u017Enosti AI vyzkou\u0161et na konkr\u00E9tn\u00EDm probl\u00E9mu \u2014 t\u00EDm je pr\u00E1v\u011B p\u0159\u00EDprava k\u00E1z\u00E1n\u00ED. Je to discipl\u00EDna, kter\u00E1 vy\u017Eaduje hlubokou duchovn\u00ED p\u0159\u00EDpravu a\u00A0znalost Bible i\u00A0historie.`}
                </p>
                <p>
                  {`A\u00A0tak zkou\u0161\u00EDm, jak by mi \u2014 jako nov\u00E1\u010Dkovi \u2014 pr\u00E1v\u011B AI mohla pomoct.`}
                </p>
              </div>
              <p className="mt-4 font-lora text-sm italic text-text-muted">
                {`\u2014 ${AUTHOR_NAME}`}
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-3 font-lora text-xl font-bold text-text">
              {`Pro\u010D to d\u011Bl\u00E1m`}
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-text">
              {`P\u0159\u00EDprava k\u00E1z\u00E1n\u00ED je n\u00E1ro\u010Dn\u00E1 discipl\u00EDna. Vy\u017Eaduje pr\u00E1ci s\u00A0biblick\u00FDm textem, porozum\u011Bn\u00ED jeho kontextu, schopnost naj\u00EDt aktu\u00E1ln\u00ED sd\u011Blen\u00ED a\u00A0p\u0159edat ho srozumiteln\u011B poslucha\u010D\u016Fm. S\u00E1ma jako za\u010D\u00EDnaj\u00EDc\u00ED kazatelka v\u00EDm, jak m\u016F\u017Ee b\u00FDt tento \u00FAkol zahlcuj\u00EDc\u00ED \u2014 zvl\u00E1\u0161\u0165 kdy\u017E stoj\u00EDte p\u0159ed n\u00EDm poprv\u00E9.`}
            </p>
            <p className="text-sm leading-relaxed text-text">
              {`Cht\u011Bla jsem si vytvo\u0159it pr\u016Fvodce, kter\u00FD nab\u00EDdne jasnou cestu krok za krokem \u2014 od prvn\u00EDho setk\u00E1n\u00ED s\u00A0textem a\u017E k\u00A0p\u0159ipraven\u00E9mu k\u00E1z\u00E1n\u00ED. Sna\u017E\u00EDm se v\u00A0n\u011Bm kombinovat akademickou hermeneutickou metodologii s\u00A0praktick\u00FDmi zahrani\u010Dn\u00EDmi p\u0159\u00EDstupy a\u00A0p\u0159ev\u00E1d\u011Bt je do srozumiteln\u00E9 formy.`}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-3 font-lora text-xl font-bold text-text">
              {`C\u00EDrkev \u010Deskoslovensk\u00E1 husitsk\u00E1`}
            </h2>
            <p className="text-sm leading-relaxed text-text">
              {`Pr\u016Fvodce p\u0159ipravuji pro C\u010CSH \u2014 c\u00EDrkev, ke kter\u00E9 pat\u0159\u00EDm a\u00A0pro jej\u00ED\u017E budouc\u00ED slu\u017Ebu se p\u0159ipravuji. K\u00E1z\u00E1n\u00ED m\u00E1 v\u00A0jej\u00ED bohoslu\u017Eebn\u00E9 praxi \u00FAst\u0159edn\u00ED m\u00EDsto \u2014 je prostorem, kde se biblick\u00FD text setk\u00E1v\u00E1 se \u017Eivotem sboru. Sna\u017E\u00EDm se, aby pr\u016Fvodce respektoval specifika C\u010CSH: liturgick\u00FD kontext, ekumenickou otev\u0159enost a\u00A0d\u016Fraz na propojen\u00ED tradice se sou\u010Dasnost\u00ED.`}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-3 font-lora text-xl font-bold text-text">
              {`Z\u00A0\u010Deho vych\u00E1z\u00EDm`}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text">
              <p>
                <strong>{`Hermeneutick\u00E1 teorie:`}</strong>
                {` Vych\u00E1z\u00EDm z\u00A0d\u00EDla Petra Pokorn\u00E9ho `}
                <em>{`Hermeneutika jako teorie porozum\u011Bn\u00ED`}</em>
                {`, kter\u00E9 je nejucelel\u011Bj\u0161\u00EDm \u010Desk\u00FDm zpracov\u00E1n\u00EDm hermeneutiky.`}
              </p>
              <p>
                <strong>{`Zahrani\u010Dn\u00ED metody:`}</strong>
                {` \u010Cerp\u00E1m z\u00A0osv\u011Bd\u010Den\u00FDch postup\u016F evangelick\u00FDch (Robinson, Richard, Chapell) i\u00A0anglik\u00E1nsk\u00FDch c\u00EDrkv\u00ED (Licensed Lay Minister programy, kurzy pro za\u010D\u00EDnaj\u00EDc\u00ED kazatele).`}
              </p>
              <p>
                <strong>{`UX inspirace:`}</strong>
                {` Design pr\u016Fvodce je inspirov\u00E1n workflow syst\u00E9mem aplikace Logos Bible Software \u2014 profesion\u00E1ln\u00EDho n\u00E1stroje pro studium Bible.`}
              </p>
            </div>
          </section>

          {/* Feedback section */}
          <section className="rounded-xl border border-brick/25 bg-brick-pale/20 p-6">
            <h2 className="mb-2 font-lora text-xl font-bold text-text">
              {`Zku\u0161ebn\u00ED provoz \u2014 budu r\u00E1da za zp\u011Btnou vazbu`}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-text">
              {`Aplikace je ve zku\u0161ebn\u00EDm provozu \u2014 u\u010D\u00ED se spolu se mnou. Budu r\u00E1da za Va\u0161i zp\u011Btnou vazbu, n\u00E1pady a\u00A0n\u00E1m\u011Bty. A\u0165 u\u017E jde o\u00A0chybu, o\u00A0to, co by\u00A0V\u00E1m usnadnilo p\u0159\u00EDpravu k\u00E1z\u00E1n\u00ED, nebo o\u00A0jak\u00FDkoli podn\u011Bt \u2014 napi\u0161te mi, pros\u00EDm.`}
            </p>
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-md bg-brick px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-brick-light"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="12" height="10" rx="1" />
                <path d="M2 5l6 4 6-4" />
              </svg>
              {AUTHOR_EMAIL}
            </a>
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
