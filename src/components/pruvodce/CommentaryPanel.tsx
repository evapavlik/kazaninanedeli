"use client";

import { useState, useEffect } from "react";
import { getCommentary, type PericopeCommentary } from "@/data/commentary-notes";
import { fetchCommentary } from "@/lib/supabase-cteni";
import { parseReferenceForApi, getBibleHubCommentaryUrl } from "@/lib/getbible";

/**
 * Commentary panel — shows exegetical notes (AI) + BibleHub link.
 * Farský postily and other sermons moved to separate SermonInspirationPanel
 * (following Pokorný § 3.8: dějiny působení are distinct from exegetical commentary).
 */
export default function CommentaryPanel({ reference }: { reference: string }) {
  const parsed = parseReferenceForApi(reference);
  const commentaryUrl = parsed ? getBibleHubCommentaryUrl(parsed.bookNumber, parsed.chapter) : null;

  // Fetch commentary from DB, fallback to local
  const [commentary, setCommentary] = useState<PericopeCommentary | null>(
    parsed ? getCommentary(parsed.bookNumber, parsed.chapter) : null
  );
  const [commentaryLoading, setCommentaryLoading] = useState(false);

  useEffect(() => {
    if (!parsed) return;
    setCommentaryLoading(true);
    fetchCommentary(parsed.bookNumber, parsed.chapter)
      .then((dbData) => {
        if (dbData) {
          // Map DB format to local format
          setCommentary({
            reference: dbData.reference,
            title: dbData.title,
            context: dbData.context,
            keyWords: dbData.key_words,
            structure: dbData.structure,
            theologicalThemes: dbData.theological_themes,
            applicationHints: dbData.application_hints,
            verseNotes: dbData.verse_notes,
            cross_references: dbData.cross_references || [],
          });
        }
        // If DB returns nothing, keep local fallback (already set in useState)
      })
      .catch(() => {
        // Keep local fallback
      })
      .finally(() => setCommentaryLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (!commentary && !commentaryUrl && !commentaryLoading) {
    return (
      <p className="text-sm italic text-text-muted">
        {`Koment\u00E1\u0159e k tomuto textu zat\u00EDm nejsou k dispozici.`}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {commentary && (
        <>
          {/* AI-generated content warning */}
          <div className="rounded-lg border border-amber-300/60 bg-amber-50/70 px-3 py-2.5">
            <div className="flex gap-2">
              <span className="shrink-0 text-amber-600" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v4M10 13.5v.5" />
                </svg>
              </span>
              <p className="text-[11px] leading-relaxed text-amber-900">
                <span className="font-semibold">{`Pozn\u00E1mka: `}</span>
                {`Tyto podn\u011Bty jsou AI-generovan\u00FD n\u00E1vrh, ne autoritativn\u00ED v\u00FDklad. Pracuj s nimi kriticky a ov\u011B\u0159 v odborn\u00E9 literatu\u0159e.`}
              </p>
            </div>
          </div>

          {/* Title + context */}
          <div>
            <h3 className="font-lora text-base font-bold text-text">
              {commentary.title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-text-muted">
              {commentary.context}
            </p>
          </div>

          {/* Key words */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Kl\u00ED\u010Dov\u00E1 slova`}
            </p>
            <div className="space-y-2">
              {commentary.keyWords.map((kw, i) => (
                <div key={i} className="rounded-lg bg-sage-pale/30 px-3 py-2">
                  <p className="text-[13px] font-semibold text-text">{kw.word}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-text-muted">{kw.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Structure */}
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Struktura textu`}
            </p>
            <p className="text-[13px] leading-relaxed text-text-muted">{commentary.structure}</p>
          </div>

          {/* Verse notes */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Pozn\u00E1mky k ver\u0161\u016Fm`}
            </p>
            <div className="space-y-2">
              {commentary.verseNotes.map((vn) => (
                <div key={vn.verse} className="flex gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brick-pale text-[10px] font-bold text-brick">
                    {vn.verse}
                  </span>
                  <p className="text-[12px] leading-relaxed text-text-muted">{vn.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Theological themes */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              {`Teologick\u00E1 t\u00E9mata`}
            </p>
            <ul className="space-y-1">
              {commentary.theologicalThemes.map((theme, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brick/40" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          {/* Application hints */}
          <div className="rounded-lg border border-brick/10 bg-brick-pale/30 px-4 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick/70">
              {`N\u00E1m\u011Bty pro k\u00E1z\u00E1n\u00ED`}
            </p>
            <ul className="space-y-1.5">
              {commentary.applicationHints.map((hint, i) => (
                <li key={i} className="text-[12px] leading-relaxed text-text">
                  {`\u2192 ${hint}`}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Cross references with inline Bible text */}
      {commentary?.cross_references && commentary.cross_references.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
            {`K\u0159\u00ED\u017Eov\u00E9 reference`}
          </p>
          <div className="space-y-3">
            {commentary.cross_references.map((ref, i) => (
              <div key={i} className="rounded-lg border border-sage/15 bg-sage-pale/20 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-sage">{ref.reference}</span>
                  <span className="text-[9px] text-text-light">({ref.translation})</span>
                </div>
                <p className="text-[12px] leading-relaxed text-text italic border-l-2 border-sage/30 pl-2.5">
                  {ref.text}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-text-muted">
                  {`\u2192 ${ref.relevance}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BibleHub link — always show as additional resource */}
      {commentaryUrl && (
        <a
          href={commentaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-sage/20 bg-white/70 px-3 py-2.5 transition-all hover:border-sage/40 hover:bg-white"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sage/10">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage">
              <path d="M4 3h12v14H4z" />
              <path d="M7 7h6M7 10h6M7 13h4" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-text">
              {`BibleHub Commentaries`}
            </p>
            <p className="text-[10px] text-text-muted">
              {`Dal\u0161\u00ED v\u00FDkladov\u00E9 koment\u00E1\u0159e (anglicky)`}
            </p>
          </div>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-sage/50">
            <path d="M5 15L15 5M15 5H8M15 5v7" />
          </svg>
        </a>
      )}
    </div>
  );
}
