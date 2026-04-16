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
    bookName: "Izajáš",
    bookStructure: [
      { title: "Proto-Izajáš (kap. 1–39)", chapters: "1–39", description: "Soudy a zaslíbení pro Judu a Jeruzalém, prorocká volání, mesiášská zaslíbení" },
      { title: "Deutero-Izajáš (kap. 40–55)", chapters: "40–55", description: "Kniha útěchy — konec exilu, Hospodinův služebník, nový exodus" },
      { title: "Trito-Izajáš (kap. 56–66)", chapters: "56–66", description: "Obnova a naděje — obnova Jeruzaléma, spravedlnost, eschatologické vize" },
    ],
    chapters: [
      // ---- Proto-Izajáš (1–39) ----
      {
        chapter: 1,
        sections: [
          { title: "Vidění Izajáše", startVerse: 1, endVerse: 9 },
          { title: "Proti pokrytecké bohoslužbě", startVerse: 10, endVerse: 20 },
          { title: "Nevěrné město", startVerse: 21, endVerse: 31 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Hora Hospodinova domu", startVerse: 1, endVerse: 5 },
          { title: "Den Hospodinův proti pýše", startVerse: 6, endVerse: 22 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Soud nad Jeruzalémem", startVerse: 1, endVerse: 15 },
          { title: "Proti dcerám sijónským", startVerse: 16, endVerse: 26 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Sedm žen", startVerse: 1, endVerse: 1 },
          { title: "Výhonek Hospodinův", startVerse: 2, endVerse: 6 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Píseň o vinici", startVerse: 1, endVerse: 7 },
          { title: "Šestero běda", startVerse: 8, endVerse: 24 },
          { title: "Hospodinův hněv a asyrská hrozba", startVerse: 25, endVerse: 30 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Povolání Izajáše", startVerse: 1, endVerse: 7 },
          { title: "Prorocké poslání", startVerse: 8, endVerse: 13 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Izajáš a Achaz", startVerse: 1, endVerse: 9 },
          { title: "Znamení Immanuele", startVerse: 10, endVerse: 17 },
          { title: "Asyrská pohroma", startVerse: 18, endVerse: 25 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Maher-šálal-cháš-baz", startVerse: 1, endVerse: 4 },
          { title: "Vody Šilóachu a vody Eufratu", startVerse: 5, endVerse: 10 },
          { title: "Hospodin je útočiště i kámen úrazu", startVerse: 11, endVerse: 18 },
          { title: "Varování před věštci", startVerse: 19, endVerse: 22 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Lid, který chodí v temnotách", startVerse: 1, endVerse: 6 },
          { title: "Hospodinův hněv proti Izraeli", startVerse: 7, endVerse: 12 },
          { title: "Lid se neobrátil", startVerse: 13, endVerse: 20 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Běda zákonodárcům nepravosti", startVerse: 1, endVerse: 4 },
          { title: "Asýrie — metla Hospodinova hněvu", startVerse: 5, endVerse: 19 },
          { title: "Pozůstatek se navrátí", startVerse: 20, endVerse: 27 },
          { title: "Postup nepřítele", startVerse: 28, endVerse: 34 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Výhonek z pařezu Jišajova", startVerse: 1, endVerse: 5 },
          { title: "Mesiášský pokoj", startVerse: 6, endVerse: 10 },
          { title: "Návrat rozptýlených", startVerse: 11, endVerse: 16 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Píseň díkůvzdání", startVerse: 1, endVerse: 3 },
          { title: "Chvalozpěv vykoupených", startVerse: 4, endVerse: 6 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Výnos proti Babylónu", startVerse: 1, endVerse: 8 },
          { title: "Den Hospodinův", startVerse: 9, endVerse: 16 },
          { title: "Pád Babylónu", startVerse: 17, endVerse: 22 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Návrat Izraele", startVerse: 1, endVerse: 2 },
          { title: "Posměšná píseň na babylónského krále", startVerse: 3, endVerse: 23 },
          { title: "Výnos proti Asýrii", startVerse: 24, endVerse: 27 },
          { title: "Výnos proti Pelištejcům", startVerse: 28, endVerse: 32 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Výnos proti Moábu", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Moáb hledá útočiště", startVerse: 1, endVerse: 5 },
          { title: "Pýcha Moábu", startVerse: 6, endVerse: 12 },
          { title: "Slovo proti Moábu", startVerse: 13, endVerse: 14 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "Výnos proti Damašku", startVerse: 1, endVerse: 6 },
          { title: "Člověk pohlédne ke svému Tvůrci", startVerse: 7, endVerse: 11 },
          { title: "Hukot pronárodů", startVerse: 12, endVerse: 14 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Výnos proti Kúši", startVerse: 1, endVerse: 7 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "Výnos proti Egyptu", startVerse: 1, endVerse: 15 },
          { title: "Egypt pozná Hospodina", startVerse: 16, endVerse: 25 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "Izajášovo znamení proti Egyptu a Kúši", startVerse: 1, endVerse: 6 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Výnos o pouštní pustině — pád Babylónu", startVerse: 1, endVerse: 10 },
          { title: "Výnos o Dúmě", startVerse: 11, endVerse: 12 },
          { title: "Výnos o Arábii", startVerse: 13, endVerse: 17 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "Výnos o Údolí vidění", startVerse: 1, endVerse: 14 },
          { title: "Proti Šebnovi", startVerse: 15, endVerse: 19 },
          { title: "Eljákím na Šebnovo místo", startVerse: 20, endVerse: 25 },
        ],
      },
      {
        chapter: 23,
        sections: [
          { title: "Výnos proti Týru", startVerse: 1, endVerse: 14 },
          { title: "Obnova Týru", startVerse: 15, endVerse: 18 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Hospodinův soud nad zemí", startVerse: 1, endVerse: 13 },
          { title: "Chvála uprostřed soudu", startVerse: 14, endVerse: 20 },
          { title: "Hospodin bude kralovat", startVerse: 21, endVerse: 23 },
        ],
      },
      {
        chapter: 25,
        sections: [
          { title: "Chvalozpěv za vysvobození", startVerse: 1, endVerse: 5 },
          { title: "Hostina na hoře Sijónu", startVerse: 6, endVerse: 8 },
          { title: "Radost z Hospodinovy záchrany", startVerse: 9, endVerse: 12 },
        ],
      },
      {
        chapter: 26,
        sections: [
          { title: "Píseň důvěry", startVerse: 1, endVerse: 6 },
          { title: "Touha po Hospodinu", startVerse: 7, endVerse: 15 },
          { title: "Vzkříšení mrtvých", startVerse: 16, endVerse: 21 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "Hospodin potrestá leviatana", startVerse: 1, endVerse: 1 },
          { title: "Píseň o vinici", startVerse: 2, endVerse: 6 },
          { title: "Očištění Izraele", startVerse: 7, endVerse: 11 },
          { title: "Shromáždění rozptýlených", startVerse: 12, endVerse: 13 },
        ],
      },
      {
        chapter: 28,
        sections: [
          { title: "Běda Samaří", startVerse: 1, endVerse: 6 },
          { title: "Proti opilým prorokům", startVerse: 7, endVerse: 13 },
          { title: "Úhelný kámen na Sijónu", startVerse: 14, endVerse: 22 },
          { title: "Podobenství o rolníkovi", startVerse: 23, endVerse: 29 },
        ],
      },
      {
        chapter: 29,
        sections: [
          { title: "Běda Aríeli", startVerse: 1, endVerse: 8 },
          { title: "Zaslepený lid", startVerse: 9, endVerse: 14 },
          { title: "Proměna", startVerse: 15, endVerse: 24 },
        ],
      },
      {
        chapter: 30,
        sections: [
          { title: "Proti spojenectví s Egyptem", startVerse: 1, endVerse: 7 },
          { title: "Vzpurný lid", startVerse: 8, endVerse: 17 },
          { title: "Hospodinova milost", startVerse: 18, endVerse: 26 },
          { title: "Soud nad Asýrií", startVerse: 27, endVerse: 33 },
        ],
      },
      {
        chapter: 31,
        sections: [
          { title: "Běda těm, kdo hledají pomoc v Egyptě", startVerse: 1, endVerse: 3 },
          { title: "Hospodin ochrání Jeruzalém", startVerse: 4, endVerse: 9 },
        ],
      },
      {
        chapter: 32,
        sections: [
          { title: "Král bude vládnout spravedlivě", startVerse: 1, endVerse: 8 },
          { title: "Varování bezstarostným ženám", startVerse: 9, endVerse: 14 },
          { title: "Vylití Ducha", startVerse: 15, endVerse: 20 },
        ],
      },
      {
        chapter: 33,
        sections: [
          { title: "Běda ničiteli", startVerse: 1, endVerse: 6 },
          { title: "Hospodin povstane", startVerse: 7, endVerse: 16 },
          { title: "Král v jeho kráse", startVerse: 17, endVerse: 24 },
        ],
      },
      {
        chapter: 34,
        sections: [
          { title: "Soud nad pronárody", startVerse: 1, endVerse: 4 },
          { title: "Soud nad Edómem", startVerse: 5, endVerse: 17 },
        ],
      },
      {
        chapter: 35,
        sections: [
          { title: "Poušť se rozveselí", startVerse: 1, endVerse: 4 },
          { title: "Uzdravení a návrat", startVerse: 5, endVerse: 10 },
        ],
      },
      {
        chapter: 36,
        sections: [
          { title: "Senacheríbovo tažení proti Judsku", startVerse: 1, endVerse: 10 },
          { title: "Rabšakovy výhrůžky", startVerse: 11, endVerse: 22 },
        ],
      },
      {
        chapter: 37,
        sections: [
          { title: "Chizkijáš hledá Hospodina", startVerse: 1, endVerse: 7 },
          { title: "Senacheríbův dopis", startVerse: 8, endVerse: 13 },
          { title: "Chizkijášova modlitba", startVerse: 14, endVerse: 20 },
          { title: "Izajášovo proroctví proti Asýrii", startVerse: 21, endVerse: 35 },
          { title: "Porážka Asýrie", startVerse: 36, endVerse: 38 },
        ],
      },
      {
        chapter: 38,
        sections: [
          { title: "Chizkijášova nemoc a uzdravení", startVerse: 1, endVerse: 8 },
          { title: "Chizkijášův žalm", startVerse: 9, endVerse: 20 },
          { title: "Lék z fíků", startVerse: 21, endVerse: 22 },
        ],
      },
      {
        chapter: 39,
        sections: [
          { title: "Babylónští vyslanci", startVerse: 1, endVerse: 4 },
          { title: "Izajášovo proroctví o babylónském zajetí", startVerse: 5, endVerse: 8 },
        ],
      },
      // ---- Deutero-Izajáš (40–55) ----
      {
        chapter: 40,
        sections: [
          { title: "Potěšte můj lid", startVerse: 1, endVerse: 11 },
          { title: "Nesrovnatelný Bůh", startVerse: 12, endVerse: 26 },
          { title: "Síla pro zemdlené", startVerse: 27, endVerse: 31 },
        ],
      },
      {
        chapter: 41,
        sections: [
          { title: "Hospodin povolává z východu", startVerse: 1, endVerse: 7 },
          { title: "Izrael — Hospodinův služebník", startVerse: 8, endVerse: 16 },
          { title: "Hospodin dá vodu na poušti", startVerse: 17, endVerse: 20 },
          { title: "Spor s modlami", startVerse: 21, endVerse: 29 },
        ],
      },
      {
        chapter: 42,
        sections: [
          { title: "První píseň o Hospodinově služebníku", startVerse: 1, endVerse: 9 },
          { title: "Nová píseň Hospodinu", startVerse: 10, endVerse: 17 },
          { title: "Slepý a hluchý služebník", startVerse: 18, endVerse: 25 },
        ],
      },
      {
        chapter: 43,
        sections: [
          { title: "Neboj se, já jsem tě vykoupil", startVerse: 1, endVerse: 7 },
          { title: "Hospodin — jediný svědek", startVerse: 8, endVerse: 13 },
          { title: "Nový exodus", startVerse: 14, endVerse: 21 },
          { title: "Hospodinova výtka Izraeli", startVerse: 22, endVerse: 28 },
        ],
      },
      {
        chapter: 44,
        sections: [
          { title: "Vylití Ducha na Izrael", startVerse: 1, endVerse: 5 },
          { title: "Hospodin — jediný Bůh", startVerse: 6, endVerse: 8 },
          { title: "Marnost modlářství", startVerse: 9, endVerse: 20 },
          { title: "Hospodin vykoupil Izraele", startVerse: 21, endVerse: 23 },
          { title: "Kýros — Hospodinův pastýř", startVerse: 24, endVerse: 28 },
        ],
      },
      {
        chapter: 45,
        sections: [
          { title: "Hospodinův pomazaný Kýros", startVerse: 1, endVerse: 8 },
          { title: "Hospodin — Stvořitel", startVerse: 9, endVerse: 13 },
          { title: "Pronárody poznají Hospodina", startVerse: 14, endVerse: 19 },
          { title: "Jediný Bůh a Spasitel", startVerse: 20, endVerse: 25 },
        ],
      },
      {
        chapter: 46,
        sections: [
          { title: "Pád babylónských model", startVerse: 1, endVerse: 7 },
          { title: "Hospodin uskuteční svůj záměr", startVerse: 8, endVerse: 13 },
        ],
      },
      {
        chapter: 47,
        sections: [
          { title: "Pád paní Babylónu", startVerse: 1, endVerse: 7 },
          { title: "Babylón se spoléhal na svou moudrost", startVerse: 8, endVerse: 15 },
        ],
      },
      {
        chapter: 48,
        sections: [
          { title: "Hospodin oznamuje nové věci", startVerse: 1, endVerse: 11 },
          { title: "Hospodinův vyvolený vykoná jeho vůli", startVerse: 12, endVerse: 16 },
          { title: "Výzva k odchodu z Babylónu", startVerse: 17, endVerse: 22 },
        ],
      },
      {
        chapter: 49,
        sections: [
          { title: "Druhá píseň o Hospodinově služebníku", startVerse: 1, endVerse: 7 },
          { title: "Obnova Izraele", startVerse: 8, endVerse: 13 },
          { title: "Sijón není opuštěn", startVerse: 14, endVerse: 26 },
        ],
      },
      {
        chapter: 50,
        sections: [
          { title: "Hospodinova ruka není krátká", startVerse: 1, endVerse: 3 },
          { title: "Třetí píseň o Hospodinově služebníku", startVerse: 4, endVerse: 9 },
          { title: "Výzva k důvěře", startVerse: 10, endVerse: 11 },
        ],
      },
      {
        chapter: 51,
        sections: [
          { title: "Abrahám a Sára — příklad víry", startVerse: 1, endVerse: 3 },
          { title: "Hospodinova spravedlnost přichází", startVerse: 4, endVerse: 8 },
          { title: "Probuď se, paže Hospodinova", startVerse: 9, endVerse: 16 },
          { title: "Probuď se, Jeruzaléme", startVerse: 17, endVerse: 23 },
        ],
      },
      {
        chapter: 52,
        sections: [
          { title: "Probuď, oblec se v sílu", startVerse: 1, endVerse: 6 },
          { title: "Posel radostné zprávy", startVerse: 7, endVerse: 12 },
          { title: "Čtvrtá píseň o Hospodinově služebníku (začátek)", startVerse: 13, endVerse: 15 },
        ],
      },
      {
        chapter: 53,
        sections: [
          { title: "Trpící služebník (pokračování)", startVerse: 1, endVerse: 6 },
          { title: "Služebníkův úděl", startVerse: 7, endVerse: 12 },
        ],
      },
      {
        chapter: 54,
        sections: [
          { title: "Jásej, neplodná", startVerse: 1, endVerse: 10 },
          { title: "Nový Jeruzalém", startVerse: 11, endVerse: 17 },
        ],
      },
      {
        chapter: 55,
        sections: [
          { title: "Pozvání žíznivých", startVerse: 1, endVerse: 5 },
          { title: "Hledejte Hospodina", startVerse: 6, endVerse: 9 },
          { title: "Slovo se nevrátí s prázdnou", startVerse: 10, endVerse: 13 },
        ],
      },
      // ---- Trito-Izajáš (56–66) ----
      {
        chapter: 56,
        sections: [
          { title: "Spása pro všechny národy", startVerse: 1, endVerse: 8 },
          { title: "Proti nehodným vůdcům", startVerse: 9, endVerse: 12 },
        ],
      },
      {
        chapter: 57,
        sections: [
          { title: "Spravedlivý hyne", startVerse: 1, endVerse: 2 },
          { title: "Proti modloslužebníkům", startVerse: 3, endVerse: 13 },
          { title: "Hospodin uzdraví zkroušené", startVerse: 14, endVerse: 21 },
        ],
      },
      {
        chapter: 58,
        sections: [
          { title: "Pravý a nepravý půst", startVerse: 1, endVerse: 7 },
          { title: "Světlo spravedlnosti", startVerse: 8, endVerse: 12 },
          { title: "Svěcení soboty", startVerse: 13, endVerse: 14 },
        ],
      },
      {
        chapter: 59,
        sections: [
          { title: "Hříchy oddělují od Boha", startVerse: 1, endVerse: 8 },
          { title: "Vyznání vin", startVerse: 9, endVerse: 15 },
          { title: "Hospodin zasáhne sám", startVerse: 16, endVerse: 21 },
        ],
      },
      {
        chapter: 60,
        sections: [
          { title: "Sláva nového Jeruzaléma", startVerse: 1, endVerse: 9 },
          { title: "Pronárody přijdou", startVerse: 10, endVerse: 16 },
          { title: "Věčné světlo", startVerse: 17, endVerse: 22 },
        ],
      },
      {
        chapter: 61,
        sections: [
          { title: "Duch Panovníka Hospodina je nade mnou", startVerse: 1, endVerse: 3 },
          { title: "Obnova trosek", startVerse: 4, endVerse: 9 },
          { title: "Radost ze spásy", startVerse: 10, endVerse: 11 },
        ],
      },
      {
        chapter: 62,
        sections: [
          { title: "Nové jméno pro Sijón", startVerse: 1, endVerse: 5 },
          { title: "Strážní na hradbách", startVerse: 6, endVerse: 9 },
          { title: "Připravte cestu lidu", startVerse: 10, endVerse: 12 },
        ],
      },
      {
        chapter: 63,
        sections: [
          { title: "Mstitel z Edómu", startVerse: 1, endVerse: 6 },
          { title: "Vzpomínka na Hospodinovy činy", startVerse: 7, endVerse: 14 },
          { title: "Modlitba za pomoc", startVerse: 15, endVerse: 19 },
        ],
      },
      {
        chapter: 64,
        sections: [
          { title: "Kéž bys roztrhl nebesa", startVerse: 1, endVerse: 4 },
          { title: "Vyznání hříchů lidu", startVerse: 5, endVerse: 7 },
          { title: "Prosba o smilování", startVerse: 8, endVerse: 11 },
        ],
      },
      {
        chapter: 65,
        sections: [
          { title: "Hospodinova odpověď nevěrnému lidu", startVerse: 1, endVerse: 7 },
          { title: "Služebníci a odpadlíci", startVerse: 8, endVerse: 16 },
          { title: "Nové nebe a nová země", startVerse: 17, endVerse: 25 },
        ],
      },
      {
        chapter: 66,
        sections: [
          { title: "Hospodinův chrám a pravá bázeň", startVerse: 1, endVerse: 4 },
          { title: "Radost Jeruzaléma", startVerse: 5, endVerse: 14 },
          { title: "Hospodinův soud", startVerse: 15, endVerse: 18 },
          { title: "Shromáždění všech národů", startVerse: 19, endVerse: 24 },
        ],
      },
    ],
  },

  // ==================== MATTHEW (40) ====================
  40: {
    bookId: "matthew",
    bookName: "Matouš",
    bookStructure: [
      { title: "Dětství a příprava", chapters: "1–4", description: "Rodokmen, narození, mudrcové, Jan Křtitel, křest, pokušení, první učedníci" },
      { title: "Kázání na hoře", chapters: "5–7", description: "Blahoslavenství, etika království, modlitba Páně, zlaté pravidlo" },
      { title: "Zázraky a poslání", chapters: "8–10", description: "Deset zázraků, povolání Matouše, vyslání dvanácti" },
      { title: "Spory a podobenství", chapters: "11–13", description: "Jan Křtitel, spory o sobotu, podobenství o království" },
      { title: "Cesta k Jeruzalému", chapters: "14–20", description: "Nasycení, Petrovo vyznání, proměnění, řád sboru, dělníci na vinici" },
      { title: "Poslední dny v Jeruzalémě", chapters: "21–25", description: "Vjezd, spory v chrámu, eschatologická řeč, podobenství o soudu" },
      { title: "Pašije a vzkříšení", chapters: "26–28", description: "Poslední večeře, Getsemane, soudy, ukřižování, vzkříšení, vyslání" },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Rodokmen Ježíše Krista", startVerse: 1, endVerse: 17 },
          { title: "Narození Ježíše Krista", startVerse: 18, endVerse: 25 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Mudrcové z východu", startVerse: 1, endVerse: 12 },
          { title: "Útěk do Egypta", startVerse: 13, endVerse: 15 },
          { title: "Vraždění betlémských dětí", startVerse: 16, endVerse: 18 },
          { title: "Návrat z Egypta", startVerse: 19, endVerse: 23 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Jan Křtitel", startVerse: 1, endVerse: 12 },
          { title: "Ježíšův křest", startVerse: 13, endVerse: 17 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Pokušení na poušti", startVerse: 1, endVerse: 11 },
          { title: "Počátek působení v Galileji", startVerse: 12, endVerse: 17 },
          { title: "Povolání prvních učedníků", startVerse: 18, endVerse: 22 },
          { title: "Ježíšova činnost v Galileji", startVerse: 23, endVerse: 25 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Blahoslavenství", startVerse: 1, endVerse: 12 },
          { title: "Sůl a světlo", startVerse: 13, endVerse: 16 },
          { title: "Naplnění Zákona", startVerse: 17, endVerse: 20 },
          { title: "O zabíjení a hněvu", startVerse: 21, endVerse: 26 },
          { title: "O cizoložství", startVerse: 27, endVerse: 30 },
          { title: "O rozluce", startVerse: 31, endVerse: 32 },
          { title: "O přísaze", startVerse: 33, endVerse: 37 },
          { title: "O odplatě a lásce k nepřátelům", startVerse: 38, endVerse: 48 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "O almužně", startVerse: 1, endVerse: 4 },
          { title: "O modlitbě", startVerse: 5, endVerse: 15 },
          { title: "O půstu", startVerse: 16, endVerse: 18 },
          { title: "O pravém pokladu", startVerse: 19, endVerse: 24 },
          { title: "O starostech", startVerse: 25, endVerse: 34 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "O posuzování druhých", startVerse: 1, endVerse: 6 },
          { title: "O vyslyšení modlitby", startVerse: 7, endVerse: 12 },
          { title: "Úzká brána", startVerse: 13, endVerse: 14 },
          { title: "O falešných prorocích", startVerse: 15, endVerse: 23 },
          { title: "Stavitel moudrý a pošetilý", startVerse: 24, endVerse: 29 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Uzdravení malomocného", startVerse: 1, endVerse: 4 },
          { title: "Setníkův služebník", startVerse: 5, endVerse: 13 },
          { title: "Uzdravení Petrovy tchyně", startVerse: 14, endVerse: 17 },
          { title: "O následování", startVerse: 18, endVerse: 22 },
          { title: "Utišení bouře", startVerse: 23, endVerse: 27 },
          { title: "Uzdravení posedlých v Gadaře", startVerse: 28, endVerse: 34 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Uzdravení ochrnulého", startVerse: 1, endVerse: 8 },
          { title: "Povolání Matouše", startVerse: 9, endVerse: 13 },
          { title: "Spor o půst", startVerse: 14, endVerse: 17 },
          { title: "Jairova dcera a žena trpící krvácením", startVerse: 18, endVerse: 26 },
          { title: "Uzdravení dvou slepých", startVerse: 27, endVerse: 31 },
          { title: "Uzdravení němého", startVerse: 32, endVerse: 34 },
          { title: "Žeň je veliká", startVerse: 35, endVerse: 38 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Vyslání dvanácti", startVerse: 1, endVerse: 15 },
          { title: "Varování před pronásledováním", startVerse: 16, endVerse: 25 },
          { title: "Koho se bát", startVerse: 26, endVerse: 33 },
          { title: "Ježíš přináší rozdělení", startVerse: 34, endVerse: 39 },
          { title: "Odměna", startVerse: 40, endVerse: 42 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Janovi učedníci", startVerse: 1, endVerse: 6 },
          { title: "Ježíšovo svědectví o Janovi", startVerse: 7, endVerse: 19 },
          { title: "Běda nekajícím městům", startVerse: 20, endVerse: 24 },
          { title: "Ježíšovo pozvání", startVerse: 25, endVerse: 30 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Spor o sobotu", startVerse: 1, endVerse: 8 },
          { title: "Uzdravení v sobotu", startVerse: 9, endVerse: 14 },
          { title: "Hospodinův služebník", startVerse: 15, endVerse: 21 },
          { title: "Ježíš a Belzebul", startVerse: 22, endVerse: 37 },
          { title: "Znamení Jonášovo", startVerse: 38, endVerse: 42 },
          { title: "Návrat nečistého ducha", startVerse: 43, endVerse: 45 },
          { title: "Ježíšova pravá rodina", startVerse: 46, endVerse: 50 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Podobenství o rozsévači", startVerse: 1, endVerse: 9 },
          { title: "Důvod řeči v podobenstvích", startVerse: 10, endVerse: 17 },
          { title: "Výklad podobenství o rozsévači", startVerse: 18, endVerse: 23 },
          { title: "Podobenství o plevelu", startVerse: 24, endVerse: 30 },
          { title: "Podobenství o hořčičném zrnu a kvasu", startVerse: 31, endVerse: 35 },
          { title: "Výklad podobenství o plevelu", startVerse: 36, endVerse: 43 },
          { title: "Podobenství o pokladu, perle a síti", startVerse: 44, endVerse: 52 },
          { title: "Ježíš v Nazaretě", startVerse: 53, endVerse: 58 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Smrt Jana Křtitele", startVerse: 1, endVerse: 12 },
          { title: "Nasycení pěti tisíců", startVerse: 13, endVerse: 21 },
          { title: "Ježíš kráčí po moři", startVerse: 22, endVerse: 33 },
          { title: "Uzdravování v Genezaretu", startVerse: 34, endVerse: 36 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Tradice otců", startVerse: 1, endVerse: 9 },
          { title: "Co člověka znečišťuje", startVerse: 10, endVerse: 20 },
          { title: "Víra kananejské ženy", startVerse: 21, endVerse: 28 },
          { title: "Uzdravování u jezera", startVerse: 29, endVerse: 31 },
          { title: "Nasycení čtyř tisíců", startVerse: 32, endVerse: 39 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Farizeové žádají znamení", startVerse: 1, endVerse: 4 },
          { title: "Varování před kvasem farizeů", startVerse: 5, endVerse: 12 },
          { title: "Petrovo vyznání u Cesareje Filipovy", startVerse: 13, endVerse: 20 },
          { title: "První předpověď utrpení", startVerse: 21, endVerse: 23 },
          { title: "O následování", startVerse: 24, endVerse: 28 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "Proměnění na hoře", startVerse: 1, endVerse: 8 },
          { title: "Otázka o Eliášovi", startVerse: 9, endVerse: 13 },
          { title: "Uzdravení posedlého chlapce", startVerse: 14, endVerse: 21 },
          { title: "Druhá předpověď utrpení", startVerse: 22, endVerse: 23 },
          { title: "Chrámová daň", startVerse: 24, endVerse: 27 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Spor o prvenství", startVerse: 1, endVerse: 5 },
          { title: "Varování před svody", startVerse: 6, endVerse: 9 },
          { title: "Podobenství o ztracené ovci", startVerse: 10, endVerse: 14 },
          { title: "Řád obce", startVerse: 15, endVerse: 20 },
          { title: "Podobenství o nemilosrdném služebníku", startVerse: 21, endVerse: 35 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "O manželství a rozluce", startVerse: 1, endVerse: 12 },
          { title: "Ježíš a děti", startVerse: 13, endVerse: 15 },
          { title: "Bohatý mládenec", startVerse: 16, endVerse: 26 },
          { title: "Odměna učedníků", startVerse: 27, endVerse: 30 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "Podobenství o dělnících na vinici", startVerse: 1, endVerse: 16 },
          { title: "Třetí předpověď utrpení", startVerse: 17, endVerse: 19 },
          { title: "Žádost synů Zebedeových", startVerse: 20, endVerse: 28 },
          { title: "Uzdravení dvou slepých u Jericha", startVerse: 29, endVerse: 34 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Vjezd do Jeruzaléma", startVerse: 1, endVerse: 11 },
          { title: "Očištění chrámu", startVerse: 12, endVerse: 17 },
          { title: "Prokletí fíkovníku", startVerse: 18, endVerse: 22 },
          { title: "Spor o Ježíšovu pravomoc", startVerse: 23, endVerse: 27 },
          { title: "Podobenství o dvou synech", startVerse: 28, endVerse: 32 },
          { title: "Podobenství o zlých vinařích", startVerse: 33, endVerse: 46 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "Podobenství o královské svatbě", startVerse: 1, endVerse: 14 },
          { title: "Spor o daň císaři", startVerse: 15, endVerse: 22 },
          { title: "Spor o vzkříšení", startVerse: 23, endVerse: 33 },
          { title: "Největší přikázání", startVerse: 34, endVerse: 40 },
          { title: "Mesiáš, Syn Davidův", startVerse: 41, endVerse: 46 },
        ],
      },
      {
        chapter: 23,
        sections: [
          { title: "Proti zákoníkům a farizeům", startVerse: 1, endVerse: 12 },
          { title: "Sedmero běda", startVerse: 13, endVerse: 36 },
          { title: "Nářek nad Jeruzalémem", startVerse: 37, endVerse: 39 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Předpověď zkázy chrámu", startVerse: 1, endVerse: 2 },
          { title: "Počátek běd", startVerse: 3, endVerse: 14 },
          { title: "Velké soužení", startVerse: 15, endVerse: 28 },
          { title: "Příchod Syna člověka", startVerse: 29, endVerse: 31 },
          { title: "Poučení od fíkovníku", startVerse: 32, endVerse: 35 },
          { title: "Výzva k bdělosti", startVerse: 36, endVerse: 44 },
          { title: "Podobenství o věrném a nevěrném služebníku", startVerse: 45, endVerse: 51 },
        ],
      },
      {
        chapter: 25,
        sections: [
          { title: "Podobenství o deseti družičkách", startVerse: 1, endVerse: 13 },
          { title: "Podobenství o hřivnách", startVerse: 14, endVerse: 30 },
          { title: "O posledním soudu", startVerse: 31, endVerse: 46 },
        ],
      },
      {
        chapter: 26,
        sections: [
          { title: "Rada veleknéží", startVerse: 1, endVerse: 5 },
          { title: "Pomazání v Betanii", startVerse: 6, endVerse: 13 },
          { title: "Jidášova zrada", startVerse: 14, endVerse: 16 },
          { title: "Poslední večeře", startVerse: 17, endVerse: 30 },
          { title: "Předpověď Petrova zapření", startVerse: 31, endVerse: 35 },
          { title: "Getsemane", startVerse: 36, endVerse: 46 },
          { title: "Zatčení", startVerse: 47, endVerse: 56 },
          { title: "Před veleradou", startVerse: 57, endVerse: 68 },
          { title: "Petrovo zapření", startVerse: 69, endVerse: 75 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "Vydání Pilátovi", startVerse: 1, endVerse: 2 },
          { title: "Jidášův konec", startVerse: 3, endVerse: 10 },
          { title: "Ježíš před Pilátem", startVerse: 11, endVerse: 26 },
          { title: "Výsměch vojáků", startVerse: 27, endVerse: 31 },
          { title: "Ukřižování", startVerse: 32, endVerse: 44 },
          { title: "Ježíšova smrt", startVerse: 45, endVerse: 56 },
          { title: "Pohřeb", startVerse: 57, endVerse: 61 },
          { title: "Stráž u hrobu", startVerse: 62, endVerse: 66 },
        ],
      },
      {
        chapter: 28,
        sections: [
          { title: "Zvěst o vzkříšení", startVerse: 1, endVerse: 8 },
          { title: "Zjevení ženám", startVerse: 9, endVerse: 10 },
          { title: "Úplatek strážným", startVerse: 11, endVerse: 15 },
          { title: "Poslání učedníků", startVerse: 16, endVerse: 20 },
        ],
      },
    ],
  },
  // ==================== LUKE (42) ====================
  42: {
    bookId: "luke",
    bookName: "Lukáš",
    bookStructure: [
      { title: "Předmluva a evangelium dětství", chapters: "1–2", description: "Zvěstování a narození Jana Křtitele a Ježíše, chrám, dětství" },
      { title: "Příprava a působení v Galileji", chapters: "3–9,50", description: "Křest, pokušení, povolání učedníků, kázání, zázraky, proměnění" },
      { title: "Cesta do Jeruzaléma", chapters: "9,51–19,27", description: "Lukášův klíčový oddíl plný podobenství a učení o království" },
      { title: "Ježíš v Jeruzalémě", chapters: "19,28–21,38", description: "Vjezd, očištění chrámu, spory, eschatologická řeč" },
      { title: "Pašije a vzkříšení", chapters: "22–24", description: "Poslední večeře, utrpení, kříž, vzkříšení, Emauzy, nanebevstoupení" },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Předmluva", startVerse: 1, endVerse: 4 },
          { title: "Zvěst o narození Jana Křtitele", startVerse: 5, endVerse: 25 },
          { title: "Zvěstování Panně Marii", startVerse: 26, endVerse: 38 },
          { title: "Marie navštíví Alžbětu", startVerse: 39, endVerse: 45 },
          { title: "Mariin chvalozpěv (Magnificat)", startVerse: 46, endVerse: 56 },
          { title: "Narození Jana Křtitele", startVerse: 57, endVerse: 66 },
          { title: "Zachariášův chvalozpěv (Benedictus)", startVerse: 67, endVerse: 80 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Narození Ježíše v Betlémě", startVerse: 1, endVerse: 7 },
          { title: "Pastýři a andělé", startVerse: 8, endVerse: 20 },
          { title: "Obřezání a pojmenování", startVerse: 21, endVerse: 21 },
          { title: "Obětování v chrámě; Simeon a Anna", startVerse: 22, endVerse: 40 },
          { title: "Dvanáctiletý Ježíš v chrámě", startVerse: 41, endVerse: 52 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Kázání Jana Křtitele", startVerse: 1, endVerse: 20 },
          { title: "Ježíšův křest", startVerse: 21, endVerse: 22 },
          { title: "Ježíšův rodokmen", startVerse: 23, endVerse: 38 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Pokušení na poušti", startVerse: 1, endVerse: 13 },
          { title: "Začátek působení v Galileji", startVerse: 14, endVerse: 15 },
          { title: "Kázání v Nazaretě", startVerse: 16, endVerse: 30 },
          { title: "Uzdravení posedlého v Kafarnaum", startVerse: 31, endVerse: 37 },
          { title: "Uzdravení Petrovy tchyně a dalších", startVerse: 38, endVerse: 41 },
          { title: "Kázání v judských synagogách", startVerse: 42, endVerse: 44 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Zázračný rybolov a povolání učedníků", startVerse: 1, endVerse: 11 },
          { title: "Uzdravení malomocného", startVerse: 12, endVerse: 16 },
          { title: "Uzdravení ochrnutého", startVerse: 17, endVerse: 26 },
          { title: "Povolání Leviho", startVerse: 27, endVerse: 32 },
          { title: "Spor o půst", startVerse: 33, endVerse: 39 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Spor o sobotu", startVerse: 1, endVerse: 5 },
          { title: "Uzdravení v sobotu", startVerse: 6, endVerse: 11 },
          { title: "Vyvolení Dvanácti", startVerse: 12, endVerse: 16 },
          { title: "Blahoslavenství a běda", startVerse: 17, endVerse: 26 },
          { title: "Láska k nepřátelům", startVerse: 27, endVerse: 36 },
          { title: "Nesuďte", startVerse: 37, endVerse: 42 },
          { title: "Strom a ovoce; dům na skále", startVerse: 43, endVerse: 49 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Uzdravení setníkova služebníka", startVerse: 1, endVerse: 10 },
          { title: "Vzkříšení mládence v Naim", startVerse: 11, endVerse: 17 },
          { title: "Jan Křtitel posílá k Ježíši", startVerse: 18, endVerse: 35 },
          { title: "Hříšnice v domě farizeově", startVerse: 36, endVerse: 50 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Ženy doprovázející Ježíše", startVerse: 1, endVerse: 3 },
          { title: "Podobenství o rozsévači", startVerse: 4, endVerse: 15 },
          { title: "Světlo na svícnu", startVerse: 16, endVerse: 18 },
          { title: "Ježíšova pravá rodina", startVerse: 19, endVerse: 21 },
          { title: "Utišení bouře", startVerse: 22, endVerse: 25 },
          { title: "Uzdravení posedlého v Gerase", startVerse: 26, endVerse: 39 },
          { title: "Jairova dcera a krvácející žena", startVerse: 40, endVerse: 56 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Vyslání Dvanácti", startVerse: 1, endVerse: 6 },
          { title: "Herodovy rozpaky", startVerse: 7, endVerse: 9 },
          { title: "Nasycení pěti tisíců", startVerse: 10, endVerse: 17 },
          { title: "Petrovo vyznání", startVerse: 18, endVerse: 21 },
          { title: "První předpověď utrpení", startVerse: 22, endVerse: 27 },
          { title: "Proměnění na hoře", startVerse: 28, endVerse: 36 },
          { title: "Uzdravení posedlého chlapce", startVerse: 37, endVerse: 43 },
          { title: "Druhá předpověď utrpení", startVerse: 44, endVerse: 45 },
          { title: "Spor o to, kdo je největší", startVerse: 46, endVerse: 50 },
          { title: "Počátek cesty do Jeruzaléma", startVerse: 51, endVerse: 56 },
          { title: "O následování Ježíše", startVerse: 57, endVerse: 62 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Vyslání sedmdesáti dvou", startVerse: 1, endVerse: 16 },
          { title: "Návrat učedníků", startVerse: 17, endVerse: 20 },
          { title: "Ježíšův chvalozpěv", startVerse: 21, endVerse: 24 },
          { title: "Podobenství o milosrdném Samaritánovi", startVerse: 25, endVerse: 37 },
          { title: "Marta a Marie", startVerse: 38, endVerse: 42 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Modlitba Páně", startVerse: 1, endVerse: 4 },
          { title: "O vytrvalé modlitbě", startVerse: 5, endVerse: 13 },
          { title: "Ježíš a Belzebul", startVerse: 14, endVerse: 26 },
          { title: "Praví blahoslavení", startVerse: 27, endVerse: 28 },
          { title: "Znamení Jonášovo", startVerse: 29, endVerse: 32 },
          { title: "Oko jako svícen těla", startVerse: 33, endVerse: 36 },
          { title: "Běda farizeům a zákoníkům", startVerse: 37, endVerse: 54 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Varování před pokrytectvím", startVerse: 1, endVerse: 3 },
          { title: "Koho se bát", startVerse: 4, endVerse: 7 },
          { title: "Přiznat se k Synu člověka", startVerse: 8, endVerse: 12 },
          { title: "Podobenství o boháči", startVerse: 13, endVerse: 21 },
          { title: "O starostech", startVerse: 22, endVerse: 34 },
          { title: "Bdělí služebníci", startVerse: 35, endVerse: 48 },
          { title: "Oheň a rozdělení", startVerse: 49, endVerse: 53 },
          { title: "Rozpoznání času", startVerse: 54, endVerse: 59 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Výzva k pokání", startVerse: 1, endVerse: 5 },
          { title: "Podobenství o fíkovníku", startVerse: 6, endVerse: 9 },
          { title: "Uzdravení sehnuté ženy v sobotu", startVerse: 10, endVerse: 17 },
          { title: "Podobenství o hořčičném zrnu a kvasu", startVerse: 18, endVerse: 21 },
          { title: "Úzká brána", startVerse: 22, endVerse: 30 },
          { title: "Nářek nad Jeruzalémem", startVerse: 31, endVerse: 35 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Uzdravení vodnatelného v sobotu", startVerse: 1, endVerse: 6 },
          { title: "O pokoře a pohostinnosti", startVerse: 7, endVerse: 14 },
          { title: "Podobenství o velké hostině", startVerse: 15, endVerse: 24 },
          { title: "Cena učednictví", startVerse: 25, endVerse: 35 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Podobenství o ztracené ovci", startVerse: 1, endVerse: 7 },
          { title: "Podobenství o ztracené minci", startVerse: 8, endVerse: 10 },
          { title: "Podobenství o ztraceném synu", startVerse: 11, endVerse: 32 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Podobenství o nepoctivém správci", startVerse: 1, endVerse: 13 },
          { title: "Proti lakotě farizeů", startVerse: 14, endVerse: 18 },
          { title: "Boháč a Lazar", startVerse: 19, endVerse: 31 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "O pohoršení, odpuštění a víře", startVerse: 1, endVerse: 10 },
          { title: "Uzdravení deseti malomocných", startVerse: 11, endVerse: 19 },
          { title: "Příchod Božího království", startVerse: 20, endVerse: 37 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Podobenství o vytrvalé vdově", startVerse: 1, endVerse: 8 },
          { title: "Farizeus a celník", startVerse: 9, endVerse: 14 },
          { title: "Ježíš a děti", startVerse: 15, endVerse: 17 },
          { title: "Bohatý mládenec", startVerse: 18, endVerse: 30 },
          { title: "Třetí předpověď utrpení", startVerse: 31, endVerse: 34 },
          { title: "Uzdravení slepého u Jericha", startVerse: 35, endVerse: 43 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "Zacheus", startVerse: 1, endVerse: 10 },
          { title: "Podobenství o hřivnách", startVerse: 11, endVerse: 27 },
          { title: "Vjezd do Jeruzaléma", startVerse: 28, endVerse: 40 },
          { title: "Pláč nad Jeruzalémem", startVerse: 41, endVerse: 44 },
          { title: "Očištění chrámu", startVerse: 45, endVerse: 48 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "Spor o Ježíšovu pravomoc", startVerse: 1, endVerse: 8 },
          { title: "Podobenství o zlých vinařích", startVerse: 9, endVerse: 19 },
          { title: "O dani císaři", startVerse: 20, endVerse: 26 },
          { title: "Otázka o vzkříšení", startVerse: 27, endVerse: 40 },
          { title: "Mesiáš synem Davidovým", startVerse: 41, endVerse: 44 },
          { title: "Varování před zákoníky", startVerse: 45, endVerse: 47 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Dar chudé vdovy", startVerse: 1, endVerse: 4 },
          { title: "Předpověď zkázy chrámu", startVerse: 5, endVerse: 6 },
          { title: "Znamení konce", startVerse: 7, endVerse: 19 },
          { title: "Zkáza Jeruzaléma", startVerse: 20, endVerse: 24 },
          { title: "Příchod Syna člověka", startVerse: 25, endVerse: 28 },
          { title: "Podobenství o fíkovníku; výzva k bdělosti", startVerse: 29, endVerse: 38 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "Jidášova zrada", startVerse: 1, endVerse: 6 },
          { title: "Příprava velikonoční večeře", startVerse: 7, endVerse: 13 },
          { title: "Poslední večeře", startVerse: 14, endVerse: 23 },
          { title: "Spor o to, kdo je největší", startVerse: 24, endVerse: 30 },
          { title: "Předpověď Petrova zapření", startVerse: 31, endVerse: 34 },
          { title: "Doba rozhodnutí", startVerse: 35, endVerse: 38 },
          { title: "Modlitba v Getsemane", startVerse: 39, endVerse: 46 },
          { title: "Ježíšovo zatčení", startVerse: 47, endVerse: 53 },
          { title: "Petrovo zapření", startVerse: 54, endVerse: 62 },
          { title: "Výsměch a výslech před veleradou", startVerse: 63, endVerse: 71 },
        ],
      },
      {
        chapter: 23,
        sections: [
          { title: "Před Pilátem", startVerse: 1, endVerse: 5 },
          { title: "Před Herodem", startVerse: 6, endVerse: 12 },
          { title: "Pilátův rozsudek", startVerse: 13, endVerse: 25 },
          { title: "Cesta na Golgotu", startVerse: 26, endVerse: 32 },
          { title: "Ukřižování", startVerse: 33, endVerse: 43 },
          { title: "Ježíšova smrt", startVerse: 44, endVerse: 49 },
          { title: "Pohřeb", startVerse: 50, endVerse: 56 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Prázdný hrob", startVerse: 1, endVerse: 12 },
          { title: "Na cestě do Emauz", startVerse: 13, endVerse: 35 },
          { title: "Zjevení učedníkům", startVerse: 36, endVerse: 49 },
          { title: "Nanebevstoupení", startVerse: 50, endVerse: 53 },
        ],
      },
    ],
  },
  // ==================== ACTS (44) ====================
  44: {
    bookId: "acts",
    bookName: "Skutky",
    bookStructure: [
      { title: "Církev v Jeruzalémě", chapters: "1–7", description: "Letnice, první zvěstování, pronásledování, Štěpán" },
      { title: "Rozšíření do Judska a Samaří", chapters: "8–12", description: "Filip, obrácení Saula, Kornelius, Petr vyveden z vězení" },
      { title: "První misijní cesta a sněm v Jeruzalémě", chapters: "13–15", description: "Barnabáš a Pavel, sněm o pohanech" },
      { title: "Druhá a třetí misijní cesta", chapters: "16–20", description: "Evropa, Efez, řeč v Milétu" },
      { title: "Pavel v zajetí a cesta do Říma", chapters: "21–28", description: "Zatčení, obhajoby, cesta, ztroskotání, Řím" },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Úvodní slovo Theofilovi", startVerse: 1, endVerse: 5 },
          { title: "Nanebevstoupení", startVerse: 6, endVerse: 11 },
          { title: "Učedníci v Jeruzalémě", startVerse: 12, endVerse: 14 },
          { title: "Volba Matěje", startVerse: 15, endVerse: 26 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Seslání Ducha svatého", startVerse: 1, endVerse: 13 },
          { title: "Petrovo kázání o Letnicích", startVerse: 14, endVerse: 36 },
          { title: "Výzva k obrácení a křest tří tisíců", startVerse: 37, endVerse: 41 },
          { title: "Život první církve", startVerse: 42, endVerse: 47 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Uzdravení chromého u chrámové brány", startVerse: 1, endVerse: 10 },
          { title: "Petrovo kázání v chrámě", startVerse: 11, endVerse: 26 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Petr a Jan před veleradou", startVerse: 1, endVerse: 22 },
          { title: "Modlitba církve o odvahu", startVerse: 23, endVerse: 31 },
          { title: "Společenství majetku", startVerse: 32, endVerse: 37 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Ananiáš a Safira", startVerse: 1, endVerse: 11 },
          { title: "Znamení a divy apoštolů", startVerse: 12, endVerse: 16 },
          { title: "Apoštolové opět před veleradou", startVerse: 17, endVerse: 32 },
          { title: "Gamalielova rada", startVerse: 33, endVerse: 42 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Ustanovení sedmi jáhnů", startVerse: 1, endVerse: 7 },
          { title: "Zatčení Štěpána", startVerse: 8, endVerse: 15 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Štěpánova řeč", startVerse: 1, endVerse: 53 },
          { title: "Ukamenování Štěpána", startVerse: 54, endVerse: 60 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Pronásledování církve", startVerse: 1, endVerse: 3 },
          { title: "Filip v Samaří", startVerse: 4, endVerse: 13 },
          { title: "Šimon kouzelník", startVerse: 14, endVerse: 25 },
          { title: "Filip a etiopský dvořan", startVerse: 26, endVerse: 40 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Obrácení Saula", startVerse: 1, endVerse: 19 },
          { title: "Saul káže v Damašku a Jeruzalémě", startVerse: 20, endVerse: 31 },
          { title: "Petr uzdravuje Eneáše", startVerse: 32, endVerse: 35 },
          { title: "Vzkříšení Tabity", startVerse: 36, endVerse: 43 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Setník Kornélius", startVerse: 1, endVerse: 8 },
          { title: "Petrovo vidění v Joppe", startVerse: 9, endVerse: 23 },
          { title: "Petr v domě Kornéliově", startVerse: 24, endVerse: 33 },
          { title: "Petrovo kázání u Kornélia", startVerse: 34, endVerse: 43 },
          { title: "Seslání Ducha na pohany", startVerse: 44, endVerse: 48 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Petr obhajuje křest pohanů", startVerse: 1, endVerse: 18 },
          { title: "Církev v Antiochii", startVerse: 19, endVerse: 26 },
          { title: "Pomoc bratřím v Judsku", startVerse: 27, endVerse: 30 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Zabití Jakuba a uvěznění Petra", startVerse: 1, endVerse: 5 },
          { title: "Petr vyveden z vězení", startVerse: 6, endVerse: 19 },
          { title: "Smrt Heroda", startVerse: 20, endVerse: 25 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Vyslání Barnabáše a Saula", startVerse: 1, endVerse: 3 },
          { title: "Na Kypru: Elymas kouzelník", startVerse: 4, endVerse: 12 },
          { title: "V Antiochii Pisidské", startVerse: 13, endVerse: 41 },
          { title: "Obrat k pohanům", startVerse: 42, endVerse: 52 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "V Ikoniu", startVerse: 1, endVerse: 7 },
          { title: "V Lystře a Derbe", startVerse: 8, endVerse: 20 },
          { title: "Návrat do Antiochie Syrské", startVerse: 21, endVerse: 28 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Spor o obřízku", startVerse: 1, endVerse: 5 },
          { title: "Jeruzalémský sněm", startVerse: 6, endVerse: 21 },
          { title: "List sněmu pohanokřesťanům", startVerse: 22, endVerse: 35 },
          { title: "Rozchod Pavla a Barnabáše", startVerse: 36, endVerse: 41 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Timoteus se připojuje k Pavlovi", startVerse: 1, endVerse: 5 },
          { title: "Vidění muže z Makedonie", startVerse: 6, endVerse: 10 },
          { title: "Obrácení Lydie ve Filipech", startVerse: 11, endVerse: 15 },
          { title: "Pavel a Silas ve vězení", startVerse: 16, endVerse: 40 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "V Tesalonice", startVerse: 1, endVerse: 9 },
          { title: "V Beroji", startVerse: 10, endVerse: 15 },
          { title: "Pavel v Aténách", startVerse: 16, endVerse: 21 },
          { title: "Řeč na Areopagu", startVerse: 22, endVerse: 34 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Pavel v Korintě", startVerse: 1, endVerse: 17 },
          { title: "Návrat do Antiochie", startVerse: 18, endVerse: 22 },
          { title: "Počátek třetí misijní cesty; Apollos", startVerse: 23, endVerse: 28 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "Pavel v Efezu; dvanáct učedníků", startVerse: 1, endVerse: 10 },
          { title: "Synové Skévovi", startVerse: 11, endVerse: 20 },
          { title: "Plány dalších cest", startVerse: 21, endVerse: 22 },
          { title: "Vzpoura stříbrotepců v Efezu", startVerse: 23, endVerse: 40 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "Cesta do Makedonie a Řecka", startVerse: 1, endVerse: 6 },
          { title: "Eutychos v Troadě", startVerse: 7, endVerse: 12 },
          { title: "Z Troady do Milétu", startVerse: 13, endVerse: 16 },
          { title: "Rozloučení se staršími z Efezu", startVerse: 17, endVerse: 38 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Cesta do Jeruzaléma", startVerse: 1, endVerse: 14 },
          { title: "Pavel u Jakuba", startVerse: 15, endVerse: 26 },
          { title: "Zatčení Pavla v chrámě", startVerse: 27, endVerse: 36 },
          { title: "Pavel smí promluvit k davu", startVerse: 37, endVerse: 40 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "Pavlova obhajoba před davem", startVerse: 1, endVerse: 21 },
          { title: "Pavel se odvolává na své římské občanství", startVerse: 22, endVerse: 29 },
          { title: "Pavel před veleradou", startVerse: 30, endVerse: 30 },
        ],
      },
      {
        chapter: 23,
        sections: [
          { title: "Pavel před veleradou", startVerse: 1, endVerse: 11 },
          { title: "Spiknutí proti Pavlovi", startVerse: 12, endVerse: 22 },
          { title: "Převoz do Cesareje", startVerse: 23, endVerse: 35 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Žaloba před Felixem", startVerse: 1, endVerse: 9 },
          { title: "Pavlova obhajoba před Felixem", startVerse: 10, endVerse: 21 },
          { title: "Pavel v Cesarejském vězení", startVerse: 22, endVerse: 27 },
        ],
      },
      {
        chapter: 25,
        sections: [
          { title: "Pavel se odvolává k císaři", startVerse: 1, endVerse: 12 },
          { title: "Festus a král Agrippa", startVerse: 13, endVerse: 22 },
          { title: "Pavel před Agrippou", startVerse: 23, endVerse: 27 },
        ],
      },
      {
        chapter: 26,
        sections: [
          { title: "Pavlova obhajoba před Agrippou", startVerse: 1, endVerse: 23 },
          { title: "Agrippova odpověď", startVerse: 24, endVerse: 32 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "Cesta do Říma začíná", startVerse: 1, endVerse: 12 },
          { title: "Bouře na moři", startVerse: 13, endVerse: 26 },
          { title: "Ztroskotání u Malty", startVerse: 27, endVerse: 44 },
        ],
      },
      {
        chapter: 28,
        sections: [
          { title: "Na ostrově Maltě", startVerse: 1, endVerse: 10 },
          { title: "Z Malty do Říma", startVerse: 11, endVerse: 16 },
          { title: "Pavel v Římě", startVerse: 17, endVerse: 31 },
        ],
      },
    ],
  },

  // ==================== GENESIS (1) ====================
  1: {
    bookId: "genesis",
    bookName: "Genesis",
    bookStructure: [
      { title: "Prvotní dějiny", chapters: "1–11", description: "Stvoření, pád, potopa, Bábel" },
      { title: "Abraham", chapters: "12–25", description: "Povolání, smlouva, Izák, zkouška oběti" },
      { title: "Izák a Jákob", chapters: "25–36", description: "Ezau a Jákob, cesta do Cháranu, zápas u Jaboku" },
      { title: "Josef", chapters: "37–50", description: "Sny, Egypt, setkání s bratry, požehnání" },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Stvoření nebe a země", startVerse: 1, endVerse: 2 },
          { title: "První den — světlo", startVerse: 3, endVerse: 5 },
          { title: "Druhý a třetí den — klenba, země a rostliny", startVerse: 6, endVerse: 13 },
          { title: "Čtvrtý a pátý den — světla, ryby a ptáci", startVerse: 14, endVerse: 23 },
          { title: "Šestý den — zvířata a člověk", startVerse: 24, endVerse: 31 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Sedmý den — odpočinutí", startVerse: 1, endVerse: 3 },
          { title: "Zahrada v Edenu", startVerse: 4, endVerse: 17 },
          { title: "Stvoření ženy", startVerse: 18, endVerse: 25 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Pokušení a pád", startVerse: 1, endVerse: 7 },
          { title: "Soud nad hadem, ženou a mužem", startVerse: 8, endVerse: 19 },
          { title: "Vyhnání z ráje", startVerse: 20, endVerse: 24 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Kain a Ábel", startVerse: 1, endVerse: 16 },
          { title: "Kainovo potomstvo", startVerse: 17, endVerse: 24 },
          { title: "Narození Šéta", startVerse: 25, endVerse: 26 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Rodokmen od Adama k Noemovi", startVerse: 1, endVerse: 32 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Zkaženost lidí", startVerse: 1, endVerse: 8 },
          { title: "Noe a stavba archy", startVerse: 9, endVerse: 22 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "Vstup do archy", startVerse: 1, endVerse: 16 },
          { title: "Počátek potopy", startVerse: 17, endVerse: 24 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Konec potopy", startVerse: 1, endVerse: 14 },
          { title: "Noe vychází z archy a obětuje", startVerse: 15, endVerse: 22 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Smlouva s Noem a duha", startVerse: 1, endVerse: 17 },
          { title: "Noe a jeho synové", startVerse: 18, endVerse: 29 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Rodokmen Noemových synů", startVerse: 1, endVerse: 32 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Babylonská věž", startVerse: 1, endVerse: 9 },
          { title: "Rodokmen od Šéma k Abramovi", startVerse: 10, endVerse: 26 },
          { title: "Rod Terachův", startVerse: 27, endVerse: 32 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Povolání Abrama", startVerse: 1, endVerse: 9 },
          { title: "Abram v Egyptě", startVerse: 10, endVerse: 20 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Abram a Lot se rozcházejí", startVerse: 1, endVerse: 13 },
          { title: "Zaslíbení země Abramovi", startVerse: 14, endVerse: 18 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Válka králů a zajetí Lota", startVerse: 1, endVerse: 16 },
          { title: "Melchisedech žehná Abramovi", startVerse: 17, endVerse: 24 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Hospodinova smlouva s Abramem", startVerse: 1, endVerse: 21 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Hagar a narození Izmaele", startVerse: 1, endVerse: 16 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "Smlouva obřízky", startVerse: 1, endVerse: 14 },
          { title: "Zaslíbení Izáka", startVerse: 15, endVerse: 27 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Tři hosté u Mamre", startVerse: 1, endVerse: 15 },
          { title: "Abraham přímluvce za Sodomu", startVerse: 16, endVerse: 33 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "Zkáza Sodomy a Gomory", startVerse: 1, endVerse: 29 },
          { title: "Lot a jeho dcery", startVerse: 30, endVerse: 38 },
        ],
      },
      {
        chapter: 20,
        sections: [
          { title: "Abraham a Abímelek", startVerse: 1, endVerse: 18 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Narození Izáka", startVerse: 1, endVerse: 7 },
          { title: "Vyhnání Hagar a Izmaele", startVerse: 8, endVerse: 21 },
          { title: "Smlouva s Abímelekem", startVerse: 22, endVerse: 34 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "Obětování Izáka", startVerse: 1, endVerse: 19 },
          { title: "Potomstvo Náchorovo", startVerse: 20, endVerse: 24 },
        ],
      },
      {
        chapter: 23,
        sections: [
          { title: "Sářina smrt a koupě pole", startVerse: 1, endVerse: 20 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Hledání nevěsty pro Izáka", startVerse: 1, endVerse: 28 },
          { title: "Rebeka u Lábana", startVerse: 29, endVerse: 49 },
          { title: "Rebeka se stává ženou Izáka", startVerse: 50, endVerse: 67 },
        ],
      },
      {
        chapter: 25,
        sections: [
          { title: "Abrahamovi další potomci a smrt", startVerse: 1, endVerse: 11 },
          { title: "Izmaelovi potomci", startVerse: 12, endVerse: 18 },
          { title: "Narození Ezaua a Jákoba", startVerse: 19, endVerse: 26 },
          { title: "Ezau prodává prvorozenství", startVerse: 27, endVerse: 34 },
        ],
      },
      {
        chapter: 26,
        sections: [
          { title: "Izák v Geraru", startVerse: 1, endVerse: 11 },
          { title: "Spory o studny", startVerse: 12, endVerse: 25 },
          { title: "Smlouva s Abímelekem", startVerse: 26, endVerse: 35 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "Jákob lstí získává požehnání", startVerse: 1, endVerse: 29 },
          { title: "Ezauova zášť", startVerse: 30, endVerse: 46 },
        ],
      },
      {
        chapter: 28,
        sections: [
          { title: "Jákob vyslán k Lábanovi", startVerse: 1, endVerse: 9 },
          { title: "Jákobův sen v Bételu", startVerse: 10, endVerse: 22 },
        ],
      },
      {
        chapter: 29,
        sections: [
          { title: "Jákob u Lábana a setkání s Ráchel", startVerse: 1, endVerse: 14 },
          { title: "Jákob si bere Leu a Ráchel", startVerse: 15, endVerse: 30 },
          { title: "Narození Jákobových synů", startVerse: 31, endVerse: 35 },
        ],
      },
      {
        chapter: 30,
        sections: [
          { title: "Další Jákobovi synové", startVerse: 1, endVerse: 24 },
          { title: "Jákobovo bohatství u Lábana", startVerse: 25, endVerse: 43 },
        ],
      },
      {
        chapter: 31,
        sections: [
          { title: "Jákobův útěk od Lábana", startVerse: 1, endVerse: 21 },
          { title: "Lában stíhá Jákoba", startVerse: 22, endVerse: 42 },
          { title: "Smlouva v Gileádu", startVerse: 43, endVerse: 55 },
        ],
      },
      {
        chapter: 32,
        sections: [
          { title: "Jákobovy přípravy na setkání s Ezauem", startVerse: 1, endVerse: 21 },
          { title: "Zápas u Jaboku", startVerse: 22, endVerse: 32 },
        ],
      },
      {
        chapter: 33,
        sections: [
          { title: "Smíření s Ezauem", startVerse: 1, endVerse: 17 },
          { title: "Jákob v Šekemu", startVerse: 18, endVerse: 20 },
        ],
      },
      {
        chapter: 34,
        sections: [
          { title: "Znásilnění Díny a pomsta bratrů", startVerse: 1, endVerse: 31 },
        ],
      },
      {
        chapter: 35,
        sections: [
          { title: "Jákobův návrat do Bételu", startVerse: 1, endVerse: 15 },
          { title: "Narození Benjamína a smrt Ráchel", startVerse: 16, endVerse: 20 },
          { title: "Jákobovi synové a smrt Izáka", startVerse: 21, endVerse: 29 },
        ],
      },
      {
        chapter: 36,
        sections: [
          { title: "Ezauovo potomstvo", startVerse: 1, endVerse: 43 },
        ],
      },
      {
        chapter: 37,
        sections: [
          { title: "Josefovy sny", startVerse: 1, endVerse: 11 },
          { title: "Josef prodán do Egypta", startVerse: 12, endVerse: 36 },
        ],
      },
      {
        chapter: 38,
        sections: [
          { title: "Juda a Támar", startVerse: 1, endVerse: 30 },
        ],
      },
      {
        chapter: 39,
        sections: [
          { title: "Josef u Potífara", startVerse: 1, endVerse: 6 },
          { title: "Josef a Potífarova žena", startVerse: 7, endVerse: 20 },
          { title: "Josef ve vězení", startVerse: 21, endVerse: 23 },
        ],
      },
      {
        chapter: 40,
        sections: [
          { title: "Josef vykládá sny vězňů", startVerse: 1, endVerse: 23 },
        ],
      },
      {
        chapter: 41,
        sections: [
          { title: "Faraonovy sny", startVerse: 1, endVerse: 36 },
          { title: "Josef povýšen nad Egypt", startVerse: 37, endVerse: 57 },
        ],
      },
      {
        chapter: 42,
        sections: [
          { title: "První cesta bratrů do Egypta", startVerse: 1, endVerse: 24 },
          { title: "Návrat bez Šimeona", startVerse: 25, endVerse: 38 },
        ],
      },
      {
        chapter: 43,
        sections: [
          { title: "Druhá cesta s Benjamínem", startVerse: 1, endVerse: 15 },
          { title: "Hostina u Josefa", startVerse: 16, endVerse: 34 },
        ],
      },
      {
        chapter: 44,
        sections: [
          { title: "Stříbrný pohár v Benjamínově pytli", startVerse: 1, endVerse: 17 },
          { title: "Judova přímluva", startVerse: 18, endVerse: 34 },
        ],
      },
      {
        chapter: 45,
        sections: [
          { title: "Josef se dává poznat bratřím", startVerse: 1, endVerse: 15 },
          { title: "Pozvání Jákoba do Egypta", startVerse: 16, endVerse: 28 },
        ],
      },
      {
        chapter: 46,
        sections: [
          { title: "Jákob odchází do Egypta", startVerse: 1, endVerse: 7 },
          { title: "Rodokmen Jákobových potomků", startVerse: 8, endVerse: 27 },
          { title: "Setkání Jákoba s Josefem", startVerse: 28, endVerse: 34 },
        ],
      },
      {
        chapter: 47,
        sections: [
          { title: "Jákob před faraonem", startVerse: 1, endVerse: 12 },
          { title: "Josefova správa v Egyptě", startVerse: 13, endVerse: 26 },
          { title: "Jákobovo přání o pohřbu", startVerse: 27, endVerse: 31 },
        ],
      },
      {
        chapter: 48,
        sections: [
          { title: "Jákob žehná Efrajimovi a Manasesovi", startVerse: 1, endVerse: 22 },
        ],
      },
      {
        chapter: 49,
        sections: [
          { title: "Jákobovo požehnání synům", startVerse: 1, endVerse: 28 },
          { title: "Jákobova smrt", startVerse: 29, endVerse: 33 },
        ],
      },
      {
        chapter: 50,
        sections: [
          { title: "Jákobův pohřeb", startVerse: 1, endVerse: 14 },
          { title: "Josef odpouští bratřím", startVerse: 15, endVerse: 21 },
          { title: "Josefova smrt", startVerse: 22, endVerse: 26 },
        ],
      },
    ],
  },

  // ==================== 1 CORINTHIANS (46) ====================
  46: {
    bookId: "1corinthians",
    bookName: "1. Korintským",
    bookStructure: [
      { title: "Úvod a rozdělení v obci", chapters: "1–4", description: "Moudrost světa vs. moudrost kříže, strany v Korintu" },
      { title: "Morální otázky a případy", chapters: "5–7", description: "Nemravnost, soudy, manželství a celibát" },
      { title: "Svoboda a zodpovědnost", chapters: "8–11", description: "Maso obětované modlám, bohoslužba, Večeře Páně" },
      { title: "Dary Ducha a láska", chapters: "12–14", description: "Charismata, tělo Kristovo, píseň lásky, glosolálie a prorokování" },
      { title: "Vzkříšení", chapters: "15", description: "Teologie vzkříšení Kristova i naše" },
      { title: "Závěr", chapters: "16", description: "Sbírka, plány, pozdravy" },
    ],
    chapters: [
      {
        chapter: 1,
        sections: [
          { title: "Pozdrav a díkůvzdání", startVerse: 1, endVerse: 9 },
          { title: "Rozdělení v obci", startVerse: 10, endVerse: 17 },
          { title: "Poselství o kříži", startVerse: 18, endVerse: 25 },
          { title: "Boží vyvolení slabých", startVerse: 26, endVerse: 31 },
        ],
      },
      {
        chapter: 2,
        sections: [
          { title: "Pavlovo kázání v Korintu", startVerse: 1, endVerse: 5 },
          { title: "Pravá Boží moudrost", startVerse: 6, endVerse: 9 },
          { title: "Zjevení skrze Ducha", startVerse: 10, endVerse: 16 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Tělesní a duchovní křesťané", startVerse: 1, endVerse: 4 },
          { title: "Boží spolupracovníci", startVerse: 5, endVerse: 9 },
          { title: "Základ a stavba", startVerse: 10, endVerse: 17 },
          { title: "Moudrost tohoto světa je bláznovství", startVerse: 18, endVerse: 23 },
        ],
      },
      {
        chapter: 4,
        sections: [
          { title: "Apoštolové jako správci Božích tajemství", startVerse: 1, endVerse: 5 },
          { title: "Pokora apoštolů", startVerse: 6, endVerse: 13 },
          { title: "Pavlovo otcovské napomenutí", startVerse: 14, endVerse: 21 },
        ],
      },
      {
        chapter: 5,
        sections: [
          { title: "Případ smilstva v obci", startVerse: 1, endVerse: 5 },
          { title: "Starý a nový kvas", startVerse: 6, endVerse: 8 },
          { title: "Oddělit se od nemravných", startVerse: 9, endVerse: 13 },
        ],
      },
      {
        chapter: 6,
        sections: [
          { title: "Spory mezi bratry a soudy", startVerse: 1, endVerse: 11 },
          { title: "Tělo jako chrám Ducha svatého", startVerse: 12, endVerse: 20 },
        ],
      },
      {
        chapter: 7,
        sections: [
          { title: "O manželství", startVerse: 1, endVerse: 9 },
          { title: "O rozvodu a smíšených manželstvích", startVerse: 10, endVerse: 16 },
          { title: "Žít v povolání, jaké má každý", startVerse: 17, endVerse: 24 },
          { title: "O pannách a svobodných", startVerse: 25, endVerse: 35 },
          { title: "O sňatku a vdovách", startVerse: 36, endVerse: 40 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Poznání a láska", startVerse: 1, endVerse: 3 },
          { title: "Maso obětované modlám", startVerse: 4, endVerse: 8 },
          { title: "Ohled na slabé bratry", startVerse: 9, endVerse: 13 },
        ],
      },
      {
        chapter: 9,
        sections: [
          { title: "Práva apoštola", startVerse: 1, endVerse: 14 },
          { title: "Pavlovo vzdání se práv", startVerse: 15, endVerse: 18 },
          { title: "Všem vším pro evangelium", startVerse: 19, endVerse: 23 },
          { title: "Běh o nepomíjející věnec", startVerse: 24, endVerse: 27 },
        ],
      },
      {
        chapter: 10,
        sections: [
          { title: "Varování z dějin Izraele", startVerse: 1, endVerse: 13 },
          { title: "Stůl Páně a stůl démonů", startVerse: 14, endVerse: 22 },
          { title: "Svoboda a ohled na druhé", startVerse: 23, endVerse: 33 },
        ],
      },
      {
        chapter: 11,
        sections: [
          { title: "Pořádek při bohoslužbě", startVerse: 1, endVerse: 16 },
          { title: "Nepořádky při Večeři Páně", startVerse: 17, endVerse: 22 },
          { title: "Ustanovení Večeře Páně", startVerse: 23, endVerse: 29 },
          { title: "Napomenutí", startVerse: 30, endVerse: 34 },
        ],
      },
      {
        chapter: 12,
        sections: [
          { title: "Různé dary jednoho Ducha", startVerse: 1, endVerse: 11 },
          { title: "Tělo Kristovo a jeho údy", startVerse: 12, endVerse: 27 },
          { title: "Ustanovení v církvi", startVerse: 28, endVerse: 31 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Bez lásky nic nejsem", startVerse: 1, endVerse: 3 },
          { title: "Vlastnosti lásky", startVerse: 4, endVerse: 7 },
          { title: "Láska nikdy nezanikne", startVerse: 8, endVerse: 13 },
        ],
      },
      {
        chapter: 14,
        sections: [
          { title: "Prorokování a jazyky", startVerse: 1, endVerse: 19 },
          { title: "Znamení pro věřící a nevěřící", startVerse: 20, endVerse: 25 },
          { title: "Pořádek při bohoslužbě", startVerse: 26, endVerse: 33 },
          { title: "Závěrečné pokyny", startVerse: 34, endVerse: 40 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Kristus byl vzkříšen", startVerse: 1, endVerse: 11 },
          { title: "Vzkříšení mrtvých je jisté", startVerse: 12, endVerse: 19 },
          { title: "Kristus jako prvotina", startVerse: 20, endVerse: 28 },
          { title: "Důsledky víry ve vzkříšení", startVerse: 29, endVerse: 34 },
          { title: "Povaha vzkříšeného těla", startVerse: 35, endVerse: 49 },
          { title: "Vítězství nad smrtí", startVerse: 50, endVerse: 58 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Sbírka pro Jeruzalém", startVerse: 1, endVerse: 4 },
          { title: "Pavlovy plány cest", startVerse: 5, endVerse: 12 },
          { title: "Závěrečná napomenutí", startVerse: 13, endVerse: 18 },
          { title: "Pozdravy a požehnání", startVerse: 19, endVerse: 24 },
        ],
      },
    ],
  },

  // ==================== PSALMS (19) — lectionary selection ====================
  19: {
    bookId: "psalms",
    bookName: "Žalmy",
    bookStructure: [
      { title: "Kniha I", chapters: "1–41", description: "Davidovské, osobní modlitby" },
      { title: "Kniha II", chapters: "42–72", description: "Synů Korachových, David" },
      { title: "Kniha III", chapters: "73–89", description: "Asafa a Korachovci" },
      { title: "Kniha IV", chapters: "90–106", description: "Hospodinovo království" },
      { title: "Kniha V", chapters: "107–150", description: "Chvalozpěvy, poutní" },
    ],
    chapters: [
      {
        chapter: 2,
        sections: [
          { title: "Vzpoura národů proti Hospodinu", startVerse: 1, endVerse: 6 },
          { title: "Pomazaný král a jeho dědictví", startVerse: 7, endVerse: 12 },
        ],
      },
      {
        chapter: 3,
        sections: [
          { title: "Ranní modlitba v tísni", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 8,
        sections: [
          { title: "Sláva Stvořitele a důstojnost člověka", startVerse: 1, endVerse: 10 },
        ],
      },
      {
        chapter: 13,
        sections: [
          { title: "Jak dlouho, Hospodine?", startVerse: 1, endVerse: 3 },
          { title: "Důvěra v milosrdenství", startVerse: 4, endVerse: 6 },
        ],
      },
      {
        chapter: 15,
        sections: [
          { title: "Kdo smí přebývat na Hospodinově hoře", startVerse: 1, endVerse: 5 },
        ],
      },
      {
        chapter: 16,
        sections: [
          { title: "Hospodin je můj úděl", startVerse: 1, endVerse: 6 },
          { title: "Stezka života", startVerse: 7, endVerse: 11 },
        ],
      },
      {
        chapter: 17,
        sections: [
          { title: "Volání o spravedlnost", startVerse: 1, endVerse: 7 },
          { title: "Pod ochranou Hospodinových křídel", startVerse: 8, endVerse: 15 },
        ],
      },
      {
        chapter: 18,
        sections: [
          { title: "Hospodin — má skála a záchrana", startVerse: 1, endVerse: 7 },
          { title: "Hospodin sestupuje a vysvobozuje", startVerse: 8, endVerse: 20 },
          { title: "Odměna za věrnost", startVerse: 21, endVerse: 31 },
          { title: "Chvála vítězství", startVerse: 32, endVerse: 51 },
        ],
      },
      {
        chapter: 19,
        sections: [
          { title: "Nebesa vypravují slávu Boží", startVerse: 1, endVerse: 7 },
          { title: "Hospodinův zákon je dokonalý", startVerse: 8, endVerse: 15 },
        ],
      },
      {
        chapter: 21,
        sections: [
          { title: "Děkování za krále", startVerse: 1, endVerse: 8 },
          { title: "Vítězství nad nepřáteli", startVerse: 9, endVerse: 14 },
        ],
      },
      {
        chapter: 22,
        sections: [
          { title: "Volání opuštěného", startVerse: 1, endVerse: 22 },
          { title: "Chvála za vyslyšení", startVerse: 23, endVerse: 32 },
        ],
      },
      {
        chapter: 24,
        sections: [
          { title: "Hospodinova je země", startVerse: 1, endVerse: 6 },
          { title: "Král slávy vchází", startVerse: 7, endVerse: 10 },
        ],
      },
      {
        chapter: 25,
        sections: [
          { title: "Prosba o vedení", startVerse: 1, endVerse: 10 },
          { title: "Hospodin učí pokorné", startVerse: 11, endVerse: 22 },
        ],
      },
      {
        chapter: 27,
        sections: [
          { title: "Hospodin je mé světlo", startVerse: 1, endVerse: 6 },
          { title: "Prosba o slyšení", startVerse: 7, endVerse: 14 },
        ],
      },
      {
        chapter: 28,
        sections: [
          { title: "Volání k Hospodinu", startVerse: 1, endVerse: 5 },
          { title: "Chvála za vyslyšení", startVerse: 6, endVerse: 9 },
        ],
      },
      {
        chapter: 29,
        sections: [
          { title: "Hlas Hospodinův nad vodami", startVerse: 1, endVerse: 11 },
        ],
      },
      {
        chapter: 30,
        sections: [
          { title: "Vysvobození ze smrti", startVerse: 1, endVerse: 6 },
          { title: "Pláč se proměnil v tanec", startVerse: 7, endVerse: 13 },
        ],
      },
      {
        chapter: 31,
        sections: [
          { title: "V tvé ruce svěřuji svého ducha", startVerse: 1, endVerse: 9 },
          { title: "Prosba v úzkosti", startVerse: 10, endVerse: 19 },
          { title: "Chvála Hospodinovy dobroty", startVerse: 20, endVerse: 25 },
        ],
      },
      {
        chapter: 32,
        sections: [
          { title: "Blaze tomu, komu je odpuštěno", startVerse: 1, endVerse: 5 },
          { title: "Hospodin učí cestě", startVerse: 6, endVerse: 11 },
        ],
      },
      {
        chapter: 33,
        sections: [
          { title: "Chvála Stvořitele", startVerse: 1, endVerse: 12 },
          { title: "Hospodinova ochrana", startVerse: 13, endVerse: 22 },
        ],
      },
      {
        chapter: 34,
        sections: [
          { title: "Okuste a vizte, jak dobrý je Hospodin", startVerse: 1, endVerse: 11 },
          { title: "Hospodin chrání spravedlivé", startVerse: 12, endVerse: 23 },
        ],
      },
      {
        chapter: 36,
        sections: [
          { title: "Svévole bezbožného", startVerse: 1, endVerse: 5 },
          { title: "Tvé milosrdenství sahá až k nebi", startVerse: 6, endVerse: 13 },
        ],
      },
      {
        chapter: 37,
        sections: [
          { title: "Nehněvej se na zlovolníky", startVerse: 1, endVerse: 11 },
          { title: "Úděl spravedlivých a svévolných", startVerse: 12, endVerse: 26 },
          { title: "Hospodin je záštitou spravedlivých", startVerse: 27, endVerse: 40 },
        ],
      },
      {
        chapter: 38,
        sections: [
          { title: "Modlitba v nemoci a hříchu", startVerse: 1, endVerse: 23 },
        ],
      },
      {
        chapter: 40,
        sections: [
          { title: "Nová píseň za vysvobození", startVerse: 1, endVerse: 11 },
          { title: "Prosba o pomoc", startVerse: 12, endVerse: 18 },
        ],
      },
      {
        chapter: 41,
        sections: [
          { title: "Blaze tomu, kdo má porozumění pro nuzného", startVerse: 1, endVerse: 14 },
        ],
      },
      {
        chapter: 43,
        sections: [
          { title: "Pošli své světlo a svou pravdu", startVerse: 1, endVerse: 5 },
        ],
      },
      {
        chapter: 44,
        sections: [
          { title: "Vzpomínka na dřívější skutky Boží", startVerse: 1, endVerse: 9 },
          { title: "Nářek nad porážkou", startVerse: 10, endVerse: 27 },
        ],
      },
      {
        chapter: 45,
        sections: [
          { title: "Píseň o králi", startVerse: 1, endVerse: 10 },
          { title: "Píseň o královně", startVerse: 11, endVerse: 18 },
        ],
      },
      {
        chapter: 47,
        sections: [
          { title: "Hospodin je král vší země", startVerse: 1, endVerse: 10 },
        ],
      },
      {
        chapter: 48,
        sections: [
          { title: "Sión — město velikého Krále", startVerse: 1, endVerse: 15 },
        ],
      },
      {
        chapter: 50,
        sections: [
          { title: "Bůh soudí svůj lid", startVerse: 1, endVerse: 15 },
          { title: "Obžaloba bezbožných", startVerse: 16, endVerse: 23 },
        ],
      },
      {
        chapter: 51,
        sections: [
          { title: "Smiluj se nade mnou, Bože", startVerse: 1, endVerse: 11 },
          { title: "Stvoř mi čisté srdce", startVerse: 12, endVerse: 21 },
        ],
      },
      {
        chapter: 54,
        sections: [
          { title: "Bože, zachraň mě pro své jméno", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 55,
        sections: [
          { title: "Nářek nad zradou přítele", startVerse: 1, endVerse: 16 },
          { title: "Uvrhni na Hospodina svou starost", startVerse: 17, endVerse: 24 },
        ],
      },
      {
        chapter: 57,
        sections: [
          { title: "Útočiště ve stínu křídel", startVerse: 1, endVerse: 7 },
          { title: "Budu ti zpívat chválu", startVerse: 8, endVerse: 12 },
        ],
      },
      {
        chapter: 65,
        sections: [
          { title: "Bůh vyslyší modlitbu", startVerse: 1, endVerse: 9 },
          { title: "Hospodin žehná zemi", startVerse: 10, endVerse: 14 },
        ],
      },
      {
        chapter: 66,
        sections: [
          { title: "Plesejte Bohu, všechny země", startVerse: 1, endVerse: 12 },
          { title: "Osobní vyznání", startVerse: 13, endVerse: 20 },
        ],
      },
      {
        chapter: 67,
        sections: [
          { title: "Ať národy ti vzdávají chválu", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 68,
        sections: [
          { title: "Bůh povstává, jeho nepřátelé se rozptylují", startVerse: 1, endVerse: 11 },
          { title: "Triumfální průvod na Sión", startVerse: 12, endVerse: 24 },
          { title: "Chvála Boha zachránce", startVerse: 25, endVerse: 36 },
        ],
      },
      {
        chapter: 69,
        sections: [
          { title: "Vody mi sahají až k duši", startVerse: 1, endVerse: 13 },
          { title: "Prosba o vysvobození", startVerse: 14, endVerse: 30 },
          { title: "Chvála a důvěra", startVerse: 31, endVerse: 37 },
        ],
      },
      {
        chapter: 71,
        sections: [
          { title: "K tobě se utíkám, Hospodine", startVerse: 1, endVerse: 12 },
          { title: "Modlitba ve stáří", startVerse: 13, endVerse: 24 },
        ],
      },
      {
        chapter: 72,
        sections: [
          { title: "Modlitba za krále", startVerse: 1, endVerse: 11 },
          { title: "Král jako zastánce chudých", startVerse: 12, endVerse: 20 },
        ],
      },
      {
        chapter: 73,
        sections: [
          { title: "Závist vůči svévolným", startVerse: 1, endVerse: 14 },
          { title: "Prohlédnutí ve svatyni", startVerse: 15, endVerse: 28 },
        ],
      },
      {
        chapter: 77,
        sections: [
          { title: "Volání v noci úzkosti", startVerse: 1, endVerse: 11 },
          { title: "Vzpomínka na Hospodinovy činy", startVerse: 12, endVerse: 21 },
        ],
      },
      {
        chapter: 78,
        sections: [
          { title: "Vyučování z dějin", startVerse: 1, endVerse: 11 },
          { title: "Hospodinovy divy při exodu", startVerse: 12, endVerse: 39 },
          { title: "Rány egyptské a výchova na poušti", startVerse: 40, endVerse: 55 },
          { title: "Nevěrnost Izraele a volba Davida", startVerse: 56, endVerse: 72 },
        ],
      },
      {
        chapter: 79,
        sections: [
          { title: "Nářek nad zpustošeným Jeruzalémem", startVerse: 1, endVerse: 13 },
        ],
      },
      {
        chapter: 80,
        sections: [
          { title: "Pastýři Izraele, rozjasni svou tvář", startVerse: 1, endVerse: 8 },
          { title: "Réva vyvrácená z vinice", startVerse: 9, endVerse: 20 },
        ],
      },
      {
        chapter: 81,
        sections: [
          { title: "Svátek a vzpomínka na vysvobození", startVerse: 1, endVerse: 8 },
          { title: "Kéž by mě můj lid poslouchal", startVerse: 9, endVerse: 17 },
        ],
      },
      {
        chapter: 82,
        sections: [
          { title: "Bůh soudí soudce", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 84,
        sections: [
          { title: "Jak jsou milé tvé příbytky", startVerse: 1, endVerse: 8 },
          { title: "Blaze tomu, kdo doufá v Hospodina", startVerse: 9, endVerse: 13 },
        ],
      },
      {
        chapter: 85,
        sections: [
          { title: "Navrať nás, Bože, naše spáso", startVerse: 1, endVerse: 8 },
          { title: "Milosrdenství a věrnost se potkávají", startVerse: 9, endVerse: 14 },
        ],
      },
      {
        chapter: 86,
        sections: [
          { title: "Naslouchej mi, Hospodine", startVerse: 1, endVerse: 10 },
          { title: "Uč mě své cestě", startVerse: 11, endVerse: 17 },
        ],
      },
      {
        chapter: 87,
        sections: [
          { title: "Sión, matka národů", startVerse: 1, endVerse: 7 },
        ],
      },
      {
        chapter: 88,
        sections: [
          { title: "Modlitba v největší temnotě", startVerse: 1, endVerse: 19 },
        ],
      },
      {
        chapter: 89,
        sections: [
          { title: "Milosrdenství Hospodinova na věky", startVerse: 1, endVerse: 19 },
          { title: "Smlouva s Davidem", startVerse: 20, endVerse: 38 },
          { title: "Nářek nad padlým královstvím", startVerse: 39, endVerse: 53 },
        ],
      },
      {
        chapter: 90,
        sections: [
          { title: "Pane, tys nám byl útočištěm", startVerse: 1, endVerse: 12 },
          { title: "Prosba o milost", startVerse: 13, endVerse: 17 },
        ],
      },
      {
        chapter: 91,
        sections: [
          { title: "Ve stínu Nejvyššího", startVerse: 1, endVerse: 8 },
          { title: "Andělé budou bdít nad tebou", startVerse: 9, endVerse: 16 },
        ],
      },
      {
        chapter: 92,
        sections: [
          { title: "Dobré je vzdávat chválu Hospodinu", startVerse: 1, endVerse: 9 },
          { title: "Spravedlivý pokvete jako palma", startVerse: 10, endVerse: 16 },
        ],
      },
      {
        chapter: 93,
        sections: [
          { title: "Hospodin kraluje", startVerse: 1, endVerse: 5 },
        ],
      },
      {
        chapter: 95,
        sections: [
          { title: "Pojďte, plesejme Hospodinu", startVerse: 1, endVerse: 7 },
          { title: "Nezatvrzujte svá srdce", startVerse: 8, endVerse: 11 },
        ],
      },
      {
        chapter: 96,
        sections: [
          { title: "Zpívejte Hospodinu novou píseň", startVerse: 1, endVerse: 13 },
        ],
      },
      {
        chapter: 97,
        sections: [
          { title: "Hospodin kraluje — ať plesá země", startVerse: 1, endVerse: 12 },
        ],
      },
      {
        chapter: 98,
        sections: [
          { title: "Zpívejte Hospodinu novou píseň", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 99,
        sections: [
          { title: "Hospodin kraluje — svatý je", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 100,
        sections: [
          { title: "Hlahol Hospodinu, celá země", startVerse: 1, endVerse: 5 },
        ],
      },
      {
        chapter: 102,
        sections: [
          { title: "Modlitba ubožáka", startVerse: 1, endVerse: 12 },
          { title: "Hospodin obnoví Sión", startVerse: 13, endVerse: 29 },
        ],
      },
      {
        chapter: 103,
        sections: [
          { title: "Dobrořeč, má duše, Hospodinu", startVerse: 1, endVerse: 14 },
          { title: "Milosrdenství Hospodinovo od věků na věky", startVerse: 15, endVerse: 22 },
        ],
      },
      {
        chapter: 104,
        sections: [
          { title: "Chvála Stvořitele nebes a země", startVerse: 1, endVerse: 18 },
          { title: "Hospodin živí všechno tvorstvo", startVerse: 19, endVerse: 35 },
        ],
      },
      {
        chapter: 105,
        sections: [
          { title: "Vzpomínejte na jeho divy", startVerse: 1, endVerse: 15 },
          { title: "Josef a exodus", startVerse: 16, endVerse: 45 },
        ],
      },
      {
        chapter: 106,
        sections: [
          { title: "Hřešili jsme jako naši otcové", startVerse: 1, endVerse: 23 },
          { title: "Hospodinovo milosrdenství navzdory selháním", startVerse: 24, endVerse: 48 },
        ],
      },
      {
        chapter: 107,
        sections: [
          { title: "Vykoupení z rozptýlení", startVerse: 1, endVerse: 16 },
          { title: "Vysvobození z nemoci a bouře", startVerse: 17, endVerse: 32 },
          { title: "Hospodin mění pustinu v pramen", startVerse: 33, endVerse: 43 },
        ],
      },
      {
        chapter: 111,
        sections: [
          { title: "Velká jsou díla Hospodinova", startVerse: 1, endVerse: 10 },
        ],
      },
      {
        chapter: 112,
        sections: [
          { title: "Blaze muži, který se bojí Hospodina", startVerse: 1, endVerse: 10 },
        ],
      },
      {
        chapter: 113,
        sections: [
          { title: "Chvalte, služebníci Hospodinovi", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 117,
        sections: [
          { title: "Chvalte Hospodina, všechny národy", startVerse: 1, endVerse: 2 },
        ],
      },
      {
        chapter: 118,
        sections: [
          { title: "Jeho milosrdenství je věčné", startVerse: 1, endVerse: 14 },
          { title: "Kámen, který stavitelé zavrhli", startVerse: 15, endVerse: 29 },
        ],
      },
      {
        chapter: 119,
        sections: [
          { title: "Alef — Blaze těm, kdo chodí podle zákona", startVerse: 1, endVerse: 8 },
          { title: "Bet — Jak si chlapec udrží svou stezku čistou", startVerse: 9, endVerse: 16 },
          { title: "Gimel — Otevři mi oči, abych viděl", startVerse: 17, endVerse: 24 },
          { title: "Dalet — Má duše přilnula k prachu", startVerse: 25, endVerse: 32 },
          { title: "He — Nauč mě, Hospodine, cestě svých ustanovení", startVerse: 33, endVerse: 40 },
          { title: "Vav — Ať mě dostihne tvé milosrdenství", startVerse: 41, endVerse: 48 },
          { title: "Zajin — Rozpomeň se na slovo své služebníkovi", startVerse: 49, endVerse: 56 },
          { title: "Chet — Hospodin je můj podíl", startVerse: 57, endVerse: 64 },
          { title: "Tet — Dobře jsi jednal se svým služebníkem", startVerse: 65, endVerse: 72 },
          { title: "Jod — Tvé ruce mě učinily", startVerse: 73, endVerse: 80 },
          { title: "Kaf — Má duše chřadne touhou po tvé spáse", startVerse: 81, endVerse: 88 },
          { title: "Lamed — Tvé slovo, Hospodine, je věčné", startVerse: 89, endVerse: 96 },
          { title: "Mem — Jak velice miluji tvůj zákon", startVerse: 97, endVerse: 104 },
          { title: "Nun — Tvé slovo je lampou mým nohám", startVerse: 105, endVerse: 112 },
          { title: "Samech — Nenávidím obojetnost", startVerse: 113, endVerse: 120 },
          { title: "Ajin — Jsem tvůj služebník, dej mi rozum", startVerse: 121, endVerse: 128 },
          { title: "Pe — Tvá svědectví jsou zázračná", startVerse: 129, endVerse: 136 },
          { title: "Sade — Spravedlivý jsi, Hospodine", startVerse: 137, endVerse: 144 },
          { title: "Kof — Volám celým srdcem", startVerse: 145, endVerse: 152 },
          { title: "Reš — Viz mou trýzeň a vysvoboď mě", startVerse: 153, endVerse: 160 },
          { title: "Šin — Velikánové mě pronásledují bez příčiny", startVerse: 161, endVerse: 168 },
          { title: "Tav — Ať přijde mé volání před tvou tvář", startVerse: 169, endVerse: 176 },
        ],
      },
      {
        chapter: 120,
        sections: [
          { title: "Modlitba proti falešným jazykům", startVerse: 1, endVerse: 7 },
        ],
      },
      {
        chapter: 121,
        sections: [
          { title: "Pozvedám své oči k horám", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 122,
        sections: [
          { title: "Radost v Jeruzalémě", startVerse: 1, endVerse: 9 },
        ],
      },
      {
        chapter: 124,
        sections: [
          { title: "Kdyby Hospodin nebyl při nás", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 125,
        sections: [
          { title: "Kdo doufá v Hospodina, je jako hora Sión", startVerse: 1, endVerse: 5 },
        ],
      },
      {
        chapter: 126,
        sections: [
          { title: "Když Hospodin navrátil Sión", startVerse: 1, endVerse: 6 },
        ],
      },
      {
        chapter: 128,
        sections: [
          { title: "Blaze tomu, kdo se bojí Hospodina", startVerse: 1, endVerse: 6 },
        ],
      },
      {
        chapter: 130,
        sections: [
          { title: "Z hlubin volám k tobě", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 131,
        sections: [
          { title: "Pokorná duše", startVerse: 1, endVerse: 3 },
        ],
      },
      {
        chapter: 132,
        sections: [
          { title: "Vzpomínka na Davida", startVerse: 1, endVerse: 10 },
          { title: "Hospodin si vyvolil Sión", startVerse: 11, endVerse: 18 },
        ],
      },
      {
        chapter: 133,
        sections: [
          { title: "Jak dobré je, když bratři přebývají pospolu", startVerse: 1, endVerse: 3 },
        ],
      },
      {
        chapter: 135,
        sections: [
          { title: "Chvalte jméno Hospodinovo", startVerse: 1, endVerse: 12 },
          { title: "Modly národů a Hospodin Bůh", startVerse: 13, endVerse: 21 },
        ],
      },
      {
        chapter: 138,
        sections: [
          { title: "Vzdám ti chválu celým srdcem", startVerse: 1, endVerse: 8 },
        ],
      },
      {
        chapter: 139,
        sections: [
          { title: "Hospodine, ty mě zkoumáš a znáš", startVerse: 1, endVerse: 12 },
          { title: "Tys utvořil mé ledví", startVerse: 13, endVerse: 18 },
          { title: "Zkoumej mě, Bože", startVerse: 19, endVerse: 24 },
        ],
      },
      {
        chapter: 141,
        sections: [
          { title: "Má modlitba jako kadidlo", startVerse: 1, endVerse: 10 },
        ],
      },
      {
        chapter: 145,
        sections: [
          { title: "Chvalozpěv na Hospodinovu velikost", startVerse: 1, endVerse: 10 },
          { title: "Hospodin je blízko všem, kdo ho vzývají", startVerse: 11, endVerse: 21 },
        ],
      },
      {
        chapter: 148,
        sections: [
          { title: "Ať chválí Hospodina nebesa", startVerse: 1, endVerse: 6 },
          { title: "Ať chválí Hospodina země", startVerse: 7, endVerse: 14 },
        ],
      },
      {
        chapter: 149,
        sections: [
          { title: "Nová píseň v shromáždění věrných", startVerse: 1, endVerse: 9 },
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
