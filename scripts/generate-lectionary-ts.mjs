/**
 * Generate src/data/lectionary.ts from scraped JSON data
 *
 * Usage: node scripts/generate-lectionary-ts.mjs > src/data/lectionary.ts
 */

import { readFileSync } from "fs";

const raw = JSON.parse(readFileSync("scripts/lectionary-raw.json", "utf-8"));

function escapeStr(s) {
  if (!s) return '""';
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function formatReading(r) {
  if (!r) return "null";
  return `{
      label: ${escapeStr(r.label)},
      reference: ${escapeStr(r.reference)},
      bookNumber: ${r.bookNumber},
      chapter: ${r.chapter},
      verseStart: ${r.verseStart},
      verseEnd: ${r.verseEnd ?? "null"},
    }`;
}

// Sort entries by cycle then by numeric part of sundayId
function sortKey(entry) {
  const match = entry.sundayId.match(/([abc])(\d+)/);
  if (!match) return entry.sundayId;
  return match[1] + match[2].padStart(3, "0");
}

raw.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

const lines = [];

lines.push(`/**`);
lines.push(` * Lekcionář CČSH — kazatelský cyklus A, B, C`);
lines.push(` *`);
lines.push(` * Zdroj: https://cyklus.ccsh.cz`);
lines.push(` * Vygenerováno: ${new Date().toISOString().slice(0, 10)}`);
lines.push(` *`);
lines.push(` * Cyklus A = Matouš, B = Marek, C = Lukáš`);
lines.push(` * Janovo evangelium je rozloženo přes všechny tři roky (zejm. velikonoční období)`);
lines.push(` */`);
lines.push(``);
lines.push(`export interface LectionaryReading {`);
lines.push(`  label: string;`);
lines.push(`  reference: string;`);
lines.push(`  bookNumber: number;`);
lines.push(`  chapter: number;`);
lines.push(`  verseStart: number;`);
lines.push(`  verseEnd: number | null;`);
lines.push(`}`);
lines.push(``);
lines.push(`export interface LectionaryEntry {`);
lines.push(`  year: "A" | "B" | "C";`);
lines.push(`  sundayId: string;`);
lines.push(`  sundayName: string;`);
lines.push(`  seasonId: string;`);
lines.push(`  readings: {`);
lines.push(`    first: LectionaryReading | null;`);
lines.push(`    psalm: LectionaryReading | null;`);
lines.push(`    second: LectionaryReading | null;`);
lines.push(`    gospel: LectionaryReading | null;`);
lines.push(`  };`);
lines.push(`  hymns?: number[];`);
lines.push(`}`);
lines.push(``);
lines.push(`export const LECTIONARY: LectionaryEntry[] = [`);

for (const entry of raw) {
  lines.push(`  {`);
  lines.push(`    year: ${escapeStr(entry.year)},`);
  lines.push(`    sundayId: ${escapeStr(entry.sundayId)},`);
  lines.push(`    sundayName: ${escapeStr(entry.sundayName)},`);
  lines.push(`    seasonId: ${escapeStr(entry.seasonId)},`);
  lines.push(`    readings: {`);
  lines.push(`      first: ${formatReading(entry.readings.first)},`);
  lines.push(`      psalm: ${formatReading(entry.readings.psalm)},`);
  lines.push(`      second: ${formatReading(entry.readings.second)},`);
  lines.push(`      gospel: ${formatReading(entry.readings.gospel)},`);
  lines.push(`    },`);
  if (entry.hymns && entry.hymns.length > 0) {
    lines.push(`    hymns: [${entry.hymns.join(", ")}],`);
  }
  lines.push(`  },`);
}

lines.push(`];`);
lines.push(``);
lines.push(`/** Vyhledání záznamů podle cyklu */`);
lines.push(`export function getEntriesByYear(year: "A" | "B" | "C"): LectionaryEntry[] {`);
lines.push(`  return LECTIONARY.filter((e) => e.year === year);`);
lines.push(`}`);
lines.push(``);
lines.push(`/** Vyhledání záznamu podle sundayId a cyklu */`);
lines.push(`export function getEntry(sundayId: string, year: "A" | "B" | "C"): LectionaryEntry | undefined {`);
lines.push(`  return LECTIONARY.find((e) => e.sundayId === sundayId && e.year === year);`);
lines.push(`}`);
lines.push(``);
lines.push(`/** Neděle v daném liturgickém období */`);
lines.push(`export function getEntriesBySeason(seasonId: string, year: "A" | "B" | "C"): LectionaryEntry[] {`);
lines.push(`  return LECTIONARY.filter((e) => e.seasonId === seasonId && e.year === year);`);
lines.push(`}`);

console.log(lines.join("\n"));
