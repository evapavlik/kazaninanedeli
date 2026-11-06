"use client";

import { useState, type ReactNode } from "react";
import type { Phase, SubStep } from "@/types";

interface GuideChipProps {
  phase: Phase;
  currentSub: SubStep;
  activeSubStep: number;
  checkCount: { completed: number; total: number };
  /** The full rail, rendered inside the chip's panel when it is open. */
  children: ReactNode;
}

/**
 * The guide, folded into one line above the text.
 *
 * A 330px rail beside the scripture makes the loudest thing on screen the
 * thing that should lead least. Here the guide says where you are and gets
 * out of the way; everything it held is one click down, unchanged.
 */
export default function GuideChip({
  phase,
  currentSub,
  activeSubStep,
  checkCount,
  children,
}: GuideChipProps) {
  const [open, setOpen] = useState(false);
  const total = phase.subSteps.length;

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white py-1.5 pl-3 pr-3.5 text-[13px] font-medium text-text-muted transition-colors hover:border-border-strong"
      >
        <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-brick" />
        <span className="font-semibold text-text">
          {currentSub.shortTitle || currentSub.title}
        </span>
        <span className="text-text-light">
          {`${activeSubStep + 1} ze ${total}`}
          {checkCount.total > 0 && ` · ${checkCount.completed}/${checkCount.total}`}
        </span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`text-text-light transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 rounded-2xl border border-border bg-white p-4">
          {children}
        </div>
      )}
    </div>
  );
}
