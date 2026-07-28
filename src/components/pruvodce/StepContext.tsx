"use client";

import { useState } from "react";

interface StepContextProps {
  theory: {
    concept: string;
    source: string;
    explanation: string;
  };
  tip: string;
  /**
   * Quiet treatment for the guide rail: a hairline row instead of a coloured
   * card. The theory is meant to be *available*, not a gate — as a filled card
   * placed above the tasks it stood between the preacher and the text, while
   * the tip inside it says „Nespěchej na výklad". Colour reads as "do this
   * now", and this is a thing you reach for, not a step you pass through.
   */
  quiet?: boolean;
}

export default function StepContext({ theory, tip, quiet }: StepContextProps) {
  const [open, setOpen] = useState(false);

  if (quiet) {
    return (
      <section className="mb-4">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex w-full items-center gap-2 border-y border-border py-2.5 text-left transition-colors hover:text-sage"
        >
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-sage">
            {`Teoretické pozadí`}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12.5px] text-text-muted">
            {`· ${theory.concept}`}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 text-text-light transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </button>

        {open && (
          <div className="border-l-2 border-sage-pale py-3 pl-3">
            <p className="text-[12.5px] leading-[1.75] text-text-muted">
              {theory.explanation}
            </p>
            <p className="mt-2 text-[11px] text-text-light">{theory.source}</p>
            <p className="mt-3 border-t border-border pt-3 text-[12.5px] font-light italic leading-relaxed text-text-muted">
              {tip}
            </p>
          </div>
        )}
      </section>
    );
  }

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

          </div>
        </div>
      )}
    </section>
  );
}
