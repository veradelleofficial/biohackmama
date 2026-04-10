'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Brain, Sparkles, Leaf, ShieldCheck, Baby } from 'lucide-react'

const milestones = [
  {
    title: 'Przebudzenie',
    description: 'Narodziny mojego dziecka były końcem mojej naiwności. Patrzyłam, jak system zawodzi, jak standardowe kuracje i apteczne rozwiązania odbijają się od ściany, nie dając nam żadnej poprawy. Wiedziałam, że nie mogę dłużej czekać na pozwolenie od świata, który zarabia na naszym chorowaniu. Zaczęłam szukać na własną rękę. Odrzuciłam korporacyjne manipulacje i wróciłam do źródeł, które kiedyś były normalnością. Dziś wiem, że zdrowie nie przychodzi w kolorowym opakowaniu z apteki. Ono zaczyna się od świadomych wyborów w naszym własnym domu.',
  },
  {
    title: 'O tym, jak odzyskałam zdrowie na własnych zasadach',
    description: 'Z niedoczynnością tarczycy wygrałam dwukrotnie i to bez żadnych leków. Najtrudniej było za drugim razem w ciąży i po porodzie, czyli w momencie, kiedy organizm kobiety jest najbardziej obciążony. Wbrew wszystkim medycznym prognozom pokazałam, że czysty styl życia i eliminacja toksyn potrafią zdziałać więcej niż syntetyczne hormony. Efekt? Od 5 lat mam święty spokój. Moje wyniki są idealne, a hormony w końcu w pełnej równowadze. Nie oferuję Ci diety cud ani magicznych kapsułek, ale drogę do zdrowia na lata. Tę samą, którą sama przeszłam.',
  },
  {
    title: 'Moja wyboista ścieżka: Między intuicją a systemem',
    description: 'Uregulowałam hormony naturalnie, ale prawda jest taka, że ta droga mnie po prostu wymęczyła. Przez pięć lat zmagałam się z niedowagą i komplikacjami po porodzie, kręcąc się w kółko. Miałam momenty, kiedy chciałam to wszystko zostawić i wrócić do systemowych rozwiązań, bo obiecywały ulgę na już. Ale kiedy tylko zaczynałam słuchać siebie, wiedziałam, że nie mogę zawrócić. Te wszystkie kryzysy i chęć ucieczki do starego życia były częścią mojej przemiany. Dziś wiem, że zdrowie nie jest prostym wykresem, ale drogą, której nie zamieniłabym na żadne skróty.',
  },
  {
    title: 'Chcę być wsparciem, którego sama nigdy nie dostałam',
    description: 'Stworzyłam BioHackMama, bo miałam dość bycia bezsilną. Nie piszę do Ciebie jako lekarz czy dietetyk. Piszę jako mama, która na własnej skórze przekonała się, że system nie zawsze ma dla nas odpowiedzi. Moja droga? To nie była prosta linia do sukcesu. Ale nie odpuściłam. Ta historia tak bardzo mnie zmieniła, że planuję całkowicie przebranżowić się i w przyszłości pomagać innym już zawodowo. Chcę sformalizować moją wiedzę i zdobyć dyplom, ale zanim to nastąpi, daję Ci to, co mam najcenniejszego: moje realne, trudne doświadczenie i wiedzę, która po prostu działa.',
  },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Niezależność od systemu',
    description: 'Nie kupuję tego, co próbuje mi wciskać przemysł. Przestałam wierzyć, że korporacje chcą dla ludzi dobrze. Szukam odpowiedzi w tym, co było po prostu normalne i skuteczne, zanim ktoś wpadł na pomysł, że można na tym zbić fortunę, pakując chemię w kolorowe pudełka.',
  },
  {
    icon: Leaf,
    title: 'Non-toxic, krok po kroku',
    description: 'Zapomnij o radykalnych rewolucjach, które kończą się frustracją. Nie każę Ci robić wielkiego przemeblowania w jeden wieczór. Zmieniamy to, co nas truje, na to, co nas wspiera, ale robimy to z głową. Jedna rzecz na raz, bez pośpiechu i bez poczucia winy, że w Twojej łazience wciąż stoi coś z czarnej listy. Liczy się każdy mały wybór, a nie perfekcja od zaraz.',
  },
  {
    icon: Heart,
    title: 'Z serca, nie z podręcznika',
    description: 'Mówię po ludzku. Bez dystansu, bo sama przeszłam przez to piekło. Wiem, jak bardzo boli bezsilność, gdy czujesz, że Twój organizm wysyła sygnały ostrzegawcze, a system próbuje Ci wmówić, że to tylko Twoja wyobraźnia. Jestem tu, bo wiem, co to znaczy zostać ze swoimi najważniejszymi pytaniami zupełnie samemu.',
  },
  {
    icon: Brain,
    title: 'Mądrość pokoleń + współczesna wiedza',
    description: 'Czerpię z mądrości natury i ziołolecznictwa, bo one działały, zanim powstały korporacje farmaceutyczne. Ale dodaję do tego biohacking, dzisiejszą wiedzę o tym, jak działają nasze hormony, sen i metabolizm. Łączę intuicję naszych babć z twardymi danymi. Dzięki temu nie zgaduję, tylko wybieram to, co faktycznie przywraca ciału równowagę.',
  },
  {
    icon: Sparkles,
    title: 'Praktycznie i z głową',
    description: 'Nie musisz wydawać majątku, żeby żyć zdrowo. Marketing po prostu wmówił nam, że eko musi być drogie. Pokażę Ci, jak omijać te pułapki. Masz wolną chwilę? Zrób to sama, taniej i prościej. Jesteś w biegu? Dam Ci gotowe, sprawdzone listy produktów, które mają uczciwy skład i cenę. Ty wybierasz, co pasuje do Twojego stylu życia.',
  },
  {
    icon: Baby,
    title: 'Dla Ciebie i Twojej rodziny',
    description: 'Większość kosmetyków dla niemowląt to marketingowy nadmiar, który robi skórze więcej szkody niż pożytku. Twoje dziecko nie potrzebuje dziesiątek kolorowych butelek. Uczę, jak wrócić do podstaw i chronić zdrowie malucha w najprostszy sposób. Spokojnie, z głową i bez chemicznego obciążenia od pierwszych chwil życia.',
  },
]

const forWhom = [
  'Zapracowanej kobiety, która w tym całym pędzie poczuła, że straciła kontrolę nad tym, czym się otacza i jak to wpływa na jej samopoczucie.',
  'Młodej mamy, która ma dość szukania pomocy tam, gdzie jej nie ma i chce w końcu dostać konkretne odpowiedzi zamiast kolejnych zbywających rad.',
  'Mężczyzny, który czuje odpowiedzialność za zdrowie swojej rodziny i chce świadomie chronić swoich bliskich przed tym, co ich po cichu truje.',
  'Rodzica, który widzi rosnącą plagę alergii i chorób dookoła i nie chce być tylko biernym obserwatorem i stałym klientem systemu. Chce wziąć zdrowie dzieci w swoje ręce.',
  'Osoby, która czuje, że to idealny moment na przewartościowanie życia, naukę samowystarczalności i budowanie domu na własnych zasadach.',
  'Każdego, kto ma dość ulegania presji otoczenia i chce w końcu przestać słuchać dobrych rad od ludzi, którzy sami błądzą, by zacząć ufać własnej intuicji.',
]

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">
        {/* Hero */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs tracking-cta font-medium mb-4 md:mb-6 border border-primary/20 uppercase">
              O MNIE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal tracking-heading mb-5 md:mb-6">
              Mama, która{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coastal-gold via-coastal-ocean to-coastal-gold">
                obudziła się
              </span>{' '}
              wystarczająco szybko
            </h1>
            <p className="text-base md:text-lg font-light mb-4" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.7' }}>
              Jestem mamą i pasjonatką, która sama postanowiła zadbać o swoje zdrowie, przestać kierować się propagandą wielkich korporacji i znaleźć odpowiedzi tam, gdzie nasi przodkowie je zostawili. Kiedy urodził się mój syn, zobaczyłam, że coś tu nie gra. Leki nie pomagały. Zalecenia lekarzy nie dawały żadnej poprawy. Wiedziałam, że tak to nie powinno wyglądać i zaczęłam szukać na własną rękę.
            </p>
            <p className="text-base md:text-lg font-light mb-8" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.7', textWrap: 'balance' } as React.CSSProperties}>
              Od lat interesuję się zdrowym odżywianiem i naturalną medycyną. Jeszcze zanim zaszłam w ciążę, te tematy były mi bardzo bliskie. Zagłębienie się w ziołolecznictwo i naturopatię po porodzie dało mi nowy wgląd na zdrowie człowieka. Dwukrotnie wyszłam z niedoczynności tarczycy. Uregulowałam hormony po 5 latach nierównowagi. Wszystko dzięki stylowi życia i odpowiedniej diecie, nie dzięki farmacji.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/kursy"
                className="px-6 py-3 md:px-8 md:py-4 bg-coastal-gold text-white rounded-3xl hover:brightness-110 hover:shadow-coastal-lg transition-all duration-300 text-cta text-sm text-center"
              >
                Zobacz moje kursy
              </Link>
              <Link
                href="/kontakt"
                className="px-6 py-3 md:px-8 md:py-4 border border-coastal-ocean/40 text-coastal-slate rounded-3xl hover:bg-secondary/10 hover:border-coastal-ocean/60 transition-all duration-300 text-cta text-sm text-center"
              >
                Napisz do mnie
              </Link>
            </div>
          </div>

          <figure className="relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-coastal-xl">
              <Image
                src="/images/pexels-fbyf-studio-1601304170-29705721.webp"
                alt="BioHackMama - o mnie"
                fill
                className="object-cover"
                style={{ filter: 'sepia(8%) saturate(90%)' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-coastal-sand/10 pointer-events-none rounded-3xl" />
            </div>
          </figure>
        </motion.div>

        {/* Moja historia - Timeline */}
        <motion.section
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-10 md:mb-14 text-center">
            Moja droga
          </h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                className="relative pl-10 md:pl-14 pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                {i < milestones.length - 1 && (
                  <div className="absolute left-[15px] md:left-[21px] top-8 bottom-0 w-px bg-border/60" />
                )}
                <div className="absolute left-1.5 md:left-2.5 top-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-coastal-gold/20 border-2 border-coastal-gold flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-coastal-gold" />
                </div>

                <span className="text-xs font-medium text-coastal-gold uppercase tracking-cta">
                  Krok {i + 1}
                </span>
                <h3 className="font-heading font-semibold text-xl mt-1 mb-2 tracking-heading">
                  {milestone.title}
                </h3>
                <p className="font-light" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Moje podejście */}
        <motion.section
          className="mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-4 text-center">
            Moje podejście
          </h2>
          <p className="text-base md:text-lg font-light text-center max-w-3xl mx-auto mb-10 md:mb-14" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            W BioHackMama nie eliminujemy wszystkiego dla samej zasady. My po prostu odrzucamy chemię, którą wciśnięto nam jako ułatwienie. Teflon, mikrofalówki, plastik i toksyczne składy zamieniamy na to, co służy naszemu zdrowiu. Bez presji, we własnym tempie. Uczę Cię, jak krok po kroku stworzyć dom wolny od toksyn.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group bg-card rounded-3xl p-6 md:p-8 border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:border-coastal-ocean/30 transition-all duration-500"
              >
                <div className="inline-block p-3.5 bg-secondary/15 rounded-2xl mb-4 group-hover:bg-secondary/25 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-coastal-ocean" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2 tracking-heading">
                  {value.title}
                </h3>
                <p className="font-light text-sm" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dla kogo */}
        <motion.section
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">
            <figure className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-coastal-lg">
                <Image
                  src="/images/pexels-daria-liudnaya-8187450.webp"
                  alt="Społeczność BioHackMama"
                  fill
                  className="object-cover"
                  style={{ filter: 'sepia(8%) saturate(92%)' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-coastal-sand/12 pointer-events-none" />
              </div>
            </figure>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-5 md:mb-6">
                Dla kogo to jest?
              </h2>
              <p className="text-base md:text-lg font-light mb-6" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.7' }}>
                Nieważne, czy dopiero otwierasz oczy na to, co Cię truje, czy już od dawna świadomie budujesz swoją codzienność bez toksyn. Pierwsze kroki to solidny fundament dla początkujących, bez spiny i bez przytłoczenia. Kolejne etapy to wejście na poziom master. Tam rozkładamy na części pierwsze tematy niszowe i nieszablonowe rozwiązania, do których trudno dotrzeć w codziennym szumie informacyjnym.
              </p>
              <ul className="space-y-3">
                {forWhom.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-coastal-gold flex-shrink-0" />
                    <span className="font-light" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.5' }}>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-coastal-ocean/15 shadow-coastal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0">
            <Image
              src="/images/pexels-fbyf-studio-1601304170-29705714.webp"
              alt=""
              fill
              className="object-cover"
              style={{ filter: 'sepia(10%) saturate(85%)' }}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-coastal-sand/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-coastal-sand/90 via-coastal-sand/75 to-coastal-sand/60" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-14 text-center">
            <h3 className="text-3xl md:text-4xl font-heading font-normal mb-4 tracking-heading">
              Gotowi na zmianę?
            </h3>
            <p className="text-lg max-w-2xl mx-auto mb-8 font-light" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
              Przerobiłam to wszystko na sobie, żebyś nie musiał błądzić. Zamiast tracić energię na testowanie nieskutecznych metod, skorzystaj z mojej wiedzy i przejdź prosto do działania. Pokazuję Ci, jak odciąć się od tego, co Cię truje i odzyskać kontrolę. Wszystko zebrałam dla Ciebie w jednym miejscu.
            </p>
            <Link
              href="/kursy"
              className="inline-block px-8 py-3.5 bg-coastal-gold text-white rounded-3xl hover:brightness-110 hover:shadow-coastal-lg transition-all duration-300 text-cta text-sm"
            >
              Zacznij teraz
            </Link>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Treści prezentowane na tej stronie mają charakter edukacyjny i informacyjny. Nie jestem lekarzem ani dietetykiem - dzielę się własnym doświadczeniem i wiedzą zdobytą przez lata. Przed wprowadzeniem zmian w diecie, suplementacji lub stylu życia skonsultuj się ze specjalistą.
          </p>
        </div>
      </div>
    </main>
  )
}
