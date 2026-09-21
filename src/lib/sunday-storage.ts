/**
 * A Sunday as the unit of preparation.
 *
 * Everything the preacher makes during a week — annotations, notes, the sermon
 * fields, ticked steps — lives in localStorage under `kazani-*`. Until now that
 * was one undifferentiated pile with no notion of *which* Sunday it belonged
 * to, so there was no way to start next week clean without losing this week,
 * and no way to look back. This module draws the line: which keys are *work*
 * (belong to the current Sunday and get archived/cleared together) and which
 * are *preferences* (guide quiet, compare mode…) that survive across Sundays.
 */

export type ReadingKey = "first" | "second" | "gospel";
export const READING_KEYS: ReadingKey[] = ["first", "second", "gospel"];

/** One of the Sunday's readings as loaded into the text panel. */
export interface ReadingSlot {
  reference: string;
  text: string;
  /** Translation code or "custom" — see BibleTextPanel's TextSource. */
  source: string;
}

export interface SundayMeta {
  /** ISO date of the Sunday (yyyy-mm-dd) — the identity of the preparation. */
  id: string;
  /** Lectionary id, e.g. "a64". */
  sundayId: string;
  name: string;
}

export interface SundaySummary {
  annotations: number;
  translationNotes: number;
  centralIdea: string;
  hasSermonText: boolean;
}

export interface ArchivedSunday {
  meta: SundayMeta;
  savedAt: string;
  status: "draft" | "done";
  summary: SundaySummary;
  /** Every working key at the moment of archiving — restorable as-is. */
  snapshot: Record<string, string>;
}

export const SUNDAY_KEY = "kazani-sunday";
export const ARCHIVE_KEY = "kazani-archive";
export const ACTIVE_READING_KEY = "kazani-active-reading";
export const readingSlotKey = (k: ReadingKey) => `kazani-reading-${k}`;
export const annotationsKey = (k: ReadingKey) => `kazani-annotations-${k}`;

/** Survive across Sundays: how the preacher likes the app, not what she made. */
const PREFERENCE_KEYS = new Set([
  "kazani-guide-quiet",
  "kazani-minimal-path",
  "kazani-compare-mode",
  "kazani-breath-symbol",
  "kazani-onboarding-seen",
  // One-time repairs of stored readings — see BibleTextPanel.
  "kazani-readings-resynced",
  // Generated commentaries are a cache of the source, not the preacher's work.
  "kazani-commentary-cache",
]);
/** Bookkeeping for this module — never part of a snapshot. */
const META_KEYS = new Set([SUNDAY_KEY, ARCHIVE_KEY, "kazani-sunday-seen"]);

export function isWorkingKey(key: string): boolean {
  return key.startsWith("kazani-") && !PREFERENCE_KEYS.has(key) && !META_KEYS.has(key);
}

function workingKeys(): string[] {
  const out: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && isWorkingKey(k)) out.push(k);
  }
  return out;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Tell every useLocalStorage instance to re-read — key null means "all". */
function broadcastAll() {
  window.dispatchEvent(new CustomEvent("kazani:local-storage", { detail: { key: null } }));
  window.dispatchEvent(new CustomEvent("kazani:bubbles-refresh"));
}

export function snapshotWorking(): Record<string, string> {
  const snap: Record<string, string> = {};
  for (const k of workingKeys()) {
    const v = localStorage.getItem(k);
    if (v !== null) snap[k] = v;
  }
  return snap;
}

export function clearWorking(): void {
  for (const k of workingKeys()) localStorage.removeItem(k);
  broadcastAll();
}

export function restoreWorking(snapshot: Record<string, string>): void {
  for (const k of workingKeys()) localStorage.removeItem(k);
  for (const [k, v] of Object.entries(snapshot)) {
    if (isWorkingKey(k)) localStorage.setItem(k, v);
  }
  broadcastAll();
}

/** What has actually been made this week — drives "is there anything to keep?". */
export function summarizeWorking(): SundaySummary {
  let annotations = 0;
  for (const k of READING_KEYS) {
    const store = safeParse<{ annotations?: unknown[] } | null>(localStorage.getItem(annotationsKey(k)), null);
    annotations += store?.annotations?.length ?? 0;
  }
  // Pre-slot store from before readings were separate.
  const legacy = safeParse<{ annotations?: unknown[] } | null>(localStorage.getItem("kazani-annotations"), null);
  annotations += legacy?.annotations?.length ?? 0;

  const notes = safeParse<unknown[]>(localStorage.getItem("kazani-translation-notes"), []);
  const artifacts = safeParse<Record<string, string>>(localStorage.getItem("kazani-artifacts"), {});

  return {
    annotations,
    translationNotes: Array.isArray(notes) ? notes.length : 0,
    centralIdea: (artifacts.centralIdea ?? "").trim(),
    hasSermonText: (artifacts.sermonText ?? "").trim().length > 0,
  };
}

export function hasWork(): boolean {
  const s = summarizeWorking();
  if (s.annotations || s.translationNotes || s.centralIdea || s.hasSermonText) return true;
  // Any artifact field, any ticked step, any notepad.
  const artifacts = safeParse<Record<string, string>>(localStorage.getItem("kazani-artifacts"), {});
  if (Object.values(artifacts).some((v) => typeof v === "string" && v.trim())) return true;
  for (const k of workingKeys()) {
    if (k.startsWith("kazani-flow-") && !k.startsWith("kazani-flow-reflect-")) {
      const arr = safeParse<boolean[]>(localStorage.getItem(k), []);
      if (Array.isArray(arr) && arr.some(Boolean)) return true;
    }
    if (k.startsWith("kazani-notes-")) {
      const s = safeParse<string>(localStorage.getItem(k), "");
      if (typeof s === "string" && s.trim()) return true;
    }
  }
  return false;
}

export function readArchive(): ArchivedSunday[] {
  const list = safeParse<ArchivedSunday[]>(localStorage.getItem(ARCHIVE_KEY), []);
  return Array.isArray(list) ? list : [];
}

export function writeArchive(list: ArchivedSunday[]): void {
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("kazani:local-storage", { detail: { key: ARCHIVE_KEY } }));
}

/** Put the current working state into the archive under `meta`. */
export function archiveCurrent(meta: SundayMeta): void {
  const summary = summarizeWorking();
  const entry: ArchivedSunday = {
    meta,
    savedAt: new Date().toISOString(),
    status: summary.hasSermonText ? "done" : "draft",
    summary,
    snapshot: snapshotWorking(),
  };
  const rest = readArchive().filter((a) => a.meta.id !== meta.id);
  writeArchive([entry, ...rest]);
}

/**
 * One-time move of the pre-slot state into the reading slots, so nothing the
 * preacher already made this week disappears when the panel starts showing
 * three readings. The single text becomes the slot whose lectionary reference
 * it matches — the gospel when it matches none.
 */
export function migrateLegacyText(guess: ReadingKey): void {
  const text = localStorage.getItem("kazani-bible-text");
  if (!text) return;
  if (READING_KEYS.some((k) => localStorage.getItem(readingSlotKey(k)))) return;
  const slot: ReadingSlot = {
    reference: safeParse<string>(localStorage.getItem("kazani-bible-ref"), ""),
    text: safeParse<string>(text, ""),
    source: safeParse<string>(localStorage.getItem("kazani-bible-source"), ""),
  };
  localStorage.setItem(readingSlotKey(guess), JSON.stringify(slot));
  const legacyAnn = localStorage.getItem("kazani-annotations");
  if (legacyAnn && !localStorage.getItem(annotationsKey(guess))) {
    localStorage.setItem(annotationsKey(guess), legacyAnn);
    localStorage.removeItem("kazani-annotations");
  }
  localStorage.setItem(ACTIVE_READING_KEY, JSON.stringify(guess));
}
