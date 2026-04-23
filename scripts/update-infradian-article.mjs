import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '104l1otz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skj6GY1ton9bGLbVmu75qDohlJ34rkWRSMocbMvKbp3C8S5IT0Fx8yQO1xrZIxmhxOWfpvTTfAZ3OCGquWDdI3ne0URbiT6MTlevOgD603vtzmERsWGfe6thVkCF88GiWf6SSh63a7XVTZClHOic3PLV86fADbAnPy0LptS6pT0DyMT3l5M5',
  useCdn: false,
})

let keyIndex = 0
const key = () => `k${++keyIndex}`

const block = (style, text, marks = []) => ({
  _type: 'block', _key: key(), style,
  children: [{ _type: 'span', _key: key(), text, marks }],
  markDefs: [],
})

const boldBlock = (style, text) => ({
  _type: 'block', _key: key(), style,
  children: [{ _type: 'span', _key: key(), text, marks: ['strong'] }],
  markDefs: [],
})

const listItem = (text, listType = 'bullet', bold = false) => ({
  _type: 'block', _key: key(), style: 'normal',
  listItem: listType, level: 1,
  children: [{ _type: 'span', _key: key(), text, marks: bold ? ['strong'] : [] }],
  markDefs: [],
})

const callout = (variant, title, body) => ({
  _type: 'callout', _key: key(), variant, title, body,
})

const pullQuote = (text, attribution = '') => ({
  _type: 'pullQuote', _key: key(), text, attribution,
})

const content = [

  // ─── INTRO PULL-QUOTE ────────────────────────────────────────────────────────
  pullQuote(
    'Przez lata optymalizowałam się protokołami stworzonymi dla mężczyzn. Moje ciało odpowiedziało wyczerpaniem, zaburzonymi hormonami i frustracją, że „zdrowy styl życia" nie działa.',
  ),

  // ─── INTRO BOX ───────────────────────────────────────────────────────────────
  callout('info', 'W tym artykule dowiesz się:',
    '• Czym jest rytm infradian i jak rządzi twoim ciałem\n• Dlaczego 16:8 IF i codzienny HIIT mogą ci szkodzić\n• Jak wygląda każda z 4 faz cyklu naprawdę\n• Jak wdrożyć cycle syncing praktycznie od dziś\n• Najczęstsze błędy kobiet ignorujących swój rytm'
  ),

  // ─── SEKCJA 1: PERSONAL STORY ────────────────────────────────────────────────
  block('h2', 'Rytm infradialny: dlaczego protokoły dla mężczyzn nie działają na kobiety'),
  block('normal', 'Przez lata stosowałam post przerywany 16:8, trenowałam pięć razy w tygodniu bez względu na samopoczucie i byłam pewna, że robię wszystko dobrze. Efekt? Chroniczne zmęczenie, rozregulowany cykl i poczucie, że moje ciało mnie zdradza.'),
  block('normal', 'Przełomem było odkrycie koncepcji rytmu infradialnego — i zrozumienie, że moje ciało ma swój własny, 28-dniowy zegar biologiczny. Nie potrzebowałam więcej silnej woli. Potrzebowałam właściwej instrukcji obsługi.'),

  // ─── SEKCJA 2: DEFINICJA ─────────────────────────────────────────────────────
  block('h2', 'Czym jest rytm infradian i czym różni się od rytmu cyrkadyjnego?'),
  block('normal', 'Rytm cyrkadyjny to 24-godzinny zegar biologiczny, który reguluje sen, kortyzol i temperaturę ciała u wszystkich ludzi. Rytm infradian (z łac. infra dies — „poniżej dnia") to cykl trwający dłużej niż 24 godziny.'),
  block('normal', 'U kobiet w wieku rozrodczym przejawia się on jako cykl miesiączkowy — trwający średnio 24–35 dni. Koncepcję spopularyzowała Alisa Vitti w książce „WomanCode", opierając się na dekadach badań z zakresu endokrynologii.'),

  callout('fact', 'Ciekawostka: kobiety wykluczone z badań',
    'Przez dekady kobiety były systematycznie wykluczane z badań klinicznych — ze względu na „komplikacje hormonalne". Dopiero w 1993 roku NIH (National Institutes of Health) nakazało włączanie kobiet do publicznie finansowanych badań. Większość danych o diecie, treningu i lekach wciąż pochodzi z badań na mężczyznach lub samcach myszy.'
  ),

  // ─── SEKCJA 3: PORÓWNANIE ────────────────────────────────────────────────────
  block('h3', 'Rytm cyrkadyjny (24h) vs rytm infradian (28 dni)'),
  block('normal', 'Twoje ciało funkcjonuje jak dwa zsynchronizowane zegary: jeden dobowy, jeden miesięczny. W ciągu jednego cyklu poziom estrogenu może wzrosnąć nawet dziesięciokrotnie, progesteron dramatycznie się waha, testosteron ma wyraźne szczyty, a kortyzol reaguje inaczej w zależności od fazy. To nie są subtelne wahania — to potężne zmiany biochemiczne.'),

  callout('info', 'Dwa zegary biologiczne kobiety',
    'Rytm cyrkadyjny (24h):\n→ Dotyczy wszystkich ludzi\n→ Reguluje: sen, kortyzol, temperaturę ciała\n→ Główny regulator: światło i melatonina\n\nRytm infradian (28 dni):\n→ Dotyczy kobiet w wieku rozrodczym\n→ Reguluje: metabolizm, nastrój, siłę, libido, odporność\n→ Główny regulator: estrogen i progesteron'
  ),

  // ─── SEKCJA 4: NAUKA ─────────────────────────────────────────────────────────
  block('h2', 'Co mówi nauka? Dowody na istnienie rytmu infradialnego'),
  block('normal', 'Rytm infradian to nie trend z Instagrama — to obszar badany przez endokrynologów od dziesięcioleci. Oto trzy kluczowe obszary, które potwierdzają jego wpływ na codzienne funkcjonowanie:'),

  callout('research', 'Badanie: Metabolizm i kalorie',
    'American Journal of Physiology | Kobiety w fazie lutealnej mają spoczywkowe spalanie wyższe o 5–10%, co przekłada się na 100–300 dodatkowych kalorii dziennie. Twój apetyt przed miesiączką to nie słabość woli — to biologia.'
  ),

  callout('research', 'Badanie: Testosteron i motywacja',
    'Sari van Anders, University of Michigan | Poziom testosteronu u kobiet zmienia się wraz z fazą cyklu, wpływając na libido, motywację i skłonność do podejmowania ryzyka. Twoja energia i pewność siebie mają podłoże hormonalne — i są przewidywalne.'
  ),

  callout('research', 'Badanie: Jakość snu',
    'Pismo naukowe "Sleep" | Kobiety w fazie lutealnej śpią płycej, częściej się wybudzają i mają mniej snu głębokiego. To biologia, nie stres. Twoje ciało potrzebuje w tym czasie konkretnego wsparcia.'
  ),

  // ─── SEKCJA 5: 4 FAZY ────────────────────────────────────────────────────────
  block('h2', '4 fazy cyklu: co dzieje się z twoim ciałem?'),
  block('normal', 'Każda faza cyklu to inne środowisko hormonalne — i inne potrzeby twojego ciała. Gdy zaczniesz je rozumieć, przestaniesz walczyć ze sobą.'),

  // Faza 1 – Menstruacja
  block('h3', '🌑 Faza menstruacyjna — Dni 1–5: Czas regeneracji'),
  block('normal', 'Estrogen i progesteron są na najniższym poziomie. Błona śluzowa macicy złuszcza się. Energia spada naturalnie, próg bólu jest niższy. To nie jest słabość — to sygnał do zwolnienia.'),
  boldBlock('normal', '🏋️ Trening:'),
  listItem('Joga, spacery, lekkie rozciąganie'),
  listItem('Unikaj HIIT i ciężkich ciężarów — ryzyko kontuzji wyższe'),
  listItem('Ruch w umiarkowanym tempie zmniejsza bóle menstruacyjne'),
  boldBlock('normal', '🥗 Jedzenie:'),
  listItem('Żelazo (czerwone mięso, szpinak, fasola) — uzupełniaj straty'),
  listItem('Magnez łagodzi skurcze i poprawia nastrój'),
  listItem('Omega-3 działają przeciwzapalnie — łosoś, siemię lniane'),
  listItem('Ogranicz kofeinę i alkohol — nasilają skurcze'),
  boldBlock('normal', '🧠 Praca / umysł:'),
  listItem('Mózg jest analityczny i refleksyjny — dobry czas na podsumowania i planowanie'),
  listItem('Unikaj ważnych prezentacji i negocjacji'),

  callout('protip', 'Pro-tip: cykl jako miesięczne podsumowanie',
    'Dni menstruacyjne to naturalny moment na „reset". Wiele kobiet używa tej fazy do przeglądu celów, oceny minionego miesiąca i planowania kolejnego. Twój mózg jest wtedy bardziej krytyczny i analityczny niż w jakiejkolwiek innej fazie.'
  ),

  // Faza 2 – Folikularna
  block('h3', '🌒 Faza folikularna — Dni 6–13: Szczyt energii i kreatywności'),
  block('normal', 'Rosnący estrogen podnosi poziom serotoniny i dopaminy. Jesteś bardziej towarzyska, optymistyczna i odporna na stres. Metabolizm spowalnia nieznacznie, ciało preferuje węglowodany jako paliwo.'),
  boldBlock('normal', '🏋️ Trening:'),
  listItem('Idealna faza na HIIT, siłownię, crossfit'),
  listItem('Możesz bić rekordy — siła i wytrzymałość są najwyższe'),
  listItem('Nowe ruchy i techniki przyswajasz szybciej'),
  boldBlock('normal', '🥗 Jedzenie:'),
  listItem('Lżejsze posiłki — metabolizm jest wolniejszy'),
  listItem('Warzywa krzyżowe (brokuły, jarmuż) wspierają metabolizm estrogenu w wątrobie'),
  listItem('Dobre źródła węglowodanów złożonych'),
  boldBlock('normal', '🧠 Praca / umysł:'),
  listItem('Mózg tworzy nowe połączenia nerwowe — zacznij kurs, naukę języka'),
  listItem('Kreatywne projekty, burze mózgów, nowe inicjatywy'),

  // Faza 3 – Owulacja
  block('h3', '🌕 Owulacja — Dni 14–16: „Supermoce" (tylko 3–4 dni)'),
  block('normal', 'Estrogen osiąga szczyt, dołącza hormon luteinizujący i testosteron. Jesteś charyzmatyczna, asertywna, błyskotliwa. Badania pokazują, że w tym czasie twój głos jest niższy, a rysy twarzy bardziej symetryczne.'),
  boldBlock('normal', '🏋️ Trening:'),
  listItem('Ciężki trening nadal możliwy — ale uwaga na technikę'),
  listItem('Wysoki estrogen rozluźnia więzadła — większe ryzyko kontuzji przy złej technice'),
  listItem('Dobry czas na sporty grupowe i współzawodnictwo'),
  boldBlock('normal', '🥗 Jedzenie:'),
  listItem('Cynk wspiera funkcję jajników — pestki dyni, orzechy, rośliny strączkowe'),
  listItem('Lekkie, odżywcze posiłki'),
  boldBlock('normal', '🧠 Praca / umysł:'),
  listItem('Prezentacje, negocjacje, ważne rozmowy z klientami'),
  listItem('Networking, spotkania, publiczne wystąpienia'),
  listItem('Największa werbalna płynność i pewność siebie'),

  callout('protip', 'Pro-tip: zaplanuj kalendarz wokół owulacji',
    'Jeśli wiesz, w które dni przypada twoja owulacja, możesz z wyprzedzeniem planować ważne spotkania biznesowe, rozmowy kwalifikacyjne lub prezentacje. To nie manipulacja — to korzystanie z naturalnych zasobów swojego ciała.'
  ),

  // Faza 4 – Lutealna
  block('h3', '🌘 Faza lutealna — Dni 17–28: Cisza i myślenie analityczne'),
  block('normal', 'Dominuje progesteron. Temperatura ciała rośnie o 0,2–0,5°C, metabolizm przyspiesza (stąd większy apetyt). Możliwa retencja wody i większa wrażliwość emocjonalna. To nie jest słabość — to biochemia.'),
  boldBlock('normal', '🏋️ Trening:'),
  listItem('Dni 17–21: siłownia nadal OK, ale bez bicia rekordów'),
  listItem('Dni 22–28: pilates, joga, spacery, pływanie'),
  listItem('Intensywny cardio w ostatnim tygodniu = wyższy kortyzol = gorsze PMS'),
  boldBlock('normal', '🥗 Jedzenie:'),
  listItem('Zwiększ kalorie o 100–200 — twoje ciało naprawdę potrzebuje więcej'),
  listItem('Tryptofan (indyk, jaja, orzechy) wspiera produkcję serotoniny'),
  listItem('Magnez łagodzi PMS i poprawia sen'),
  listItem('Ogranicz sód — zmniejsza retencję wody'),
  boldBlock('normal', '🧠 Praca / umysł:'),
  listItem('Mózg wchodzi w tryb analityczny — świetny do korekty, audytów, wykrywania błędów'),
  listItem('Unikaj ważnych decyzji emocjonalnych w dniach 24–28'),

  callout('warning', 'Uwaga: PMS to sygnał, nie słabość charakteru',
    'Silne PMS często wskazuje na niedobór magnezu, nadmiar estrogenu względem progesteronu lub zbyt wysoki kortyzol w tej fazie. To biochemiczny sygnał, że twoje ciało potrzebuje wsparcia — nie siły woli.'
  ),

  // ─── SEKCJA 6: DLACZEGO MESKIE PROTOKOLY ─────────────────────────────────────
  block('h2', 'Dlaczego protokoły dla mężczyzn ci nie służą?'),
  block('normal', 'Klasyczne badania zapoczątkowujące trend IF były przeprowadzone na samcach myszy. Efekty? Świetna utrata tłuszczu i pozytywne wyniki. Gdy te same eksperymenty przeprowadzono na samicach myszy, ich ciała weszły w tryb paniki.'),
  block('normal', 'Kobiecy mózg interpretuje długie przerwy od jedzenia jako sygnał głodu i zagrożenia dla bezpieczeństwa reprodukcyjnego. Organizm reaguje: podnosi kortyzol, wstrzymuje owulację, rozregulowuje cykl.'),

  callout('warning', 'IF a faza lutealna — ważne',
    'W fazie lutealnej (dni 17–28) oś HPA (podwzgórze–przysadka–nadnercza) jest znacznie bardziej wrażliwa na stres. Ten sam bodziec — intensywne cardio, 20-godzinny post, niedobór snu — wywołuje silniejszy wzrost kortyzolu niż w fazie folikularnej lub u mężczyzn.\n\nBezpieczniejszy wariant IF dla kobiet: 12:12 lub 14:10 — i tylko w fazie folikularnej (dni 6–13).'
  ),

  pullQuote(
    'Twoje ciało nie jest zepsute. Używasz po prostu instrukcji obsługi napisanej dla kogoś innego.',
  ),

  // ─── SEKCJA 7: CYCLE SYNCING ──────────────────────────────────────────────────
  block('h2', 'Jak wdrożyć Cycle Syncing w praktyce?'),
  block('normal', 'Cycle syncing to dostosowanie diety, treningu i codziennych aktywności do aktualnej fazy cyklu. Nie musisz robić wszystkiego naraz — zacznij od jednego elementu.'),

  callout('info', 'Tabela: Żywienie i trening w 4 fazach',
    'MENSTRUACJA (dni 1–5)\n→ Żywienie: żelazo, magnez, omega-3 | ogranicz kofeinę\n→ Trening: joga, spacer, lekkie cardio\n→ Biohacking: ciepłe kąpiele, sauna (ostrożnie)\n\nFOLIKULARNA (dni 6–13)\n→ Żywienie: warzywa krzyżowe, lżejsze posiłki, węglowodany złożone\n→ Trening: HIIT, siłownia, bicie rekordów\n→ Biohacking: cold plunge, nowe suplementy, nauka\n\nOWULACJA (dni 14–16)\n→ Żywienie: cynk, rośliny strączkowe, quinoa\n→ Trening: ciężki trening z uwagą na technikę\n→ Biohacking: networking, social media, nagrania\n\nLUTEALNA (dni 17–28)\n→ Żywienie: +100-200 kcal, tryptofan, magnez, mniej sodu\n→ Trening: pilates, joga, spacery\n→ Biohacking: wyciszenie, ograniczenie kofeiny, magnesium bath'
  ),

  // ─── SEKCJA 8: BŁĘDY ─────────────────────────────────────────────────────────
  block('h2', 'Najczęstsze błędy kobiet ignorujących swój rytm'),

  block('normal', '1. Stosowanie stałego okna żywieniowego przez cały miesiąc'),
  block('normal', 'Post 16:8 w fazie lutealnej może podnosić kortyzol do poziomu stresu przewlekłego. Efekt: gorsze PMS, zaburzenia snu, apetyt nie do opanowania.'),

  block('normal', '2. Trening „bez względu na wszystko"'),
  block('normal', 'Najcięższe sesje w dniach 24–28 to przetrenowanie, nie determinacja. Twoje ciało regeneruje się wolniej i potrzebuje innego bodźca.'),

  block('normal', '3. Traktowanie PMS jako słabości charakteru'),
  block('normal', 'PMS to sygnał biochemiczny: twoje ciało potrzebuje innych składników odżywczych. Zamiast silniejszej woli — więcej magnezu, mniej kortyzolu.'),

  block('normal', '4. Porównywanie się z sobą z innego tygodnia'),
  block('normal', 'Nie porównuj środy z fazy folikularnej ze środą z fazy lutealnej. Porównuj tę samą fazę z poprzednimi cyklami — to jedyna miarodajna miara postępu.'),

  block('normal', '5. Stosowanie tego samego schematu co mężczyźni'),
  block('normal', 'Twój kolega może trenować identycznie każdego dnia i mieć świetne wyniki — bo jego hormony są stabilne na przestrzeni miesięcy. Twoje nie są. I to jest twoja supermoc, nie słabość.'),

  // ─── CYTAT VITTI ─────────────────────────────────────────────────────────────
  pullQuote(
    'Your cycle isn\'t an obstacle to health optimization. It\'s your roadmap to it.',
    'Alisa Vitti'
  ),

  // ─── FAQ ──────────────────────────────────────────────────────────────────────
  block('h2', 'FAQ: Najczęściej zadawane pytania'),

  block('h3', 'Czy mężczyźni mają rytm infradian?'),
  block('normal', 'Mężczyźni mają inne rytmy biologiczne (roczne wahania testosteronu, rytmy ultradian), ale nie mają 28-dniowego cyklu hormonalnego, który tak silnie reguluje metabolizm. Ta fundamentalna różnica uzasadnia odmienne podejście do zdrowia.'),

  block('h3', 'Czy rytm infradian znika po menopauzie?'),
  block('normal', 'Biologiczny cykl menstruacyjny ustaje. Jednak wiele kobiet po menopauzie zgłasza cykliczne wahania samopoczucia i energii przypominające poprzednie wzorce. Ten obszar wymaga dalszych badań naukowych.'),

  block('h3', 'Ile czasu zajmuje adaptacja do cycle syncing?'),
  block('normal', 'Większość kobiet zauważa pierwsze efekty (lepszy sen, łagodniejszy PMS) już po 2–3 cyklach świadomej synchronizacji. 90 dni to czas potrzebny na ocenę pełnego efektu rebalansowania hormonalnego.'),

  block('h3', 'Czy cycle syncing działa przy antykoncepcji hormonalnej?'),
  block('normal', 'Na pigułce twój naturalny cykl jest zablokowany — nie masz biologicznych faz w tym sensie. Cycle syncing w klasycznej formie nie ma zastosowania. Warto za to skupić się na wspieraniu wątroby i uzupełnianiu składników wypłukiwanych przez pigułkę: cynk, magnez, witamina B6, B12.'),

  block('h3', 'Czy cycle syncing to pseudonauka?'),
  block('normal', 'Badania nad metabolizmem, snem i zachowaniem w różnych fazach cyklu są solidne naukowo. Kontrowersje dotyczą głównie marketingowych uproszczeń. Traktuj cycle syncing jako framework i punkt wyjścia — nie dogmat. Obserwuj swoje ciało i weryfikuj, co działa na Ciebie.'),

  // ─── CTA ─────────────────────────────────────────────────────────────────────
  block('h2', 'Gotowa zacząć?'),
  block('normal', 'Twój cykl to nie bariera w optymalizacji zdrowia. Zrozumienie go to pierwszy krok — ale prawdziwa zmiana następuje przez praktykę.'),

  callout('protip', 'Bezpłatne narzędzie: Tracker Cyklu i Suplementacji',
    'Wypróbuj nasz bezpłatny tracker faz cyklu dostępny na tej stronie — obserwuj swój rytm i zacznij dostosowywać trening, jedzenie i energię do swojego ciała. Znajdziesz go w sekcji Narzędzia → Tracker Cyklu.'
  ),

  callout('info', 'E-book: Odzyskaj Energię — Życie w Zgodzie z Cyklem',
    'Chcesz gotowy plan na 28 dni? E-book zawiera:\n• 28-dniowy plan żywieniowy z jadłospisami na każdą fazę\n• Protokoły treningowe zsynchronizowane z cyklem\n• Strategie biohackingowe i suplementację celowaną\n• Sekcje dla nieregularnych cykli, PCOS i endometriozy\n• Szablony śledzenia i budowania nawyków\n\nZnajdziesz go w sekcji Ebooki.'
  ),

  block('normal', 'Przestań walczyć ze swoją biologią. Zacznij z nią współpracować.'),

]

// ─── PATCH ───────────────────────────────────────────────────────────────────
const result = await client
  .patch('article-infradian-rhythm')
  .set({ content })
  .commit()

console.log('✅ Zaktualizowano artykuł:', result._id)
