/**
 * Parse biblical references from CČSH lectionary markdown
 * and map them to bible-books.ts IDs.
 *
 * Based on cteninanedeli/supabase/functions/_shared/biblical-refs.ts
 */

/** Canonical abbreviation → bible-books.ts book ID */
const ABBREV_TO_BOOK_ID: Record<string, string> = {
  // Old Testament
  "Gn": "genesis",
  "Ex": "exodus",
  "Lv": "genesis", // not in our DB, fallback
  "Dt": "genesis", // not in our DB
  "Joz": "genesis",
  "Sd": "genesis",
  "Rt": "genesis",
  "Sam": "genesis",
  "Iz": "isaiah",
  "Jr": "jeremiah",
  "Ez": "ezekiel",
  "Dan": "daniel",
  "Jon": "jonah",
  "Job": "job",
  "Pr": "proverbs",
  // Psalms
  "Z": "psalms",
  // New Testament
  "Mt": "matthew",
  "Mk": "mark",
  "Lk": "luke",
  "J": "john",
  "Sk": "acts",
  "R": "romans",
  "1Kor": "1corinthians",
  "2Kor": "2corinthians",
  "Gal": "galatians",
  "Ef": "ephesians",
  "Fp": "philippians",
  "Kol": "colossians",
  "1Sol": "1thessalonians",
  "1Tim": "1timothy",
  "Zd": "hebrews",
  "Jk": "james",
  "1Pt": "1peter",
  "2Pt": "1peter",
  "1J": "1john",
  "2J": "1john",
  "3J": "1john",
  "Jud": "james",
  "Zj": "revelation",
};

/** Canonical abbreviation → suggested narrative type ID */
const ABBREV_TO_NARRATIVE: Record<string, string> = {
  // Gospels — depend on content, but suggest "narrative" as default
  "Mt": "discourse",
  "Mk": "narrative",
  "Lk": "narrative",
  "J": "discourse",
  // Epistles
  "R": "epistle",
  "1Kor": "epistle",
  "2Kor": "epistle",
  "Gal": "epistle",
  "Ef": "epistle",
  "Fp": "epistle",
  "Kol": "epistle",
  "1Sol": "epistle",
  "1Tim": "epistle",
  "Zd": "epistle",
  "Jk": "epistle",
  "1Pt": "epistle",
  "2Pt": "epistle",
  "1J": "epistle",
  "Jud": "epistle",
  // Poetry
  "Z": "poetry",
  "Pr": "poetry",
  "Kaz": "poetry",
  "Pis": "poetry",
  "Job": "poetry",
  // Prophecy
  "Iz": "prophecy",
  "Jr": "prophecy",
  "Ez": "prophecy",
  "Dan": "apocalyptic",
  "Zj": "apocalyptic",
  // Narrative
  "Gn": "narrative",
  "Ex": "narrative",
  "Sk": "narrative",
  "Jon": "narrative",
};

const BOOK_ALIASES: Record<string, string> = {
  // Abbreviated forms → canonical
  "gn": "Gn", "gen": "Gn", "genesis": "Gn",
  "ex": "Ex", "exodus": "Ex",
  "lv": "Lv", "lev": "Lv",
  "dt": "Dt", "deut": "Dt",
  "iz": "Iz", "izai\u00E1\u0161": "Iz",
  "jr": "Jr", "jer": "Jr", "jeremi\u00E1\u0161": "Jr",
  "ez": "Ez", "ezechiel": "Ez",
  "dan": "Dan", "daniel": "Dan",
  "jon": "Jon", "jon\u00E1\u0161": "Jon",
  "job": "Job", "j\u00F3b": "Job",
  "\u017E": "\u017D", "\u017Ealm": "\u017D", "\u017Eal": "\u017D", "\u017Ealmy": "\u017D",
  "p\u0159": "P\u0159", "p\u0159\u00EDsl": "P\u0159", "p\u0159\u00EDslov\u00ED": "P\u0159",
  "kaz": "Kaz",
  "p\u00EDs": "P\u00EDs",
  "sam": "Sam", "samuel": "Sam",
  "kr\u00E1l": "Kr\u00E1l",
  "mak": "Mak",
  // New Testament
  "mt": "Mt", "mat": "Mt", "matou\u0161": "Mt",
  "mk": "Mk", "mar": "Mk", "marek": "Mk",
  "lk": "Lk", "luk": "Lk", "luk\u00E1\u0161": "Lk",
  "j": "J", "jan": "J",
  "sk": "Sk", "skutky": "Sk",
  "\u0159": "\u0158", "\u0159\u00EDm": "\u0158", "\u0159\u00EDman\u016Fm": "\u0158",
  "kor": "Kor", "korintsk\u00FDm": "Kor",
  "gal": "Gal", "galatsk\u00FDm": "Gal",
  "ef": "Ef", "efezsk\u00FDm": "Ef",
  "fp": "Fp", "fil": "Fp", "filipsk\u00FDm": "Fp",
  "kol": "Kol", "kolosk\u00FDm": "Kol",
  "sol": "Sol", "tes": "Sol", "solu\u0148sk\u00FDm": "Sol",
  "tim": "Tim", "timoteovi": "Tim",
  "tt": "Tt", "tit": "Tt", "titovi": "Tt",
  "fm": "Fm", "filemonovi": "Fm",
  "\u017Ed": "\u017Dd", "\u017Eid": "\u017Dd", "\u017Eid\u016Fm": "\u017Dd",
  "jk": "Jk", "jak": "Jk", "jakub": "Jk",
  "pt": "Pt", "petr": "Pt",
  "jud": "Jud",
  "zj": "Zj", "zjev": "Zj", "zjeven\u00ED": "Zj",
};

/**
 * Parse a human-readable reference like "Mk 4,1-20" or "1 Kor 12,1-11"
 * into { book, chapter, verses, bookId, narrativeType }.
 */
export function parseReference(raw: string): {
  canonical: string;
  bookAbbrev: string;
  bookId: string | null;
  narrativeType: string | null;
} | null {
  const ref = raw.trim();
  if (!ref) return null;

  // Handle numbered books: "1 Kor", "2 Pt", "1. Jan"
  const numberedMatch = ref.match(/^([12345])\.\?\s+(.+)$/i);
  let prefix = "";
  let rest = ref;
  if (numberedMatch) {
    prefix = numberedMatch[1];
    rest = numberedMatch[2];
  }

  // Extract book name
  const bookMatch = rest.match(/^([A-Z\u017D\u0158\u010C\u0160a-z\u017E\u0159\u010D\u0161\u016F\u00FA\u00FD\u00E1\u00E9\u00ED\u00F3\u010F\u0165\u0148\u011B]+\.?)\s*(.*)/i);
  if (!bookMatch) return null;

  const bookRaw = bookMatch[1].toLowerCase().replace(/\.$/, "");
  const chapterVerse = bookMatch[2];

  const bookCanonical = BOOK_ALIASES[bookRaw] || bookMatch[1].replace(/\.$/, "");
  const fullAbbrev = prefix ? `${prefix}${bookCanonical}` : bookCanonical;

  // Normalize chapter:verse
  const cv = chapterVerse
    .replace(/\s+/g, "")
    .replace(/[\u2014\u2013]+/g, "-")
    .replace(/\.$/g, "");

  const canonical = cv ? `${fullAbbrev} ${cv}` : fullAbbrev;
  const bookId = ABBREV_TO_BOOK_ID[fullAbbrev] || null;
  const narrativeType = ABBREV_TO_NARRATIVE[fullAbbrev] || null;

  return { canonical, bookAbbrev: fullAbbrev, bookId, narrativeType };
}

/**
 * Extract readings from CČSH lectionary markdown.
 * Returns array of { type, reference, text }.
 */
export function extractReadingsFromMarkdown(markdown: string): {
  type: "first" | "second" | "gospel";
  label: string;
  reference: string;
  text: string;
}[] {
  const sections = markdown.split(/^---$/m).map((s) => s.trim()).filter(Boolean);
  const readings: {
    type: "first" | "second" | "gospel";
    label: string;
    reference: string;
    text: string;
  }[] = [];

  for (const section of sections) {
    const headingMatch = section.match(/^##\s+(.+)$/m);
    if (!headingMatch) continue;

    const heading = headingMatch[1];
    let type: "first" | "second" | "gospel";
    let label: string;

    if (/prvn\u00ED/i.test(heading)) {
      type = "first";
      label = "1. \u010Dten\u00ED";
    } else if (/druh\u00E9/i.test(heading)) {
      type = "second";
      label = "2. \u010Dten\u00ED";
    } else if (/evangelium/i.test(heading)) {
      type = "gospel";
      label = "Evangelium";
    } else {
      continue;
    }

    // Extract reference from heading
    const refMatch = heading.match(/[:\u2013\u2014\u2013-]\s*(.+)$/);
    const reference = refMatch ? refMatch[1].trim() : "";

    // Text is everything after the heading
    const text = section
      .replace(/^##\s+.+$/m, "")
      .trim();

    readings.push({ type, label, reference, text });
  }

  return readings;
}
