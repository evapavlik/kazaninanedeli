"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  type Bubble,
  type BubbleCategory,
  type BubbleDragPayload,
  decodeBubbleDrag,
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
  const { available, all, refresh, availableCount, restore } = useBubbles();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingBubble, setPendingBubble] = useState<Bubble | null>(null);
  const [mounted, setMounted] = useState(false);
  /**
   * Attention wiggle — when the drawer opens we wiggle the first few bubbles
   * so the preacher sees they're interactive. After the first drag / tap
   * we keep quiet for the rest of the session.
   */
  const [wiggle, setWiggle] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  /**
   * Undo toast — after any insert (tap or drop), we show a 5-second toast
   * with an „Vrátit" button. Clicking it restores the bubble AND rolls back
   * the text that was just appended to the target field.
   */
  const [undoState, setUndoState] = useState<{
    bubble: Bubble;
    field: keyof SermonArtifacts;
    previousValue: string;
  } | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Portal target is only available on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger the wiggle each time the drawer opens, unless the preacher has
  // already dragged or tapped a bubble in this session.
  useEffect(() => {
    if (!open) return;
    if (hasInteracted) return;
    setWiggle(true);
    const t = setTimeout(() => setWiggle(false), 1500);
    return () => clearTimeout(t);
  }, [open, hasInteracted]);

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

  /**
   * The list rendered in the stash combines:
   * - all unconsumed bubbles (normal, draggable cards)
   * - consumed *artifact* bubbles (faded, non-draggable "použito" cards)
   *
   * Consumed annotations and notebooks still disappear — they're ephemeral
   * inspiration. Consumed artifacts stick around so the preacher sees what
   * they've already pulled from their own planning.
   */
  const visibleBubbles = useMemo(() => {
    const result: Array<Bubble & { consumed?: boolean }> = [];
    for (const b of available) result.push(b);
    for (const b of all) {
      if (b.source !== "artifact") continue;
      if (available.find((a) => a.id === b.id)) continue; // already added
      result.push({ ...b, consumed: true });
    }
    return result;
  }, [available, all]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list = visibleBubbles;
    if (filter !== "all") list = list.filter((b) => b.source === filter);
    if (normalizedQuery) {
      list = list.filter((b) => {
        const hay = `${b.tag} ${b.title ?? ""} ${b.body}`.toLowerCase();
        return hay.includes(normalizedQuery);
      });
    }
    return list;
  }, [visibleBubbles, filter, normalizedQuery]);

  /** Counts per source — used in filter chips. */
  const sourceCounts = useMemo(() => {
    const c: Record<FilterKey, number> = {
      all: visibleBubbles.length,
      annotation: 0,
      notebook: 0,
      artifact: 0,
    };
    for (const b of visibleBubbles) {
      if (b.source === "annotation") c.annotation += 1;
      else if (b.source === "notebook") c.notebook += 1;
      else if (b.source === "artifact") c.artifact += 1;
    }
    return c;
  }, [visibleBubbles]);

  const insertBubble = (bubble: Bubble, field: keyof SermonArtifacts) => {
    const previousValue = artifacts[field] ?? "";
    const current = previousValue.trim();
    const text = bubble.title
      ? `${bubble.title} — ${bubble.body}`
      : bubble.body;
    const next = current ? `${current}\n\n${text}` : text;
    onArtifactChange(field, next);
    // Dispatch event — every useBubbles instance (drawer + SermonPanel button)
    // listens for this and updates its consumed list, keeping the counter in sync.
    dispatchBubbleConsumed(bubble.id);

    // Fire a 5-second undo toast. Replaces any previous pending undo.
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoState({ bubble, field, previousValue });
    undoTimerRef.current = setTimeout(() => {
      setUndoState(null);
      undoTimerRef.current = null;
    }, 5000);
  };

  const handleUndo = () => {
    if (!undoState) return;
    onArtifactChange(undoState.field, undoState.previousValue);
    restore(undoState.bubble.id);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = null;
    setUndoState(null);
  };

  // Clear the undo timer on unmount
  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    };
  }, []);

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
    // Any interaction counts — silence the attention wiggle from now on.
    setHasInteracted(true);
    setWiggle(false);
    if (INSERT_TARGETS.length === 1) {
      insertBubble(bubble, INSERT_TARGETS[0].field);
    } else {
      setPendingBubble(bubble);
    }
  };

  /**
   * Drop a bubble into one of the composition fields inside the drawer.
   * Routes through `insertBubble` so the undo toast fires the same way
   * the tap path does.
   */
  const handleBubbleDrop = (payload: BubbleDragPayload, field: keyof SermonArtifacts) => {
    setHasInteracted(true);
    setWiggle(false);
    const bubble = all.find((b) => b.id === payload.id);
    if (bubble) {
      insertBubble(bubble, field);
    } else {
      // Fallback — the drop carried text but no known bubble (e.g. from
      // another app). Just append it.
      const current = (artifacts[field] ?? "").trim();
      const next = current ? `${current}\n\n${payload.text}` : payload.text;
      onArtifactChange(field, next);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, bubble: Bubble) => {
    e.dataTransfer.effectAllowed = "move";
    const payload = encodeBubbleDrag(bubble);
    // Both: structured payload (for our drop handler) + plain text (as fallback).
    e.dataTransfer.setData("application/x-kazani-bubble", payload);
    const plain = bubble.title ? `${bubble.title} — ${bubble.body}` : bubble.body;
    e.dataTransfer.setData("text/plain", plain);
    // The preacher now knows bubbles are draggable — suppress the attention wiggle.
    setHasInteracted(true);
    setWiggle(false);
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
                  onBubbleDrop={(payload) => handleBubbleDrop(payload, t.field)}
                />
              ))}
            </div>
          </section>

          {/* RIGHT column — bubble stash */}
          <section className="md:sticky md:top-[108px] md:self-start md:max-h-[calc(100vh-124px)] md:overflow-y-auto md:pr-1">
            <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Zásobník bublinek
            </h3>

            {/* Search input */}
            <div className="mb-2 relative">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-light"
              >
                <circle cx="7" cy="7" r="4" />
                <path d="M13 13l-3-3" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledej v bublinkách…"
                className="w-full rounded-md border border-border bg-white pl-7 pr-2 py-1 text-[11px] text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-1 focus:ring-brick/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Vymazat hledání"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded px-1 text-[14px] text-text-light hover:text-brick"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filters + count */}
            <div className="mb-3 flex flex-wrap items-center gap-1">
              {FILTERS.map((f) => {
                const count = sourceCounts[f.key];
                return (
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
                    {count > 0 && (
                      <span className="ml-1 opacity-70">{count}</span>
                    )}
                  </button>
                );
              })}
              <span className="ml-auto text-[10px] text-text-light">
                {availableCount === 0
                  ? "vše použito"
                  : `${availableCount} ${pluralBublinek(availableCount)}`}
              </span>
            </div>

            {/* Bubble list */}
            {filtered.length === 0 ? (
              <EmptyState
                kind={
                  normalizedQuery
                    ? "no-search-match"
                    : all.length === 0
                      ? "nothing-collected"
                      : availableCount === 0
                        ? "all-used"
                        : "category-empty"
                }
                filter={filter}
              />
            ) : (
              <div className="space-y-2.5">
                {filtered.map((bubble, index) => (
                  <BubbleCard
                    key={bubble.id}
                    bubble={bubble}
                    consumed={bubble.consumed ?? false}
                    // Wiggle the first three *active* bubbles, staggered, to
                    // signal they're interactive. Consumed cards sit still.
                    wiggleDelayMs={wiggle && !bubble.consumed && index < 3 ? 100 + index * 90 : null}
                    onDragStart={(e) => handleDragStart(e, bubble)}
                    onTap={() =>
                      bubble.consumed ? restore(bubble.id) : handleBubbleTap(bubble)
                    }
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

      {/* Undo toast — appears after every insert, auto-dismisses after 5s */}
      {undoState && open && (
        <div
          role="status"
          aria-live="polite"
          data-testid="undo-toast"
          className="fixed bottom-6 right-6 z-[62] flex items-center gap-3 rounded-lg bg-text text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] px-4 py-2.5 md:right-10"
          style={{ animation: "fadeInUp 200ms ease-out" }}
        >
          <span className="text-[13px]">Vloženo do kázání</span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px] font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7a4 4 0 0 1 4-4h3M10 3l-2-2M10 3l-2 2" />
            </svg>
            Vrátit
          </button>
        </div>
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
  /** When true, render as a faded „použito" badge (artifact bubbles after insert). */
  consumed: boolean;
  /**
   * When set, the card plays a single `bubbleWiggle` animation starting
   * after this many ms — used for the attention wiggle on drawer open.
   * `null` means no wiggle.
   */
  wiggleDelayMs: number | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onTap: () => void;
}

function BubbleCard({
  bubble,
  consumed,
  wiggleDelayMs,
  onDragStart,
  onTap,
}: BubbleCardProps) {
  const border = CATEGORY_BORDER[bubble.category];
  const tagColor = CATEGORY_TAG[bubble.category];
  const bg = CATEGORY_BG[bubble.category];
  const cardRef = useRef<HTMLDivElement>(null);

  const wiggleStyle: React.CSSProperties | undefined =
    wiggleDelayMs !== null
      ? {
          animation: `bubbleWiggle 600ms ease-in-out ${wiggleDelayMs}ms 1 both`,
        }
      : undefined;

  const handleDragStartWrapped = (e: React.DragEvent<HTMLDivElement>) => {
    // Use the card itself as the drag image so the preacher sees exactly
    // what they're moving — browsers' default ghost is a washed-out box.
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(
        cardRef.current,
        rect.width / 2,
        rect.height / 2
      );
    }
    onDragStart(e);
  };

  if (consumed) {
    return (
      <div
        className={`group relative cursor-pointer select-none rounded-lg border border-dashed border-border border-l-[3px] ${border} ${bg} px-4 py-3 opacity-40 transition-opacity hover:opacity-70`}
        onClick={onTap}
        title="Vrátit do zásobníku"
      >
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${tagColor}`}>
            {bubble.tag}
          </span>
          <span className="rounded-full bg-text/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-text-muted">
            použito · klikni pro vrácení
          </span>
        </div>
        {bubble.title && (
          <div className="mb-1 font-literata text-[14px] font-semibold leading-snug text-text line-clamp-2">
            {bubble.title}
          </div>
        )}
        <div className="font-lora text-[13px] leading-relaxed text-text line-clamp-2">
          {bubble.body}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={handleDragStartWrapped}
      onClick={onTap}
      style={wiggleStyle}
      className={`group relative cursor-grab select-none rounded-lg border border-border border-l-[3px] ${border} ${bg} pl-7 pr-4 py-3 shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md active:cursor-grabbing`}
      title="Přetáhni do pole kázání — nebo klikni"
    >
      {/* Grip dots — drag affordance */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-30 transition-opacity group-hover:opacity-70"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex gap-[3px]">
            <span className="block h-[3px] w-[3px] rounded-full bg-text-muted" />
            <span className="block h-[3px] w-[3px] rounded-full bg-text-muted" />
          </span>
        ))}
      </span>
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

type EmptyStateKind =
  | "nothing-collected"
  | "all-used"
  | "category-empty"
  | "no-search-match";

function EmptyState({ kind, filter }: { kind: EmptyStateKind; filter: FilterKey }) {
  if (kind === "nothing-collected") {
    return (
      <div className="py-12 text-center">
        <div className="mb-3 text-3xl opacity-30">📓</div>
        <p className="font-lora text-[14px] italic leading-relaxed text-text-muted">
          Zápisník je zatím prázdný.
          <br />
          Jak budeš procházet text — anotovat, odpovídat na otázky, psát do zápisníčků —
          bublinky se začnou objevovat tady.
        </p>
      </div>
    );
  }
  if (kind === "all-used") {
    return (
      <div className="py-12 text-center">
        <div className="mb-3 text-3xl">✨</div>
        <p className="font-lora text-[14px] italic leading-relaxed text-text-muted">
          Hezká práce — všechno jsi už použila.
          <br />
          <span className="text-text-light">
            Potřebuješ něco vrátit? Klikni na vyblednutou bublinku nahoře.
          </span>
        </p>
      </div>
    );
  }
  if (kind === "no-search-match") {
    return (
      <div className="py-10 text-center">
        <p className="font-lora text-[13px] italic text-text-muted">
          Nic se nenašlo. Zkus jiná slova.
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
  /** When a bubble is dropped, the parent owns insertion (so undo toast fires). */
  onBubbleDrop: (payload: BubbleDragPayload) => void;
}

function CompositionField({
  label,
  hint,
  rows,
  value,
  onChange,
  onBubbleDrop,
}: CompositionFieldProps) {
  const [drag, setDrag] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Flash a „✓ Uloženo" indicator shortly after every change.
  useEffect(() => {
    if (value.length === 0) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setSaved(true);
      const hideTimer = setTimeout(() => setSaved(false), 1500);
      return () => clearTimeout(hideTimer);
    }, 400);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [value]);

  const wordCount = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [value]);
  // Reading time estimate: avg 130 words/minute for spoken sermon (slower than silent reading)
  const readingMinutes = Math.max(1, Math.round(wordCount / 130));

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
    const payload = bubbleRaw ? decodeBubbleDrag(bubbleRaw) : null;
    if (payload) {
      onBubbleDrop(payload);
      return;
    }
    // Plain text drop (not one of our bubbles) — append as-is via onChange.
    const plain = e.dataTransfer.getData("text/plain");
    if (!plain) return;
    const existing = value.trim();
    const next = existing ? `${existing}\n\n${plain}` : plain;
    onChange(next);
  };

  return (
    <div>
      <div className="mb-0.5 flex items-baseline justify-between gap-2">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-text">
          {label}
          <span
            className={`text-[10px] font-normal text-sage transition-opacity duration-300 ${
              saved ? "opacity-100" : "opacity-0"
            }`}
          >
            ✓ Uloženo
          </span>
        </span>
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
      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-text-light">
        <span className="italic">
          Toto je stejné pole jako ve fázi <span className="font-medium text-text-muted">Formulace</span> — text se ukládá společně.
        </span>
        {wordCount > 0 && (
          <span className="whitespace-nowrap font-medium">
            {wordCount} {wordCount === 1 ? "slovo" : wordCount < 5 ? "slova" : "slov"} · ≈ {readingMinutes} min
          </span>
        )}
      </div>
    </div>
  );
}

// Keep the `dispatchBubbleConsumed` import reachable from CompositionField
// (already imported at the top of this file).
