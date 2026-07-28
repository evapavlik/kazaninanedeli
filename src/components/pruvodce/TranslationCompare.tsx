"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  parseReferenceForApi,
  verseInReference,
  fetchChapter,
  fetchChapterBolls,
  isOldTestament,
  type BibleVerse,
} from "@/lib/getbible";
import SelectionPopup from "./SelectionPopup";
import { useTranslationNotes, type TranslationNote } from "@/hooks/useTranslationNotes";
import { annotationCategories, type CategoryId } from "@/data/annotation-categories";

interface TranslationCompareProps {
  reference: string;
}

/**
 * How the translations line up against each other.
 *
 * Both modes align *by verse*, which is what comparing actually means: side-by
 * -side prose columns drift apart after the first verse (the translations have
 * different lengths), so finding v33 means hunting for it in each column
 * separately. "verse" stacks the translations under a verse number and reads
 * top-down; "table" puts each verse on one row so a difference sits at the same
 * height across all columns.
 */
type CompareMode = "verse" | "table";

const MODES: { id: CompareMode; label: string }[] = [
  { id: "verse", label: "Po verši" },
  { id: "table", label: "Tabulka" },
];

interface TranslationSource {
  key: string;
  label: string;
  verses: BibleVerse[];
  /** Hebrew or Greek — the source text, set in a serif face and (for Hebrew) RTL. */
  isOriginal?: boolean;
  isRTL?: boolean;
}

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; original: BibleVerse[]; csp: BibleVerse[]; bkr: BibleVerse[]; isOT: boolean };

export default function TranslationCompare({
  reference,
}: TranslationCompareProps) {
  const [state, setState] = useState<FetchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  // Remembered across visits — a preacher who prefers the table shouldn't have
  // to re-pick it every Sunday.
  const [mode, setMode] = useLocalStorage<CompareMode>("kazani-compare-mode", "verse");

  const fetchTranslations = useCallback(async (ref: string) => {
    const parsed = parseReferenceForApi(ref);
    if (!parsed) {
      setState({
        status: "error",
        message: `Nepoda\u0159ilo se rozpoznat odkaz. Zkus form\u00E1t nap\u0159. \u201EMk 4,1\u201320\u201C.`,
      });
      return;
    }

    // Cancel any in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setState({ status: "loading" });

    try {
      const isOT = isOldTestament(parsed.bookNumber);
      // Original: Hebrew (WLC) for OT, Greek (TR) for NT — both from Bolls
      const originalCode = isOT ? "WLC" : "TR";

      const [originalChapter, cspChapter, bkrChapter] = await Promise.all([
        fetchChapterBolls(parsed.bookNumber, parsed.chapter, originalCode),
        fetchChapterBolls(parsed.bookNumber, parsed.chapter),
        fetchChapter(parsed.bookNumber, parsed.chapter, "bkr"),
      ]);

      // Check if this request was aborted while fetching
      if (abortRef.current?.signal.aborted) return;

      if (!cspChapter && !bkrChapter) {
        setState({
          status: "error",
          message: `Kapitolu se nepoda\u0159ilo na\u010D\u00EDst. Zkontrolujte odkaz a p\u0159ipojen\u00ED k internetu.`,
        });
        return;
      }

      // Segment-aware: discontinuous pericopes ("Mt 13,31-33.44-52") keep
      // exactly the verses the lectionary prescribes — no silent truncation
      // to the first run, no filler verses from the gap.
      const filterVerses = (verses: BibleVerse[]): BibleVerse[] =>
        verses.filter((v) => verseInReference(v.verse, parsed));

      setState({
        status: "success",
        original: originalChapter ? filterVerses(originalChapter.verses) : [],
        csp: cspChapter ? filterVerses(cspChapter.verses) : [],
        bkr: bkrChapter ? filterVerses(bkrChapter.verses) : [],
        isOT,
      });
    } catch {
      if (abortRef.current?.signal.aborted) return;
      setState({
        status: "error",
        message: `Chyba p\u0159i na\u010D\u00EDt\u00E1n\u00ED p\u0159eklad\u016F. Zkus to pros\u00EDm znovu.`,
      });
    }
  }, []);

  useEffect(() => {
    const trimmed = reference.trim();
    if (!trimmed) {
      setState({ status: "idle" });
      return;
    }

    // Debounce to avoid firing on every keystroke
    const timeout = setTimeout(() => {
      fetchTranslations(trimmed);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [reference, fetchTranslations]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // The Czech translations first — that's what gets read — then the source
  // text, which is what you consult once something looks odd.
  const sources: TranslationSource[] = useMemo(() => {
    if (state.status !== "success") return [];
    return [
      { key: "csp", label: "ČSP", verses: state.csp },
      { key: "bkr", label: "Kralická", verses: state.bkr },
      {
        key: "original",
        label: state.isOT ? "Hebrejsky (WLC)" : "Řecky (TR)",
        verses: state.original,
        isOriginal: true,
        isRTL: state.isOT,
      },
    ].filter((s) => s.verses.length > 0);
  }, [state]);

  // Every verse any source has, in order — a translation missing one verse must
  // not shift the rest out of alignment.
  const verseNumbers: number[] = useMemo(() => {
    const all = new Set<number>();
    for (const s of sources) for (const v of s.verses) all.add(v.verse);
    return [...all].sort((a, b) => a - b);
  }, [sources]);

  // ---- Notes -------------------------------------------------------------
  // Selection popup and composers live here rather than in the two layout
  // components, so a note behaves identically whichever mode is on screen.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { notes, add, update, remove } = useTranslationNotes(reference);

  const [pendingSelection, setPendingSelection] = useState<PendingSelection | null>(null);
  const [verseDraft, setVerseDraft] = useState<number | null>(null);
  /** Id of the mark whose note is being written. */
  const [editingNote, setEditingNote] = useState<string | null>(null);

  /**
   * Read the current DOM selection and, if it sits inside one translation's
   * text, offer the category popup. Mirrors AnnotatedTextDisplay: mouseup for
   * pointers, `selectionchange` for touch, where long-press never fires mouseup.
   */
  const updateSelectionFromDom = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setPendingSelection(null);
      return;
    }
    const range = selection.getRangeAt(0);
    const quote = selection.toString().trim();
    if (quote.length < 2) {
      setPendingSelection(null);
      return;
    }
    if (
      !containerRef.current?.contains(range.startContainer) ||
      !containerRef.current?.contains(range.endContainer)
    ) {
      setPendingSelection(null);
      return;
    }

    // Which column and which verse the selection sits in.
    const start = range.startContainer;
    const el = (start.nodeType === 1 ? (start as HTMLElement) : start.parentElement);
    const holder = el?.closest<HTMLElement>("[data-source-key]");
    const verseEl = el?.closest<HTMLElement>("[data-verse]");
    if (!holder || !verseEl) {
      setPendingSelection(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    setPendingSelection({
      x: rect.left + rect.width / 2 - 100,
      y: rect.top,
      quote,
      verse: Number(verseEl.dataset.verse),
      sourceKey: holder.dataset.sourceKey || "",
      sourceLabel: holder.dataset.sourceLabel || "",
    });
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onSelectionChange = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(updateSelectionFromDom, 300);
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [updateSelectionFromDom]);

  /**
   * Picking a category saves the mark straight away — same as marking in the
   * main text, where the note is something you add afterwards if you have one.
   * Nothing to confirm, nothing to lose by not confirming.
   */
  const startMark = useCallback(
    (category: CategoryId) => {
      if (!pendingSelection) return;
      add({
        reference,
        verse: pendingSelection.verse,
        sourceKey: pendingSelection.sourceKey,
        sourceLabel: pendingSelection.sourceLabel,
        quote: pendingSelection.quote,
        category,
        note: "",
      });
      setPendingSelection(null);
      window.getSelection()?.removeAllRanges();
    },
    [pendingSelection, add, reference]
  );

  const saveVerseNote = useCallback(
    (note: string) => {
      if (verseDraft === null) return;
      if (note.trim()) {
        add({
          reference,
          verse: verseDraft,
          sourceKey: "",
          sourceLabel: "",
          note: note.trim(),
        });
      }
      setVerseDraft(null);
    },
    [verseDraft, add, reference]
  );

  // Don't render anything if no reference
  if (!reference.trim()) return null;

  // Don't render in idle state
  if (state.status === "idle") return null;

  const noteProps: NoteProps = {
    notes,
    onRemoveNote: remove,
    verseDraft,
    onStartVerseNote: setVerseDraft,
    onSaveVerseNote: saveVerseNote,
    onCancelVerseNote: () => setVerseDraft(null),
    editingNote,
    onStartEditNote: setEditingNote,
    onSaveEditNote: (id, note) => {
      update(id, note);
      setEditingNote(null);
    },
    onCancelEditNote: () => setEditingNote(null),
  };

  return (
    /* No viewport breakpoints anywhere below. The old layout keyed three prose
       columns off `lg:grid-cols-3` — a *viewport* breakpoint — so in the 330px
       guide rail on a wide screen it still asked for three columns and got
       ~90px each. Both modes here are width-safe by construction: the verse
       layout stacks, the table scrolls. */
    <section>
      <div>
          {/* Loading state */}
          {state.status === "loading" && (
            <div className="flex items-center justify-center gap-2 py-8">
              <svg
                className="h-4 w-4 animate-spin text-sage"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              <span className="text-[12px] text-text-muted">
                {`Načítám…`}
              </span>
            </div>
          )}

          {/* Error state */}
          {state.status === "error" && (
            <div className="py-4 text-center">
              <p className="text-[12px] leading-relaxed text-text-muted">
                {state.message}
              </p>
            </div>
          )}

          {/* Success state */}
          {state.status === "success" && sources.length > 0 && (
            <>
              <div
                className="mb-2 flex flex-wrap items-center gap-1.5"
                role="tablist"
                aria-label="Podoba porovnání"
              >
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    role="tab"
                    aria-selected={mode === m.id}
                    onClick={() => setMode(m.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                      mode === m.id
                        ? "border-brick bg-brick-pale text-brick"
                        : "border-border bg-white text-text-muted hover:text-text"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <p className="mb-4 text-[11.5px] italic text-text-light">
                {`Označ myší kus textu, nebo přidej poznámku k celému verši — obojí se uloží do zápisníku.`}
              </p>

              <div ref={containerRef} onMouseUp={updateSelectionFromDom}>
                {mode === "verse" ? (
                  <VerseByVerse sources={sources} verseNumbers={verseNumbers} {...noteProps} />
                ) : (
                  <CompareTable sources={sources} verseNumbers={verseNumbers} {...noteProps} />
                )}
              </div>
            </>
          )}

          {state.status === "success" && sources.length === 0 && (
            <p className="py-4 text-center text-[12px] italic text-text-muted">
              {`Pro tento odkaz se nepodařilo načíst žádný překlad.`}
            </p>
          )}
      </div>

      {pendingSelection && (
        <SelectionPopup
          position={{ x: pendingSelection.x, y: pendingSelection.y }}
          onSelect={startMark}
          onClose={() => setPendingSelection(null)}
        />
      )}

    </section>
  );
}

// ---------------------------------------------------------------------------
// Note plumbing shared by both layouts
// ---------------------------------------------------------------------------

interface PendingSelection {
  x: number;
  y: number;
  quote: string;
  verse: number;
  sourceKey: string;
  sourceLabel: string;
}

interface NoteProps {
  notes: TranslationNote[];
  onRemoveNote: (id: string) => void;
  verseDraft: number | null;
  onStartVerseNote: (verse: number) => void;
  onSaveVerseNote: (note: string) => void;
  onCancelVerseNote: () => void;
  editingNote: string | null;
  onStartEditNote: (id: string) => void;
  onSaveEditNote: (id: string, note: string) => void;
  onCancelEditNote: () => void;
}

const CATEGORY_BY_ID = Object.fromEntries(
  annotationCategories.map((c) => [c.id, c])
) as Record<CategoryId, (typeof annotationCategories)[number]>;

/** Look up one verse in one source. */
function verseText(source: TranslationSource, n: number): string | null {
  return source.verses.find((v) => v.verse === n)?.text ?? null;
}

const bodyClass = (s: TranslationSource) =>
  `text-[15px] leading-[1.75] text-text ${s.isOriginal ? "font-serif" : "font-literata"}`;

const MISSING = <span className="italic text-text-light">{"—"}</span>;

/**
 * Paint the marked phrases into a verse. Marks are stored as the quoted text
 * rather than character offsets: a translation is refetched on every visit, so
 * a substring survives that round trip where an offset into a particular
 * rendering would not.
 */
function withMarks(text: string, marks: TranslationNote[]): React.ReactNode {
  const spans = marks
    .map((n) => ({ note: n, at: n.quote ? text.indexOf(n.quote) : -1 }))
    .filter((s) => s.at >= 0)
    .sort((a, b) => a.at - b.at);

  if (spans.length === 0) return text;

  const out: React.ReactNode[] = [];
  let cursor = 0;
  for (const { note, at } of spans) {
    if (at < cursor) continue; // overlapping marks — keep the first
    const quote = note.quote as string;
    if (at > cursor) out.push(text.slice(cursor, at));
    out.push(
      <mark
        key={note.id}
        className={`rounded-[2px] bg-transparent ${note.category ? CATEGORY_BY_ID[note.category]?.markBg : ""}`}
        title={note.note || undefined}
      >
        {quote}
      </mark>
    );
    cursor = at + quote.length;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

/**
 * The notes attached to one verse, shown right under it. A mark starts without
 * a note — clicking it opens the field, so writing something is an offer rather
 * than a step you have to get past.
 */
function VerseNotes({
  verse,
  notes,
  onRemove,
  editingNote,
  onStartEditNote,
  onSaveEditNote,
  onCancelEditNote,
}: {
  verse: number;
  notes: TranslationNote[];
  onRemove: (id: string) => void;
} & Pick<NoteProps, "editingNote" | "onStartEditNote" | "onSaveEditNote" | "onCancelEditNote">) {
  const mine = notes.filter((n) => n.verse === verse);
  if (mine.length === 0) return null;

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      {mine.map((n) =>
        editingNote === n.id ? (
          <NoteEditor
            key={n.id}
            initial={n.note}
            quote={n.quote}
            onSave={(text) => onSaveEditNote(n.id, text)}
            onCancel={onCancelEditNote}
          />
        ) : (
          <div
            key={n.id}
            className="flex items-start gap-2 rounded-[9px] border border-sage/25 bg-sage-pale/50 px-2.5 py-2"
          >
            <span className="shrink-0 pt-[2px] text-[9.5px] font-bold uppercase tracking-[0.1em] text-sage">
              {n.category ? CATEGORY_BY_ID[n.category]?.name : "Verš"}
            </span>
            <button
              onClick={() => onStartEditNote(n.id)}
              className="min-w-0 flex-1 text-left text-[12.5px] leading-[1.6] text-text hover:underline"
              title="Upravit poznámku"
            >
              {n.quote && <em className="text-text-muted">{`„${n.quote}" — `}</em>}
              {n.note || (
                <span className="italic text-text-light">{`přidat poznámku…`}</span>
              )}
            </button>
            <button
              onClick={() => onRemove(n.id)}
              aria-label="Smazat poznámku"
              className="shrink-0 rounded p-0.5 text-text-light transition-colors hover:text-brick"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4L4 12M4 4l8 8" />
              </svg>
            </button>
          </div>
        )
      )}
    </div>
  );
}

/** Shared text field for writing a note — on a mark or on a whole verse. */
function NoteEditor({
  initial,
  quote,
  placeholder,
  saveLabel,
  onSave,
  onCancel,
}: {
  initial?: string;
  quote?: string;
  placeholder?: string;
  saveLabel?: string;
  onSave: (note: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initial ?? "");
  return (
    <div className="rounded-[10px] border border-sage bg-sage-pale/40 p-2.5">
      {quote && (
        <p className="mb-1.5 border-l-2 border-sage pl-2 font-literata text-[12.5px] italic text-text-muted">
          {`„${quote}"`}
        </p>
      )}
      <textarea
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? `Poznámka…`}
        className="min-h-[54px] w-full resize-y bg-transparent text-[13.5px] leading-[1.65] text-text outline-none placeholder:text-text-light"
      />
      <div className="mt-1.5 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-[7px] border border-border bg-white px-3 py-1 text-[12px] font-semibold text-text-muted"
        >
          {`Zrušit`}
        </button>
        <button
          onClick={() => onSave(value.trim())}
          className="rounded-[7px] bg-sage px-3 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-sage-light"
        >
          {saveLabel ?? `Uložit`}
        </button>
      </div>
    </div>
  );
}

/** „+ poznámka" — quiet until you are at the verse, then offered. */
function AddNoteButton({ onClick, compact }: { onClick: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-border bg-white font-semibold text-text-light opacity-0 transition-all hover:border-sage hover:text-sage focus-visible:opacity-100 group-hover:opacity-100 ${
        compact ? "px-1.5 py-0.5 text-[11px]" : "px-2.5 py-[3px] text-[11px]"
      }`}
    >
      {compact ? "+" : `+ poznámka`}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Layouts
// ---------------------------------------------------------------------------

/**
 * Verse number as a heading, translations stacked beneath it. Reads top-down,
 * one verse at a time, and holds up at any width — so it is the default.
 */
function VerseByVerse({
  sources,
  verseNumbers,
  notes,
  onRemoveNote,
  verseDraft,
  onStartVerseNote,
  onSaveVerseNote,
  onCancelVerseNote,
  editingNote,
  onStartEditNote,
  onSaveEditNote,
  onCancelEditNote,
}: {
  sources: TranslationSource[];
  verseNumbers: number[];
} & NoteProps) {
  return (
    <div>
      {verseNumbers.map((n) => (
        <div
          key={n}
          data-verse={n}
          className="group border-t border-border py-3.5 first:border-t-0 first:pt-0"
        >
          <div className="mb-1.5 flex items-center gap-2.5">
            <p className="font-cormorant text-[15px] font-bold tracking-[0.02em] text-brick">
              {n}
            </p>
            <AddNoteButton onClick={() => onStartVerseNote(n)} />
          </div>

          {sources.map((s) => (
            <div key={s.key} className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 py-0.5">
              <p className="pt-[5px] text-[10.5px] font-bold uppercase leading-tight tracking-[0.12em] text-sage">
                {s.label}
              </p>
              <p
                className={bodyClass(s)}
                dir={s.isRTL ? "rtl" : undefined}
                data-source-key={s.key}
                data-source-label={s.label}
              >
                {verseText(s, n)
                  ? withMarks(
                      verseText(s, n) as string,
                      notes.filter((x) => x.verse === n && x.sourceKey === s.key)
                    )
                  : MISSING}
              </p>
            </div>
          ))}

          <VerseNotes
            verse={n}
            notes={notes}
            onRemove={onRemoveNote}
            editingNote={editingNote}
            onStartEditNote={onStartEditNote}
            onSaveEditNote={onSaveEditNote}
            onCancelEditNote={onCancelEditNote}
          />
          {verseDraft === n && (
            <NoteEditor
              placeholder={`Co tě u toho napadlo? Např. „Kralická ‚zadělala\', ČSP ‚skryla\' — kvas se do těsta zapracovává, ne ukrývá."`}
              saveLabel={`Uložit do zápisníku`}
              onSave={onSaveVerseNote}
              onCancel={onCancelVerseNote}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * One row per verse, one column per translation. A difference sits at the same
 * height across all columns, so it is visible without hunting for it. Scrolls
 * sideways rather than squeezing when the container is too narrow.
 */
function CompareTable({
  sources,
  verseNumbers,
  notes,
  onRemoveNote,
  verseDraft,
  onStartVerseNote,
  onSaveVerseNote,
  onCancelVerseNote,
  editingNote,
  onStartEditNote,
  onSaveEditNote,
  onCancelEditNote,
}: {
  sources: TranslationSource[];
  verseNumbers: number[];
} & NoteProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-[58px] border-b border-border pb-2.5 pr-3 text-left" />
            {sources.map((s) => (
              <th
                key={s.key}
                className="min-w-[170px] border-b border-border px-3 pb-2.5 text-left text-[10.5px] font-bold uppercase tracking-[0.12em] text-sage"
              >
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {verseNumbers.map((n) => {
            const mine = notes.filter((x) => x.verse === n);
            const extra = mine.length > 0 || verseDraft === n;
            return (
              <tr key={n} data-verse={n} className="group align-top">
                <td className={`py-2.5 pr-3 ${extra ? "" : "border-b border-border"}`}>
                  <span className="font-cormorant text-[14px] font-bold text-brick">{n}</span>
                  <span className="ml-1.5 inline-block">
                    <AddNoteButton compact onClick={() => onStartVerseNote(n)} />
                  </span>
                </td>
                {sources.map((s, i) => (
                  <td
                    key={s.key}
                    dir={s.isRTL ? "rtl" : undefined}
                    data-source-key={s.key}
                    data-source-label={s.label}
                    className={`px-3 py-2.5 ${extra ? "" : "border-b border-border"} ${bodyClass(s)}`}
                  >
                    {verseText(s, n)
                      ? withMarks(
                          verseText(s, n) as string,
                          notes.filter((x) => x.verse === n && x.sourceKey === s.key)
                        )
                      : MISSING}
                    {/* Notes hang off the last column so they get the full row width. */}
                    {extra && i === sources.length - 1 && (
                      <div className="font-jakarta">
                        <VerseNotes
            verse={n}
            notes={notes}
            onRemove={onRemoveNote}
            editingNote={editingNote}
            onStartEditNote={onStartEditNote}
            onSaveEditNote={onSaveEditNote}
            onCancelEditNote={onCancelEditNote}
          />
                        {verseDraft === n && (
                          <NoteEditor
              placeholder={`Co tě u toho napadlo? Např. „Kralická ‚zadělala\', ČSP ‚skryla\' — kvas se do těsta zapracovává, ne ukrývá."`}
              saveLabel={`Uložit do zápisníku`}
              onSave={onSaveVerseNote}
              onCancel={onCancelVerseNote}
            />
                        )}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
