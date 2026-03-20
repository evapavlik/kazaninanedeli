"use client";

import { useState, useEffect } from "react";
import {
  parseReferenceForApi,
  getBibleHubInterlinearUrl,
  isOldTestament,
} from "@/lib/getbible";

interface PositionedAnnotation {
  id: string;
  startIndex: number;
  endIndex: number;
  selectedText: string;
  category: string;
  note: string;
}

interface OriginalLanguagesPanelProps {
  reference: string;
}

/**
 * Panel for step 4 (v\u00FDklad): shows links to interlinear Bible,
 * keyword annotations from step 2, and commentary links.
 * Helps the user study original Greek/Hebrew behind the Czech text.
 */
export default function OriginalLanguagesPanel({
  reference,
}: OriginalLanguagesPanelProps) {
  const [keywords, setKeywords] = useState<PositionedAnnotation[]>([]);

  // Read keyword annotations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kazani-annotations");
      if (stored) {
        const data = JSON.parse(stored);
        const kw = (data.annotations || []).filter(
          (a: PositionedAnnotation) => a.category === "keyword"
        );
        setKeywords(kw);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const parsed = parseReferenceForApi(reference);
  if (!parsed) return null;

  const { bookNumber, chapter } = parsed;
  const interlinearUrl = getBibleHubInterlinearUrl(bookNumber, chapter);
  const isOT = isOldTestament(bookNumber);
  const langLabel = isOT ? `hebrej\u0161tina` : `\u0159e\u010Dtina`;
  const langIcon = isOT ? "\u05D0" : "\u03B1";

  return (
    <div className="rounded-lg border border-sage/20 bg-sage-pale/30 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brick/10 text-[11px] font-bold text-brick">
          {`1`}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sage/10 text-[14px] font-semibold text-sage">
          {langIcon}
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage/70">
            {`Kl\u00ED\u010Dov\u00E1 slova v origin\u00E1le`}
          </p>
          <p className="text-[11px] text-text-muted">
            {`Text je v `}{isOT ? `hebrej\u0161tin\u011B` : `\u0159e\u010Dtin\u011B`}{` \u2014 prozkoumejte v\u00FDznam slov`}
          </p>
        </div>
      </div>

      {/* Interlinear link — main CTA */}
      {interlinearUrl && (
        <a
          href={interlinearUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex items-center gap-3 rounded-lg border border-sage/20 bg-white/70 px-3 py-2.5 transition-all hover:border-sage/40 hover:bg-white"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sage/10">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage">
              <path d="M3 4h5v12H3zM12 4h5v12h-5" />
              <path d="M5 7h1M5 9h1M5 11h1M14 7h1M14 9h1M14 11h1" opacity="0.5" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-text">
              {`Interline\u00E1rn\u00ED Bible`}
            </p>
            <p className="text-[10px] text-text-muted">
              {`Slovo po slov\u011B: \u010De\u0161tina \u2194 ${langLabel}`}
            </p>
          </div>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-sage/50">
            <path d="M7 4l6 6-6 6" />
          </svg>
        </a>
      )}

      {/* Keywords from annotations */}
      {keywords.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-light">
            {`Va\u0161e kl\u00ED\u010Dov\u00E1 slova z kroku 2`}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <a
                key={kw.id}
                href={`https://biblehub.com/str/search.php?q=${encodeURIComponent(kw.selectedText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 rounded-full border border-brick/20 bg-brick/5 px-2.5 py-1 transition-all hover:border-brick/40 hover:bg-brick/10"
              >
                <span className="text-[12px] font-medium text-brick">
                  {kw.selectedText}
                </span>
                <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-brick/40 transition-colors group-hover:text-brick">
                  <path d="M5 15L15 5M15 5H8M15 5v7" />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-1.5 text-[9px] text-text-light/60">
            {`Klikn\u011Bte pro vyhled\u00E1n\u00ED v origin\u00E1le na BibleHub`}
          </p>
        </div>
      )}

      {keywords.length === 0 && (
        <div className="mb-3 rounded-md border border-dashed border-sage/20 bg-white/40 px-3 py-2.5">
          <p className="text-[11px] leading-relaxed text-text-muted">
            {`V kroku 2 (\u010Dten\u00ED) ozna\u010Dte kl\u00ED\u010Dov\u00E1 slova \u2014 objev\u00ED se zde s odkazy na origin\u00E1ln\u00ED jazyk.`}
          </p>
        </div>
      )}

    </div>
  );
}
