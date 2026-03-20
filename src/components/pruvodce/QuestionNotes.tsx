"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface QuestionNotesProps {
  slug: string;
  questions: string[];
  isOpen?: boolean;
  onToggle?: () => void;
  onCountChange?: (answered: number, total: number) => void;
}

export default function QuestionNotes({
  slug,
  questions,
  isOpen,
  onToggle,
  onCountChange,
}: QuestionNotesProps) {
  const [savedAnswers, setSavedAnswers] = useLocalStorage<string[]>(
    `kazani-question-notes-${slug}`,
    new Array(questions.length).fill("")
  );
  const [localAnswers, setLocalAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync from localStorage on mount
  useEffect(() => {
    setLocalAnswers(savedAnswers);
  }, [savedAnswers]);

  const answeredCount = savedAnswers.filter((a) => a.trim().length > 0).length;

  // Report counts to parent
  useEffect(() => {
    onCountChange?.(answeredCount, questions.length);
  }, [answeredCount, questions.length, onCountChange]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      setLocalAnswers((prev) => {
        const updated = [...prev];
        updated[index] = value;

        // Debounced save
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setSavedAnswers(updated);
        }, 300);

        return updated;
      });
    },
    [setSavedAnswers]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const controlled = isOpen !== undefined;
  const showContent = controlled ? isOpen : true;

  return (
    <section className="rounded-xl border border-sage/20 bg-sage-pale">
      {/* Accordion header (controlled mode) or static header */}
      {controlled && onToggle ? (
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-sage-pale/80"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{"\u2753"}</span>
            <h2 className="font-lora text-base font-bold text-text">
              {`Ot\u00E1zky k zamy\u0161len\u00ED`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              {answeredCount}/{questions.length}
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
        <div className="p-6 pb-4">
          <h2 className="font-lora text-lg font-bold text-text">
            {`Ot\u00E1zky k zamy\u0161len\u00ED`}
          </h2>
        </div>
      )}

      {/* Content */}
      {showContent && (
        <div className={controlled ? "px-4 pb-4" : "px-6 pb-6"}>
          <div className="space-y-5">
            {questions.map((q, i) => (
              <div key={i}>
                <div className="mb-2 flex gap-3 text-sm leading-relaxed">
                  <span className="shrink-0 font-bold text-sage">?</span>
                  <span className="text-text">{q}</span>
                </div>
                <div className="ml-6">
                  <textarea
                    value={localAnswers[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    placeholder={`Va\u0161e odpov\u011B\u010F\u2026`}
                    className="w-full resize-none rounded-lg border border-border/70 bg-white/80 p-2.5 text-sm leading-relaxed text-text placeholder:text-text-light/50 focus:border-sage/40 focus:outline-none focus:ring-2 focus:ring-sage/10"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
