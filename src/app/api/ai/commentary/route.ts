import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getAiClient, AI_MODEL, notConfigured } from "@/lib/ai/client";
import { COMMENTARY_SYSTEM, LIMITS } from "@/lib/ai/prompts";
import { createClient } from "@supabase/supabase-js";
import { supabaseCteni } from "@/lib/supabase-cteni";

/**
 * Writing needs more than the anon key the app reads with. With
 * SUPABASE_CTENI_SERVICE_KEY set (server-side only, never shipped to the
 * browser) generated commentaries are shared by everyone; without it they
 * stay in the browser that made them.
 */
function writerClient() {
  const key = process.env.SUPABASE_CTENI_SERVICE_KEY;
  return key
    ? createClient("https://uedluysdwvcdrhjiotjc.supabase.co", key)
    : supabaseCteni;
}

export const runtime = "nodejs";
// A full commentary takes tens of seconds; the default function limit is far
// shorter. (Vercel honours this up to the plan's ceiling.)
export const maxDuration = 120;

/** Same shape as the hand-written commentaries in commentary-notes.ts. */
const CommentarySchema = z.object({
  title: z.string(),
  context: z.string(),
  keyWords: z.array(z.object({ word: z.string(), explanation: z.string() })),
  structure: z.string(),
  theologicalThemes: z.array(z.string()),
  applicationHints: z.array(z.string()),
  verseNotes: z.array(z.object({ verse: z.number(), note: z.string() })),
  cross_references: z.array(
    z.object({
      reference: z.string(),
      text: z.string(),
      translation: z.string(),
      relevance: z.string(),
    }),
  ),
});

interface CommentaryRequest {
  reference: string;
  text: string;
  /** "{book}:{chapter}:{vs}-{ve}" — the pericope key used by the app. */
  key: string;
}

/**
 * A commentary for one pericope, generated once and kept: the hand-written
 * ones from April covered 38 chapters and stopped; this fills the gaps in
 * the same structure, on demand, and stores the result so it is paid for
 * exactly once.
 */
export async function POST(req: Request) {
  const client = getAiClient();
  if (!client) return notConfigured();

  let body: CommentaryRequest;
  try {
    body = (await req.json()) as CommentaryRequest;
  } catch {
    return Response.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
  const reference = (body.reference ?? "").trim().slice(0, 80);
  const text = (body.text ?? "").trim().slice(0, LIMITS.commentaryTextChars);
  const key = (body.key ?? "").trim().slice(0, 40);
  if (!reference || !text || !/^\d+:\d+(:\d+(-\d+)?)?$/.test(key)) {
    return Response.json(
      { error: "Chybí odkaz, text nebo klíč." },
      { status: 400 },
    );
  }

  let response;
  try {
    response = await client.messages.parse({
      model: AI_MODEL,
      max_tokens: LIMITS.commentaryMaxTokens,
      system: COMMENTARY_SYSTEM,
      output_config: {
        effort: "medium",
        format: zodOutputFormat(CommentarySchema),
      },
      messages: [
        {
          role: "user",
          content: `Perikopa: ${reference}\n\n${text}\n\nNapiš komentář v požadované struktuře. „title" je krátký výstižný název perikopy (ne citát). „context" je literární a historický kontext ve 3–5 větách. „keyWords" 4–7 pojmů s původním výrazem a výkladem. „structure" popisuje stavbu textu. „theologicalThemes" 3–5 motivů, každý jednou větou. „applicationHints" 3–4 náznaky pro dnešek, ne hotové myšlenky kázání. „verseNotes" poznámky k jednotlivým veršům, kde je co vysvětlit. „cross_references" 2–4 místa jinde v Bibli s citací, překladem (ČEP) a proč sem patří.`,
        },
      ],
    });
  } catch (e) {
    // Say what went wrong (bad key, rate limit, network) instead of a bare
    // 500 the panel can't explain.
    const msg =
      e instanceof Error ? e.message : "Komentář se nepodařilo vytvořit.";
    return Response.json({ error: msg.slice(0, 300) }, { status: 502 });
  }

  const parsed = response.parsed_output;
  if (!parsed)
    return Response.json(
      { error: "Komentář se nepodařilo sestavit." },
      { status: 502 },
    );

  const commentary = { reference, ...parsed };

  // Keep it — best effort. If the table refuses (RLS), the client still gets
  // the commentary and caches it locally; `stored` tells it which happened.
  let stored = false;
  try {
    const { error } = await writerClient().from("commentary").upsert(
      {
        book_chapter: key,
        reference,
        title: parsed.title,
        context: parsed.context,
        key_words: parsed.keyWords,
        structure: parsed.structure,
        theological_themes: parsed.theologicalThemes,
        application_hints: parsed.applicationHints,
        verse_notes: parsed.verseNotes,
        cross_references: parsed.cross_references,
      },
      { onConflict: "book_chapter" },
    );
    stored = !error;
  } catch {
    stored = false;
  }

  return Response.json({ commentary, stored });
}
