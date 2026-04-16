"use client";

import { useMemo } from "react";
import {
  getCurrentEntry,
  getNextSundayEntry,
  getUpcomingSundays,
  getLectionaryYear,
} from "@/lib/lectionary-utils";
import { getCurrentSeason } from "@/data/liturgical-calendar";
import type { LectionaryEntry } from "@/data/lectionary";
import { useCurrentReading, type SundayReading } from "./useCurrentReading";

export interface LectionaryReading {
  /** Lekcionářový záznam (statická data) */
  entry: LectionaryEntry | null;
  /** Liturgický rok */
  year: "A" | "B" | "C";
  /** Liturgické období */
  season: { id: string; name: string; colorHex: string };
  /** Supabase fallback data */
  supabase: SundayReading | null;
  /** Loading state */
  loading: boolean;
  /** Nadcházející neděle */
  upcoming: LectionaryEntry[];
}

/**
 * Hook pro získání aktuálního nedělního čtení.
 *
 * Priorita:
 * 1. Statická data z lekcionáře (offline, okamžitá)
 * 2. Supabase fallback (online, pomalejší)
 */
export function useLectionaryReading(): LectionaryReading {
  const now = new Date();
  const { data: supabaseData, loading: supabaseLoading } = useCurrentReading();

  const result = useMemo(() => {
    const entry = getNextSundayEntry(now);
    const year = getLectionaryYear(now);
    const seasonData = getCurrentSeason(now);
    const upcoming = getUpcomingSundays(now, 6);

    return {
      entry,
      year,
      season: {
        id: seasonData.id,
        name: seasonData.name,
        colorHex: seasonData.colorHex,
      },
      upcoming,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...result,
    supabase: supabaseData,
    loading: supabaseLoading,
  };
}
