"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getCategory, type CategoryId } from "@/data/annotation-categories";

interface AnnotationDetailProps {
  annotationId: string;
  selectedText: string;
  category: CategoryId;
  note: string;
  position: { x: number; y: number };
  onUpdateNote: (id: string, note: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export default function AnnotationDetail({
  annotationId,
  selectedText,
  category,
  note,
  position,
  onUpdateNote,
  onRemove,
  onClose,
}: AnnotationDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [localNote, setLocalNote] = useState(note);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cat = getCategory(category);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // Flush pending note
        if (localNote !== note) {
          onUpdateNote(annotationId, localNote);
        }
        onClose();
      }
    },
    [onClose, annotationId, localNote, note, onUpdateNote]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (localNote !== note) {
          onUpdateNote(annotationId, localNote);
        }
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [handleClickOutside, onClose, annotationId, localNote, note, onUpdateNote]);

  const handleNoteChange = (val: string) => {
    setLocalNote(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onUpdateNote(annotationId, val);
    }, 400);
  };

  const style: React.CSSProperties = {
    position: "fixed",
    left: `${Math.min(position.x, window.innerWidth - 280)}px`,
    top: `${Math.max(position.y + 8, 8)}px`,
    zIndex: 50,
  };

  return (
    <div ref={ref} style={style} className="animate-in fade-in zoom-in-95">
      <div className="w-64 rounded-xl border border-border bg-white p-3 shadow-lg">
        {/* Category badge + text */}
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.bg} ${cat.color}`}
          >
            {cat.name}
          </span>
          <span className="truncate font-literata text-sm font-semibold text-text">
            {selectedText}
          </span>
        </div>

        {/* Note textarea */}
        <textarea
          value={localNote}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder={`Pozn\u00E1mka\u2026`}
          rows={2}
          className="mb-2 w-full resize-none rounded-lg border border-border/50 bg-cream/50 p-2 text-xs text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-1 focus:ring-brick/10"
        />

        {/* Delete button */}
        <button
          onClick={() => {
            onRemove(annotationId);
            onClose();
          }}
          className="text-[11px] font-medium text-text-light hover:text-brick"
        >
          {`Smazat anotaci`}
        </button>
      </div>
    </div>
  );
}
