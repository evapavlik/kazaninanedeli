"use client";

import Link from "next/link";
import { useCurrentReading } from "@/hooks/useCurrentReading";

export default function SundayReadingCard() {
  const { data: reading, loading } = useCurrentReading();

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-white p-6 animate-pulse">
        <div className="h-4 w-32 rounded bg-cream mb-3" />
        <div className="h-5 w-48 rounded bg-cream mb-4" />
        <div className="h-10 w-40 rounded bg-cream" />
      </div>
    );
  }

  if (!reading || reading.readings.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-6 text-center">
        <Link
          href="/pruvodce/priprava"
          className="inline-flex items-center gap-2 rounded-md bg-brick px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-brick-light"
        >
          {`Za\u010D\u00EDt p\u0159\u00EDpravu`}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </Link>
      </div>
    );
  }

  const references = reading.readings.map((r) => r.reference).join(" / ");

  return (
    <div className="rounded-xl border border-brick/15 bg-white p-6 shadow-sm">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
        {`Tuto ned\u011Bli`}
      </p>
      <h3 className="mb-2 font-lora text-lg font-bold text-text">
        {reading.sundayTitle}
      </h3>
      <p className="mb-5 text-sm text-text-muted">
        {references}
      </p>
      <Link
        href="/pruvodce/priprava"
        className="inline-flex items-center gap-2 rounded-md bg-brick px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-brick-light"
      >
        {`Za\u010D\u00EDt p\u0159\u00EDpravu`}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </Link>
    </div>
  );
}
