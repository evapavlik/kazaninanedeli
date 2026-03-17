"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface BibleTextPanelProps {
  currentSlug: string;
}

export default function BibleTextPanel({ currentSlug }: BibleTextPanelProps) {
  const [savedText, setSavedText] = useLocalStorage<string>(
    "kazani-bible-text",
    ""
  );
  const [savedRef, setSavedRef] = useLocalStorage<string>(
    "kazani-bible-ref",
    ""
  );
  const [localText, setLocalText] = useState("");
  const [localRef, setLocalRef] = useState("");
  const [editing, setEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedIndicatorRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setLocalText(savedText);
    setLocalRef(savedRef);
  }, [savedText, savedRef]);

  const saveText = useCallback(
    (text: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSavedText(text);
        setShowSaved(true);
        if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
        savedIndicatorRef.current = setTimeout(() => setShowSaved(false), 1500);
      }, 300);
    },
    [setSavedText]
  );

  const saveRef = useCallback(
    (ref: string) => {
      setSavedRef(ref);
    },
    [setSavedRef]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
    };
  }, []);

  const hasText = localText.trim().length > 0;
  const isFirstStep = currentSlug === "modlitba";
  const showTextarea = !hasText || editing || isFirstStep;

  // Step 1: just a placeholder
  if (isFirstStep && !hasText) {
    return (
      <div className="rounded-xl border border-border bg-cream p-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
          {`Biblick\u00FD text`}
        </p>
        <p className="text-sm italic leading-relaxed text-text-muted">
          {`V dal\u0161\u00EDm kroku sem vlo\u017E\u00EDte text perikopy, se kterou budete pracovat.`}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-cream p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
          {`Biblick\u00FD text`}
        </p>
        <div className="flex items-center gap-2">
          {showSaved && (
            <span className="text-[11px] text-sage">{`\u2713 Ulo\u017Eeno`}</span>
          )}
          {hasText && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-[11px] font-medium text-text-light hover:text-brick"
            >
              {`Upravit`}
            </button>
          )}
        </div>
      </div>

      {/* Reference input */}
      {(showTextarea || !hasText) && (
        <input
          type="text"
          value={localRef}
          onChange={(e) => {
            setLocalRef(e.target.value);
            saveRef(e.target.value);
          }}
          placeholder={`Odkaz (nap\u0159. Mk 4,1\u201320)`}
          className="mb-2 w-full rounded-lg border border-border/70 bg-white/80 px-3 py-1.5 text-xs text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
        />
      )}

      {/* Text display or textarea */}
      {hasText && !editing ? (
        <div>
          {localRef && (
            <p className="mb-2 font-cormorant text-[13px] font-semibold text-brick">
              {localRef}
            </p>
          )}
          <div className="font-cormorant text-[15px] leading-[1.9] text-text whitespace-pre-wrap">
            {localText}
          </div>
        </div>
      ) : (
        <div>
          {localRef && !showTextarea && (
            <p className="mb-2 font-cormorant text-[13px] font-semibold text-brick">
              {localRef}
            </p>
          )}
          <textarea
            value={localText}
            onChange={(e) => {
              setLocalText(e.target.value);
              saveText(e.target.value);
            }}
            placeholder={`Vlo\u017Ete text perikopy\u2026`}
            rows={8}
            className="w-full resize-none rounded-lg border border-border/70 bg-white/80 p-3 font-cormorant text-[15px] leading-[1.9] text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
          />
          {editing && hasText && (
            <button
              onClick={() => setEditing(false)}
              className="mt-2 text-xs font-medium text-brick hover:text-brick-light"
            >
              {`Hotovo`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
