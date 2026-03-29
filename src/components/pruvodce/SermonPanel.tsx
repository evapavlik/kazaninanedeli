"use client";

import { useState } from "react";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";

interface SermonPanelProps {
  artifacts: SermonArtifacts;
}

interface PanelField {
  key: keyof SermonArtifacts;
  label: string;
  highlight?: boolean;
}

interface PanelSection {
  id: string;
  label: string;
  color: string;
  dotColor: string;
  fields: PanelField[];
}

const SECTIONS: PanelSection[] = [
  {
    id: "kostra",
    label: "Kostra kázání",
    color: "#9b4a3c",
    dotColor: "#9b4a3c",
    fields: [
      { key: "sermonThesis", label: "Jádro kázání", highlight: true },
      { key: "outlinePoints", label: "Osnova" },
      { key: "intro", label: "Úvod" },
      { key: "conclusion", label: "Závěr" },
    ],
  },
  {
    id: "posluchaci",
    label: "Posluchači & poselství",
    color: "#6b8f71",
    dotColor: "#6b8f71",
    fields: [
      { key: "listenerSituation", label: "Situace posluchačů" },
      { key: "textListenerBridge", label: "Most text–život" },
      { key: "takeaway", label: "Co si odnést" },
    ],
  },
  {
    id: "text",
    label: "Porozumění textu",
    color: "#8a7f78",
    dotColor: "#b5ada8",
    fields: [
      { key: "centralIdea", label: "Centrální myšlenka" },
      { key: "author", label: "Autor a adresát" },
      { key: "historicalContext", label: "Historické pozadí" },
      { key: "liturgicalConnection", label: "Liturgický kontext" },
      { key: "overallImpression", label: "Celkový dojem" },
    ],
  },
];

function truncate(str: string, max: number): string {
  const firstLine = str.split("\n")[0];
  const hasMore = str.split("\n").filter((l) => l.trim()).length > 1;
  if (firstLine.length > max) return firstLine.slice(0, max) + "…";
  return firstLine + (hasMore ? "\n…" : "");
}

export default function SermonPanel({ artifacts }: SermonPanelProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    kostra: false,
    posluchaci: false,
    text: true,
  });

  const totalFields = SECTIONS.reduce((n, s) => n + s.fields.length, 0);
  const filledFields = SECTIONS.reduce(
    (n, s) =>
      n + s.fields.filter((f) => artifacts[f.key]?.trim()).length,
    0
  );

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="sticky top-4 flex flex-col rounded-xl border border-border bg-white overflow-hidden max-h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5 flex-shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          Moje kázání
        </span>
        <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] text-text-light">
          {filledFields} / {totalFields} polí
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
        {filledFields === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <span className="text-2xl opacity-20">✍️</span>
            <p className="text-[11px] text-text-light leading-relaxed">
              Tady se zobrazí vše,
              <br />
              co jste dosud připravili.
            </p>
          </div>
        ) : (
          SECTIONS.map((section) => {
            const filledInSection = section.fields.filter(
              (f) => artifacts[f.key]?.trim()
            ).length;
            const isCollapsed = collapsed[section.id];

            return (
              <div key={section.id} className="rounded-lg overflow-hidden mb-0.5">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-cream"
                  style={{ color: section.color }}
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{
                      background: section.dotColor,
                      opacity: filledInSection > 0 ? 1 : 0.3,
                    }}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    {section.label}
                  </span>
                  <span className="ml-0.5 text-[9px] font-normal opacity-60">
                    {filledInSection}/{section.fields.length}
                  </span>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={`ml-auto flex-shrink-0 text-text-light transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>

                {!isCollapsed && (
                  <>
                    {/* Fill bar */}
                    {filledInSection > 0 && (
                      <div className="mx-2.5 mb-1 h-px bg-border overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full bg-brick transition-all duration-500"
                          style={{ width: `${(filledInSection / section.fields.length) * 100}%` }}
                        />
                      </div>
                    )}

                    {section.fields.map((field) => {
                      const value = artifacts[field.key];
                      if (value?.trim()) {
                        return (
                          <div
                            key={field.key}
                            className="rounded-md px-2.5 py-1.5 pl-[18px] hover:bg-cream transition-colors"
                          >
                            <div className="text-[9px] font-semibold uppercase tracking-wider text-text-light mb-0.5">
                              {field.label}
                            </div>
                            <div
                              className={
                                field.highlight
                                  ? "font-cormorant text-[13px] italic font-semibold text-brick leading-snug"
                                  : "text-[11px] text-text leading-snug whitespace-pre-line"
                              }
                            >
                              {truncate(value, field.highlight ? 100 : 70)}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={field.key}
                            className="px-2.5 py-1 pl-[18px] text-[10px] italic text-text-light"
                          >
                            {field.label} —
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
