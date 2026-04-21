"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
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

/**
 * The drawer's pracovní plocha — one big target: the final sermon text.
 * Planning pieces (jádro, osnova, úvod, závěr) live in the Stavba sub-step
 * and are pulled into this field as bubbles, so nothing gets written twice.
 */
const INSERT_TARGETS: {
  field: keyof SermonArtifacts;
  label: string;
  hint: string;
  rows: number;
}[] = [
  {
    field: "sermonText",
    label: "Celý text kázání",
    hint: "Plný text promluvy — skládej z bublinek",
    rows: 20,
  },
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
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const insertBubble = (bubble: Bubble, field: keyof SermonArtifacts) => {
    const current = (artifacts[field] ?? "").trim();
    const text = bubble.title
      ? `${bubble.title} — ${bubble.body}`
      : bubble.body;
    const next = current ? `${current}\n\n${text}` : text;
    onArtifactChange(field, next);
    // Dispatch event — every useBubbles instance (drawer + SermonPanel button)
    // listens for this and updates its consumed list, keeping the counter in sync.
    dispatchBubbleConsumed(bubble.id);
  };

  const handleInsertTo = (field: keyof SermonArtifacts) => {
    if (!pendingBubble) return;
    insertBubble(pendingBubble, field);
    setPendingBubble(null);
    // Don't auto-close the drawer — the preacher is mid-composition and wants
    // to keep pulling from the stash.
  };

  /**
   * Tap on a bubble: if there's only one possible target (the default setup),
   * insert directly. Otherwise open the picker.
   */
  const handleBubbleTap = (bubble: Bubble) => {
    if (INSERT_TARGETS.length === 1) {
      insertBubble(bubble, INSERT_TARGETS[0].field);
    } else {
      setPendingBubble(bubble);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, bubble: Bubble) => {
    e.dataTransfer.effectAllowed = "move";
    const payload = encodeBubbleDrag(bubble);
    // Both: structured payload (for our drop handler) + plain text (as fallback).
    e.dataTransfer.setData("application/x-kazani-bubble", payload);
    const plain = bubble.title ? `${bubble.title} — ${bubble.body}` : bubble.body;
    e.dataTransfer.setData("text/plain", plain);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Mobile-only backdrop — on desktop the drawer is non-blocking so you can
          still interact with the main content (scroll, drag bubbles into fields). */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-text/35 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — wide two-column workspace on desktop, single column on mobile */}
      <aside
        role="dialog"
        aria-label="Můj zápisník"
        aria-hidden={!open}
        className={`fixed top-0 right-0 bottom-0 z-[61] w-[min(760px,96vw)] bg-off-white shadow-[-4px_0_30px_rgba(0,0,0,0.12)] transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header — title + close */}
        <div className="sticky top-0 z-10 border-b border-border bg-off-white px-5 pt-4 pb-3 md:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-cormorant text-[22px] font-medium leading-tight text-text md:text-[26px]">
                Můj zápisník
              </h2>
              <p className="mt-0.5 font-lora text-[12px] italic leading-snug text-text-muted md:text-[13px]">
                Vlevo skládáš finální text kázání, vpravo máš veškerý nasbíraný materiál — přetáhni bublinku nebo na ni klikni.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Zavřít zápisník"
              className="shrink-0 rounded-lg px-2 py-0.5 text-lg text-text-muted hover:bg-cream hover:text-brick"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body — two-column grid on desktop (composition left, stash right) */}
        <div className="px-5 pb-20 pt-4 md:px-6 md:grid md:grid-cols-[1fr_280px] md:gap-6">
          {/* LEFT column — the single „Celý text kázání" workspace */}
          <section className="mb-6 md:mb-0">
            <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brick">
              Pracovní plocha — celý text kázání
            </h3>
            <p className="mb-3 font-lora text-[11px] italic leading-snug text-text-muted">
              Sem přetáhni bublinky a skládej finální text. Jádro, osnovu, úvod a závěr z fáze Stavba najdeš v zásobníku jako bublinky.
            </p>
            <div className="space-y-3">
              {INSERT_TARGETS.map((t) => (
                <CompositionField
                  key={t.field}
                  label={t.label}
                  hint={t.hint}
                  rows={t.rows}
                  value={artifacts[t.field] ?? ""}
                  onChange={(value) => onArtifactChange(t.field, value)}
                />
              ))}
            </div>
          </section>

          {/* RIGHT column — bubble stash */}
          <section className="md:sticky md:top-[108px] md:self-start md:max-h-[calc(100vh-124px)] md:overflow-y-auto md:pr-1">
            <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Zásobník bublinek
            </h3>

            {/* Filters + count */}
            <div className="mb-3 flex flex-wrap items-center gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                    filter === f.key
                      ? "border-text bg-text text-white"
                      : "border-border bg-white text-text-muted hover:border-text-muted"
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <span className="ml-auto text-[10px] text-text-light">
                {availableCount === 0
                  ? "prázdno"
                  : `${availableCount} ${pluralBublinek(availableCount)}`}
              </span>
            </div>

            {/* Bubble list */}
            {filtered.length === 0 ? (
              <EmptyState hasAny={available.length > 0} filter={filter} />
            ) : (
              <div className="space-y-2.5">
                {filtered.map((bubble) => (
                  <BubbleCard
                    key={bubble.id}
                    bubble={bubble}
                    onDragStart={(e) => handleDragStart(e, bubble)}
                    onTap={() => handleBubbleTap(bubble)}
                  />
                ))}
              </div>
            )}
          </section>
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
    </>,
    document.body
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

interface CompositionFieldProps {
  label: string;
  hint: string;
  rows: number;
  value: string;
  onChange: (value: string) => void;
}

function CompositionField({ label, hint, rows, value, onChange }: CompositionFieldProps) {
  const [drag, setDrag] = useState(false);

  const onDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    if (
      !e.dataTransfer.types.includes("application/x-kazani-bubble") &&
      !e.dataTransfer.types.includes("text/plain")
    ) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!drag) setDrag(true);
  };

  const onDragLeave = () => setDrag(false);

  const onDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(false);

    const bubbleRaw = e.dataTransfer.getData("application/x-kazani-bubble");
    let droppedText = "";
    let bubbleId: string | null = null;
    if (bubbleRaw) {
      try {
        const parsed = JSON.parse(bubbleRaw) as { id?: string; text?: string };
        droppedText = parsed.text ?? "";
        bubbleId = parsed.id ?? null;
      } catch {
        droppedText = e.dataTransfer.getData("text/plain");
      }
    } else {
      droppedText = e.dataTransfer.getData("text/plain");
    }
    if (!droppedText) return;

    const existing = value.trim();
    const next = existing ? `${existing}\n\n${droppedText}` : droppedText;
    onChange(next);
    if (bubbleId) dispatchBubbleConsumed(bubbleId);
  };

  return (
    <div>
      <div className="mb-0.5 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-semibold text-text">{label}</span>
        <span className="text-[10px] italic text-text-light">{hint}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        rows={rows}
        placeholder="Piš nebo sem přetáhni bublinku…"
        className={`w-full resize-y rounded-md border bg-white px-2.5 py-1.5 font-lora text-[12px] leading-relaxed text-text placeholder:text-text-light/40 focus:outline-none transition-all ${
          drag
            ? "border-brick ring-2 ring-brick/25 bg-brick-pale/40"
            : "border-border focus:border-brick/30 focus:ring-1 focus:ring-brick/10"
        }`}
      />
    </div>
  );
}

// Keep the `dispatchBubbleConsumed` import reachable from CompositionField
// (already imported at the top of this file).
