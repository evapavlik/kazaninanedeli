"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSunday, formatCzechDate } from "@/hooks/useSunday";
import type { ArchivedSunday } from "@/lib/sunday-storage";

/**
 * The Sunday's name above the text, with the way to start a new one. Nothing
 * else — the readings themselves are tabs inside the text panel.
 */
export function SundayHeader() {
  const sunday = useSunday();
  const [dialog, setDialog] = useState(false);
  const name = sunday.entry?.sundayName ?? sunday.meta?.name ?? sunday.target?.name;
  const date = sunday.meta?.id ?? sunday.target?.id;
  if (!name) return null;

  const isTarget = !sunday.meta || sunday.meta.id === sunday.target?.id;

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-lora text-[15px] font-bold text-text">{name}</p>
          {date && date !== "unknown" && (
            <p className="text-[12.5px] text-text-light">{formatCzechDate(date)}</p>
          )}
        </div>
        {sunday.target && !isTarget && (
          <button
            onClick={() => (sunday.hasWork ? setDialog(true) : sunday.startNew(false))}
            className="shrink-0 rounded-lg border border-border bg-white px-3 py-1.5 text-[12px] font-semibold text-text-muted transition-colors hover:border-brick hover:text-brick"
          >
            {`Nová neděle`}
          </button>
        )}
      </div>
      {dialog && <NewSundayDialog onClose={() => setDialog(false)} />}
    </>
  );
}

/**
 * Shown when the work on the desk belongs to a different Sunday than the one
 * the calendar points at — typically after a break. The app noticed; the
 * preacher doesn't have to go looking for a button.
 */
export function ReturningBanner() {
  const sunday = useSunday();
  const [dialog, setDialog] = useState(false);
  // When even the Sunday can't be named, at least say which text it is.
  const [currentRef] = useLocalStorage<string>("kazani-bible-ref", "");
  if (!sunday.stale || !sunday.target) return null;

  const oldName = sunday.meta?.name;
  const oldDate = sunday.meta?.id && sunday.meta.id !== "unknown" ? formatCzechDate(sunday.meta.id) : null;
  const s = sunday.summary;
  const whatIsThere = [
    s?.annotations ? `${s.annotations} označení` : null,
    s?.translationNotes ? `${s.translationNotes} poznámek k překladům` : null,
    s?.hasSermonText ? "text kázání" : s?.centralIdea ? "centrální myšlenka" : null,
  ].filter(Boolean);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-brick/25 bg-brick-pale px-4 py-3 text-[13px] leading-relaxed">
        <div className="min-w-[260px] flex-1">
          <span className="font-semibold text-brick">{`Vítej zpátky.`}</span>{" "}
          {oldName ? (
            <>
              {`Na stole ti leží `}
              <b>{oldName}</b>
              {oldDate ? ` (${oldDate})` : ""}
              {`.`}
            </>
          ) : (
            <>
              {`Na stole ti leží rozpracovaná příprava`}
              {currentRef ? <> {`k textu `}<b>{currentRef}</b></> : null}
              {whatIsThere.length > 0 ? ` (${whatIsThere.join(" · ")})` : ""}
              {`.`}
            </>
          )}
          <span className="block text-[12px] text-text-muted">
            {`Příprava teď míří na `}
            <b>{formatCzechDate(sunday.target.id)}</b>
            {` — ${sunday.target.name}.`}
          </span>
        </div>
        <button
          onClick={sunday.continueOld}
          className="rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-text-muted transition-colors hover:text-text"
        >
          {`Pokračovat v minulé`}
        </button>
        <button
          onClick={() => setDialog(true)}
          className="rounded-lg bg-brick px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-brick-light"
        >
          {`Připravit ${formatCzechDate(sunday.target.id).replace(/ \d{4}$/, "")}`}
        </button>
      </div>
      {dialog && <NewSundayDialog onClose={() => setDialog(false)} />}
    </>
  );
}

/** What to do with the unfinished Sunday before starting the next: keep it, or let it go. */
function NewSundayDialog({ onClose }: { onClose: () => void }) {
  const sunday = useSunday();
  const s = sunday.summary;
  const name = sunday.meta?.name ?? "Rozpracovaná příprava";

  const parts: string[] = [];
  if (s) {
    if (s.annotations) parts.push(`${s.annotations} označení v textu`);
    if (s.translationNotes) parts.push(`${s.translationNotes} poznámek k překladům`);
    if (s.hasSermonText) parts.push("text kázání");
    else if (s.centralIdea) parts.push("centrální myšlenka");
  }

  const choose = (keep: boolean) => {
    sunday.startNew(keep);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-text/35 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-sunday-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="new-sunday-title" className="mb-2 font-lora text-[17px] font-bold text-text">
          {`Rozpracovaná neděle`}
        </h2>
        <p className="text-[13.5px] leading-relaxed text-text-muted">
          {`Než začneš novou, co s tím, co máš rozpracované?`}
        </p>
        <div className="my-4 rounded-[10px] bg-cream px-3.5 py-2.5 text-[12.5px] leading-relaxed">
          <b className="text-text">{name}</b>
          {parts.length > 0 && <span className="block text-text-muted">{parts.join(" · ")}</span>}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-text-muted hover:text-text"
          >
            {`Zpět`}
          </button>
          <button
            onClick={() => choose(false)}
            className="rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-brick hover:underline"
          >
            {`Zahodit`}
          </button>
          <button
            onClick={() => choose(true)}
            className="rounded-lg bg-brick px-3.5 py-1.5 text-[12.5px] font-semibold text-white hover:bg-brick-light"
          >
            {`Uložit do archivu a začít novou`}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Past Sundays. A preacher's sermons are worth coming back to. */
export function SundayArchive() {
  const sunday = useSunday();
  if (sunday.archive.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-white p-4">
      <h3 className="mb-2.5 font-lora text-[14px] font-bold text-text">{`Minulé neděle`}</h3>
      <ul className="m-0 list-none p-0">
        {sunday.archive.map((a) => (
          <ArchiveRow key={a.meta.id} item={a} onRestore={() => sunday.restore(a.meta.id)} />
        ))}
      </ul>
    </section>
  );
}

function ArchiveRow({ item, onRestore }: { item: ArchivedSunday; onRestore: () => void }) {
  const s = item.summary;
  const bits = [
    item.meta.id !== "unknown" ? formatCzechDate(item.meta.id).replace(/ \d{4}$/, "") : null,
    s.annotations ? `${s.annotations} označení` : null,
    s.translationNotes ? `${s.translationNotes} pozn.` : null,
  ].filter(Boolean);

  return (
    <li className="flex items-center justify-between gap-2 border-t border-border py-2.5 first:border-t-0 first:pt-0">
      <div className="min-w-0">
        <p className="truncate text-[12.5px] font-semibold text-text">{item.meta.name}</p>
        <p className="text-[12px] text-text-light">{bits.join(" · ")}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded px-1.5 py-0.5 text-[12px] font-semibold ${
            item.status === "done" ? "bg-sage-pale text-sage" : "bg-brick-pale text-brick"
          }`}
        >
          {item.status === "done" ? "hotovo" : "rozpracováno"}
        </span>
        <button
          onClick={onRestore}
          title="Vrátit na stůl — současná příprava se uloží do archivu"
          className="text-[12.5px] font-semibold text-text-muted hover:text-brick"
        >
          {`Otevřít`}
        </button>
      </div>
    </li>
  );
}
