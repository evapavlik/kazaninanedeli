"use client";

import { useState } from "react";

/**
 * Clean OCR text from Farský postily — fix line-break word splits.
 * Shared helper between CommentaryPanel and SermonInspirationPanel.
 */
function cleanOcrText(raw: string): string {
  return raw
    // Join words split across lines (word fragment + newline + continuation)
    .replace(
      new RegExp(
        "([a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FD\u010D\u010F\u011B\u0148\u0159\u0161\u0165\u016F\u017E])\\n([a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FD\u010D\u010F\u011B\u0148\u0159\u0161\u0165\u016F\u017E])",
        "gi"
      ),
      "$1$2"
    )
    // Collapse remaining single newlines into spaces (keep double newlines as paragraphs)
    .replace(/([^\n])\n([^\n])/g, "$1 $2")
    // Clean up multiple spaces
    .replace(/ {2,}/g, " ")
    .trim();
}

/**
 * Rozbalovatelný obsah postily s očištěným OCR textem.
 * Dlouhé texty (>600 znaků) se zobrazí zkrácené s tlačítkem "Rozbalit celý text".
 */
export default function PostilaContent({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  const cleaned = cleanOcrText(content);
  const isLong = cleaned.length > 600;
  const displayText = isLong && !expanded ? cleaned.slice(0, 600) : cleaned;

  // Split into paragraphs on double newline
  const paragraphs = displayText.split(/\n\n+/).filter(Boolean);

  return (
    <div className="text-[12px] leading-relaxed text-text-muted">
      {paragraphs.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {para}
          {isLong && !expanded && i === paragraphs.length - 1 && "\u2026"}
        </p>
      ))}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-[11px] font-medium text-brick underline decoration-brick/30 hover:decoration-brick"
        >
          {expanded ? `Sbalit` : `Rozbalit cel\u00FD text`}
        </button>
      )}
    </div>
  );
}
