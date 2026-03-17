"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface DebouncedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  variant?: "brick" | "sage";
}

export default function DebouncedTextarea({
  value,
  onChange,
  placeholder,
  rows = 2,
  label,
  variant = "brick",
}: DebouncedTextareaProps) {
  const [localValue, setLocalValue] = useState(value);
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
        setShowSaved(true);
        if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
        savedTimeoutRef.current = setTimeout(() => setShowSaved(false), 1500);
      }, 300);
    },
    [onChange]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    };
  }, []);

  const focusBorder = variant === "brick" ? "focus:border-brick/30 focus:ring-brick/10" : "focus:border-sage/40 focus:ring-sage/10";

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-medium text-text-muted">{label}</label>
          {showSaved && (
            <span className="text-[11px] text-sage">{`\u2713 Ulo\u017Eeno`}</span>
          )}
        </div>
      )}
      <textarea
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded-lg border border-border/70 bg-white/80 p-2.5 text-sm leading-relaxed text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 ${focusBorder}`}
      />
    </div>
  );
}
