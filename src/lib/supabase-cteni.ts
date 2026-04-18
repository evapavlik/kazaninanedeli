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

  // Normalize whitespace after commas — CZ articles sometimes store
  // "Lk 24, 36b-48" (space after comma) vs lectionary "Lk 24,36b-48".
  // Add both variants for every ref we have so far.
  const withSpaceNormalized: string[] = [];
  for (const r of refs) {
    // Strip space after chapter:verse comma
    withSpaceNormalized.push(r.replace(/,\s+/g, ","));
    // Add space after chapter:verse comma (but not after verse-range dash)
    withSpaceNormalized.push(r.replace(/(\d),(\d)/g, "$1, $2"));
  }
  refs.push(...withSpaceNormalized);

  return [...new Set(refs)];
}

/**
 * Find Farsk\u00FD postily matching a biblical reference.
 */
/**
 * Commentary from Supabase DB
 */
export interface CrossReference {
  reference: string;
  text: string;
  translation: string;
  relevance: string;
}

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
  cross_references: CrossReference[];
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

/**
 * Matching k\u00E1z\u00E1n\u00ED z \u010Desk\u00E9ho z\u00E1pasu (modern\u00ED C\u010CSH kazan\u00ED, 2022\u20132026).
 * Shares the same `expandRefs` logic as Farsk\u00FD postily \u2014 pouze p\u0159esn\u00E9 shody referenc\u00ED,
 * \u017E\u00E1dn\u00FD fuzzy match, pouze normalizace mezer.
 */
export interface CzechZapasMatch {
  id: string;
  article_number: number;
  title: string;
  author: string | null;
  biblical_references: string[];
  biblical_refs_raw: string | null;
  liturgical_context: string | null;
  source_ref: string;
  year: number;
  issue_number: number | null;
  content: string;
  matched_ref: string;
}

export async function findCzechZapasArticles(
  reference: string
): Promise<CzechZapasMatch[]> {
  const refs = expandRefs(reference);
  const arrayLiteral = `{${refs.map((r) => `"${r}"`).join(",")}}`;

  const { data, error } = await supabaseCteni
    .from("czech_zapas_articles")
    .select(
      "id, article_number, title, author, biblical_references, biblical_refs_raw, liturgical_context, source_ref, year, issue_number, content"
    )
    .eq("is_active", true)
    .eq("content_type", "kazani")
    .filter("biblical_references", "ov", arrayLiteral);

  if (error) {
    console.error("Error querying czech_zapas_articles:", error.message);
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
    return { ...row, matched_ref: matchedRef } as CzechZapasMatch;
  });
}
