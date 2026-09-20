"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { phases } from "@/data/phases";
import type { SermonArtifacts } from "./useSermonArtifacts";
import type { TranslationNote } from "./useTranslationNotes";
import {
  READING_KEYS,
  annotationsKey,
  readingSlotKey,
  type ReadingSlot,
} from "@/lib/sunday-storage";

const READING_LABELS: Record<string, string> = {
  first: "1. čtení",
  second: "2. čtení",
  gospel: "Evangelium",
};

/**
 * A "bubble" represents one piece of raw material the preacher has collected
 * during preparation — an annotation, a notepad entry, or an artifact answer.
 * Bubbles surface in the "Můj zápisník" drawer and can be dragged into the
 * sermon fields (or inserted via a tap menu on mobile).
 *
 * When a bubble is dropped into a field it becomes "consumed": the underlying
 * data in localStorage is preserved, but the card is hidden from the drawer
 * so the preacher can see what's left to use.
 */

export type BubbleSource = "annotation" | "notebook" | "artifact";
export type BubbleCategory =
  | "keyword"
  | "actor"
  | "tension"
  | "question"
  | "notebook"
  | "artifact";

export interface Bubble {
  /** Stable ID across reloads so consumed-state persists. */
  id: string;
  source: BubbleSource;
  category: BubbleCategory;
  /** Short kind label shown on the card, e.g. "Klíčové slovo", "Zápisník · Kontext". */
  tag: string;
  /** Optional title (for annotations: the quoted text in uvozovky). */
  title?: string;
  /** Main body text — what gets inserted into the sermon field. */
  body: string;
}

interface AnnotationItem {
  id: string;
  selectedText: string;
  category: string;
  note: string;
}

interface AnnotationStore {
  textHash: string;
  annotations: AnnotationItem[];
}

const CONSUMED_KEY = "kazani-bubbles-consumed";

/** Labels for annotation categories (matches annotation-categories.ts). */
const ANNOTATION_LABELS: Record<string, { label: string; category: BubbleCategory }> = {
  keyword: { label: "Klíčové slovo", category: "keyword" },
  actor: { label: "Osoba / děj", category: "actor" },
  tension: { label: "Zlom · napětí", category: "tension" },
  question: { label: "Otázka", category: "question" },
};

/** Human-friendly labels for artifact fields. */
const ARTIFACT_FIELD_LABELS: Partial<Record<keyof SermonArtifacts, string>> = {
  personalSituation: "Co mě trápí/těší",
  expectations: "Očekávání od textu",
  overallImpression: "Celkový dojem z textu",
  author: "Autor a adresát",
  historicalContext: "Historické pozadí",
  liturgicalConnection: "Liturgický kontext",
  centralIdea: "Centrální myšlenka",
  listenerSituation: "Situace posluchačů",
  textListenerBridge: "Most text–život",
  illustrations: "Ilustrace",
  takeaway: "Co si odnést",
  sermonThesis: "Jádro kázání",
  outlinePoints: "Osnova",
  intro: "Úvod",
  conclusion: "Závěr",
  sermonText: "Celé kázání",
};

/**
 * Artifact fields that become draggable bubbles. This includes the planning
 * pieces from the Stavba sub-step (thesis, outline, intro, conclusion) so the
 * preacher can pull them into the final „Celý text kázání" in Formulace.
 * We deliberately exclude `sermonText` itself — you can't drag the final text
 * back into its own field.
 */
const ARTIFACT_FIELDS_AS_BUBBLES: (keyof SermonArtifacts)[] = [
  "personalSituation",
  "expectations",
  "overallImpression",
  "author",
  "historicalContext",
  "liturgicalConnection",
  "centralIdea",
  "listenerSituation",
  "textListenerBridge",
  "illustrations",
  "takeaway",
  // Planning pieces from Stavba — pull them into the final prose
  "sermonThesis",
  "outlinePoints",
  "intro",
  "conclusion",
];

function safeParse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Annotations from every reading of the Sunday, each tagged with where it was
 * made. The preacher reads the first reading, the epistle and the gospel in
 * turn and marks words in each; when she comes back to the notebook, the one
 * thing she needs to know about a mark is which text it came from.
 */
function readAnnotations(): (AnnotationItem & { where: string })[] {
  if (typeof window === "undefined") return [];
  const out: (AnnotationItem & { where: string })[] = [];
  for (const key of READING_KEYS) {
    const store = safeParse<AnnotationStore | null>(localStorage.getItem(annotationsKey(key)), null);
    if (!store?.annotations?.length) continue;
    const slot = safeParse<ReadingSlot | null>(localStorage.getItem(readingSlotKey(key)), null);
    const where = [READING_LABELS[key], slot?.reference].filter(Boolean).join(" · ");
    for (const a of store.annotations) out.push({ ...a, where });
  }
  // Pre-slot store — a page showing a single text, or state from before slots.
  const legacy = safeParse<AnnotationStore | null>(localStorage.getItem("kazani-annotations"), null);
  for (const a of legacy?.annotations ?? []) out.push({ ...a, where: "" });
  return out;
}

function readTranslationNotes(): TranslationNote[] {
  if (typeof window === "undefined") return [];
  const raw = safeParse<TranslationNote[]>(
    localStorage.getItem("kazani-translation-notes"),
    []
  );
  return Array.isArray(raw) ? raw : [];
}

function readArtifacts(): SermonArtifacts | null {
  if (typeof window === "undefined") return null;
  return safeParse<SermonArtifacts | null>(
    localStorage.getItem("kazani-artifacts"),
    null
  );
}

function readNotepad(slug: string): string {
  if (typeof window === "undefined") return "";
  return safeParse<string>(localStorage.getItem(`kazani-notes-${slug}`), "");
}

/** Enumerate all sub-step slugs from phases config. */
function allSubSlugs(): { slug: string; phaseTitle: string; subTitle: string }[] {
  const out: { slug: string; phaseTitle: string; subTitle: string }[] = [];
  for (const phase of phases) {
    for (const sub of phase.subSteps ?? []) {
      out.push({ slug: sub.slug, phaseTitle: phase.title, subTitle: sub.title });
    }
  }
  return out;
}

function buildBubbles(): Bubble[] {
  const bubbles: Bubble[] = [];

  // Annotations
  for (const a of readAnnotations()) {
    const meta = ANNOTATION_LABELS[a.category] ?? {
      label: "Zvýraznění",
      category: "keyword" as BubbleCategory,
    };
    // If the preacher wrote a note, the body is the note; otherwise body = quoted text.
    const body = a.note.trim() || a.selectedText;
    bubbles.push({
      id: `ann-${a.id}`,
      source: "annotation",
      category: meta.category,
      tag: a.where ? `${meta.label} · ${a.where}` : meta.label,
      title: a.note.trim() ? `„${a.selectedText}"` : undefined,
      body,
    });
  }

  // Notes made while comparing translations. A marked phrase behaves like an
  // annotation (it has a category and a quote); a note about the whole verse is
  // a notebook entry, since it is a thought rather than a highlight.
  for (const n of readTranslationNotes()) {
    const where = `${n.sourceLabel} ${n.verse}`;
    if (n.quote && n.category) {
      const meta = ANNOTATION_LABELS[n.category] ?? {
        label: "Zvýraznění",
        category: "keyword" as BubbleCategory,
      };
      bubbles.push({
        id: `tr-${n.id}`,
        source: "annotation",
        category: meta.category,
        tag: `${meta.label} · ${where}`,
        title: `„${n.quote}"`,
        body: n.note.trim() || n.quote,
      });
    } else {
      bubbles.push({
        id: `tr-${n.id}`,
        source: "notebook",
        category: "notebook",
        tag: `Překlady · verš ${n.verse}`,
        body: n.note,
      });
    }
  }

  // Notepads per sub-step
  for (const { slug, subTitle } of allSubSlugs()) {
    const content = readNotepad(slug).trim();
    if (!content) continue;
    bubbles.push({
      id: `note-${slug}`,
      source: "notebook",
      category: "notebook",
      tag: `Zápisník · ${subTitle}`,
      body: content,
    });
  }

  // Artifact answers
  const artifacts = readArtifacts();
  if (artifacts) {
    for (const field of ARTIFACT_FIELDS_AS_BUBBLES) {
      const value = (artifacts[field] ?? "").trim();
      if (!value) continue;
      bubbles.push({
        id: `art-${field}`,
        source: "artifact",
        category: "artifact",
        tag: `Odpověď · ${ARTIFACT_FIELD_LABELS[field] ?? field}`,
        body: value,
      });
    }
  }

  return bubbles;
}

/**
 * Build the set of available (unconsumed) bubbles and expose helpers
 * for consuming / restoring them. Rebuilds from localStorage on demand
 * because the three source stores are updated by unrelated components.
 */
export function useBubbles() {
  const [consumed, setConsumed] = useState<string[]>([]);
  const [all, setAll] = useState<Bubble[]>([]);
  const [rebuildTick, setRebuildTick] = useState(0);

  // Load consumed list + initial bubbles on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const consumedRaw = safeParse<string[]>(localStorage.getItem(CONSUMED_KEY), []);
    setConsumed(consumedRaw);
    setAll(buildBubbles());
  }, []);

  // Rebuild when asked (e.g. after artifact/annotation/notepad change)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (rebuildTick === 0) return; // initial load handled above
    setAll(buildBubbles());
  }, [rebuildTick]);

  const refresh = useCallback(() => {
    setRebuildTick((t) => t + 1);
  }, []);

  // Persist consumed list
  const persistConsumed = useCallback((next: string[]) => {
    setConsumed(next);
    try {
      localStorage.setItem(CONSUMED_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota errors */
    }
  }, []);

  const consume = useCallback(
    (id: string) => {
      setConsumed((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem(CONSUMED_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const restore = useCallback(
    (id: string) => {
      persistConsumed(consumed.filter((c) => c !== id));
    },
    [consumed, persistConsumed]
  );

  const clearConsumed = useCallback(() => {
    persistConsumed([]);
  }, [persistConsumed]);

  // Listen for window-dispatched consume events (from drop handlers)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id?: string }>).detail;
      if (detail?.id) consume(detail.id);
    };
    const refreshHandler = () => refresh();
    window.addEventListener("kazani:bubble-consumed", handler);
    window.addEventListener("kazani:bubbles-refresh", refreshHandler);
    return () => {
      window.removeEventListener("kazani:bubble-consumed", handler);
      window.removeEventListener("kazani:bubbles-refresh", refreshHandler);
    };
  }, [consume, refresh]);

  const available = useMemo(
    () => all.filter((b) => !consumed.includes(b.id)),
    [all, consumed]
  );

  const consumedBubbles = useMemo(
    () => all.filter((b) => consumed.includes(b.id)),
    [all, consumed]
  );

  return {
    /** Bubbles that haven't been used yet. */
    available,
    /** Bubbles that have already been inserted somewhere. */
    consumedBubbles,
    /** All bubbles, regardless of state. */
    all,
    /** Count of unused bubbles. */
    availableCount: available.length,
    consume,
    restore,
    clearConsumed,
    /** Re-read localStorage (call after artifacts/annotations/notes change elsewhere). */
    refresh,
  };
}

/**
 * Utility: dispatch a consume event from anywhere (e.g. a drop handler on
 * a textarea that doesn't have direct access to the useBubbles hook).
 */
export function dispatchBubbleConsumed(id: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("kazani:bubble-consumed", { detail: { id } })
  );
}

/**
 * Utility: ask any useBubbles instance to re-read its source stores.
 * Use this when the user changes an artifact/annotation/note outside the
 * drawer, so the drawer content reflects the change.
 */
export function dispatchBubblesRefresh() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("kazani:bubbles-refresh"));
}

/**
 * DataTransfer payload format for bubble drags.
 */
export const BUBBLE_MIME = "application/x-kazani-bubble";

export interface BubbleDragPayload {
  id: string;
  text: string;
}

export function encodeBubbleDrag(bubble: Bubble): string {
  const text = bubble.title ? `${bubble.title} — ${bubble.body}` : bubble.body;
  return JSON.stringify({ id: bubble.id, text } satisfies BubbleDragPayload);
}

export function decodeBubbleDrag(raw: string): BubbleDragPayload | null {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.id === "string" && typeof parsed?.text === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
