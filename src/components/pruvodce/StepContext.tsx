"use client";

import { useState } from "react";

interface StepContextProps {
  theory: {
    concept: string;
    source: string;
    explanation: string;
  };
  tip: string;
  slug: string;
}

export default function StepContext({ theory, tip, slug }: StepContextProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between border-l-3 border-sage px-4 py-3 text-left transition-all hover:bg-sage-pale/80 ${
          open ? "rounded-t-xl bg-sage-pale" : "rounded-xl bg-sage-pale/60"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{"\uD83D\uDCD6"}</span>
          <div>
            {!open && (
              <p className="text-[10px] font-medium text-sage/70">
                {`Teoretick\u00E9 pozad\u00ED`}
              </p>
            )}
            {open && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
                {`Teoretick\u00E9 pozad\u00ED`}
              </p>
            )}
            <p className={`font-lora font-bold text-text ${open ? "text-sm" : "text-[13px]"}`}>
              {theory.concept}
            </p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-sage transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div className="rounded-b-xl border-l-3 border-sage bg-sage-pale/50 px-5 pb-5 pt-3">
          <p className="mb-1 text-xs text-text-muted">{theory.source}</p>
          <p className="text-sm leading-relaxed text-text">
            {theory.explanation}
          </p>

          {/* Tip */}
          <div className="mt-4 border-t border-sage/20 pt-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              Tip
            </p>
            <p className="text-sm font-light leading-relaxed italic text-text-muted">
              {tip}
            </p>

            {/* Translation links for steps cteni and vyklad */}
            {(slug === "cteni" || slug === "vyklad") && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[11px] text-sage">{`Porovnat p\u0159eklady:`}</span>
                <a
                  href="https://www.bibleserver.com/CEP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-sage underline decoration-sage/30 hover:decoration-sage"
                >
                  {`\u010CEP`}
                </a>
                <a
                  href="https://www.bible21.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-sage underline decoration-sage/30 hover:decoration-sage"
                >
                  Bible21
                </a>
                <a
                  href="https://www.bibleserver.com/BKR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-sage underline decoration-sage/30 hover:decoration-sage"
                >
                  {`Kralick\u00E1`}
                </a>
                <a
                  href="https://www.bibleserver.com/B21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-sage underline decoration-sage/30 hover:decoration-sage"
                >
                  BibleServer
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
