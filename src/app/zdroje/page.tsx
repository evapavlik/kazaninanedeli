import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zdroje",
  description: "Doporučená literatura a odkazy pro přípravu kázání.",
};

interface Resource {
  title: string;
  author: string;
  description: string;
  type: "kniha" | "web" | "clanek";
}

const resources: Resource[] = [
  {
    title: "Hermeneutika jako teorie porozumění",
    author: "Petr Pokorný",
    description:
      "Základní dílo o hermeneutice v českém jazyce. Teoretický základ tohoto průvodce — od principů porozumění přes metody interpretace po praktický výklad.",
    type: "kniha",
  },
  {
    title: "Biblical Preaching",
    author: "Haddon W. Robinson",
    description:
      "Klasická učebnice přípravy expozičního kázání. 10 fází od biblického textu ke kázání.",
    type: "kniha",
  },
  {
    title: "Preparing Expository Sermons",
    author: "Ramesh Richard",
    description:
      "Praktický průvodce 7 kroky přípravy kázání — od studia textu po přednes.",
    type: "kniha",
  },
  {
    title: "Christ-Centered Preaching",
    author: "Bryan Chapell",
    description:
      "Přístup ke kázání, který zdůrazňuje kristocentrickou perspektivu a koncept FCF (Fallen Condition Focus).",
    type: "kniha",
  },
  {
    title: "Úvod do Nového zákona",
    author: "Petr Pokorný, Ulrich Heckel",
    description:
      "Přehledné uvedení do novozákonních knih — užitečné pro pochopení kontextu jednotlivých textů.",
    type: "kniha",
  },
  {
    title: "Výklad Markova evangelia",
    author: "Petr Pokorný",
    description:
      "Příklad důkladné exegeze jednotlivé biblické knihy — inspirace pro vlastní práci s textem.",
    type: "kniha",
  },
];

const typeLabels: Record<Resource["type"], string> = {
  kniha: "Kniha",
  web: "Web",
  clanek: "Článek",
};

const typeColors: Record<Resource["type"], string> = {
  kniha: "bg-sage-pale text-sage",
  web: "bg-brick-pale text-brick",
  clanek: "bg-cream text-text-muted",
};

export default function ZdrojePage() {
  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
          {`Zdroje`}
        </div>
        <h1 className="mb-3 font-lora text-[clamp(28px,3.5vw,40px)] font-bold text-text">
          {`Zdroje`}
        </h1>
        <p className="mb-10 text-base font-light leading-[1.85] text-text-muted">
          {`Doporu\u010Den\u00E1 literatura pro ty, kdo se cht\u011Bj\u00ED do p\u0159\u00EDpravy k\u00E1z\u00E1n\u00ED pono\u0159it hloub\u011Bji.`}
        </p>

        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="rounded-xl border border-border bg-white p-5 transition-all duration-[250ms] hover:shadow-[0_4px_20px_rgba(196,30,30,0.06)]"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-lora font-bold text-text">{resource.title}</h2>
                  <p className="text-sm text-sage">{resource.author}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[resource.type]}`}
                >
                  {typeLabels[resource.type]}
                </span>
              </div>
              <p className="text-sm font-light leading-[1.8] text-text-muted">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
