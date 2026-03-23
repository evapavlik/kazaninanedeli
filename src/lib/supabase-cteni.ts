/**
 * Supabase client for cteninanedeli database.
 * Read-only access to postily (Karel Farsk\u00FD) and czech_zapas_articles.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://uedluysdwvcdrhjiotjc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZGx1eXNkd3ZjZHJoamlvdGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjMxMjcsImV4cCI6MjA4NzY5OTEyN30.GIHmsp4xIdr540KWDdREEaPRV5suyeX-WCElm5a0dtM";

export const supabaseCteni = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface PostilaMatch {
  id: string;
  postil_number: number;
  title: string;
  biblical_references: string[];
  liturgical_context: string | null;
  biblical_text: string | null;
  content: string;
  matched_ref: string;
}

/**
 * Normalize a Czech biblical reference for matching.
 * E.g. "Ez 37,12-14" \u2192 try ["Ez 37,12-14", "Ez 37"]
 * Also handles book name variants (Jan/J, \u0158/\u0158\u00EDm, etc.)
 */
function expandRefs(reference: string): string[] {
  const refs: string[] = [reference];

  // Add chapter-only version: "Ez 37,12-14" \u2192 "Ez 37"
  const chapterMatch = reference.match(/^(.+?\s+\d+)/);
  if (chapterMatch) {
    refs.push(chapterMatch[1]);
  }

  // Add book abbreviation variants
  const variants: Record<string, string[]> = {
    "Ez": ["Ez", "Ezechiel"],
    "J": ["J", "Jan"],
    "\u0158": ["\u0158", "\u0158\u00EDm"],
    "Mk": ["Mk", "Marek"],
    "Mt": ["Mt", "Mat", "Matou\u0161"],
    "Lk": ["Lk", "Luk"],
    "Gn": ["Gn", "Gen"],
    "Ex": ["Ex"],
  };

  const bookMatch = reference.match(/^(\S+)/);
  if (bookMatch) {
    const book = bookMatch[1];
    const rest = reference.slice(book.length);
    for (const [key, alts] of Object.entries(variants)) {
      if (alts.includes(book)) {
        for (const alt of alts) {
          if (alt !== book) {
            refs.push(alt + rest);
            // Also chapter-only variant
            const cm = (alt + rest).match(/^(.+?\s+\d+)/);
            if (cm) refs.push(cm[1]);
          }
        }
      }
    }
  }

  return [...new Set(refs)];
}

/**
 * Find Farsk\u00FD postily matching a biblical reference.
 */
/**
 * Commentary from Supabase DB
 */
export interface DbCommentary {
  book_chapter: string;
  reference: string;
  title: string;
  context: string;
  key_words: { word: string; explanation: string }[];
  structure: string;
  theological_themes: string[];
  application_hints: string[];
  verse_notes: { verse: number; note: string }[];
}

export async function fetchCommentary(
  bookNumber: number,
  chapter: number
): Promise<DbCommentary | null> {
  const key = `${bookNumber}:${chapter}`;

  const { data, error } = await supabaseCteni
    .from("commentary")
    .select("*")
    .eq("book_chapter", key)
    .limit(1);

  if (error || !data || data.length === 0) {
    return null;
  }

  return data[0] as DbCommentary;
}

/**
 * Find Farsk\u00FD postily matching a biblical reference.
 */
export async function findPostily(
  reference: string
): Promise<PostilaMatch[]> {
  const refs = expandRefs(reference);

  // Build PostgREST overlap filter
  const arrayLiteral = `{${refs.map((r) => `"${r}"`).join(",")}}`;

  const { data, error } = await supabaseCteni
    .from("postily")
    .select(
      "id, postil_number, title, biblical_references, liturgical_context, biblical_text, content"
    )
    .eq("is_active", true)
    .filter("biblical_references", "ov", arrayLiteral);

  if (error) {
    console.error("Error querying postily:", error.message);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  return (data as any[]).map((row) => {
    const matchedRef =
      (row.biblical_references as string[]).find((r: string) =>
        refs.includes(r)
      ) || refs[0];
    return { ...row, matched_ref: matchedRef } as PostilaMatch;
  });
}
