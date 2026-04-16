/**
 * Utility funkce pro práci s lekcionářem CČSH
 *
 * Mapuje kalendářní data na liturgické neděle a vyhledává
 * odpovídající záznamy v lekcionáři.
 */

import { getEasterDate, addDays, getAdventStart } from "@/lib/easter";
import {
  LECTIONARY,
  type LectionaryEntry,
} from "@/data/lectionary";

/**
 * Liturgický rok A/B/C.
 * Rok A = rok dělitelný 3 se zbytkem 1 (2023, 2026, 2029...)
 * Rok B = zbytek 2 (2024, 2027...)
 * Rok C = dělitelný 3 (2025, 2028...)
 *
 * Liturgický rok začíná 1. nedělí adventní (konec listopadu),
 * takže pro období Advent-Vánoce se použije rok *následujícího* kalendářního roku.
 */
export function getLectionaryYear(date: Date): "A" | "B" | "C" {
  const year = date.getFullYear();
  const adventStart = getAdventStart(year);

  // If we're in Advent or later, use next year's cycle
  const effectiveYear = date >= adventStart ? year + 1 : year;

  const remainder = effectiveYear % 3;
  if (remainder === 0) return "C";
  if (remainder === 1) return "A";
  return "B";
}

/**
 * Vrátí nejbližší neděli (nebo dnešek, pokud je neděle).
 */
export function getNextSunday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  if (day === 0) return d;
  return addDays(d, 7 - day);
}

/**
 * Vrátí předchozí neděli (nebo dnešek, pokud je neděle).
 */
export function getPreviousSunday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  if (day === 0) return d;
  return addDays(d, -day);
}

/**
 * Počet dní mezi dvěma daty.
 */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86400000;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

/**
 * Mapuje datum na sundayId v lekcionáři.
 *
 * Vrací ID neděle pro daný den (pokud je neděle) nebo nejbližší nadcházející neděli.
 * Pro všední dny vrací neděli, ke které patří (nejbližší minulou neděli).
 *
 * Speciální dny (Zelený čtvrtek, Velký pátek, Popeleční středa) mají vlastní ID.
 */
export function getSundayId(date: Date): string | null {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const year = d.getFullYear();
  const easter = getEasterDate(year);
  const easterDate = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());
  const adventStart = getAdventStart(year);

  // Also need previous year's Advent for early January
  const prevAdventStart = getAdventStart(year - 1);

  // Ash Wednesday
  const ashWednesday = addDays(easterDate, -46);

  // Check fixed special days first
  // Zelený čtvrtek (a29)
  if (isSameDay(d, addDays(easterDate, -3))) return "29";
  // Velký pátek (a30)
  if (isSameDay(d, addDays(easterDate, -2))) return "30";
  // Bílá sobota (a31)
  if (isSameDay(d, addDays(easterDate, -1))) return "31";
  // Easter Sunday (a32)
  if (isSameDay(d, easterDate)) return "32";
  // Easter Monday (a33)
  if (isSameDay(d, addDays(easterDate, 1))) return "33";
  // Ascension (a39) = Easter + 39 days (Thursday)
  if (isSameDay(d, addDays(easterDate, 39))) return "39";
  // Pentecost vigil (a41) = Easter + 48 (Saturday)
  if (isSameDay(d, addDays(easterDate, 48))) return "41";
  // Pentecost (a42) = Easter + 49
  if (isSameDay(d, addDays(easterDate, 49))) return "42";
  // Pentecost Monday (a43) = Easter + 50
  if (isSameDay(d, addDays(easterDate, 50))) return "43";
  // Ash Wednesday (a22)
  if (isSameDay(d, ashWednesday)) return "22";
  // Corpus Christi (a45) = Pentecost + 11 (Thursday)
  if (isSameDay(d, addDays(easterDate, 60))) return "45";

  // Check CČSH fixed commemorations (a73-a90)
  const fixedDay = getFixedCommemoration(d);
  if (fixedDay) return fixedDay;

  // For Sundays, determine which Sunday of the church year
  const sunday = d.getDay() === 0 ? d : getNextSunday(d);

  // ADVENT (a1-a4)
  if (sunday >= adventStart && sunday < new Date(year, 11, 25)) {
    const weeksFromAdvent = Math.floor(daysBetween(adventStart, sunday) / 7);
    if (weeksFromAdvent >= 0 && weeksFromAdvent <= 3) {
      return String(1 + weeksFromAdvent);
    }
  }

  // Also check previous year's advent for early-year dates
  // (this handles the case where we're before Jan 6 and in the Christmas season)

  // CHRISTMAS SEASON (a5-a10)
  // Dec 24 = a5
  if (isSameDay(d, new Date(year, 11, 24))) return "5";
  // Dec 24 vigil = a6
  if (isSameDay(d, new Date(year, 11, 24)) && false) return "6"; // vigil is same day, different service
  // Dec 25 = a7
  if (isSameDay(d, new Date(year, 11, 25))) return "7";

  // First Sunday after Christmas (a8)
  const christmasDate = new Date(year, 11, 25);
  const firstSundayAfterChristmas = getNextSunday(addDays(christmasDate, 1));
  if (isSameDay(sunday, firstSundayAfterChristmas)) return "8";

  // New Year / Jan 1 (a9)
  if (d.getMonth() === 0 && d.getDate() === 1) return "9";

  // 2nd Sunday after Christmas (a10) - between Jan 2 and Jan 5
  const secondSundayAfterChristmas = addDays(firstSundayAfterChristmas, 7);
  if (d.getMonth() === 0 && isSameDay(sunday, secondSundayAfterChristmas) && sunday.getDate() < 6) {
    return "10";
  }

  // EPIPHANY (a11) = Jan 6
  if (d.getMonth() === 0 && d.getDate() === 6) return "11";

  // Sundays after Epiphany (a12-a21)
  const epiphany = new Date(year, 0, 6);
  const firstSundayAfterEpiphany = getNextSunday(addDays(epiphany, 1));

  if (sunday >= firstSundayAfterEpiphany && sunday < ashWednesday) {
    const weeksAfterEpiphany = Math.floor(daysBetween(firstSundayAfterEpiphany, sunday) / 7);
    // a12 = 1st Sunday after Epiphany
    // a21 = last Sunday (Transfiguration) = Sunday before Ash Wednesday
    const id = 12 + weeksAfterEpiphany;
    if (id <= 21) return String(id);
  }

  // LENT Sundays (a23-a28)
  const firstSundayOfLent = getNextSunday(addDays(ashWednesday, 1));
  if (sunday >= firstSundayOfLent && sunday <= addDays(easterDate, -7)) {
    const weeksOfLent = Math.floor(daysBetween(firstSundayOfLent, sunday) / 7);
    return String(23 + weeksOfLent); // a23 through a28
  }

  // EASTER Sundays (a34-a38, a40)
  // a34 = 1st Sunday after Easter (Easter + 7)
  // a38 = 5th Sunday (Rogate, Easter + 35)
  // a39 = Ascension (Thursday, handled above)
  // a40 = 6th Sunday (Exaudi, Easter + 42)
  const firstSundayAfterEaster = addDays(easterDate, 7);
  if (sunday >= firstSundayAfterEaster && sunday <= addDays(easterDate, 42)) {
    const weeksAfterEaster = Math.floor(daysBetween(firstSundayAfterEaster, sunday) / 7);
    // Skip a39 (Ascension = Thursday) in Sunday numbering
    if (weeksAfterEaster <= 4) return String(34 + weeksAfterEaster); // a34-a38
    if (weeksAfterEaster === 5) return "40"; // a40 (Exaudi)
  }

  // ORDINARY TIME after Pentecost (a44-a72)
  const pentecost = addDays(easterDate, 49);
  const trinitySunday = getNextSunday(addDays(pentecost, 1)); // Sunday after Pentecost
  const nextAdventStart = getAdventStart(year);

  if (sunday >= trinitySunday && sunday < nextAdventStart) {
    // a44 = Trinity Sunday
    const weeksAfterTrinity = Math.floor(daysBetween(trinitySunday, sunday) / 7);
    // a44 (Trinity), then a46 (8. v mezidobí) onwards
    // There's a gap: a44 = Trinity, a45 = Corpus Christi (Thursday), a46 = 8th ordinary
    if (weeksAfterTrinity === 0) return "44"; // Trinity

    // Ordinary Sundays: a46 through a72
    // The numbering goes: a46 = 1 week after Trinity, a47 = 2 weeks, etc.
    const ordinaryId = 46 + (weeksAfterTrinity - 1);

    // Last Sunday before Advent = Christ the King (a72)
    const lastSundayBeforeAdvent = getPreviousSunday(addDays(nextAdventStart, -1));
    if (isSameDay(sunday, lastSundayBeforeAdvent)) return "72";

    if (ordinaryId <= 71) return String(ordinaryId);
  }

  // Fallback: check if we're in early January (still in Christmas/Epiphany from previous year)
  if (d.getMonth() === 0 && d.getDate() > 6) {
    // After Epiphany, before Ash Wednesday
    const weeksAfterEpiphanyThisYear = Math.floor(daysBetween(firstSundayAfterEpiphany, sunday) / 7);
    if (weeksAfterEpiphanyThisYear >= 0) {
      const id = 12 + weeksAfterEpiphanyThisYear;
      if (id <= 21) return String(id);
    }
  }

  return null;
}

/**
 * Kontrola CČSH pevných památek.
 */
function getFixedCommemoration(d: Date): string | null {
  const month = d.getMonth(); // 0-indexed
  const day = d.getDate();

  // a73: 8. ledna - Zrod CČSH
  if (month === 0 && day === 8) return "73";
  // a74: 12. června - Karel Farský
  if (month === 5 && day === 12) return "74";
  // a75: 24. června - Jan Křtitel
  if (month === 5 && day === 24) return "75";
  // a76: 29. června - Petr a Pavel
  if (month === 5 && day === 29) return "76";
  // a77: 4. července - Prokop
  if (month === 6 && day === 4) return "77";
  // a78: 5. července - Cyril a Metoděj
  if (month === 6 && day === 5) return "78";
  // a79: 6. července - Jan Hus
  if (month === 6 && day === 6) return "79";
  // a80: 15. srpna - Marie
  if (month === 7 && day === 15) return "80";
  // a81: 28. září - Václav
  if (month === 8 && day === 28) return "81";
  // a82: (variable - Díkůvzdání za úrodu, typically first Sunday of October)
  // a83: 28. října - Den svobody
  if (month === 9 && day === 28) return "83";
  // a84: 1. listopadu - Všech svatých
  if (month === 10 && day === 1) return "84";
  // a85: 2. listopadu - Dušičky
  if (month === 10 && day === 2) return "85";
  // a86: 15. listopadu - Komenský
  if (month === 10 && day === 15) return "86";
  // a87: 26. prosince - Štěpán
  if (month === 11 && day === 26) return "87";
  // a88: 28. prosince - Neviňátka
  if (month === 11 && day === 28) return "88";

  return null;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Vrátí lekcionářový záznam pro dané datum.
 * Hledá neděli (nebo speciální den) a příslušný cyklus.
 */
export function getCurrentEntry(date: Date): LectionaryEntry | null {
  const year = getLectionaryYear(date);
  const numericId = getSundayId(date);
  if (!numericId) return null;

  const prefix = year.toLowerCase();
  const sundayId = `${prefix}${numericId}`;

  return LECTIONARY.find((e) => e.sundayId === sundayId && e.year === year) ?? null;
}

/**
 * Vrátí lekcionářový záznam pro nejbližší nadcházející neděli.
 */
export function getNextSundayEntry(date: Date): LectionaryEntry | null {
  const nextSun = getNextSunday(date);
  return getCurrentEntry(nextSun);
}

/**
 * Vrátí N nadcházejících nedělních záznamů.
 */
export function getUpcomingSundays(
  date: Date,
  count: number
): LectionaryEntry[] {
  const results: LectionaryEntry[] = [];
  let current = getNextSunday(date);

  for (let i = 0; i < count * 2 && results.length < count; i++) {
    const entry = getCurrentEntry(current);
    if (entry) {
      results.push(entry);
    }
    current = addDays(current, 7);
  }

  return results;
}
