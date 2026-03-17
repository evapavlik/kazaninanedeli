"use client";

import { useState, useEffect } from "react";
import { getCurrentSeason } from "@/data/liturgical-calendar";
import type { LiturgicalSeason } from "@/data/liturgical-calendar";

export default function LiturgicalCalendar() {
  const [season, setSeason] = useState<LiturgicalSeason | null>(null);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const now = new Date();
    setSeason(getCurrentSeason(now));
    setDateStr(
      now.toLocaleDateString("cs-CZ", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  if (!season) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted">{dateStr}</p>

      {/* Season card */}
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-border/50"
          style={{ backgroundColor: season.colorHex }}
          title={`Liturgick\u00E1 barva: ${season.color}`}
        />
        <div>
          <h4 className="font-lora text-sm font-bold text-text">
            {season.name}
          </h4>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-text-light">
            {`Liturgick\u00E1 barva: ${season.color}`}
          </p>
          <p className="text-xs leading-relaxed text-text-muted">
            {season.description}
          </p>
        </div>
      </div>

      {/* Themes */}
      <div>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
          {`T\u00E9mata obdob\u00ED`}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {season.themes.map((theme, i) => (
            <span
              key={i}
              className="rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] text-sage"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      <p className="text-[10px] italic text-text-light">
        {`Zva\u017Ete, jak t\u00E9mata tohoto obdob\u00ED rezonuj\u00ED s va\u0161\u00EDm textem.`}
      </p>
    </div>
  );
}
