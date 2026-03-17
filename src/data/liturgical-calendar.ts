import { getEasterDate, addDays, getAdventStart } from "@/lib/easter";

export interface LiturgicalSeason {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  description: string;
  themes: string[];
}

export const seasons: LiturgicalSeason[] = [
  {
    id: "advent",
    name: "Advent",
    color: `fialov\u00E1`,
    colorHex: "#7b5ea7",
    description: `Obdob\u00ED p\u0159\u00EDpravy a o\u010Dek\u00E1v\u00E1n\u00ED p\u0159\u00EDchodu P\u00E1n\u011B. \u010Cty\u0159i ned\u011Ble p\u0159ed V\u00E1nocemi.`,
    themes: [
      `O\u010Dek\u00E1v\u00E1n\u00ED a nad\u011Bje`,
      `P\u0159\u00EDprava srdce`,
      `Prorock\u00E1 zasl\u00EDben\u00ED`,
      `P\u0159\u00EDchod Mesi\u00E1\u0161e`,
    ],
  },
  {
    id: "christmas",
    name: `V\u00E1noce`,
    color: `b\u00EDl\u00E1`,
    colorHex: "#f5f0e8",
    description: `Oslava narozen\u00ED Je\u017E\u00ED\u0161e Krista. Od \u0160t\u011Bdr\u00E9ho ve\u010Dera do Zjeven\u00ED P\u00E1n\u011B.`,
    themes: [
      `Vtelen\u00ED Bo\u017E\u00EDho Syna`,
      `Sv\u011Btlo ve tm\u011B`,
      `Pokoj a radost`,
      `B\u016Fh s n\u00E1mi (Emmanuel)`,
    ],
  },
  {
    id: "epiphany",
    name: `Obdob\u00ED po Zjeven\u00ED`,
    color: `zelen\u00E1`,
    colorHex: "#4a7c6f",
    description: `Od sv\u00E1tku Zjeven\u00ED P\u00E1n\u011B (6. ledna) do za\u010D\u00E1tku postn\u00ED doby. Je\u017E\u00ED\u0161ovo zjev\u00E9n\u00ED sv\u011Btu.`,
    themes: [
      `Je\u017E\u00ED\u0161\u016Fv k\u0159est a zjev\u00E9n\u00ED`,
      `Prom\u011Bn\u011Bn\u00ED na ho\u0159e`,
      `Povolání u\u010Dedn\u00EDk\u016F`,
      `Znamen\u00ED a z\u00E1zraky`,
    ],
  },
  {
    id: "lent",
    name: `Postn\u00ED doba`,
    color: `fialov\u00E1`,
    colorHex: "#7b5ea7",
    description: `40 dn\u00ED p\u0159\u00EDpravy na Velikonoce (bez ned\u011Bl\u00ED). Za\u010D\u00EDn\u00E1 Popele\u010Dn\u00ED st\u0159edou.`,
    themes: [
      `Pok\u00E1n\u00ED a obr\u00E1cen\u00ED`,
      `P\u016Fst a sebekáze\u0148`,
      `Cesta k\u0159\u00ED\u017Ee`,
      `K\u0159est\u00AD p\u0159\u00EDprava`,
    ],
  },
  {
    id: "holy-week",
    name: `Svat\u00FD t\u00FDden`,
    color: `\u010Derven\u00E1 / \u010Dern\u00E1`,
    colorHex: "#c41e1e",
    description: `Posledn\u00ED t\u00FDden p\u0159ed Velikonocemi. Od Kv\u011Btn\u00E9 ned\u011Ble p\u0159es Zelen\u00FD \u010Dtvrtek a Velik\u00FD p\u00E1tek.`,
    themes: [
      `Vjezd do Jeruzal\u00E9ma`,
      `Posledn\u00ED ve\u010De\u0159e`,
      `Getsemanská zahrada`,
      `K\u0159\u00ED\u017E a smrt`,
    ],
  },
  {
    id: "easter",
    name: `Velikonoce`,
    color: `b\u00EDl\u00E1 / zlat\u00E1`,
    colorHex: "#d4a44c",
    description: `Oslava Kristova vzkl\u00ED\u0161en\u00ED. 50 dn\u00ED od Velikono\u010Dn\u00ED ned\u011Ble do Letnic.`,
    themes: [
      `Vzkl\u00ED\u0161en\u00ED a nov\u00FD \u017Eivot`,
      `Setk\u00E1n\u00ED se Vzkl\u00ED\u0161eným`,
      `Nanebevstoupen\u00ED`,
      `O\u010Dek\u00E1v\u00E1n\u00ED Ducha`,
    ],
  },
  {
    id: "pentecost",
    name: `Letnice (Svatos\u0161\u0165sk\u00E9 sv\u00E1tky)`,
    color: `\u010Derven\u00E1`,
    colorHex: "#c41e1e",
    description: `Sesl\u00E1n\u00ED Ducha svat\u00E9ho. 50. den po Velikonoc\u00EDch. Narozeniny c\u00EDrkve.`,
    themes: [
      `Duch svat\u00FD`,
      `Dary Ducha`,
      `Jednota v rozmanitosti`,
      `Odvaha sv\u011Bde\u010Dení`,
    ],
  },
  {
    id: "ordinary",
    name: `Mezidob\u00ED (po Letnic\u00EDch)`,
    color: `zelen\u00E1`,
    colorHex: "#4a7c6f",
    description: `Nejdel\u0161\u00ED obdob\u00ED c\u00EDrkevn\u00EDho roku. Od Letnic do Adventu. \u010Cas r\u016Fstu a u\u010Dedn\u00EDctv\u00ED.`,
    themes: [
      `R\u016Fst ve v\u00ED\u0159e`,
      `N\u00E1sledov\u00E1n\u00ED Krista`,
      `Slu\u017Eba a sv\u011Bdectv\u00ED`,
      `C\u00EDrkev ve sv\u011Bt\u011B`,
    ],
  },
];

/**
 * Determine the current liturgical season based on a date.
 */
export function getCurrentSeason(date: Date): LiturgicalSeason {
  const year = date.getFullYear();
  const easter = getEasterDate(year);

  // Key dates
  const adventStart = getAdventStart(year);
  const christmas = new Date(year, 11, 25);
  const epiphany = new Date(year + (date.getMonth() === 0 && date.getDate() >= 6 ? 0 : date >= christmas ? 1 : 0), 0, 6);
  const ashWednesday = addDays(easter, -46);
  const palmSunday = addDays(easter, -7);
  const pentecost = addDays(easter, 49);
  const pentecostEnd = addDays(pentecost, 1); // day after Pentecost

  // Normalize for comparison
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Check in order (most specific first)
  // Advent (current year)
  if (d >= adventStart && d < christmas) {
    return seasons.find((s) => s.id === "advent")!;
  }

  // Christmas (Dec 25 to Jan 5)
  if (d >= christmas || (d.getMonth() === 0 && d.getDate() < 6)) {
    return seasons.find((s) => s.id === "christmas")!;
  }

  // Epiphany to Ash Wednesday
  const epiphanyDate = new Date(year, 0, 6);
  if (d >= epiphanyDate && d < ashWednesday) {
    return seasons.find((s) => s.id === "epiphany")!;
  }

  // Lent (Ash Wednesday to Palm Sunday)
  if (d >= ashWednesday && d < palmSunday) {
    return seasons.find((s) => s.id === "lent")!;
  }

  // Holy Week (Palm Sunday to Easter)
  if (d >= palmSunday && d < easter) {
    return seasons.find((s) => s.id === "holy-week")!;
  }

  // Easter season (Easter to day after Pentecost)
  if (d >= easter && d < pentecostEnd) {
    return seasons.find((s) => s.id === "easter")!;
  }

  // Pentecost Sunday itself is in Easter season above
  // Ordinary time (after Pentecost to Advent)
  if (d >= pentecostEnd && d < adventStart) {
    return seasons.find((s) => s.id === "ordinary")!;
  }

  // Fallback
  return seasons.find((s) => s.id === "ordinary")!;
}
