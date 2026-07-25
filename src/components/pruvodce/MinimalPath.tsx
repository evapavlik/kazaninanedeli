"use client";

import { useRouter } from "next/navigation";
import type { SermonArtifacts } from "@/hooks/useSermonArtifacts";
import { ArtifactInput } from "./UnifiedFlow";

/**
 * The three fields that carry a sermon on their own, in the order the
 * preparation actually moves: what the text says → what I will say → the words
 * I will say. They live in three different phases (Výklad, Stavba, Formulace),
 * which is exactly why the minimal path gathers them in one place.
 */
const SPINE: {
  field: keyof SermonArtifacts;
  step: string;
  title: string;
  why: string;
  placeholder: string;
  rows: number;
  /** Phase to jump to when the reader wants the full treatment of this step. */
  phase: string;
}[] = [
  {
    field: "centralIdea",
    step: "1",
    title: "Centrální myšlenka textu",
    why: "Co text říká — jednou větou. Jádro výkladu.",
    placeholder: "Např. Bůh oživuje i to, co vypadá mrtvé a beznadějné.",
    rows: 2,
    phase: "text",
  },
  {
    field: "sermonThesis",
    step: "2",
    title: "Thesis kázání",
    why: "Co řekneš svým posluchačům — tuto neděli, v této situaci.",
    placeholder: "Např. I když se cítíme mrtví, Bůh nás volá k novému životu.",
    rows: 2,
    phase: "kazani",
  },
  {
    field: "sermonText",
    step: "3",
    title: "Text kázání",
    why: "Piš tak, jak mluvíš. 12–15 minut ≈ 1 500–2 000 slov.",
    placeholder: "Úvod:\n…\n\n1. bod:\n…\n\nZávěr:\n…",
    rows: 10,
    phase: "kazani",
  },
];

interface MinimalPathProps {
  artifacts: SermonArtifacts;
  onArtifactChange: (field: string, value: string) => void;
}

/**
 * "Minimální cesta" — the spine of a sermon when there isn't time for the whole
 * guide. Methodologically this is not a shortcut around Pokorný but its core
 * move: understanding → kerygma → formulation. It writes the same artifact
 * fields as the full path, so nothing is lost by switching either way.
 */
export default function MinimalPath({
  artifacts,
  onArtifactChange,
}: MinimalPathProps) {
  const router = useRouter();
  const filled = SPINE.filter((s) => artifacts[s.field]?.trim()).length;

  return (
    <div className="flex flex-col gap-4">
      {SPINE.map((s) => {
        const value = artifacts[s.field] ?? "";
        const done = value.trim().length > 0;
        return (
          <div
            key={s.field}
            className={`rounded-xl border bg-white p-3.5 transition-colors ${
              done ? "border-sage-light" : "border-border"
            }`}
          >
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-[11.5px] font-bold ${
                  done ? "bg-sage text-white" : "bg-sage-pale text-sage"
                }`}
              >
                {done ? "✓" : s.step}
              </span>
              <h3 className="font-lora text-[14px] font-bold text-text">{s.title}</h3>
            </div>
            <p className="mb-2 text-[11.5px] leading-snug text-text-light">{s.why}</p>

            <ArtifactInput
              text=""
              value={value}
              placeholder={s.placeholder}
              isDone={done}
              rows={s.rows}
              onChange={(v) => onArtifactChange(s.field, v)}
              onComplete={(v) => onArtifactChange(s.field, v)}
            />

            <button
              onClick={() => router.push(`/pruvodce/${s.phase}`)}
              className="mt-1.5 text-[11.5px] text-text-light underline transition-colors hover:text-brick"
            >
              {`Projít tento krok celou cestou →`}
            </button>
          </div>
        );
      })}

      <p className="rounded-[10px] bg-cream px-3.5 py-3 text-[12.5px] leading-relaxed text-text-muted">
        {filled === SPINE.length ? (
          <>
            <b className="text-brick">Máš páteř kázání hotovou.</b>{" "}
            {`Pokud zbyl čas, celá cesta ti pomůže ji prohloubit.`}
          </>
        ) : (
          <>
            <b className="text-brick">Málo času?</b>{" "}
            {`Tohle stačí. Ostatní kroky průvodce tu na tebe počkají — celá cesta se ti kdykoli zase otevře.`}
          </>
        )}
      </p>
    </div>
  );
}
