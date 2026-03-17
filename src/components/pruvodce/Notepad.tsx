"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface NotepadProps {
  slug: string;
}

export default function Notepad({ slug }: NotepadProps) {
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
        savedIndicatorRef.current = setTimeout(() => setShowSaved(false), 1500);
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

  return (
    <section className="mb-8 rounded-xl border border-brick/20 bg-brick-pale p-6">
      <div className="mb-3 flex items-center justify-between">
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
      <textarea
        value={localValue}
        onChange={handleChange}
        placeholder={`Sem si zapisujte my\u0161lenky, n\u00E1pady a poznatky k tomuto kroku\u2026`}
        className="w-full resize-y rounded-lg border border-border bg-white p-3 text-sm leading-relaxed text-text placeholder:text-text-light/60 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
        rows={5}
      />
    </section>
  );
}
