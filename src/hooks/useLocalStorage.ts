"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Same-tab notification channel. The native `storage` event only fires in
 * *other* tabs, so sibling hooks in this tab that share a key would otherwise
 * drift apart (e.g. BibleTextPanel writing the reference while StepContentPanel
 * reads it). On every write we dispatch this event with the key so all
 * instances re-read and stay in sync.
 */
const SYNC_EVENT = "kazani:local-storage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Keep the latest initialValue without making the read effect depend on it
  // (callers often pass a fresh object/array literal each render).
  const initialRef = useRef(initialValue);
  useEffect(() => {
    initialRef.current = initialValue;
  }, [initialValue]);

  // Always resolve to a concrete value: the stored one, or the initial fallback
  // when the key is empty or its contents are corrupt — never leave a previous
  // key's value (or a partial parse) stranded in state.
  const read = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialRef.current;
    } catch (error) {
      console.warn(`useLocalStorage: error reading "${key}"`, error);
      return initialRef.current;
    }
  }, [key]);

  // Read on mount / key change, and keep in sync with writes from other hook
  // instances (same tab, via SYNC_EVENT) and other tabs (via `storage`).
  useEffect(() => {
    setStoredValue(read());

    const onChange = (e: Event) => {
      const changedKey =
        e instanceof StorageEvent
          ? e.key
          : (e as CustomEvent<{ key: string }>).detail?.key;
      // storage event with key === null means "cleared" — always re-read.
      if (changedKey === null || changedKey === undefined || changedKey === key) {
        setStoredValue(read());
      }
    };

    window.addEventListener("storage", onChange);
    window.addEventListener(SYNC_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(SYNC_EVENT, onChange);
    };
  }, [key, read]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
          console.warn(`useLocalStorage: error writing "${key}"`, error);
        }
        return newValue;
      });
      // Notify sibling instances in this tab (the storage event is cross-tab
      // only). Dispatched here in the event-handler scope — NOT inside the
      // updater above, where a synchronous listener would call setState while
      // React is still rendering.
      window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }));
    },
    [key]
  );

  return [storedValue, setValue];
}
