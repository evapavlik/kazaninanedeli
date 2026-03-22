/**
 * Commentary notes for specific pericopes.
 * These are original exegetical summaries for practical sermon preparation.
 * Keyed by "{bookNumber}:{chapter}" — notes apply to the whole chapter
 * but highlight the lectionary pericope.
 */

export interface VerseNote {
  verse: number;
  note: string;
}

export interface PericopeCommentary {
  reference: string;
  title: string;
  context: string;
  keyWords: { word: string; explanation: string }[];
  structure: string;
  theologicalThemes: string[];
  applicationHints: string[];
  verseNotes: VerseNote[];
}

const COMMENTARY: Record<string, PericopeCommentary> = {
  // Ezekiel 37,12-14 — 5th Sunday of Lent (Judica)
  "26:37": {
    reference: "Ez 37,12\u201314",
    title: `Otev\u0159en\u00ED hrob\u016F \u2014 p\u0159\u00EDslib obnovy`,
    context: `Text je sou\u010D\u00E1st\u00ED vidn\u00ED o \u00FAdol\u00ED such\u00FDch kost\u00ED (Ez 37,1\u201314). Ezechiel prorokuje v babylonsk\u00E9m exilu (po r. 587 p\u0159. Kr.), kdy Jeruzal\u00E9m le\u017E\u00ED v troskach a lid ztratil nad\u011Bji. V\u0161e 36\u201337 tvo\u0159\u00ED zlom v knize: po soudech (kap. 1\u201324) a prorochtv\u00EDch proti n\u00E1rod\u016Fm (kap. 25\u201332) p\u0159ich\u00E1z\u00ED nad\u011Bje a obnova.`,
    keyWords: [
      {
        word: `hroby (\u05E7\u05B0\u05D1\u05D5\u05BC\u05E8\u05D5\u05B9\u05EA, qeburot)`,
        explanation: `Metafora pro exil a beznad\u011Bj \u2014 lid se c\u00EDt\u00ED jako mrtv\u00FD. Nen\u00ED to prim\u00E1rn\u011B o t\u011Blesn\u00E9m vzk\u0159\u00ED\u0161en\u00ED, ale o n\u00E1rodn\u00ED obnov\u011B.`,
      },
      {
        word: `m\u016Fj lide (\u05E2\u05B7\u05DE\u05BC\u05B4\u05D9, ammi)`,
        explanation: `Trojn\u00E1sobn\u00E9 osloven\u00ED \u201Em\u016Fj lide\u201C zd\u016Fraz\u0148uje vztah smlouvy \u2014 Hospodin se ke sv\u00E9mu lidu st\u00E1le p\u0159izn\u00E1v\u00E1, i kdy\u017E lid c\u00EDt\u00ED opak.`,
      },
      {
        word: `duch/D\u016Fch (\u05E8\u05D5\u05BC\u05D7\u05B4\u05D9, r\u016Fach\u00ED)`,
        explanation: `Hebrejsk\u00E9 \u201Er\u016Fach\u201C znamen\u00E1 v\u00EDtr, dech i Ducha. V kontextu such\u00FDch kost\u00ED (v. 9\u201310) je to \u017Eivotodarn\u00FD dech, kter\u00FD o\u017Eivuje \u2014 odkaz na stvo\u0159en\u00ED (Gn 2,7).`,
      },
      {
        word: `pozn\u00E1te (\u05D9\u05B8\u05D3\u05B7\u05E2, jada\u2018)`,
        explanation: `\u201EPozn\u00E1n\u00ED Hospodina\u201C je kl\u00ED\u010Dov\u00FD motiv Ezechiela (p\u0159es 70\u00D7 v knize). Nen\u00ED to intelektu\u00E1ln\u00ED v\u011Bd\u011Bn\u00ED, ale existenci\u00E1ln\u00ED zku\u0161enost.`,
      },
    ],
    structure: `V\u0161e 12\u201314 maj\u00ED jasnou strukturu: p\u0159\u00EDslib (otev\u0159u hroby) \u2192 \u010Din (vyvedu, p\u0159ivedu, vlo\u017E\u00EDm ducha) \u2192 pozn\u00E1n\u00ED (pozn\u00E1te, \u017Ee j\u00E1 jsem Hospodin). Ka\u017Ed\u00FD ver\u0161 kon\u010D\u00ED formul\u00ED pozn\u00E1n\u00ED \u2014 opakov\u00E1n\u00ED zd\u016Fraz\u0148uje jistotu.`,
    theologicalThemes: [
      `Bo\u017E\u00ED moc nad smrt\u00ED \u2014 i to, co vypad\u00E1 mrtv\u00E9 a beznad\u011Bjn\u00E9, m\u016F\u017Ee B\u016Fh o\u017Eivit`,
      `Exil jako smrt, n\u00E1vrat jako vzk\u0159\u00ED\u0161en\u00ED \u2014 metafora pro ka\u017Ed\u00E9 \u201E\u00FAdol\u00ED such\u00FDch kost\u00ED\u201C v \u017Eivot\u011B`,
      `Duch jako zdroj \u017Eivota \u2014 \u010Dlov\u011Bk nem\u016F\u017Ee o\u017E\u00EDt s\u00E1m, pot\u0159ebuje Bo\u017E\u00ED dech`,
      `Smlouva trv\u00E1 \u2014 trojn\u00E1sobn\u00E9 \u201Em\u016Fj lide\u201C i v beznad\u011Bji`,
    ],
    applicationHints: [
      `Kde ve sv\u00E9m sboru / okol\u00ED vid\u00EDte \u201E\u00FAdol\u00ED such\u00FDch kost\u00ED\u201C?`,
      `Co znamen\u00E1 \u201Eotev\u0159\u00EDt hroby\u201C pro lidi, kte\u0159\u00ED se c\u00EDt\u00ED uzav\u0159en\u00ED, bez v\u00FDhledu?`,
      `Jak souvisej\u00ED \u201Educh\u201C a \u201E\u017Eivot\u201C v ka\u017Edodenn\u00ED zku\u0161enosti va\u0161ich poslucha\u010D\u016F?`,
      `Liturgick\u00FD kontext: 5. ned\u011Ble postn\u00ED (Judica) \u2014 cesta k Velikonoc\u016Fm, motiv smrti a vzk\u0159\u00ED\u0161en\u00ED se prohlubuje`,
    ],
    verseNotes: [
      {
        verse: 12,
        note: `\u201EOtev\u0159u va\u0161e hroby\u201C \u2014 B\u016Fh je subjektem, \u010Dlov\u011Bk je p\u0159\u00EDjemcem. Hroby symbolizuj\u00ED exil, ne skute\u010Dnou smrt. Bo\u017E\u00ED iniciativa je absolutn\u00ED: j\u00E1 otev\u0159u, j\u00E1 vyvedu, j\u00E1 p\u0159ivedu.`,
      },
      {
        verse: 13,
        note: `Opakov\u00E1n\u00ED formule \u201Epozn\u00E1te, \u017Ee j\u00E1 jsem Hospodin\u201C \u2014 c\u00EDlem nen\u00ED jen z\u00E1chrana, ale pozn\u00E1n\u00ED. Lid m\u00E1 v ud\u00E1losti rozpoznat Bo\u017E\u00ED jednon\u00ED.`,
      },
      {
        verse: 14,
        note: `\u201EVlo\u017E\u00EDm do v\u00E1s sv\u00E9ho ducha\u201C \u2014 vrchol textu. Duch (r\u016Fach) je Bo\u017E\u00ED dech, kter\u00FD tvo\u0159\u00ED \u017Eivot (srov. Gn 2,7). \u201EOdpo\u010Dinut\u00ED ve va\u0161\u00ED zemi\u201C \u2014 \u0161alom, naplp\u011Bn\u00ED smlouvy. Z\u00E1v\u011Bre\u010Dn\u00E1 formule \u201Ej\u00E1 Hospodin jsem to vyhl\u00E1sil i vykonal\u201C potvrzuje, \u017Ee Bo\u017E\u00ED slovo se stav\u00E1 skute\u010Dnost\u00ED.`,
      },
    ],
  },
};

/**
 * Get commentary for a chapter, keyed by "{bookNumber}:{chapter}"
 */
export function getCommentary(
  bookNumber: number,
  chapter: number
): PericopeCommentary | null {
  return COMMENTARY[`${bookNumber}:${chapter}`] || null;
}
