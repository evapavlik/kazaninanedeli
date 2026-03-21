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

  useEffect(() => {
    onCountChange?.(completedCount, items.length);
  }, [completedCount, items.length, onCountChange]);

  const getHelper = (index: number) =>
    toolHelpers.find((h) => h.itemIndex === index);

  if (items.length === 0) return null;

  return (
    <div className="mb-4 rounded-lg border border-brick/10 bg-brick-pale/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brick/70">
          {`\u00DAkoly`}
        </p>
        <span className="text-[10px] text-text-light">
          {completedCount}/{items.length}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => {
          const helper = getHelper(i);

          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className="flex w-full gap-2.5 text-left group items-start"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded transition-all duration-200 ${
                    checked[i]
                      ? "bg-brick text-white"
                      : "border border-brick/30 bg-white text-transparent group-hover:border-brick/50"
                  }`}
                >
                  {checked[i] && (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7l3 3 5-6" />
                    </svg>
                  )}
                </span>
                <span
                  className={`text-[13px] leading-relaxed transition-all duration-200 ${
                    checked[i]
                      ? "text-text-muted line-through"
                      : "text-text"
                  }`}
                >
                  {item.text}
                </span>
              </button>

              {/* Tool helper — opens in right panel */}
              {helper && (
                <div className="ml-7 mt-1">
                  <button
                    onClick={() => onToolOpen?.(i)}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                      activeToolIndex === i
                        ? "bg-brick/10 text-brick"
                        : "text-text-light hover:bg-brick-pale hover:text-brick"
                    }`}
                  >
                    <span>{helper.icon}</span>
                    <span>{helper.label}</span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
