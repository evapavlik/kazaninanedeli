"use client";

import { useState, useEffect } from "react";
import { getCommentary, type PericopeCommentary } from "@/data/commentary-notes";
import { fetchCommentary, findPostily, type PostilaMatch } from "@/lib/supabase-cteni";
import { parseReferenceForApi, getBibleHubCommentaryUrl } from "@/lib/getbible";

/** Clean OCR text from Farský postily — fix line-break word splits */
function cleanOcrText(raw: string): string {
  return raw
    // Join words split across lines (word fragment + newline + continuation)
    .replace(new RegExp("([a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FD\u010D\u010F\u011B\u0148\u0159\u0161\u0165\u016F\u017E])\\n([a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FD\u010D\u010F\u011B\u0148\u0159\u0161\u0165\u016F\u017E])", "gi"), "$1$2")
    // Collapse remaining single newlines into spaces (keep double newlines as paragraphs)
    .replace(/([^\n])\n([^\n])/g, "$1 $2")
    // Clean up multiple spaces
    .replace(/ {2,}/g, " ")
    .trim();
}

/** Farský postila content — collapsible with cleaned OCR text */
function PostilaContent({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  const cleaned = cleanOcrText(content);
  const isLong = cleaned.length > 600;
  const displayText = isLong && !expanded ? cleaned.slice(0, 600) : cleaned;

  // Split into paragraphs on double newline
  const paragraphs = displayText.split(/\n\n+/).filter(Boolean);

  return (
    <div className="text-[12px] leading-relaxed text-text-muted">
      {paragraphs.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {para}
          {isLong && !expanded && i === paragraphs.length - 1 && "\u2026"}
        </p>
      ))}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-[11px] font-medium text-brick underline decoration-brick/30 hover:decoration-brick"
        >
          {expanded ? `Sbalit` : `Rozbalit cel\u00FD text`}
        </button>
      )}
    </div>
  );
}

/** Commentary panel — shows exegetical notes + Farský postily + BibleHub link */
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

  // Fetch Farský postily from Supabase
  const [postily, setPostily] = useState<PostilaMatch[]>([]);
  const [postilyLoading, setPostilyLoading] = useState(false);
  const [expandedPostila, setExpandedPostila] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) return;
    setPostilyLoading(true);
    findPostily(reference)
      .then((matches) => setPostily(matches))
      .catch(() => setPostily([]))
      .finally(() => setPostilyLoading(false));
  }, [reference]);

  if (!commentary && !commentaryUrl && postily.length === 0 && !postilyLoading && !commentaryLoading) {
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

      {/* Farský postily from Supabase */}
      {postilyLoading && (
        <div className="flex items-center gap-2 text-[12px] text-text-light">
          <span className="animate-pulse">{"\u2615"}</span>
          {`Hled\u00E1m postily Karla Farsk\u00E9ho...`}
        </div>
      )}
      {postily.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brick/70">
            {`Postily Karla Farsk\u00E9ho`}
          </p>
          <div className="space-y-2">
            {postily.map((p) => (
              <div key={p.id} className="rounded-lg border border-brick/10 bg-brick-pale/20">
                <button
                  onClick={() => setExpandedPostila(expandedPostila === p.id ? null : p.id)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left"
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-text">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-light">
                      {p.biblical_references.join(", ")}
                      {p.liturgical_context ? ` \u2014 ${p.liturgical_context}` : ""}
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-brick/50 transition-transform ${expandedPostila === p.id ? "rotate-180" : ""}`}>
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>
                {expandedPostila === p.id && (
                  <div className="border-t border-brick/10 px-3 py-3">
                    {p.biblical_text && (
                      <div className="mb-3 rounded-md bg-white/60 px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-sage/70 mb-1">
                          {`Biblick\u00FD text`}
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
