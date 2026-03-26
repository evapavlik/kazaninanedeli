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

export interface BookPart {
  title: string;
  chapters: string;
  description: string;
}

export interface BookHeadings {
  bookId: string;
  bookName: string;
  bookStructure?: BookPart[];
  chapters: ChapterHeadings[];
}

/** All available book headings, keyed by getbible.net book number */
const HEADINGS_BY_BOOK_NUMBER: Record<number, BookHeadings> = {
  // ==================== MARK (41) ====================
  41: {
    bookId: "mark",
    bookName: "Marek",
    bookStructure: [
      { title: `P\u0159\u00EDprava a po\u010D\u00E1tek p\u016Fsoben\u00ED`, chapters: "1\u20133", description: `Jan K\u0159titel, k\u0159est, povol\u00E1n\u00ED u\u010Dedn\u00EDk\u016F, prvn\u00ED uzdravov\u00E1n\u00ED` },
      { title: `Slu\u017Eba v Galileji`, chapters: "4\u20139", description: `Podobenstv\u00ED, z\u00E1zraky, nasycen\u00ED, Petrovo vyzn\u00E1n\u00ED, prom\u011Bn\u011Bn\u00ED` },
      { title: `Cesta do Jeruzal\u00E9ma`, chapters: "10", description: `U\u010Den\u00ED o man\u017Eelstv\u00ED, bohatstv\u00ED, slu\u017Eb\u011B; t\u0159et\u00ED p\u0159edpov\u011B\u010F utrpen\u00ED` },
      { title: `P\u016Fsoben\u00ED v Jeruzal\u00E9m\u011B`, chapters: "11\u201313", description: `Vjezd, o\u010Di\u0161t\u011Bn\u00ED chr\u00E1mu, spory, eschatologick\u00E1 \u0159e\u010D` },
      { title: `Pa\u0161ije a vzk\u0159\u00ED\u0161en\u00ED`, chapters: "14\u201316", description: `Posledn\u00ED ve\u010De\u0159e, Getsemane, soudy, uk\u0159i\u017Eov\u00E1n\u00ED, pr\u00E1zdn\u00FD hrob` },
    ],
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
    bookStructure: [
      { title: `Prolog`, chapters: "1,1\u201318", description: `Hymnus o Slovu (Logos), sv\u011Bdectv\u00ED Jana K\u0159titele` },
      { title: `Kniha znamen\u00ED`, chapters: "1\u201312", description: `Sedm znamen\u00ED (z\u00E1zrak\u016F), \u0159e\u010Di o sob\u011B (\u201EJ\u00E1 jsem\u201C), r\u016Fst konfliktu` },
      { title: `Kniha sl\u00E1vy`, chapters: "13\u201320", description: `\u0158e\u010Di na rozlou\u010Denou, pa\u0161ije, vzk\u0159\u00ED\u0161en\u00ED, setk\u00E1n\u00ED s Magd\u00E9nou a u\u010Dedn\u00EDky` },
      { title: `Doslov`, chapters: "21", description: `Setk\u00E1n\u00ED u jezera, Petr\u016Fv \u00FAkol, mil\u00FD u\u010Dedn\u00EDk` },
    ],
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

  // ==================== EZEKIEL (26) ====================
  26: {
    bookId: "ezekiel",
    bookName: "Ezechiel",
    bookStructure: [
      { title: `Povol\u00E1n\u00ED a soudy nad Izraelem`, chapters: "1\u201324", description: `Vidn\u00ED Bo\u017E\u00ED sl\u00E1vy, symbolick\u00E1 jedn\u00E1n\u00ED, proroctv\u00ED soudu nad Jeruzal\u00E9mem` },
      { title: `Proroctv\u00ED proti n\u00E1rod\u016Fm`, chapters: "25\u201332", description: `Soudy nad Am\u00F3nem, Mo\u00E1bem, Edomem, Pelištejci, T\u00FDrem, Egyptem` },
      { title: `Obnova a nad\u011Bje`, chapters: "33\u201348", description: `Str\u00E1\u017Ece, dobr\u00FD past\u00FD\u0159, such\u00E9 kosti (37), nov\u00FD chr\u00E1m, nov\u00E1 zem\u011B` },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Vid\u011Bn\u00ED Bo\u017E\u00ED sl\u00E1vy", startVerse: 1, endVerse: 28 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Povol\u00E1n\u00ED proroka", startVerse: 1, endVerse: 7 },
          { title: "Svitek", startVerse: 8, endVerse: 10 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Svitek (pokra\u010Dov\u00E1n\u00ED)", startVerse: 1, endVerse: 3 },
          { title: "Ezechiel str\u00E1\u017Ecem Izraele", startVerse: 4, endVerse: 27 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Symbolick\u00E9 obl\u00E9h\u00E1n\u00ED Jeruzal\u00E9ma", startVerse: 1, endVerse: 17 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Ohl\u00E1\u0161en\u00ED soudu nad Jeruzal\u00E9mem", startVerse: 1, endVerse: 17 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Proroctv\u00ED proti izraelsk\u00FDm hor\u00E1m", startVerse: 1, endVerse: 14 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Konec p\u0159ich\u00E1z\u00ED", startVerse: 1, endVerse: 27 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Vid\u011Bn\u00ED ohavnost\u00ED v chr\u00E1m\u011B", startVerse: 1, endVerse: 18 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Soud nad Jeruzal\u00E9mem", startVerse: 1, endVerse: 11 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Bo\u017E\u00ED sl\u00E1va opou\u0161t\u00ED chr\u00E1m", startVerse: 1, endVerse: 22 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Soud nad kn\u00ED\u017Eaty", startVerse: 1, endVerse: 13 },
          { title: "Zasl\u00EDben\u00ED obnovy", startVerse: 14, endVerse: 25 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Symbolick\u00E9 st\u011Bhov\u00E1n\u00ED", startVerse: 1, endVerse: 20 },
          { title: "Proroctv\u00ED se napln\u00ED", startVerse: 21, endVerse: 28 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Proti fale\u0161n\u00FDm prorok\u016Fm", startVerse: 1, endVerse: 16 },
          { title: "Proti fale\u0161n\u00FDm prorokyn\u00EDm", startVerse: 17, endVerse: 23 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Proti modl\u00E1\u0159\u016Fm", startVerse: 1, endVerse: 11 },
          { title: "Noe Daniel a J\u00F3b", startVerse: 12, endVerse: 23 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Jeruzal\u00E9m jako vinn\u00FD kmen", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Nev\u011Brn\u00FD Jeruzal\u00E9m", startVerse: 1, endVerse: 34 },
          { title: "Soud nad Jeruzal\u00E9mem", startVerse: 35, endVerse: 52 },
          { title: "Zasl\u00EDben\u00ED obnovy", startVerse: 53, endVerse: 63 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "Podobenstv\u00ED o orlech", startVerse: 1, endVerse: 24 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Osobn\u00ED odpov\u011Bdnost", startVerse: 1, endVerse: 20 },
          { title: "V\u00FDzva k obr\u00E1cen\u00ED", startVerse: 21, endVerse: 32 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "\u017Dalozp\u011Bv nad izraelsk\u00FDmi kn\u00ED\u017Eaty", startVerse: 1, endVerse: 14 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "D\u011Bjiny Izraele jako vzpoura", startVerse: 1, endVerse: 32 },
          { title: "Zasl\u00EDben\u00ED obnovy", startVerse: 33, endVerse: 44 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Hospodin\u016Fv me\u010D", startVerse: 1, endVerse: 37 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "H\u0159\u00EDchy Jeruzal\u00E9ma", startVerse: 1, endVerse: 16 },
          { title: "Tavic\u00ED pec", startVerse: 17, endVerse: 22 },
          { title: "Ob\u017Ealoba v\u016Fdc\u016F", startVerse: 23, endVerse: 31 },
        ],
      },
      {
        chapter: 23,
        sections: [
          { title: "Ohola a Ohol\u00EDba", startVerse: 1, endVerse: 35 },
          { title: "Soud nad ob\u011Bma sestrami", startVerse: 36, endVerse: 49 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Podobenstv\u00ED o hrnci", startVerse: 1, endVerse: 14 },
          { title: "Smrt Ezechielovy \u017Eeny", startVerse: 15, endVerse: 27 },
        ],
      },
      {
        chapter: 25,
        sections: [
          { title: "Proti Amm\u00F3nu", startVerse: 1, endVerse: 7 },
          { title: "Proti Mo\u00E1bu", startVerse: 8, endVerse: 11 },
          { title: "Proti Ed\u00F3mu", startVerse: 12, endVerse: 14 },
          { title: "Proti Peli\u0161tejc\u016Fm", startVerse: 15, endVerse: 17 },
        ],
      },
      {
        chapter: 26,
        sections: [
          { title: "Proti T\u00FDru", startVerse: 1, endVerse: 21 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "\u017Dalozp\u011Bv nad T\u00FDrem", startVerse: 1, endVerse: 36 },
        ],
      },
      {
        chapter: 28,
        sections: [
          { title: "P\u00E1d t\u00FDrsk\u00E9ho kr\u00E1le", startVerse: 1, endVerse: 19 },
          { title: "Proti Sid\u00F3nu", startVerse: 20, endVerse: 24 },
          { title: "Zasl\u00EDben\u00ED Izraeli", startVerse: 25, endVerse: 26 },
        ],
      },
      {
        chapter: 29,
        sections: [
          { title: "Proti Egyptu", startVerse: 1, endVerse: 16 },
          { title: "Babyl\u00F3n dostane Egypt", startVerse: 17, endVerse: 21 },
        ],
      },
      {
        chapter: 30,
        sections: [
          { title: "Bi\u010D na Egypt", startVerse: 1, endVerse: 19 },
          { title: "Zlomen\u00ED fara\u00F3novy pa\u017Ee", startVerse: 20, endVerse: 26 },
        ],
      },
      {
        chapter: 31,
        sections: [
          { title: "Farao jako cedr libanonsk\u00FD", startVerse: 1, endVerse: 18 },
        ],
      },
      {
        chapter: 32,
        sections: [
          { title: "\u017Dalozp\u011Bv nad fara\u00F3nem", startVerse: 1, endVerse: 16 },
          { title: "Sestup do podsv\u011Bt\u00ED", startVerse: 17, endVerse: 32 },
        ],
      },
      {
        chapter: 33,
        sections: [
          { title: "Ezechiel str\u00E1\u017Ecem", startVerse: 1, endVerse: 20 },
          { title: "P\u00E1d Jeruzal\u00E9ma", startVerse: 21, endVerse: 33 },
        ],
      },
      {
        chapter: 34,
        sections: [
          { title: "Proti \u0161patn\u00FDm past\u00FD\u0159\u016Fm", startVerse: 1, endVerse: 10 },
          { title: "Hospodin past\u00FD\u0159em", startVerse: 11, endVerse: 22 },
          { title: "Zasl\u00EDben\u00ED pokoje", startVerse: 23, endVerse: 31 },
        ],
      },
      {
        chapter: 35,
        sections: [
          { title: "Proroctv\u00ED proti Se\u00EDru", startVerse: 1, endVerse: 15 },
        ],
      },
      {
        chapter: 36,
        sections: [
          { title: "Zasl\u00EDben\u00ED izraelsk\u00FDm hor\u00E1m", startVerse: 1, endVerse: 15 },
          { title: "Nov\u00E9 srdce a nov\u00FD duch", startVerse: 16, endVerse: 38 },
        ],
      },
      {
        chapter: 37,
        sections: [
          { title: "\u00DAdol\u00ED such\u00FDch kost\u00ED", startVerse: 1, endVerse: 14 },
          { title: "Dv\u011B d\u0159eva", startVerse: 15, endVerse: 28 },
        ],
      },
      {
        chapter: 38,
        sections: [
          { title: "Proroctv\u00ED proti G\u00F3govi", startVerse: 1, endVerse: 23 },
        ],
      },
      {
        chapter: 39,
        sections: [
          { title: "Zk\u00E1za G\u00F3ga", startVerse: 1, endVerse: 20 },
          { title: "Obnova Izraele", startVerse: 21, endVerse: 29 },
        ],
      },
      {
        chapter: 40,
        sections: [
          { title: "Vid\u011Bn\u00ED nov\u00E9ho chr\u00E1mu", startVerse: 1, endVerse: 49 },
        ],
      },
      {
        chapter: 41,
        sections: [
          { title: "Chr\u00E1mov\u00E1 s\u00ED\u0148", startVerse: 1, endVerse: 26 },
        ],
      },
      {
        chapter: 42,
        sections: [
          { title: "Kn\u011B\u017Esk\u00E9 m\u00EDstnosti", startVerse: 1, endVerse: 20 },
        ],
      },
      {
        chapter: 43,
        sections: [
          { title: "N\u00E1vrat Bo\u017E\u00ED sl\u00E1vy", startVerse: 1, endVerse: 12 },
          { title: "Olt\u00E1\u0159", startVerse: 13, endVerse: 27 },
        ],
      },
      {
        chapter: 44,
        sections: [
          { title: "Slu\u017Eba v chr\u00E1m\u011B", startVerse: 1, endVerse: 31 },
        ],
      },
      {
        chapter: 45,
        sections: [
          { title: "Posv\u00E1tn\u00FD d\u00EDl zem\u011B", startVerse: 1, endVerse: 12 },
          { title: "Ob\u011Bti", startVerse: 13, endVerse: 25 },
        ],
      },
      {
        chapter: 46,
        sections: [
          { title: "Bohoslu\u017Eebn\u00E9 \u0159\u00E1dy", startVerse: 1, endVerse: 18 },
          { title: "Chr\u00E1mov\u00E9 kuchyn\u011B", startVerse: 19, endVerse: 24 },
        ],
      },
      {
        chapter: 47,
        sections: [
          { title: "Pramen z chr\u00E1mu", startVerse: 1, endVerse: 12 },
          { title: "Hranice zem\u011B", startVerse: 13, endVerse: 23 },
        ],
      },
      {
        chapter: 48,
        sections: [
          { title: "Rozd\u011Blen\u00ED zem\u011B", startVerse: 1, endVerse: 29 },
          { title: "Br\u00E1ny Jeruzal\u00E9ma", startVerse: 30, endVerse: 35 },
        ],
      },
    ],
  },

  // ==================== ROMANS (45) ====================
  45: {
    bookId: "romans",
    bookName: "\u0158\u00EDman\u016Fm",
    bookStructure: [
      { title: `\u00DAvod a t\u00E9ma`, chapters: "1,1\u201317", description: `Pozdrav, evangelium jako Bo\u017E\u00ED moc ke sp\u00E1se` },
      { title: `Bo\u017E\u00ED hn\u011Bv a ospravedln\u011Bn\u00ED`, chapters: "1\u20134", description: `V\u0161ichni zh\u0159e\u0161ili, ospravedln\u011Bn\u00ED v\u00EDrou, p\u0159\u00EDklad Abrahama` },
      { title: `Nov\u00FD \u017Eivot v Kristu`, chapters: "5\u20138", description: `Sm\u00ED\u0159en\u00ED, k\u0159est, svoboda od Z\u00E1kona, \u017Eivot v Duchu` },
      { title: `Izrael a Bo\u017E\u00ED pl\u00E1n`, chapters: "9\u201311", description: `Vyvolen\u00ED, zatvrzen\u00ED, olivov\u00FD strom, budouc\u00ED z\u00E1chrana` },
      { title: `Praktick\u00FD \u017Eivot v\u00EDry`, chapters: "12\u201315", description: `Etick\u00E9 napomenut\u00ED, l\u00E1ska, autorita, slab\u00ED a siln\u00ED` },
      { title: `Z\u00E1v\u011Br a pozdravy`, chapters: "16", description: `Pozdravy, varov\u00E1n\u00ED, doxologie` },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Pozdrav", startVerse: 1, endVerse: 7 },
          { title: "Pavlova touha nav\u0161t\u00EDvit \u0158\u00EDm", startVerse: 8, endVerse: 15 },
          { title: "Moc evangelia", startVerse: 16, endVerse: 17 },
          { title: "Hn\u011Bv Bo\u017E\u00ED nad bezbo\u017Enost\u00ED", startVerse: 18, endVerse: 32 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Bo\u017E\u00ED soud", startVerse: 1, endVerse: 16 },
          { title: "\u017Did\u00E9 a Z\u00E1kon", startVerse: 17, endVerse: 29 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "P\u0159ednost \u017Did\u016F", startVerse: 1, endVerse: 8 },
          { title: "V\u0161ichni jsou pod h\u0159\u00EDchem", startVerse: 9, endVerse: 20 },
          { title: "Ospravedln\u011Bn\u00ED z v\u00EDry", startVerse: 21, endVerse: 31 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "P\u0159\u00EDklad Abraham\u016Fv", startVerse: 1, endVerse: 12 },
          { title: "Zasl\u00EDben\u00ED se uskute\u010D\u0148uje v\u00EDrou", startVerse: 13, endVerse: 25 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Ovoce ospravedln\u011Bn\u00ED", startVerse: 1, endVerse: 11 },
          { title: "Adam a Kristus", startVerse: 12, endVerse: 21 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "K\u0159est a nov\u00FD \u017Eivot", startVerse: 1, endVerse: 14 },
          { title: "Slu\u017Eba spravedlnosti", startVerse: 15, endVerse: 23 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Od Z\u00E1kona k milosti", startVerse: 1, endVerse: 6 },
          { title: "Z\u00E1kon a h\u0159\u00EDch", startVerse: 7, endVerse: 13 },
          { title: "Vnit\u0159n\u00ED rozpor \u010Dlov\u011Bka", startVerse: 14, endVerse: 25 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "\u017Divot z moci Ducha svat\u00E9ho", startVerse: 1, endVerse: 11 },
          { title: "Synov\u00E9 Bo\u017E\u00ED", startVerse: 12, endVerse: 17 },
          { title: "Budouc\u00ED sl\u00E1va", startVerse: 18, endVerse: 30 },
          { title: "Hymnus o Bo\u017E\u00ED l\u00E1sce", startVerse: 31, endVerse: 39 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Bolest nad Izraelem", startVerse: 1, endVerse: 5 },
          { title: "Bo\u017E\u00ED vyvolen\u00ED", startVerse: 6, endVerse: 13 },
          { title: "Bo\u017E\u00ED svrchovanost", startVerse: 14, endVerse: 29 },
          { title: "Izrael a evangelium", startVerse: 30, endVerse: 33 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Spravedlnost z v\u00EDry", startVerse: 1, endVerse: 13 },
          { title: "V\u00EDra ze zv\u011Bstov\u00E1n\u00ED", startVerse: 14, endVerse: 21 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Bo\u017E\u00ED pl\u00E1n s Izraelem", startVerse: 1, endVerse: 12 },
          { title: "P\u0159ijet\u00ED pohan\u016F", startVerse: 13, endVerse: 24 },
          { title: "Kone\u010Dn\u00E1 sp\u00E1sa Izraele", startVerse: 25, endVerse: 36 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Prav\u00E1 bohoslu\u017Eba", startVerse: 1, endVerse: 2 },
          { title: "Dary milosti", startVerse: 3, endVerse: 8 },
          { title: "Pravidla k\u0159es\u0165ansk\u00E9ho \u017Eivota", startVerse: 9, endVerse: 21 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Pod\u0159\u00EDzenost vl\u00E1dn\u00ED moci", startVerse: 1, endVerse: 7 },
          { title: "L\u00E1ska \u2014 napln\u011Bn\u00ED Z\u00E1kona", startVerse: 8, endVerse: 10 },
          { title: "Bl\u00EDzko je den", startVerse: 11, endVerse: 14 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Siln\u00ED a slab\u00ED ve v\u00ED\u0159e", startVerse: 1, endVerse: 12 },
          { title: "Nikoho nepohor\u0161ovat", startVerse: 13, endVerse: 23 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Sn\u00E1\u0161et slabosti bli\u017En\u00EDch", startVerse: 1, endVerse: 13 },
          { title: "Pavlova slu\u017Eba pohan\u016Fm", startVerse: 14, endVerse: 21 },
          { title: "Pl\u00E1n cesty do \u0158\u00EDma", startVerse: 22, endVerse: 33 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Doporu\u010Den\u00ED a pozdravy", startVerse: 1, endVerse: 16 },
          { title: "Varov\u00E1n\u00ED", startVerse: 17, endVerse: 20 },
          { title: "Z\u00E1v\u011Bre\u010Dn\u00E9 pozdravy", startVerse: 21, endVerse: 24 },
          { title: "Doxologie", startVerse: 25, endVerse: 27 },
        ],
      },
    ],
  },

  // ==================== ISAIAH (23) ====================
  23: {
    bookId: "isaiah",
    bookName: "Izaj\u00E1\u0161",
    bookStructure: [
      { title: "Proto-Izaj\u00E1\u0161", chapters: "1\u201339", description: "Soudy a zasl\u00EDben\u00ED pro Judu a Jeruzal\u00E9m, prorock\u00E1 vol\u00E1n\u00ED, mesi\u00E1\u0161sk\u00E1 zasl\u00EDben\u00ED" },
      { title: "Historick\u00FD dodatek", chapters: "36\u201339", description: "Senacheribovo ta\u017Een\u00ED, Chizkij\u00E1\u0161ova nemoc" },
      { title: "Deutero-Izaj\u00E1\u0161 (Kniha \u00FAt\u011Bchy)", chapters: "40\u201355", description: "Konec exilu, Hospodin\u016Fv slu\u017Eebn\u00EDk, nov\u00FD exodus, p\u00EDsn\u011B o slu\u017Eebn\u00EDku" },
      { title: "Trito-Izaj\u00E1\u0161", chapters: "56\u201366", description: "Obnova Jeruzal\u00E9ma, spravedlnost, eschatologick\u00E9 vize" },
    ],
    chapters: [
      {
        chapter: 40,
        sections: [
          { title: "Pot\u011B\u0161te m\u016Fj lid", startVerse: 1, endVerse: 11 },
          { title: "Nesrovnateln\u00FD B\u016Fh", startVerse: 12, endVerse: 26 },
          { title: "S\u00EDla pro zemdlen\u00E9", startVerse: 27, endVerse: 31 },
        ],
      },
      {
        chapter: 42,
        sections: [
          { title: "Prvn\u00ED p\u00EDse\u0148 o Hospodinov\u011B slu\u017Eebn\u00EDku", startVerse: 1, endVerse: 9 },
          { title: "Nov\u00E1 p\u00EDse\u0148 Hospodinu", startVerse: 10, endVerse: 17 },
          { title: "Slep\u00FD a hluch\u00FD slu\u017Eebn\u00EDk", startVerse: 18, endVerse: 25 },
        ],
      },
      {
        chapter: 49,
        sections: [
          { title: "Druh\u00E1 p\u00EDse\u0148 o Hospodinov\u011B slu\u017Eebn\u00EDku", startVerse: 1, endVerse: 7 },
          { title: "Obnova Izraele", startVerse: 8, endVerse: 13 },
          { title: "Si\u00F3n nen\u00ED opu\u0161t\u011Bn", startVerse: 14, endVerse: 26 },
        ],
      },
      {
        chapter: 50,
        sections: [
          { title: "Hospodinova ruka nen\u00ED kr\u00E1tk\u00E1", startVerse: 1, endVerse: 3 },
          { title: "T\u0159et\u00ED p\u00EDse\u0148 o Hospodinov\u011B slu\u017Eebn\u00EDku", startVerse: 4, endVerse: 9 },
          { title: "V\u00FDzva k d\u016Fv\u011B\u0159e", startVerse: 10, endVerse: 11 },
        ],
      },
      {
        chapter: 52,
        sections: [
          { title: "Prob\u010F, oble\u010D se v s\u00EDlu", startVerse: 1, endVerse: 6 },
          { title: "Posel radostn\u00E9 zpr\u00E1vy", startVerse: 7, endVerse: 12 },
          { title: "\u010Ctvrt\u00E1 p\u00EDse\u0148 o Hospodinov\u011B slu\u017Eebn\u00EDku (za\u010D\u00E1tek)", startVerse: 13, endVerse: 15 },
        ],
      },
      {
        chapter: 53,
        sections: [
          { title: "Trp\u00EDc\u00ED slu\u017Eebn\u00EDk (pokra\u010Dov\u00E1n\u00ED)", startVerse: 1, endVerse: 6 },
          { title: "Slu\u017Eebn\u00EDk\u016Fv \u00FAd\u011Bl", startVerse: 7, endVerse: 12 },
        ],
      },
    ],
  },

  // ==================== MATTHEW (40) ====================
  40: {
    bookId: "matthew",
    bookName: "Matou\u0161",
    bookStructure: [
      { title: "Po\u010D\u00E1tky", chapters: "1\u20132", description: "Rodokmen, narozen\u00ED, mudrcov\u00E9, \u00FAt\u011Bk do Egypta" },
      { title: "P\u0159\u00EDprava a za\u010D\u00E1tek slu\u017Eby", chapters: "3\u20134", description: "Jan K\u0159titel, k\u0159est, poku\u0161en\u00ED, prvn\u00ED u\u010Dedn\u00EDci" },
      { title: "K\u00E1z\u00E1n\u00ED na ho\u0159e", chapters: "5\u20137", description: "Blahoslavenstv\u00ED, etika kr\u00E1lovstv\u00ED, modlitba P\u00E1n\u011B" },
      { title: "Z\u00E1zraky a posl\u00E1n\u00ED", chapters: "8\u201310", description: "Deset z\u00E1zrak\u016F, vyslan\u00ED dvan\u00E1cti" },
      { title: "Odpov\u011Bdi a podobenstv\u00ED", chapters: "11\u201313", description: "Jan K\u0159titel, spory o sobotu, podobenstv\u00ED o kr\u00E1lovstv\u00ED" },
      { title: "Formov\u00E1n\u00ED c\u00EDrkve", chapters: "14\u201318", description: "Nasycen\u00ED, Petrovo vyzn\u00E1n\u00ED, prom\u011Bn\u011Bn\u00ED, \u0159\u00E1d sboru" },
      { title: "Cesta do Jeruzal\u00E9ma", chapters: "19\u201320", description: "U\u010Den\u00ED o man\u017Eelstv\u00ED, bohatstv\u00ED, d\u011Blnick\u00E9 podobenstv\u00ED" },
      { title: "P\u016Fsoben\u00ED v Jeruzal\u00E9m\u011B", chapters: "21\u201325", description: "Vjezd, spory v chr\u00E1mu, eschatologick\u00E1 \u0159e\u010D, podobenstv\u00ED o soudu" },
      { title: "Pa\u0161ije a vzk\u0159\u00ED\u0161en\u00ED", chapters: "26\u201328", description: "Posledn\u00ED ve\u010De\u0159e, Getsemane, soudy, uk\u0159i\u017Eov\u00E1n\u00ED, vzk\u0159\u00ED\u0161en\u00ED, vyslan\u00ED" },
    ],
    chapters: [
      {
        chapter: 21,
        sections: [
          { title: "Vjezd do Jeruzal\u00E9ma", startVerse: 1, endVerse: 11 },
          { title: "O\u010Di\u0161t\u011Bn\u00ED chr\u00E1mu", startVerse: 12, endVerse: 17 },
          { title: "Proklet\u00ED f\u00EDkovn\u00EDku", startVerse: 18, endVerse: 22 },
          { title: "Spor o Je\u017E\u00ED\u0161ovu pravomoc", startVerse: 23, endVerse: 27 },
          { title: "Podobenstv\u00ED o dvou synech", startVerse: 28, endVerse: 32 },
          { title: "Podobenstv\u00ED o zl\u00FDch vina\u0159\u00EDch", startVerse: 33, endVerse: 46 },
        ],
      },
      {
        chapter: 26,
        sections: [
          { title: "Rada velekn\u011B\u017E\u00ED", startVerse: 1, endVerse: 5 },
          { title: "Pomaz\u00E1n\u00ED v Betanii", startVerse: 6, endVerse: 13 },
          { title: "Jid\u00E1\u0161ova zrada", startVerse: 14, endVerse: 16 },
          { title: "Posledn\u00ED ve\u010De\u0159e", startVerse: 17, endVerse: 30 },
          { title: "P\u0159edpov\u011B\u010F Petrova zap\u0159en\u00ED", startVerse: 31, endVerse: 35 },
          { title: "Getsemane", startVerse: 36, endVerse: 46 },
          { title: "Zat\u010Den\u00ED", startVerse: 47, endVerse: 56 },
          { title: "P\u0159ed veleradou", startVerse: 57, endVerse: 68 },
          { title: "Petrovo zap\u0159en\u00ED", startVerse: 69, endVerse: 75 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "Vyd\u00E1n\u00ED Pil\u00E1tovi", startVerse: 1, endVerse: 2 },
          { title: "Jid\u00E1\u0161\u016Fv konec", startVerse: 3, endVerse: 10 },
          { title: "Je\u017E\u00ED\u0161 p\u0159ed Pil\u00E1tem", startVerse: 11, endVerse: 26 },
          { title: "V\u00FDsm\u011Bch vojak\u016F", startVerse: 27, endVerse: 31 },
          { title: "Uk\u0159i\u017Eov\u00E1n\u00ED", startVerse: 32, endVerse: 44 },
          { title: "Je\u017E\u00ED\u0161ova smrt", startVerse: 45, endVerse: 56 },
          { title: "Poh\u0159eb", startVerse: 57, endVerse: 61 },
          { title: "Str\u00E1\u017E u hrobu", startVerse: 62, endVerse: 66 },
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
