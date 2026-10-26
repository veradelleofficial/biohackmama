/**
 * Ocena składu produktu według zasad low-tox BioHackMama.
 *
 * Dane pochodzą z Open Food Facts (jedzenie) i Open Beauty Facts (kosmetyki).
 * Jedzenie oceniamy głównie po kodach dodatków E (niezależne od języka etykiety)
 * i znacznikach składników, a dodatkowo po tekście składu. Kosmetyki po nazwach INCI.
 *
 * Każde trafienie odejmuje gwiazdki: "unikaj" = 2, "ograniczaj" = 1. Start 5, minimum 1.
 * Ocena ma charakter edukacyjny i nie jest poradą medyczną.
 */

export type Severity = 'avoid' | 'limit'
export type ProductKind = 'food' | 'cosmetic'

export interface Flag {
  id: string
  name: string
  severity: Severity
  reason: string
}

export interface ProductInput {
  kind: ProductKind
  ingredientsText: string
  additives: string[] // np. "en:e621"
  ingredientTags: string[] // np. "en:glucose-fructose-syrup"
  analysisTags: string[] // np. "en:palm-oil"
  nova?: number | null
}

export interface ScoreResult {
  stars: 1 | 2 | 3 | 4 | 5
  verdict: 'buy' | 'alternative' | 'avoid'
  verdictLabel: string
  verdictText: string
  flags: Flag[]
  hasIngredients: boolean
}

interface Rule {
  id: string
  name: string
  severity: Severity
  reason: string
  additives?: string[] // bez prefiksu, np. "e621"
  tags?: string[] // fragmenty znaczników składników
  text?: RegExp
}

const FOOD_RULES: Rule[] = [
  {
    id: 'aspartam',
    name: 'Aspartam (E951)',
    severity: 'avoid',
    reason: 'Syntetyczny słodzik. WHO (IARC) w 2023 uznała go za możliwie rakotwórczy.',
    additives: ['e951'],
    text: /aspartam/i,
  },
  {
    id: 'slodziki',
    name: 'Słodziki syntetyczne (acesulfam K, sukraloza, sacharyna)',
    severity: 'avoid',
    reason: 'Sztuczna słodycz bez kalorii, która w badaniach zaburza mikrobiom jelit.',
    additives: ['e950', 'e954', 'e955', 'e962'],
    text: /acesulfam|sukraloz|sucralose|sacharyn|saccharin/i,
  },
  {
    id: 'azotyny',
    name: 'Azotyny i azotany (E249 do E252)',
    severity: 'avoid',
    reason: 'Konserwant wędlin. Podczas smażenia może tworzyć nitrozoaminy.',
    additives: ['e249', 'e250', 'e251', 'e252'],
    text: /azotyn|azotan|nitrite|nitrate/i,
  },
  {
    id: 'barwniki-azowe',
    name: 'Barwniki azowe (E102, E104, E110, E122, E124, E129)',
    severity: 'avoid',
    reason: 'W UE wymagają ostrzeżenia, że mogą wpływać na aktywność i uwagę u dzieci.',
    additives: ['e102', 'e104', 'e110', 'e122', 'e124', 'e129'],
    text: /tartrazyn|żółcień chinolinowa|żółcień pomarańczowa|azorubin|czerwień koszenilowa a|czerwień allura/i,
  },
  {
    id: 'tio2',
    name: 'Dwutlenek tytanu (E171)',
    severity: 'avoid',
    reason: 'Od 2022 zakazany w żywności w UE. Może być w starszych lub importowanych produktach.',
    additives: ['e171'],
    text: /dwutlenek tytanu|titanium dioxide/i,
  },
  {
    id: 'bha-bht',
    name: 'BHA i BHT (E320, E321)',
    severity: 'avoid',
    reason: 'Syntetyczne przeciwutleniacze badane pod kątem zaburzania gospodarki hormonalnej.',
    additives: ['e320', 'e321'],
  },
  {
    id: 'trans',
    name: 'Tłuszcze utwardzone',
    severity: 'avoid',
    reason: 'Źródło tłuszczów trans, które podnoszą zły cholesterol.',
    tags: ['hydrogenated'],
    text: /utwardzon|uwodornion|hydrogenated/i,
  },
  {
    id: 'syrop-gf',
    name: 'Syrop glukozowo-fruktozowy',
    severity: 'avoid',
    reason: 'Mocno przetworzony cukier, który szczególnie obciąża wątrobę.',
    tags: ['glucose-fructose-syrup', 'fructose-glucose-syrup', 'high-fructose-corn-syrup'],
    text: /syrop glukozowo[- ]fruktozowy|syrop fruktozowo[- ]glukozowy|high[- ]fructose corn syrup|glucose[- ]fructose syrup/i,
  },
  {
    id: 'glutaminian',
    name: 'Glutaminian sodu (E621) i wzmacniacze smaku',
    severity: 'limit',
    reason: 'Wzmacniacz smaku typowy dla mocno przetworzonego jedzenia. Łatwo przez niego zjeść więcej.',
    additives: ['e621', 'e627', 'e631', 'e635'],
    text: /glutaminian/i,
  },
  {
    id: 'karagen',
    name: 'Karagen (E407)',
    severity: 'limit',
    reason: 'Zagęstnik, który u części osób podrażnia jelita.',
    additives: ['e407', 'e407a'],
    text: /karagen|carrageenan/i,
  },
  {
    id: 'benzoesany',
    name: 'Benzoesany (E210 do E213)',
    severity: 'limit',
    reason: 'Konserwant. W napojach z witaminą C może tworzyć śladowe ilości benzenu.',
    additives: ['e210', 'e211', 'e212', 'e213'],
    text: /benzoesan|benzoate/i,
  },
  {
    id: 'fosforany',
    name: 'Fosforany (E338 do E341, E450 do E452)',
    severity: 'limit',
    reason: 'Dodane fosforany wchłaniają się prawie w całości. Ich nadmiar obciąża nerki i kości.',
    additives: ['e338', 'e339', 'e340', 'e341', 'e450', 'e451', 'e452'],
    text: /difosforan|trifosforan|polifosforan|kwas ortofosforowy|phosphoric acid/i,
  },
  {
    id: 'emulgatory-jelita',
    name: 'Polisorbat 80 i karboksymetyloceluloza (E433, E466)',
    severity: 'limit',
    reason: 'Emulgatory, które w badaniach osłabiały barierę jelitową.',
    additives: ['e433', 'e466'],
    text: /polisorbat 80|polysorbate 80|karboksymetyloceluloz|carboxymethyl/i,
  },
  {
    id: 'karmel-amoniakalny',
    name: 'Karmel amoniakalny (E150c, E150d)',
    severity: 'limit',
    reason: 'Barwnik karmelowy, który może zawierać 4-MEI.',
    additives: ['e150c', 'e150d'],
  },
  {
    id: 'siarczyny',
    name: 'Siarczyny (E220 do E228)',
    severity: 'limit',
    reason: 'Konserwant i częsty alergen, uciążliwy szczególnie przy astmie.',
    additives: ['e220', 'e221', 'e222', 'e223', 'e224', 'e225', 'e226', 'e227', 'e228'],
    text: /siarczyn|pirosiarczyn|sulphite|sulfite/i,
  },
  {
    id: 'olej-palmowy',
    name: 'Olej palmowy',
    severity: 'limit',
    reason: 'Dużo tłuszczów nasyconych i ciężka historia środowiskowa.',
    tags: ['palm-oil', 'palm-fat'],
    text: /olej palmowy|tłuszcz palmowy|palm oil/i,
  },
]

const COSMETIC_RULES: Rule[] = [
  {
    id: 'parabeny',
    name: 'Parabeny',
    severity: 'avoid',
    reason: 'Konserwanty, które w badaniach działały jak słabe estrogeny.',
    text: /(methyl|ethyl|propyl|butyl|isobutyl|isopropyl)paraben/i,
  },
  {
    id: 'formaldehyd',
    name: 'Formaldehyd i substancje go uwalniające',
    severity: 'avoid',
    reason: 'Formaldehyd jest uznanym czynnikiem rakotwórczym i silnym alergenem.',
    text: /formaldehyde|dmdm hydantoin|imidazolidinyl urea|diazolidinyl urea|quaternium-15|bronopol|2-bromo-2-nitropropane/i,
  },
  {
    id: 'izotiazolinony',
    name: 'Methylisothiazolinone (MIT, MCI)',
    severity: 'avoid',
    reason: 'Jeden z najczęstszych alergenów kontaktowych w kosmetykach.',
    text: /methylisothiazolinone|methylchloroisothiazolinone/i,
  },
  {
    id: 'ftalany',
    name: 'Ftalany',
    severity: 'avoid',
    reason: 'Zaburzacze hormonalne. Część z nich jest zakazana w kosmetykach w UE.',
    text: /phthalate/i,
  },
  {
    id: 'triclosan',
    name: 'Triklosan',
    severity: 'avoid',
    reason: 'Środek antybakteryjny podejrzewany o zaburzanie pracy tarczycy.',
    text: /triclosan|triclocarban/i,
  },
  {
    id: 'oksybenzon',
    name: 'Oksybenzon (benzophenone-3)',
    severity: 'avoid',
    reason: 'Filtr UV, który wchłania się do krwi i jest badany jako zaburzacz hormonalny.',
    text: /oxybenzone|benzophenone-3/i,
  },
  {
    id: 'sls',
    name: 'SLS i SLES',
    severity: 'limit',
    reason: 'Mocne detergenty, które mogą przesuszać i podrażniać skórę.',
    text: /sodium lauryl sulfate|sodium laureth sulfate|ammonium lauryl sulfate/i,
  },
  {
    id: 'perfumy',
    name: 'Perfumy (parfum, fragrance)',
    severity: 'limit',
    reason: 'Pod jedną nazwą może kryć się kilkadziesiąt substancji, także alergenów.',
    text: /\bparfum\b|\bfragrance\b|\baroma\b/i,
  },
  {
    id: 'peg',
    name: 'Związki PEG',
    severity: 'limit',
    reason: 'Emulgatory, które mogą być zanieczyszczone 1,4-dioksanem.',
    text: /\bpeg-\d+|\bpeg \d+|ceteareth|laureth-\d+/i,
  },
  {
    id: 'ropa',
    name: 'Parafina i oleje mineralne',
    severity: 'limit',
    reason: 'Pochodne ropy naftowej, które tylko okluzują skórę i niczego jej nie dają.',
    text: /paraffinum liquidum|mineral oil|petrolatum|\bparaffin\b/i,
  },
  {
    id: 'silikony',
    name: 'Silikony',
    severity: 'limit',
    reason: 'Tworzą film na skórze i bardzo wolno rozkładają się w środowisku.',
    text: /dimethicone|cyclopentasiloxane|cyclohexasiloxane|cyclomethicone/i,
  },
  {
    id: 'bht-kosm',
    name: 'BHT',
    severity: 'limit',
    reason: 'Syntetyczny przeciwutleniacz badany pod kątem zaburzania gospodarki hormonalnej.',
    text: /\bbht\b|butylated hydroxytoluene/i,
  },
  {
    id: 'aluminium',
    name: 'Sole glinu',
    severity: 'limit',
    reason: 'Blokują pocenie się. Wolę dezodoranty bez nich.',
    text: /aluminum chlorohydrate|aluminium chlorohydrate|aluminum zirconium/i,
  },
]

function matches(rule: Rule, p: ProductInput): boolean {
  const adds = p.additives.map((a) => a.replace(/^[a-z]{2}:/, '').toLowerCase())
  if (rule.additives?.some((a) => adds.includes(a))) return true
  const tags = [...p.ingredientTags, ...p.analysisTags].map((t) => t.toLowerCase())
  if (rule.tags?.some((t) => tags.some((x) => x.includes(t) && !x.includes('may-contain') && !x.includes('free')))) return true
  if (rule.text && p.ingredientsText && rule.text.test(p.ingredientsText)) return true
  return false
}

export function scoreProduct(p: ProductInput): ScoreResult {
  const hasIngredients = !!p.ingredientsText?.trim() || p.additives.length > 0 || p.ingredientTags.length > 0
  const rules = p.kind === 'cosmetic' ? COSMETIC_RULES : FOOD_RULES
  const flags: Flag[] = rules
    .filter((r) => matches(r, p))
    .map(({ id, name, severity, reason }) => ({ id, name, severity, reason }))

  if (p.kind === 'food' && p.nova === 4) {
    flags.push({
      id: 'nova4',
      name: 'Produkt ultraprzetworzony (NOVA 4)',
      severity: 'limit',
      reason: 'Zrobiony głównie z przetworzonych składników i dodatków, daleko od prawdziwego jedzenia.',
    })
  }

  flags.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'avoid' ? -1 : 1))

  const penalty = flags.reduce((s, f) => s + (f.severity === 'avoid' ? 2 : 1), 0)
  const stars = Math.max(1, Math.min(5, 5 - penalty)) as ScoreResult['stars']

  if (stars >= 4) {
    return {
      stars, flags, hasIngredients,
      verdict: 'buy',
      verdictLabel: 'Śmiało kupuj',
      verdictText: flags.length === 0
        ? 'Nie znalazłam w składzie niczego, czego unikam.'
        : 'Skład jest w porządku. Jedna rzecz do ograniczania, ale bez dramatu.',
    }
  }
  if (stars === 3) {
    return {
      stars, flags, hasIngredients,
      verdict: 'alternative',
      verdictLabel: 'Szukaj lepszej alternatywy',
      verdictText: 'Od czasu do czasu nic się nie stanie, ale na co dzień poszukaj czegoś z krótszym składem.',
    }
  }
  const hasAvoid = flags.some((f) => f.severity === 'avoid')
  return {
    stars, flags, hasIngredients,
    verdict: 'avoid',
    verdictLabel: 'Lepiej nie kupuj',
    verdictText: hasAvoid
      ? 'W składzie są rzeczy, których unikam. Odłóż na półkę i poszukaj zamiennika.'
      : 'Za dużo rzeczy do ograniczania naraz. Odłóż na półkę i poszukaj czegoś z krótszym składem.',
  }
}
