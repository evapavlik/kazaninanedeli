"use client";

import Link from "next/link";
import { useLectionaryReading } from "@/hooks/useLectionaryReading";

export default function SundayReadingCard() {
  const { entry, season, loading, supabase } = useLectionaryReading();

  if (loading && !entry) {
    return (
      <div className="rounded-xl border border-border bg-white p-6 animate-pulse">
        <div className="h-4 w-32 rounded bg-cream mb-3" />
        <div className="h-5 w-48 rounded bg-cream mb-4" />
        <div className="h-10 w-40 rounded bg-cream" />
      </div>
    );
  }

  // Use lectionary data (preferred) or Supabase fallback
  const title = entry?.sundayName ?? supabase?.sundayTitle;
  const readings = entry?.readings;
  const references = readings
    ? [readings.first, readings.second, readings.gospel]
        .filter(Boolean)
        .map((r) => r!.reference)
        .join(" \u2022 ")
    : supabase?.readings.map((r) => r.reference).join(" \u2022 ");

  if (!title) {
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

  return (
    <div className="rounded-xl border border-brick/15 bg-white p-6 shadow-sm">
      {/* Liturgické období s barvou */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: season.colorHex }}
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
          {season.name}
        </span>
      </div>

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
        {`Tuto ned\u011Bli`}
      </p>
      <h3 className="mb-2 font-lora text-lg font-bold text-text">
        {title}
      </h3>

      {references && (
        <p className="mb-5 text-sm text-text-muted">
          {references}
        </p>
      )}

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
