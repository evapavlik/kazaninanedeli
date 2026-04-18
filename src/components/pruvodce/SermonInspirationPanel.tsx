"use client";

import { useEffect, useState } from "react";
import {
  findPostily,
  findCzechZapasArticles,
  type PostilaMatch,
  type CzechZapasMatch,
} from "@/lib/supabase-cteni";
import PostilaContent from "./PostilaContent";

/**
 * Panel zobrazující historické a současné kázání k dané perikopě.
 *
 * Podle Pokorného (§ 3.8 Působení textu / Wirkungsgeschichte) je znalost
 * toho, jak text četli jiní, "pro současného vykladače naprostou nezbytností",
 * ale "dějiny působení nejsou normou výkladu" — slouží k inspiraci, ne k opisu.
 *
 * Zdroje:
 * - Postily Karla Farského (Patriarcha I., 1922–1924) — tabulka `postily`
 * - Kázání z Českého zápasu (2022–2026) — tabulka `czech_zapas_articles`
 */
export default function SermonInspirationPanel({
  reference,
}: {
  reference: string;
}) {
  const [postily, setPostily] = useState<PostilaMatch[]>([]);
  const [cZapas, setCZapas] = useState<CzechZapasMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) return;
    setLoading(true);
    Promise.all([findPostily(reference), findCzechZapasArticles(reference)])
      .then(([p, c]) => {
        setPostily(p);
        setCZapas(c);
      })
      .catch(() => {
        setPostily([]);
        setCZapas([]);
      })
      .finally(() => setLoading(false));
  }, [reference]);

  const nothingFound = !loading && postily.length === 0 && cZapas.length === 0;

  return (
    <div className="space-y-5">
      {/* Pedagogický úvod podle Pokorného */}
      <div className="rounded-lg border border-sage/30 bg-sage-pale/30 px-4 py-3">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
          {`D\u011bjiny p\u016fsoben\u00ed textu`}
        </p>
        <p className="text-[12px] leading-relaxed text-text">
          {`Pod\u00edvejte se, jak text \u010detli jin\u00ed kazatel\u00e9 \u2014 C\u010cSH Patriarcha Karel Farsk\u00fd a auto\u0159i \u010cesk\u00e9ho z\u00e1pasu. Podle Pokorn\u00e9ho je zn\u00e1t jin\u00e9 v\u00fdklady \u201enezbytnost\u00ed pro sou\u010dasn\u00e9ho vyklada\u010de\u201c \u2014 ale nikdy ne normou. Udr\u017ete si vlastn\u00ed centr\u00e1ln\u00ed my\u0161lenku.`}
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-[12px] text-text-light">
          <span className="animate-pulse">{"\u2615"}</span>
          {`Na\u010d\u00edt\u00e1m k\u00e1z\u00e1n\u00ed...`}
        </div>
      )}

      {/* Farský postily */}
      {postily.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick/70">
            {`Postily Karla Farsk\u00e9ho`}
            <span className="ml-2 font-normal normal-case tracking-normal text-text-light">
              {`\u2014 Patriarcha I., 1922\u20131924`}
            </span>
          </p>
          <div className="space-y-2">
            {postily.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-brick/10 bg-brick-pale/20"
              >
                <button
                  onClick={() =>
                    setExpanded(
                      expanded === `f-${p.id}` ? null : `f-${p.id}`
                    )
                  }
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left"
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-text">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-light">
                      {p.biblical_references.join(", ")}
                      {p.liturgical_context
                        ? ` \u2014 ${p.liturgical_context}`
                        : ""}
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-brick/50 transition-transform ${
                      expanded === `f-${p.id}` ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>
                {expanded === `f-${p.id}` && (
                  <div className="border-t border-brick/10 px-3 py-3">
                    {p.biblical_text && (
                      <div className="mb-3 rounded-md bg-white/60 px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-sage/70 mb-1">
                          {`Biblick\u00fd text`}
                        </p>
                        <p className="text-[12px] italic leading-relaxed text-text-muted">
                          {p.biblical_text}
                        </p>
                      </div>
                    )}
                    <PostilaContent content={p.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Český zápas */}
      {cZapas.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage/80">
            {`K\u00e1z\u00e1n\u00ed z \u010cesk\u00e9ho z\u00e1pasu`}
            <span className="ml-2 font-normal normal-case tracking-normal text-text-light">
              {`\u2014 sou\u010dasn\u00ed C\u010cSH kazatel\u00e9`}
            </span>
          </p>
          <div className="space-y-2">
            {cZapas.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border border-sage/20 bg-sage-pale/20"
              >
                <button
                  onClick={() =>
                    setExpanded(
                      expanded === `cz-${a.id}` ? null : `cz-${a.id}`
                    )
                  }
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left"
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-text">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-light">
                      {a.author ? `${a.author} \u2014 ` : ""}
                      {a.source_ref}
                      {a.biblical_refs_raw
                        ? ` \u2014 ${a.biblical_refs_raw}`
                        : ""}
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-sage/50 transition-transform ${
                      expanded === `cz-${a.id}` ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>
                {expanded === `cz-${a.id}` && (
                  <div className="border-t border-sage/10 px-3 py-3">
                    <PostilaContent content={a.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {nothingFound && (
        <p className="text-sm italic text-text-muted">
          {`Pro tuto perikopu zat\u00edm nem\u00e1me \u017e\u00e1dn\u00e9 k\u00e1z\u00e1n\u00ed Farsk\u00e9ho ani z \u010cesk\u00e9ho z\u00e1pasu. Zkuste tento krok pracovat samostatn\u011b \u2014 t\u00edm l\u00e9pe se nauc\u00edte rozli\u0161ovat vlastn\u00ed my\u0161len\u00ed.`}
        </p>
      )}
    </div>
  );
}
