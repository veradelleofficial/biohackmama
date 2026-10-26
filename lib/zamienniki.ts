/**
 * "Wybierz zdrowszą opcję": pary produkt z marketu vs zdrowszy zamiennik.
 * Żeby dodać nową parę, dopisz obiekt na końcu listy. `link` jest opcjonalny
 * (np. link afiliacyjny do sklepu); bez niego przycisk "Gdzie kupić" się nie pokazuje.
 * Teksty to szkic do akceptacji przez Weronikę.
 */

export type SwapCategory = 'kuchnia' | 'dom' | 'lazienka'

export interface Swap {
  id: string
  category: SwapCategory
  icon: 'Cookie' | 'Flame' | 'Container' | 'Package' | 'Slice' | 'Wind'
  title: string
  instead: { name: string; why: string }
  choose: { name: string; why: string; brand?: string; link?: string }
}

export const CATEGORY_LABEL: Record<SwapCategory, string> = {
  kuchnia: 'Kuchnia',
  dom: 'Dom',
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
