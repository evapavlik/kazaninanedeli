"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FlowItem } from "@/types";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";

export interface FlowToolHelper {
  itemIndex: number;
  label: string;
  icon: string;
  component?: React.ReactNode;
  /** Instead of inline component, open a tool bubble on the workspace */
  openToolKey?: string;
  openToolNumber?: number;
}

interface UnifiedFlowProps {
  slug: string;
  items: FlowItem[];
  toolHelpers?: FlowToolHelper[];
  onCountChange?: (completed: number, total: number) => void;
  /** Sermon artifacts for connected workflow */
  artifacts?: SermonArtifacts;
  onArtifactChange?: (field: string, value: string) => void;
  /** Open a tool on the workspace */
  onOpenTool?: (key: string) => void;
}

export default function UnifiedFlow({
  slug,
  items,
  toolHelpers = [],
  onCountChange,
  artifacts,
  onOpenTool,
  onArtifactChange,
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
    // Report all items (checks + artifacts) so substeps with only artifacts can complete
    onCountChange?.(completedCount, items.length);
  }, [completedCount, items.length, onCountChange]);

  const [justChecked, setJustChecked] = useState<number | null>(null);

  const toggle = (index: number) => {
    setChecked((prev) => {
      if (!prev[index]) {
        setJustChecked(index);
        setTimeout(() => setJustChecked(null), 650);
      }
      return prev.map((v, i) => (i === index ? !v : v));
    });
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

  const handleArtifact = useCallback(
    (field: string, value: string) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        onArtifactChange?.(field, value);
      }, 400);
    },
    [onArtifactChange]
  );

  const completeReflect = useCallback(
    (index: number) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      setChecked((prev) => prev.map((v, i) => (i === index ? true : v)));
    },
    [setChecked]
  );

  const completeArtifact = useCallback(
    (index: number, field: string, value: string) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      // Save the artifact value immediately
      onArtifactChange?.(field, value);
      setChecked((prev) => prev.map((v, i) => (i === index ? true : v)));
    },
    [setChecked, onArtifactChange]
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

        {/* All items */}
        <ol className="space-y-1.5">
          {items.map((item, i) => {
            const helper = getHelper(i);
            const isToolOpen = openToolIndex === i;
            const isDone = checked[i];
            const isReflect = item.type === "reflect";
            const isArtifact = item.type === "artifact";
            const isInput = isReflect || isArtifact;

            // Get current value for artifact fields
            const artifactField = isArtifact ? (item as { field: string }).field : null;
            const artifactPlaceholder = isArtifact ? (item as { placeholder?: string }).placeholder : null;
            const artifactRows = isArtifact ? (item as { rows?: number }).rows : undefined;
            const artifactContextField = isArtifact ? (item as { contextField?: string }).contextField : null;
            const artifactContextLabel = isArtifact ? (item as { contextLabel?: string }).contextLabel : null;
            const artifactContextValue = artifactContextField && artifacts
              ? (artifacts as unknown as Record<string, string>)[artifactContextField] || ""
              : "";
            const artifactValue = artifactField && artifacts
              ? (artifacts as unknown as Record<string, string>)[artifactField] || ""
              : reflections[i] || "";

            return (
              <li
                key={i}
                className={`rounded-lg transition-all duration-200 ${
                  isDone ? "opacity-60" : ""
                } ${
                  isInput
                    ? isArtifact
                      ? "border border-brick/10 bg-brick-pale/20 p-2.5"
                      : "border border-sage/10 bg-sage-pale/20 p-2.5"
                    : "p-2.5"
                }`}
              >
                {/* Check item */}
                {!isInput && (
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full gap-2.5 text-left group items-start"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors duration-200 ${
                        isDone
                          ? "border-brick bg-brick text-white"
                          : "border-brick/30 bg-white group-hover:border-brick/60"
                      }`}
                      style={justChecked === i ? { animation: 'checkBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1)' } : undefined}
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

                {/* Reflect item (legacy) */}
                {isReflect && (
                  <div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-pale text-sage text-xs">
                        {isDone ? (
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 7l3 3 5-6" />
                          </svg>
                        ) : (
                          <span>{"\u270F\uFE0F"}</span>
                        )}
                      </span>
                      <span className={`text-[13px] leading-relaxed ${isDone ? "text-text-muted" : "text-text"}`}>
                        {item.text}
                      </span>
                    </div>
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
                          <button onClick={() => completeReflect(i)} className="rounded-md bg-sage/70 px-2.5 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-sage">
                            {`Hotovo \u2192`}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Artifact item — connected to sermon artifacts */}
                {isArtifact && artifactContextField && artifactContextValue && (
                  <div className="mb-2 rounded-md bg-cream px-3 py-2 text-[11px]">
                    <span className="font-medium text-text-muted">{artifactContextLabel}:</span>
                    <span className="ml-1 italic text-text">{artifactContextValue}</span>
                  </div>
                )}
                {isArtifact && (
                  <ArtifactInput
                    text={item.text}
                    value={artifactValue}
                    placeholder={artifactPlaceholder || `Va\u0161e odpov\u011B\u010F\u2026`}
                    isDone={isDone}
                    rows={artifactRows}
                    onChange={(value) => {
                      if (artifactField) {
                        handleArtifact(artifactField, value);
                      } else {
                        handleReflection(i, value);
                      }
                    }}
                    onComplete={(value) => {
                      if (artifactField) {
                        completeArtifact(i, artifactField, value);
                      } else {
                        completeReflect(i);
                      }
                    }}
                  />
                )}

                {/* Tool helper — link to workspace bubble or inline expand */}
                {helper && (
                  <div className="ml-7 mt-1.5">
                    {helper.openToolKey ? (
                      <button
                        onClick={() => onOpenTool?.(helper.openToolKey!)}
                        className="flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium text-text-light hover:bg-brick-pale hover:text-brick transition-all"
                      >
                        <span className="text-[13px] leading-none">{helper.icon}</span>
                        <span>{helper.label}</span>
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brick/50">
                          <path d="M5 3l6 5-6 5" />
                        </svg>
                      </button>
                    ) : (
                      <>
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
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isToolOpen ? "rotate-180" : ""}`}>
                            <path d="M4 6l4 4 4-4" />
                          </svg>
                        </button>

                        {isToolOpen && (
                          <div className="mt-2 rounded-lg border border-brick/10 bg-brick-pale/30 p-3">
                            {helper.component}
                          </div>
                        )}
                      </>
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

/** Artifact input field — saves to sermon artifacts store */
function ArtifactInput({
  text,
  value,
  placeholder,
  isDone,
  rows = 2,
  onChange,
  onComplete,
}: {
  text: string;
  value: string;
  placeholder: string;
  isDone: boolean;
  rows?: number;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [settled, setSettled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync when external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  const handleComplete = () => {
    onComplete(localValue);
    setSettled(true);
    setTimeout(() => setSettled(false), 1000);
  };

  return (
    <div style={settled ? { animation: 'artifactSettle 1s ease-out' } : undefined}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brick-pale text-brick text-xs">
          {isDone ? (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7l3 3 5-6" />
            </svg>
          ) : (
            <span>{"\uD83D\uDCDD"}</span>
          )}
        </span>
        <span className={`text-[13px] leading-relaxed font-medium ${isDone ? "text-text-muted" : "text-text"}`}>
          {text}
        </span>
      </div>
      <div className="ml-7 mt-1.5">
        <textarea
          ref={textareaRef}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full rounded-md border border-brick/15 bg-white px-2.5 py-1.5 text-[12px] leading-relaxed text-text placeholder:text-text-light/40 focus:border-brick/30 focus:outline-none focus:ring-1 focus:ring-brick/10 resize-y"
        />
        {!isDone && (
          <div className="mt-1 flex justify-end">
            <button
              onClick={handleComplete}
              disabled={!localValue.trim()}
              className={`rounded-md px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                localValue.trim()
                  ? "bg-brick px-2.5 py-0.5 text-white hover:bg-brick/90"
                  : "bg-border/50 text-text-light cursor-not-allowed"
              }`}
            >
              {`Hotovo \u2192`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
