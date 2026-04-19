/**
 * Commentary notes for specific pericopes.
 * These are original exegetical summaries for practical sermon preparation.
 *
 * Keying:
 *  - `"{bookNumber}:{chapter}"` — chapter-wide commentary (default)
 *  - `"{bookNumber}:{chapter}:{verseStart}-{verseEnd}"` — specific pericope
 *    within a chapter, used when the same chapter has multiple distinct
 *    lectionary readings (e.g. Sk 2,1-13 = Pentecost vs. Sk 2,14.36-41 =
 *    Peter's sermon)
 *
 * `getCommentary()` first looks for a pericope-specific match, then
 * falls back to the chapter-wide one.
 */

export interface VerseNote {
  verse: number;
  note: string;
}

export interface CrossReference {
  reference: string;
  text: string;
  translation: string;
  relevance: string;
}

export interface PericopeCommentary {
  reference: string;
  title: string;
  context: string;
  keyWords: { word: string; explanation: string }[];
  structure: string;
  theologicalThemes: string[];
  applicationHints: string[];
  cross_references?: CrossReference[];
  verseNotes: VerseNote[];
}

const COMMENTARY: Record<string, PericopeCommentary> = {
  // Isaiah 50,4-9a — Palm Sunday (Květná neděle), year A
  "23:50": {
    reference: "Iz 50,4\u20139a",
    title: "T\u0159et\u00ED p\u00EDse\u0148 o Hospodinov\u011B slu\u017Eebn\u00EDku",
    context: "Text je t\u0159et\u00ED ze \u010Dty\u0159 p\u00EDsn\u00ED o Hospodinov\u011B slu\u017Eebn\u00EDku (Ebed-JHWH) v Deutero-Izaj\u00E1\u0161i (Iz 40\u201355). Vznikl v babylonsk\u00E9m exilu (cca 550\u2013539 p\u0159. Kr.), kdy judsk\u00FD lid \u010Delil krizi v\u00EDry. Slu\u017Eebn\u00EDk mluv\u00ED v prvn\u00ED osob\u011B o sv\u00E9m utrpen\u00ED a d\u016Fv\u011B\u0159e v Hospodina. Identita slu\u017Eebn\u00EDka je mnohovrstevn\u00E1 \u2014 kolektivn\u00ED v\u00FDklad jej ztoto\u017E\u0148uje s Izraelem, individu\u00E1ln\u00ED vid\u00ED konkr\u00E9tn\u00ED postavu (proroka), k\u0159es\u0165ansk\u00E1 tradice \u010Dte christologicky. V liturgii Kv\u011Btn\u00E9 ned\u011Ble text otev\u00EDr\u00E1 pa\u0161ijov\u00FD p\u0159\u00EDb\u011Bh.",
    keyWords: [
      {
        word: "limmud\u00EDm (\u05DC\u05B4\u05DE\u05BC\u05D5\u05BC\u05D3\u05B4\u05D9\u05DD) \u2014 u\u010Dedn\u00EDci",
        explanation: "Slu\u017Eebn\u00EDk nemluv\u00ED z vlastn\u00ED autority, ale jako ten, kdo byl vyu\u010Den Hospodinem. Sd\u00EDl\u00ED ko\u0159en s l-m-d (u\u010Dit se). Nejprve \u017E\u00E1k, pak teprve mluv\u010D\u00ED \u2014 definuje charakter proroctv\u00ED.",
      },
      {
        word: "\u02BF\u00FAr (\u05E2\u05D5\u05BC\u05E8) \u2014 probudit",
        explanation: "Opakuje se t\u0159ikr\u00E1t v\u00A0v.\u00A04, \u010D\u00EDm\u017E vytv\u00E1\u0159\u00ED nal\u00E9hav\u00FD rytmus. Hospodin probouz\u00ED slu\u017Eebn\u00EDkovo ucho ka\u017Ed\u00E9 r\u00E1no \u2014 naslouchání je opakovan\u00E1, disciplinovan\u00E1 praxe.",
      },
      {
        word: "g\u00E9v (\u05D2\u05B5\u05BC\u05D5) \u2014 z\u00E1da",
        explanation: "Slu\u017Eebn\u00EDk nastavuje z\u00E1da t\u011Bm, kdo bij\u00ED. V\u00FDraz v\u011Bdom\u00E9ho rozhodnut\u00ED n\u00E9st utrpen\u00ED, nikoli pasivn\u00ED rezignace. Aktivn\u00ED sloveso \u201Enastavil jsem\u201C (natat\u00ED).",
      },
      {
        word: "b\u00F3\u0161 (\u05D1\u05BC\u05D5\u05B9\u05E9\u05C1) \u2014 b\u00FDt zahanben",
        explanation: "Slu\u017Eebn\u00EDk prohla\u0161uje, \u017Ee nebude zahanben, proto\u017Ee Hospodin je jeho pomocn\u00EDkem. V kultu\u0159e cti a hanby jde o z\u00E1sadn\u00ED tvrzen\u00ED \u2014 \u010Dest spo\u010D\u00EDv\u00E1 v Bohu.",
      },
      {
        word: "hicd\u00EDk (\u05D4\u05B4\u05E6\u05B0\u05D3\u05BC\u05B4\u05D9\u05E7) \u2014 ospravedlnit",
        explanation: "Pr\u00E1vn\u00ED terminologie \u2014 Hospodin ospravedl\u0148uje. Slu\u017Eebn\u00EDk se neobhajuje s\u00E1m, ale odvol\u00E1v\u00E1 se na Bo\u017E\u00ED soud. P\u0159edj\u00EDm\u00E1 novoz\u00E1konn\u00ED teologii ospravedln\u011Bn\u00ED.",
      },
    ],
    structure: "A. Povol\u00E1n\u00ED a naslouchání (v.\u00A04\u20135a): slu\u017Eebn\u00EDk je vyu\u010Dov\u00E1n, naslouchá ka\u017Ed\u00E9 r\u00E1no. B. Utrpen\u00ED a pon\u00ED\u017Een\u00ED (v.\u00A05b\u20136): naslouchání vede k poslu\u0161nosti s cenou \u2014 bit\u00ED, rv\u00E1n\u00ED vous\u016F, pliv\u00E1n\u00ED. C. D\u016Fv\u011Bra a pr\u00E1vn\u00ED obhajoba (v.\u00A07\u20139a): vyzn\u00E1n\u00ED d\u016Fv\u011Bry s pr\u00E1vn\u00ED metaforikou, Hospodin je obh\u00E1jce. Celkov\u00FD pohyb: od p\u0159ij\u00EDm\u00E1n\u00ED slova, p\u0159es nesen\u00ED utrpen\u00ED, k jistot\u011B Bo\u017E\u00ED bl\u00EDzkosti.",
    theologicalThemes: [
      "Autorita slu\u017Eebn\u00EDka pramen\u00ED z naslouchání \u2014 k\u00E1z\u00E1n\u00ED za\u010D\u00EDn\u00E1 naslouchání, nikoli vlastn\u00ED moudrost\u00ED",
      "Dobrovoln\u011B p\u0159ijat\u00E9 utrpen\u00ED \u2014 v\u011Bdom\u00E9 rozhodnut\u00ED n\u00E9st d\u016Fsledky v\u011Brnosti Bo\u017E\u00EDmu slovu",
      "Hospodin jako zast\u00E1nce v soudn\u00EDm sporu \u2014 pravda nen\u00ED v\u011Bc\u00ED lidsk\u00E9ho soudu, ale Bo\u017E\u00EDho rozhodnut\u00ED",
      "Odvaha uprost\u0159ed pon\u00ED\u017Een\u00ED \u2014 text nekon\u010D\u00ED triumfem, ale odvahou a d\u016Fstojnost\u00ED",
    ],
    applicationHints: [
      "Co znamen\u00E1 \u201Enaslouchat jako u\u010Dedn\u00EDk\u201C v b\u011B\u017En\u00E9m \u017Eivot\u011B v\u00EDry? Jak vypad\u00E1 ka\u017Edodenn\u00ED naslouchání Bo\u017E\u00EDmu slovu?",
      "Kdy je utrpen\u00ED d\u016Fsledkem v\u011Brnosti \u2014 a kdy jen zbyte\u010Dnou bolest\u00ED? Ne ka\u017Ed\u00E1 bolest je \u201Ek\u0159\u00ED\u017E.\u201C",
      "Na koho se spol\u00E9h\u00E1me, kdy\u017E n\u00E1s sv\u011Bt \u201Esoud\u00ED\u201C? Kde hled\u00E1me potvrzen\u00ED vlastn\u00ED hodnoty?",
      "Kv\u011Btn\u00E1 ned\u011Ble: Vstupujeme do Svat\u00E9ho t\u00FDdne \u2014 jak\u00FD \u201EJeruzal\u00E9m\u201C stoj\u00ED p\u0159ed n\u00E1mi a m\u00E1me odvahu do n\u011Bj vstoupit?",
    ],
    cross_references: [
      {
        reference: "\u017D 22",
        text: "\u017Dalm utrpen\u00ED a d\u016Fv\u011Bry, kter\u00FD Je\u017E\u00ED\u0161 cituje na k\u0159\u00ED\u017Ei.",
        translation: "CEP",
        relevance: "Sd\u00EDl\u00ED stejn\u00FD pohyb: od popisu pon\u00ED\u017Een\u00ED k vyzn\u00E1n\u00ED d\u016Fv\u011Bry. Oba texty odm\u00EDtaj\u00ED p\u0159edstavu, \u017Ee utrpen\u00ED znamen\u00E1 Bo\u017E\u00ED opu\u0161t\u011Bnost.",
      },
      {
        reference: "Fp 2,5\u201311",
        text: "Kristologick\u00FD hymnus o dobrovoln\u00E9m pon\u00ED\u017Een\u00ED (ken\u00F3sis).",
        translation: "\u010CSP",
        relevance: "P\u0159\u00EDm\u00E1 teologick\u00E1 paralela: Kristus se \u201Epon\u00ED\u017Eil\u201C a \u201Estal se poslu\u0161n\u00FDm a\u017E k smrti.\u201C Pavlova teologie navazuje na tradici Ebed-JHWH.",
      },
      {
        reference: "Mk 10,32\u201334",
        text: "T\u0159et\u00ED Je\u017E\u00ED\u0161ovo p\u0159edpov\u011Bd\u011Bn\u00ED utrpen\u00ED.",
        translation: "CEP",
        relevance: "Slovn\u00EDk t\u00E9m\u011B\u0159 doslovn\u011B odpov\u00EDd\u00E1 Iz 50,6: pliv\u00E1n\u00ED, bi\u010Dov\u00E1n\u00ED, pon\u00ED\u017Een\u00ED.",
      },
    ],
    verseNotes: [
      {
        verse: 4,
        note: "Slu\u017Eebn\u00EDk je nejprve p\u0159\u00EDjemcem slova, pak jeho nositelem. C\u00EDlem je pomoci \u201Ezemdlen\u00E9mu\u201C (ja\u02BFaf \u2014 vy\u010Derpan\u00E9mu). Troj\u00ED opakov\u00E1n\u00ED ko\u0159ene \u02BF-v-r (probudit) zd\u016Fraz\u0148uje Bo\u017E\u00ED iniciativu a pravidelnost.",
      },
      {
        verse: 5,
        note: "Otev\u0159en\u00ED ucha navazuje na v.\u00A04, ale p\u0159ich\u00E1z\u00ED zlom: naslouchání vede k poslu\u0161nosti, kter\u00E1 m\u00E1 svou cenu. \u201ENevzep\u0159el jsem se\u201C (lo mar\u00EDti) je v\u011Bdom\u00E9 rozhodnut\u00ED. Svoboda a poslu\u0161nost tu nejsou protiklady.",
      },
      {
        verse: 6,
        note: "Nejkonkr\u00E9tn\u011Bj\u0161\u00ED popis utrpen\u00ED. Rv\u00E1n\u00ED vous\u016F je extr\u00E9mn\u00ED pon\u00ED\u017Een\u00ED \u2014 vousy jsou znamen\u00EDm mu\u017Esk\u00E9 d\u016Fstojnosti. Formulace je aktivn\u00ED: \u201Enastavil jsem\u201C (natat\u00ED), ne \u201Ebylo mi u\u010Din\u011Bno.\u201C Slu\u017Eebn\u00EDk je subjektem, ne pouhou ob\u011Bt\u00ED.",
      },
      {
        verse: 7,
        note: "P\u0159echod od popisu utrpen\u00ED k vyzn\u00E1n\u00ED d\u016Fv\u011Bry. \u201EZtvrdnout tv\u00E1\u0159 v k\u0159emen\u201C (challam\u00ED\u0161) je obraz odhodl\u00E1n\u00ED, ne tvrdosti srdce. Dvoj\u00ED zm\u00EDnka o nezahanben\u00ED tvo\u0159\u00ED r\u00E1mec s v.\u00A06.",
      },
      {
        verse: 8,
        note: "Pr\u00E1vn\u00ED jazyk: r\u00EDv (spor), mi\u0161p\u00E1t (soud), ba\u02BFal mi\u0161p\u00E1t (protistrana). Hospodin \u201Eje bl\u00EDzko\u201C (qar\u00F3v) \u2014 intimn\u00ED v\u00FDraz Bo\u017E\u00ED p\u0159\u00EDtomnosti. \u0158e\u010Dnick\u00E9 ot\u00E1zky vyja\u010D\u0159uj\u00ED jistotu, ne aroganci.",
      },
      {
        verse: 9,
        note: "Shrnut\u00ED cel\u00E9ho odd\u00EDlu. Opakuje se kl\u00ED\u010Dov\u00E9 tvrzen\u00ED z v.\u00A07 \u2014 Hospodin je pomoc. Ot\u00E1zka \u201Ekdo m\u011B odsoud\u00ED?\u201C z\u016Fst\u00E1v\u00E1 otev\u0159en\u00E1, ale odpov\u011B\u010F je jasn\u00E1 sv\u00FDm ml\u010Den\u00EDm: nikdo.",
      },
    ],
  },

  // Philippians 2,5-11 — Palm Sunday (Květná neděle), year A
  "50:2": {
    reference: "Fp 2,5\u201311",
    title: "Kristologick\u00FD hymnus \u2014 dobrovoln\u00E9 pon\u00ED\u017Een\u00ED a pov\u00FD\u0161en\u00ED",
    context: "Filipy byly \u0159\u00EDmskou koloni\u00ED v Makedonii. Pavel p\u00ED\u0161e z v\u011Bzen\u00ED (cca 55\u201362 po Kr.) sboru, kter\u00FD zalo\u017Eil. Hymnus ve v.\u00A06\u201311 je pova\u017Eov\u00E1n za p\u0159edpavlovsk\u00FD \u2014 Pavel cituje star\u0161\u00ED liturgickou p\u00EDse\u0148, aby uk\u00E1zal, jak m\u00E1 vypadat k\u0159es\u0165ansk\u00E9 sm\u00FD\u0161len\u00ED: ne sout\u011B\u017E o postavení, ale dobrovoln\u00E9 sestoupen\u00ED. V liturgii Kv\u011Btn\u00E9 ned\u011Ble interpretuje Kristovu cestu od sl\u00E1vy p\u0159es k\u0159\u00ED\u017E k pov\u00FD\u0161en\u00ED.",
    keyWords: [
      {
        word: "morf\u00E9 the\u00FA (\u03BC\u03BF\u03C1\u03C6\u1F74 \u03B8\u03B5\u03BF\u1FE6) \u2014 zp\u016Fsob Bo\u017E\u00ED bytnosti",
        explanation: "Ne pouh\u00FD vn\u011Bj\u0161\u00ED vzhled, ale skute\u010Dn\u00E1 podstata. Kristus sd\u00EDlel Bo\u017E\u00ED bytnost\u00ED \u2014 a p\u0159esto se j\u00ED nevzd\u00E1val, ale nevyu\u017E\u00EDval ji pro sv\u016Fj prosp\u011Bch.",
      },
      {
        word: "ken\u00F3\u014D (\u03BA\u03B5\u03BD\u03CC\u03C9) \u2014 vyprazdnit, zb\u00EDt moci",
        explanation: "V. 7: \u201Es\u00E1m sebe se zb\u00EDl.\u201C Z\u00E1kladn\u00ED pojem christologick\u00E9 ken\u00F3ze. Kristus se nevzd\u00E1v\u00E1 bo\u017Estv\u00ED, ale vzd\u00E1v\u00E1 se v\u00FDsad spojen\u00FDch s bo\u017Esk\u00FDm postaven\u00EDm. Jde o dobrovolnou volbu slu\u017Eebnosti.",
      },
      {
        word: "tapein\u00F3\u014D (\u03C4\u03B1\u03C0\u03B5\u03B9\u03BD\u03CC\u03C9) \u2014 pon\u00ED\u017Eit",
        explanation: "V. 8: \u201Epon\u00ED\u017Eil se a stal se poslu\u0161n\u00FDm a\u017E k smrti.\u201C Vrchol sestupn\u00E9 linie: od Bo\u017E\u00ED sl\u00E1vy p\u0159es lidsk\u00FD \u00FAd\u011Bl a\u017E k nejhlub\u0161\u00EDmu bodu \u2014 smrti na k\u0159\u00ED\u017Ei.",
      },
      {
        word: "hyperypso\u014D (\u1F51\u03C0\u03B5\u03C1\u03C5\u03C8\u03CC\u03C9) \u2014 nad\u010D m\u00EDru pov\u00FD\u0161it",
        explanation: "V. 9: \u201EProto ho B\u016Fh pov\u00FD\u0161il nade v\u0161echno.\u201C Hapax legomenon v NZ. Pov\u00FD\u0161en\u00ED je Bo\u017E\u00ED odpov\u011Bd\u00ED na Kristovo dobrovoln\u00E9 pon\u00ED\u017Een\u00ED \u2014 ne odm\u011Bna, ale logika Bo\u017E\u00EDho kr\u00E1lovstv\u00ED.",
      },
    ],
    structure: "Hymnus m\u00E1 dv\u011B sestupn\u011B-vzestupn\u00E9 \u010D\u00E1sti: A. Sestup (v. 6\u20138): Bo\u017E\u00ED zp\u016Fsob bytnosti \u2192 zb\u00EDl sebe sama \u2192 p\u0159ijal zp\u016Fsob slu\u017Eebn\u00EDka \u2192 stal se \u010Dlov\u011Bkem \u2192 pon\u00ED\u017Eil se \u2192 smrt na k\u0159\u00ED\u017Ei. B. V\u00FDstup (v. 9\u201311): B\u016Fh ho pov\u00FD\u0161il \u2192 dal mu jm\u00E9no nad ka\u017Ed\u00E9 jm\u00E9no \u2192 ka\u017Ed\u00E9 koleno poklek\u00E1 \u2192 ka\u017Ed\u00FD jazyk vyzn\u00E1v\u00E1 \u201EJe\u017E\u00ED\u0161 Kristus je P\u00E1n.\u201C Obrat nast\u00E1v\u00E1 slovem \u201Eproto\u201C (dio) \u2014 pov\u00FD\u0161en\u00ED je Bo\u017E\u00ED odpov\u011Bd\u00ED na dobrovolnou poslu\u0161nost.",
    theologicalThemes: [
      "Ken\u00F3ze \u2014 B\u016Fh se nevzd\u00E1v\u00E1 bo\u017Estv\u00ED, ale vzd\u00E1v\u00E1 se v\u00FDsad. Moc se projevuje slu\u017Ebnost\u00ED, ne panov\u00E1n\u00EDm.",
      "Poslu\u0161nost a\u017E k smrti \u2014 poslu\u0161nost nen\u00ED slabost, ale nejhlub\u0161\u00ED v\u00FDraz d\u016Fv\u011Bry v Otce",
      "Bo\u017E\u00ED logika: cesta dol\u016F je cestou nahoru \u2014 pov\u00FD\u0161en\u00ED p\u0159ich\u00E1z\u00ED skrze pon\u00ED\u017Een\u00ED",
      "Universaln\u00ED panstv\u00ED Krista \u2014 ka\u017Ed\u00E9 koleno poklek\u00E1, ka\u017Ed\u00FD jazyk vyzn\u00E1v\u00E1 (alze na Iz 45,23)",
    ],
    applicationHints: [
      "Kristus \u201Ese nedr\u017Eel\u201C sv\u00E9ho postaven\u00ED \u2014 \u010Deho se dr\u017E\u00EDme my? Status, role, v\u00FDsady\u2026 Co by znamenalo \u201Evyprazdnit se\u201C?",
      "Sm\u00FD\u0161len\u00ED Krista Jez\u00ED\u0161e \u2014 Pavel \u0159\u00EDk\u00E1 \u201Em\u011Bjte v sob\u011B to sm\u00FD\u0161len\u00ED.\u201C Jak vypad\u00E1 kenosis v b\u011B\u017En\u00E9m \u017Eivot\u011B sboru?",
      "Kv\u011Btn\u00E1 ned\u011Ble: J\u00E1sot a pak k\u0159\u00ED\u017E \u2014 hymnus ukazuje, \u017Ee Kristova cesta vede od sl\u00E1vy k ponížení a zp\u011Bt. Jsme ochotni j\u00EDt celou cestu?",
      "Co znamen\u00E1, \u017Ee \u201EJe\u017E\u00ED\u0161 Kristus je P\u00E1n\u201C v dob\u011B, kdy panstv\u00ED n\u00E1rokuje mno\u017Estv\u00ED jin\u00FDch sil?",
    ],
    cross_references: [
      {
        reference: "Iz 45,23",
        text: "P\u0159ede mnou poklekne ka\u017Ed\u00E9 koleno, ka\u017Ed\u00FD jazyk p\u0159is\u00E1hne.",
        translation: "CEP",
        relevance: "Fp 2,10\u201311 p\u0159\u00EDmo cituje tento text \u2014 co se v Izaj\u00E1\u0161i vztahuje k Hospodinu, Pavel vztahuje ke Kristu. Z\u00E1sadn\u00ED christologick\u00E9 tvrzen\u00ED.",
      },
      {
        reference: "Iz 53,12",
        text: "\u010Ctvrt\u00E1 p\u00EDse\u0148 o slu\u017Eebn\u00EDku \u2014 \u201Evydal sv\u016Fj \u017Eivot na smrt.\u201C",
        translation: "CEP",
        relevance: "Sestunn\u00E1 linie hymnu (sebeobetov\u00E1n\u00ED a\u017E k smrti) odpov\u00EDd\u00E1 utrpen\u00ED Hospodinova slu\u017Eebn\u00EDka.",
      },
    ],
    verseNotes: [
      {
        verse: 5,
        note: "\u201ENech\u0165 je mezi v\u00E1mi takov\u00E9 sm\u00FD\u0161len\u00ED\u201C \u2014 Pavel nevy\u017Eaduje imitaci, ale participaci na Kristov\u011B postoji. \u0158eck\u00E9 \u201Efrone\u00F3\u201C znamen\u00E1 v\u00EDce ne\u017E \u201Emyslet\u201C \u2014 zahrnuje postoj, orientaci cel\u00E9 bytosti.",
      },
      {
        verse: 6,
        note: "\u201EAkoli\u017E m\u011Bl zp\u016Fsob Bo\u017E\u00ED bytnosti\u201C (morf\u00E9 the\u00FA) \u2014 vychod\u00ED z reáln\u00E9ho bo\u017Estv\u00ED Krista. \u201ENepova\u017Eoval za lup\u201C (harpagmos) \u2014 nechytil se sv\u00E9ho postaven\u00ED jako ko\u0159isti, kterou je t\u0159eba br\u00E1nit.",
      },
      {
        verse: 7,
        note: "Centrum hymnu: \u201Es\u00E1m sebe se zb\u00EDl\u201C (eken\u014Dsen). P\u0159ijal \u201Ezp\u016Fsob slu\u017Eebn\u00EDka\u201C (morf\u00E9n d\u00FAlu) \u2014 v kontrastu k \u201Ezp\u016Fsobu Bo\u017E\u00EDmu.\u201C Paradox: ten, kdo m\u00E1 pr\u00E1vo na slu\u017Ebu, s\u00E1m slou\u017E\u00ED.",
      },
      {
        verse: 8,
        note: "\u201EPon\u00ED\u017Eil se\u201C (etapein\u014Dsen) \u2014 druh\u00FD stupe\u0148 sestupn\u00E9 linie. \u201EA\u017E k smrti \u2014 smrti na k\u0159\u00ED\u017Ei\u201C je z\u0159ejm\u011B Pavl\u016Fv vlastn\u00ED dodatek k hymnu, kter\u00FD zost\u0159uje paradox: nejpotupn\u011Bj\u0161\u00ED smrt \u0159\u00EDmsk\u00E9ho sv\u011Bta.",
      },
      {
        verse: 9,
        note: "\u201EProto ho B\u016Fh pov\u00FD\u0161il\u201C \u2014 obrat hymnu. B\u016Fh odpov\u00EDd\u00E1 na poslu\u0161nost. \u201EJm\u00E9no nad ka\u017Ed\u00E9 jm\u00E9no\u201C = JHWH, Kyrios \u2014 Kristus dost\u00E1v\u00E1 Bo\u017E\u00ED jm\u00E9no.",
      },
      {
        verse: 10,
        note: "Universální pokleknutí: na nebi, na zemi, pod zemí — tři sféry kosmu. Citace Iz 45,23 aplikovaná na Krista.",
      },
      {
        verse: 11,
        note: "\u201EJe\u017E\u00ED\u0161 Kristus je P\u00E1n\u201C (Kyrios I\u00E9s\u00FAs Christos) \u2014 nejstar\u0161\u00ED k\u0159es\u0165ansk\u00E9 vyzn\u00E1n\u00ED. \u201EKe sl\u00E1v\u011B Boha Otce\u201C \u2014 pov\u00FD\u0161en\u00ED Krista nen\u00ED soupe\u0159en\u00EDm s Otcem, ale jeho oslavou.",
      },
    ],
  },

  // Matthew 21,1-11 — Palm Sunday procession (Květná neděle), year A
  "40:21": {
    reference: "Mt 21,1\u201311",
    title: "Vjezd do Jeruzal\u00E9ma \u2014 kr\u00E1l p\u0159ich\u00E1z\u00ED na oslu",
    context: "Je\u017E\u00ED\u0161\u016Fv vjezd do Jeruzal\u00E9ma se odehr\u00E1v\u00E1 v p\u0159edve\u010Der sv\u00E1tku Pesach, kdy bylo m\u011Bsto p\u0159epln\u011Bno poutn\u00EDky. Matou\u0161 p\u00ED\u0161e pro \u017Eidok\u0159es\u0165ansk\u00E9 publikum a zd\u016Fraz\u0148uje napln\u011Bn\u00ED starozákonn\u00EDch proroctv\u00ED. Na rozd\u00EDl od Marka zm\u00ED\u0148uje dva osly (v.\u00A07) \u2014 pravd\u011Bpodobn\u011B kv\u016Fli doslovn\u00E9mu \u010Dten\u00ED Za 9,9. Text stav\u00ED do kontrastu mesi\u00E1\u0161sk\u00E9 o\u010Dek\u00E1v\u00E1n\u00ED dav\u016F a skute\u010Dnou povahu Je\u017E\u00ED\u0161ova kr\u00E1lovstv\u00ED: p\u0159ich\u00E1z\u00ED ne na v\u00E1le\u010Dn\u00E9m koni, ale na oslu.",
    keyWords: [
      {
        word: "pr\u00E1os (\u03C0\u03C1\u03B1\u1FE2\u03C2) \u2014 t\u00EDch\u00FD, pokorn\u00FD",
        explanation: "V citaci Za 9,9: \u201Etv\u016Fj kr\u00E1l p\u0159ich\u00E1z\u00ED k tob\u011B t\u00EDch\u00FD.\u201C Kl\u00ED\u010Dov\u00E9 slovo Matoušova evangelia (srov. Mt 5,5; 11,29). Definuje Je\u017E\u00ED\u0161ovo kr\u00E1lovstv\u00ED: ne moc, ale pokora.",
      },
      {
        word: "h\u00F3sanna (\u1F61\u03C3\u03B1\u03BD\u03BD\u03AC) \u2014 \u201Ezachran nyn\u00ED\u201C",
        explanation: "Z hebrejsk\u00E9ho h\u00F3\u0161\u00EDa-nn\u00E1 (\u017D 118,25). P\u016Fvodn\u011B prosba o z\u00E1chranu, v liturgii se stala oslavným zvolanvím. Ambivalence: dav vol\u00E1 po z\u00E1chran\u011B, ale p\u0159edstavuje si ji jinak ne\u017E Je\u017E\u00ED\u0161.",
      },
      {
        word: "onos (\u1F44\u03BD\u03BF\u03C2) \u2014 osel",
        explanation: "V\u00FDznamn\u00FD kontrast s \u0159\u00EDmskou triumf\u00E1ln\u00ED prax\u00ED, kde v\u00EDt\u011Bz jezdil na v\u00E1le\u010Dn\u00E9m koni. Osel je zv\u00ED\u0159e kr\u00E1le pokoje (srov. 1 Kr 1,33), nikoli dobyvatele.",
      },
      {
        word: "eproféteusen (\u1F10\u03C0\u03C1\u03BF\u03C6\u03AE\u03C4\u03B5\u03C5\u03C3\u03B5\u03BD) \u2014 prorokoval",
        explanation: "Matou\u0161ova formule napln\u011Bn\u00ED (v.\u00A04): \u201EAby se splnilo, co \u0159ekl prorok.\u201C Typick\u00FD Matou\u0161\u016Fv postup \u2014 ud\u00E1losti jsou \u010Dteny jako napln\u011Bn\u00ED P\u00EDsma.",
      },
    ],
    structure: "A. P\u0159\u00EDprava (v.\u00A01\u20137): Je\u017E\u00ED\u0161 vysl\u00E1 u\u010Dedn\u00EDky pro osla; v\u0161e se d\u011Bje podle pl\u00E1nu, napln\u011Bn\u00ED proroctv\u00ED. B. Pr\u016Fvod (v.\u00A08\u20139): Z\u00E1stupy st\u00EDl\u00ED pl\u00E1\u0161t\u011B a ratolesti, volaj\u00ED \u201EHosanna.\u201C C. Reakce m\u011Bsta (v.\u00A010\u201311): Cel\u00E9 m\u011Bsto je v pohybu (eseisth\u00E9 = \u201Eot\u0159\u00E1slo se\u201C), lid\u00E9 se ptaj\u00ED \u201EKdo to je?\u201C \u2014 ot\u00E1zka z\u016Fst\u00E1v\u00E1 otev\u0159en\u00E1.",
    theologicalThemes: [
      "Mesi\u00E1\u0161sk\u00E9 kr\u00E1lovstv\u00ED v pokornosti \u2014 Je\u017E\u00ED\u0161 napl\u0148uje mesi\u00E1\u0161sk\u00E1 o\u010Dek\u00E1v\u00E1n\u00ED, ale jinak ne\u017E dav \u010Dek\u00E1",
      "Napln\u011Bn\u00ED Písma \u2014 Matou\u0161 ukazuje kontinuitu mezi starozákonn\u00EDm zasl\u00EDben\u00EDm a Je\u017E\u00ED\u0161ov\u00FDm \u010Dinem",
      "Ambivalence z\u00E1stup\u016F \u2014 t\u00ED\u017E dav, kter\u00FD vol\u00E1 \u201EHosanna,\u201C bude brzy volat \u201EUk\u0159i\u017Euj!\u201C",
      "Ot\u00E1zka identity: \u201EKdo to je?\u201C \u2014 z\u00E1sadn\u00ED ot\u00E1zka cel\u00E9ho Matou\u0161ova evangelia",
    ],
    applicationHints: [
      "Jak\u00E9ho mesi\u00E1\u0161e \u010Dek\u00E1me? Dav cht\u011Bl politick\u00E9ho osvoboditele \u2014 co chceme od Krista my?",
      "Osel m\u00EDsto kon\u011B \u2014 kde v na\u0161em \u017Eivot\u011B v\u00EDry d\u00E1v\u00E1me p\u0159ednost s\u00EDle p\u0159ed pokorou?",
      "Od \u201EHosanna\u201C k \u201EUk\u0159i\u017Euj\u201C \u2014 jak snadn\u00E9 je p\u0159ej\u00EDt od nad\u0161en\u00ED ke zklam\u00E1n\u00ED, kdy\u017E B\u016Fh jedn\u00E1 jinak ne\u017E \u010Dek\u00E1me",
      "\u201ECel\u00E9 m\u011Bsto se ot\u0159\u00E1slo\u201C \u2014 Je\u017E\u00ED\u0161\u016Fv p\u0159\u00EDchod vyvolá pohyb. Kde vyvolává pohyb v na\u0161em sboru?",
    ],
    cross_references: [
      {
        reference: "Za 9,9",
        text: "Rozj\u00E1sej se, Si\u00F3nsk\u00E1 dcero! Tv\u016Fj kr\u00E1l p\u0159ich\u00E1z\u00ED k tob\u011B, pokorn\u00FD, jede na oslu.",
        translation: "CEP",
        relevance: "P\u0159\u00EDm\u00E1 p\u0159edloha Matou\u0161ova vypr\u00E1v\u011Bn\u00ED. Kr\u00E1l pokoje na oslu m\u00EDsto v\u00E1le\u010Dn\u00E9ho kon\u011B definuje povahu mesi\u00E1\u0161sk\u00E9ho kr\u00E1lovstv\u00ED.",
      },
      {
        reference: "\u017D 118,25\u201326",
        text: "Prosím, Hospodine, zachra\u0148! Hosanna! Po\u017Eehnan\u00FD, kdo p\u0159ich\u00E1z\u00ED v Hospodinov\u011B jm\u00E9nu.",
        translation: "CEP",
        relevance: "Liturgick\u00FD \u017Ealm sv\u00E1tku st\u00E1nk\u016F, kter\u00FD z\u00E1stupy zpívají p\u0159i vjezdu. Dávají Jez\u00ED\u0161ov\u011B vjezdu charakter mesi\u00E1\u0161sk\u00E9 slavnosti.",
      },
    ],
    verseNotes: [
      {
        verse: 1,
        note: "Betfage (\u201Ed\u016Fm nezral\u00FDch f\u00EDk\u016F\u201C) na \u00FAbod\u010D\u00ED Olivov\u00E9 hory. Je\u017E\u00ED\u0161 cel\u00FD vjezd pl\u00E1nuje \u2014 nen\u00ED to spontánní ud\u00E1lost, ale v\u011Bdom\u00E9 proroctv\u00ED \u010Dinem.",
      },
      {
        verse: 4,
        note: "Matou\u0161ova typick\u00E1 formule napln\u011Bn\u00ED: \u201EAby se splnilo slovo proroka.\u201C Odkazuje na Za 9,9 a snad Iz 62,11.",
      },
      {
        verse: 7,
        note: "Dva osly \u2014 Matoušova zvl\u00E1\u0161tnost (Mk a Lk maj\u00ED jednoho). Pravd\u011Bpodobn\u011B doslovn\u00E9 \u010Dten\u00ED parallelismu v Za 9,9. Pl\u00E1\u0161t\u011B na osl\u00EDch = improvizovan\u00E1 korunova\u010Dn\u00ED v\u00FDzdoba.",
      },
      {
        verse: 8,
        note: "Stl\u00E1n\u00ED pl\u00E1\u0161\u0165\u016F = kr\u00E1lovsk\u00FD gest (srov. 2 Kr 9,13 p\u0159i korunova\u010Dní J\u00E9h\u00FA). Ratolesti \u2014 palmov\u00E9 v\u011Btve p\u0159ipom\u00EDnaj\u00ED sv\u00E1tek st\u00E1nk\u016F a makabejsk\u00FD triumfalismus.",
      },
      {
        verse: 9,
        note: "\u201EHosanna Synu Davidovu\u201C \u2014 mesi\u00E1\u0161sk\u00FD titul. Z\u00E1stupy identifikuj\u00ED Je\u017E\u00ED\u0161e jako Davidova potomka. \u201EPo\u017Eehnan\u00FD, kdo p\u0159ich\u00E1z\u00ED\u201C je citace \u017D 118,26.",
      },
      {
        verse: 10,
        note: "Eseisth\u00E9 (\u201Eot\u0159\u00E1slo se\u201C) \u2014 stejn\u00E9 sloveso jako p\u0159i zem\u011Bt\u0159esen\u00ED (Mt 27,51; 28,2). Matou\u0161 tím signalizuje eschatologick\u00FD v\u00FDznam ud\u00E1losti.",
      },
      {
        verse: 11,
        note: "\u201ETo je ten prorok Je\u017E\u00ED\u0161 z Nazaretu.\u201C Z\u00E1stupy ho identifikuj\u00ED jako proroka, ne p\u0159\u00EDmo jako Mesi\u00E1\u0161e. Nap\u011Bt\u00ED mezi o\u010Dek\u00E1v\u00E1n\u00EDm a skute\u010Dnost\u00ED z\u016Fst\u00E1v\u00E1.",
      },
    ],
  },

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



  // ==================== EASTER SEASON — Year A ====================

  // Lk 24,13–35 — 2. neděle po Velikonocích (Misericordias Domini)
  "42:24": {
    reference: `Lk 24,13–35`,
    title: `Emauzští učedníci`,
    context: `Vyprávění o cestě do Emauz je unikátní pro Lukáše a tvoří klimax jeho velikonočního narativu. Dva učedníci (Kleofáš a nejmenovaný společník) odcházejí z Jeruzaléma, tedy opačným směrem. Emauzy (asi 11 km) jsou symbolem odchodu od víry. Ježíš se k nim připojí, ale oni ho nepoznávají — Lukáš zdůrazňuje, že poznání Vzklíšeného nepřichází automaticky, ale skrze Slovo a lámání chleba. Text má liturgickou strukturu: bohoslužba slova (výklad Písem) → bohoslužba stolu (lámání chleba) → vyslání (návrat do Jeruzaléma).`,
    keyWords: [
      { word: `hoi ophthalmoi ekratounto — oči byly drženy`, explanation: `Pasivum divinum — Bůh je tím, kdo „drží“ jejich oči. Poznání přijde ve správný okamžik, skrze svátost.` },
      { word: `diēnoixen — otevřel`, explanation: `Stejné sloveso pro „otevření“ Písem (v. 32) i „otevření“ očí (v. 31). Ježíš otevírá jak rozum, tak oči.` },
      { word: `klasei tou artou — lámání chleba`, explanation: `Technický termín raně-křesťanské eucharistie (srov. Sk 2,42). Lukáš spojuje poznání Vzklíšeného s eucharistickým shromážděním.` },
      { word: `kaiomenē — hořící`, explanation: `„Což nám srdce nehořelo?“ — retroaktivní poznání. Učedníci si uvědomují, že Ježíšova přítomnost v nich působila dřív, než ho poznali.` },
    ],
    structure: `A. Cesta pryč z Jeruzaléma (v. 13–16): dva učedníci odcházejí, Ježíš se připojí, nepoznán. B. Dialog (v. 17–27): učedníci vyprávějí, Ježíš vykládá Písma. C. Lámání chleba a poznání (v. 28–32): v gestu lámání chleba se otevřou oči. D. Návrat do Jeruzaléma (v. 33–35): okamžitý obrat, svědectví.`,
    theologicalThemes: [
      `Přítomnost Vzklíšeného v Písmu a svátosti — dva pilíře bohoslužby`,
      `Cesta jako metafora víry: odchod → setkání → návrat proměněný`,
      `Poznání Krista není intelektuální, ale vztahové a svátostné`,
      `Zklamání a krize víry jako prostor pro nové setkání s Bohem`,
    ],
    applicationHints: [
      `Mnozí lidé dnes „odcházejí z Jeruzaléma“ — opouštějí víru po zklamání. Text říká, že Ježíš se k nim připojí na cestě`,
      `Struktura textu zrcadlí liturgii: bohoslužba slova → eucharistie → vyslání`,
      `Motiv „hořícího srdce“ — víra není jen rozumový souhlas, ale vnitřní zkušenost`,
      `Vhodný pro lidi v pochybnostech nebo odcházející od víry`,
    ],
    verseNotes: [
      { verse: 13, note: `Emauzy — přesná lokalizace sporná. „60 stadií“ = asi 11 km. Kleofáš (v. 18) a druhý nejmenovaný.` },
      { verse: 16, note: `„Oči jim byly zadrženy“ — božské pasivum. Fyzický zrak nestačí k poznání Vzklíšeného.` },
      { verse: 21, note: `„My jsme doufali“ — imperfektum vyjaďřuje přerušenou naději. Kříž pro ně znamenal konec.` },
      { verse: 27, note: `„Počav od Mojžíše a všech proroků“ — programatická výpověď o christologickém čtení SZ.` },
      { verse: 30, note: `„Vzal chléb, vzdal díky, lámal a rozdával“ — čtyři eucharistická slovesa, totožná s Lk 22,19.` },
      { verse: 31, note: `„Otevřely se jim oči“ — aluze na Gn 3,7. „A on jim zmizel“ — Vzklíšený je přítomen jinak.` },
      { verse: 32, note: `„Což nám srdce nehořelo?“ — klíčový verš pro kázání. Boží působení často rozpoznáváme až zpětně.` },
      { verse: 35, note: `„Poznali ho při lámání chleba“ — Vzklíšeného potkáváte v eucharistii.` },
    ],
  },

  // J 10,1–10 — 3. neděle po Velikonocích (Jubilate)
  "43:10": {
    reference: `J 10,1–10`,
    title: `Dobrý pastýř — dveře k ovcím`,
    context: `Řeč o pastýři navazuje na uzdravení slepého (J 9) a spor s farizeji. Obraz pastýře má hluboké kořeny ve SZ: Bůh je pastýř Izraele (Ž 23; Ez 34). V Ez 34 Bůh kritizuje špatné pastýře a slibuje, že se ujme stáda sám. Ježíš se představuje jako naplnění tohoto proroctví.`,
    keyWords: [
      { word: `thyra — dveře`, explanation: `Ježíš je pastýř i dveře. Na Blízkém východě pastýř sám ležel ve dveřích — byl dveřmi.` },
      { word: `kleptēs — zloděj`, explanation: `Přichází oknem/zdí, ne dveřmi. V kontextu J 9–10 míří na náboženské autority.` },
      { word: `phōnē — hlas`, explanation: `Ovce znají hlas pastýře. Poznání je sluchové — slyšení Slova je primární cesta k víře.` },
      { word: `perisson — v hojnosti`, explanation: `„Přišel jsem, aby měly život v hojnosti“ (v. 10). Eschatologická kvalita života začínající už teď.` },
    ],
    structure: `A. Podobenství o ovčíně (v. 1–6): kontrast pastýř/zloděj. B. „Já jsem dveře“ (v. 7–10): legitimní přístup k Bohu. Kdo vejde, bude zachráněn.`,
    theologicalThemes: [
      `Christologický nárok: Ježíš jako jediné dveře k životu`,
      `Hlasové poznání — víra přichází ze slyšení`,
      `Pastýřský úřad — kritika špatných vůdců (Ez 34)`,
      `Život v hojnosti jako dar, ne výkon`,
    ],
    applicationHints: [
      `Obraz dveří: chrání i otevírají. Ježíš není zamčená brána, ale otevřený vstup`,
      `Pastýřský úřad farářů v CČSH — slouží ve jménu Dobrého pastýře`,
      `Motiv hlasu — jak rozlišit Kristův hlas v době informačního zahlcení?`,
      `„Život v hojnosti“ pro lidi prožívající prázdnotu`,
    ],
    verseNotes: [
      { verse: 1, note: `„Amen, amen“ — slavnostní formule. Navazuje na konflikt z J 9.` },
      { verse: 3, note: `„Volá své ovce jménem“ — osobní vztah pastýře ke každé ovci.` },
      { verse: 7, note: `„Já jsem dveře“ — egō eimi formulace s predikátem.` },
      { verse: 9, note: `Trojí zaslíbení: spása, svoboda pohybu, nasycení.` },
      { verse: 10, note: `Klimaktický verš: „Život v hojnosti“ (perisson). Zloděj = smrt, Ježíš = život.` },
    ],
  },

  // J 14,1–21 — 4. a 5. neděle po Velikonocích (Cantate, Rogate)
  "43:14": {
    reference: `J 14,1–21`,
    title: `Řeč na rozloučenou — Cesta, pravda a život`,
    context: `Janovy řeči na rozloučenou (J 13–17) jsou Ježíšovým testamentem. Kap. 14 začíná útěchou — „Ať se vaše srdce nechvěje“ — po předpovědi Petrova zapření. Učedníci čelí ztrátě fyzické přítomnosti. Ježíš nabízí: příbytek u Otce (v. 1–4), sebe jako cestu (v. 5–7), jednotu s Otcem (v. 8–14), zaslíbení Ducha (v. 15–21).`,
    keyWords: [
      { word: `monai — příbytky`, explanation: `Kořen menō (zůstávat). Nejde o nebeské pokoje, ale o trvalé přebývání v Otcově přítomnosti.` },
      { word: `hodos — cesta`, explanation: `„Já jsem ta cesta, pravda i život“ (v. 6). Cesta není směr, ale Ježíšova osoba sama.` },
      { word: `Paraklētos — Přímluvce`, explanation: `Duch pravdy (v. 17). Pokračuje v Ježíšově díle — učí, připomíná, uvádí do pravdy.` },
    ],
    structure: `A. Útěcha a příbytky (v. 1–4). B. Cesta k Otci (v. 5–7): Ježíš = cesta, pravda, život. C. Jednota Otce a Syna (v. 8–14). D. Zaslíbení Ducha (v. 15–21): Paraklét jako pokračování Ježíšovy přítomnosti.`,
    theologicalThemes: [
      `Kristus jako cesta k Otci — ztělesnění Boží lásky`,
      `Přebývání (menein) — víra je trvalý vztah, ne jednorázový akt`,
      `Duch svatý jako pokračovatel Kristova díla`,
      `Víra jako důvěra uprostřed nejistoty`,
    ],
    applicationHints: [
      `Klasický text pro pohřby, ale v kontextu Velikonoc mluví o živém vztahu`,
      `Tomášova otázka „nevíme, kam jdeš“ je otázka mnoha současných lidí`,
      `„Ať se vaše srdce nechvěje“ — víra existuje uprostřed nejistoty`,
      `Zaslíbení Ducha — jak Duch působí dnes v obci`,
    ],
    verseNotes: [
      { verse: 1, note: `„Věříte v Boha, věřte i ve mne“ — imperativ i indikativ. Christologický nárok.` },
      { verse: 2, note: `„Příbytky“ (monai) — hapax legomenon v NZ. Trvalé přebývání s Bohem.` },
      { verse: 6, note: `„Já jsem ta cesta, pravda i život“ — christologické vyznání, ne exkluzivistický verdikt.` },
      { verse: 9, note: `„Kdo vidí mne, vidí Otce“ — jádro janovské christologie.` },
      { verse: 16, note: `„Jiného Přímluvce“ (allon paraklēton) — „jiný“ stejného druhu. Duch je jako Ježíš.` },
      { verse: 18, note: `„Nezanechám vás jako sirotky“ — Ježíš se vrací v Duchu.` },
    ],
  },

  // J 17,1–11 — 6. neděle po Velikonocích (Exaudi)
  "43:17": {
    reference: `J 17,1–11`,
    title: `Velekněžská modlitba`,
    context: `Jan 17 je vrcholem řečí na rozloučenou. Ježíš se obrací k Otci — nejdelší modlitba v evangeliích. Modlitba za sebe (v. 1–5), za učedníky (v. 6–19), za budoucí věřící (v. 20–26). Text stojí na prahu kříže.`,
    keyWords: [
      { word: `doxason — oslav`, explanation: `Sláva (doxa) přichází skrze kříž. V Janově teologii je ukřižování povýšením.` },
      { word: `zōē aiōnios — věčný život`, explanation: `„Život věčný je v tom, když poznají tebe“ (v. 3) — vztahové poznání, ne nekonečné trvání.` },
      { word: `etērēsa — ochránil jsem`, explanation: `Ježíš byl pastýřem stáda, teď ho předává Otci. Souvislost s J 10.` },
    ],
    structure: `A. Modlitba za oslavení (v. 1–5). B. Svěření učedníků Otci (v. 6–11a). C. Jednota jako cíl (v. 11b): „aby byli jedno jako my“.`,
    theologicalThemes: [
      `Kříž jako oslavení — Janova teologie kříže`,
      `Věčný život jako poznání Boha teď a tady`,
      `Učedníci jako dar Otce Synovi`,
      `Jednota církve — ekumenická relevance`,
    ],
    applicationHints: [
      `Neděle před Letnicemi — Ježíš se modlí za ty, kdo zůstanou „ve světě“`,
      `Co znamená být ve světě jako křesťan bez stáhnutí do ghetta`,
      `Jednota jako Boží vůle — aktuální téma pro CČSH`,
      `Věčný život (v. 3) = poznání Boha, ne „nebe po smrti“`,
    ],
    verseNotes: [
      { verse: 1, note: `„Přišla ta hodina“ — hōra je janovsky klíčový pojem. Hodina = kříž a oslavení jako jeden akt.` },
      { verse: 3, note: `Programatická definice věčného života: vztahové poznání Boha.` },
      { verse: 4, note: `„Dokonal jsem dílo“ — perspektiva dokončeného díla, i když kříž je ještě před ním.` },
      { verse: 11, note: `„Aby byli jedno jako my“ — trinitární model jednoty. Církevní jednota je bytostná, ne organizační.` },
    ],
  },

  // J 20,19–23 — Hod Boží svatodušní (Letnice)
  "43:20": {
    reference: `J 20,19–23`,
    title: `Dar Ducha svatého — Janovské Letnice`,
    context: `Jan nemá oddělený příběh Letnic jako Lukáš (Sk 2). Ježíš dává Ducha večer o velikonoční neděli — vzkříšení, dar Ducha a pověření k odpouštění jsou jedním aktem. Učedníci jsou za zavřenými dveřmi ze strachu. Strach se proměňuje v radost a poslání.`,
    keyWords: [
      { word: `enephysēsen — dechl`, explanation: `Hapax legomenon v NZ. Odkazuje na Gn 2,7 — Bůh vdechl do Adama dech života. Nové stvoření.` },
      { word: `eirēnē hymin — pokoj vám`, explanation: `Opakuje se třikrát. Šalom — plnost Božího požehnání, ne jen absence konfliktu.` },
      { word: `aphiēmi — odpouštět`, explanation: `Pověření obce k odpouštění. Ne moc nad lidmi, ale služba zvěstování evangelia.` },
    ],
    structure: `A. Strach a zavřené dveře (v. 19a). B. Ježíšův příchod a pokoj (v. 19b–20): rány jako identifikace. C. Poslání a dar Ducha (v. 21–23): dechnutí + pověření.`,
    theologicalThemes: [
      `Janovské Letnice — Duch jako dar Vzklíšeného, ne oddělená událost`,
      `Nové stvoření — dechnutí evokuje Gn 2,7`,
      `Pokoj jako eschatologický dar`,
      `Poslání k odpouštění — církev osvobozuje, ne soudí`,
    ],
    applicationHints: [
      `Srovnání tichých janovských Letnic s dramatickými lukovskými — Duch působí oběma způsoby`,
      `Zavřené dveře strachu → otevřené dveře poslání`,
      `Rány Vzklíšeného — vzkříšení nevymazavá utrpení, ale proměňuje ho`,
      `Odpouštění jako poslání celé obce, ne moc kněze`,
    ],
    verseNotes: [
      { verse: 19, note: `Zavřené dveře — symbolika strachu. „Pokoj vám“ — první slovo Vzklíšeného.` },
      { verse: 20, note: `Ukázal ruce a bok — identita s Ukřižovaným. „Zaradovali se“ = naplnění J 16,22.` },
      { verse: 21, note: `„Jako mne poslal Otec“ — řetězec poslání: Otec → Syn → učedníci.` },
      { verse: 22, note: `„Dechl na ně“ — evokuje Gn 2,7. Duch svatý jako dech Vzklíšeného.` },
      { verse: 23, note: `Perfektní pasivum — církev vykonává Boží odpuštění, není jeho zdrojem.` },
    ],
  },


  // ==================== ADVENT — Year A ====================

  // Mt 24,36–44 — 1. neděle adventní
  "40:24": {
    reference: `Mt 24,36–44`,
    title: `Bdělost — o dni a hodině`,
    context: `Text z Ježíšovy eschatologické řeči (Mt 24–25). Adventní perspektiva: nejde o kalkulaci času, ale o bdělost jako způsob života. Výroky o dnech Noé (vs Noého) evokují obydečnost života, v němž přišla krize. „Dva na poli“ a „dvě u mlýna“ — kontrasty, které říkají: príchod vytvoří dělicí čáru.`,
    keyWords: [
      { word: `grēgoreó (γρηγορέω) — bdít`, explanation: `Nejde o fyzické nespaní, ale o duchovní pozornost. V adventu: bdělý život = život vědomý, připravený na setkání.` },
      { word: `parousia (παρουσία) — příchod`, explanation: `V řeckém světě: příjezd krále do města. Evangelium používá termín pro Kristovu slavnou přítomnost.` },
      { word: `hēmera (ἡμέρα) — den`, explanation: `„Ten den“ — den Páně ze SZ (Am 5,18; Jl 2,1). Advent čeká na plné zjevení Boží spravedlnosti.` },
    ],
    structure: `A. Neznalost hodiny (v. 36): ani Syn ani andělé nevědí. B. Analogie s dny Noé (v. 37–39): během normálního života přijde konec. C. Dělicí čára (v. 40–41): dva lidé ve stejné situaci, různý osud. D. Výzva k bdělosti (v. 42–44): podobenství o zloději v noci.`,
    theologicalThemes: [
      `Eschatologie ne jako kalkulace, ale jako forma života`,
      `Skrytá Boží suverenita — ani Syn nezná hodinu (Mk 13,32)`,
      `Rozdělení ve stejné situaci — ne vše viditelné je kritičné`,
      `Advent = postoj, ne jen období`,
    ],
    applicationHints: [
      `Bdělost dnes: pozornost k lidem, k situacím, k tomu, kde se Kristus již proměňuje svět`,
      `Kritika apokalyptických kalkulací — Ježíš je výslovně odmítá`,
      `Normální život není překážkou víře — v něm jsme volani k bdělosti`,
      `Advent jako duchovní forma: jdeme vstříc přicházejícímu`,
    ],
    verseNotes: [
      { verse: 36, note: `„O tom dni a hodině neví nikdo“ — Ježíš výslovně vylučuje kalkulace. I Syn (v paralelním Mk) se podřizuje Otcově skrytosti.` },
      { verse: 37, note: `Dny Noé — ne diváctví, ale nečekanost. Lidé jedli, pili, ženili se, vdávali — normální život.` },
      { verse: 40, note: `„Jeden bude vzat, druhý zanechán“ — ne o vytržení v dispenzacionalistickém smyslu, ale o soudu, který rozdělí.` },
      { verse: 42, note: `„Bděte“ — hlavní imperativ. Výzva zmapovat život jako aktivní očekávání.` },
      { verse: 44, note: `„I vy buďte připraveni“ — obraz zloděje není o hrozbě, ale o nečekaném příchodu.` },
    ],
  },

  // Mt 3,1–12 — 2. neděle adventní
  "40:3": {
    reference: `Mt 3,1–12`,
    title: `Jan Křtitel — volající na poušti`,
    context: `Jan Křtitel se objevuje na počátku evangelia jako poslední SZ prorok a první hlasatel nového věku. Poušť — místo zjevení, exodu, Boží blízkosti. Jeho udějí, strava (kočovník, nikoli měšťan) a zvěst (pokání) nám vyjeví postoj — odstup od současného řádu, příprava na to, co přichází.`,
    keyWords: [
      { word: `metanoia (μετάνοια) — změna smýšlení`, explanation: `Ne jen lítost nad hříchy, ale obrat celé orientace života. Změna nous — hlubokého porozumění svému místu před Bohem.` },
      { word: `basileia (βασιλεία) — království`, explanation: `„Priblížilo se nebeské království“ — u Matouše častá formule. Ne místo, ale Boží vláda ve světě.` },
      { word: `karpos (καρπός) — ovoce`, explanation: `„Neste ovoce, které odpovídá pokání“ (v. 8). Pokání se pozná podle činů, ne slov.` },
    ],
    structure: `A. Janovo vystoupení (v. 1–6): na poušti, oblečení, strava, křest. B. Kázání farizeům a saduceuům (v. 7–10): varování, původ z Abrahama nezachrání. C. Očekávání Silnějšího (v. 11–12): křest vodou vs. Duchem a ohněm.`,
    theologicalThemes: [
      `Pokání jako vstup do Božího království`,
      `Prorocká kritika náboženských jímen`,
      `Ovoce pokaani — víra a čin jdou spolu`,
      `Přichazející mocnější — christologický kíč`,
    ],
    applicationHints: [
      `Advent = čas, kdy nám Jan připomíná: netvoříme Krista podle sebe`,
      `Kritika „křesťanské dynačnosti“ — dedictví negarantuje vztah s Bohem`,
      `Pokání jako radostná zpráva, ne morové zatížení`,
      `Co je „ovoce pokání“ v našem kontextu?`,
    ],
    verseNotes: [
      { verse: 1, note: `„Na poušti“ — ne náhoda. Poušť je místo nového začátku (Ex, Oz 2,16).` },
      { verse: 3, note: `Citace Iz 40,3 — „připravte cestu Pánu“. Jan se identifikuje s hlasem volajícího.` },
      { verse: 7, note: `„Plemeno zmijí“ — ostré slovo pro náboženské autority. Jan nerozčluje, oslovuje srdce.` },
      { verse: 9, note: `„Z těchto kamenů může Bůh vzbudit syny Abrahamovi“ — puntikská kritika etnického nebo náboženského spočinutí.` },
      { verse: 11, note: `„Křest Duchem svatým a ohněm“ — předzvěst Letnic (Sk 2). Oheň = očištění i soud.` },
    ],
  },

  // Mt 11,2–11 — 3. neděle adventní
  "40:11": {
    reference: `Mt 11,2–11`,
    title: `Jan Křtitel v žaláři — tý, který má přijít?`,
    context: `Jan, který ohlašoval příchod Mesiáše, se nyní ptá ze žaláře: Je to skutečně on? Je to klíčový text pro pochopení toho, že očekávání může být jiné než uskutečnění. Jan očekával soudce s ohněm, přichází lékar uzdravující. Ježíš neopravuje Jana, ale odkazuje na proroka Izajáše — znamení Mesiáše je uzdravování a evangelium chudým.`,
    keyWords: [
      { word: `ho erchomenos (ὁ ἐρχόμενος) — ten, který přichází`, explanation: `Mesiášský titul (srov. Ž 118,26). Jan se ptá, zda Ježíš je opravdu „Pricházející“.` },
      { word: `skandalizō (σκανδαλίζω) — pohíšet se`, explanation: `„Blahý, kdo se nade mnou nepohíří“. Ježíš připoušští, že jeho forma služby může být urážká těm, kteří očekávali triumfy.` },
    ],
    structure: `A. Janův dotaz (v. 2–3): z vězení posílá učedníky. B. Ježíšova odpověď (v. 4–6): odkaz na Izajášovská znamení. C. Ježíšův výrok o Janovi (v. 7–11): větší mezi lidmi, ale nejmenší v Království je větší než on.`,
    theologicalThemes: [
      `Rozdíl mezi očekávaným a skutečným Mesiášem`,
      `Krize víry i u svědků — Jan jako příklad autentického tázání`,
      `Uzdravování + evangelium chudým = mesiášské znamení`,
      `Paradox Království: nejmenší je větší než největší z minulého věku`,
    ],
    applicationHints: [
      `Jan věří a pochybuje — víra unese otázky`,
      `Naše očekávání Boha může být již jiné než to, jak přichází`,
      `„Chudým se zvěstuje evangelium“ — je to častí Kristova jádra, nebo okraj?`,
      `Advent jako čas poctivých otázek, ne jen tradičního čekání`,
    ],
    verseNotes: [
      { verse: 2, note: `Jan „v žaláři“ — u Heroda Antipy. Prostor, kde se víra zkouší na prahu smrti.` },
      { verse: 3, note: `„Ty jsi ten, kdo má přijít?“ — nejednoznačná formulace. Jan momentálně neví, co si má o Ježíšovi myslet.` },
      { verse: 5, note: `Aluze na Iz 29,18; 35,5–6; 61,1. Ježíš neodpovídá „ano“, ale dává Janovi znamení, aby rozsoudil.` },
      { verse: 6, note: `„Blahý, kdo se nade mnou nepohíří“ — Ježíš připoušští, že jeho služba může být urážká.` },
      { verse: 11, note: `„Nejmenší v Království je větší než Jan“ — nová era není kvantitativně, ale kvalitativně větší.` },
    ],
  },

  // Mt 1,18–25 — 4. neděle adventní
  "40:1": {
    reference: `Mt 1,18–25`,
    title: `Zvěstování Josefovi — Immánuel`,
    context: `Matouš záměrně staví příběh narození okolo Josefa, ne Marie (jako u Lukáše). Josef — „spravedlivý“ muž — stojí před dilematem mezi zákonem a milosrdenstvím. Rozhodne se tichu propustit Marii, ale Bůh do toho vstupuje skrze sen. Matouš zdůrazňuje naplnění SZ zaslíbení (Iz 7,14) a dává Ježíšovi titul Immánuel — „Bůh s námi“.`,
    keyWords: [
      { word: `dikaios (δίκαιος) — spravedlivý`, explanation: `Josef „spravedlivý“ není legalista. Jeho spravedlnost zahrnuje milosrdenství — nechce Marii zneuchtít.` },
      { word: `Immánuel (עִמָּנוּ אֵל) — Bůh s námi`, explanation: `Z Iz 7,14. Jédro vánoční zvěsti. Ne jen pro Izrael, ale pro všechny.` },
      { word: `sōzo (σῴζω) — zachránit`, explanation: `Jméno Ježíš (Jehoshuʿa) = „Hospodin zachraňuje“. Výklad jména přímo v textu (v. 21).` },
    ],
    structure: `A. Situace (v. 18–19): Maria těhotná, Josef před rozhodnutím. B. Andlové zjevení (v. 20–21): Josef nemá se bát přijmout Marii, syn je od Ducha svatého. C. Naplnění Písma (v. 22–23): citace Iz 7,14. D. Josefova poslušnost (v. 24–25): vezme Marii, dává dítěti jméno.`,
    theologicalThemes: [
      `Vtělení — Bůh vstupuje do konkrétního příběhu, s rizikem nečistoty`,
      `Josefova spravedlnost = zákon + milosrdenství`,
      `Naplnění Písma — u Matouše klíčový motiv (10× v evangeliu)`,
      `Immánuel — Bůh s námi, ne nad námi`,
    ],
    applicationHints: [
      `Přijetí nezamysleneho — Josef přijímá ne-své dítě jako své. Obraz adopce, lasky přes biologické hranice`,
      `Rozhodování mezi zákonem a láskou — Josef jako model`,
      `Sen jako kanál Božího oslovenní — ne jen logika, ale i nevědomí`,
      `Advent končí — Bůh je s námi. Ne daleko, ne poté, ale teď a při nas.`,
    ],
    verseNotes: [
      { verse: 19, note: `„Spravedlivý“ muž — ne rigidista, ale člověk s citem. Chtěl Marii tichu propustit.` },
      { verse: 20, note: `„Ve snu“ — typicky Matoušův kanál Božího sdělení (srov. mudrci 2,12; útek do Egypta 2,13).` },
      { verse: 21, note: `„Nazveš ho Ježíš“ — aktivní Josefova role. On dává jméno, včlenuje dítě do rodové linie.` },
      { verse: 23, note: `Iz 7,14 — LXX verze používá „parthenos“ (panna), hebrejský originál má „ʿalmah“ (mladá žena). Matouš čte christologicky.` },
      { verse: 25, note: `„Prvorozeného syna“ — neznamená, že byli další; označuje prvorozenství jako právní titul.` },
    ],
  },

  // ==================== CHRISTMAS / EPIPHANY — Year A ====================

  // J 1,1–14 — Hod Boží vánoční
  "43:1": {
    reference: `J 1,1–14`,
    title: `Prólogus — Slovo se stalo tělem`,
    context: `Janovský prólogus je jedním z nejhloubších textů NZ. Otevírá evangelium kosmickým výrokem — „Na počátku byl Logos“. Janova teologie spojuje židovskou moudrost (chokmá, mémřá) s řeckým logem. Kulminace: Logos se stal tělem (sarx) — nejkonkrétnější stvorení. Toto je jádro vtěleni.`,
    keyWords: [
      { word: `logos (λόγος) — slovo`, explanation: `Vícevrstvy: slovo, rozum, řád. Filon z Alexandrie: Logos jako posluchatel Boha. U Jana je Logos osoba — sta Kristus.` },
      { word: `sarx (σάρξ) — tělo`, explanation: `Ne „lidská forma“, ale plnost lidského bytu s jeho křehkostí. Logos se nestydí za tělo.` },
      { word: `eskēnōsen (ἐσκήνωσεν) — postavil stan`, explanation: `Sloveso příbuzné s „šekhínช“ (Boží přítomnost v měsť). Bůh si rozbil stan mezi lidmi.` },
      { word: `monogenēs (μονογενής) — jednorozený`, explanation: `Jedinečný Syn. Ne biologicky, ale ontologicky — jedinený ve vztahu k Otci.` },
    ],
    structure: `A. Pre-existence Loga (v. 1–3): u Boha, Bůh, skrze něj vše. B. Světlo ve tmě (v. 4–5): život a světlo, které tma nepohltila. C. Svědectví Jana Křtitele (v. 6–8). D. Krize přijetí (v. 9–13): do svého přišel, ne všichni přijali. E. Vtělení (v. 14): Logos se stal tělem a přebýval mezi námi.`,
    theologicalThemes: [
      `Pre-existence Krista — byl před vším`,
      `Vtělení — hmota a tělo jsou dobré`,
      `Svet lo a tma — dualistický jazyk, ale ne dualistická ontologie`,
      `Přijetí a odmítnutní — člověk má svobodu`,
    ],
    applicationHints: [
      `Vánoce není primarně o dítěti, ale o Bohu, který se dává`,
      `Světlo ve tmě — advent končí, ale tma ve světě zůstává. Světlo svítí dále`,
      `„Postavil stan“ — Bůh nám dělá společnost, netlaká`,
      `Málo který text je tak vhodný pro objasnení křest¡anské teologie vtěleni v 10 minutách kázání`,
    ],
    verseNotes: [
      { verse: 1, note: `„Na počátku“ — aluze na Gn 1,1. Jan piše novou Genesis. Logos byl „u Boha“ (pros ton theon) — vztah blízkosti.` },
      { verse: 3, note: `„Všechno povstalo skrze něj“ — Logos jako prostřednik stvoření. Anti-gnostické: svět není zlý.` },
      { verse: 5, note: `„Tma jej nepohltila“ (katelaben) — dvojsmysl: nezmohla na něj ani nepochopila.` },
      { verse: 11, note: `„Přišel do svého“ — svět jako Boží mě, Izrael jako Boží lid. Ale „svoji ho neprijali“.` },
      { verse: 12, note: `„Ti, kteří ho přijali“ — moc stát se Božími dětmi. Nové narození z víry.` },
      { verse: 14, note: `„A Slovo se stalo tělem“ — kardinální věta křesť¡anské teologie. Sarx = plnost lidského bytu. „Viděli jsme jeho slávu“ — očité svedectví.` },
    ],
  },

  // Mt 2,1–12 — Zjevení Páně (Epifanie)
  "40:2": {
    reference: `Mt 2,1–12`,
    title: `Mudrci od východu`,
    context: `Příběh mudrců (magoi) je jenom u Matouše. Záměrny kontrast: pohanští astrologové naleznou Krále, zatímco Jeruzalém (Herodes + zakoníci) se poleká. Mesiáš není jen pro Izrael, ale i pro pohany. Dary (zlato, kadidlo, myrha) mají christologický význam: král, Boží, umírající.`,
    keyWords: [
      { word: `magoi (μάγοι) — mudrci`, explanation: `Perskí kněží-astrologové. Ne nutně králové (tradice později), ne nutně tři (tradice z tří darů).` },
      { word: `aster (ἀστήρ) — hvězda`, explanation: `Bůh oslovuje mudrce jejich vlastním jazykem — hvězdopisem. Obraz, jak Bůh mluví k lidem tam, kde jsou.` },
      { word: `proskyneo (προσκυνέω) — klanet se`, explanation: `Není jen zdravice, ale uznání vlady. Mudrci se klanají dítěti — akt vyšší věrnosti než Herodovi.` },
    ],
    structure: `A. Mudrci přicházejí do Jeruzaléma (v. 1–2): kde je narozený král? B. Herodes a jeho polek (v. 3–8): konzultuje zakonníky, posílá mudrce do Betléma. C. Mudrci v Betlémě (v. 9–12): hvězda je vede, klanají se, dává dary, ve snu se vrací jinak.`,
    theologicalThemes: [
      `Univerzální poslaní Mesiáše — Král i pro pohany`,
      `Kontrast: vnější hledá a nachází, vnítřní (Jeruzalém) ví a neudělá nic`,
      `Hvězda a sen — Bůh mluví různými kanály`,
      `Dary: král, Bůh, oběť (myrha — pohřeb)`,
    ],
    applicationHints: [
      `Jak Bůh oslovuje lidi mimo církev? Mámė odvahu přijmout, že i hvězdopis nebo kultura může by kanálem?`,
      `Jeruzalém vs. mudrci — bližší neznamená ochotnější`,
      `Dary se dávají ne z povinnosti, ale z radosti setkánní`,
      `Epíphani — zjevení Krista světu. Co to znamena pro mé misijní myšlení?`,
    ],
    verseNotes: [
      { verse: 1, note: `Herodes Veliký (37–4 př. Kr.). Betlém — 5 km jižně od Jeruzaléma, rodiště Davida.` },
      { verse: 2, note: `„Narozený král Židů“ — výrok politicky nebezpečný. Herodes je uzurpatator, ne davidic.` },
      { verse: 6, note: `Citace Mi 5,1 — Betlém jako rodiště Mesiáše. Matouš zdůrazňuje naplnění Písma.` },
      { verse: 9, note: `„Hvězda je vedla“ — astronomické debaty (kometa? supernova? konjunkce?) nejsou podstatné. Teologická symbolika: Bůh vede.` },
      { verse: 11, note: `„Do domu“ — ne jesle (to je Lukáš). U Matouše rodina již bydlí v domě. Jeho evangelium narazení je odlišné.` },
      { verse: 12, note: `„Vrátili se jinou cestou“ — symbolicky: setkání s Kristem mění trasu.` },
    ],
  },


  // ==================== LENT — Year A ====================

  // Mt 4,1–11 — Pokušení na poušti
  "40:4": {
    reference: `Mt 4,1–11`,
    title: `Pokušení na poušti`,
    context: `Ihned po křtu (3,13–17) vede Duch Ježíše na poušť. Paralela se Starým zákonem: 40 dnů (Mojžíš na Sinaji, Izrael na poušti 40 let). Ježíš jako nový Izrael, ale obstojí tam, kde Izrael padl. Všechny tři odpovědi jsou citáty z Deuteronomia. Matouš prezentuje Ježíše jako Syna Božího, který na počátku služby definuje své mesiášské poslání.`,
    keyWords: [
      { word: `peirazó (πειράζω) — pokoušet, zkoušet`, explanation: `Dvojznačné: zkouška i svod. Bůh zkouší (Abraham), ďábel svádí.` },
      { word: `Pneuma (Πνεῦμα) — Duch`, explanation: `Duch vede na poušť. Není to náhoda ani pád, ale součást Božího plánu.` },
      { word: `gegraptai (γέγραπται) — je psáno`, explanation: `Ježíš odpovídá na každé pokušení citací z Písma (Dt 8,3; 6,16; 6,13). Modelové použití Slova.` },
    ],
    structure: `A. Situace (v. 1–2): Duch vede, 40 dnů, hlad. B. První pokušení (v. 3–4): proměnit kameny na chléb. C. Druhé pokušení (v. 5–7): vrhnout se z chrámu. D. Třetí pokušení (v. 8–10): všechna království za poklonu. E. Závěr (v. 11): ďábel odchází, andělé slouží.`,
    theologicalThemes: [
      `Ježíš jako nový Izrael — obstojí tam, kde padá`,
      `Tři dimenze mesianismu: ekonomická (chléb), zázračná (test Boha), politická (světovláda)`,
      `Písmo jako obrana proti svodu`,
      `Pokušení není hřích — je výzva k volbě`,
    ],
    applicationHints: [
      `Každé pokušení je otázkou po identitě: „jsi-li Syn Boží…“`,
      `Postní doba začíná výzvou: které naše „kameny“ chceme změnit na chléb?`,
      `Kontrast: Ježíš odmítá moc, která obchází kříž`,
      `Pokušení nemá vnějšího ježíše, ale vnitřního učedníka — čím zaplňuji hlad?`,
    ],
    verseNotes: [
      { verse: 1, note: `„Duchem“ veden na poušť — Matouš zdůrazňuje Boží iniciativu. Pokušení je součástí cesty.` },
      { verse: 3, note: `„Jsi-li Syn Boží“ — ne pochyba o identitě, ale svod ji použít pro sebe. Satan zkusí stejnou formulaci i u kříže (27,40).` },
      { verse: 4, note: `Dt 8,3 — člověk není živ jen chlebem. Izrael na poušti byl učen závislosti na Bohu.` },
      { verse: 6, note: `Ďábel cituje Ž 91,11–12 — sám používá Písmo. Ne vše, co je „psáno“, je dobrá interpretace.` },
      { verse: 9, note: `„To vše ti dám“ — svod moci bez kříže. Mesianismus bez utrpení.` },
      { verse: 10, note: `„Odejdi, satane“ — definitivní odmítnutí. Ježíš zná svou cestu.` },
      { verse: 11, note: `Andělská služba — obnoveno společenství s nebem. Poušť končí, služba začíná.` },
    ],
  },

  // J 3,1–17 — Nikodém — narození shora
  "43:3": {
    reference: `J 3,1–17`,
    title: `Nikodém — narození shora`,
    context: `Nikodém — farizej, člen Sanhedrinu — přichází v noci. Noc u Jana není jen časový údaj, ale symbol: tma nepochopení. Ježíš odpovídá na jeho vyznání radikálně: „Musíš se narodit znovu/shora“. Řecké anóthen je dvojznačné: „znovu“ (Nikodém chápe takto) i „shora“ (Ježíšova intence). Text obsahuje slavný verš 3,16 — „Tak Bůh miloval svět“.`,
    keyWords: [
      { word: `anóthen (ἄνωθεν) — znovu / shora`, explanation: `Dvojznačné. Nikodém slyší „znovu“, Ježíš myslí „shora“. Jan pracuje s nedorozuměním jako literárním postupem.` },
      { word: `pneuma (πνεῦμα) — duch/vítr`, explanation: `Dvojznačné v řečtině i hebrejštině (ruach). Pun: vítr fouká kam chce, také Duch.` },
      { word: `hypsó (ὑψόω) — povýšit`, explanation: `„Jako Mojžíš povýšil hada na poušti“ (v. 14). Dvojznačné: povýšení na kříži = povýšení ve slávě.` },
    ],
    structure: `A. Návštěva v noci (v. 1–2): Nikodém vyznává Ježíše jako učitele od Boha. B. Narození shora (v. 3–8): Ježíš odkloní dialog k základnější — radikální proměně. C. Neschopnost věřit pozemskému (v. 9–15): Ježíš odkazuje na Num 21 (had na poušti). D. Boží láska jako motor spásy (v. 16–17): Janův výklad.`,
    theologicalThemes: [
      `Narození shora — nové stvoření jako dar, ne výkon`,
      `Bůh jako milovník světa (3,16) — jádro evangelia`,
      `Spása ne skrze soud, ale skrze dar`,
      `Víra jako pohled na povýšeného (had, kříž)`,
    ],
    applicationHints: [
      `Nikodém přichází v noci — moudrý člověk s otázkami je vítán`,
      `„Tak Bůh miloval svět“ (3,16) — základní verš, málo známý v kontextu`,
      `Nové narození není „druhý chance“ — ale nový počátek shora`,
      `Post: čas, kdy se necháváme Duchem foukat`,
    ],
    verseNotes: [
      { verse: 2, note: `„V noci“ — Nikodém jde ke Kristu z tmy. Symbol nedospělé víry (srov. J 13,30 — Jidáš odchází do noci).` },
      { verse: 3, note: `„Narodit se znovu/shora“ — podobenství o dosažení nového bytí. Radikální, nikoli jen reforma.` },
      { verse: 8, note: `Paralelismus mezi větrem a Duchem — oba uchopíme podle účinků, ne podle původu.` },
      { verse: 14, note: `Num 21,8–9 — měděný had. Izraelci byli uzdraveni pohledem. Analogie s křížem.` },
      { verse: 16, note: `Jeden z nejznámějších veršů Bible. „Tak“ (houtós) = „takovým způsobem“, ne „tolik“. Kvalita, ne kvantita lásky.` },
      { verse: 17, note: `„Neposlal Syna, aby svět odsoudil“ — spása, ne soud, je primární Boží intence.` },
    ],
  },

  // J 4,5–42 — Samaritánka u studny
  "43:4": {
    reference: `J 4,5–42`,
    title: `Samaritánka u studny`,
    context: `Nejdelší dialog Ježíše s jednotlivou osobou v evangeliích. Kontrast s Nikodémem (J 3): muž vs. žena, žid vs. Samaritánka, vzdělaný vs. prostá, noc vs. poledne, přímý rozhovor vs. podobenství. Oba jsou příklady hledání, ale jen Samaritánka dojde k víře a svědectví. Studna Jákobova — klasické místo zasnoubení v SZ (Izák-Rebeka, Jákob-Ráchel, Mojžíš-Zipora).`,
    keyWords: [
      { word: `hydór zón (ὕδωρ ζῶν) — živá voda`, explanation: `Tekoucí voda (pramen) vs. stojatá (studna). Dvojznačné: Ježíš dává eschatologickou vodu Ducha (srov. J 7,38–39).` },
      { word: `proskyneó (προσκυνέω) — klanět se`, explanation: `„V duchu a v pravdě“ (v. 24). Klanění není vázáno na místo, ale na vztah.` },
      { word: `egó eimi (ἐγώ εἰμι) — já jsem`, explanation: `V. 26: Ježíš se Samaritánce odkrývá jako „já jsem“ — první plné mesiášské vyznání u Jana.` },
    ],
    structure: `A. Setkání u studny (v. 5–9): Ježíš prosí o vodu. B. Živá voda (v. 10–15): nedorozumění a vystupňování. C. Pět mužů (v. 16–19): Samaritánka poznaná. D. Klanění v duchu (v. 20–26): teologický spor o místo kultu, Ježíš se odkrývá. E. Učedníci se vrátí, žena jde svědčit (v. 27–42): žatva a víra Samaritánů.`,
    theologicalThemes: [
      `Ježíš je živá voda — eschatologický dar`,
      `Pravá bohoslužba není vázána na místo, ale na pravdu`,
      `Žena jako první svědek a misionářka`,
      `Hranice — etnické, genderové, morální — jsou prolomeny`,
    ],
    applicationHints: [
      `Ježíš začíná rozhovor prosíce (o vodu), ne kážíc`,
      `Samaritánka má 5 mužů — Ježíš ji neodsoudí, osloví`,
      `„Tvoje řeč ti prozradí“ — Samaritánka poznána, ne odhalena`,
      `Misijní účinek — ne z kázání, ale z osobního svědectví: „pojďte se podívat“`,
    ],
    verseNotes: [
      { verse: 6, note: `„Šestá hodina“ = poledne. Nezvyklá doba pro nabírání vody — náznak její sociální marginality.` },
      { verse: 9, note: `Židé se nestýkali se Samaritány — etnický i rituální konflikt.` },
      { verse: 10, note: `„Kdybys věděla, kdo je ten, co ti pravil…“ — Ježíš obrátí roli. On, který prosí, je vlastně tím, kdo dává.` },
      { verse: 16, note: `„Jdi, zavolej svého muže“ — ne provokace, ale výzva k pravdě.` },
      { verse: 24, note: `„V duchu a v pravdě“ — ne protiklad mezi duchem a tělem, ale autentický vztah k Bohu mimo místní vázanosti.` },
      { verse: 26, note: `„Já jsem“ — vůbec první jasné prohlášení. A komu ho říká? Samaritánce. To je Janova teologická radikalita.` },
      { verse: 42, note: `„Uvěřili jsme ne kvůli tvému slovu“ — svědectví je brána, ale osobní setkání je cíl.` },
    ],
  },

  // J 9,1–41 — Slepý od narození
  "43:9": {
    reference: `J 9,1–41`,
    title: `Slepý od narození`,
    context: `Uzdravení slepého je nejdelší „znamení“ (sémeion) u Jana. Text je divadlo o sedmi scénách: učedníci, sousedé, farizeové, rodiče, opět farizeové, Ježíš. Slepý narozený postupně „vidí“ stále lépe — nejprve „člověka Ježíše“, pak „proroka“, pak „od Boha“, nakonec Pána. Farizeové naopak „vidí“ stále hůř. Finální paradox: kdo si myslí, že vidí, je slepý.`,
    keyWords: [
      { word: `fós (φῶς) — světlo`, explanation: `„Já jsem světlo světa“ (v. 5). Uzdravení je parabolou víry: ze tmy do světla.` },
      { word: `tyflos (τυφλός) — slepý`, explanation: `Dvojznačné — fyzická a duchovní slepota. Farizeové jsou fyzicky vidící, ale duchovně slepí.` },
      { word: `ergó (ἐργάζομαι) — konat`, explanation: `„Konat Boží skutky“ (v. 4). Ježíš a učedníci jsou společně povoláni k práci.` },
    ],
    structure: `A. Setkání a zázrak (v. 1–7): Ježíš a učedníci, otázka o hříchu, bláto a Siloe. B. Sousedé a farizeové 1x (v. 8–17): kdo to udělal? C. Rodiče (v. 18–23): bojácní, odkazují na syna. D. Druhé vyslýchání (v. 24–34): slepý vysněn, zkoušen, vyhnán. E. Setkání s Ježíšem (v. 35–38): plná víra a klanění. F. Finální výrok (v. 39–41): o soudu, vidění a slepotě.`,
    theologicalThemes: [
      `Víra jako postupně se otevírající vidění`,
      `Slepota jako obraz nedostatku víry, ale i víra tam, kde by se nečekala`,
      `Kristus jako světlo světa — centrum je on, ne zázrak`,
      `Riziko víry — slepý je vyňat ze synagógy`,
    ],
    applicationHints: [
      `Otázka „kdo zhřešil“ (v. 2) — typická. Ježíš neuvízne u viny`,
      `Uzdravený odhalí farizea jako duchovně slepého — prostý člověk proti systému`,
      `Víra jednou poznávaná — právě to něco znamená, co bude opravdu bolet`,
      `Post: pozor na skrytou slepotu náboženských lidí, kteří si jsou jisti`,
    ],
    verseNotes: [
      { verse: 2, note: `Otázka východiska — slepota jako následek hříchu? Ježíš to odmítá.` },
      { verse: 3, note: `„Aby se na něm zjevily Boží skutky“ — ne fatalismus, ale že tato situace bude místem pro zjevení Boží slávy.` },
      { verse: 6, note: `Bláto ze sliny — symbolické jednání. Evokuje Gn 2,7 — Bůh tvoří z hlíny. Nové stvoření.` },
      { verse: 22, note: `„Ze strachu ze židů“ — janovské znamení konfliktu s synagógou. Rodiče se bojí, uzdravený ne.` },
      { verse: 25, note: `„Jedno vím — byl jsem slepý, a nyní vidím“ — klasické svědectví víry. Prosté, neprovokativní, mocné.` },
      { verse: 38, note: `„Věřím, Pane“ — až teď Ježíš = Pán. Vrchol cesty víry: od člověka (v. 11) přes proroka (v. 17) po Pána.` },
      { verse: 41, note: `„Kdybyste byli slepí, neměli byste hřích; ale říkáte: Vidíme“ — paradox. Jistota vidění je překážkou.` },
    ],
  },

  // J 11,1–45 — Vzkříšení Lazara
  "43:11": {
    reference: `J 11,1–45`,
    title: `Vzkříšení Lazara`,
    context: `Poslední a největší znamení (sémeion) u Jana. Lazar je vzkříšen z mrtvých, což přivede Ježíše samého na cestu k smrti (veleknězská konspirace v. 47–53). Ježíš čeká s odchodem — přichází až čtyři dny po smrti. Dialog s Martou a Marií, pláč Ježíše, zvolání velé „Lazare, pojď ven!“. „Já jsem vzkříšení a život“ — páté „Já jsem“ u Jana.`,
    keyWords: [
      { word: `anástasis (ἀνάστασις) — vzkříšení`, explanation: `„Já jsem vzkříšení“ (v. 25). Ježíš není jen ten, kdo dává život, ale sám je životem.` },
      { word: `dakryó (δακρύω) — plakat`, explanation: `V. 35 — „Ježíš zaplakal“. Nejkratší verš Bible. Boží Syn prožívá opravdový žal.` },
      { word: `embrimáomai (ἐμβριμάομαι) — chvět se hněvem`, explanation: `V. 33, 38 — Ježíš „chvěl se v duchu“. Ne jen smutek, ale i hněv nad smrtí samotnou.` },
    ],
    structure: `A. Zpráva o Lazarově nemoci (v. 1–6): Ježíš čeká 2 dny. B. Cesta do Betanie (v. 7–16): učedníci se bojí, Tomáš je připraven zemřít s ním. C. Marta (v. 17–27): dialog a klíčové vyznání „Já jsem vzkříšení a život“. D. Marie a pláč (v. 28–37): Ježíš zapláče. E. U hrobu (v. 38–44): „Lazare, pojď ven!“ F. Víra mnoha (v. 45).`,
    theologicalThemes: [
      `Ježíš jako vzkříšení a život — nejen po smrti, ale i uprostřed smrti`,
      `Boží sláva se zjeví uprostřed smrti`,
      `Empatie Božího Syna — pláč jako soucítění`,
      `Vzkříšení jako anticipace Velikonoc`,
    ],
    applicationHints: [
      `Ježíš plakal — dovoluje nám plakat. Smrt je nepřítel, i když je překonána`,
      `Marta: „Vím, že vstane při vzkříšení v poslední den“ — odsouvá vzkříšení do budoucnosti. Ježíš: „Já jsem vzkříšení“ — teď a tady`,
      `„Rozvažte ho a nechte ho jít“ (v. 44) — Kristus oživuje, církev osvobozuje`,
      `5. postní neděle: víra žije na prahu smrti, a právě tam je Ježíš přítomen`,
    ],
    verseNotes: [
      { verse: 6, note: `„Zůstal ještě dva dny“ — úmyslné čekání. Lazar měl zůstat mrtvý, aby se mohlo zjevit větší znamení.` },
      { verse: 16, note: `Tomáš: „Pojďme i my, ať zemřeme s ním“ — pozoruhodná statečnost. Kontrast s jeho pozdějším „pochybováním“.` },
      { verse: 25, note: `Páté „Já jsem“ — jediné s dvojím predikátem. Vzkříšení a život jdou spolu.` },
      { verse: 35, note: `„Ježíš zaplakal“ — nejkratší verš. Projev skutečné lidskosti a soucítění.` },
      { verse: 39, note: `„Již zapáchá“ — Marta je realista. Zázrak se dělá proti přírodě, ne v imaginárním světě.` },
      { verse: 43, note: `„Lazare, pojď ven!“ — hlasité zavolání. Ježíš zná Lazara jménem (srov. J 10,3).` },
      { verse: 44, note: `„Rozvažte ho“ — Kristus dává život, církev (učedníci, sousedé) dává svobodu. Eklesiologický rozměr.` },
    ],
  },

  // ==================== ORDINARY TIME — Year A ====================

  // Mt 5,1–12 — Blahoslavenství — Ústava Božího království
  "40:5": {
    reference: `Mt 5,1–12`,
    title: `Blahoslavenství — Ústava Božího království`,
    context: `Začátek Kázání na hoře (Mt 5–7). Ježíš na hoře jako nový Mojžíš, dává novou Tóru. Osm (nebo devět) blahoslavenství tvoří bránu do celého kázání. Řecké „makarios“ překládané jako „blahoslavený“ nebo „šťastný“ — paradoxní prohlášení o těch, kteří ve světě prohrávají, že jsou v Božím království vítězi.`,
    keyWords: [
      { word: `makarios (μακάριος) — blahoslavený`, explanation: `Více než „šťastný“. Prohlášení o stavu přízně Boha. SZ zkoušené „ašré“ (Ž 1,1).` },
      { word: `ptóchos (πτωχός) — chudý`, explanation: `„Chudí duchem“ — ne duchovně prázdní, ale ti, kdo poznávají svou závislost na Bohu. Srov. Iz 61,1.` },
      { word: `dikaiosyné (δικαιοσύνη) — spravedlnost`, explanation: `V biblickém smyslu: správné vztahy — k Bohu i k lidem. Ne jen morální dokonalost.` },
    ],
    structure: `A. Úvodní nastavení (v. 1–2): Ježíš na hoře, učedníci usedají. B. Osm blahoslavenství (v. 3–10): každé má dvě části — situace + zaslíbení. C. Devátý rozšířený makarismus (v. 11–12): osobní oslovení „Blahoslavení jste vy“.`,
    theologicalThemes: [
      `Inverze hodnot — co svět odmítá, Bůh blahoslaví`,
      `Chudoba ducha jako první krok — poznání vlastní nedostatečnosti`,
      `Království Boží jako dar, ne výkon`,
      `Pronásledování jako potvrzení prorocké linie`,
    ],
    applicationHints: [
      `Blahoslavenství nejsou recepty, ale popis Božích lidí`,
      `Pozor na sentimentalizaci „chudých v duchu“ — znamená to konkrétní přiznání k Boží závislosti`,
      `„Tvořitelé pokoje“ — aktivní, ne pasivní. Ne klidní, ale usmiřující`,
      `Pronásledování pro spravedlnost — dnes subtilnější než v 1. stol.`,
    ],
    verseNotes: [
      { verse: 1, note: `„Vystoupil na horu“ — Matoušovo Kázání na hoře (vs. Lukášovo na rovině). Evokuje Sinaj.` },
      { verse: 3, note: `„Chudí duchem“ (Matouš) vs. „chudí“ (Lukáš). Matouš spiritualizuje, ale ne abstraktně — jde o postoj srdce.` },
      { verse: 4, note: `„Plačící“ — kdo truchlí nad stavem světa, nad svými hříchy, nad útlakem. Budou potěšeni eschatologicky.` },
      { verse: 5, note: `Aluze na Ž 37,11. „Tiší“ — ne slabí, ale ti, kdo nebojují násilím.` },
      { verse: 8, note: `„Čistí srdcem“ — integrita vnitřního člověka. Srov. Ž 24,4. „Budou vidět Boha“ — eschatologická vize.` },
      { verse: 9, note: `„Tvořitelé pokoje“ (eirénopoioi) — aktivní tvoření šalomu, ne jen mír jako absence války.` },
      { verse: 12, note: `„Vaše odměna“ — ne zásluha, ale důsledek. Prorocká tradice ukazuje, že odmítnutí je součást povolání.` },
    ],
  },

  // Mt 6,24–34 — Starost a Boží péče — neslužte dvěma pánům
  "40:6": {
    reference: `Mt 6,24–34`,
    title: `Starost a Boží péče — neslužte dvěma pánům`,
    context: `Část Kázání na hoře o pravých hodnotách. Ježíš mluví o nemožnosti sloužit Bohu i Mamonu (zosobněné bohatství). Následuje slavná pasáž o pelikánu a liliích — obraz důvěry v Boží péči. Není to ódou na nerozumnost, ale výzvou k priorizaci: hledejte nejprve Boží království.`,
    keyWords: [
      { word: `mamónas (μαμωνᾶς) — mamon, bohatství`, explanation: `Aramejské slovo pro majetek/bohatství. Ježíš ho personifikuje — jako konkurenční božstvo.` },
      { word: `merimnáó (μεριμνάω) — starat se, úzkostlivě`, explanation: `Rozpoznat úzkostlivou starost od zodpovědné péče. Opakuje se v textu 6×.` },
      { word: `basileia (βασιλεία) — království`, explanation: `„Hledejte nejprve Boží království“ (v. 33). Priorita, ne exkluzivita.` },
    ],
    structure: `A. Dvě pány (v. 24): nemožnost sloužit Bohu i Mamonu. B. Nestarejte se (v. 25–32): ptáci a lilie jako obraz Boží péče. C. Priorita království (v. 33): hledejte nejprve Boží království. D. Jeden den stačí (v. 34): každý den má dost své starosti.`,
    theologicalThemes: [
      `Monolatrie — Bůh nemůže být sdílen s Mamonem`,
      `Stvořitelská důvěra — Bůh, který živí ptáky, ví i o mně`,
      `Boží království jako priorita, ne náhražka péče`,
      `Přítomnost — dnes stačí, zítřek patří Bohu`,
    ],
    applicationHints: [
      `Starost není hřích — úzkostlivost je. Ježíš nekritizuje zodpovědnou péči`,
      `„Nebeský Otec ví, co potřebujete“ — téma Boží prozřetelnosti pro přetíženou dobu`,
      `Ptáci a lilie — jednoduchá pozorovací kázání o Boží péči`,
      `„Dnes“ — pozvání do přítomnosti v kultuře neustálého plánování`,
    ],
    verseNotes: [
      { verse: 24, note: `„Dva pány“ — Ježíš formuluje absolutně. V jeho době otrok patřil jednomu — dvojité vlastnictví nebylo možné.` },
      { verse: 25, note: `„Nestarejte se o svůj život“ (psyché) — nejde o lhostejnost, ale o svobodu od úzkosti. Řecký „bios“ (materiální život) vs. „zóé“ (plný život).` },
      { verse: 26, note: `„Ptáci nebeští“ — rabínská forma argumentace „a fortiori“: jestliže Bůh pečuje o méně důležité, tím spíš o vás.` },
      { verse: 30, note: `„Malověrní“ (oligopistoi) — typicky matoušovské slovo. Ne bezvěrci, ale ti s malou vírou.` },
      { verse: 33, note: `„Hledejte nejprve“ — priorita, ne chronologie. Boží království jako organizační střed života.` },
      { verse: 34, note: `„Den má dost svého trápení“ — praktická moudrost. Úzkost se nedá dělat do zásoby.` },
    ],
  },

  // Mt 13,1–23 — Podobenství o rozsévači
  "40:13": {
    reference: `Mt 13,1–23`,
    title: `Podobenství o rozsévači`,
    context: `První a paradigmatické podobenství Matoušovo o Božím království. Ježíš vypráví z loďky u jezera, zástupy stojí na břehu. Rozsévač rozsévá semeno — čtyři druhy půdy, čtyři osudy. Podobenství samo (v. 1–9), důvod podobenství (v. 10–17), výklad (v. 18–23). Klíč k celé kapitole podobenství (13. kap. obsahuje 7 podobenství).`,
    keyWords: [
      { word: `parabolé (παραβολή) — podobenství`, explanation: `„Vedle-hod“. Ne alegorie, ale vyprávění s otevřeným koncem, které vyzývá k přemýšlení.` },
      { word: `logos (λόγος) — slovo`, explanation: `„Slovo o království“ (v. 19). Seminem není morální naučení, ale samo Boží Slovo.` },
      { word: `synió (συνίημι) — chápat, porozumět`, explanation: `Klíčové sloveso (v. 13, 19, 23). Porozumění není přirozené — je darem/výzvou.` },
    ],
    structure: `A. Podobenství (v. 1–9): čtyři druhy půdy. B. Proč podobenství (v. 10–17): citace Iz 6 — zaslepené srdce lidu. C. Výklad čtyř půd (v. 18–23): cesta, skála, trní, dobrá půda.`,
    theologicalThemes: [
      `Boží království jako zaseté semeno — neviditelné, pomalé, riskantní`,
      `Otevřenost naslouchat je krize — ne všechno je přijato`,
      `Dobrá půda dává nadějný výnos (30-60-100×)`,
      `Ježíš jako rozsévač štědrý i k „špatné“ půdě`,
    ],
    applicationHints: [
      `Kázání se často soustředí na 4. půdu — text ale popisuje všechny stejně vážně`,
      `Rozsévač sype i na cestu — to vypadá plýtvání. Boží velkorysost`,
      `Co je „má půda“ právě teď? Kamení? Trní? Cesta?`,
      `Podobenství zve k sebereflexi, ne k soudu ostatních`,
    ],
    verseNotes: [
      { verse: 3, note: `„Vyšel rozsévač“ — v palestinské praxi se nejprve rozséve, pak teprve oralo. Sémě spadá na různé půdy.` },
      { verse: 9, note: `„Kdo má uši, slyš“ — rabínská výzva k pozornosti. Objeví se 3× v kap. 13.` },
      { verse: 11, note: `„Vám je dáno znát tajemství“ — apokalyptická jazyk. Tajemství není skryté, ale zjevené těm, kdo naslouchají.` },
      { verse: 13, note: `Citace Iz 6,9–10 — motiv zatvrzeného srdce. Ne Bůh je příčina, ale důsledek odmítnutí zjevení.` },
      { verse: 19, note: `„Cesta“ — srdce zatvrzelé, kde Slovo nemá šanci zakořenit.` },
      { verse: 21, note: `„Pouze chvíli“ — povrchní přijetí bez hloubky. Soužení odhalí slabost kořene.` },
      { verse: 22, note: `„Zahlušení“ — starosti a bohatství. Ne aktivní odmítnutí, ale „zdušení“ starostmi.` },
      { verse: 23, note: `Trojí výnos: 30, 60, 100. Ne všichni dávají stejné ovoce, ale všichni skutečně přinášejí.` },
    ],
  },

  // Mt 14,22–33 — Ježíš chodí po vodě
  "40:14": {
    reference: `Mt 14,22–33`,
    title: `Ježíš chodí po vodě`,
    context: `Navazuje na nasycení pěti tisíců (14,13–21). Ježíš pošle učedníky na loď, sám se modlí v samotě. V noci přichází po moři — klasický motiv Boží vlády nad chaosem (Ž 77,20; Jb 9,8). Petr chce za ním — chvíli zvládá, pak se topí. Ježíš ho zachrání, napomene pro malověrnost, uklidní vlny. Učedníci vyznávají: „Jsi Syn Boží.“`,
    keyWords: [
      { word: `egó eimi (ἐγώ εἰμι) — já jsem`, explanation: `„Já jsem to, nebojte se“ (v. 27). Božské jméno z Ex 3,14. Ne jen identifikace, ale sebezjevení.` },
      { word: `oligopistos (ὀλιγόπιστος) — malověrný`, explanation: `Matoušovo oblíbené slovo pro učedníky. Ne „bez víry“, ale s vírou slabou, proměnlivou.` },
      { word: `epitimaó (ἐπιτιμάω) — pokárat / utišit`, explanation: `Stejné sloveso, kterým Ježíš „kára“ démony a „utišuje“ vlny — má autoritu nad chaosem.` },
    ],
    structure: `A. Ježíš posílá učedníky a modlí se (v. 22–23). B. Bouře na moři (v. 24): vichr proti nim. C. Ježíš přichází po vodě (v. 25–27): strach, „Já jsem“. D. Petr chce za ním (v. 28–31): víra a pád. E. Uklidnění bouře a vyznání (v. 32–33): „Jsi Syn Boží“.`,
    theologicalThemes: [
      `Kristus vládne nad chaosem — SZ motiv Božího panování`,
      `Zjevení „Já jsem“ — christologické jádro`,
      `Víra a pochybnost vedle sebe — Petr jako typ učedníka`,
      `Modlitba jako zdroj síly pro zásah do bouří`,
    ],
    applicationHints: [
      `Bouře přicházejí — nejsou výjimkou ve víře, ale pravidlem`,
      `Petr se „topí“ když přestane hledět na Krista — klasické obrazné kázání`,
      `„Proč jsi pochyboval?“ — Ježíš nevyčítá, ale ptá se`,
      `Vyznání „Syn Boží“ přichází po zážitku, ne před ním`,
    ],
    verseNotes: [
      { verse: 23, note: `„Vystoupil na horu, aby se modlil sám“ — vzorec: služba, odpočinek, modlitba, nová služba.` },
      { verse: 25, note: `„Čtvrtá stráž“ (3–6 hod ráno) — hluboká noc, nejhorší čas. Právě tehdy přichází.` },
      { verse: 27, note: `„Já jsem to“ (egó eimi) — řecký text je ambiguózní: „to jsem já“ i „JÁ JSEM“ (božské jméno).` },
      { verse: 28, note: `„Jsi-li to ty“ — Petrova typická forma. Test podmíněný: pokud ano, dokaž to.` },
      { verse: 30, note: `„Vida silný vítr“ — víra selhává, když se dívá na okolnosti místo na Krista.` },
      { verse: 31, note: `„Maloverný, proč jsi pochyboval?“ — distikh (rozdvojení srdce). Ježíš vytahuje a pak se ptá.` },
      { verse: 33, note: `„Jsi Syn Boží“ — první plné christologické vyznání v Matoušovi. Později u Petra (16,16) a u kříže (27,54).` },
    ],
  },

  // Mt 16,13–20 — Petrovo vyznání — kdo je Ježíš?
  "40:16": {
    reference: `Mt 16,13–20`,
    title: `Petrovo vyznání — kdo je Ježíš?`,
    context: `V Caesareji Filipově — pohanské území, místo kultu Pana a císařského kultu. Ježíš se ptá učedníků: „Kdo říkají lidé, že je Syn člověka?“ Pak osobní otázka: „A vy, kdo říkáte, že jsem?“ Petr vyznává: „Ty jsi Mesiáš, Syn Boha živého.“ Ježíš v reakci udělí Petrovi výjimečné postavení (slavný text o skále, klíčích, vázání a rozvazování).`,
    keyWords: [
      { word: `Christos (Χριστός) — Mesiáš`, explanation: `„Pomazaný“. Hebrejské mašíach. Očekávaný král z Davidova rodu.` },
      { word: `petra (πέτρα) — skála`, explanation: `Slovní hříčka: Petr (Petros) = skála (petra). Na čem stojí církev — na Petrovi? Na Kristu? Na vyznání?` },
      { word: `kleides (κλεῖδες) — klíče`, explanation: `„Klíče království nebeského“ — pravomoc vyhlašovat, co je zakázáno a povoleno. Rabínská terminologie.` },
    ],
    structure: `A. Otázka (v. 13–14): co říkají lidé? B. Osobní otázka (v. 15): a vy? C. Petrovo vyznání (v. 16): Kristus, Syn Boha živého. D. Ježíšovo blahoslavení (v. 17–19): na této skále, klíče, vázání a rozvazování. E. Příkaz mlčet (v. 20).`,
    theologicalThemes: [
      `Christologie: Mesiáš + Syn Božího = plnost vyznání`,
      `Zjevení ne od lidí, ale od Otce`,
      `Církev jako společenství postavené na vyznání`,
      `Moc vázat a rozvazovat — odpovědnost společenství`,
    ],
    applicationHints: [
      `Ježíš žádá osobní odpověď, ne opakování toho, co se říká`,
      `Vyznání je darované, ne vyprodukované — „Otec ti to zjevil“`,
      `Petr jako typ: správné vyznání a vzápětí (v. 22–23) nepochopení`,
      `Dnešní otázka: kdo je Ježíš pro mě, ne pro kulturu`,
    ],
    verseNotes: [
      { verse: 13, note: `Caesareja Filipova — pohanské prostředí. Ježíš klade identitní otázku daleko od Jeruzaléma.` },
      { verse: 14, note: `Různé odpovědi: Jan Křtitel, Eliáš, Jeremjáš — všichni proroci. Ale Ježíš je více.` },
      { verse: 16, note: `„Ty jsi Mesiáš, Syn Boha živého“ — dvojí titul: funkční (Mesiáš) + ontologický (Syn).` },
      { verse: 17, note: `„Nezjevilo ti to tělo a krev“ — semitský idiom pro lidský původ. Vyznání je odhalení shůry.` },
      { verse: 18, note: `„Petr“ (Kéfa/Petros) dostává jméno poprvé tady. Výklady skály: Petr osobně (katolické), Petrovo vyznání (protestantské), Kristus (některé východní).` },
      { verse: 19, note: `„Klíče“ — rabínská pravomoc halachy (co je zakázáno/povoleno). Sbor jako místo Boží autority na zemi.` },
      { verse: 20, note: `„Nikomu neřekli“ — mesiánské tajemství. Kristova identita potřebuje kříž ke správnému pochopení.` },
    ],
  },

  // Mt 18,21–35 — Podobenství o nemilosrdném služebníku
  "40:18": {
    reference: `Mt 18,21–35`,
    title: `Podobenství o nemilosrdném služebníku`,
    context: `Matouš 18 je kázání o životě v církvi. V závěru kapitoly Petr klade otázku o odpuštění — „kolikrát mám odpustit?“ Ježíš odpovídá absolutním číslem (77× nebo 7×70× — v obou případech bez limitu) a podobenstvím o služebníku, kterému král odpustil nepředstavitelný dluh (10 000 talentů — mzda 200 000 let), a on pak nechal zavřít druha kvůli zanedbatelnému dluhu (100 denárů).`,
    keyWords: [
      { word: `aphiémi (ἀφίημι) — odpustit, propustit`, explanation: `Stejné sloveso pro odpuštění dluhu i hříchu. Ne zapomenutí, ale propuštění nároku.` },
      { word: `splagchnizomai (σπλαγχνίζομαι) — slitovat se`, explanation: `Hluboký pocit v útrobách. Král nedává z výpočtu, ale ze soucitu.` },
      { word: `myriás (μυριάς) — 10 000 (= nespočetně)`, explanation: `Talent = mzda 15 let práce. 10 000 talentů = hyperbola pro nesplatitelný dluh.` },
    ],
    structure: `A. Petrova otázka (v. 21–22): 77×. B. Král a dluh 10 000 talentů (v. 23–27): odpuštění ze soucitu. C. Služebník a dluh 100 denárů (v. 28–30): neodpuštění. D. Obnovení dluhu (v. 31–34): spoluslužebníci si stěžují, král obnoví trest. E. Moralita (v. 35): „Tak i můj nebeský Otec…“`,
    theologicalThemes: [
      `Odpuštění bez hranic — protiváha lidské pomstě`,
      `Obrovský nepoměr: přijaté vs. odepřené odpuštění`,
      `Odpuštění Boží je předpokladem, ne výsledkem našeho`,
      `Život ve společenství stojí na kultuře odpuštění`,
    ],
    applicationHints: [
      `Odpuštění není omluva (to, co se stalo, je stále zlé) ani zapomnění`,
      `77× nebo 7×70 — Ježíš nedělá kalkulace, ale převrací logiku`,
      `Zkušenost odpuštění mění kapacitu odpouštět — to je jádro podobenství`,
      `„Ze srdce“ (v. 35) — vnější forma nestačí, potřebný je vnitřní pohyb`,
    ],
    verseNotes: [
      { verse: 21, note: `„Sedmkrát“ — Petr jde za rabínskou normu (3×). Myslí, že je velkorysý.` },
      { verse: 22, note: `„Sedmasedmdesátkrát“ (hebdomékontakis hepta) — echo Gn 4,24 (Lámech). Inverze pomsty.` },
      { verse: 24, note: `„10 000 talentů“ — více než roční příjem Herodovy tetrarchie. Zjevná hyperbola.` },
      { verse: 27, note: `„Slitoval se“ (splagchnistheis) — klíčové sloveso. Aktér není logika, ale soucit.` },
      { verse: 28, note: `„100 denárů“ — mzda za 100 dnů. Ne zanedbatelné, ale v porovnání směšné.` },
      { verse: 32, note: `„Zlý služebníku“ — král se hněvá ne kvůli dluhu, ale kvůli nemilosrdenství.` },
      { verse: 35, note: `„Ze srdce“ — klíč k interpretaci. Odpuštění nezačíná v jednání, ale ve vnitřním postoji.` },
    ],
  },

  // Mt 20,1–16 — Dělníci na vinici
  "40:20": {
    reference: `Mt 20,1–16`,
    title: `Dělníci na vinici`,
    context: `Podobenství navazuje na rozhovor s bohatým mladíkem a Petrovu otázku „co tedy my dostaneme?“ (19,27). Ježíš odpovídá obrazem hospodáře, který najímá dělníky v různých hodinách a všem dá stejnou mzdu. Ti první reptají — podobenství je o Boží velkorysosti, která urážka spravedlnosti v lidském chápání.`,
    keyWords: [
      { word: `oikodespotés (οἰκοδεσπότης) — hospodář`, explanation: `Doslova „pán domu“. V podobenstvích Matoušových typický obraz Boha.` },
      { word: `denárius (δηνάριον) — denár`, explanation: `Mzda za jeden den práce. V Ježíšově době životní minimum pro rodinu.` },
      { word: `ophthalmós ponéros (ὀφθαλμὸς πονηρός) — zlé oko`, explanation: `Semitský idiom pro závist. V. 15 — „Je tvé oko zlé?“` },
    ],
    structure: `A. Hospodář najímá v 5 fázích (v. 1–7): 6. hodina, 9., 12., 15., 17. B. Výplata od posledních k prvním (v. 8–10): všichni denár. C. Reptání prvních (v. 11–12). D. Odpověď hospodáře (v. 13–15): nejsem nespravedlivý, jsem dobrý. E. Moralita (v. 16): poslední budou první.`,
    theologicalThemes: [
      `Boží spravedlnost ≠ lidská kalkulace zásluh`,
      `Milost je dar, ne mzda`,
      `Závist v obci víry — „oko zlé“ proti Boží velkorysosti`,
      `Obrácení prvních/posledních — rytí království`,
    ],
    applicationHints: [
      `Dělníci 17. hodiny — ti, kdo obrací v pozdním věku nebo po životě jinde`,
      `Závist „starých“ věřících vůči novým — aktuální problém obcí`,
      `„Co je tvé, vezmi“ — první nedostali méně, dostali dohodnuté`,
      `Boží království zkouší naše chápání spravedlnosti`,
    ],
    verseNotes: [
      { verse: 1, note: `„Vinice“ — klasický SZ obraz pro Boží lid (Iz 5, Ž 80). Práce na vinici = služba v království.` },
      { verse: 6, note: `„17. hodina“ (11. hodina v českém počítání) — těsně před koncem dne. Desátník zbytečnosti.` },
      { verse: 8, note: `„Od posledních k prvním“ — úmyslné uspořádání, aby první viděli, co dostanou poslední.` },
      { verse: 13, note: `„Přítel“ (hetairos) — oslovení, které Matouš užívá, kde je něco křivého (22,12; 26,50).` },
      { verse: 15, note: `„Zdali mi není dovoleno s mým učinit, co chci?“ — Boží svoboda. „Je tvé oko zlé, protože jsem dobrý?“ — jádro podobenství.` },
      { verse: 16, note: `„Poslední budou první“ — Matoušova oblíbená formule (19,30; 20,16). Obrácení hierarchií.` },
    ],
  },

  // Mt 22,34–46 — Největší přikázání
  "40:22": {
    reference: `Mt 22,34–46`,
    title: `Největší přikázání`,
    context: `Ježíš v Jeruzalémě, v posledním týdnu před křížem. Série sporů s náboženskými skupinami: saduceové (22,23–33), farizeové (22,34–40), poslední otázka Ježíše (22,41–46). Zákoník se ptá na největší přikázání — klasická rabínská otázka. Ježíš spojuje dvě citace z Tóry (Dt 6,5 + Lv 19,18): láska k Bohu a k bližnímu jako celek zákona.`,
    keyWords: [
      { word: `entolé megálē (ἐντολὴ μεγάλη) — velké přikázání`, explanation: `Rabínská terminologie pro klíčové přikázání. Rabíni vypočítali 613 přikázání — které je největší?` },
      { word: `agapáō (ἀγαπάω) — milovat`, explanation: `Láska jako volba a závazek, ne jen emoce. V obou citacích.` },
      { word: `plésion (πλησίον) — bližní`, explanation: `Lv 19,18 původně míří na člena Izraele. Ježíš ho rozšiřuje (srov. Lk 10,29nn — milosrdný Samařan).` },
    ],
    structure: `A. Zákoníkova otázka (v. 34–36): největší přikázání? B. Ježíšova odpověď (v. 37–40): Dt 6 + Lv 19 = celý zákon. C. Ježíšova otázka (v. 41–46): čí je Mesiáš syn? — otázka o identitě Krista.`,
    theologicalThemes: [
      `Celý zákon shrnut v lásce — k Bohu a bližnímu`,
      `Neoddělitelnost obou přikázání — vertikální i horizontální dimenze víry`,
      `Mesiáš jako syn Davidův i Pán Davidův — christologická otázka`,
      `Zákon neruší se, ale soustředí se`,
    ],
    applicationHints: [
      `Jednoduchá sumarizace víry — ale ne zjednodušení. Šéma + Lv 19`,
      `Kázání může ukázat, jak se tato dvě přikázání vzájemně potřebují`,
      `Dnes: láska k Bohu bez lásky k bližnímu je iluze, a naopak`,
      `Ježíšova otázka na konci (v. 41–46) — aktualně pro hledající: kdo je Ježíš?`,
    ],
    verseNotes: [
      { verse: 36, note: `Rabínské klasifikace — 248 pozitivních + 365 negativních přikázání. Hledání „podstatného“.` },
      { verse: 37, note: `Dt 6,5 (šéma jisrael) — hlavní židovská modlitba. Srdce, duše, mysl — celá osoba.` },
      { verse: 39, note: `„Druhé je podobné“ — hodnotově rovnocenné. Ne dvě přikázání, ale dvě strany jednoho.` },
      { verse: 40, note: `„Na těchto dvou přikázáních visí“ — kremelné přikázání celého Zákona a Proroků.` },
      { verse: 42, note: `Ježíšova protiotázka — převrací iniciativu. Farizeové chtěli testovat, teď jsou sami testováni.` },
      { verse: 44, note: `Citace Ž 110,1 — v rabínském čtení mesiášský žalm. „Pán“ = Hospodin, „můj pán“ = Mesiáš.` },
      { verse: 46, note: `„Nikdo mu nemohl odpovědět“ — definitivní závěr sporů. Dále jen Ježíš mluví (kap. 23–25).` },
    ],
  },

  // Mt 25,31–46 — Poslední soud — co jste udělali nejmenším
  "40:25": {
    reference: `Mt 25,31–46`,
    title: `Poslední soud — co jste udělali nejmenším`,
    context: `Závěrečná eschatologická řeč (kap. 24–25). Poslední ze tří obrazů o soudu: deset družiček (25,1–13), hřivny (25,14–30), poslední soud (25,31–46). Král vykládá verdikt podle neočekávaného kritéria: péče o hladové, žíznivé, cizince, nahé, nemocné, uvězněné. „Cokoli jste učinili jednomu z těchto mých nejmenších bratří, mně jste učinili.“`,
    keyWords: [
      { word: `krínō (κρίνω) — soudit, rozdělit`, explanation: `Ne morální odsouzení, ale eschatologické rozdělení. Ovce/kozy — klasický obraz.` },
      { word: `elachistos (ἐλάχιστος) — nejmenší`, explanation: `„Jeden z těchto mých nejmenších bratří“. Koho má Ježíš na mysli? Všichni trpící? Křesťané v nouzi?` },
      { word: `doxa (δόξα) — sláva`, explanation: `„Přijde ve své slávě“ (v. 31). Druhý příchod v plnosti Božství.` },
    ],
    structure: `A. Syn člověka ve slávě (v. 31): shromáždění národů. B. Ovce po pravici (v. 32–40): šest skutků milosrdenství, překvapení „kdy?“, odhalení („mně jste učinili“). C. Kozy po levici (v. 41–45): stejná struktura, negativní. D. Závěr (v. 46): věčný trest × věčný život.`,
    theologicalThemes: [
      `Kristus v nejmenších — inkarnace pokračuje v trpících`,
      `Soud podle skutků lásky, ne vyznání`,
      `Překvapení na obou stranách — nikdo nevěděl, že slouží/nepozorně hledí Kristu`,
      `Univerzální kritérium: péče o zranitelné`,
    ],
    applicationHints: [
      `Exegetický spor: nejmenší = všichni chudí (universalistické čtení) vs. křesťané v pronásledování (matoušovské)`,
      `V obou případech výzva: praktikovaná láska je lakmusový papírek víry`,
      `„Kdy jsme tě viděli?“ — opravdové skutky milosrdenství nejsou kalkulované`,
      `Neděle Krista Krále (poslední neděle církevního roku) — kralování se projevuje v soucítění`,
    ],
    verseNotes: [
      { verse: 31, note: `„Přijde ve své slávě“ — eschatologický příchod. Matouš kombinuje Syn člověka (Dan 7) a Král (Ž 2).` },
      { verse: 32, note: `„Všechny národy“ (panta ta ethné) — univerzální soud, ne jen Izrael.` },
      { verse: 34, note: `„Dědictví připravené od stvoření“ — soud odhaluje, ne vytváří. Ovce nejsou odměněny za skutky, ale identifikovány podle nich.` },
      { verse: 37, note: `„Pane, kdy jsme tě viděli?“ — překvapení spravedlivých. Nevěděli, že slouží Kristu — to je znak autentické lásky.` },
      { verse: 40, note: `„Nejmenších bratří“ (adelphón) — matoušovský jazyk pro učedníky. Ale v kontextu soudu národů možné univerzální čtení.` },
      { verse: 41, note: `„Oheň připravený ďáblu“ — ne stvořený pro lidi. Ztráta vychází z odmítnutí lásky.` },
      { verse: 45, note: `„Co jste neučinili“ — negativní forma. Soud není jen za zlo, ale za zanedbané dobro.` },
      { verse: 46, note: `„Věčný trest“ (kolasin aiónion) — slovo kolasin v řečtině může znamenat i nápravu. Exegetický spor o konečnosti.` },
    ],
  },

  // Mt 28,16–20 — Velkoposlání — Jděte ke všem národům
  "40:28": {
    reference: `Mt 28,16–20`,
    title: `Velkoposlání — Jděte ke všem národům`,
    context: `Finále Matoušova evangelia. Jedenáct učedníků (Jidáš chybí) se setkává s Vzkříšeným na hoře v Galileji (místo, které naznačil před křížem). „Někteří pochybovali“ (v. 17). Ježíš prohlašuje plnou moc na nebi i na zemi. Povolání k misii: jděte, učte všechny národy, křtěte, učte zachovávat vše, co jsem vám přikázal. Zaslíbení: „Jsem s vámi po všechny dny.“`,
    keyWords: [
      { word: `exousia (ἐξουσία) — moc, pravomoc`, explanation: `„Byla mi dána veškerá moc“. Pasivum — od Boha. Nebe i země — žádné území není mimo.` },
      { word: `mathéteuō (μαθητεύω) — učinit učedníky`, explanation: `Jediný imperativ v celém výroku. „Jdouce“ je participium. Cíl není křest nebo výuka, ale formace učedníků.` },
      { word: `synteleia tou aiónos (συντέλεια τοῦ αἰῶνος) — dokonání věku`, explanation: `Eschatologický výraz. Ježíš s námi až do konce — nejen duchovně, ale až do konce věků.` },
    ],
    structure: `A. Setkání na hoře (v. 16–17): klanění i pochybování. B. Moc (v. 18): všechna moc na nebi i na zemi. C. Velkoposlání (v. 19–20a): jděte, učte, křtěte, vyučujte. D. Zaslíbení (v. 20b): s vámi po všechny dny.`,
    theologicalThemes: [
      `Vzkříšený Kristus jako univerzální Pán`,
      `Misie jako podstatná součást církve, ne pobočná aktivita`,
      `Trinitární formule křtu — Otec, Syn, Duch svatý`,
      `Trvalá přítomnost Krista (Immánuel z Mt 1,23 se uzavírá)`,
    ],
    applicationHints: [
      `„Někteří pochybovali“ (v. 17) — pochybování je součást i vzkříšenské scény`,
      `„Činit učedníky“ — ne jen obrátit, ale formovat život`,
      `Misie univerzální (všechny národy) ale konkrétní (křtěte, vyučujte)`,
      `„Jsem s vámi“ — zaslíbení pro dnes. Kristus nepustil svou církev`,
    ],
    verseNotes: [
      { verse: 16, note: `„Jedenáct“ — Jidáš chybí. Hora v Galileji — naznačena ve 26,32, 28,7.10.` },
      { verse: 17, note: `„Někteří pochybovali“ (distaxan) — stejné sloveso jako u Petra na vodě (14,31). Víra a pochyba vedle sebe.` },
      { verse: 18, note: `„Všechna moc“ — echo Dan 7,14. Syn člověka dostává vládu. Kristus není jen učitel, je Pán.` },
      { verse: 19, note: `„Jdouce“ (poreuthentes) — participium, ne imperativ. Misie je průvodní, ne dodatečná.` },
      { verse: 19, note: `Trinitární formule — jediná taková v NZ. Svědek raně křesťanské víry a křtu.` },
      { verse: 20, note: `„Učte je zachovávat vše, co jsem vám přikázal“ — celé Matoušovo evangelium je teda učebnice pro učednictví.` },
      { verse: 20, note: `„Já jsem s vámi“ — ego meth’ hymón eimi. Parafráze Immánuel (1,23). Kniha se uzavírá kruhem.` },
    ],
  },

  // Mt 17,1–9 — Proměnění na hoře
  "40:17": {
    reference: `Mt 17,1–9`,
    title: `Proměnění na hoře`,
    context: `Proměnění (metamorfósis) je klíčový moment evangelia. Šest dnů po Petrově vyznání a Ježíšově předpovědi utrpení. Ježíš bere Petra, Jakuba a Jana na horu — zjeví se ve slávě, s Mojžíšem a Eliášem. Hlas z oblaku: „Toto je můj milovaný Syn.“ Text připravuje učedníky na kříž — Kristus přichází skrze utrpení do slávy.`,
    keyWords: [
      { word: `metamorphóó (μεταμορφόω) — proměnit`, explanation: `Změna formy. Kristus se nemění, ale zjevuje svou skutečnou identitu — oblak slávy.` },
      { word: `Móyses kai Élias (Μωϋσῆς καὶ Ἠλίας) — Mojžíš a Eliáš`, explanation: `Zákon a Proroci. Plnost SZ svědčí o Ježíši. Oba měli mimořádný odchod (Dt 34, 2Kr 2).` },
      { word: `akouete autou (ἀκούετε αὐτοῦ) — jeho poslouchejte`, explanation: `Aluze na Dt 18,15 (prorok jako Mojžíš). Autoritativní slovo Otce: poslušnost Synu.` },
    ],
    structure: `A. Vystup na horu (v. 1–2): šest dnů poté, proměnění. B. Mojžíš a Eliáš (v. 3): zákon a proroci se klanějí Kristu. C. Petrova reakce (v. 4): tři stany. D. Hlas z oblaku (v. 5): „Toto je můj milovaný Syn.“ E. Sestup (v. 6–9): strach, zákaz mluvit až po vzkříšení.`,
    theologicalThemes: [
      `Christologie: Ježíš je Syn Boží, ne jen prorok`,
      `Plnost SZ (zákon + proroci) ve Kristu`,
      `Sláva a kříž — Ježíš přichází do slávy skrze utrpení`,
      `Otec potvrzuje Syna pro cestu kříže`,
    ],
    applicationHints: [
      `Proměnění posílí učedníky pro Getsemany — mají zážitek slávy pro chvíle kříže`,
      `Petr chce stavět stany — chce zůstat ve slávě. Ale je nutné sestoupit`,
      `„Jeho poslouchejte“ — ne Petra, ne stany, ale Krista`,
      `Postní doba: ježíšova sláva se nejlépe ukazuje v jeho utrpení`,
    ],
    verseNotes: [
      { verse: 1, note: `„Po šesti dnech“ — Matouš navazuje na Petrovo vyznání a předpověď utrpení. Vzorec: poznání, utrpení, sláva.` },
      { verse: 2, note: `„Proměnil se“ — zvnitřku. Ne magická transformace, ale průhlednost k jeho pravé identitě.` },
      { verse: 3, note: `Mojžíš a Eliáš — oba měli „exodos“ (zvláštní odchod). Oba mluví s Ježíšem o jeho „exodu“ (Lk 9,31).` },
      { verse: 4, note: `„Tři stany“ — Petr chce prodloužit zážitek. Typická lidská touha udržet slávu.` },
      { verse: 5, note: `„Toto je můj milovaný Syn“ — echo křtu (3,17). Otcovo potvrzení Syna pro cestu před ním.` },
      { verse: 6, note: `„Padli na tvář“ — klasická reakce na Boží zjevení (Ez 1,28; Dan 8,17).` },
      { verse: 9, note: `„Nikomu neříkejte, dokud Syn člověka nebude vzkříšen“ — zjevení bez kříže může být zavádějící.` },
    ],
  },

  // Mt 15,21–28 — Kananejská žena — víra přesahuje hranice
  "40:15": {
    reference: `Mt 15,21–28`,
    title: `Kananejská žena — víra přesahuje hranice`,
    context: `Ježíš se stahuje do pohanského území (Týros a Sidon). Kananejská žena (Markovo evangelium: syrofoinická) křičí o pomoc pro svou posedlou dceru. Dialog překvapivě tvrdý: Ježíš nejprve mlčí, pak říká, že je poslán jen k Izraeli, pak použije tvrdý obraz o „psících“. Žena ale obrátí jeho slova proti němu a dosáhne uzdravení dcery. Ježíš chválí její víru — „Velká je tvá víra!“`,
    keyWords: [
      { word: `Chananaia (Χαναναία) — Kananejská`, explanation: `Matoušův výběr slova (Markos: Syrofoinická) — staré biblické jméno nepřátel Izraele. Symbolické napětí.` },
      { word: `kynarion (κυνάριον) — psík`, explanation: `Zdrobnělina — domácí psík, ne pouliční pes. Přesto pohanský kontext — židovská kultura psy měla ve znechucení.` },
      { word: `megalé hé pistis sou (μεγάλη ἡ πίστις σου) — velká je tvá víra`, explanation: `V Matoušovi jen dvakrát velká víra — u tohoto kananejského a u římského setníka. Oba pohané.` },
    ],
    structure: `A. Žena křičí (v. 21–22). B. Mlčení a zamítnutí (v. 23–24): pouze pro Izrael. C. Dialog o psech (v. 25–27): obrácení obrazu. D. Uzdravení (v. 28): velká víra, uzdravení dcery.`,
    theologicalThemes: [
      `Víra překračuje etnické hranice`,
      `Ježíš „roste“ v chápání univerzálnosti své misie?`,
      `Pokora a vytrvalost jako součásti víry`,
      `Žena jako teologický partner, ne jen prosebnice`,
    ],
    applicationHints: [
      `Exegetický problém: proč je Ježíš tak tvrdý? Zkouší víru? Uznává růst svého poslání?`,
      `Žena se nevzdává — tvrdohlavost víry`,
      `„I psíci jedí drobečky“ — pokorná síla. Ne ublíženost, ale sebevědomí v milosti`,
      `Velká víra na okraji (pohanka, žena) — kritika centra (Izrael) v Matoušovi`,
    ],
    verseNotes: [
      { verse: 22, note: `„Synu Davidův“ — mesiánský titul. Pohanská žena ho osloví jako Izraelka.` },
      { verse: 23, note: `Mlčení Ježíše — neobvyklé. Text ukazuje zápas.` },
      { verse: 24, note: `„Poslán jen k ztraceným ovcím Izraele“ — srov. 10,6. V této fázi služby misijní zaměření primárně na Izrael.` },
      { verse: 26, note: `Tvrdý obraz psů. Ježíš testuje — nebo odráží tehdejší židovský pohled na pohany?` },
      { verse: 27, note: `„Ano, Pane“ — přijímá obraz a obrací ho. Teologicky brilantní: ne protestuje, ale využívá.` },
      { verse: 28, note: `„Velká je tvá víra“ — Ježíš chválí a okamžitě uzdraví. Matouš předjímá poslání k národům (28,19).` },
    ],
  },

  // ==================== OT & EPISTLE READINGS — Year A ====================

  // Iz 2,1–5 — Hora Hospodinova domu — národy poputují
  "23:2": {
    reference: `Iz 2,1–5`,
    title: `Hora Hospodinova domu — národy poputují`,
    context: `1. čtení 1. neděle adventní (rok A). Izajášova eschatologická vize: v posledních dnech se hora Hospodinova domu povznese nad ostatní hory, národy k ní budou proudit. Bůh bude rozhodovat mezi národy — překují meče v radlice, nebudou se učit bojovat. Biblický text vytesaný na zdi OSN v New Yorku. Adventní výzva: chodit ve světle Hospodinově.`,
    keyWords: [
      { word: `acharit ha-jamím (אַחֲרִית הַיָּמִים) — konec dnů`, explanation: `Eschatologický termín. Ne konec času v lineárním smyslu, ale naplnění dějin.` },
      { word: `tóráh (תּוֹרָה) — zákon, vyučování`, explanation: `Z hory Sion vyjde vyučování pro všechny národy. Tóra jako univerzální dar.` },
      { word: `zamár (זָמַר) — překovat`, explanation: `„Překují meče v radlice“ — aktivní proměna nástrojů války na nástroje života.` },
    ],
    structure: `A. Nadpis a vize (v. 1–2): v posledních dnech hora Hospodinova domu. B. Národy k ní proudí (v. 3): učme se jeho cestám. C. Boží soud a mír (v. 4): překování zbraní v radlice. D. Výzva (v. 5): pojďme, domě Jákobův, choďme ve světle.`,
    theologicalThemes: [
      `Univerzální Boží vláda — ne jen pro Izrael`,
      `Sion jako teologické středisko, ne geografické`,
      `Mír jako Boží dar, ne lidský výkon`,
      `Advent = chození ve světle Hospodinově`,
    ],
    applicationHints: [
      `Advent začíná vizí — ne strachem, ale nadějí`,
      `Překování zbraní — konkrétní politická aplikace textu`,
      `Pozvání národům — univerzalistická adventní naděje`,
      `„Choďme ve světle“ (v. 5) — adventní motiv liturgie světla`,
    ],
    verseNotes: [
      { verse: 2, note: `„V posledních dnech“ — eschatologická formule. Ne budoucnost jen, ale Boží cíl dějin.` },
      { verse: 3, note: `„Ze Sionu vyjde zákon“ — dar Tóry není exkluzivní, ale misionářský. Z Jeruzaléma vychází Boží slovo do světa.` },
      { verse: 4, note: `„Pře­kují meče v radlice“ — ikonický verš. Parallelní text u Micheáše (Mi 4,3). Je kombinace Iz a Mi.` },
      { verse: 5, note: `„Dům Jákobův, pojďte“ — od vize národů zpět k Izraeli. Pokud má být světlo pro národy, musí sám chodit ve světle.` },
    ],
  },

  // Iz 11,1–10 — Výhonek z pařezu Jišajova — Mesiáš a pokojné království
  "23:11": {
    reference: `Iz 11,1–10`,
    title: `Výhonek z pařezu Jišajova — Mesiáš a pokojné království`,
    context: `2. neděle adventní (rok A). Izajáš po varováních o soudu (Iz 10) přináší obraz naděje. Z pařezu Jišajova (Davidova otce) vyroste výhonek — nový Mesiáš. Bude mít na sobě Ducha Hospodinova se sedmi dary. Spravedlivě bude soudit chudé. Jeho království bude pokojné — vlk bude s beránkem, lev s volem. Klasický mesiášský text, používaný v advent.`,
    keyWords: [
      { word: `nécer (נֵצֶר) — výhonek`, explanation: `Drobný výhonek ze zbytku stromu. Mesiáš přichází z pokořeného rodu Davidova.` },
      { word: `ruach Adonaj (רוּחַ יְהוָה) — Duch Hospodinův`, explanation: `V. 2 — sedm dimenzí: moudrost, rozumnost, rada, síla, poznání, bázeň Hospodinova. Základ nauky o sedmi darech Ducha.` },
      { word: `šalóm (שָׁלוֹם) — pokoj, celistvost`, explanation: `Obraz pokojného království — nejde jen o absenci konfliktu, ale o úplnou harmonii stvoření.` },
    ],
    structure: `A. Výhonek z Jišaje (v. 1): nový mesiáš. B. Dary Ducha (v. 2): sedm darů. C. Spravedlivý soud (v. 3–5): chudí budou souzeni spravedlivě. D. Pokojné království (v. 6–9): zvířata v míru, dítě u hada. E. Kořen Jišajův pro národy (v. 10): shromáždiště národů.`,
    theologicalThemes: [
      `Mesiáš jako obnovení davidovského slibu z pokoření`,
      `Sedm darů Ducha — adventní modlitby o Ducha`,
      `Spravedlivý soud jako znak mesiášského věku`,
      `Obnovení stvoření — eschatologický obraz`,
    ],
    applicationHints: [
      `Advent = čekání na výhonek z pařezu — naděje z marginality`,
      `Sedm darů Ducha — klasická katecheze pro adventní období`,
      `„Vlk bude přebývat s beránkem“ — obraz radikálního pokoje`,
      `Malé dítě vede zvířata — síla slabosti`,
    ],
    verseNotes: [
      { verse: 1, note: `„Pařez Jišajův“ — rod Davidův je pokořený, redukován na pařez. Z něj vyrůstá výhonek (necer). Křesťanská tradice viděla v necer i původ slova „Nazaretský“.` },
      { verse: 2, note: `Šest darů v MT, sedm v LXX (přidává zbožnost). Tradiční sedm darů Ducha v katolické katechezi.` },
      { verse: 3, note: `„Bázeň Hospodinova“ — ne strach, ale úcta. Mesiáš bude soudit ne podle vnějšku.` },
      { verse: 6, note: `„Vlk s beránkem“ — obraz návratu do edenického stavu. Ne naivní pacifismus, ale eschatologické zaslíbení.` },
      { verse: 9, note: `„Plná bude země poznání Hospodina“ — cíl Boží historie. Věděním, ne donucením.` },
      { verse: 10, note: `„Kořen Jišajův pro národy“ — univerzalistický závěr. Pavel cituje v Ř 15,12.` },
    ],
  },

  // Iz 7,10–16 — Znamení Immánuele
  "23:7": {
    reference: `Iz 7,10–16`,
    title: `Znamení Immánuele`,
    context: `4. neděle adventní (rok A). Kontext: Krát Achaz je v ohrožení od koalice Damašku a Samaří (732 př. Kr.). Izajáš mu říká, aby důvěřoval Hospodinu a neuzavíral spojenectví s Asýrií. Achaz odmítá znamení od Hospodina — Izajáš mu tedy dává znamení sám: panna počne a porodí syna, nazve ho Immánuel. Dříve než chlapec bude umět rozlišovat, nepřátelé budou pryč. Matouš cituje tento verš v souvislosti s Ježíšovým narozením (Mt 1,23).`,
    keyWords: [
      { word: `almáh (עַלְמָה) — mladá žena`, explanation: `Hebrejské slovo znamená mladá žena v plodném věku, ne nutně panna. LXX překládá parthenos (panna) — to je křesťanská tradice.` },
      { word: `Immánuel (עִמָּנוּ אֵל) — Bůh s námi`, explanation: `Složené jméno: immánu (s námi) + el (Bůh). Jméno-program.` },
      { word: `ót (אוֹת) — znamení`, explanation: `Prorocké znamení není zázrak pro zázrak, ale viditelný důkaz Božího slibu.` },
    ],
    structure: `A. Hospodin nabízí Achazovi znamení (v. 10–11). B. Achazovo odmítnutí (v. 12). C. Izajáš dává znamení sám (v. 13–14): panna, Immánuel. D. Časový horizont (v. 15–16): dříve než chlapec rozliší, nepřátelé pryč.`,
    theologicalThemes: [
      `Boží znamení i pro odmítavce`,
      `Immánuel — Bůh s námi jako klíčové jméno`,
      `Krátkodobé proroctví + křesťanské přečtení (Matouš)`,
      `Boží jméno vtělené v dítěti`,
    ],
    applicationHints: [
      `Achazova „zbožnost“ (nechce pokoušet Hospodina) skrývá nevíru`,
      `Immánuel — téma adventu vrcholící o Štědrém večeru`,
      `Boží přítomnost ne v abstraktech, ale v konkrétním dítěti`,
      `Matoušovo přečtení (Mt 1,23) vytváří most k vánocům`,
    ],
    verseNotes: [
      { verse: 12, note: `„Nechci pokoušet Hospodina“ — Achazova falešná zbožnost. Ve skutečnosti se bojí přijmout Boží zaslíbení, protože už se spoléhá na Asýrii.` },
      { verse: 13, note: `„Dům Davidův“ — krize je dynastická. Zaslíbení se týká zachování davidské linie.` },
      { verse: 14, note: `„Panna“ (almáh) — exegetický spor. V kontextu Iz 7 jde pravděpodobně o Achazovu ženu nebo prorokovu ženu. LXX + Mt čtou christologicky.` },
      { verse: 16, note: `„Než chlapec bude umět rozlišovat“ — asi 2–3 roky. Král Rezín a Pekach zemřeli během krátké doby (732 př. Kr.).` },
    ],
  },

  // Ř 13,11–14 — Probuďte se — den se přiblížil
  "45:13": {
    reference: `Ř 13,11–14`,
    title: `Probuďte se — den se přiblížil`,
    context: `2. čtení 1. neděle adventní (rok A). Pavel v Římanech 12–13 mluví o praktickém životě křesťana. V 13,11–14 přidává eschatologický rozměr: spása je blíž než když jsme uvěřili, noc pokročila, den se přiblížil. Je čas vstát ze spánku, odložit skutky tmy, obléknout zbroj světla. Obléknout Pána Ježíše Krista. Klasický adventní text: naše spasení je blízké, probuďte se.`,
    keyWords: [
      { word: `nyx (νύξ) — noc / hémera (ἡμέρα) — den`, explanation: `Dualistický obraz: tento věk je „noc“, přicházející věk je „den“. Křesťané jsou mezi dvěma světy.` },
      { word: `hoplon (ὅπλον) — zbroj, zbraň`, explanation: `„Zbroj světla“. Pavlova oblíbená metafora (1Te 5,8; Ef 6,11nn).` },
      { word: `endyó (ἐνδύω) — obléknout`, explanation: `„Oblékněte Pána Ježíše Krista“ (v. 14). Ne jen chování, ale totožnost.` },
    ],
    structure: `A. Výzva k bdělosti (v. 11): spása je blíž. B. Den/noc (v. 12): obléknout zbroj světla. C. Etické požadavky (v. 13): ne hýření, ne chlípnost, ne svár. D. Oblékněte Krista (v. 14): místo péče o tělo.`,
    theologicalThemes: [
      `Eschatologická naléhavost — čas se krátí`,
      `Křest jako oblečení Krista (Ga 3,27)`,
      `Etika jako důsledek eschatologie`,
      `Bdělost jako aktivní život`,
    ],
    applicationHints: [
      `Advent jako probuzení — Pavlův text v pozadí liturgie`,
      `„Den se přiblížil“ — jak se to vztahuje k nám dnes?`,
      `„Oblékněte Krista“ — křestní obraz, denní rozhodnutí`,
      `Seznam hříchů v v. 13 — typické pro Pavla, praktická etika`,
    ],
    verseNotes: [
      { verse: 11, note: `„Znajíce dobu“ — kairos, ne chronos. Kvalifikovaný čas, rozhodující okamžik.` },
      { verse: 12, note: `„Noc pokročila, den se přiblížil“ — aluze na adventní svítání.` },
      { verse: 14, note: `„Oblékněte Pána Ježíše Krista“ — Ga 3,27 (v křtu jste oblékli Krista). Augustin byl tímto veršem obrácen.` },
    ],
  },

  // Žd 1,1–4 — Mnohokrát a mnoha způsoby — nyní skrze Syna
  "58:1": {
    reference: `Žd 1,1–4`,
    title: `Mnohokrát a mnoha způsoby — nyní skrze Syna`,
    context: `Úvod listu Židům (prologus). 2. čtení pro Hod Boží vánoční (rok A). Mistrovsky postavená řečnická věta: Bůh mluvil k otcům skrze proroky různě, nyní naposledy mluvil skrze Syna. Syn je ustanoven dědicem, skrze něj byly stvořeny věky, je odleskem Boží slávy a otiskem jeho podstaty, nese vše svým mocným slovem. Po očištění od hříchů usedl po pravici Majestátu. Vysoce christologický text.`,
    keyWords: [
      { word: `polymerós (πολυμερῶς) — v mnoha částech`, explanation: `Bůh mluvil v dějinách postupně, fragmentárně. Plné zjevení přichází v Synu.` },
      { word: `apaugasma (ἀπαύγασμα) — odlesk`, explanation: `„Odlesk slávy“ (v. 3). Syn je jako paprsek ze zdroje — ne oddělený, ale vysílaný.` },
      { word: `charaktér (χαρακτήρ) — otisk, obraz`, explanation: `Stejný tvar jako originál. Jako pečeť otisknutá do vosku — přesný obraz.` },
    ],
    structure: `A. Boží zjevení v minulosti (v. 1): proroci. B. Definitivní zjevení skrze Syna (v. 2): dědic, stvořitel. C. Vysoké christologické tvrzení (v. 3): odlesk slávy, otisk podstaty, nositel všeho. D. Povýšení (v. 4): víc než andělé, lepší jméno.`,
    theologicalThemes: [
      `Pokračování a vrchol Božího zjevení`,
      `Kristus jako poslední slovo Boha`,
      `Pre-existence Syna (skrze něj stvoření)`,
      `Povýšení po pravici Majestátu = vánoční a velikonoční v jednom`,
    ],
    applicationHints: [
      `Klasický vánoční text s kosmickým rozměrem`,
      `Vtělení v kontextu stvoření a spásy`,
      `„V těchto posledních dnech mluvil skrze Syna“ — vánoce jako vrchol zjevení`,
      `„Po očištění od hříchů“ (v. 3) — vtělení je krok ke kříži`,
    ],
    verseNotes: [
      { verse: 1, note: `„Mnohokrát a mnoha způsoby“ (polymerós kai polytropós) — aliterace. Různorodost SZ zjevení.` },
      { verse: 2, note: `„Posledních dnech“ — eschatologický termín. Kristus jako definitivní slovo.` },
      { verse: 3, note: `„Odlesk“ + „otisk“ — dvě metafory pro jedinou pravdu: Syn je viditelný obraz neviditelného Boha.` },
      { verse: 3, note: `„Po pravici Majestátu“ — aluze na Ž 110,1. Povýšení Krista je centrálním tématem Židům.` },
    ],
  },

  // Ko 3,1–4 — Jste vzkříšeni s Kristem — hledejte horní věci
  "51:3": {
    reference: `Ko 3,1–4`,
    title: `Jste vzkříšeni s Kristem — hledejte horní věci`,
    context: `Kolosským 3 — přechod od teologie k praktickému životu. Pavel (nebo Deutero-Pavel) říká: byli jste s Kristem vzkříšeni, tedy hledejte věci, které jsou nahoře. Váš život je skryt s Kristem v Bohu. Až se Kristus ukáže — vy se s ním ukážete ve slávě. Klasické velikonoční čtení (Hod Boží velikonoční, rok A).`,
    keyWords: [
      { word: `synegeirō (συνεγείρω) — spolu-vzkřísit`, explanation: `Pavel kombinuje s „syn-“ — s Kristem. Naše vzkříšení je už skutečnost v křtu.` },
      { word: `ánō (ἄνω) — nahoře`, explanation: `„Věci, které jsou nahoře“ — ne nebeská bydla, ale věci trvalé hodnoty. Kosmologický jazyk.` },
      { word: `kryptō (κρύπτω) — skrýt`, explanation: `„Váš život je skryt s Kristem v Bohu“ — skryt znamená chráněn, ne neviditelný pro vás.` },
    ],
    structure: `A. Spolu-vzkříšení (v. 1): hledejte věci nahoře. B. Spolu-umření (v. 3): váš život skryt. C. Zjevení ve slávě (v. 4): s Kristem se ukážete.`,
    theologicalThemes: [
      `Křest jako spolu-vzkříšení — už teď, ne jen v budoucnu`,
      `Skrytá existence křesťana — důstojnost přes exteriér`,
      `Eschatologická naděje jako projekce současné reality`,
      `Hledání horních věcí — etický důsledek teologie`,
    ],
    applicationHints: [
      `Velikonoce: vaše nové stvoření se děje už teď`,
      `„Hledejte věci, které jsou nahoře“ — ne úniková teologie, ale proměna priorit`,
      `Skrytost života v Bohu — proti kultuře neustálého vystavování`,
      `„Až se Kristus ukáže“ — plnost je ještě před námi`,
    ],
    verseNotes: [
      { verse: 1, note: `„Byli jste spolu-vzkříšeni“ — aorist, dokončená akce. Křest je událost, jejíž důsledky žijeme.` },
      { verse: 3, note: `„Zemřeli jste“ — opět aorist. Dvojí realita: smrt starému já, život s Kristem.` },
      { verse: 4, note: `„Kristus, váš život“ — christologická identita. Kristus není jen náš spasitel, ale náš život sám.` },
    ],
  },

  // Sk 2,1–13 — Letnice — vylití Ducha
  "44:2": {
    reference: `Sk 2,1–13`,
    title: `Letnice — vylití Ducha`,
    context: `1. čtení Hodu Božího svatodušního. Padesátý den po Velikonocích. Shromážděni učedníci, kolem 120 lidí. Náhle zvuk jako mocného větru, ukázaly se rozdělené jazyky jako z ohně, sedly na každého z nich. Všichni byli naplněni Duchem svatým a začali mluvit jinými jazyky. Poutníci z diaspory slyší každý ve svém jazyce. Poslední dny Joelovy se naplňují.`,
    keyWords: [
      { word: `péntekosté (πεντηκοστή) — padesátnice`, explanation: `Židovský svátek Šavuot — 50 dnů po Pesachu, původně svátek žní, později slavení dání Tóry na Sinaji.` },
      { word: `pnoé (πνοή) — vanutí, vichr`, explanation: `Stejný kořen jako pneuma (Duch). Bůh vane jako v Gn 2,7 — nové stvoření.` },
      { word: `glossa (γλῶσσα) — jazyk`, explanation: `Dvojznačné: jazyk jako orgán + jazyk jako řeč. Ohnivé jazyky, pak mluvení jinými jazyky.` },
    ],
    structure: `A. Shromáždění a příchod Ducha (v. 1–4): vítr, oheň, jazyky. B. Překvapení zástupů (v. 5–11): každý slyší ve svém jazyce. C. Diviné reakce (v. 12–13): co to znamená? Nebo opilí?`,
    theologicalThemes: [
      `Duch svatý seslán po Kristově povýšení`,
      `Univerzalita Boží zvěsti — každý ve svém jazyce (anti-Babel)`,
      `Shromáždění církve ze všech národů`,
      `Naplnění Joelovy prorocké předpovědi`,
    ],
    applicationHints: [
      `Letnice jako narozeniny církve`,
      `Univerzalita evangelia — Bůh mluví každým jazykem`,
      `Kontrast s Bábelem (Gn 11) — roztříštění se stává sjednocením v Duchu`,
      `Vichr, oheň, jazyky — smyslové obrazy Boží přítomnosti`,
    ],
    verseNotes: [
      { verse: 1, note: `„Všichni byli spolu na jednom místě“ — shromážděná obec. Předpoklad Ducha.` },
      { verse: 2, note: `„Jako prudkého vanu“ — srovnání, ne identifikace. Duch není vítr, ale je jako vítr.` },
      { verse: 3, note: `„Rozdělené jazyky jako ohně“ — dvojí symbolika: ohnivý jazyk (proroctví) + rozdělené (všem).` },
      { verse: 6, note: `„Každý slyšel mluvit ve svém vlastním jazyce“ — zázrak slyšení, ne jen mluvení. Bůh oslovuje každého osobně.` },
      { verse: 11, note: `Výčet národů — reprezentace tehdejšího světa. Evangelium je pro celý svět.` },
    ],
  },

  // Sk 2,14a.36–41 — Petrovo kázání o Letnicích (Misericordias Domini, rok A)
  "44:2:14-41": {
    reference: `Sk 2,14a.36–41`,
    title: `Petrovo kázání o Letnicích`,
    context: `1. čtení 2. neděle po Velikonocích (Misericordias Domini) v roce A. Perikopa navazuje přímo na vylití Ducha a reakci zástupu (vv. 1–13). Petr — ještě před několika týdny ten, kdo Ježíše zapřel — vystupuje jako mluvčí dvanácti a pronáší první veřejné kázání církve. Vynechané verše 15–35 obsahují prorocký výklad události (citace Joela 2, Žalmu 16 a Žalmu 110), kterým Petr ukazuje, že ukřižovaný a vzkříšený Ježíš je oním zaslíbeným Mesiášem a Pánem. Vybrané verše 14a a 36–41 tvoří rámec a vyústění: úvod kázání a jeho christologické vyvrcholení s voláním po odpovědi. Text je modelový příklad kérygmatu — nejstarší formy křesťanského zvěstování.`,
    keyWords: [
      { word: `Χριστός (Christos) — Mesiáš`, explanation: `V. 36: „Bůh jej učinil Pánem i Mesiášem.“ Ne titul získaný postupně, ale vzkříšením potvrzený. Petr formuluje christologické jádro: ukřižovaný je Mesiáš.` },
      { word: `κύριος (kyrios) — Pán`, explanation: `V Septuagintě překlad Božího jména JHWH. Petr aplikuje na Ježíše — odvážná teologická identifikace. Ne pán jako domácí pán, ale Hospodin.` },
      { word: `μετάνοια (metanoia) — pokání`, explanation: `V. 38: „Obraťte se.“ Doslova „změna mysli“ — ne pocit lítosti, ale radikální obrat smýšlení i směru života. Odpověď na kérygma, ne emoce.` },
      { word: `βάπτισμα (baptisma) — křest`, explanation: `V. 38: „Dejte se pokřtít ve jménu Ježíše Krista.“ Křest „v Ježíšově jménu“ (εἰς τὸ ὄνομα) — vstup do jeho vlády a společenství. Viditelný znak metanoie.` },
      { word: `ἐπαγγελία (epangelia) — zaslíbení`, explanation: `V. 39: „Zaslíbení platí vám a vašim dětem i všem daleko vzdáleným.“ Tři okruhy: přítomní Židé, jejich potomci, pohané. Univerzalita rané církve.` },
      { word: `σῴζω (sózó) — zachránit`, explanation: `V. 40: „Zachraňte se z tohoto zvráceného pokolení!“ Pasivní tvar: nechte se zachránit. Záchrana je dar, ne výkon — ale vyžaduje odpověď.` },
    ],
    structure: `A. Úvod kázání (v. 14a): Petr se zvedá s Jedenácti, pozvedá hlas — gesto autority mluvčího. B. [Vynecháno: výklad Joel + Žalmy, vv. 15–35.] C. Kérygma (v. 36): závěr argumentu — „ten Ježíš, kterého jste vy ukřižovali, učinil Bůh Pánem i Mesiášem“. D. Reakce zástupu (v. 37): „bodlo je to u srdce“ (κατενύγησαν) — „co máme dělat?“ Otázka vyvolaná Slovem. E. Petrova odpověď (vv. 38–39): metanoia, křest, dar Ducha, trojí okruh zaslíbení. F. Výsledek (vv. 40–41): Petr pokračuje v napomínání, tři tisíce přijímají slovo a jsou pokřtěni — církev se rodí z odpovědi na kázání.`,
    theologicalThemes: [
      `Kérygma — nejstarší forma křesťanského zvěstování: Ježíš ukřižovaný a vzkříšený je Pán a Mesiáš`,
      `Odpovědnost a milost — „vy jste ukřižovali“ (v. 36) a hned „obraťte se a budete zachráněni“ (v. 38). Evangelium neobchází vinu, ale otevírá cestu z ní`,
      `Křest v Ježíšově jménu jako veřejné přijetí kérygmatu a vstup do společenství`,
      `Univerzalita zaslíbení — „vám i vašim dětem i všem vzdáleným“ (v. 39): od Jeruzaléma ke všem národům`,
      `Duch svatý jako dar spojený se křtem, nikoli zásluha`,
      `Církev vzniká z odpovědi na zvěstované Slovo, ne z lidské iniciativy`,
    ],
    applicationHints: [
      `Kázání je odpověď na Boží čin, ne samostatné dílo: teprve po vylití Ducha Petr vykládá, co Bůh udělal. Řád zůstává — nejprve Bůh, pak naše slovo`,
      `Metanoia není emocionální výkyv, ale obrat mysli a směru. Neptejme se posluchače „cítíš lítost?“, ale „měníš směr?“`,
      `„Co máme dělat?“ (v. 37) je dobrá otázka — znamená, že Slovo zasáhlo. Kazatel nemusí nutit k rozhodnutí, stačí nechat Slovo působit`,
      `Zaslíbení „vám i vzdáleným“ (v. 39) je protiotázka církvi: koho ještě mám za „vzdáleného“? Kde kreslím hranice, které Bůh nedělá?`,
      `Misericordias Domini — neděle pastýřské milosti. Petr, který Ježíše zapřel, nyní pase stádo slovem milosti. Kazatel kazuje vždy jako omilostněný, ne jako bezchybný`,
      `Tři tisíce (v. 41) nejsou Petrova zásluha, ale Boží odpověď na Petrovu odpověď. Čísla nejsou metrikou kazatele`,
    ],
    verseNotes: [
      { verse: 14, note: `„Petr … pozvedl svůj hlas“ (ἐπῆρεν τὴν φωνήν) — semitismus pro slavnostní řečnické gesto. Autorita není dána Petrovou osobou, ale Duchem, který právě sestoupil.` },
      { verse: 36, note: `„Ať ví s jistotou celý dům izraelský“ — slavnostní formulace. „Tento Ježíš, kterého jste ukřižovali“ — přímé pojmenování. Zároveň: „učinil Bůh“ (pasivum Boží aktivity) — vzkříšení je Boží akt, ne triumf lidského Ježíše.` },
      { verse: 37, note: `κατενύγησαν — „bylo jim to u srdce“ — obraz bodnutí, ne jen emocionální dojetí. Srdce v hebrejském smyslu jako sídlo vůle a rozhodování. „Co máme dělat?“ není zoufalství, ale otevřenost.` },
      { verse: 38, note: `Čtyři prvky odpovědi: (1) metanoia — obrat, (2) křest ve jménu Ježíše Krista — veřejné přihlášení, (3) odpuštění hříchů — Boží odpověď, (4) dar Ducha svatého — Boží přítomnost. Pořadí není recept, ale teologický řád: člověk se obrací, Bůh dává.` },
      { verse: 39, note: `„Vzdáleným“ (τοῖς εἰς μακρὰν) — dvojsmyslné: prostorově (diaspora, pohané) i časově (budoucí generace). Lukáš tu už otevírá dveře, kterými později projdou Kornélius (Sk 10) a Pavlovo misie k pohanům.` },
      { verse: 41, note: `„Kdo ochotně přijali jeho slovo“ (οἱ ἀποδεξάμενοι) — aktivní sloveso, ne pasivní poslechnutí. Přijetí slova je vlastní akt víry. „Asi tři tisíce“ — Lukášův stylistický kontrast k třem tisícům padlým u Sinaje (Ex 32,28): kde Zákon usmrcoval, Duch dává život.` },
    ],
  },

  // Iz 25,6–9 — Hostina na hoře — Hospodin setře slzy
  "23:25": {
    reference: `Iz 25,6–9`,
    title: `Hostina na hoře — Hospodin setře slzy`,
    context: `Úryvek z tzv. Izajášovy apokalypsy (Iz 24–27). Eschatologická hostina: Hospodin připraví hostinu pro všechny národy. Setře smrt a slzy. Řekne: „Hle, toto je náš Bůh.“ Klasický text pro neděli vzkříšení a pohřební liturgii. Mesiánská hostina jako obraz plnosti Božího království.`,
    keyWords: [
      { word: `mištéh (מִשְׁתֶּה) — hostina`, explanation: `Svatební a královská hostina. Obraz eschatologické radosti a hojnosti.` },
      { word: `bálá mavet (בִּלַּע מָוֶת) — pohltí smrt`, explanation: `Hospodin pohltí smrt (jakože Leviatan, symbol chaosu). Aluze u Pavla (1K 15,54) — při vzkříšení.` },
      { word: `dimʿáh (דִּמְעָה) — slza`, explanation: `„Hospodin setře slzy z každé tváře.“ Osobní, intimní obraz. Ozvěna u Zj 21,4.` },
    ],
    structure: `A. Hostina pro všechny národy (v. 6): tučné maso, vybraná vína. B. Odstranění smutečního šatu (v. 7): pokryv nad národy zmizí. C. Smrt pohlcena, slzy setřeny (v. 8). D. Vyznání (v. 9): toto je náš Bůh, v něm jsme doufali.`,
    theologicalThemes: [
      `Eschatologická hostina — obraz plnosti království`,
      `Univerzalita spásy — všechny národy`,
      `Vítězství nad smrtí`,
      `Boží osobní péče — setření slz`,
    ],
    applicationHints: [
      `Ideální text pro Velikonoce — hostina vzkříšení`,
      `Pro pohřby — „setře slzy“, „pohltí smrt“`,
      `Univerzalismus: hostina pro všechny národy, ne exkluzivní klub`,
      `„Toto je náš Bůh“ (v. 9) — vyznání plnosti`,
    ],
    verseNotes: [
      { verse: 6, note: `„Tučná jídla, uleželá vína“ — obraz hojnosti v arid krajině. Eschatologická štědrost.` },
      { verse: 7, note: `„Pokryv“ (lót) — smuteční rouška? Nebo příslovečný závoj na národech? Oba čtení fungují.` },
      { verse: 8, note: `„Pohltí smrt navždy“ — v kontrastu k mytologickému Motu (kanaánský bůh smrti), který pohlcuje. Pavel cituje v 1K 15,54.` },
      { verse: 9, note: `„Toto je náš Bůh, v něj jsme doufali a on nás zachránil“ — krédo eschatologického lidu.` },
    ],
  },

  // Ex 14,19–31 — Přechod přes Rudé moře
  "2:14": {
    reference: `Ex 14,19–31`,
    title: `Přechod přes Rudé moře`,
    context: `Kulminace Exodu. Izrael je u moře, před Egypťany. Mrak Hospodinův se přesune mezi faraona a Izrael. Mojžíš vztáhne ruku, Hospodin rozežene moře větrem — Izrael prochází po suchu. Egypťané jdou za nimi, vody se vrátí, všichni jsou utopeni. Izrael vidí mrtvé Egypťany na břehu. Klasický text o spáse — u Velikonoční vigilie.`,
    keyWords: [
      { word: `jam-súf (יַם־סוּף) — rákosové moře`, explanation: `„Moře rákosí“ — tradičně Rudé moře, ale pravděpodobněji sladkovodní jezero nebo bažinatá oblast severního Egypta.` },
      { word: `jašaʿ (יָשַׁע) — zachránit`, explanation: `V. 30: „Hospodin toho dne zachránil Izrael.“ Kořen slova Ježíš/Jozue. Exodus jako Boží paradigmatický akt spásy.` },
      { word: `jírʾáh (יִרְאָה) — bázeň`, explanation: `V. 31: „Lid se bál Hospodina a věřil v Hospodina.“ Bázeň = úcta, ne hrůza. Základ víry.` },
    ],
    structure: `A. Mrak Hospodinův se posouvá (v. 19–20): mezi Izrael a Egypt. B. Rozdělení moře (v. 21–22): vítr, suchá cesta. C. Egypťané pronásledují (v. 23–25): chaos v jejich vozech. D. Návrat vod (v. 26–28): Egypťané utopeni. E. Izrael vidí a věří (v. 29–31): bázeň, víra v Hospodina a Mojžíše.`,
    theologicalThemes: [
      `Exodus jako paradigmatický akt Boží spásy`,
      `Voda jako hranice mezi otroctvím a svobodou (křestní typologie)`,
      `Boží vítězství nad chaosem`,
      `Křest jako přechod přes Rudé moře (1K 10,1–2)`,
    ],
    applicationHints: [
      `Velikonoční vigilie: čtení s mohutným obrazem vysvobození`,
      `Křestní typologie: křest jako průchod vodami`,
      `„Hospodin bude bojovat za vás“ (v. 14) — motto pro zkoušky víry`,
      `Moment „bázně a víry“ (v. 31) jako jádro víry`,
    ],
    verseNotes: [
      { verse: 21, note: `„Silný východní vítr“ — Bůh jedná skrze přírodu, ne proti ní. Zázrak není proti stvoření, ale skrze ně.` },
      { verse: 22, note: `„Voda jim byla zdí napravo i nalevo“ — obraz plné Boží ochrany.` },
      { verse: 28, note: `„Ani jeden nezůstal“ — totální porážka egyptského vojska. Ne žádná lidská síla.` },
      { verse: 31, note: `„Uvěřili v Hospodina a v jeho služebníka Mojžíše“ — víra v Boha jde skrze jeho prostředníky.` },
    ],
  },

  // ==================== CYCLE B — Mark highlights ====================

  // Mk 1,1–13 — Počátek evangelia — Jan Křtitel, křest, pokušení
  "41:1": {
    reference: `Mk 1,1–13`,
    title: `Počátek evangelia — Jan Křtitel, křest, pokušení`,
    context: `Marek otevírá evangelium programovou větou: „Počátek evangelia Ježíše Krista, Syna Božího.“ Žádné dětství, žádný rodokmen — rovnou plný rozjezd. Jan Křtitel, Ježíšův křest s hlasem z nebe, 40 dní pokušení. Markův charakteristický „okamžitě“ (euthys) udává tempo. Tento text se čte v Adventu a Svatodušní vigilii roku B.`,
    keyWords: [
      { word: `archē (ἀρχή) — počátek`, explanation: `Echo Gn 1,1 a J 1,1. Nové stvoření začíná.` },
      { word: `euangelion (εὐαγγέλιον) — evangelium`, explanation: `Radostná zvěst. V římské tradici ohlášení císařova vítězství nebo narození. Marek to zabírá pro Krista.` },
      { word: `euthys (εὐθύς) — ihned`, explanation: `Markův tagu slovo, 41× v textu. Udává dynamiku, urgentnost.` },
    ],
    structure: `A. Nadpis (v. 1): evangelium o Kristu. B. Jan Křtitel (v. 2–8): Izajáš, pouště, křest pokání. C. Ježíšův křest (v. 9–11): hlas z nebe. D. Pokušení (v. 12–13): 40 dní, Satan, andělé.`,
    theologicalThemes: [
      `Počátek evangelia jako nové stvoření`,
      `Kristus jako naplnění SZ proroctví`,
      `Křest jako identifikace Syna Otcem`,
      `Duch vede do pouště i z pouště`,
    ],
    applicationHints: [
      `Marek ostře a rychle — model pro evangelium bez okolků`,
      `„Syn Boží“ (v. 1) — varianty rukopisů, ale Markův klíč`,
      `Pokušení ve 2 verších — Marek nevysvětluje, jen pojmenuje realitu`,
      `Pro advent roku B: radostná zvěst přichází s výzvou k pokání`,
    ],
    verseNotes: [
      { verse: 1, note: `„Počátek“ (archē) — echo Gn 1,1. Evangelium je nová Genesis.` },
      { verse: 2, note: `Citace Mal 3,1 + Iz 40,3 — kombinace. Marek připisuje celé Izajášovi (Semitský usus).` },
      { verse: 10, note: `„Schizomenous“ (rozevírá se) — silný obraz. Zopakuje se u kříže (15,38 — roztržená opona).` },
      { verse: 11, note: `„Milovaný Synu, v tobě jsem nalezl zalíbení“ — aluze na Ž 2,7 a Iz 42,1 (trpící Služebník).` },
      { verse: 13, note: `„S divokými zvířaty“ — typicky Markovská poznámka. Edenský obraz — Kristus obnovuje vztah člověka ke stvoření.` },
    ],
  },

  // Mk 4,26–34 — Podobenství o rostoucím semenu a hořčici
  "41:4": {
    reference: `Mk 4,26–34`,
    title: `Podobenství o rostoucím semenu a hořčici`,
    context: `Dvě podobenství o Božím království v Markově kapitole 4. První — růst rostlinky, aniž hospodář ví jak. Druhé — hořčičné zrnko, nejmenší, ze kterého vyroste keř pro ptactvo. Obě podobenství mluví o Božím království jako o skrytě rostoucí skutečnosti — od nepatrného počátku k nečekané plnosti. 11. neděle v mezidobí (rok B).`,
    keyWords: [
      { word: `basileia (βασιλεία) — království`, explanation: `Boží vláda, ne místo. U Marka a Ježíše centrální pojem.` },
      { word: `automatē (αὐτομάτη) — samo od sebe`, explanation: `„Země vydává plody sama od sebe“ (v. 28). Tajemství růstu — mimo lidskou kontrolu.` },
      { word: `kokkos sinapeōs (κόκκος σινάπεως) — hořčičné zrno`, explanation: `Hyperbola — nejmenší ze semen, ale roste ve velkou rostlinu. Palestinská hořčice.` },
    ],
    structure: `A. Podobenství o rostoucím semenu (v. 26–29): hospodář seje, spí, rostlina roste, sklizeň. B. Podobenství o hořčici (v. 30–32): malé zrno, velký keř. C. Poznámka o podobenstvích (v. 33–34): Ježíš mluvil v podobenstvích, ale u učedníků vykládal.`,
    theologicalThemes: [
      `Boží království roste tajemně, ne organizací`,
      `Malé počátky, velké konce`,
      `Role člověka: zasít, čekat, sklidit`,
      `Království je pro všechny (ptáci ve větvích)`,
    ],
    applicationHints: [
      `Nemusíme kontrolovat růst Božího království`,
      `„Sám nevím jak“ — pokorná teologie zpívá s podobenstvím`,
      `Malé křesťanské aktivity mají neviditelný vliv`,
      `Útěcha pro unavené služebníky — růst není jejich dílo`,
    ],
    verseNotes: [
      { verse: 27, note: `„Spí a vstává noc a den“ — lidská pasivita vs. Boží aktivita. Zdravý rytmus.` },
      { verse: 28, note: `„Sama od sebe“ (automatē) — řecké slovo. Země má „autonomní“ sílu, kterou stvořil Bůh.` },
      { verse: 31, note: `„Nejmenší ze všech semen“ — Ježíšova hyperbola. Ve skutečnosti existují menší. Nemusíme brát doslovně.` },
      { verse: 32, note: `„Ptáci nebes“ — aluze na Ez 17,23 (podobenství o cedru). Podobenství evokuje imperiální obrazy a obrací je.` },
    ],
  },

  // Mk 10,17–31 — Bohatý mladík a velbloud uchem jehly
  "41:10": {
    reference: `Mk 10,17–31`,
    title: `Bohatý mladík a velbloud uchem jehly`,
    context: `Cesta do Jeruzaléma. Mladý muž běží za Ježíšem: co mám dělat, abych dosáhl věčného života? Ježíš cituje přikázání — on je zachovává od mládí. Ježíš ho „zamiloval si“ a řekl: jedno ti chybí, prodej všechno a pojď za mnou. Muž odejde smutný, protože má mnoho majetku. Ježíš mluví o obtížnosti vstupu bohatých do Božího království. Učedníci jsou zděšení. 28. neděle v mezidobí (rok B).`,
    keyWords: [
      { word: `agathos (ἀγαθός) — dobrý`, explanation: `„Učiteli dobrý“ — Ježíš odmítá pochlebování: „Proč mě nazýváš dobrým? Nikdo není dobrý, jedině Bůh.“` },
      { word: `agapaó (ἀγαπάω) — milovat`, explanation: `V. 21: „Ježíš si ho zamiloval“. Jediné místo v Markovi, kde Ježíš „miluje“ konkrétní osobu. Ne zklamání, ale láska.` },
      { word: `kamēlos (κάμηλος) — velbloud`, explanation: `Hyperbolický obraz. Velbloud uchem jehly = nemožnost. Exegetické domněnky o „bráně velblouda“ jsou pozdější, bez základu.` },
    ],
    structure: `A. Otázka muže (v. 17–20): co mám dělat? Zachovává přikázání. B. Výzva k chudobě (v. 21–22): Ježíš ho miluje, ale muž odchází smutný. C. Komentář o bohatých (v. 23–27): velbloud uchem jehly. D. Petrova otázka o odměně (v. 28–31): my jsme všechno opustili.`,
    theologicalThemes: [
      `Majetek jako překážka v následování`,
      `Dobré skutky nestačí — potřeba radikálního obratu`,
      `Ježíšova láska i k tomu, kdo odchází`,
      `Boží království proti lidské kalkulaci`,
    ],
    applicationHints: [
      `Text výzvou i těm, kdo zachovávají přikázání — ještě něco schází`,
      `„Jedno ti chybí“ — Ježíš identifikuje konkrétní překážku`,
      `Ježíš miluje i toho, kdo odejde — neodsouvá, ale zve`,
      `„U lidí nemožné, u Boha možné“ — evangelní naděje i pro bohaté`,
    ],
    verseNotes: [
      { verse: 17, note: `„Poklekl“ před Ježíšem — respekt. Ale mladík hledá „věčný život“ — ne království Boží, ne Krista.` },
      { verse: 19, note: `Ježíš cituje druhou tabulku Desatera + „neokrádej“ (možná odkaz na nespravedlivé bohatství).` },
      { verse: 21, note: `„Zamiloval si ho“ — Ježíšův pohled vyjadřuje lásku. Jeho výzva není trest, ale lékař.` },
      { verse: 22, note: `„Měl mnoho majetku“ — poslední slovo kapitoly. Majetek měl jeho, ne on majetek.` },
      { verse: 25, note: `Velbloud uchem jehly — hyperbola. Nelze to změkčit domněnkami o „nízké bráně“.` },
      { verse: 27, note: `„U Boha je možné všechno“ — naděje i pro bohaté. Spása je Boží dar, ne lidský výkon.` },
    ],
  },

  // Mk 13,24–37 — Konec věku a výzva k bdělosti
  "41:13": {
    reference: `Mk 13,24–37`,
    title: `Konec věku a výzva k bdělosti`,
    context: `Markova „malá apokalypsa“ (kap. 13). Ježíš mluví o soužení dnů a příchodu Syna člověka. Hvězdy budou padat, síly nebes otřeseny. Syn člověka přijde v oblacích s velkou mocí. Nikdo nezná ten den a hodinu — jen Otec. Proto bděte! 1. neděle adventní (rok B).`,
    keyWords: [
      { word: `parousia (παρουσία) — příchod`, explanation: `Slavnostní příchod krále. U Marka zatím neexplicitně — „přijde“ Syn člověka.` },
      { word: `gregoréō (γρηγορέω) — bdít`, explanation: `Hlavní sloveso závěru. Ne strach, ale aktivní čekání.` },
      { word: `eklektos (ἐκλεκτός) — vyvolený`, explanation: `Shromáždění vyvolených ze čtyř stran — eschatologické shromáždění Božího lidu.` },
    ],
    structure: `A. Kosmické úkazy (v. 24–25): slunce, měsíc, hvězdy. B. Příchod Syna člověka (v. 26–27): shromáždění vyvolených. C. Podobenství fíkovníku (v. 28–31): znamení blízkosti. D. Neznalost dne (v. 32): jen Otec. E. Bdělost (v. 33–37): jako služebníci očekávající pána.`,
    theologicalThemes: [
      `Eschatologická naděje — Kristus přijde`,
      `Neznalost času jako teologické gesto — Bůh je svrchovaný`,
      `Bdělost jako aktivní víra`,
      `Shromáždění vyvolených — univerzální aspekt`,
    ],
    applicationHints: [
      `1. advent s apokalyptickým textem — výzva ke vnímavosti`,
      `„Bděte“ opakováno 4×. Markova pedagogická výzva`,
      `Ne strach, ale pozornost — Kristus přichází`,
      `Advent: víra není pasivní čekání, ale aktivní bdělost`,
    ],
    verseNotes: [
      { verse: 26, note: `„Syn člověka v oblacích“ — aluze na Dan 7,13. Apokalyptický jazyk.` },
      { verse: 32, note: `„Ani Syn“ — pozoruhodné přiznání. Ježíš nezná hodinu — teologický problém (Markovská christologie).` },
      { verse: 33, note: `„Bděte“ — Markovi leží na srdci. Celé evangelium vede k tomu, abychom neusnuli.` },
      { verse: 37, note: `„Říkám všem: Bděte“ — výzva není jen pro učedníky u hory, ale pro celou církev.` },
    ],
  },

  // Mk 16,1–8 — Prázdný hrob — konec evangelia podle Marka
  "41:16": {
    reference: `Mk 16,1–8`,
    title: `Prázdný hrob — konec evangelia podle Marka`,
    context: `Původní závěr Markova evangelia (16,9–20 je pozdější dodatek). Ženy jdou k hrobu s vonnými mastmi. Kámen je odvalen. Mladík v bílém říká: „Vstal, není zde.“ Ženy utíkají s bázní a děsem — „nikomu nic neřekly, protože se bály.“ Nečekaný konec — bez zjevení Vzkříšeného, bez radosti, s otevřenou otázkou čtenáři. Hod Boží velikonoční (rok B).`,
    keyWords: [
      { word: `egerthē (ἠγέρθη) — byl vzkříšen`, explanation: `Pasivum divinum — Bůh ho vzkřísil. Ne aktivní sloveso.` },
      { word: `ephobounto (ἐφοβοῦντο) — bály se`, explanation: `Poslední slovo Marka. Ne radost, ale bázeň. Teologicky nabitý konec.` },
      { word: `neaniskos (νεανίσκος) — mladík`, explanation: `V bílém — anděl, ne výslovně. Možná aluze na Mk 14,51 (mladík utíkající nahý) — teď oblečený v bílém.` },
    ],
    structure: `A. Cesta k hrobu (v. 1–4): ženy, masti, starost o kámen, nalezení odvaleného. B. Mladík v hrobě (v. 5–7): vstal, řekněte učedníkům a Petrovi. C. Reakce žen (v. 8): utekly, nic nikomu neřekly, bály se.`,
    theologicalThemes: [
      `Vzkříšení jako Boží akt, ne lidský zážitek`,
      `Bázeň jako pravá reakce na Boží akt`,
      `Otevřený konec — čtenář musí rozhodnout`,
      `Ženy jako první svědkyně`,
    ],
    applicationHints: [
      `Originální konec Marka šokuje — bázeň, ne triumf`,
      `„Jde před vámi do Galileje“ — Vzkříšený nás vede tam, kde služba začala`,
      `Kde je čtenář? Markuv konec vyzývá k osobnímu rozhodnutí`,
      `Velikonoční bázeň je autentická reakce — ne povrchní radost`,
    ],
    verseNotes: [
      { verse: 1, note: `„Když minula sobota“ — ženy chtějí dokončit pohřební obřad. Praktická zbožnost.` },
      { verse: 3, note: `„Kdo nám odvalí kámen?“ — problém, který si uvědomí až po cestě. Ale Bůh už dávno vyřešil.` },
      { verse: 6, note: `„Nazaretský Ježíš, ten ukřižovaný“ — v jednom oddechu je identifikován jak jeho pozemské poslání, tak jeho utrpení.` },
      { verse: 7, note: `„A Petrovi“ — zvláště jmenován. Petr, který zapřel, je znovu přijat.` },
      { verse: 8, note: `„Nic nikomu neřekly“ — šokující konec. Marek vyzývá čtenáře: ale ty řekneš?` },
    ],
  },

  // ==================== CYCLE C — Luke highlights ====================

  // Lk 1,26–56 — Zvěstování a Magnificat
  "42:1": {
    reference: `Lk 1,26–56`,
    title: `Zvěstování a Magnificat`,
    context: `Lukášovo evangelium dětství. Archanděl Gabriel přichází k Marii v Nazaretu. Zvěstuje jí narození Ježíše. Maria se ptá: jak se to stane? Gabriel odpovídá: Duch svatý na tebe sestoupí. Maria přijímá: „Hle, služebnice Páně.“ Jde navštívit Alžbětu, která je v požehnaném stavu. Alžběta blahoslaví Marii. Maria zpívá Magnificat — velikonoční zpěv, jeden z vrcholů lukášovské teologie. 4. advent (rok B/C).`,
    keyWords: [
      { word: `chairein (χαίρειν) — raduj se`, explanation: `„Raduj se, milostiplná!“ (v. 28). Anděl ji nezdraví klasicky, ale vyzývá k radosti.` },
      { word: `kecharitōmené (κεχαριτωμένη) — omilostněná`, explanation: `Perfektum pasivum od charizomai. Maria je v stavu Boží milosti.` },
      { word: `tapeinōsis (ταπείνωσις) — nízkost, ponížení`, explanation: `V. 48: „Pohlédl na nízkost své služebnice.“ Klíčové slovo Magnificat — Bůh si všímá nízkých.` },
    ],
    structure: `A. Gabrielovo zvěstování (v. 26–38): Bůh, moc Nejvyššího, Marie přijímá. B. Návštěva u Alžběty (v. 39–45): dítě v lůně vyskočilo radostí. C. Magnificat (v. 46–55): velikonoční chvalozpěv o Boží obratu dějin. D. Návrat (v. 56).`,
    theologicalThemes: [
      `Vtělení skrze souhlas Marie — Bůh nenuzí`,
      `Boží dějinný obrat — povyšuje ponížené, sesazuje mocné`,
      `Magnificat jako politická teologie chudých`,
      `Marie jako první učednice`,
    ],
    applicationHints: [
      `„Hle, služebnice Páně“ — model víry, souhlasu s Božím plánem`,
      `Magnificat — radikální politický hymnus, ne sladká mariánská píseň`,
      `„Sesadil mocné z trůnů“ (v. 52) — výzva k sociální představivosti`,
      `4. advent: vzdálení od konzumního chaosu, hluboké čekání`,
    ],
    verseNotes: [
      { verse: 31, note: `„Nazveš ho Ježíš“ — Maria pojmenuje. Aktivní role v Lukášovi.` },
      { verse: 34, note: `„Jak se to stane, když muže nepoznávám?“ — Maria se neptá nevěrecky, ale otevřeně.` },
      { verse: 38, note: `„Ať se mi stane podle tvého slova“ — fiat. Aktivní souhlas, ne pasivita.` },
      { verse: 46, note: `Magnificat začíná „Velebí má duše Pána“ — aluze na Annin chvalozpěv (1Sam 2,1–10).` },
      { verse: 52, note: `„Sesadil mocné z trůnů, povýšil ponížené“ — sociální obrat. Magnificat čte boží dějinné působení.` },
    ],
  },

  // Lk 2,1–20 — Narození v Betlémě a pastýři
  "42:2": {
    reference: `Lk 2,1–20`,
    title: `Narození v Betlémě a pastýři`,
    context: `Klasický vánoční text. Dekret Augustův o sčítání lidu. Josef a Maria jdou do Betléma. Maria porodí — jesle, ne hostinec. Pastýři na poli — andělé oznamují narození Spasitele. „Chvála Bohu na nebesích a pokoj lidem dobré vůle“ (v. 14). Pastýři jdou, vidí a vracejí se, chválíce Boha. Maria uchovává všechny tyto věci v srdci. Hod Boží vánoční (v noci, všechny cykly).`,
    keyWords: [
      { word: `fatnē (φάτνη) — jesle`, explanation: `Krmelec pro zvířata. Narození v chlévu, ne v pokoji pro hosty (katalyma).` },
      { word: `kleisma (κλεῖσμα) — místo pro hosty`, explanation: `„Nebylo pro ně místo v hostinci“ — katalyma může znamenat i „pokoj pro hosty“ v soukromém domě.` },
      { word: `eudokia (εὐδοκία) — dobrá vůle, zalíbení`, explanation: `„Lidem dobré vůle“ nebo „lidem zalíbení“ — Boží zalíbení v lidech, ne jejich mravní stav.` },
    ],
    structure: `A. Historický kontext (v. 1–5): Augustus, sčítání, cesta do Betléma. B. Narození (v. 6–7): porod, jesle. C. Pastýři (v. 8–14): andělské zjevení, chvalozpěv. D. Pastýři v Betlémě (v. 15–20): nalezení, vyprávění, návrat.`,
    theologicalThemes: [
      `Vtělení v konkrétní historické situaci`,
      `Chudoba jako místo Boží přítomnosti`,
      `Pastýři — nečistí, margínální — prvními svědky`,
      `Maria jako meditující teoložka („uchovávala v srdci“)`,
    ],
    applicationHints: [
      `Dekret Augustův vs. Boží plán — kdo vlastně vládne?`,
      `„Nebylo pro ně místo“ — kde by ho nebylo i dnes?`,
      `Pastýři — aristokracie víry? Boží výběr je obrácen`,
      `„Pokoj lidem“ — politické echo proti Pax Romana`,
    ],
    verseNotes: [
      { verse: 1, note: `Kvirínius a sčítání — historický problém (chronologie), ale Lukášovi jde o teologické zasazení.` },
      { verse: 7, note: `„Prvorozeného syna“ — právní termín. Nezávislé na tom, zda byli další.` },
      { verse: 14, note: `„Lidem dobré vůle“ — eudokia v genitivu = lidem jeho zalíbení. Boží zalíbení v lidech.` },
      { verse: 19, note: `„Maria všechno uchovávala a rozvažovala“ — model pro meditaci Písma.` },
    ],
  },

  // Lk 4,14–30 — Ježíš v Nazaretu — programová řeč
  "42:4": {
    reference: `Lk 4,14–30`,
    title: `Ježíš v Nazaretu — programová řeč`,
    context: `Lukášova programová scéna. Ježíš se vrací do Nazaretu, jde v sobotu do synagógy, čte Iz 61: „Duch Hospodinův je nade mnou… poslal mě zvěstovat chudým radostnou zprávu.“ Vyhlašuje: „Dnes se naplnilo toto písmo.“ Zpočátku údiv, pak hněv: chce je podle Eliáše a Elizea připomenout, že Boží milost jde i mimo Izrael. Lidé se rozzlobí, chtějí ho shodit ze skály, ale Ježíš projde středem nich. 3. neděle po Zjevení (rok C).`,
    keyWords: [
      { word: `apostalken (ἀπέσταλκεν) — poslal`, explanation: `Ježíš identifikuje své poslání s prorockým posláním — pomazaný, poslaný.` },
      { word: `kēryxai (κηρύξαι) — hlásat`, explanation: `Veřejné vyhlášení dobré zprávy. Ne soukromá zbožnost, ale veřejná zvěst.` },
      { word: `eniauton dektón (ἐνιαυτὸν δεκτόν) — milostivé léto`, explanation: `Jubilejní rok (Lv 25). Odpuštění dluhů, propuštění otroků, navrácení země.` },
    ],
    structure: `A. Návrat do Galileje a Nazaretu (v. 14–16). B. Čtení Iz 61 a programová výpověď (v. 17–21): Duch, chudí, slepí, utlačovaní, milostivé léto. C. Reakce: údiv (v. 22), Ježíšova provokace (v. 23–27). D. Hněv a pokus zabít (v. 28–30).`,
    theologicalThemes: [
      `Jubilejní rok jako paradigmal Ježíšovy služby`,
      `Sociální a ekonomická dimenze evangelia`,
      `Boží milost nad hranicemi Izraele — Eliáš a Elizeus`,
      `Proroka nepřijímají doma`,
    ],
    applicationHints: [
      `Programová řeč — co Ježíš prohlásí za svoji práci`,
      `„Dnes se naplnilo“ — Ježíš je klíčem k Písmu`,
      `Chudí, zajatí, slepí, utlačovaní — konkrétní adresáti`,
      `Domov jako nejobtížnější místo pro proroka`,
    ],
    verseNotes: [
      { verse: 18, note: `Iz 61,1–2 + 58,6. Ježíš vynechává „den pomsty“ — jeho poslání je pouze milost.` },
      { verse: 21, note: `„Dnes se naplnilo“ — lukášovské dnes. Království je přítomné.` },
      { verse: 25, note: `Eliáš a vdova z Sareptské — pohanka. Ježíš připomíná univerzální Boží milost.` },
      { verse: 30, note: `„Prošel mezi nimi a odešel“ — tajemné přežití. Jeho čas ještě nepřišel.` },
    ],
  },

  // Lk 10,25–37 — Milosrdný Samařan
  "42:10": {
    reference: `Lk 10,25–37`,
    title: `Milosrdný Samařan`,
    context: `Zákoník se ptá Ježíše: co mám dělat, abych dosáhl věčného života? Ježíš mu odpoví: co je psáno v Zákoně? Zákoník cituje: milovat Boha a bližního. Ježíš: správně. Ale zákoník se chce ospravedlnit: kdo je můj bližní? Ježíš odpovídá podobenstvím o Samařanovi, který pomohl zraněnému na cestě z Jeruzaléma do Jericha — když kněz i levita prošli kolem. Ježíš obrátí otázku: kdo se stal bližním? Zákoník: ten, kdo prokázal milosrdenství. „Jdi a jednej také tak.“ 15. neděle v mezidobí (rok C).`,
    keyWords: [
      { word: `plēsion (πλησίον) — bližní`, explanation: `Kdo je můj bližní? Ježíš obrací otázku: komu se stanu bližním?` },
      { word: `splagchnizomai (σπλαγχνίζομαι) — slitovat se`, explanation: `V. 33: Samařan „se pohnul soucitem“. Typicky evangelní reakce — Ježíše často dojme soucit.` },
      { word: `eleos (ἔλεος) — milosrdenství`, explanation: `V. 37: „Ten, kdo prokázal milosrdenství.“ Milosrdenství = eleos. Ne jen cit, ale čin.` },
    ],
    structure: `A. Zákoníkova otázka (v. 25–29): co mám dělat? Kdo je bližní? B. Podobenství (v. 30–35): muž na cestě, kněz, levita, Samařan. C. Ježíšova otázka (v. 36): kdo se stal bližním? D. Výzva (v. 37): jdi a jednej tak.`,
    theologicalThemes: [
      `Bližní se nevymezuje kategorií, ale činem`,
      `Kněz a levita — náboženská zbožnost bez milosrdenství`,
      `Samařan — nepřítel jako nositel Božího milosrdenství`,
      `Milosrdenství jako vnitřní pohyb k činu`,
    ],
    applicationHints: [
      `Nejslavnější Ježíšovo podobenství. Riziko otupění`,
      `„Kněz šel kolem“ — riziko nábožensky zaujatých`,
      `Samařan — proti etnické linii. Aktualizace: koho vnímáme jako „nepřítele“?`,
      `„Jdi a jednej také tak“ — aktivní pokračování`,
    ],
    verseNotes: [
      { verse: 29, note: `„Chtěl se ospravedlnit“ — zákoník hledá limity. Ježíš jeho otázku přemění.` },
      { verse: 30, note: `Jeruzalém → Jericho — klesání cca 1000 m. Cesta byla nebezpečná, plná loupežníků.` },
      { verse: 31, note: `Kněz — možná nečistota z kontaktu s mrtvolou? Ale to by bylo výmluvou. Pravda: neochota vtáhnout se.` },
      { verse: 33, note: `Samařan — etnický a náboženský nepřítel. Radikalita volby Ježíše.` },
      { verse: 37, note: `„Ten, kdo prokázal milosrdenství“ — zákoník nemůže vyslovit slovo „Samařan“. Ale uznal jednání.` },
    ],
  },

  // Lk 15,11–32 — Podobenství o marnotratném synu — o dvou synech
  "42:15": {
    reference: `Lk 15,11–32`,
    title: `Podobenství o marnotratném synu — o dvou synech`,
    context: `Lukášova kapitola 15 — tři podobenství o ztraceném a nalezeném: ovce, mince, syn. Kontext: farizeové reptají, že Ježíš přijímá hříšníky. Podobenství o otci a dvou synech: mladší si vyžádá dědictví, promarní v cizině, vrátí se s vyznáním. Otec ho přijme s radostí. Starší syn se hněvá: sloužím ti, a ty jsi mi nikdy nedal kůzle. Otec: dítě, vše mé je tvé, ale je třeba se radovat — bratr byl mrtvý a žije. 4. neděle postní (rok C).`,
    keyWords: [
      { word: `splagchnizomai (σπλαγχνίζομαι) — slitovat se`, explanation: `V. 20: „Otec se nad ním slitoval.“ Stejné slovo jako u Samařana — Boží útrobní pohyb lásky.` },
      { word: `nekros (νεκρός) — mrtvý`, explanation: `Otec dvakrát říká: byl mrtvý a žije (v. 24, 32). Metafora odloučení = smrt; návrat = vzkříšení.` },
      { word: `diaskorpizō (διασκορπίζω) — rozházet`, explanation: `V. 13: „Promarnil své jmění“ — rozhodil, rozptýlil. Hebrejsky: bezhlavost.` },
    ],
    structure: `A. Mladší syn a dědictví (v. 11–13): odejde, promarní. B. Pád a rozhodnutí (v. 14–19): hlad, prasata, návrat s připravenou řečí. C. Otcovo přijetí (v. 20–24): bez slov ho obejme, oblékne, hoduje. D. Starší syn (v. 25–32): hněv, otec vychází i k němu.`,
    theologicalThemes: [
      `Boží láska bez podmínek — otec běží vstříc`,
      `Pokání jako návrat, ne výkon`,
      `Dvě formy ztracenosti: odchod (mladší) a sobecká poslušnost (starší)`,
      `Otec vychází ke všem — mladšímu i staršímu`,
    ],
    applicationHints: [
      `Asi nejslavnější Ježíšovo podobenství. Nutno jít hlouběji`,
      `Mladší syn: Boží milost pro „propadlíky“`,
      `Starší syn: pozor na sobeckou věrnost — také jsem „mimo“`,
      `Otevřený konec — vejde starší do hostiny?`,
    ],
    verseNotes: [
      { verse: 12, note: `„Dej mi to, co na mě připadá“ — mladší syn si vyžaduje podíl, jako by otec zemřel. Urážlivé.` },
      { verse: 16, note: `„Pást prasata“ — nejhorší pozice pro Žida. Naprostý pád.` },
      { verse: 20, note: `„Ještě byl daleko“ — otec ho viděl předem. „Běžel mu naproti“ — starší muž neběhal, neslušné. Extravagantní láska.` },
      { verse: 22, note: `Roucho, prsten, sandály — znaky plného synovství, ne jen pracovní role. Otec ho nereintegroval jako služebníka.` },
      { verse: 29, note: `„Tolik let ti sloužím“ — starší syn odhaluje svou orientaci: sloužím (otročím), ne synim.` },
      { verse: 32, note: `„Bylo třeba hodovat a radovat se“ — Boží jinakost. Otec nevysvětluje, prostě pozývá.` },
    ],
  },

};

/**
 * Get commentary for a chapter or pericope.
 *
 * Lookup order:
 *  1. Pericope-specific key `"{book}:{chapter}:{start}-{end}"` whose verse
 *     range contains `verseStart` (or `verseEnd`, if provided).
 *  2. Chapter-wide key `"{book}:{chapter}"` as fallback.
 *
 * Used when a single chapter has multiple distinct lectionary readings —
 * e.g. Sk 2,1-13 (Letnice) vs Sk 2,14a.36-41 (Petrovo kázání).
 */
export function getCommentary(
  bookNumber: number,
  chapter: number,
  verseStart?: number | null,
  verseEnd?: number | null
): PericopeCommentary | null {
  if (verseStart != null) {
    const prefix = `${bookNumber}:${chapter}:`;
    for (const key of Object.keys(COMMENTARY)) {
      if (!key.startsWith(prefix)) continue;
      const m = key.slice(prefix.length).match(/^(\d+)-(\d+)$/);
      if (!m) continue;
      const start = parseInt(m[1], 10);
      const end = parseInt(m[2], 10);
      if (verseStart >= start && verseStart <= end) return COMMENTARY[key];
      if (verseEnd != null && verseEnd >= start && verseEnd <= end) return COMMENTARY[key];
    }
  }
  return COMMENTARY[`${bookNumber}:${chapter}`] || null;
}

/**
 * Does a pericope-specific (verse-range) commentary exist for this location?
 * Used by UI to decide whether to skip the chapter-level Supabase fetch,
 * which would otherwise overwrite the more precise local pericope match.
 */
export function hasPericopeCommentary(
  bookNumber: number,
  chapter: number,
  verseStart?: number | null,
  verseEnd?: number | null
): boolean {
  if (verseStart == null) return false;
  const prefix = `${bookNumber}:${chapter}:`;
  for (const key of Object.keys(COMMENTARY)) {
    if (!key.startsWith(prefix)) continue;
    const m = key.slice(prefix.length).match(/^(\d+)-(\d+)$/);
    if (!m) continue;
    const start = parseInt(m[1], 10);
    const end = parseInt(m[2], 10);
    if (verseStart >= start && verseStart <= end) return true;
    if (verseEnd != null && verseEnd >= start && verseEnd <= end) return true;
  }
  return false;
}
