"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface ChecklistToolHelper {
  itemIndex: number;
  label: string;
  icon: string;
  component: React.ReactNode;
}

interface ChecklistProps {
  slug: string;
  items: string[];
  toolHelpers?: ChecklistToolHelper[];
}

export default function Checklist({ slug, items, toolHelpers = [] }: ChecklistProps) {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    `kazani-checklist-${slug}`,
    new Array(items.length).fill(false)
  );
  const [openToolIndex, setOpenToolIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const completedCount = checked.filter(Boolean).length;

  const reset = () => {
    setChecked(new Array(items.length).fill(false));
  };

  const toggleTool = (itemIndex: number) => {
    setOpenToolIndex((prev) => (prev === itemIndex ? null : itemIndex));
  };

  const getHelper = (index: number) =>
    toolHelpers.find((h) => h.itemIndex === index);

  return (
    <section className="mb-8 rounded-xl border border-border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-lora text-lg font-bold text-text">
          {`Praktick\u00E9 kroky`}
        </h2>
        <span className="text-xs text-text-muted">
          {completedCount}/{items.length} hotovo
        </span>
      </div>
      <ol className="space-y-3">
        {items.map((item, i) => {
          const helper = getHelper(i);
          const isToolOpen = openToolIndex === i;

          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className="flex w-full gap-3 text-left group items-start"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    checked[i]
                      ? "bg-brick text-white"
                      : "bg-brick-pale text-brick group-hover:bg-brick/20"
                  }`}
                >
                  {checked[i] ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7l3 3 5-6" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </span>
                <span
                  className={`text-sm leading-relaxed transition-all duration-200 ${
                    checked[i] ? "text-text-muted line-through" : "text-text"
                  }`}
                >
                  {item}
                </span>
              </button>

              {/* Inline tool helper button */}
              {helper && (
                <div className="ml-9 mt-1.5">
                  <button
                    onClick={() => toggleTool(i)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                      isToolOpen
                        ? "bg-brick/10 text-brick"
                        : "text-text-light hover:bg-brick-pale hover:text-brick"
                    }`}
                  >
                    <span>{helper.icon}</span>
                    <span>{helper.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform ${isToolOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                  </button>

                  {/* Expanded tool */}
                  {isToolOpen && (
                    <div className="mt-2 rounded-xl border border-brick/15 bg-brick-pale p-4">
                      {helper.component}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {completedCount > 0 && (
        <button
          onClick={reset}
          className="mt-4 text-xs text-text-muted transition-colors hover:text-brick"
        >
          Resetovat
        </button>
      )}
    </section>
  );
}
