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
