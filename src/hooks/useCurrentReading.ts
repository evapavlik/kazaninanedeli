"use client";

import { useEffect, useState } from "react";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { extractReadingsFromMarkdown } from "@/lib/bible-refs";

export interface SundayReading {
  sundayTitle: string;
  sundayDate: string | null;
  readings: {
    type: "first" | "second" | "gospel";
    label: string;
    reference: string;
    text: string;
  }[];
  markdown: string;
}

export function useCurrentReading() {
  const [data, setData] = useState<SundayReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchReading() {
      if (!supabaseEnabled) {
        setLoading(false);
        return;
      }
      try {
        const { data: rows, error: err } = await supabase
          .from("readings_cache")
          .select("sunday_title, sunday_date, markdown_content")
          .order("scraped_at", { ascending: false })
          .limit(1);

        if (cancelled) return;

        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }

        if (!rows || rows.length === 0) {
          setError("Nenalezeno aktu\u00E1ln\u00ED \u010Dten\u00ED");
          setLoading(false);
          return;
        }

        const row = rows[0];
        const readings = extractReadingsFromMarkdown(row.markdown_content);

        setData({
          sundayTitle: row.sunday_title,
          sundayDate: row.sunday_date,
          readings,
          markdown: row.markdown_content,
        });
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Chyba p\u0159i na\u010D\u00EDt\u00E1n\u00ED");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchReading();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
