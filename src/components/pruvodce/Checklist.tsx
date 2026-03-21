"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FlowItem } from "@/types";

export interface ChecklistToolHelper {
  itemIndex: number;
  label: string;
  icon: string;
  component: React.ReactNode;
}

interface ChecklistProps {
  slug: string;
  items: FlowItem[];
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
  const [reflections, setReflections] = useLocalStorage<Record<number, string>>(
    `kazani-reflect-${slug}`,
    {}
  );
  const [openToolIndex, setOpenToolIndex] = useState<number | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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
    setReflections({});
    setOpenToolIndex(null);
  };

  const toggleTool = (itemIndex: number) => {
    setOpenToolIndex((prev) => (prev === itemIndex ? null : itemIndex));
  };

  const getHelper = (index: number) =>
    toolHelpers.find((h) => h.itemIndex === index);

  // Reflect textarea handler — save text only, no auto-complete
  const handleReflection = useCallback(
    (index: number, value: string) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setReflections((prev) => ({ ...prev, [index]: value }));
      }, 400);
    },
    [setReflections]
  );

  // Explicit "done" for reflect items
  const completeReflect = useCallback(
    (index: number) => {
      setChecked((prev) => prev.map((v, i) => (i === index ? true : v)));
    },
    [setChecked]
  );

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

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
              {`Pr\u016Fvodce krokem`}
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
            {`Pr\u016Fvodce krokem`}
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
                const isReflect = item.type === "reflect";

                return (
                  <li
                    key={i}
                    className={`transition-all duration-300 ${
                      isActive
                        ? `rounded-lg border p-3 ${
                            isReflect
                              ? "border-sage/20 bg-sage-pale/30"
                              : "border-brick/15 bg-brick-pale/40"
                          }`
                        : isFuture
                          ? "opacity-40 px-3 py-1"
                          : "px-3 py-1"
                    }`}
                  >
                    <button
                      onClick={() => !isReflect && toggle(i)}
                      className={`flex w-full gap-3 text-left group items-start ${
                        isReflect && isActive ? "cursor-default" : ""
                      }`}
                      disabled={isFuture || (isReflect && isActive)}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                          isDone
                            ? "bg-brick text-white"
                            : isActive && isReflect
                              ? "bg-sage-pale text-sage ring-2 ring-sage/20"
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
                        ) : isReflect ? (
                          <span className="text-xs">{"\u270F\uFE0F"}</span>
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
                        {item.text}
                      </span>
                    </button>

                    {/* Reflect textarea — visible when active */}
                    {isReflect && isActive && (
                      <div className="ml-9 mt-2">
                        <textarea
                          defaultValue={reflections[i] || ""}
                          onChange={(e) => handleReflection(i, e.target.value)}
                          placeholder={`Va\u0161e odpov\u011B\u010F\u2026`}
                          rows={3}
                          className="w-full rounded-lg border border-sage/20 bg-white px-3 py-2 text-sm leading-relaxed text-text placeholder:text-text-light/50 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30 resize-y"
                        />
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-[10px] text-text-light">
                            {`Ukl\u00E1d\u00E1 se pr\u016Fb\u011B\u017En\u011B`}
                          </p>
                          <button
                            onClick={() => completeReflect(i)}
                            className="rounded-md bg-sage/80 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-sage"
                          >
                            {`Hotovo \u2192`}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Inline tool helper button — only for active check items */}
                    {helper && isActive && !isReflect && (
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
