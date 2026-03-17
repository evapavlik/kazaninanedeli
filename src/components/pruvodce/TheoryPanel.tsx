"use client";

import { useState } from "react";

interface TheoryPanelProps {
  theory: {
    concept: string;
    source: string;
    explanation: string;
  };
}

export default function TheoryPanel({ theory }: TheoryPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-white p-4 text-left transition-all hover:border-brick/30"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{"\uD83D\uDCD6"}</span>
          <div>
            <p className="font-lora text-sm font-bold text-text">{`Teoretick\u00E9 pozad\u00ED`}</p>
            <p className="text-xs text-text-muted">{theory.concept}</p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-border bg-white p-6">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brick">
            {theory.concept}
          </p>
          <p className="mb-3 text-xs text-text-muted">{theory.source}</p>
          <p className="text-sm leading-relaxed text-text">{theory.explanation}</p>
        </div>
      )}
    </section>
  );
}
