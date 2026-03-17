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
}

export default function SelectionPopup({
  position,
  onSelect,
  onClose,
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
  const style: React.CSSProperties = {
    position: "fixed",
    left: `${Math.min(position.x, window.innerWidth - 220)}px`,
    top: `${Math.max(position.y - 48, 8)}px`,
    zIndex: 50,
  };

  return (
    <div ref={ref} style={style} className="animate-in fade-in zoom-in-95">
      <div className="flex items-center gap-1 rounded-xl border border-border bg-white px-2 py-1.5 shadow-lg">
        {annotationCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all hover:scale-105 ${cat.bg} ${cat.color}`}
            title={cat.name}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
