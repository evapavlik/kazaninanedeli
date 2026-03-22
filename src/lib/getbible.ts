/**
 * getBible.net API v2 client
 * Fetches Bible chapters in Czech translations (CEP, BKR)
 */

export type BibleTranslation = "cep" | "bkr" | "csp" | "textusreceptus";

export interface BibleVerse {
  chapter: number;
  verse: number;
  name: string;
  text: string;
}

export interface BibleChapter {
  bookNumber: number;
  chapter: number;
  verses: BibleVerse[];
  translation: BibleTranslation;
}

/** Czech abbreviation \u2192 getbible.net book number */
const ABBREV_TO_BOOK_NUMBER: Record<string, number> = {
  // Old Testament — abbreviations
  "Gn": 1, "Ex": 2, "Lv": 3, "Nu": 4, "Dt": 5,
  "Joz": 6, "Sd": 7, "Rt": 8,
  "1Sam": 9, "2Sam": 10, "Sam": 9,
  "1Kr\u00E1l": 11, "2Kr\u00E1l": 12, "Kr\u00E1l": 11,
  "1Pa": 13, "2Pa": 14,
  "Ezd": 15, "Neh": 16, "Est": 17,
  "Job": 18, "\u017D": 19, "Z": 19,
  "P\u0159": 20, "Kaz": 21, "P\u00EDs": 22,
  "Iz": 23, "Jr": 24, "Pl": 25,
  "Ez": 26, "Dan": 27,
  "Oz": 28, "Jl": 29, "Am": 30, "Abd": 31,
  "Jon": 32, "Mi": 33, "Na": 34, "Abk": 35,
  "Sf": 36, "Ag": 37, "Za": 38, "Mal": 39,
  // Old Testament — full Czech names
  "Genesis": 1, "Exodus": 2, "Leviticus": 3, "Numeri": 4, "Deuteronomium": 5,
  "Jozue": 6, "Soudc\u016F": 7, "R\u00FAt": 8,
  "Samuel": 9, "Kr\u00E1lovsk\u00E1": 11,
  "Paralipomenon": 13,
  "Ezdr\u00E1\u0161": 15, "Nehemj\u00E1\u0161": 16, "Ester": 17,
  "J\u00F3b": 18, "\u017Dalmy": 19, "\u017Dalm": 19,
  "P\u0159\u00EDslov\u00ED": 20, "Kazatel": 21, "P\u00EDse\u0148": 22,
  "Izaj\u00E1\u0161": 23, "Jeremj\u00E1\u0161": 24, "Pl\u00E1\u010D": 25,
  "Ezechiel": 26, "Daniel": 27,
  "Oze\u00E1\u0161": 28, "Joel": 29, "Amos": 30, "Abdij\u00E1\u0161": 31,
  "Jon\u00E1\u0161": 32, "Miche\u00E1\u0161": 33, "Nahum": 34, "Habakuk": 35,
  "Sofonj\u00E1\u0161": 36, "Haggeus": 37, "Zacharj\u00E1\u0161": 38, "Malachi\u00E1\u0161": 39,
  // New Testament — abbreviations
  "Mt": 40, "Mk": 41, "Lk": 42, "J": 43,
  "Sk": 44,
  "\u0158": 45, "R": 45,
  "1Kor": 46, "2Kor": 47, "Kor": 46,
  "Gal": 48, "Ef": 49, "Fp": 50, "Kol": 51,
  "1Sol": 52, "2Sol": 53, "Sol": 52,
  "1Tim": 54, "2Tim": 55, "Tim": 54,
  "Tt": 56, "Fm": 57,
  "\u017Dd": 58, "Zd": 58,
  "Jk": 59,
  "1Pt": 60, "2Pt": 61, "Pt": 60,
  "1J": 62, "2J": 63, "3J": 64,
  "Jud": 65, "Zj": 66,
  // New Testament — full Czech names
  "Matou\u0161": 40, "Marek": 41, "Markus": 41, "Luk\u00E1\u0161": 42, "Jan": 43,
  "Skutky": 44,
  "\u0158\u00EDman\u016Fm": 45,
  "Korintsk\u00FDm": 46, "Galatsk\u00FDm": 48, "Efezsk\u00FDm": 49,
  "Filipsk\u00FDm": 50, "Kolosk\u00FDm": 51, "Solunsk\u00FDm": 52,
  "Timoteovi": 54, "Titovi": 56, "Filemonovi": 57,
  "\u017Did\u016Fm": 58, "Jakub": 59, "Petr": 60,
  "Juda": 65, "Zjeven\u00ED": 66,
};

/** Book number \u2192 total chapters (for bounds checking) */
const BOOK_CHAPTER_COUNTS: Record<number, number> = {
  1: 50, 2: 40, 3: 27, 4: 36, 5: 34, 6: 24, 7: 21, 8: 4,
  9: 31, 10: 24, 11: 22, 12: 25, 13: 29, 14: 36,
  15: 10, 16: 13, 17: 10, 18: 42, 19: 150, 20: 31,
  21: 12, 22: 8, 23: 66, 24: 52, 25: 5, 26: 48, 27: 12,
  28: 14, 29: 3, 30: 9, 31: 1, 32: 4, 33: 7, 34: 3, 35: 3,
  36: 3, 37: 2, 38: 14, 39: 4,
  40: 28, 41: 16, 42: 24, 43: 21, 44: 28,
  45: 16, 46: 16, 47: 13, 48: 6, 49: 6, 50: 4, 51: 4,
  52: 5, 53: 3, 54: 6, 55: 4, 56: 3, 57: 1,
  58: 13, 59: 5, 60: 5, 61: 3, 62: 5, 63: 1, 64: 1,
  65: 1, 66: 22,
};

/** Book number \u2192 biblehub.com URL slug */
const BOOK_NUMBER_TO_BIBLEHUB: Record<number, string> = {
  1: "genesis", 2: "exodus", 3: "leviticus", 4: "numbers", 5: "deuteronomy",
  6: "joshua", 7: "judges", 8: "ruth", 9: "1_samuel", 10: "2_samuel",
  11: "1_kings", 12: "2_kings", 13: "1_chronicles", 14: "2_chronicles",
  15: "ezra", 16: "nehemiah", 17: "esther", 18: "job", 19: "psalms",
  20: "proverbs", 21: "ecclesiastes", 22: "songs", 23: "isaiah",
  24: "jeremiah", 25: "lamentations", 26: "ezekiel", 27: "daniel",
  28: "hosea", 29: "joel", 30: "amos", 31: "obadiah", 32: "jonah",
  33: "micah", 34: "nahum", 35: "habakkuk", 36: "zephaniah",
  37: "haggai", 38: "zechariah", 39: "malachi",
  40: "matthew", 41: "mark", 42: "luke", 43: "john", 44: "acts",
  45: "romans", 46: "1_corinthians", 47: "2_corinthians",
  48: "galatians", 49: "ephesians", 50: "philippians", 51: "colossians",
  52: "1_thessalonians", 53: "2_thessalonians",
  54: "1_timothy", 55: "2_timothy", 56: "titus", 57: "philemon",
  58: "hebrews", 59: "james", 60: "1_peter", 61: "2_peter",
  62: "1_john", 63: "2_john", 64: "3_john", 65: "jude", 66: "revelation",
};

/** Whether a book is Old Testament (Hebrew) or New Testament (Greek) */
export function isOldTestament(bookNumber: number): boolean {
  return bookNumber >= 1 && bookNumber <= 39;
}

/** Get biblehub.com interlinear URL for a chapter */
export function getBibleHubInterlinearUrl(bookNumber: number, chapter: number): string | null {
  const slug = BOOK_NUMBER_TO_BIBLEHUB[bookNumber];
  if (!slug) return null;
  return `https://biblehub.com/interlinear/${slug}/${chapter}.htm`;
}

/** Get biblehub.com commentary URL for a chapter */
export function getBibleHubCommentaryUrl(bookNumber: number, chapter: number): string | null {
  const slug = BOOK_NUMBER_TO_BIBLEHUB[bookNumber];
  if (!slug) return null;
  return `https://biblehub.com/commentaries/${slug}/${chapter}.htm`;
}

/** Get biblehub.com text URL for a chapter */
export function getBibleHubTextUrl(bookNumber: number, chapter: number): string | null {
  const slug = BOOK_NUMBER_TO_BIBLEHUB[bookNumber];
  if (!slug) return null;
  return `https://biblehub.com/${slug}/${chapter}.htm`;
}

/** Translation labels */
export const TRANSLATION_LABELS: Record<BibleTranslation, string> = {
  cep: "\u010CEP",
  csp: "\u010CSP",
  bkr: "Kralick\u00E1",
  textusreceptus: "\u0158ecky (TR)",
};

/**
 * Parse a Czech Bible reference into book number, chapter, and verse range.
 * E.g. "Mk 4,1-20" \u2192 { bookNumber: 41, chapter: 4, verseStart: 1, verseEnd: 20 }
 */
export function parseReferenceForApi(raw: string): {
  bookNumber: number;
  chapter: number;
  verseStart: number | null;
  verseEnd: number | null;
} | null {
  const ref = raw.trim();
  if (!ref) return null;

  // Handle numbered books: "1 Kor", "2 Pt", "1. Jan"
  const numberedMatch = ref.match(/^([12345])\.?\s+(.+)$/i);
  let prefix = "";
  let rest = ref;
  if (numberedMatch) {
    prefix = numberedMatch[1];
    rest = numberedMatch[2];
  }

  // Extract book name and chapter:verse part
  const bookMatch = rest.match(
    /^([A-Z\u017D\u0158\u010C\u0160a-z\u017E\u0159\u010D\u0161\u016F\u00FA\u00FD\u00E1\u00E9\u00ED\u00F3\u010F\u0165\u0148\u011B]+\.?)\s*(.*)/i
  );
  if (!bookMatch) return null;

  const bookRaw = bookMatch[1].replace(/\.$/, "");
  const chapterVerse = bookMatch[2].trim();

  // Try direct match, then with prefix
  const fullAbbrev = prefix ? `${prefix}${bookRaw}` : bookRaw;
  const bookNumber =
    ABBREV_TO_BOOK_NUMBER[fullAbbrev] ||
    ABBREV_TO_BOOK_NUMBER[bookRaw] ||
    null;

  if (!bookNumber) return null;

  // Parse chapter and verses: "4,1-20" or "37, 12-14" or "4,1" or "4"
  const cvMatch = chapterVerse.match(
    /^(\d+)(?:[,:]\s*(\d+)(?:\s*[-\u2013\u2014]\s*(\d+))?)?/
  );
  if (!cvMatch) return null;

  const chapter = parseInt(cvMatch[1], 10);
  const verseStart = cvMatch[2] ? parseInt(cvMatch[2], 10) : null;
  const verseEnd = cvMatch[3] ? parseInt(cvMatch[3], 10) : null;

  return { bookNumber, chapter, verseStart, verseEnd };
}

/**
 * Get total chapter count for a book.
 */
export function getChapterCount(bookNumber: number): number {
  return BOOK_CHAPTER_COUNTS[bookNumber] || 1;
}

/**
 * Fetch a single chapter from getBible.net API.
 * Returns null on error (graceful fallback).
 */
export async function fetchChapter(
  bookNumber: number,
  chapter: number,
  translation: BibleTranslation = "cep"
): Promise<BibleChapter | null> {
  const maxChapters = getChapterCount(bookNumber);
  if (chapter < 1 || chapter > maxChapters) return null;

  try {
    const url = `https://api.getbible.net/v2/${translation}/${bookNumber}/${chapter}.json`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verses: BibleVerse[] = Object.values(data.verses).map((v: any) => ({
      chapter: v.chapter as number,
      verse: v.verse as number,
      name: v.name as string,
      text: v.text as string,
    }));

    return { bookNumber, chapter, verses, translation };
  } catch {
    return null;
  }
}

/**
 * Fetch context: previous chapter + current chapter + next chapter.
 * Returns all three (any may be null if at book boundaries).
 */
export async function fetchContext(
  bookNumber: number,
  chapter: number,
  translation: BibleTranslation = "cep"
): Promise<{
  prev: BibleChapter | null;
  current: BibleChapter | null;
  next: BibleChapter | null;
}> {
  const [prev, current, next] = await Promise.all([
    fetchChapter(bookNumber, chapter - 1, translation),
    fetchChapter(bookNumber, chapter, translation),
    fetchChapter(bookNumber, chapter + 1, translation),
  ]);

  return { prev, current, next };
}

/**
 * Fetch a chapter from Bolls.life API (used for \u010CSP).
 * Returns BibleChapter in the same format as getBible.net data.
 * HTML tags in text are stripped.
 */
export async function fetchChapterBolls(
  bookNumber: number,
  chapter: number,
): Promise<BibleChapter | null> {
  const maxChapters = getChapterCount(bookNumber);
  if (chapter < 1 || chapter > maxChapters) return null;

  try {
    const url = `https://bolls.life/get-text/CSP09/${bookNumber}/${chapter}/`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verses: BibleVerse[] = (data as any[]).map((v: any) => ({
      chapter: chapter,
      verse: v.verse as number,
      name: `${bookNumber} ${chapter}:${v.verse}`,
      // Strip HTML tags (sup, i, etc.) from Bolls response
      text: (v.text as string).replace(/<[^>]*>/g, "").replace(/\[\d+\]/g, "").trim(),
    }));

    return { bookNumber, chapter, verses, translation: "csp" };
  } catch {
    return null;
  }
}
