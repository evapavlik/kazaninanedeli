/**
 * Scrape CČSH lectionary from cyklus.ccsh.cz
 *
 * Usage: node scripts/scrape-lectionary.mjs
 *
 * Outputs structured JSON to stdout that can be used to generate lectionary.ts
 */

const BASE_URL = "https://cyklus.ccsh.cz";

// Czech abbreviation → getbible.net book number
const ABBREV_TO_BOOK_NUMBER = {
  "Gn": 1, "Ex": 2, "Lv": 3, "Nu": 4, "Dt": 5,
  "Joz": 6, "Sd": 7, "Rt": 8,
  "1S": 9, "1Sam": 9, "2S": 10, "2Sam": 10,
  "1Kr": 11, "1Král": 11, "2Kr": 12, "2Král": 12,
  "1Pa": 13, "2Pa": 14,
  "Ezd": 15, "Neh": 16, "Est": 17,
  "Jb": 18, "Job": 18, "Ž": 19, "Z": 19,
  "Př": 20, "Kaz": 21, "Pís": 22, "Píseň": 22,
  "Iz": 23, "Jr": 24, "Pl": 25,
  "Ez": 26, "Da": 27, "Dan": 27,
  "Oz": 28, "Jl": 29, "Am": 30, "Abd": 31,
  "Jon": 32, "Mi": 33, "Na": 34, "Abk": 35,
  "Sf": 36, "Ag": 37, "Za": 38, "Mal": 39,
  "Mt": 40, "Mk": 41, "Lk": 42, "L": 42, "J": 43,
  "Sk": 44,
  "Ř": 45, "Ři": 45, "R": 45, "Řím": 45,
  "1K": 46, "1Kor": 46, "2K": 47, "2Kor": 47,
  "Ga": 48, "Gal": 48, "Ef": 49, "Fp": 50, "Fil": 50, "Ko": 51, "Kol": 51,
  "1Te": 52, "1Sol": 52, "2Te": 53, "2Sol": 53,
  "1Tm": 54, "1Tim": 54, "2Tm": 55, "2Tim": 55,
  "Tt": 56, "Fm": 57,
  "Žd": 58, "Žid": 58, "Zd": 58,
  "Jk": 59, "Jak": 59,
  "1Pt": 60, "1P": 60, "2Pt": 61, "2P": 61,
  "1J": 62, "2J": 63, "3J": 64,
  "Ju": 65, "Jud": 65,
  "Zj": 66, "Zjev": 66,
};

// Parse a Czech Bible reference like "Izajáš 2, 1-5" or "Iz 2,1-5" or "Ž 25, 1-3"
function parseReference(ref) {
  if (!ref) return null;

  // Clean up
  ref = ref.trim();

  // Try to match patterns like:
  // "Izajáš 2, 1-5" or "Iz 2,1-5" or "Ž 25, 1-3" or "Mt 24, 36-44"
  // Also handle "1K 1, 3-9" or "1 Kor 1,3-9"

  // First extract the book abbreviation/name
  const bookMatch = ref.match(/^(\d?\s*[A-ZŽŘa-záčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]*)/);
  if (!bookMatch) return null;

  let bookStr = bookMatch[1].trim();
  const rest = ref.slice(bookMatch[0].length).trim();

  // Parse chapter and verses from the rest
  // Pattern: "2, 1-5" or "2,1-5" or "2, 1-5a"
  const chapterVerseMatch = rest.match(/(\d+)\s*[,.:]\s*(\d+)(?:\s*[-–]\s*(\d+))?/);
  if (!chapterVerseMatch) {
    // Maybe just a chapter: "Ž 25"
    const chapterOnly = rest.match(/(\d+)/);
    if (!chapterOnly) return null;
    return {
      reference: ref,
      bookAbbrev: bookStr,
      bookNumber: resolveBookNumber(bookStr),
      chapter: parseInt(chapterOnly[1]),
      verseStart: 1,
      verseEnd: null,
    };
  }

  return {
    reference: ref,
    bookAbbrev: bookStr,
    bookNumber: resolveBookNumber(bookStr),
    chapter: parseInt(chapterVerseMatch[1]),
    verseStart: parseInt(chapterVerseMatch[2]),
    verseEnd: chapterVerseMatch[3] ? parseInt(chapterVerseMatch[3]) : null,
  };
}

function resolveBookNumber(bookStr) {
  // Direct match
  if (ABBREV_TO_BOOK_NUMBER[bookStr]) return ABBREV_TO_BOOK_NUMBER[bookStr];

  // Try without spaces for numbered books like "1 Kor" -> "1Kor"
  const noSpace = bookStr.replace(/\s+/g, "");
  if (ABBREV_TO_BOOK_NUMBER[noSpace]) return ABBREV_TO_BOOK_NUMBER[noSpace];

  // Try full names
  const fullNameMap = {
    "Genesis": 1, "Exodus": 2, "Leviticus": 3, "Numeri": 4, "Deuteronomium": 5,
    "Jozue": 6, "Soudců": 7, "Rút": 8, "Samuel": 9,
    "Královská": 11, "Ezdráš": 15, "Nehemjáš": 16, "Ester": 17,
    "Jób": 18, "Žalmy": 19, "Žalm": 19, "Přísloví": 20,
    "Kazatel": 21, "Píseň": 22,
    "Izajáš": 23, "Izaiáš": 23, "Jeremjáš": 24, "Pláč": 25,
    "Ezechiel": 26, "Daniel": 27,
    "Ozeáš": 28, "Joel": 29, "Amos": 30, "Abdiáš": 31,
    "Jonáš": 32, "Micheáš": 33, "Nahum": 34, "Habakuk": 35,
    "Sofoniáš": 36, "Haggeus": 37, "Zachariáš": 38, "Malachiáš": 39,
    "Matouš": 40, "Marek": 41, "Lukáš": 42, "Jan": 43,
    "Skutky": 44, "Římanům": 45,
    "Korintským": 46, "Galatským": 48, "Efezským": 49,
    "Filipským": 50, "Koloským": 51,
    "Tesalonickým": 52, "Timoteovi": 54, "Titovi": 56, "Filemonovi": 57,
    "Židům": 58, "Jakubův": 59, "Jakub": 59,
    "Petrův": 60, "Janův": 62, "Judův": 65,
    "Zjevení": 66,
  };

  for (const [name, num] of Object.entries(fullNameMap)) {
    if (bookStr.includes(name) || name.includes(bookStr)) {
      return num;
    }
  }

  return 0; // Unknown
}

// Assign season ID based on Sunday name and position
function assignSeasonId(sundayName, sundayId) {
  const name = sundayName.toLowerCase();
  if (name.includes("adventní") || name.includes("advent")) return "advent";
  if (name.includes("vánoční") || name.includes("vánocích") || name.includes("narození") || name.includes("štědrý") || name.includes("vigil")) return "christmas";
  if (name.includes("nový rok") || name.includes("jména ježíš") || name.includes("obřezání")) return "christmas";
  if (name.includes("zjevení") || name.includes("epifani") || name.includes("po zjevení") || name.includes("křtu páně") || name.includes("hromnice")) return "epiphany";
  if (name.includes("v mezidobí") && name.includes("po zjevení")) return "epiphany";
  if (name.includes("proměnění páně")) return "epiphany";
  if (name.includes("popeleční")) return "lent";
  if (name.includes("postní")) return "lent";
  if (name.includes("květn") || name.includes("palmarum")) return "holy-week";
  if (name.includes("zelený") || name.includes("velký pátek") || name.includes("vigili") && name.includes("velikono")) return "holy-week";
  if (name.includes("velikonoc") || name.includes("po velikonoc") || name.includes("hod boží veliko")) return "easter";
  if (name.includes("nanebevstoupení")) return "easter";
  if (name.includes("svatodušní") || name.includes("letnic") || name.includes("svatého ducha") && name.includes("1.")) return "pentecost";
  if (name.includes("po svatém duchu") || name.includes("v mezidobí")) return "ordinary";
  if (name.includes("krista krále")) return "ordinary";
  if (name.includes("trojice")) return "ordinary";
  // CČSH-specific feasts
  if (name.includes("památka") || name.includes("díkůvzdání") || name.includes("den svobody") || name.includes("dušičky")) return "ordinary";
  return "ordinary";
}

async function fetchPage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.status}`);
      return null;
    }
    return await res.text();
  } catch (e) {
    console.error(`Error fetching ${url}: ${e.message}`);
    return null;
  }
}

// Extract all article URLs from an index page
function extractArticleUrls(html, cycle) {
  const urls = [];
  // Match patterns like href="/a/4-a1.html" or href="/b/95-b1.html" or href="/b/99-5b.html"
  // The ID format varies: could be "a1", "b23", "5b", etc.
  const regex = new RegExp(`href="/(${cycle}/\\d+-[^"]+\\.html)"`, 'g');
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(`${BASE_URL}/${match[1]}`);
  }
  return [...new Set(urls)]; // deduplicate
}

// Extract readings from an individual Sunday page
function extractReadings(html, url) {
  // Remove HTML tags but keep structure
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '')
    .replace(/\r\n/g, '\n');

  // Extract title - look for the main heading pattern
  let sundayName = "";
  const titleMatch = html.match(/<h2[^>]*class="[^"]*contentheading[^"]*"[^>]*>([^<]+)</);
  if (titleMatch) {
    sundayName = titleMatch[1].trim();
  } else {
    // Try other heading patterns
    const h2Match = html.match(/<h2[^>]*>([^<]+)</);
    if (h2Match) sundayName = h2Match[1].trim();
  }

  // Extract Sunday ID from URL - handles both "a1" and "5b" patterns
  const idMatch = url.match(/\/([abc])\/\d+-(\w+)\.html/);
  let sundayId = idMatch ? idMatch[2] : "";
  const yearLetter = idMatch ? idMatch[1] : "";
  const year = yearLetter.toUpperCase();

  // Normalize sundayId: "5b" → "b5", ensure it starts with the cycle letter
  if (sundayId && /^\d+[abc]$/.test(sundayId)) {
    const num = sundayId.slice(0, -1);
    const letter = sundayId.slice(-1);
    sundayId = `${letter}${num}`;
  }

  const readings = {
    first: null,
    psalm: null,
    second: null,
    gospel: null,
  };

  // Look for reading patterns in the text
  // Common patterns:
  // "1. čtení: Iz 2,1-5" or "Starozákonní čtení: ..." or just listing the book reference
  // "Žalm: Ž 25,1-3" or "Zpěv: Ž 25,1-3"
  // "2. čtení: Ř 13,11-14" or "Epištolní čtení: ..."
  // "Evangelium: Mt 24,36-44"

  // Strategy: look for labeled sections
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // First reading
    if (/1\.\s*čtení|starozákonní\s*čtení|první\s*čtení/i.test(line)) {
      const ref = extractRefFromLine(line, lines, i);
      if (ref) readings.first = { label: "1. čtení", ...ref };
    }

    // Psalm
    if (/žalm|zpěv(?!\s*před)/i.test(line) && !readings.psalm) {
      const ref = extractRefFromLine(line, lines, i);
      if (ref) readings.psalm = { label: "Žalm", ...ref };
    }

    // Second reading
    if (/2\.\s*čtení|epištolní\s*čtení|druhé\s*čtení|novozákonní\s*čtení/i.test(line)) {
      const ref = extractRefFromLine(line, lines, i);
      if (ref) readings.second = { label: "2. čtení", ...ref };
    }

    // Gospel
    if (/evangelium/i.test(line) && !/před\s*evangeliem/i.test(line)) {
      const ref = extractRefFromLine(line, lines, i);
      if (ref) readings.gospel = { label: "Evangelium", ...ref };
    }
  }

  // Extract hymn numbers
  const hymnMatch = text.match(/(?:písně|zpěvník)[^\d]*(([\d]+[\s,]+)+[\d]+)/i);
  const hymns = hymnMatch
    ? hymnMatch[1].match(/\d+/g)?.map(Number) || []
    : [];

  return {
    year,
    sundayId,
    sundayName,
    seasonId: assignSeasonId(sundayName, sundayId),
    readings,
    hymns: hymns.length > 0 ? hymns : undefined,
  };
}

function extractRefFromLine(line, lines, index) {
  // Try to find a Bible reference in this line or the next
  const refPatterns = [
    // "1. čtení: Iz 2, 1-5"
    /[:]\s*(\d?\s*[A-ZŽŘ][a-záčďéěíňóřšťúůýž]*)\s+(\d+)\s*[,.:]\s*(\d+)(?:\s*[-–]\s*(\d+))?/,
    // "Izajáš 2, 1-5" (standalone)
    /(\d?\s*[A-ZŽŘ][a-záčďéěíňóřšťúůýž]+)\s+(\d+)\s*[,.:]\s*(\d+)(?:\s*[-–]\s*(\d+))?/,
    // "Ž 25, 1-3"
    /([ŽŘ])\s+(\d+)\s*[,.:]\s*(\d+)(?:\s*[-–]\s*(\d+))?/,
  ];

  for (const pattern of refPatterns) {
    const match = line.match(pattern);
    if (match) {
      const parsed = parseReference(match[0].replace(/^[:\s]+/, ''));
      if (parsed && parsed.bookNumber > 0) return parsed;
    }
  }

  // Try next line
  if (index + 1 < lines.length) {
    for (const pattern of refPatterns) {
      const match = lines[index + 1].match(pattern);
      if (match) {
        const parsed = parseReference(match[0].replace(/^[:\s]+/, ''));
        if (parsed && parsed.bookNumber > 0) return parsed;
      }
    }
  }

  return null;
}

async function scrapeAllUrls(cycle) {
  const urls = new Set();

  // Always try 5 paginated index pages (each cycle has ~90 entries, 20 per page)
  for (let start = 0; start < 100; start += 20) {
    const indexUrl = `${BASE_URL}/${cycle}.html${start > 0 ? `?start=${start}` : ''}`;
    console.error(`Fetching index: ${indexUrl}`);
    const html = await fetchPage(indexUrl);
    if (!html) break;

    const prevSize = urls.size;
    const pageUrls = extractArticleUrls(html, cycle);
    pageUrls.forEach(u => urls.add(u));

    // If no new URLs were found, stop
    if (urls.size === prevSize && start > 0) break;

    // Be nice to the server
    await new Promise(r => setTimeout(r, 300));
  }

  return [...urls].sort();
}

async function scrapeCycle(cycle) {
  console.error(`\n=== Scraping cycle ${cycle.toUpperCase()} ===`);

  const urls = await scrapeAllUrls(cycle);
  console.error(`Found ${urls.length} pages for cycle ${cycle.toUpperCase()}`);

  const entries = [];

  for (const url of urls) {
    console.error(`  Fetching: ${url}`);
    const html = await fetchPage(url);
    if (!html) continue;

    const entry = extractReadings(html, url);
    entries.push(entry);

    // Be nice to the server
    await new Promise(r => setTimeout(r, 200));
  }

  return entries;
}

async function main() {
  const allEntries = [];

  for (const cycle of ["a", "b", "c"]) {
    const entries = await scrapeCycle(cycle);
    allEntries.push(...entries);
    console.error(`Cycle ${cycle.toUpperCase()}: ${entries.length} entries scraped`);
  }

  // Output JSON
  console.log(JSON.stringify(allEntries, null, 2));

  // Summary
  console.error(`\n=== SUMMARY ===`);
  console.error(`Total entries: ${allEntries.length}`);

  const withAllReadings = allEntries.filter(e =>
    e.readings.first && e.readings.second && e.readings.gospel
  ).length;
  console.error(`Entries with all 3 main readings: ${withAllReadings}`);

  const missingAny = allEntries.filter(e =>
    !e.readings.first || !e.readings.second || !e.readings.gospel
  );
  if (missingAny.length > 0) {
    console.error(`\nEntries missing readings:`);
    for (const e of missingAny) {
      const missing = [];
      if (!e.readings.first) missing.push("first");
      if (!e.readings.psalm) missing.push("psalm");
      if (!e.readings.second) missing.push("second");
      if (!e.readings.gospel) missing.push("gospel");
      console.error(`  ${e.sundayId} "${e.sundayName}" — missing: ${missing.join(", ")}`);
    }
  }

  const unknownBooks = allEntries.flatMap(e =>
    Object.values(e.readings)
      .filter(r => r && r.bookNumber === 0)
      .map(r => `${e.sundayId}: ${r.reference}`)
  );
  if (unknownBooks.length > 0) {
    console.error(`\nUnresolved book references:`);
    unknownBooks.forEach(r => console.error(`  ${r}`));
  }
}

main().catch(console.error);
