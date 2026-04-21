"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type Bubble,
  type BubbleCategory,
  dispatchBubbleConsumed,
  encodeBubbleDrag,
  useBubbles,
} from "@/hooks/useBubbles";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";

interface BubbleDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Current artifacts — needed so the tap-to-insert menu can append to a field's current value. */
  artifacts: SermonArtifacts;
  /** Writes an artifact value back to storage. */
  onArtifactChange: (field: keyof SermonArtifacts, value: string) => void;
}

type FilterKey = "all" | "annotation" | "notebook" | "artifact";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Vše" },
  { key: "annotation", label: "Anotace" },
  { key: "notebook", label: "Zápisníčky" },
  { key: "artifact", label: "Odpovědi" },
];

/** Fields the user can insert a bubble into (sermon composition fields). */
const INSERT_TARGETS: { field: keyof SermonArtifacts; label: string; hint: string }[] = [
  { field: "sermonThesis", label: "Jádro kázání", hint: "Jednou větou" },
  { field: "outlinePoints", label: "Osnova", hint: "Hlavní body" },
  { field: "intro", label: "Úvod", hint: "Jak vtáhnout posluchače" },
  { field: "conclusion", label: "Závěr", hint: "Jak shrnout a poslat dál" },
  { field: "sermonText", label: "Celé kázání", hint: "Plný text promluvy" },
];

/** Category -> left-border color class. */
const CATEGORY_BORDER: Record<BubbleCategory, string> = {
  keyword: "border-brick",
  actor: "border-sage",
  tension: "border-sand",
  question: "border-[#7b5ea7]",
  notebook: "border-text-light",
  artifact: "border-sage-light",
};

/** Category -> tag text color. */
const CATEGORY_TAG: Record<BubbleCategory, string> = {
  keyword: "text-brick",
  actor: "text-sage",
  tension: "text-[#8a6d38]",
  question: "text-[#7b5ea7]",
  notebook: "text-text-muted",
  artifact: "text-sage",
};

/** Category -> subtle background. */
const CATEGORY_BG: Record<BubbleCategory, string> = {
  keyword: "bg-white",
  actor: "bg-white",
  tension: "bg-white",
  question: "bg-white",
  notebook: "bg-cream/40",
  artifact: "bg-sage-pale/40",
};

export default function BubbleDrawer({
  open,
  onClose,
  artifacts,
  onArtifactChange,
}: BubbleDrawerProps) {
  const { available, refresh, availableCount } = useBubbles();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [pendingBubble, setPendingBubble] = useState<Bubble | null>(null);

  // Refresh sources each time the drawer is opened (artifacts/notes/annotations
  // may have changed while the drawer was closed).
  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (pendingBubble) setPendingBubble(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, pendingBubble]);

  const filtered = useMemo(() => {
    if (filter === "all") return available;
    return available.filter((b) => b.source === filter);
  }, [available, filter]);

  const handleInsertTo = (field: keyof SermonArtifacts) => {
    if (!pendingBubble) return;
    const current = (artifacts[field] ?? "").trim();
    const text = pendingBubble.title
      ? `${pendingBubble.title} — ${pendingBubble.body}`
      : pendingBubble.body;
    const next = current ? `${current}\n\n${text}` : text;
    onArtifactChange(field, next);
    // Dispatch event — every useBubbles instance (drawer + SermonPanel button)
    // listens for this and updates its consumed list, keeping the counter in sync.
    dispatchBubbleConsumed(pendingBubble.id);
    setPendingBubble(null);
    onClose();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, bubble: Bubble) => {
    e.dataTransfer.effectAllowed = "move";
    const payload = encodeBubbleDrag(bubble);
    // Both: structured payload (for our drop handler) + plain text (as fallback).
    e.dataTransfer.setData("application/x-kazani-bubble", payload);
    const plain = bubble.title ? `${bubble.title} — ${bubble.body}` : bubble.body;
    e.dataTransfer.setData("text/plain", plain);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-text/35 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Můj zápisník"
        aria-hidden={!open}
        className={`fixed top-0 right-0 bottom-0 z-[61] w-[min(720px,92vw)] bg-off-white shadow-[-4px_0_30px_rgba(0,0,0,0.12)] transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-off-white px-6 pt-5 pb-3 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-cormorant text-[26px] font-medium leading-tight text-text md:text-[30px]">
                Můj zápisník
              </h2>
              <p className="mt-1 font-lora text-[13px] italic leading-snug text-text-muted">
                Všechno, co sis zaznamenala — vyber bublinku a přetáhni ji do kázání. Po vložení se skryje.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Zavřít zápisník"
              className="shrink-0 rounded-lg px-2.5 py-1 text-lg text-text-muted hover:bg-cream hover:text-brick"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                  filter === f.key
                    ? "border-text bg-text text-white"
                    : "border-border bg-white text-text-muted hover:border-text-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto self-center text-[11px] text-text-light">
              {availableCount === 0
                ? "prázdno"
                : `${availableCount} ${pluralBublinek(availableCount)}`}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-24 pt-4 md:px-8">
          {filtered.length === 0 ? (
            <EmptyState hasAny={available.length > 0} filter={filter} />
          ) : (
            <div className="space-y-2.5">
              {filtered.map((bubble) => (
                <BubbleCard
                  key={bubble.id}
                  bubble={bubble}
                  onDragStart={(e) => handleDragStart(e, bubble)}
                  onTap={() => setPendingBubble(bubble)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Insert target chooser (mobile / tap path) */}
      {pendingBubble && (
        <InsertTargetSheet
          bubble={pendingBubble}
          onPick={handleInsertTo}
          onCancel={() => setPendingBubble(null)}
        />
      )}
    </>
  );
}

// ────────────────────────────────────────────────────────────────
// Subcomponents
// ────────────────────────────────────────────────────────────────

interface BubbleCardProps {
  bubble: Bubble;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onTap: () => void;
}

function BubbleCard({ bubble, onDragStart, onTap }: BubbleCardProps) {
  const border = CATEGORY_BORDER[bubble.category];
  const tagColor = CATEGORY_TAG[bubble.category];
  const bg = CATEGORY_BG[bubble.category];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onTap}
      className={`group cursor-grab select-none rounded-lg border border-border border-l-[3px] ${border} ${bg} px-4 py-3 shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md active:cursor-grabbing`}
      title="Přetáhni do pole kázání — nebo klikni a vyber"
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${tagColor}`}
        >
          {bubble.tag}
        </span>
        <span
          aria-hidden="true"
          className="text-sm text-text-light opacity-0 transition-opacity group-hover:opacity-100"
        >
          ↗
        </span>
      </div>
      {bubble.title && (
        <div className="mb-1 font-literata text-[14px] font-semibold leading-snug text-text">
          {bubble.title}
        </div>
      )}
      <div className="font-lora text-[13px] leading-relaxed text-text line-clamp-4">
        {bubble.body}
      </div>
    </div>
  );
}

function EmptyState({ hasAny, filter }: { hasAny: boolean; filter: FilterKey }) {
  if (!hasAny) {
    return (
      <div className="py-16 text-center">
        <div className="mb-3 text-3xl opacity-30">📓</div>
        <p className="font-lora text-[14px] italic leading-relaxed text-text-muted">
          Zápisník je prázdný.
          <br />
          Jak budeš procházet text — anotovat, odpovídat na otázky, psát do zápisníčků —
          bublinky se začnou objevovat tady.
        </p>
      </div>
    );
  }
  return (
    <div className="py-10 text-center">
      <p className="font-lora text-[13px] italic text-text-muted">
        V&nbsp;kategorii {FILTERS.find((f) => f.key === filter)?.label.toLowerCase()} zatím nic není.
      </p>
    </div>
  );
}

interface InsertTargetSheetProps {
  bubble: Bubble;
  onPick: (field: keyof SermonArtifacts) => void;
  onCancel: () => void;
}

function InsertTargetSheet({ bubble, onPick, onCancel }: InsertTargetSheetProps) {
  const preview = bubble.title ? `${bubble.title} — ${bubble.body}` : bubble.body;

  return (
    <>
      <div
        onClick={onCancel}
        className="fixed inset-0 z-[70] bg-text/40 transition-opacity"
      />
      <div
        role="dialog"
        aria-label="Vložit bublinku do pole"
        className="fixed bottom-0 left-0 right-0 z-[71] rounded-t-2xl bg-white p-5 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:left-1/2 md:right-auto md:bottom-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:rounded-2xl"
      >
        <h3 className="mb-3 font-lora text-[15px] font-semibold text-text">
          Vložit do kázání
        </h3>

        <div className="mb-4 max-h-24 overflow-y-auto rounded-lg bg-cream px-3 py-2 font-lora text-[12px] italic leading-snug text-text-muted">
          {preview}
        </div>

        <ul className="divide-y divide-border">
          {INSERT_TARGETS.map((t) => (
            <li key={t.field}>
              <button
                onClick={() => onPick(t.field)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left transition-colors hover:text-brick"
              >
                <span>
                  <span className="block text-[14px] font-medium text-text">
                    {t.label}
                  </span>
                  <span className="block text-[11px] text-text-light">{t.hint}</span>
                </span>
                <span className="text-text-light">→</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onCancel}
          className="mt-3 w-full rounded-lg bg-cream px-4 py-2.5 text-[13px] font-medium text-text-muted hover:bg-border"
        >
          Zrušit
        </button>
      </div>
    </>
  );
}

function pluralBublinek(n: number): string {
  if (n === 1) return "bublinka";
  if (n >= 2 && n <= 4) return "bublinky";
  return "bublinek";
}
