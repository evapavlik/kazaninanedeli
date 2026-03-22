"use client";

import type { SubStep } from "@/types";

interface SubStepNavProps {
  subSteps: SubStep[];
  activeIndex: number;
  completedIndices: Set<number>;
  onSelect: (index: number) => void;
}

export default function SubStepNav({
  subSteps,
  activeIndex,
  completedIndices,
  onSelect,
}: SubStepNavProps) {
  if (subSteps.length <= 1) return null;

  return (
    <div className="mb-5 flex gap-2">
      {subSteps.map((sub, i) => {
        const isActive = i === activeIndex;
        const isDone = completedIndices.has(i);

        return (
          <button
            key={sub.slug}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "bg-brick text-white shadow-sm"
                : isDone
                  ? "bg-brick-pale text-brick hover:bg-brick/10"
                  : "bg-cream text-text-muted hover:bg-sand/30"
            }`}
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
              isDone
                ? "bg-brick/20 text-brick"
                : isActive
                  ? "bg-white/20 text-white"
                  : "bg-text-light/10 text-text-light/60"
            }`}>
              {isDone ? (
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7l3 3 5-6" />
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </span>
            <span className="hidden sm:inline">{sub.title}</span>
          </button>
        );
      })}
    </div>
  );
}
