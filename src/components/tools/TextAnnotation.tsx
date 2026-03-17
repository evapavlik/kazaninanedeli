"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DebouncedTextarea from "@/components/pruvodce/DebouncedTextarea";

interface Annotation {
  id: string;
  text: string;
  category: "keyword" | "motif" | "structure" | "question";
  note: string;
}

interface AnnotationData {
  bibleText: string;
  annotations: Annotation[];
}

const emptyData: AnnotationData = { bibleText: "", annotations: [] };

const categories: {
  id: Annotation["category"];
  name: string;
  color: string;
  bg: string;
}[] = [
  { id: "keyword", name: `Kl\u00ED\u010Dov\u00E9 slovo`, color: "text-brick", bg: "bg-brick/10" },
  { id: "motif", name: "Motiv", color: "text-sage", bg: "bg-sage/10" },
  { id: "structure", name: "Struktura", color: "text-text", bg: "bg-sand/30" },
  { id: "question", name: `Ot\u00E1zka`, color: "text-[#7b5ea7]", bg: "bg-[#7b5ea7]/10" },
];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function TextAnnotation({ slug }: { slug: string }) {
  const [saved, setSaved] = useLocalStorage<AnnotationData>(
    `kazani-annotation-${slug}`,
    emptyData
  );
  const [data, setData] = useState<AnnotationData>(emptyData);
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState<Annotation["category"]>("keyword");

  useEffect(() => {
    setData(saved);
  }, [saved]);

  const persist = useCallback(
    (updated: AnnotationData) => {
      setData(updated);
      setSaved(updated);
    },
    [setSaved]
  );

  const updateBibleText = (text: string) => {
    persist({ ...data, bibleText: text });
  };

  const addAnnotation = () => {
    const text = newText.trim();
    if (!text) return;
    const annotation: Annotation = {
      id: generateId(),
      text,
      category: newCategory,
      note: "",
    };
    persist({ ...data, annotations: [...data.annotations, annotation] });
    setNewText("");
  };

  const removeAnnotation = (id: string) => {
    persist({
      ...data,
      annotations: data.annotations.filter((a) => a.id !== id),
    });
  };

  const updateNote = (id: string, note: string) => {
    persist({
      ...data,
      annotations: data.annotations.map((a) =>
        a.id === id ? { ...a, note } : a
      ),
    });
  };

  const getCat = (catId: string) => categories.find((c) => c.id === catId)!;

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-text-muted">
        {`Ozna\u010Dte kl\u00ED\u010Dov\u00E1 slova, motivy, strukturn\u00ED prvky a ot\u00E1zky z textu vlevo.`}
      </p>

      {/* Add annotation */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
          {`P\u0159idat pozn\u00E1mku`}
        </p>

        {/* Category picker */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setNewCategory(cat.id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                newCategory === cat.id
                  ? `${cat.bg} ${cat.color} ring-1 ring-current`
                  : "bg-white/60 text-text-muted hover:bg-cream"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Input + add button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addAnnotation()}
            placeholder={`Slovo nebo fr\u00E1ze z textu\u2026`}
            className="flex-1 rounded-lg border border-border/70 bg-white/80 px-3 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
          />
          <button
            onClick={addAnnotation}
            disabled={!newText.trim()}
            className="shrink-0 rounded-lg bg-brick px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brick-light disabled:opacity-40"
          >
            {`P\u0159idat`}
          </button>
        </div>
      </div>

      {/* Annotations list */}
      {data.annotations.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
            {`Pozn\u00E1mky (${data.annotations.length})`}
          </p>
          {data.annotations.map((ann) => {
            const cat = getCat(ann.category);
            return (
              <div
                key={ann.id}
                className="rounded-lg border border-border/50 bg-white/60 p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.bg} ${cat.color}`}
                    >
                      {cat.name}
                    </span>
                    <span className="font-lora text-sm font-semibold text-text">
                      {ann.text}
                    </span>
                  </div>
                  <button
                    onClick={() => removeAnnotation(ann.id)}
                    className="text-xs text-text-light hover:text-brick"
                  >
                    {"\u2715"}
                  </button>
                </div>
                <DebouncedTextarea
                  value={ann.note}
                  onChange={(val) => updateNote(ann.id, val)}
                  placeholder={`Pozn\u00E1mka k \u201E${ann.text}\u201C\u2026`}
                  rows={2}
                  variant="brick"
                />
              </div>
            );
          })}
        </div>
      )}

      {data.annotations.length === 0 && data.bibleText && (
        <p className="py-2 text-center text-xs italic text-text-light">
          {`P\u0159idejte pozn\u00E1mky ke kl\u00ED\u010Dov\u00FDm slov\u016Fm z textu.`}
        </p>
      )}
    </div>
  );
}
