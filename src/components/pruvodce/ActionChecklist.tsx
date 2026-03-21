"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FlowItem } from "@/types";

export interface ActionToolHelper {
  itemIndex: number;
  label: string;
  icon: string;
  component: React.ReactNode;
}

interface ActionChecklistProps {
  slug: string;
  items: FlowItem[];
  toolHelpers?: ActionToolHelper[];
  onCountChange?: (completed: number, total: number) => void;
  onToolOpen?: (itemIndex: number) => void;
  activeToolIndex?: number | null;
}

export default function ActionChecklist({
  slug,
  items,
  toolHelpers = [],
  onCountChange,
  onToolOpen,
  activeToolIndex,
}: ActionChecklistProps) {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    `kazani-actions-${slug}`,
    new Array(items.length).fill(false)
  );

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const completedCount = checked.filter(Boolean).length;
  const activeIndex = checked.findIndex((v) => !v);
  const allDone = activeIndex === -1;

  useEffect(() => {
    onCountChange?.(completedCount, items.length);
  }, [completedCount, items.length, onCountChange]);

  const getHelper = (index: number) =>
    toolHelpers.find((h) => h.itemIndex === index);

  if (items.length === 0) return null;

  return (
    <div className="mb-4 rounded-lg border border-brick/10 bg-brick-pale/30 p-3">
      {/* Progress bar */}
      <div className="mb-3 flex gap-0.5">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              checked[i]
                ? "bg-brick"
                : i === activeIndex
                  ? "bg-brick/30"
                  : "bg-border/40"
            }`}
          />
        ))}
      </div>

      {allDone ? (
        /* All done */
        <div className="rounded-md bg-sage-pale/50 px-3 py-2 text-center">
          <p className="text-xs font-medium text-sage">
            {`\u2705 V\u0161echny \u00FAkoly hotovy`}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {/* Completed items — minimal dots */}
          {completedCount > 0 && (
            <div className="flex items-center gap-1 px-1 mb-1">
              {checked.map((done, i) =>
                done ? (
                  <span key={i} className="h-2 w-2 rounded-full bg-brick" />
                ) : null
              )}
            </div>
          )}

          {/* Active item — prominent */}
          {activeIndex !== -1 && (
            <div className="rounded-lg border border-brick/15 bg-white p-3">
              <button
                onClick={() => toggle(activeIndex)}
                className="flex w-full gap-2.5 text-left group items-start"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-brick/40 bg-white text-transparent transition-all group-hover:border-brick">
                </span>
                <span className="text-[13px] font-medium leading-relaxed text-text">
                  {items[activeIndex].text}
                </span>
              </button>

              {/* Tool helper for active item */}
              {getHelper(activeIndex) && (
                <div className="ml-7 mt-2">
                  <button
                    onClick={() => onToolOpen?.(activeIndex)}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                      activeToolIndex === activeIndex
                        ? "bg-brick/10 text-brick"
                        : "text-text-light hover:bg-brick-pale hover:text-brick"
                    }`}
                  >
                    <span>{getHelper(activeIndex)!.icon}</span>
                    <span>{getHelper(activeIndex)!.label}</span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
