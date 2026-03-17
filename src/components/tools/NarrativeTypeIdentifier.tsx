"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { narrativeTypes } from "@/data/narrative-types";

export default function NarrativeTypeIdentifier({ slug }: { slug: string }) {
  const [savedType, setSavedType] = useLocalStorage<string>(
    `kazani-narrative-type-${slug}`,
    ""
  );
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    setSelectedId(savedType);
  }, [savedType]);

  const handleSelect = (id: string) => {
    const newId = id === selectedId ? "" : id;
    setSelectedId(newId);
    setSavedType(newId);
  };

  const selected = narrativeTypes.find((t) => t.id === selectedId);

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-text-muted">
        {`Ur\u010Dete, jak\u00FD typ textu p\u0159ipravujete. Ka\u017Ed\u00FD \u017E\u00E1nr m\u00E1 sv\u00E1 specifika pro pozorov\u00E1n\u00ED.`}
      </p>

      {/* Type grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {narrativeTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all ${
              selectedId === type.id
                ? "border-brick bg-white shadow-sm"
                : "border-border/50 bg-white/60 hover:border-brick/30"
            }`}
          >
            <span className="text-lg">{type.icon}</span>
            <span
              className={`text-[11px] font-medium leading-tight ${
                selectedId === type.id ? "text-brick" : "text-text-muted"
              }`}
            >
              {type.name}
            </span>
          </button>
        ))}
      </div>

      {/* Detail card */}
      {selected && (
        <div className="rounded-lg border border-border/50 bg-white/60 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">{selected.icon}</span>
            <h4 className="font-lora text-sm font-bold text-text">
              {selected.name}
            </h4>
          </div>
          <p className="mb-4 text-xs leading-relaxed text-text-muted">
            {selected.description}
          </p>

          <div className="mb-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
              {`Na co si d\u00E1t pozor`}
            </p>
            <ul className="space-y-1">
              {selected.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-xs leading-relaxed text-text">
                  <span className="shrink-0 text-sage">{"\u2022"}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick">
              {`Ot\u00E1zky pro tento \u017E\u00E1nr`}
            </p>
            <ul className="space-y-1">
              {selected.observationQuestions.map((q, i) => (
                <li key={i} className="flex gap-2 text-xs leading-relaxed text-text">
                  <span className="shrink-0 font-bold text-sage">?</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
