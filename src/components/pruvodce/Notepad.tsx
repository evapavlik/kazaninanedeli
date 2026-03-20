"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface NotepadProps {
  slug: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onHasContentChange?: (hasContent: boolean) => void;
}

export default function Notepad({
  slug,
  isOpen,
  onToggle,
  onHasContentChange,
}: NotepadProps) {
  const [savedNotes, setSavedNotes] = useLocalStorage<string>(
    `kazani-notes-${slug}`,
    ""
  );
  const [localValue, setLocalValue] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedIndicatorRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync from localStorage on mount / slug change
  useEffect(() => {
    setLocalValue(savedNotes);
  }, [savedNotes]);

  const hasContent = savedNotes.trim().length > 0;

  // Report to parent
  useEffect(() => {
    onHasContentChange?.(hasContent);
  }, [hasContent, onHasContentChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setLocalValue(value);

      // Debounced save
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSavedNotes(value);
        // Show "Saved" indicator
        setShowSaved(true);
        if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
        savedIndicatorRef.current = setTimeout(
          () => setShowSaved(false),
          1500
        );
      }, 300);
    },
    [setSavedNotes]
  );

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
    };
  }, []);

  const controlled = isOpen !== undefined;
  const showContent = controlled ? isOpen : true;

  return (
    <section className="rounded-xl border border-brick/20 bg-brick-pale">
      {/* Accordion header (controlled mode) or static header */}
      {controlled && onToggle ? (
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-brick-pale/80"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{"\uD83D\uDCDD"}</span>
            <h2 className="font-lora text-base font-bold text-text">
              {`Moje z\u00E1pisky`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {hasContent && (
              <span className="text-xs text-brick">{"\u25CF"}</span>
            )}
            <span
              className={`text-xs text-sage transition-opacity duration-300 ${
                showSaved ? "opacity-100" : "opacity-0"
              }`}
            >
              {`\u2713 Ulo\u017Eeno`}
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
        <div className="flex items-center justify-between p-6 pb-3">
          <h2 className="font-lora text-lg font-bold text-text">
            {`Moje z\u00E1pisky`}
          </h2>
          <span
            className={`text-xs text-sage transition-opacity duration-300 ${
              showSaved ? "opacity-100" : "opacity-0"
            }`}
          >
            {`\u2713 Ulo\u017Eeno`}
          </span>
        </div>
      )}

      {/* Content */}
      {showContent && (
        <div className={controlled ? "px-4 pb-4" : "px-6 pb-6"}>
          <textarea
            value={localValue}
            onChange={handleChange}
            placeholder={`Sem si zapisujte my\u0161lenky, n\u00E1pady a poznatky k tomuto kroku\u2026`}
            className="w-full resize-y rounded-lg border border-border bg-white p-3 text-sm leading-relaxed text-text placeholder:text-text-light/60 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
            rows={5}
          />
        </div>
      )}
    </section>
  );
}
