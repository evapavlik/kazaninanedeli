"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * What the companion said and the preacher chose to keep. Nothing lands here
 * on its own — every entry is an explicit „Uložit do zápisníku".
 */
export interface AiNote {
  id: string;
  kind: "term" | "mirror";
  /** Pericope the note belongs to; the mirror belongs to the Sunday, so "" there. */
  reference: string;
  /** e.g. "Evangelium" — which reading the term was asked in. */
  readingLabel?: string;
  /** The word or phrase asked about (term only). */
  term?: string;
  text: string;
  createdAt: string;
}

export const AI_NOTES_KEY = "kazani-ai-notes";

export function useAiNotes() {
  const [all, setAll] = useLocalStorage<AiNote[]>(AI_NOTES_KEY, []);
  const notes = useMemo(() => (Array.isArray(all) ? all : []), [all]);

  const add = useCallback(
    (note: Omit<AiNote, "id" | "createdAt">) => {
      setAll((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { ...note, id: Math.random().toString(36).slice(2, 9), createdAt: new Date().toISOString() },
      ]);
      window.dispatchEvent(new CustomEvent("kazani:bubbles-refresh"));
    },
    [setAll]
  );

  const remove = useCallback(
    (id: string) => {
      setAll((prev) => (Array.isArray(prev) ? prev.filter((n) => n.id !== id) : []));
      window.dispatchEvent(new CustomEvent("kazani:bubbles-refresh"));
    },
    [setAll]
  );

  return { notes, add, remove };
}
