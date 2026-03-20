"use client";

import { useState, useEffect } from "react";
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
  isOpen?: boolean;
  onToggle?: () => void;
  onCountChange?: (completed: number, total: number) => void;
}

export default function Checklist({
  slug,
  items,
  toolHelpers = [],
  isOpen,
  onToggle,
  onCountChange,
}: ChecklistProps) {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    `kazani-checklist-${slug}`,
    new Array(items.length).fill(false)
  );
  const [openToolIndex, setOpenToolIndex] = useState<number | null>(null);

  // Wizard: find the first unchecked item as the active step
  const activeStepIndex = checked.findIndex((v) => !v);
  const allDone = activeStepIndex === -1;

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const completedCount = checked.filter(Boolean).length;

  // Report counts to parent
  useEffect(() => {
    onCountChange?.(completedCount, items.length);
  }, [completedCount, items.length, onCountChange]);

  const reset = () => {
    setChecked(new Array(items.length).fill(false));
    setOpenToolIndex(null);
  };

  const toggleTool = (itemIndex: number) => {
    setOpenToolIndex((prev) => (prev === itemIndex ? null : itemIndex));
  };

  const getHelper = (index: number) =>
    toolHelpers.find((h) => h.itemIndex === index);

  const controlled = isOpen !== undefined;
  const showContent = controlled ? isOpen : true;

  return (
    <section className="rounded-xl border border-border bg-white">
      {/* Accordion header (controlled mode) or static header */}
      {controlled && onToggle ? (
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-cream/50"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{"\u2611\uFE0F"}</span>
            <h2 className="font-lora text-base font-bold text-text">
              {`Praktick\u00E9 kroky`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              {completedCount}/{items.length}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-text-light transition-transform duration-200 ${showContent ? "rotate-180" : ""}`}
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </div>
        </button>
      ) : (
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-lora text-lg font-bold text-text">
            {`Praktick\u00E9 kroky`}
          </h2>
          <span className="text-xs text-text-muted">
            {completedCount}/{items.length} hotovo
          </span>
        </div>
      )}

      {/* Content */}
      {showContent && (
        <div className={controlled ? "px-4 pb-4" : "px-6 pb-6"}>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex gap-1">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    checked[i]
                      ? "bg-brick"
                      : i === activeStepIndex
                        ? "bg-brick/30"
                        : "bg-border/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All done state */}
          {allDone ? (
            <div className="rounded-lg border border-sage/20 bg-sage-pale/50 px-4 py-5 text-center">
              <p className="mb-1 text-lg">{"\u2705"}</p>
              <p className="text-sm font-semibold text-text">
                {`V\u0161echny kroky hotovy!`}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {`M\u016F\u017Eete pokra\u010Dovat d\u00E1l nebo se vr\u00E1tit k jednotliv\u00FDm krok\u016Fm.`}
              </p>
              <button
                onClick={reset}
                className="mt-3 text-xs text-text-muted underline decoration-text-light/30 transition-colors hover:text-brick hover:decoration-brick/30"
              >
                {`Za\u010D\u00EDt znovu`}
              </button>
            </div>
          ) : (
            <ol className="space-y-2">
              {items.map((item, i) => {
                const helper = getHelper(i);
                const isToolOpen = openToolIndex === i;
                const isActive = i === activeStepIndex;
                const isDone = checked[i];
                const isFuture = !isDone && !isActive;

                return (
                  <li
                    key={i}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "rounded-lg border border-brick/15 bg-brick-pale/40 p-3"
                        : isFuture
                          ? "opacity-40 px-3 py-1"
                          : "px-3 py-1"
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="flex w-full gap-3 text-left group items-start"
                      disabled={isFuture}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                          isDone
                            ? "bg-brick text-white"
                            : isActive
                              ? "bg-brick-pale text-brick ring-2 ring-brick/20"
                              : "bg-brick-pale text-brick/50"
                        }`}
                      >
                        {isDone ? (
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
                          isDone
                            ? "text-text-muted line-through"
                            : isActive
                              ? "text-text font-medium"
                              : "text-text-light"
                        }`}
                      >
                        {item}
                      </span>
                    </button>

                    {/* Inline tool helper button — only for active step */}
                    {helper && isActive && (
                      <div className="ml-9 mt-2">
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
          )}

          {/* Reset button when partially done (not all done) */}
          {completedCount > 0 && !allDone && (
            <button
              onClick={reset}
              className="mt-4 text-xs text-text-muted transition-colors hover:text-brick"
            >
              Resetovat
            </button>
          )}
        </div>
      )}
    </section>
  );
}
