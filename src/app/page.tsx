import Link from "next/link";
import { phases } from "@/data/phases";
import Avatar from "@/components/Avatar";
import FadeUp from "@/components/FadeUp";
import SundayReadingCard from "@/components/SundayReadingCard";

interface Voice {
  name: string;
  role: string;
  photoSrc: string;
  initials: string;
  quote: string;
  source: string;
  takeawayLabel: string;
  takeaway: string;
}

const voices: Voice[] = [
  {
    name: "Karel Farský",
    role: "I. patriarcha CČSH · 1880–1927",
    photoSrc: "/karel-farsky.png",
    initials: "KF",
    quote:
      "Našim kazatelům je nutno vrátit se k prameni vody živé — otevřít tyto živé prameny v sobě samých.",
    source: "Postily · 1952 (texty z let 1921–1924)",
    takeawayLabel: "CO dělat",
    takeaway:
      "Vrátit se k Bibli. Ne jen ji přečíst — nechat ji promluvit. Pramen, ze kterého čerpáš pro druhé, musí být živý v tobě.",
  },
  {
    name: "František Kovář",
    role: "Biskup · novozákonní teolog · 1888–1969",
    photoSrc: "/frantisek-kovar.jpg",
    initials: "FK",
    quote:
      "V kazateli slova Božího oslovuje Kristus, ano Bůh sám, člověka k jeho spáse.",
    source: "Kázání Božího slova · Náboženská revue, 1943",
    takeawayLabel: "PROČ to funguje",
    takeaway:
      "Nekážeš ze sebe. Tvoje slova jsou místo, skrze které mluví Kristus. To je úleva — i důvod k pokoře.",
  },
  {
    name: "Zdeněk Trtík",
    role: "Systematický teolog · 1914–1983",
    photoSrc: "/zdenek-trtik.jpg",
    initials: "ZT",
    quote:
      "Kázání je překládání starobylých textů Bible do zkušeností a myšlenkových obzorů přítomnosti, a tak otvírá Božímu slovu cestu do životních situací a k problémům dnešního člověka.",
    source: "Boží slovo čili zjevení · Theologická revue",
    takeawayLabel: "JAK na to",
    takeaway:
      "Překladatelsky. Z jejich světa do našeho. Stará kniha má co říct dnešnímu člověku — tvoje práce je tu cestu otevřít.",
  },
];

interface Ucel {
  roman: string;
  title: string;
  subtitle?: string;
  body: string;
}

const ucely: Ucel[] = [
  {
    roman: "I.",
    title: "Pastorační",
    subtitle: "poimenické",
    body: "Vést posluchače z jeho hříchů, krizí, válek a starostí k Bohu. Útěcha, povzbuzení, doprovázení.",
  },
  {
    roman: "II.",
    title: "Napravující",
    subtitle: "kázeňské",
    body: "Ukázat Boží měřítko pro lidský život — ne moralizovat, ale volat zpět k tomu, co je živé a pravdivé.",
  },
  {
    roman: "III.",
    title: "Věroučné",
    body: "Učit víře církve — tak, jak je společně vyznávána. Není to prostor pro soukromé mínění kazatele.",
  },
  {
    roman: "IV.",
    title: "Pro obec",
    body: "Stmelovat společenství. Prohlubovat vzájemnost obce vírou, nadějí i konkrétní láskou jeden k druhému.",
  },
  {
    roman: "V.",
    title: "Misijní",
    subtitle: "evangelizační",
    body: "Zvát k víře v Krista. Oslovovat ty, kteří hledají, a obnovovat první lásku u věřících.",
  },
];

const liturgieItems: { label: string; highlight?: boolean }[] = [
  { label: "Píseň" },
  { label: "Pozdrav a vstupní modlitba" },
  { label: "Doznání hříchu a vin" },
  { label: "Píseň" },
  { label: "Vstupní čtení (zpravidla SZ)" },
  { label: "Tužby s Kyrie" },
  { label: "Zvěstování" },
  { label: "Epištola" },
  { label: "Blahoslavenství" },
  { label: "Evangelium" },
  { label: "Kázání", highlight: true },
  { label: "Vyznání víry (Krédo)" },
  { label: "Píseň" },
  { label: "Obětování…" },
];

export default function Home() {
  return (
    <div>
      {/* Hero — brand + Kovář theological opening + Sunday Reading */}
      <section className="relative overflow-hidden bg-off-white px-6 pb-14 pt-12 md:px-12 md:pb-20 md:pt-16">
        {/* Background gradients */}
        <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(196,30,30,0.07)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-[80px] -left-[100px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(74,124,111,0.06)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-[760px]">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-brick-pale px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brick">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brick" />
            Průvodce přípravou kázání · CČSH
          </div>

          <h1 className="mb-6 font-cormorant text-[clamp(38px,5.5vw,64px)] font-medium leading-[1.1] tracking-tight text-brick">
            „V kázání se zpřítomňuje Kristus."
          </h1>

          <p className="mb-10 max-w-[540px] font-lora text-[17px] italic leading-[1.7] text-text-muted md:text-[19px]">
            Odvážná věta. Ale přesně takhle viděli kázání zakladatelé naší církve.
            Pojď si poslechnout tři hlasy — a pak se pustit do své přípravy
            krok za krokem.
          </p>

          {/* Sunday reading card */}
          <SundayReadingCard />
        </div>
      </section>

      {/* Část I — Tři hlasy */}
      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <FadeUp>
            <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-px before:w-6 before:bg-brick before:content-['']">
              I. Tři hlasy, jeden tón
            </div>
            <h2 className="mb-6 font-cormorant text-[clamp(28px,3.8vw,40px)] font-medium leading-[1.15] text-text">
              Co nám předali
              <br />
              Farský, Kovář, Trtík
            </h2>
            <p className="mb-8 font-lora text-base leading-[1.75] text-text">
              Kázání v Církvi československé husitské nestojí na prázdném místě.
              Zakladatelé promysleli, <em>proč</em> se káže, <em>co</em> se káže
              a <em>jak</em>. Tři krátké pasáže, které stojí za připomenutí,
              než otevřeš text.
            </p>
          </FadeUp>

          <div className="space-y-6">
            {voices.map((voice, index) => (
              <FadeUp key={voice.name} delay={index * 80}>
                <div className="rounded-sm border-l-[3px] border-brick bg-white px-7 pb-6 pt-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:px-9">
                  <div className="mb-3 flex items-center gap-4">
                    <Avatar
                      src={voice.photoSrc}
                      alt={`Portrét ${voice.name}`}
                      initials={voice.initials}
                      size={64}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-cormorant text-2xl font-medium leading-tight text-brick">
                        {voice.name}
                      </div>
                      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-light">
                        {voice.role}
                      </div>
                    </div>
                  </div>
                  <blockquote className="mb-3 font-cormorant text-[21px] italic leading-[1.4] text-text">
                    „{voice.quote}"
                  </blockquote>
                  <div className="mb-5 text-xs tracking-wide text-text-light">
                    {voice.source}
                  </div>
                  <div className="border-t border-border pt-4 font-lora text-[15px] leading-[1.6] text-text-muted">
                    <strong className="font-semibold tracking-wide text-sage">
                      {voice.takeawayLabel}.
                    </strong>{" "}
                    {voice.takeaway}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={280}>
            <p className="mt-12 text-center font-cormorant text-[22px] italic leading-[1.4] text-brick">
              Tři hlasy, jeden tón.
              <br />
              Kázání není tvoje přednáška — je to most,
              <br />
              po kterém Bůh přichází k dnešním lidem.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Část II — Pět účelů */}
      <section className="border-t border-brick/15 bg-cream/40 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <FadeUp>
            <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-px before:w-6 before:bg-brick before:content-['']">
              II. Pět účelů kázání
            </div>
            <h2 className="mb-6 font-cormorant text-[clamp(28px,3.8vw,40px)] font-medium leading-[1.15] text-text">
              K čemu má dnešní kázání vést?
            </h2>
            <p className="mb-8 font-lora text-base leading-[1.75] text-text">
              Teolog <strong>Otto Rutrle</strong>, který položil základy homiletiky
              v CČSH, rozlišuje pět účelů, které kázání může mít. Pomáhá si před
              přípravou říct: <em>Který z nich je dnes ten hlavní?</em>
            </p>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2">
            {ucely.map((ucel, index) => (
              <FadeUp key={ucel.title} delay={index * 60}>
                <div className="h-full rounded-lg border border-sage/25 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-sage hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
                  <div className="mb-2 font-cormorant text-sm italic text-sage">
                    {ucel.roman}
                  </div>
                  <div className="mb-2 font-cormorant text-[22px] font-medium text-brick">
                    {ucel.title}
                    {ucel.subtitle && (
                      <div className="mt-1 text-[11px] font-normal tracking-wide text-text-light">
                        {ucel.subtitle}
                      </div>
                    )}
                  </div>
                  <p className="font-lora text-[15px] leading-[1.6] text-text-muted">
                    {ucel.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={360}>
            <div className="mt-7 rounded-lg bg-sage-pale px-6 py-4 font-lora text-[15px] italic leading-[1.6] text-text-muted">
              <strong className="font-semibold not-italic text-sage">
                Nemusí to být jen jeden.
              </strong>{" "}
              Většina kázání nese víc účelů zároveň. Ale často se vyplatí vědět,
              který je <em>hlavní</em> — a podle toho volit důraz.
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Část III — Místo v liturgii */}
      <section className="border-t border-brick/15 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <FadeUp>
            <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-px before:w-6 before:bg-brick before:content-['']">
              III. Kam v bohoslužbě patří
            </div>
            <h2 className="mb-8 font-cormorant text-[clamp(28px,3.8vw,40px)] font-medium leading-[1.15] text-text">
              Kázání není samo.
              <br />
              Roste z Liturgie.
            </h2>
          </FadeUp>

          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
            <FadeUp>
              <ol className="rounded-lg bg-white p-6">
                {liturgieItems.map((item, index) => (
                  <li
                    key={`${item.label}-${index}`}
                    className={
                      item.highlight
                        ? "relative -mx-3 my-1 flex items-center gap-2.5 rounded-md border-l-[3px] border-brick bg-brick-pale px-3 py-3 font-lora text-base font-semibold text-brick"
                        : "flex items-center gap-2.5 border-b border-dashed border-border py-2 text-[13px] text-text-light last:border-b-0"
                    }
                  >
                    {!item.highlight && (
                      <span className="text-[8px] text-sage-light">●</span>
                    )}
                    {item.label}
                  </li>
                ))}
              </ol>
            </FadeUp>

            <FadeUp delay={120}>
              <div>
                <h3 className="mb-4 font-cormorant text-[26px] font-medium leading-[1.25] text-text">
                  Mezi evangeliem a Krédem
                </h3>
                <p className="mb-3 font-lora text-base leading-[1.7] text-text-muted">
                  V <em>První liturgii podle patriarchy Farského</em> přichází
                  kázání hned po evangeliu — a ještě před vyznáním víry.
                  Není to náhoda.
                </p>
                <p className="mb-5 font-lora text-base leading-[1.7] text-text-muted">
                  Kázání je{" "}
                  <strong className="text-text">
                    zpřítomnění Krista slovem
                  </strong>
                  , které předchází zpřítomnění v eucharistii. Obec slyší Boží slovo,
                  pak ho vyznává jako své — a pak ho žije v obětování a přijímání.
                </p>
                <p className="text-[13px] leading-[1.6] text-text-light">
                  I. řádný sněm CČS(H) v roce 1931 pojmenoval čtyři podstatné
                  úkony bohoslužby.{" "}
                  <strong className="text-text-muted">
                    Čtení z Písem s výkladem
                  </strong>{" "}
                  je první z nich.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4 fáze přípravy */}
      <section className="border-t border-brick/15 bg-off-white px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick">
                Jak na to prakticky
              </div>
              <h2 className="font-cormorant text-[clamp(28px,3.8vw,40px)] font-medium leading-[1.15] text-text">
                4 fáze přípravy
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
                    <p className="text-sm text-text-muted">{phase.subtitle}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-text-light">
                    {`~${phase.estimatedMinutes}\u00A0min`}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-text-light transition-transform group-hover:translate-x-1 group-hover:text-brick"
                  >
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={300}>
            <div className="mt-6 text-center">
              <Link
                href="/pruvodce/ukazka"
                className="text-sm text-text-muted no-underline transition-colors hover:text-brick"
              >
                📝 Ukázkový příklad přípravy
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Zdroj */}
      <section className="border-t border-border px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[760px]">
          <p className="text-center text-[12px] leading-[1.6] text-text-light">
            Texty úvodní části vycházejí z kolektivní monografie{" "}
            <Link
              href="/zdroje"
              className="text-sage no-underline transition-colors hover:text-brick"
            >
              Liguš / Butta / Kolář — Kazatelství v kontextu tradice a přítomnosti
            </Link>{" "}
            (HTF UK Praha, 2014).
          </p>
        </div>
      </section>
    </div>
  );
}
