"use client";

import { useState } from "react";

interface BlockItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface BuildingBlocksProps {
  items: BlockItem[];
  /** Annotations keywords from text (separate from artifacts) */
  keywords?: string[];
  /** Hint shown when no items and no keywords */
  emptyHint?: string;
}

/**
 * Summary card showing what user has produced in previous steps.
 * Appears at the top of the workspace as sticky context.
 */
export default function BuildingBlocks({
  items,
  keywords,
  emptyHint,
}: BuildingBlocksProps) {
  const [expanded, setExpanded] = useState(false);
  const hasContent =
    items.length > 0 || (keywords && keywords.length > 0);

  if (!hasContent && !emptyHint) return null;

  // Empty state — gentle hint to go back
  if (!hasContent && emptyHint) {
    return (
      <div className="mb-4 rounded-lg border border-dashed border-sage/30 bg-sage-pale/20 px-4 py-3">
        <p className="flex items-center gap-2 text-[12px] text-text-muted">
          <span>{"\uD83D\uDCA1"}</span>
          <span>{emptyHint}</span>
        </p>
      </div>
    );
  }

  // Compact view: show first highlight item or first item inline
  const highlightItem = items.find((i) => i.highlight) || items[0];
  const otherItems = items.filter((i) => i !== highlightItem);
  const hasMore = otherItems.length > 0 || (keywords && keywords.length > 0);

  return (
    <div className="mb-4 rounded-lg border border-brick/10 bg-brick-pale/30 px-4 py-3">
      {/* Main line — always visible */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px]">{"\uD83D\uDCCC"}</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brick/60">
              {`Z va\u0161\u00ED p\u0159\u00EDpravy`}
            </span>
          </div>
          {highlightItem && (
            <p className={`mt-1 text-[13px] leading-relaxed ${highlightItem.highlight ? "font-medium text-text" : "text-text-muted"}`}>
              <span className="text-[11px] text-text-light">
                {highlightItem.label}:{" "}
              </span>
              {highlightItem.value}
            </p>
          )}
        </div>
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 rounded-md px-2 py-1 text-[10px] font-medium text-brick/60 transition-colors hover:bg-brick/5 hover:text-brick"
          >
            {expanded
              ? `Skr\u00FDt`
              : `+${otherItems.length + (keywords?.length || 0)}`}
          </button>
        )}
      </div>

      {/* Expanded — other items + keywords */}
      {expanded && (
        <div className="mt-2 space-y-1.5 border-t border-brick/10 pt-2">
          {otherItems.map((item, i) => (
            <p key={i} className="text-[12px] leading-relaxed text-text-muted">
              <span className="text-[10px] text-text-light">
                {item.label}:{" "}
              </span>
              {item.value}
            </p>
          ))}
          {keywords && keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-text-light">
                {`Kl\u00ED\u010Dov\u00E1 slova: `}
              </span>
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  className="rounded-full bg-brick/10 px-2 py-0.5 text-[11px] font-medium text-brick"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
