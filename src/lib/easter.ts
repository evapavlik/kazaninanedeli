/**
 * Computus algorithm for Western Easter date.
 * Returns the date of Easter Sunday for a given year.
 */
export function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Helper: add days to a date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get 4th Sunday before December 25 (= 1st Advent Sunday).
 */
export function getAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25); // Dec 25
  const dayOfWeek = christmas.getDay(); // 0 = Sun
  // Days from Sunday: if Christmas is Sunday, go back 28 days
  // Otherwise go back to previous Sunday + 21 more days
  const daysBack = dayOfWeek === 0 ? 28 : dayOfWeek + 21;
  return addDays(christmas, -daysBack);
}
