"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  annotationCategories,
  type CategoryId,
} from "@/data/annotation-categories";

interface SelectionPopupProps {
  position: { x: number; y: number };
  onSelect: (category: CategoryId) => void;
  onClose: () => void;
  /**
   * „Co to znamená?" — ask the companion about the selection. Kept on its own
   * row, apart from the categories: „Otázka" (a mark) and „Co to znamená?"
   * (a question) read alike and do the opposite — one saves at once, the
   * other only answers.
   */
  onAsk?: () => void;
}

export default function SelectionPopup({
  position,
  onSelect,
  onClose,
  onAsk,
}: SelectionPopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, onClose]);

  // Keep popup within viewport
  const width = onAsk ? 400 : 220;
  const style: React.CSSProperties = {
    position: "fixed",
    left: `${Math.max(8, Math.min(position.x, window.innerWidth - width))}px`,
    top: `${Math.max(position.y - (onAsk ? 86 : 48), 8)}px`,
    zIndex: 50,
  };

  return (
    <div ref={ref} style={style} className="animate-in fade-in zoom-in-95">
      <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-white px-2 py-1.5 shadow-lg">
        <div className="flex items-center gap-1">
          {onAsk && (
            <span className="w-[52px] shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-text-light">
              {`Označit`}
            </span>
          )}
          {annotationCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-all hover:scale-105 ${cat.bg} ${cat.color}`}
              title={cat.name}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {onAsk && (
          <div className="flex items-center gap-1 border-t border-border pt-1.5">
            <span className="w-[52px] shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-text-light">
              {`Zeptat se`}
            </span>
            <button
              onClick={onAsk}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-sage px-2.5 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-sage-light"
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="8" cy="8" r="6" />
                <path d="M6.2 6.2a1.8 1.8 0 1 1 2.6 1.6c-.6.3-.8.6-.8 1.2M8 11.4v.1" />
              </svg>
              {`Co to znamená?`}
            </button>
            <span className="ml-1 text-[12px] text-text-light">{`odpoví, neuloží`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
