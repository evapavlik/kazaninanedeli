"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DebouncedTextarea from "@/components/pruvodce/DebouncedTextarea";

interface SermonPoint {
  id: string;
  heading: string;
  content: string;
  illustration: string;
}

interface SermonOutline {
  centralIdea: string;
  goal: string;
  introduction: string;
  points: SermonPoint[];
  conclusion: string;
}

const emptyOutline: SermonOutline = {
  centralIdea: "",
  goal: "",
  introduction: "",
  points: [
    { id: "1", heading: "", content: "", illustration: "" },
    { id: "2", heading: "", content: "", illustration: "" },
  ],
  conclusion: "",
};

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function estimateMinutes(outline: SermonOutline): number {
  const allText = [
    outline.centralIdea,
    outline.goal,
    outline.introduction,
    ...outline.points.flatMap((p) => [p.heading, p.content, p.illustration]),
    outline.conclusion,
  ].join(" ");
  const wordCount = allText.split(/\s+/).filter(Boolean).length;
  // ~130 words per minute for Czech speech
  return Math.round(wordCount / 130);
}

export default function OutlineBuilder({ slug }: { slug: string }) {
  const [saved, setSaved] = useLocalStorage<SermonOutline>(
    `kazani-outline-${slug}`,
    emptyOutline
  );
  const [data, setData] = useState<SermonOutline>(emptyOutline);

  useEffect(() => {
    setData(saved);
  }, [saved]);

  // Sync central idea from global storage if outline's field is empty
  useEffect(() => {
    if (!data.centralIdea) {
      try {
        const stored = localStorage.getItem("kazani-central-idea");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (typeof parsed === "string" && parsed.trim()) {
            const updated = { ...data, centralIdea: parsed };
            setData(updated);
            setSaved(updated);
          }
        }
      } catch {
        // ignore
      }
    }
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback(
    (updated: SermonOutline) => {
      setData(updated);
      setSaved(updated);
    },
    [setSaved]
  );

  const updateField = (field: keyof Omit<SermonOutline, "points">, value: string) => {
    persist({ ...data, [field]: value });
  };

  const updatePoint = (id: string, field: keyof SermonPoint, value: string) => {
    persist({
      ...data,
      points: data.points.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const addPoint = () => {
    if (data.points.length >= 4) return;
    persist({
      ...data,
      points: [...data.points, { id: generateId(), heading: "", content: "", illustration: "" }],
    });
  };

  const removePoint = (id: string) => {
    if (data.points.length <= 1) return;
    persist({ ...data, points: data.points.filter((p) => p.id !== id) });
  };

  const minutes = estimateMinutes(data);

  return (
    <div className="space-y-5">
      <p className="text-xs leading-relaxed text-text-muted">
        {`Strukturovan\u00E1 \u0161ablona pro stavbu k\u00E1z\u00E1n\u00ED. Za\u010Dn\u011Bte centr\u00E1ln\u00ED my\u0161lenkou.`}
      </p>

      {/* Central idea */}
      <DebouncedTextarea
        label={`Centr\u00E1ln\u00ED my\u0161lenka (jedna v\u011Bta)`}
        value={data.centralIdea}
        onChange={(v) => updateField("centralIdea", v)}
        placeholder={`Co je j\u00E1dro va\u0161eho k\u00E1z\u00E1n\u00ED v jedn\u00E9 v\u011Bt\u011B?`}
        rows={2}
        variant="brick"
      />

      {/* Goal */}
      <DebouncedTextarea
        label={`C\u00EDl k\u00E1z\u00E1n\u00ED (co si poslucha\u010D odnes\u00ED)`}
        value={data.goal}
        onChange={(v) => updateField("goal", v)}
        placeholder={`Co chcete, aby poslucha\u010D ud\u011Blal, pochopil nebo pro\u017Eil?`}
        rows={2}
        variant="brick"
      />

      {/* Introduction */}
      <DebouncedTextarea
        label={`\u00DAvod`}
        value={data.introduction}
        onChange={(v) => updateField("introduction", v)}
        placeholder={`Jak za\u010Dnete? P\u0159\u00EDb\u011Bh, ot\u00E1zka, obraz\u2026`}
        rows={3}
        variant="sage"
      />

      {/* Points */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
            {`Hlavn\u00ED body`}
          </p>
          {data.points.length < 4 && (
            <button
              onClick={addPoint}
              className="text-[11px] font-medium text-brick hover:text-brick-light"
            >
              {`+ P\u0159idat bod`}
            </button>
          )}
        </div>

        {data.points.map((point, index) => (
          <div
            key={point.id}
            className="rounded-lg border border-border/50 bg-white/60 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-cormorant text-[13px] font-semibold text-brick">
                {`Bod ${index + 1}`}
              </span>
              {data.points.length > 1 && (
                <button
                  onClick={() => removePoint(point.id)}
                  className="text-xs text-text-light hover:text-brick"
                >
                  {"\u2715"}
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-text-muted">
                  {`Nadpis`}
                </label>
                <input
                  type="text"
                  value={point.heading}
                  onChange={(e) => updatePoint(point.id, "heading", e.target.value)}
                  placeholder={`Stru\u010Dn\u00FD nadpis bodu`}
                  className="w-full rounded-lg border border-border/70 bg-white/80 px-3 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
                />
              </div>
              <DebouncedTextarea
                label={`Obsah`}
                value={point.content}
                onChange={(v) => updatePoint(point.id, "content", v)}
                placeholder={`Co chcete v tomto bodu \u0159\u00EDci?`}
                rows={2}
                variant="brick"
              />
              <DebouncedTextarea
                label={`Ilustrace / p\u0159\u00EDklad`}
                value={point.illustration}
                onChange={(v) => updatePoint(point.id, "illustration", v)}
                placeholder={`P\u0159\u00EDb\u011Bh, obraz nebo p\u0159\u00EDklad, kter\u00FD bod o\u017Eiv\u00ED`}
                rows={2}
                variant="sage"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <DebouncedTextarea
        label={`Z\u00E1v\u011Br`}
        value={data.conclusion}
        onChange={(v) => updateField("conclusion", v)}
        placeholder={`Jak zakon\u010D\u00EDte? Shrnut\u00ED, v\u00FDzva, modlitba\u2026`}
        rows={3}
        variant="sage"
      />

      {/* Time estimate */}
      <div className="flex items-center gap-2 rounded-lg bg-cream/60 px-3 py-2">
        <span className="text-sm">{"\u23F1\uFE0F"}</span>
        <span className="text-xs text-text-muted">
          {minutes > 0
            ? `Odhadovan\u00E1 d\u00E9lka: ~${minutes} min`
            : `Za\u010Dn\u011Bte ps\u00E1t pro odhad d\u00E9lky`}
        </span>
        {minutes > 0 && minutes <= 15 && (
          <span className="ml-auto text-[10px] text-sage">{`\u2713 Ide\u00E1ln\u00ED`}</span>
        )}
        {minutes > 15 && (
          <span className="ml-auto text-[10px] text-brick">{`Del\u0161\u00ED ne\u017E 15 min`}</span>
        )}
      </div>
    </div>
  );
}
