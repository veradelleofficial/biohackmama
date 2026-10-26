/**
 * "Wybierz zdrowszą opcję": pary produkt z marketu vs zdrowszy zamiennik.
 * Żeby dodać nową parę, dopisz obiekt na końcu listy. `link` jest opcjonalny
 * (np. link afiliacyjny do sklepu); bez niego przycisk "Gdzie kupić" się nie pokazuje.
 * Teksty to szkic do akceptacji przez Weronikę.
 */

export type SwapCategory = 'kuchnia' | 'dom' | 'sypialnia' | 'lazienka'

export interface Swap {
  id: string
  category: SwapCategory
  icon: 'Cookie' | 'Flame' | 'Container' | 'Package' | 'Slice' | 'Wind' | 'Water' | 'Bulb' | 'Bedding' | 'Mattress' | 'Phone'
  title: string
  instead: { name: string; why: string; /** zdjęcie w public/images/zamienniki/ */ img?: string }
  choose: { name: string; why: string; brand?: string; link?: string; img?: string }
  /**
   * Link do rolki/posta na Instagramie. Przycisk pokazuje się tylko, gdy jest wpisany.
   * type: 'przepis' (przepis na zamiennik), 'gdzie-kupic' (pokazuję, gdzie kupić), 'rolka' (ogólnie).
   * Przykład: instagram: { url: 'https://www.instagram.com/reel/ABC123/', type: 'przepis' },
   */
  instagram?: { url: string; type: 'przepis' | 'gdzie-kupic' | 'rolka' }
}

export const INSTAGRAM_LABEL: Record<NonNullable<Swap['instagram']>['type'], string> = {
  przepis: 'Przepis na Instagramie',
  'gdzie-kupic': 'Pokazuję, gdzie kupić',
  rolka: 'Zobacz rolkę',
}

export const CATEGORY_LABEL: Record<SwapCategory, string> = {
  kuchnia: 'Kuchnia',
  dom: 'Dom',
  sypialnia: 'Sypialnia',
  lazienka: 'Łazienka',
}

export const SWAPS: Swap[] = [
  {
    id: 'papier-do-pieczenia',
    category: 'kuchnia',
    icon: 'Cookie',
    title: 'Papier do pieczenia',
    instead: {
      name: 'Biały papier z marketu',
      why: 'Zwykle bielony chlorem i bez informacji, czym jest powlekany. Ląduje w piekarniku razem z jedzeniem.',
    },
    choose: {
      name: 'Niebielony, kompostowalny papier',
      brand: 'If You Care',
      why: 'Brązowy, bielony bez chloru, z certyfikowanego papieru. Po użyciu wrzucasz go do kompostu.',
    },
  },
  {
    id: 'patelnia',
    category: 'kuchnia',
    icon: 'Flame',
    title: 'Patelnia',
    instead: {
      name: 'Patelnia z powłoką teflonową',
      why: 'Porysowana albo przegrzana powłoka PTFE może uwalniać szkodliwe związki do jedzenia i powietrza.',
    },
    choose: {
      name: 'Żeliwo albo stal nierdzewna',
      why: 'Bez powłoki, która się ściera. Dobrze przygotowane żeliwo jest naturalnie nieprzywierające i służy latami.',
    },
  },
  {
    id: 'pojemniki',
    category: 'kuchnia',
    icon: 'Container',
    title: 'Pojemniki na jedzenie',
    instead: {
      name: 'Plastikowe pudełka',
      why: 'Przy ciepłym jedzeniu i w mikrofalówce plastik może oddawać do jedzenia bisfenole i ftalany.',
    },
    choose: {
      name: 'Szkło albo stal',
      why: 'Nie wchodzi w reakcję z jedzeniem, nie chłonie zapachów i wytrzyma lata.',
    },
  },
  {
    id: 'folia',
    category: 'kuchnia',
    icon: 'Package',
    title: 'Folia spożywcza',
    instead: {
      name: 'Folia stretch',
      why: 'Cienki plastik owinięty wprost na jedzeniu, często tłustym, a do tego jednorazowy.',
    },
    choose: {
      name: 'Woskowijki z wosku pszczelego',
      why: 'Bawełna nasączona woskiem. Owijasz nią chleb, ser czy miskę i myjesz w chłodnej wodzie.',
    },
  },
  {
    id: 'deska',
    category: 'kuchnia',
    icon: 'Slice',
    title: 'Deska do krojenia',
    instead: {
      name: 'Plastikowa deska',
      why: 'Przy każdym krojeniu nóż odrywa drobinki plastiku, które trafiają prosto do jedzenia.',
    },
    choose: {
      name: 'Deska z litego drewna',
      why: 'Na przykład z buku albo oliwki. Raz na jakiś czas wystarczy natrzeć ją olejem.',
    },
  },
  {
    id: 'woda',
    category: 'kuchnia',
    icon: 'Water',
    title: 'Woda do picia',
    instead: {
      name: 'Woda w plastikowych butelkach',
      why: 'Butelki stoją miesiącami w magazynach i w słońcu, a plastik może oddawać do wody mikrodrobiny i związki chemiczne.',
    },
    choose: {
      name: 'Przefiltrowana kranówka w szkle',
      why: 'Dobry filtr usuwa chlor, metale i resztki leków. Pijesz ze szklanej albo stalowej butelki, bez plastiku.',
    },
  },
  {
    id: 'swiatlo',
    category: 'dom',
    icon: 'Bulb',
    title: 'Światło wieczorem',
    instead: {
      name: 'Zimne, białe LED-y po zmroku',
      why: 'Niebieskie światło wieczorem hamuje melatoninę i mówi mózgowi, że wciąż jest dzień. Trudniej zasnąć.',
    },
    choose: {
      name: 'Ciepłe, przyciemnione światło',
      why: 'Po zachodzie słońca ciepłe żarówki, lampki nisko i bez migotania. Ciało samo zaczyna szykować się do snu.',
    },
  },
  {
    id: 'posciel',
    category: 'sypialnia',
    icon: 'Bedding',
    title: 'Pościel',
    instead: {
      name: 'Pościel z poliestru i mikrofibry',
      why: 'Plastik przy skórze przez osiem godzin. Nie oddycha, zatrzymuje ciepło i wilgoć, przez co śpi się gorzej.',
    },
    choose: {
      name: 'Bawełna organiczna albo len',
      why: 'Oddychają, odprowadzają wilgoć i z każdym praniem są coraz miększe. Len dodatkowo chłodzi latem.',
    },
  },
  {
    id: 'materac',
    category: 'sypialnia',
    icon: 'Mattress',
    title: 'Materac',
    instead: {
      name: 'Materac z taniej pianki',
      why: 'Na początku czuć chemiczny zapach. To lotne związki, którymi oddychasz w nocy, a pianka bywa nasączana środkami zmniejszającymi palność.',
    },
    choose: {
      name: 'Naturalny lateks, wełna, kokos',
      why: 'Materiały, które nie parują chemią i dobrze regulują temperaturę. Szukaj certyfikatów, na przykład GOLS albo GOTS.',
    },
  },
  {
    id: 'telefon',
    category: 'sypialnia',
    icon: 'Phone',
    title: 'Telefon przy łóżku',
    instead: {
      name: 'Telefon na szafce, z włączoną siecią',
      why: 'Powiadomienia i ekran przed snem rozbudzają, a telefon cały czas szuka sieci tuż obok głowy.',
    },
    choose: {
      name: 'Tryb samolotowy i zwykły budzik',
      why: 'Telefon ładuje się poza sypialnią albo leży w trybie samolotowym. Budzi Cię klasyczny budzik.',
    },
  },
  {
    id: 'odswiezacz',
    category: 'dom',
    icon: 'Wind',
    title: 'Zapach w domu',
    instead: {
      name: 'Odświeżacz w sprayu albo do kontaktu',
      why: 'Pod hasłem "perfumy" może się kryć mieszanka kilkudziesięciu substancji, którymi oddychasz cały dzień.',
    },
    choose: {
      name: 'Wietrzenie i naturalne olejki',
      why: 'Otwarte okno plus kilka kropel czystego olejku eterycznego w dyfuzorze, jeśli lubisz zapach.',
    },
  },
]
