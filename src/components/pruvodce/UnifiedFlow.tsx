"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FlowItem } from "@/types";

export interface FlowToolHelper {
  itemIndex: number;
  label: string;
  icon: string;
  component: React.ReactNode;
}

interface UnifiedFlowProps {
  slug: string;
  items: FlowItem[];
  toolHelpers?: FlowToolHelper[];
  onCountChange?: (completed: number, total: number) => void;
}

export default function UnifiedFlow({
  slug,
  items,
  toolHelpers = [],
  onCountChange,
}: UnifiedFlowProps) {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    `kazani-flow-${slug}`,
    new Array(items.length).fill(false)
  );
  const [reflections, setReflections] = useLocalStorage<Record<number, string>>(
    `kazani-flow-reflect-${slug}`,
    {}
  );
  const [openToolIndex, setOpenToolIndex] = useState<number | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const completedCount = checked.filter(Boolean).length;
  const checkCount = items.filter((item) => item.type === "check").length;
  const checkedCheckCount = items.filter(
    (item, i) => item.type === "check" && checked[i]
  ).length;

  useEffect(() => {
    onCountChange?.(checkedCheckCount, checkCount);
  }, [checkedCheckCount, checkCount, onCountChange]);

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const handleReflection = useCallback(
    (index: number, value: string) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setReflections((prev) => ({ ...prev, [index]: value }));
      }, 400);
    },
    [setReflections]
  );

  const completeReflect = useCallback(
    (index: number) => {
      // Flush any pending save
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      setChecked((prev) => prev.map((v, i) => (i === index ? true : v)));
    },
    [setChecked]
  );

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const getHelper = (index: number) =>
    toolHelpers.find((h) => h.itemIndex === index);

  if (items.length === 0) return null;

  return (
    <section className="rounded-xl border border-border bg-white">
      <div className="px-4 py-3">
        {/* Subtle progress bar */}
        <div className="mb-3 flex gap-0.5">
          {items.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                checked[i] ? "bg-brick" : "bg-border/40"
              }`}
            />
          ))}
        </div>

        {/* All items — visible, scrollable */}
        <ol className="space-y-1.5">
          {items.map((item, i) => {
            const helper = getHelper(i);
            const isToolOpen = openToolIndex === i;
            const isDone = checked[i];
            const isReflect = item.type === "reflect";

            return (
              <li
                key={i}
                className={`rounded-lg transition-all duration-200 ${
                  isDone ? "opacity-60" : ""
                } ${
                  isReflect
                    ? "border border-sage/10 bg-sage-pale/20 p-2.5"
                    : "p-2.5"
                }`}
              >
                {/* Check item */}
                {!isReflect && (
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full gap-2.5 text-left group items-start"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
                        isDone
                          ? "border-brick bg-brick text-white"
                          : "border-brick/30 bg-white group-hover:border-brick/60"
                      }`}
                    >
                      {isDone && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 7l3 3 5-6" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-[13px] leading-relaxed transition-all duration-200 ${
                        isDone
                          ? "text-text-muted line-through"
                          : "text-text"
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                )}

                {/* Reflect item */}
                {isReflect && (
                  <div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-pale text-sage text-xs">
                        {isDone ? (
                          <svg
                            width="12"
                            height="12"
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
                          <span>{"\u270F\uFE0F"}</span>
                        )}
                      </span>
                      <span
                        className={`text-[13px] leading-relaxed ${
                          isDone ? "text-text-muted" : "text-text"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                    {/* Textarea — always visible for reflect items */}
                    <div className="ml-7 mt-1.5">
                      <textarea
                        defaultValue={reflections[i] || ""}
                        onChange={(e) => handleReflection(i, e.target.value)}
                        placeholder={`Va\u0161e odpov\u011B\u010F\u2026`}
                        rows={2}
                        className="w-full rounded-md border border-sage/15 bg-white px-2.5 py-1.5 text-[12px] leading-relaxed text-text placeholder:text-text-light/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/20 resize-y"
                      />
                      {!isDone && (
                        <div className="mt-1 flex justify-end">
                          <button
                            onClick={() => completeReflect(i)}
                            className="rounded-md bg-sage/70 px-2.5 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-sage"
                          >
                            {`Hotovo \u2192`}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tool helper — for check items with tools */}
                {helper && !isReflect && (
                  <div className="ml-7 mt-1.5">
                    <button
                      onClick={() => setOpenToolIndex(isToolOpen ? null : i)}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                        isToolOpen
                          ? "bg-brick/10 text-brick"
                          : "text-text-light hover:bg-brick-pale hover:text-brick"
                      }`}
                    >
                      <span>{helper.icon}</span>
                      <span>{helper.label}</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform ${isToolOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </button>

                    {isToolOpen && (
                      <div className="mt-2 rounded-lg border border-brick/10 bg-brick-pale/30 p-3">
                        {helper.component}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
