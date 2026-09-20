"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  getCurrentEntry,
  getNextSundayEntry,
  getPreparationSunday,
} from "@/lib/lectionary-utils";
import { LECTIONARY, type LectionaryEntry, type LectionaryReading } from "@/data/lectionary";
import { parseReferenceForApi } from "@/lib/getbible";
import {
  ACTIVE_READING_KEY,
  READING_KEYS,
  SUNDAY_KEY,
  archiveCurrent,
  clearWorking,
  hasWork,
  migrateLegacyText,
  readArchive,
  readingSlotKey,
  restoreWorking,
  summarizeWorking,
  writeArchive,
  type ArchivedSunday,
  type ReadingKey,
  type ReadingSlot,
  type SundayMeta,
  type SundaySummary,
} from "@/lib/sunday-storage";

const SEEN_KEY = "kazani-sunday-seen";

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "27. září" — for banners and the archive list. */
export function formatCzechDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"];
  return `${d}. ${months[(m ?? 1) - 1]}${y ? ` ${y}` : ""}`;
}

export interface SundayReadingInfo {
  key: ReadingKey;
  label: string;
  lectionary: LectionaryReading | null;
}

/**
 * The Sunday being prepared: which one it is, its three readings, and the
 * lifecycle around it — noticing when the stored one is stale, starting a new
 * one (keeping or discarding the old), and the archive of past Sundays.
 */
export function useSunday() {
  const [meta, setMeta] = useLocalStorage<SundayMeta | null>(SUNDAY_KEY, null);
  const [seen, setSeen] = useLocalStorage<string>(SEEN_KEY, "");
  const [activeReading, setActiveReading] = useLocalStorage<ReadingKey>(ACTIVE_READING_KEY, "gospel");
  const [archive, setArchive] = useState<ArchivedSunday[]>([]);
  const [work, setWork] = useState(false);

  // The Sunday the calendar says we should be preparing for.
  const target = useMemo<SundayMeta | null>(() => {
    const now = new Date();
    const entry = getNextSundayEntry(now);
    if (!entry) return null;
    return { id: isoDate(getPreparationSunday(now)), sundayId: entry.sundayId, name: entry.sundayName };
  }, []);

  // Read the client-only bits after mount (no localStorage during SSR).
  useEffect(() => {
    setArchive(readArchive());
    setWork(hasWork());
    const onChange = () => {
      setArchive(readArchive());
      setWork(hasWork());
    };
    window.addEventListener("kazani:local-storage", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("kazani:local-storage", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  // First run on a browser that still has the single-text state: move it into
  // the reading slots, and adopt the calendar Sunday as ours if nothing is set.
  useEffect(() => {
    if (!target) return;
    const entryForTarget = getCurrentEntry(new Date(target.id));
    const currentRef = safeString(localStorage.getItem("kazani-bible-ref"));
    const guess = guessReadingKey(currentRef, entryForTarget) ?? "gospel";
    migrateLegacyText(guess);
    if (meta) return;
    if (!hasWork()) {
      setMeta(target);
      return;
    }
    // Work from before Sundays were tracked: name it from the text on the
    // desk. A pericope belongs to one Sunday of the cycle, and that Sunday
    // fell on one date in the last year — so „rozpracovaná příprava z
    // dřívějška" can usually say which Sunday, and when.
    const inferred = inferSundayFromReference(currentRef, new Date(target.id));
    if (inferred) setMeta(inferred);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  // The lectionary entry of *our* Sunday (may differ from the calendar target).
  const entry: LectionaryEntry | null = useMemo(() => {
    if (meta) return getCurrentEntry(new Date(meta.id));
    return target ? getCurrentEntry(new Date(target.id)) : null;
  }, [meta, target]);

  const readings: SundayReadingInfo[] = useMemo(() => {
    const labels: Record<ReadingKey, string> = { first: "1. čtení", second: "2. čtení", gospel: "Evangelium" };
    return READING_KEYS.map((key) => ({
      key,
      label: entry?.readings[key]?.label ?? labels[key],
      lectionary: entry?.readings[key] ?? null,
    }));
  }, [entry]);

  /**
   * Stale: there is work on the shelf and it belongs to a different Sunday
   * than the one the calendar points at — or to no known Sunday at all (state
   * from before Sundays were tracked). Shown once per target Sunday; "keep
   * going with the old one" dismisses it until the target changes.
   */
  const stale = Boolean(target && work && (!meta || meta.id !== target.id) && seen !== target.id);

  const summary: SundaySummary | null = useMemo(
    () => (typeof window === "undefined" ? null : summarizeWorking()),
    // Recompute whenever work flips; the summary is cheap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [work, archive]
  );

  const continueOld = useCallback(() => {
    if (target) setSeen(target.id);
  }, [target, setSeen]);

  /** Start the calendar Sunday fresh. `keep` puts the current work in the archive first. */
  const startNew = useCallback(
    (keep: boolean) => {
      if (!target) return;
      if (keep && hasWork()) {
        archiveCurrent(meta ?? { id: "unknown", sundayId: "", name: "Dřívější příprava" });
      }
      clearWorking();
      setMeta(target);
      setActiveReading("first");
      setSeen(target.id);
      setArchive(readArchive());
      setWork(false);
    },
    [target, meta, setMeta, setActiveReading, setSeen]
  );

  /** Bring an archived Sunday back to the desk; the current one goes to the archive if it has work. */
  const restore = useCallback(
    (id: string) => {
      const item = readArchive().find((a) => a.meta.id === id);
      if (!item) return;
      if (hasWork() && meta && meta.id !== id) archiveCurrent(meta);
      restoreWorking(item.snapshot);
      writeArchive(readArchive().filter((a) => a.meta.id !== id));
      setMeta(item.meta);
      if (target) setSeen(target.id);
      setArchive(readArchive());
      setWork(hasWork());
    },
    [meta, target, setMeta, setSeen]
  );

  const removeFromArchive = useCallback((id: string) => {
    writeArchive(readArchive().filter((a) => a.meta.id !== id));
    setArchive(readArchive());
  }, []);

  return {
    meta,
    target,
    entry,
    readings,
    activeReading,
    setActiveReading,
    stale,
    hasWork: work,
    summary,
    archive,
    continueOld,
    startNew,
    restore,
    removeFromArchive,
  };
}

/** The reading slot for one key, kept in sync across instances. */
export function useReadingSlot(key: ReadingKey) {
  return useLocalStorage<ReadingSlot | null>(readingSlotKey(key), null);
}

function safeString(raw: string | null): string {
  if (raw === null) return "";
  try {
    const v = JSON.parse(raw);
    return typeof v === "string" ? v : "";
  } catch {
    return raw;
  }
}

/**
 * The Sunday a pericope was read on: find the entry whose reading it is, then
 * walk back Sunday by Sunday from `before` until the calendar lands on that
 * entry. Looks back a year — the cycle repeats every three, so one match.
 */
function inferSundayFromReference(reference: string, before: Date): SundayMeta | null {
  if (!reference) return null;
  // Compare book + chapter + first verse rather than strings: the desk may say
  // „Matouš 13,31-33.44-52" where the lectionary says „Mt 13,31-33" (full name
  // vs. abbreviation, and some lectionary references are still truncated).
  const want = parseReferenceForApi(reference);
  if (!want) return null;
  const matches = LECTIONARY.filter((e) =>
    READING_KEYS.some((k) => {
      const r = e.readings[k];
      return r && r.bookNumber === want.bookNumber && r.chapter === want.chapter && r.verseStart === want.verseStart;
    })
  );
  if (matches.length === 0) return null;

  const d = new Date(before.getFullYear(), before.getMonth(), before.getDate());
  for (let i = 0; i < 53; i++) {
    const entry = getCurrentEntry(d);
    if (entry && matches.some((m) => m.sundayId === entry.sundayId && m.year === entry.year)) {
      return { id: isoDate(d), sundayId: entry.sundayId, name: entry.sundayName };
    }
    d.setDate(d.getDate() - 7);
  }
  return null;
}

/** Which of the Sunday's readings a reference most likely is. */
function guessReadingKey(reference: string, entry: LectionaryEntry | null): ReadingKey | null {
  if (!reference || !entry) return null;
  const norm = (s: string) => s.replace(/\s+/g, "").replace(/[–—]/g, "-").toLowerCase();
  const r = norm(reference);
  for (const key of READING_KEYS) {
    const ref = entry.readings[key]?.reference;
    if (ref && norm(ref) === r) return key;
  }
  return null;
}
