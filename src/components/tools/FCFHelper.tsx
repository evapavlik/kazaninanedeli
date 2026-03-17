"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DebouncedTextarea from "@/components/pruvodce/DebouncedTextarea";

interface FCFData {
  need: string;
  listeners: string;
  intersection: string;
  transformation: string;
}

const emptyFCF: FCFData = {
  need: "",
  listeners: "",
  intersection: "",
  transformation: "",
};

const questions = [
  {
    key: "need" as const,
    label: `Jak\u00E1 lidsk\u00E1 pot\u0159eba \u010Di zranitelnost se v textu odkr\u00FDv\u00E1?`,
    placeholder: `Nap\u0159. strach ze ztracen\u00ED, touha po p\u0159ijet\u00ED, pocit viny\u2026`,
  },
  {
    key: "listeners" as const,
    label: `Co pr\u00E1v\u011B pro\u017E\u00EDvaj\u00ED va\u0161i poslucha\u010Di?`,
    placeholder: `Aktu\u00E1ln\u00ED situace sboru, spole\u010Dnosti, lidsk\u00E9 \u017Eivoty\u2026`,
  },
  {
    key: "intersection" as const,
    label: `Kde se sv\u011Bt textu a sv\u011Bt poslucha\u010D\u016F prot\u00EDnaj\u00ED?`,
    placeholder: `Kter\u00FD moment textu rezonuje s dne\u0161kem?`,
  },
  {
    key: "transformation" as const,
    label: `Jakou prom\u011Bnu text nab\u00EDz\u00ED?`,
    placeholder: `Co se m\u011Bn\u00ED, kdy\u017E \u010Dlov\u011Bk text p\u0159ijme?`,
  },
];

export default function FCFHelper({ slug }: { slug: string }) {
  const [saved, setSaved] = useLocalStorage<FCFData>(
    `kazani-fcf-${slug}`,
    emptyFCF
  );
  const [data, setData] = useState<FCFData>(emptyFCF);

  useEffect(() => {
    setData(saved);
  }, [saved]);

  const handleChange = (key: keyof FCFData, value: string) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    setSaved(updated);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-text-muted">
        {`Metoda FCF (Fallen Condition Focus) pom\u00E1h\u00E1 naj\u00EDt, jakou lidskou pot\u0159ebu text adresuje a jak ji p\u0159en\u00E9st do \u017Eivota poslucha\u010D\u016F.`}
      </p>
      {questions.map((q) => (
        <DebouncedTextarea
          key={q.key}
          label={q.label}
          value={data[q.key]}
          onChange={(val) => handleChange(q.key, val)}
          placeholder={q.placeholder}
          rows={3}
          variant="sage"
        />
      ))}
    </div>
  );
}
