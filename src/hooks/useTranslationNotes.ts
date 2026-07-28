"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { CategoryId } from "@/data/annotation-categories";

/**
 * A note made while comparing translations.
 *
 * Two kinds, because two different things occur to a preacher there:
 *  - a **mark** — a phrase in one translation caught the eye (`quote` + a
 *    category, same four as in the main text)
 *  - a **verse note** — no quote, because the thought is about the *difference*
 *    between the translations of that verse, not about any one wording
 *
 * These can't live in the main annotation store: that one anchors highlights to
 * character offsets in the pericope text, and a phrase from Kralická is not in
 * that text. They surface in „Můj zápisník" as bubbles all the same.
 */
export interface TranslationNote {
  id: string;
  /** Pericope the note was made in, so next Sunday's text starts clean. */
  reference: string;
  verse: number;
  /** Which column: "csp" | "bkr" | "original". */
  sourceKey: string;
  /** Label as it read at the time — "Kralická", "Hebrejsky (WLC)". */
  sourceLabel: string;
  /** The marked phrase. Absent on a note about the whole verse. */
  quote?: string;
  /** Category of a marked phrase. Absent on a note about the whole verse. */
  category?: CategoryId;
  note: string;
}

const STORAGE_KEY = "kazani-translation-notes";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useTranslationNotes(reference: string) {
  const [all, setAll] = useLocalStorage<TranslationNote[]>(STORAGE_KEY, []);

  /** Only this pericope's notes — what the comparison itself shows. */
  const notes = useMemo(
    () => (Array.isArray(all) ? all.filter((n) => n.reference === reference) : []),
    [all, reference]
  );

  const add = useCallback(
    (note: Omit<TranslationNote, "id">) => {
      setAll((prev) => [...(Array.isArray(prev) ? prev : []), { ...note, id: generateId() }]);
      // The notebook builds its bubbles from localStorage on demand.
      window.dispatchEvent(new CustomEvent("kazani:bubbles-refresh"));
    },
    [setAll]
  );

  /** Write (or rewrite) the note text on an existing mark. */
  const update = useCallback(
    (id: string, note: string) => {
      setAll((prev) =>
        (Array.isArray(prev) ? prev : []).map((n) => (n.id === id ? { ...n, note } : n))
      );
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

  return { notes, add, update, remove };
}
