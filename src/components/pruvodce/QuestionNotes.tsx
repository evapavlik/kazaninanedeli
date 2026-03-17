"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface QuestionNotesProps {
  slug: string;
  questions: string[];
}

export default function QuestionNotes({ slug, questions }: QuestionNotesProps) {
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

  return (
    <section className="mb-8 rounded-xl border border-sage/20 bg-sage-pale p-6">
      <h2 className="mb-4 font-lora text-lg font-bold text-text">
        {`Ot\u00E1zky k zamy\u0161len\u00ED`}
      </h2>
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
    </section>
  );
}
