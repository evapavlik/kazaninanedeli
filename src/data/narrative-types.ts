export interface NarrativeType {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  observationQuestions: string[];
}

export const narrativeTypes: NarrativeType[] = [
  {
    id: "parable",
    name: `Podobenstv\u00ED`,
    icon: "\uD83C\uDF31",
    description: `Kr\u00E1tk\u00FD p\u0159\u00EDb\u011Bh nebo p\u0159irovn\u00E1n\u00ED ze \u017Eivota, kter\u00FD ilustruje duchovn\u00ED pravdu. Je\u017E\u00ED\u0161ovo typick\u00E9 u\u010Ditelsko-k\u00E1zanitelsk\u00E9 vypr\u00E1v\u011Bn\u00ED.`,
    features: [
      `Za\u010D\u00EDn\u00E1 \u010Dasto \u201EKr\u00E1lovstv\u00ED Bo\u017E\u00ED je jako\u2026\u201C`,
      `P\u0159irovn\u00E1n\u00ED ze v\u0161edn\u00EDho \u017Eivota (s\u00EDt\u00ED, zrno, ov\u010De)`,
      `Jeden hlavn\u00ED bod, ne alegorie ka\u017Ed\u00E9ho detailu`,
      `\u010Casto obsahuje p\u0159ekvapen\u00ED nebo obrat`,
    ],
    observationQuestions: [
      `Co je hlavn\u00ED bod srovn\u00E1n\u00ED?`,
      `Kdo jsou hlavn\u00ED postavy a co reprezentuj\u00ED?`,
      `Kde je v p\u0159\u00EDb\u011Bhu moment p\u0159ekvapen\u00ED?`,
      `Jak by tento p\u0159\u00EDb\u011Bh p\u016Fsobil na prvn\u00ED poslucha\u010De?`,
    ],
  },
  {
    id: "miracle",
    name: `Z\u00E1zrak`,
    icon: "\u2728",
    description: `Vypr\u00E1v\u011Bn\u00ED o Bo\u017E\u00EDm z\u00E1sahu do b\u011B\u017En\u00E9ho \u0159\u00E1du v\u011Bc\u00ED \u2014 uzdraven\u00ED, p\u0159\u00EDrodn\u00ED z\u00E1zraky, vyh\u00E1n\u011Bn\u00ED d\u00E9mon\u016F, vzkl\u00ED\u0161en\u00ED.`,
    features: [
      `Popis v\u00FDchoz\u00ED situace (nemoc, nouze, nebezpe\u010D\u00ED)`,
      `Setk\u00E1n\u00ED s Je\u017E\u00ED\u0161em / prosba o pomoc`,
      `Je\u017E\u00ED\u0161\u016Fv \u010Din nebo slovo`,
      `V\u00FDsledek a reakce svid\u011Btl\u016F`,
    ],
    observationQuestions: [
      `Jak\u00E1 je v\u00FDchoz\u00ED situace pot\u0159ebn\u00E9ho \u010Dlov\u011Bka?`,
      `Co p\u0159edch\u00E1z\u00ED z\u00E1zraku \u2014 v\u00EDra, prosba, nebo iniciativa Je\u017E\u00ED\u0161e?`,
      `Co z\u00E1zrak odhaluje o Bo\u017E\u00EDm charakteru?`,
      `Jak reaguj\u00ED r\u016Fzn\u00E9 skupiny lid\u00ED?`,
    ],
  },
  {
    id: "discourse",
    name: `\u0158e\u010D / K\u00E1z\u00E1n\u00ED`,
    icon: "\uD83D\uDDE3\uFE0F",
    description: `P\u0159\u00EDm\u00E1 \u0159e\u010D Je\u017E\u00ED\u0161e (K\u00E1z\u00E1n\u00ED na ho\u0159e, \u0159e\u010D na rozlou\u010Denou) nebo proroka. Soustavn\u00FD v\u00FDklad s teologick\u00FDm poselstv\u00EDm.`,
    features: [
      `Dlouh\u00FD monolog nebo dialog`,
      `Tematick\u00E9 celky a opakov\u00E1n\u00ED`,
      `Imperativy (p\u0159\u00EDkazy) nebo zasl\u00EDben\u00ED`,
      `Argumenta\u010Dn\u00ED struktura`,
    ],
    observationQuestions: [
      `Jak\u00E1 je hlavn\u00ED teze \u0159e\u010Di?`,
      `Jak je \u0159e\u010D strukturov\u00E1na \u2014 jak\u00E9 jsou hlavn\u00ED \u010D\u00E1sti?`,
      `Jak\u00E9 p\u0159\u00EDkazy nebo zasl\u00EDben\u00ED text obsahuje?`,
      `Komu je \u0159e\u010D adresov\u00E1na a v jak\u00E9 situaci?`,
    ],
  },
  {
    id: "epistle",
    name: `Epi\u0161tola (dopis)`,
    icon: "\u2709\uFE0F",
    description: `Apoštolsk\u00FD dopis ur\u010Dený konkr\u00E9tn\u00ED c\u00EDrkevn\u00ED obci nebo osob\u011B. Obsahuje teologii i praktick\u00E9 pokyny.`,
    features: [
      `Osloven\u00ED a po\u017Eehn\u00E1n\u00ED (forma dopisu)`,
      `Teologick\u00FD argument + praktick\u00E9 d\u016Fsledky`,
      `Reakce na konkr\u00E9tn\u00ED probl\u00E9my sboru`,
      `V\u00FDzvy a napomenut\u00ED`,
    ],
    observationQuestions: [
      `Na jak\u00FD probl\u00E9m nebo situaci autor reaguje?`,
      `Jak\u00FD teologick\u00FD argument pou\u017E\u00EDv\u00E1?`,
      `Co je indikativ (co B\u016Fh ud\u011Blal) a co imperativ (co m\u00E1me d\u011Blat)?`,
      `Jak se situace p\u016Fvodn\u00EDch adres\u00E1t\u016F podob\u00E1 na\u0161\u00ED?`,
    ],
  },
  {
    id: "narrative",
    name: `Historick\u00FD narativ`,
    icon: "\uD83D\uDCD6",
    description: `Vypr\u00E1v\u011Bn\u00ED o ud\u00E1lostech \u2014 d\u011Bjiny Izraele, Skutky apo\u0161tol\u016F, p\u0159\u00EDb\u011Bhy patriarch\u016F. D\u011Bj s teologickou interpretac\u00ED.`,
    features: [
      `Postavy, m\u00EDsto, \u010Das, z\u00E1pletka`,
      `Dialog jako n\u00E1stroj charakterizace`,
      `Teologick\u00FD koment\u00E1\u0159 vypr\u00E1v\u011B\u010De`,
      `Opakov\u00E1n\u00ED motiv\u016F a typologie`,
    ],
    observationQuestions: [
      `Kdo jsou hlavn\u00ED postavy a jak se vyv\u00EDj\u00ED?`,
      `Kde je v p\u0159\u00EDb\u011Bhu zlom?`,
      `Co vypr\u00E1v\u011B\u010D zd\u016Fraz\u0148uje opakov\u00E1n\u00EDm?`,
      `Jak\u00FD teologick\u00FD bod p\u0159\u00EDb\u011Bh ilustruje?`,
    ],
  },
  {
    id: "poetry",
    name: `Poezie (\u017Ealmy, p\u00EDsn\u011B)`,
    icon: "\uD83C\uDFB5",
    description: `Poetick\u00E9 texty s parallelismy, obrazy a emocemi. \u017Dalmy, P\u00EDse\u0148 p\u00EDsn\u00ED, n\u011Bkter\u00E9 prorock\u00E9 texty.`,
    features: [
      `Paralelismus (synonymn\u00ED, antitetick\u00FD, syntetick\u00FD)`,
      `Obrazn\u00FD jazyk a metafory`,
      `Emocion\u00E1ln\u00ED n\u00E1boj`,
      `Liturgick\u00FD kontext (bohoslu\u017Eba)`,
    ],
    observationQuestions: [
      `Jak\u00E9 obrazy a metafory autor pou\u017E\u00EDv\u00E1?`,
      `Jak\u00E9 emoce text vyj\u00E1d\u0159uje?`,
      `Kde je v textu paralelismus?`,
      `Jak text funguje jako modlitba nebo chv\u00E1la?`,
    ],
  },
  {
    id: "prophecy",
    name: `Proroctv\u00ED`,
    icon: "\uD83D\uDD25",
    description: `Prorock\u00E9 v\u00FDroky vol\u00E1n\u00ED k pokání, soudu nebo nadìje. Izai\u00E1\u0161, Jeremi\u00E1\u0161, mal\u00ED proroci.`,
    features: [
      `\u201ETak prav\u00ED Hospodin\u201C \u2014 formule zvìstov\u00E1n\u00ED`,
      `V\u00FDzva k pok\u00E1n\u00ED nebo ozn\u00E1men\u00ED soudu`,
      `Zasl\u00EDben\u00ED obnovy a nad\u011Bje`,
      `Symbolick\u00E9 jedn\u00E1n\u00ED a vize`,
    ],
    observationQuestions: [
      `Komu je proroctv\u00ED ur\u010Deno?`,
      `Jde o soud, volání k pok\u00E1n\u00ED, nebo zasl\u00EDben\u00ED?`,
      `Jak\u00E9 konkr\u00E9tn\u00ED h\u0159\u00EDchy nebo situace prorok adresuje?`,
      `Jak text ukazuje na Boží vìrnost?`,
    ],
  },
  {
    id: "apocalyptic",
    name: `Apokalyptika`,
    icon: "\uD83C\uDF0D",
    description: `Vize konce \u010Das\u016F, kosmick\u00FDch boj\u016F a Bo\u017E\u00EDho v\u00EDt\u011Bzstv\u00ED. Zjeven\u00ED, Daniel, \u010D\u00E1sti Ezechiela.`,
    features: [
      `Symboly, \u010D\u00EDsla, barvy s hlub\u0161\u00EDm v\u00FDznamem`,
      `Kosmick\u00FD boj dobra a zla`,
      `Vize zprost\u0159edkovan\u00E9 and\u011Blem`,
      `Poselstv\u00ED nad\u011Bje pro pronásledované`,
    ],
    observationQuestions: [
      `Jak\u00E9 symboly text pou\u017E\u00EDv\u00E1 a co mohou znamenat?`,
      `Jak\u00FD je hlavn\u00ED konflikt v textu?`,
      `Jak\u00E9 poselstv\u00ED p\u0159in\u00E1\u0161\u00ED text trp\u00EDc\u00EDm?`,
      `Co text \u0159\u00EDk\u00E1 o Bo\u017E\u00ED svrchovanosti?`,
    ],
  },
];
