"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { CategoryId } from "@/data/annotation-categories";

export interface PositionedAnnotation {
  id: string;
  startIndex: number;
  endIndex: number;
  selectedText: string;
  category: CategoryId;
  note: string;
}

interface AnnotationStore {
  textHash: string;
  annotations: PositionedAnnotation[];
}

const STORAGE_KEY = "kazani-annotations";
const OLD_STORAGE_KEY = "kazani-annotation-vyklad";

function simpleHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash.toString(36);
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const emptyStore: AnnotationStore = { textHash: "", annotations: [] };

export function useAnnotations(currentText: string) {
  const [store, setStore] = useLocalStorage<AnnotationStore>(
    STORAGE_KEY,
    emptyStore
  );
  const [localStore, setLocalStore] = useState<AnnotationStore>(emptyStore);
  const migrated = useRef(false);

  // Sync from localStorage
  useEffect(() => {
    setLocalStore(store);
  }, [store]);

  // One-time migration from old format
  useEffect(() => {
    if (migrated.current) return;
    migrated.current = true;
    try {
      const oldRaw = window.localStorage.getItem(OLD_STORAGE_KEY);
      if (!oldRaw) return;
      const oldData = JSON.parse(oldRaw);
      if (
        oldData &&
        Array.isArray(oldData.annotations) &&
        oldData.annotations.length > 0 &&
        localStore.annotations.length === 0
      ) {
        // Old format has { text, category, note } — no positions, skip migration
        // Just remove the old key to avoid re-checking
        window.localStorage.removeItem(OLD_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [localStore.annotations.length]);

  const currentHash = currentText ? simpleHash(currentText) : "";
  const textMismatch =
    localStore.textHash !== "" &&
    currentHash !== "" &&
    localStore.textHash !== currentHash;

  const persist = useCallback(
    (updated: AnnotationStore) => {
      setLocalStore(updated);
      setStore(updated);
    },
    [setStore]
  );

  const addAnnotation = useCallback(
    (
      startIndex: number,
      endIndex: number,
      selectedText: string,
      category: CategoryId
    ) => {
      // Check for overlaps
      const overlaps = localStore.annotations.some(
        (a) => startIndex < a.endIndex && endIndex > a.startIndex
      );
      if (overlaps) return false;

      const annotation: PositionedAnnotation = {
        id: generateId(),
        startIndex,
        endIndex,
        selectedText,
        category,
        note: "",
      };
      persist({
        textHash: currentHash,
        annotations: [...localStore.annotations, annotation].sort(
          (a, b) => a.startIndex - b.startIndex
        ),
      });
      return true;
    },
    [localStore, currentHash, persist]
  );

  const removeAnnotation = useCallback(
    (id: string) => {
      persist({
        ...localStore,
        annotations: localStore.annotations.filter((a) => a.id !== id),
      });
    },
    [localStore, persist]
  );

  const updateNote = useCallback(
    (id: string, note: string) => {
      persist({
        ...localStore,
        annotations: localStore.annotations.map((a) =>
          a.id === id ? { ...a, note } : a
        ),
      });
    },
    [localStore, persist]
  );

  const clearAnnotations = useCallback(() => {
    persist({ textHash: currentHash, annotations: [] });
  }, [currentHash, persist]);

  // Update hash when text changes but annotations exist
  const syncHash = useCallback(() => {
    if (currentHash && localStore.textHash !== currentHash && localStore.annotations.length > 0) {
      persist({ ...localStore, textHash: currentHash });
    }
  }, [currentHash, localStore, persist]);

  return {
    annotations: localStore.annotations,
    addAnnotation,
    removeAnnotation,
    updateNote,
    clearAnnotations,
    textMismatch,
    syncHash,
  };
}
