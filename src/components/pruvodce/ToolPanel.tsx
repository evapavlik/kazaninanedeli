"use client";

import TranslationCompare from "./TranslationCompare";
import BibleContextView from "./BibleContextView";
import OriginalLanguagesPanel from "./OriginalLanguagesPanel";
import CommentaryPanel from "./CommentaryPanel";
import SermonInspirationPanel from "./SermonInspirationPanel";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";

export const TOOL_LABELS: Record<string, string> = {
  translations: "Porovnání překladů",
  bookContext: "Kontext knihy",
  liturgy: "Liturgický kalendář",
  originals: "Původní jazyky",
  commentary: "Komentáře",
  sermons: "Kázání jiných",
};

interface ToolPanelProps {
  toolKey: string;
  reference: string;
  onClose: () => void;
}

/**
 * An on-demand tool, opened from a flow item in the guide.
 *
 * Per CLAUDE.md the guide and the tools are two separate systems: the guide
 * leads step by step, the tools are helpers the preacher reaches for. So a tool
 * never renders *inside* the guide — it opens on the main surface, next to the
 * text, where it has the full reading width. (It used to render inside the
 * 330px guide rail, which squeezed the three translation columns to ~90px each
 * and made the comparison unreadable.)
 *
 * Shared by desktop and mobile so both stay in step.
 */
export default function ToolPanel({ toolKey, reference, onClose }: ToolPanelProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-sage/30 bg-white shadow-[0_6px_24px_rgba(74,124,111,0.10)]">
      <div className="flex items-center justify-between gap-3 border-b border-sage/20 bg-sage-pale px-4 py-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-sage">
          {TOOL_LABELS[toolKey] || toolKey}
        </h3>
        <button
          onClick={onClose}
          aria-label="Zavřít nástroj"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-transparent text-sage transition-all hover:border-sage/30 hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4L4 12M4 4l8 8" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        {toolKey === "translations" && <TranslationCompare reference={reference} />}
        {toolKey === "bookContext" && <BibleContextView reference={reference} />}
        {toolKey === "liturgy" && <LiturgicalCalendar />}
        {toolKey === "originals" && <OriginalLanguagesPanel reference={reference} />}
        {toolKey === "commentary" && reference && <CommentaryPanel reference={reference} />}
        {toolKey === "sermons" && reference && <SermonInspirationPanel reference={reference} />}
      </div>
    </section>
  );
}
