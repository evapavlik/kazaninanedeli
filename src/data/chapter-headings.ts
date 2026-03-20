/**
 * Section headings for biblical chapters (CEP translation).
 * Used in step 3 (context) to show a "table of contents" for the book.
 *
 * Pilot: Mark only. More books to be added based on CCSH lectionary needs.
 */

export interface SectionHeading {
  title: string;
  startVerse: number;
  endVerse: number;
}

export interface ChapterHeadings {
  chapter: number;
  sections: SectionHeading[];
}

export interface BookHeadings {
  bookId: string;
  bookName: string;
  chapters: ChapterHeadings[];
}

/** All available book headings, keyed by getbible.net book number */
const HEADINGS_BY_BOOK_NUMBER: Record<number, BookHeadings> = {
  // ==================== MARK (41) ====================
  41: {
    bookId: "mark",
    bookName: "Marek",
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Jan K\u0159titel", startVerse: 1, endVerse: 8 },
          { title: "Je\u017E\u00ED\u0161\u016Fv k\u0159est", startVerse: 9, endVerse: 11 },
          { title: "Poku\u0161en\u00ED na pou\u0161ti", startVerse: 12, endVerse: 13 },
          { title: "Je\u017E\u00ED\u0161 zv\u011Bstuje evangelium", startVerse: 14, endVerse: 15 },
          { title: "Povol\u00E1n\u00ED u\u010Dedn\u00EDk\u016F", startVerse: 16, endVerse: 20 },
          { title: "Uzdraven\u00ED posedl\u00E9ho v Kafarnaum", startVerse: 21, endVerse: 28 },
          { title: "\u010Cinnost v Kafarnaum", startVerse: 29, endVerse: 39 },
          { title: "Uzdraven\u00ED malomocn\u00E9ho", startVerse: 40, endVerse: 45 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Uzdraven\u00ED ochrnut\u00E9ho", startVerse: 1, endVerse: 12 },
          { title: "Povol\u00E1n\u00ED celn\u00EDka", startVerse: 13, endVerse: 17 },
          { title: "Spor o p\u016Fst", startVerse: 18, endVerse: 22 },
          { title: "Spor o sobotu", startVerse: 23, endVerse: 28 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Uzdraven\u00ED v sobotu", startVerse: 1, endVerse: 6 },
          { title: "Uzdravov\u00E1n\u00ED na b\u0159ehu jezera", startVerse: 7, endVerse: 12 },
          { title: "Vyvolen\u00ED Dvan\u00E1cti", startVerse: 13, endVerse: 19 },
          { title: "Je\u017E\u00ED\u0161 a Belzebul", startVerse: 20, endVerse: 30 },
          { title: "Je\u017E\u00ED\u0161ova rodina", startVerse: 31, endVerse: 35 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Podobenstv\u00ED o rozs\u00E9va\u010Di", startVerse: 1, endVerse: 9 },
          { title: "D\u016Fvod \u0159e\u010Di v podobenstv\u00EDch", startVerse: 10, endVerse: 12 },
          { title: "V\u00FDklad podobenstv\u00ED o rozs\u00E9va\u010Di", startVerse: 13, endVerse: 20 },
          { title: "Sv\u011Btlo ur\u010Den\u00E9 na sv\u00EDcen", startVerse: 21, endVerse: 25 },
          { title: "Podobenstv\u00ED o zaset\u00E9m semenu", startVerse: 26, endVerse: 29 },
          { title: "Podobenstv\u00ED o ho\u0159\u010Di\u010Dn\u00E9m zrnu", startVerse: 30, endVerse: 34 },
          { title: "Uti\u0161en\u00ED bou\u0159e", startVerse: 35, endVerse: 41 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Uzdraven\u00ED posedl\u00E9ho v Gerase", startVerse: 1, endVerse: 20 },
          { title: "Vzk\u0159\u00ED\u0161en\u00ED dcery Jairovy", startVerse: 21, endVerse: 43 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "K\u00E1z\u00E1n\u00ED v Nazaret\u011B", startVerse: 1, endVerse: 6 },
          { title: "Vysl\u00E1n\u00ED Dvan\u00E1cti", startVerse: 7, endVerse: 13 },
          { title: "Smrt Jana K\u0159titele", startVerse: 14, endVerse: 29 },
          { title: "Nasycen\u00ED p\u011Bti tis\u00EDc\u016F", startVerse: 30, endVerse: 44 },
          { title: "Je\u017E\u00ED\u0161 kr\u00E1\u010D\u00ED po mo\u0159i", startVerse: 45, endVerse: 52 },
          { title: "Uzdravov\u00E1n\u00ED u Genezaretu", startVerse: 53, endVerse: 56 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Tradice otc\u016F", startVerse: 1, endVerse: 13 },
          { title: "Co \u010Dlov\u011Bka znesv\u011Bcuje", startVerse: 14, endVerse: 23 },
          { title: "V\u00EDra syrofenick\u00E9 \u017Eeny", startVerse: 24, endVerse: 30 },
          { title: "Uzdraven\u00ED hluchon\u011Bm\u00E9ho", startVerse: 31, endVerse: 37 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Nasycen\u00ED \u010Dty\u0159 tis\u00EDc\u016F", startVerse: 1, endVerse: 10 },
          { title: "Farizeo\u00E9 \u017E\u00E1daj\u00ED znamen\u00ED", startVerse: 11, endVerse: 13 },
          { title: "Varov\u00E1n\u00ED p\u0159ed kvasem farizej\u016F", startVerse: 14, endVerse: 21 },
          { title: "Uzdraven\u00ED slep\u00E9ho v Betsaid\u011B", startVerse: 22, endVerse: 26 },
          { title: "Petrovo vyzn\u00E1n\u00ED u Cesareje Filipovy", startVerse: 27, endVerse: 30 },
          { title: "Prvn\u00ED p\u0159edpov\u011B\u010F utrpen\u00ED", startVerse: 31, endVerse: 33 },
          { title: "N\u00E1sledov\u00E1n\u00ED", startVerse: 34, endVerse: 38 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Prom\u011Bn\u011Bn\u00ED na ho\u0159e", startVerse: 2, endVerse: 8 },
          { title: "Uzdraven\u00ED posedl\u00E9ho chlapce", startVerse: 14, endVerse: 29 },
          { title: "Druh\u00E1 p\u0159edpov\u011B\u010F utrpen\u00ED", startVerse: 30, endVerse: 32 },
          { title: "Spor o prvenstv\u00ED", startVerse: 33, endVerse: 41 },
          { title: "Varov\u00E1n\u00ED p\u0159ed svody", startVerse: 42, endVerse: 50 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "O man\u017Eelstv\u00ED a rozluce", startVerse: 1, endVerse: 12 },
          { title: "Je\u017E\u00ED\u0161 a d\u011Bti", startVerse: 13, endVerse: 16 },
          { title: "Bohat\u00FD mu\u017E", startVerse: 17, endVerse: 22 },
          { title: "O majetku", startVerse: 23, endVerse: 31 },
          { title: "T\u0159et\u00ED p\u0159edpov\u011B\u010F utrpen\u00ED", startVerse: 32, endVerse: 34 },
          { title: "\u017D\u00E1dost syn\u016F Zebedeov\u00FDch", startVerse: 35, endVerse: 45 },
          { title: "Uzdraven\u00ED slep\u00E9ho Bartimaia", startVerse: 46, endVerse: 52 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Vjezd do Jeruzal\u00E9ma", startVerse: 1, endVerse: 11 },
          { title: "Proklet\u00ED f\u00EDkovn\u00EDku", startVerse: 12, endVerse: 14 },
          { title: "O\u010Di\u0161t\u011Bn\u00ED chr\u00E1mu", startVerse: 15, endVerse: 19 },
          { title: "Uschl\u00FD f\u00EDkovn\u00EDk", startVerse: 20, endVerse: 26 },
          { title: "Spor o Je\u017E\u00ED\u0161ovu pravomoc", startVerse: 27, endVerse: 33 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Podobenstv\u00ED o zl\u00FDch vina\u0159\u00EDch", startVerse: 1, endVerse: 12 },
          { title: "Spor o da\u0148 c\u00EDsa\u0159i", startVerse: 13, endVerse: 17 },
          { title: "Spor o vzk\u0159\u00ED\u0161en\u00ED", startVerse: 18, endVerse: 27 },
          { title: "Nejv\u011Bt\u0161\u00ED p\u0159ik\u00E1z\u00E1n\u00ED", startVerse: 28, endVerse: 34 },
          { title: "Mesi\u00E1\u0161, Syn David\u016Fv", startVerse: 35, endVerse: 37 },
          { title: "Varov\u00E1n\u00ED p\u0159ed z\u00E1kon\u00EDky", startVerse: 38, endVerse: 40 },
          { title: "Dar vdovy", startVerse: 41, endVerse: 44 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "P\u0159edpov\u011B\u010F zk\u00E1zy chr\u00E1mu", startVerse: 1, endVerse: 2 },
          { title: "Po\u010D\u00E1tek b\u011Bd", startVerse: 3, endVerse: 13 },
          { title: "Velk\u00E9 sou\u017Een\u00ED", startVerse: 14, endVerse: 23 },
          { title: "P\u0159\u00EDchod Syna \u010Dlov\u011Bka", startVerse: 24, endVerse: 27 },
          { title: "Pou\u010Den\u00ED od f\u00EDkovn\u00EDku", startVerse: 28, endVerse: 31 },
          { title: "V\u00FDzva k bd\u011Blosti", startVerse: 32, endVerse: 37 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Rozhodnut\u00ED velekn\u011B\u017E\u00ED", startVerse: 1, endVerse: 2 },
          { title: "Pomaz\u00E1n\u00ED v Betanii", startVerse: 3, endVerse: 9 },
          { title: "\u00DAmluva Jid\u00E1\u0161e a velekn\u011B\u017E\u00ED", startVerse: 10, endVerse: 11 },
          { title: "P\u0159\u00EDprava velikono\u010Dn\u00ED ve\u010De\u0159e", startVerse: 12, endVerse: 16 },
          { title: "Ozna\u010Den\u00ED zr\u00E1dce", startVerse: 17, endVerse: 21 },
          { title: "Ustanoven\u00ED ve\u010De\u0159e P\u00E1n\u011B", startVerse: 22, endVerse: 25 },
          { title: "Rozhovor cestou do Getsemane", startVerse: 26, endVerse: 31 },
          { title: "Modlitba v Getsemane", startVerse: 32, endVerse: 42 },
          { title: "Zat\u010Den\u00ED", startVerse: 43, endVerse: 52 },
          { title: "Je\u017E\u00ED\u0161 p\u0159ed radou", startVerse: 53, endVerse: 65 },
          { title: "Petrovo zap\u0159en\u00ED", startVerse: 66, endVerse: 72 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Je\u017E\u00ED\u0161 p\u0159ed Pil\u00E1tem", startVerse: 1, endVerse: 15 },
          { title: "V\u00FDsm\u011Bch voj\u00E1k\u016F", startVerse: 16, endVerse: 20 },
          { title: "Uk\u0159i\u017Eov\u00E1n\u00ED", startVerse: 21, endVerse: 32 },
          { title: "Je\u017E\u00ED\u0161ova smrt", startVerse: 33, endVerse: 39 },
          { title: "Poh\u0159eb Je\u017E\u00ED\u0161\u016Fv", startVerse: 42, endVerse: 47 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Zv\u011Bst o vzk\u0159\u00ED\u0161en\u00ED", startVerse: 1, endVerse: 8 },
          { title: "Z\u00E1v\u011Br", startVerse: 9, endVerse: 20 },
        ],
      },
    ],
  },

  // ==================== JOHN (43) ====================
  43: {
    bookId: "john",
    bookName: "Jan",
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Prolog", startVerse: 1, endVerse: 18 },
          { title: "Jan K\u0159titel", startVerse: 19, endVerse: 34 },
          { title: "Povol\u00E1n\u00ED u\u010Dedn\u00EDk\u016F", startVerse: 35, endVerse: 51 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Svatba v K\u00E1n\u011B Galilejsk\u00E9", startVerse: 1, endVerse: 12 },
          { title: "O\u010Di\u0161t\u011Bn\u00ED chr\u00E1mu", startVerse: 13, endVerse: 25 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Rozmluva s Nikod\u00E9mem", startVerse: 1, endVerse: 21 },
          { title: "Je\u017E\u00ED\u0161 a Jan K\u0159titel", startVerse: 22, endVerse: 36 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Rozmluva se sama\u0159skou \u017Eenou", startVerse: 1, endVerse: 42 },
          { title: "Uzdraven\u00ED syna kr\u00E1lovsk\u00E9ho \u00FA\u0159edn\u00EDka", startVerse: 43, endVerse: 54 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Uzdraven\u00ED u rybn\u00EDka Bethesda", startVerse: 1, endVerse: 18 },
          { title: "O Synovu posl\u00E1n\u00ED", startVerse: 19, endVerse: 30 },
          { title: "Je\u017E\u00ED\u0161ovo sv\u011Bdectv\u00ED", startVerse: 31, endVerse: 47 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Nasycen\u00ED p\u011Bti tis\u00EDc\u016F", startVerse: 1, endVerse: 15 },
          { title: "Je\u017E\u00ED\u0161 kr\u00E1\u010D\u00ED po mo\u0159i", startVerse: 16, endVerse: 21 },
          { title: "O chlebu \u017Eivota", startVerse: 22, endVerse: 59 },
          { title: "Petrovo vyzn\u00E1n\u00ED", startVerse: 60, endVerse: 71 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Vystoupen\u00ED o slavnosti st\u00E1nk\u016F", startVerse: 1, endVerse: 52 },
          { title: "Je\u017E\u00ED\u0161 a cizolo\u017Enice", startVerse: 53, endVerse: 53 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Je\u017E\u00ED\u0161 a cizolo\u017Enice (dokon\u010Den\u00ED)", startVerse: 1, endVerse: 11 },
          { title: "Spor o Je\u017E\u00ED\u0161\u016Fv p\u016Fvod", startVerse: 12, endVerse: 30 },
          { title: "Spor o otcovstv\u00ED Abrahamovo", startVerse: 31, endVerse: 59 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Uzdraven\u00ED slep\u00E9ho", startVerse: 1, endVerse: 41 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "O dobr\u00E9m past\u00FD\u0159i", startVerse: 1, endVerse: 21 },
          { title: "Rozmluva ve sv\u00E1tek posv\u011Bcen\u00ED chr\u00E1mu", startVerse: 22, endVerse: 42 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Vzk\u0159\u00ED\u0161en\u00ED Lazara", startVerse: 1, endVerse: 44 },
          { title: "\u00DAmysl velekn\u011B\u017E\u00ED", startVerse: 45, endVerse: 57 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Pomaz\u00E1n\u00ED v Betanii", startVerse: 1, endVerse: 11 },
          { title: "Vjezd do Jeruzal\u00E9ma", startVerse: 12, endVerse: 19 },
          { title: "Odpov\u011B\u010F \u0159eck\u00FDm poutn\u00EDk\u016Fm", startVerse: 20, endVerse: 26 },
          { title: "P\u0159edpov\u011B\u010F utrpen\u00ED", startVerse: 27, endVerse: 50 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Um\u00FDv\u00E1n\u00ED nohou u\u010Dedn\u00EDk\u016Fm", startVerse: 1, endVerse: 20 },
          { title: "Ozna\u010Den\u00ED zr\u00E1dce", startVerse: 21, endVerse: 30 },
          { title: "O Je\u017E\u00ED\u0161ov\u011B odchodu", startVerse: 31, endVerse: 38 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Cesta k Otci", startVerse: 1, endVerse: 14 },
          { title: "Zasl\u00EDben\u00ED P\u0159\u00EDmluvce", startVerse: 15, endVerse: 26 },
          { title: "Pokoj v\u00E1m zanech\u00E1v\u00E1m", startVerse: 27, endVerse: 31 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "O kmeni a ratolestech", startVerse: 1, endVerse: 11 },
          { title: "O posl\u00E1n\u00ED u\u010Dedn\u00EDk\u016F", startVerse: 12, endVerse: 27 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Nen\u00E1vist sv\u011Bta", startVerse: 1, endVerse: 4 },
          { title: "O p\u0159\u00EDchodu P\u0159\u00EDmluvce", startVerse: 5, endVerse: 15 },
          { title: "Smutek se prom\u011Bn\u00ED v radost", startVerse: 16, endVerse: 24 },
          { title: "P\u0159emohl jsem sv\u011Bt", startVerse: 25, endVerse: 33 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "Je\u017E\u00ED\u0161ova modlitba za u\u010Dedn\u00EDky", startVerse: 1, endVerse: 26 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Zat\u010Den\u00ED", startVerse: 1, endVerse: 14 },
          { title: "Je\u017E\u00ED\u0161 p\u0159ed velekn\u011Bzem", startVerse: 15, endVerse: 24 },
          { title: "Petrovo zap\u0159en\u00ED", startVerse: 25, endVerse: 27 },
          { title: "Je\u017E\u00ED\u0161 p\u0159ed Pil\u00E1tem", startVerse: 28, endVerse: 40 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "Bi\u010Dov\u00E1n\u00ED a odsouzen\u00ED", startVerse: 1, endVerse: 16 },
          { title: "Uk\u0159i\u017Eov\u00E1n\u00ED", startVerse: 17, endVerse: 27 },
          { title: "Je\u017E\u00ED\u0161ova smrt", startVerse: 28, endVerse: 37 },
          { title: "Poh\u0159eb Je\u017E\u00ED\u0161\u016Fv", startVerse: 38, endVerse: 42 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "Pr\u00E1zdn\u00FD hrob", startVerse: 1, endVerse: 10 },
          { title: "Zjeven\u00ED Marii Magdalsk\u00E9", startVerse: 11, endVerse: 18 },
          { title: "Dvoj\u00ED zjeven\u00ED v Jeruzal\u00E9m\u011B", startVerse: 19, endVerse: 29 },
          { title: "Prvn\u00ED dov\u011Btek", startVerse: 30, endVerse: 31 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Zjeven\u00ED v Galileji", startVerse: 1, endVerse: 14 },
          { title: "Rozhovor s \u0160imonem Petrem", startVerse: 15, endVerse: 23 },
          { title: "Druh\u00FD dov\u011Btek evangelia", startVerse: 24, endVerse: 25 },
        ],
      },
    ],
  },
};

/**
 * Get chapter headings for a book by its getbible.net book number.
 */
export function getBookHeadings(bookNumber: number): BookHeadings | null {
  return HEADINGS_BY_BOOK_NUMBER[bookNumber] || null;
}

/**
 * Find which section a verse range falls into.
 */
export function findMatchingSections(
  bookNumber: number,
  chapter: number,
  verseStart: number,
  verseEnd: number | null
): SectionHeading[] {
  const book = HEADINGS_BY_BOOK_NUMBER[bookNumber];
  if (!book) return [];

  const ch = book.chapters.find((c) => c.chapter === chapter);
  if (!ch) return [];

  return ch.sections.filter((s) => {
    const end = verseEnd ?? verseStart;
    // Section overlaps with verse range
    return s.startVerse <= end && s.endVerse >= verseStart;
  });
}
