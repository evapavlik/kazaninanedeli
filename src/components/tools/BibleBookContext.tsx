"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { bibleBooks } from "@/data/bible-books";

export default function BibleBookContext({ slug }: { slug: string }) {
  const [savedBook, setSavedBook] = useLocalStorage<string>(
    `kazani-bible-book-${slug}`,
    ""
  );
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSelectedId(savedBook);
  }, [savedBook]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSavedBook(id);
    setSearch("");
  };

  const handleClear = () => {
    setSelectedId("");
    setSavedBook("");
  };

  const selected = bibleBooks.find((b) => b.id === selectedId);

  const filtered = search.trim()
    ? bibleBooks.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const szBooks = bibleBooks.filter((b) => b.testament === "sz");
  const nzBooks = bibleBooks.filter((b) => b.testament === "nz");

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-text-muted">
        {`Vyberte biblickou knihu, ze kter\u00E9 p\u0159ipravujete k\u00E1z\u00E1n\u00ED, a z\u00EDskejte z\u00E1kladn\u00ED kontext.`}
      </p>

      {/* Search or selected display */}
      {selected ? (
        <div className="flex items-center justify-between rounded-lg border border-brick bg-white p-3">
          <span className="font-lora text-sm font-semibold text-text">
            {selected.name}
          </span>
          <button
            onClick={handleClear}
            className="text-xs text-text-light hover:text-brick"
          >
            {`Zm\u011Bnit`}
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Hledat knihu (nap\u0159. Luk\u00E1\u0161, \u0158\u00EDman\u016Fm\u2026)`}
            className="w-full rounded-lg border border-border/70 bg-white/80 px-3 py-2.5 text-sm text-text placeholder:text-text-light/50 focus:border-sage/40 focus:outline-none focus:ring-2 focus:ring-sage/10"
          />
          {search.trim() && filtered.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-white shadow-lg">
              {filtered.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleSelect(book.id)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text hover:bg-cream"
                >
                  <span className={`text-[10px] font-medium uppercase ${book.testament === "nz" ? "text-brick" : "text-sage"}`}>
                    {book.testament === "nz" ? "NZ" : "SZ"}
                  </span>
                  {book.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Browse by testament (when no search and nothing selected) */}
      {!selected && !search.trim() && (
        <div className="space-y-3">
          <BookGroup
            label={`Nov\u00FD z\u00E1kon`}
            books={nzBooks}
            onSelect={handleSelect}
            accent="brick"
          />
          <BookGroup
            label={`Star\u00FD z\u00E1kon`}
            books={szBooks}
            onSelect={handleSelect}
            accent="sage"
          />
        </div>
      )}

      {/* Detail card */}
      {selected && (
        <div className="rounded-lg border border-border/50 bg-white/60 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${selected.testament === "nz" ? "text-brick" : "text-sage"}`}>
              {selected.testament === "nz" ? `Nov\u00FD z\u00E1kon` : `Star\u00FD z\u00E1kon`}
            </span>
            <span className="text-[10px] text-text-light">{"\u2022"}</span>
            <span className="text-[10px] text-text-muted">{selected.genre}</span>
          </div>

          <InfoRow label="Autor" value={selected.author} />
          <InfoRow label="Datace" value={selected.dateRange} />
          <InfoRow label={`Adres\u00E1ti`} value={selected.audience} />
          <InfoRow label="Struktura" value={selected.structure} />

          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
              {`Kl\u00ED\u010Dov\u00E1 t\u00E9mata`}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selected.keyThemes.map((theme, i) => (
                <span
                  key={i}
                  className="rounded-full bg-brick/10 px-2.5 py-0.5 text-[11px] text-brick"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookGroup({
  label,
  books,
  onSelect,
  accent,
}: {
  label: string;
  books: typeof bibleBooks;
  onSelect: (id: string) => void;
  accent: "brick" | "sage";
}) {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? books : books.slice(0, 0);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex w-full items-center justify-between rounded-lg border border-border/50 bg-white/60 px-3 py-2 text-left text-xs font-medium transition-all hover:border-${accent}/30`}
      >
        <span className="text-text-muted">
          {label} <span className="text-text-light">({books.length})</span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-text-light transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-1 flex flex-wrap gap-1 rounded-lg border border-border/30 bg-white/40 p-2">
          {displayed.map((book) => (
            <button
              key={book.id}
              onClick={() => onSelect(book.id)}
              className={`rounded-md px-2 py-1 text-[11px] transition-all hover:bg-${accent}/10 text-text-muted hover:text-${accent}`}
            >
              {book.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-text-light">
        {label}
      </p>
      <p className="text-xs leading-relaxed text-text">{value}</p>
    </div>
  );
}
