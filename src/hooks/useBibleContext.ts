"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type BibleTranslation,
  type BibleChapter,
  parseReferenceForApi,
  fetchContext,
} from "@/lib/getbible";

interface BibleContextData {
  prev: BibleChapter | null;
  current: BibleChapter | null;
  next: BibleChapter | null;
  bookNumber: number;
  chapter: number;
  verseStart: number | null;
  verseEnd: number | null;
}

interface UseBibleContextReturn {
  data: BibleContextData | null;
  loading: boolean;
  error: string | null;
  translation: BibleTranslation;
  setTranslation: (t: BibleTranslation) => void;
  refetch: () => void;
}

/**
 * Hook to fetch surrounding Bible context for a given reference.
 * Fetches prev chapter + current chapter + next chapter from getBible.net.
 */
export function useBibleContext(reference: string): UseBibleContextReturn {
  const [data, setData] = useState<BibleContextData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translation, setTranslation] = useState<BibleTranslation>("cep");

  const doFetch = useCallback(async () => {
    const parsed = parseReferenceForApi(reference);
    if (!parsed) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const context = await fetchContext(
        parsed.bookNumber,
        parsed.chapter,
        translation
      );

      setData({
        ...context,
        bookNumber: parsed.bookNumber,
        chapter: parsed.chapter,
        verseStart: parsed.verseStart,
        verseEnd: parsed.verseEnd,
      });
    } catch {
      setError("Nepoda\u0159ilo se na\u010D\u00EDst kontext z Bible API.");
    } finally {
      setLoading(false);
    }
  }, [reference, translation]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return {
    data,
    loading,
    error,
    translation,
    setTranslation,
    refetch: doFetch,
  };
}
