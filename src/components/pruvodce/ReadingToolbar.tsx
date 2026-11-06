"use client";

import { useBubbles } from "@/hooks/useBubbles";

/** Tools worth reaching for while reading, in the order they get used. */
const TOOLS: { key: string; label: string }[] = [
  { key: "translations", label: "Překlady" },
  { key: "originals", label: "Originál" },
  { key: "bookContext", label: "Kontext" },
  { key: "commentary", label: "Komentář" },
];

interface ReadingToolbarProps {
  activeTool: string | null;
  onOpenTool: (key: string) => void;
  onOpenNotebook: () => void;
  onOpenSermon: () => void;
  focus: boolean;
  onToggleFocus: () => void;
}

/**
 * Tools and the notebook, floating under the text instead of standing in
 * columns beside it.
 *
 * The reading screen has one job — the text — so everything else waits at the
 * edge. In „soustředění" the bar fades out entirely: nothing on screen but
 * scripture.
 */
export default function ReadingToolbar({
  activeTool,
  onOpenTool,
  onOpenNotebook,
  onOpenSermon,
  focus,
  onToggleFocus,
}: ReadingToolbarProps) {
  const { availableCount } = useBubbles();

  return (
    <div
      className={`pointer-events-none sticky bottom-5 z-30 mt-10 flex justify-center px-4 transition-opacity duration-300 ${
        focus ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={focus}
    >
      <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-white/95 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur">
        {TOOLS.map((t) => (
          <button
            key={t.key}
            onClick={() => onOpenTool(t.key)}
            className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
              activeTool === t.key
                ? "bg-brick-pale text-brick"
                : "text-text-muted hover:bg-cream hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}

        <span className="mx-1 h-5 w-px bg-border" />

        <button
          onClick={onToggleFocus}
          title="Ztlumit všechno kolem textu"
          className="rounded-full px-3.5 py-2 text-[13px] font-medium text-text-muted transition-colors hover:bg-cream hover:text-text"
        >
          {`Soustředění`}
        </button>

        <button
          onClick={onOpenSermon}
          className="rounded-full px-3.5 py-2 text-[13px] font-medium text-text-muted transition-colors hover:bg-cream hover:text-text"
        >
          {`Moje kázání`}
        </button>

        <button
          onClick={onOpenNotebook}
          className="ml-0.5 rounded-full bg-brick px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brick-light"
        >
          {`Zápisník`}
          {availableCount > 0 && (
            <span className="ml-1.5 opacity-80">{availableCount}</span>
          )}
        </button>
      </div>
    </div>
  );
}
