import { glossary } from "@/data/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slovník pojmů",
  description: "Glosář základních pojmů z hermeneutiky, exegeze a homiletiky.",
};

export default function SlovnikPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, "cs"));

  return (
    <div className="px-6 py-[60px] md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick before:h-0.5 before:w-5 before:rounded-sm before:bg-brick before:content-['']">
          {`Slovn\u00EDk`}
        </div>
        <h1 className="mb-3 font-lora text-[clamp(28px,3.5vw,40px)] font-bold text-text">
          {`Slovn\u00EDk pojm\u016F`}
        </h1>
        <p className="mb-10 text-base font-light leading-[1.85] text-text-muted">
          {`Z\u00E1kladn\u00ED pojmy z\u00A0hermeneutiky, exegeze a\u00A0homiletiky, se kter\u00FDmi se v\u00A0pr\u016Fvodci setk\u00E1te.`}
        </p>

        <div className="space-y-6">
          {sorted.map((item) => (
            <div
              key={item.term}
              id={item.term.toLowerCase().replace(/\s+/g, "-")}
              className="rounded-xl border border-border bg-white p-5 transition-all duration-[250ms] hover:shadow-[0_4px_20px_rgba(196,30,30,0.06)]"
            >
              <h2 className="mb-2 font-lora text-lg font-bold text-text">
                {item.term}
              </h2>
              <p className="text-sm leading-relaxed text-text">
                {item.definition}
              </p>
              {item.related && item.related.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-text-muted">{`Souvis\u00ED:`}</span>
                  {item.related.map((rel) => (
                    <a
                      key={rel}
                      href={`#${rel.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full bg-brick/10 px-2 py-0.5 text-xs font-medium text-brick hover:bg-brick/20"
                    >
                      {rel}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
