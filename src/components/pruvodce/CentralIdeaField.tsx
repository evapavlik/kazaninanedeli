"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/**
 * Dedicated field for formulating the central idea of the text in one sentence.
 * Used in step 4 (v\u00FDklad) and carried forward to step 6 (stavba).
 * Stored in localStorage under "kazani-central-idea".
 */
export default function CentralIdeaField() {
  const [saved, setSaved] = useLocalStorage<string>("kazani-central-idea", "");
  const [value, setValue] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setValue(saved);
  }, [saved]);

  const save = useCallback(
    (text: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSaved(text);
        setShowSaved(true);
        if (savedRef.current) clearTimeout(savedRef.current);
        savedRef.current = setTimeout(() => setShowSaved(false), 1500);
      }, 500);
    },
    [setSaved]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (savedRef.current) clearTimeout(savedRef.current);
    };
  }, []);

  const charCount = value.length;
  const isLong = charCount > 120;

  return (
    <div className="rounded-lg border border-brick/15 bg-white/80 p-4">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brick-pale text-[12px]">
            {"\uD83C\uDFAF"}
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
            {`Centr\u00E1ln\u00ED my\u0161lenka textu`}
          </p>
        </div>
        {showSaved && (
          <span className="text-[10px] text-sage">{`\u2713 Ulo\u017Eeno`}</span>
        )}
      </div>

      <p className="mb-2 text-[11px] leading-relaxed text-text-muted">
        {`Shrn\u011Bte sd\u011Blen\u00ED textu jednou v\u011Btou. Pokud to nedok\u00E1\u017Eete, vra\u0165te se k textu.`}
      </p>

      {/* Input field */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            save(e.target.value);
          }}
          placeholder={`Nap\u0159. \u201EJe\u017E\u00ED\u0161 ukazuje, \u017Ee Bo\u017E\u00ED moc p\u0159esahuje i smrt \u2014 a vyz\u00FDv\u00E1 k v\u00ED\u0159e navzdory pochybnostem.\u201C`}
          rows={2}
          className="w-full resize-none rounded-lg border border-border/70 bg-white px-3 py-2.5 font-literata text-[15px] leading-[1.7] text-text placeholder:text-[13px] placeholder:font-sans placeholder:text-text-light/40 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
        />
        <div className="mt-1 flex items-center justify-between">
          <span className={`text-[9px] ${isLong ? "text-brick" : "text-text-light/50"}`}>
            {charCount > 0 ? `${charCount} znak\u016F` : ""}
          </span>
          {isLong && (
            <span className="text-[9px] text-brick">
              {`Zkuste to stru\u010Dn\u011Bji \u2014 jedna v\u011Bta`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
