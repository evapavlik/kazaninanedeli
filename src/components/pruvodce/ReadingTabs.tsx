"use client";

import type { ReadingKey } from "@/lib/sunday-storage";
import type { SundayReadingInfo } from "@/hooks/useSunday";

interface ReadingTabsProps {
  readings: SundayReadingInfo[];
  active: ReadingKey;
  onSelect: (key: ReadingKey) => void;
  /** Marks made in each reading — so it is visible which ones have been gone through. */
  counts: Record<ReadingKey, number>;
  loading: ReadingKey | null;
}

/**
 * The Sunday's readings, side by side above the text. The preacher reads them
 * in order and marks words in each; the count on a tab says "I've been here".
 * Switching never loses anything — every reading keeps its own text and marks.
 */
export default function ReadingTabs({ readings, active, onSelect, counts, loading }: ReadingTabsProps) {
  const shown = readings.filter((r) => r.lectionary !== null);
  if (shown.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label="Čtení této neděle"
      className="-mx-5 -mt-5 mb-4 flex border-b border-border bg-off-white lg:-mx-6 lg:-mt-6"
    >
      {shown.map((r) => {
        const isActive = r.key === active;
        const n = counts[r.key];
        return (
          <button
            key={r.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(r.key)}
            className={`relative flex min-w-0 flex-1 flex-col gap-0.5 border-b-2 px-3.5 py-3 text-left transition-colors first:rounded-tl-xl last:rounded-tr-xl ${
              isActive
                ? "border-brick bg-cream"
                : "border-transparent hover:bg-cream/60"
            }`}
          >
            <span
              className={`text-[10.5px] font-bold uppercase tracking-[0.12em] ${
                isActive ? "text-brick" : "text-text-light"
              }`}
            >
              {r.label}
            </span>
            <span className="truncate font-lora text-[13.5px] font-semibold text-text">
              {r.lectionary?.reference}
            </span>
            {loading === r.key ? (
              <span className="absolute right-3 top-3 text-[10px] text-text-light">{`…`}</span>
            ) : n > 0 ? (
              <span
                className="absolute right-3 top-3 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-sage-pale px-1.5 text-[10.5px] font-bold text-sage"
                title={`${n} označení`}
              >
                {n}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
