# Plan SEO – biohackmama.pl
## Kompletny przewodnik krok po kroku

**Autor planu:** Claude AI (na podstawie analizy strony i rynku)
**Data:** Kwiecień 2025
**Cel:** Dominacja w polskim Google na zapytania z zakresu biohackingu, wellness i zdrowia kobiet

---

## CO JUŻ ZOSTAŁO ZROBIONE NA STRONIE (wdrożone automatycznie)

### Techniczne SEO – zrobione:
- [x] `robots.txt` – poprawny, blokuje dashboard/sign-in/studio, wskazuje sitemap
- [x] `sitemap.xml` – dynamiczny, auto-aktualizuje się przy nowych artykułach/kursach/ebookach
- [x] **Metadata globalna** – title template `"%s | BioHackMama"`, kompletne OpenGraph i Twitter Cards
- [x] **JSON-LD schematy globalne** – WebSite, Person (Vera Delle), Organization
- [x] **Strona główna** – unikalna metadata, canonical URL
- [x] **Strona /o-mnie** – metadata + ProfilePage + Person schema z pełnym opisem ekspertyzy
- [x] **Strona /blog** – metadata z opisem kategorii
- [x] **Strona /kursy** – metadata zoptymalizowana transakcyjnie
- [x] **Strona /ebooki** – metadata zoptymalizowana transakcyjnie
- [x] **Strona /kontakt** – metadata
- [x] **Blog artykuły /blog/[slug]** – serwer-side rendering, `generateMetadata` (tytuł, opis, OG:Article, publishedTime), Article schema, BreadcrumbList schema
- [x] **Kursy /kursy/[slug]** – serwer-side rendering, `generateMetadata`, Course schema (z ceną w PLN), BreadcrumbList
- [x] **Ebooki /ebooki/[slug]** – serwer-side rendering, `generateMetadata`, Book schema (z ceną w PLN), BreadcrumbList
- [x] Konwersja stron z client-side na server-side rendering (krytyczne dla indeksacji przez Google)

---

## KROK 1: NATYCHMIASTOWE DZIAŁANIA (Tydzień 1)

### 1.1 Google Search Console – PRIORYTET #1

1. Wejdź na: https://search.google.com/search-console
2. Dodaj właściwość: `biohackmama.pl` (typ: domena)
3. Zweryfikuj przez DNS (dodaj rekord TXT w panelu domeny)
4. Po weryfikacji: `Sitemapy → Dodaj nową → https://biohackmama.pl/sitemap.xml`
5. Poczekaj 24-48h na indeksację

**Co monitorować w GSC:**
- Pokrycie (Coverage) – czy wszystkie strony są zaindeksowane
- Wyniki wyszukiwania – na jakie frazy jesteś widoczna
- Core Web Vitals – szybkość strony
- Problemy ręczne (Manual Actions) – czy nie ma kar

### 1.2 Google Analytics 4 – PRIORYTET #1

1. Utwórz konto: https://analytics.google.com
2. Utwórz strumień danych dla `biohackmama.pl`
3. Skopiuj kod pomiarowy (G-XXXXXXXX)
4. Dodaj do `app/layout.tsx`:

```tsx
// Zainstaluj: npm install @next/third-parties
import { GoogleAnalytics } from '@next/third-parties/google'

// W <body>:
<GoogleAnalytics gaId="G-TWOJ_KOD" />
```

5. Połącz GSC z GA4 (GSC → Ustawienia → Powiązania → Google Analytics)

### 1.3 Obraz OG (OpenGraph) – PRIORYTET #1

Utwórz plik `public/images/og-default.webp` (lub .jpg):
- Wymiary: **1200 x 630 px**
- Treść: Logo BioHackMama + zdjęcie Very + tagline "Biohacking dla kobiet"
- Narzędzie: Canva, Figma
- Zapisz jako og-default.webp

**Bez tego obrazu linki do strony na social mediach wyglądają brzydko.**

### 1.4 Kod weryfikacji GSC w layout.tsx

Po dodaniu strony do GSC, odkomentuj i uzupełnij w `app/layout.tsx`:
```ts
verification: {
  google: 'WSTAW_TU_KOD_Z_GOOGLE_SEARCH_CONSOLE',
},
```

---

## KROK 2: ARCHITEKTURA TREŚCI (Tydzień 1-2)

### 2.1 Zanim napiszesz pierwszy artykuł – utwórz `product-marketing-context`

Plik `.agents/product-marketing-context.md` w root projektu z tymi danymi:

```markdown
# BioHackMama – Kontekst Marketingowy

## Produkt
Platforma edukacyjna o biohackingu i wellness dla kobiet.
URL: https://biohackmama.pl

## Autorka
Vera Delle – pierwsza polska biohackerka z wizerunkiem (@veradelleofficial na IG)
Specjalizacja: biohacking kobiecego ciała, hormony, sen, longevity
Wyróżnik: kobieta z twarzą i dużym zaufaniem na IG (dominacja masc. w tej niszy w PL)

## Cel biznesowy
Sprzedaż kursów online i ebooków. Blog jako silnik ruchu organicznego.

## ICP (Idealny Klient)
- Kobiety 28-45 lat zainteresowane zdrowiem holistycznym
- Otwarte na biohacking, świadome ciała
- Zmęczone standardową medycyną, szukające alternatyw
- Aktywne na IG, oglądają treści o zdrowiu
- Wtórnie: mężczyźni szukający materiałów dla partnerek/dla siebie

## Ton
Bezpośredni, autentyczny, oparty na własnym doświadczeniu.
BEZ medycznych ogólników. BEZ korporacyjnego języka.
```

### 2.2 Struktura URL kategorii (do wdrożenia w Sanity)

Ustaw kategorie artykułów w Sanity dokładnie tak:
- `biohacking-kobiet` → wyświetlane jako "Biohacking Kobiet"
- `sen-regeneracja` → "Sen i Regeneracja"
- `zywienie-metabolizm` → "Żywienie i Metabolizm"
- `wydajnosc-umyslu` → "Wydajność Umysłu"
- `longevity` → "Longevity"
- `suplementacja` → "Suplementacja"

---

## KROK 3: PLAN CONTENTOWY – 10 PIERWSZYCH ARTYKUŁÓW

### Kolejność publikacji (optymalna dla budowania topical authority):

**Miesiąc 1 – Filar Podstawowy:**

| # | Tytuł artykułu | Target fraza główna | Intencja |
|---|----------------|---------------------|----------|
| 1 | Co to jest Infradian Rhythm? Naukowe podstawy kobiecego biohackingu | infradian rhythm po polsku | Informacyjna |
| 2 | Post Przerywany dla Kobiet: Kiedy 16:8 pomaga, a kiedy niszczy hormony | post przerywany kobiety hormony | Informacyjna |
| 3 | Jak Synchronizować Trening z Cyklem (Cycle Syncing – Kompletny Przewodnik) | cycle syncing po polsku | Informacyjna |

**Miesiąc 2 – Rozszerzenie:**

| # | Tytuł | Target | Intencja |
|---|-------|--------|----------|
| 4 | Nosiłam monitor glukozy CGM przez 30 dni. Oto wyniki | CGM dla zdrowej osoby | Informacyjna/Trust |
| 5 | Optymalizacja Snu Kobiety: Temperatura, Rutyna, Suplementy | optymalizacja snu kobiety | Informacyjna |
| 6 | Protokół Porannej Rutyny Biohackerki (7 nawyków opartych na nauce) | poranna rutyna biohacking kobiety | Informacyjna |
| 7 | Ashwagandha dla Kobiet: Dawkowanie, Efekty i Kiedy NIE Brać | ashwagandha dla kobiet | Informacyjna/Komercyjna |

**Miesiąc 3 – Longevity + Niszowe:**

| # | Tytuł | Target | Intencja |
|---|-------|--------|----------|
| 8 | NAD+ i NMN: Czy Suplementacja Długowieczności Ma Sens? | NAD+ suplementacja Polska | Informacyjna |
| 9 | Dlaczego Masz Mgłę Mózgową? 8 Biohackerskich Przyczyn | mgła mózgowa przyczyny | Informacyjna |
| 10 | Bryan Johnson Protokół po Polsku: Co z tego działa? | Bryan Johnson protokół | Informacyjna |

### Szablon pisania artykułu (ZAWSZE):

```
PRZED pisaniem:
1. Sprawdź top 3 wyniki w Google na docelową frazę
2. Zidentyfikuj co brakuje w tych artykułach
3. Twój artykuł MUSI być lepszy w przynajmniej 3 aspektach

STRUKTURA ARTYKUŁU:
- Tytuł: max 60 znaków, fraza na początku
- Meta description: max 155 znaków, fraza + wartość + CTA
- H1: = Tytuł (jeden na stronę)
- H2: główne sekcje (4-8 per artykuł)
- H3: podsekcje
- Pierwsze 100 słów: główna fraza kluczowa naturalnie
- Długość: 1500-3500 słów (zależy od konkurencji)
- FAQ sekcja: 4-6 pytań z odpowiedziami (dla featured snippets)
- Linki wewnętrzne: 2-4 do innych artykułów
- Call to action: newsletter / kurs / ebook na końcu
- Disclaimer zdrowotny: ZAWSZE na końcu
```

---

## KROK 4: TECHNICZNE SEO – LISTA KONTROLNA

### 4.1 Sanity CMS – pola SEO dla artykułów

Dodaj do schema artykułu w Sanity (`sanity/schemaTypes/article.ts` lub podobny):

```ts
// Dodaj te pola:
{
  name: 'seoTitle',
  title: 'SEO Title (max 60 znaków)',
  type: 'string',
  validation: Rule => Rule.max(60)
},
{
  name: 'seoDescription', 
  title: 'Meta Description (max 155 znaków)',
  type: 'text',
  validation: Rule => Rule.max(155)
},
{
  name: 'coverImage',
  title: 'Zdjęcie główne (dla OG)',
  type: 'image',
  options: { hotspot: true }
},
{
  name: 'updatedAt',
  title: 'Data aktualizacji',
  type: 'datetime'
},
{
  name: 'faq',
  title: 'FAQ (dla schema FAQ)',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'question', type: 'string', title: 'Pytanie' },
      { name: 'answer', type: 'text', title: 'Odpowiedź' }
    ]
  }]
}
```

### 4.2 Aktualizacja `generateMetadata` dla artykułów z Sanity

Gdy dodasz pola seoTitle, seoDescription i coverImage, zaktualizuj `app/(main)/blog/[slug]/page.tsx`:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  return {
    title: article.seoTitle || article.title,  // preferuj seoTitle
    description: article.seoDescription || article.excerpt,
    openGraph: {
      images: article.coverImage 
        ? [{ url: urlFor(article.coverImage).width(1200).height(630).url() }]
        : [{ url: '/images/og-default.webp' }]
    }
  }
}
```

### 4.3 FAQ Schema – dodaj do artykułów

W `app/(main)/blog/[slug]/page.tsx`, jeśli artykuł ma FAQ w Sanity:

```ts
const faqSchema = article.faq?.length ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: article.faq.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
} : null
```

**FAQ schema = szansa na featured snippets w Google = darmowy dodatkowy SERP space.**

### 4.4 PortableText – renderowanie treści z Sanity

Blog artykuły pokazują placeholder. Zainstaluj i skonfiguruj PortableText:

```bash
npm install @portabletext/react
```

W `BlogPostContent.tsx`:
```tsx
import { PortableText } from '@portabletext/react'

// Zastąp placeholder:
{article.content && <PortableText value={article.content} />}
```

**Bez tego Google nie widzi treści artykułów!** To najważniejsza zmiana do zrobienia.

### 4.5 Core Web Vitals – optymalizacja

Sprawdź obecne wyniki: https://pagespeed.web.dev (wpisz biohackmama.pl)

Jeśli wynik < 90:
- Obrazy: wszystkie już jako WebP ✅
- Next.js Image: używasz `fill` + `sizes` ✅  
- Fonts: ładowane przez next/font ✅
- Sprawdź czy framer-motion nie spowalnia LCP

### 4.6 HTTPS i canonical

- HTTPS: sprawdź certyfikat SSL (powinien być z Vercel)
- Canonical: dodany do każdej strony ✅
- Brak www vs www: upewnij się że Vercel przekierowuje jedną wersję

---

## KROK 5: E-E-A-T – BUDOWANIE AUTORYTETU

### 5.1 Strona /o-mnie (najważniejsza dla E-E-A-T)

Musi zawierać:
- [ ] Profesjonalne zdjęcie (nie stock foto)
- [ ] Konkretna historia (już jest – świetna!)
- [ ] Liczba lat doświadczenia
- [ ] Co konkretnie wyleczyłaś / zmieniłaś (dowody)
- [ ] Link do Instagrama @veradelleofficial z liczbą obserwujących
- [ ] Ewentualne media/wywiady w których się pojawiłaś
- [ ] Certyfikaty lub kursy które skończyłaś (nawet online)

### 5.2 Stopka autora w artykułach

Każdy artykuł musi mieć blok autora z:
- Zdjęciem (małe, kółko)
- Imię i nazwisko "Vera Delle"
- 1-2 zdania bio
- Link do /o-mnie
- Link do @veradelleofficial

### 5.3 Disclaimer zdrowotny (YMYL)

BioHackMama należy do kategorii YMYL (Your Money Your Life). Google przykłada wagę do E-E-A-T szczególnie tutaj.

Disclaimer jest już na stronach ✅
Dodaj też na każdym artykule indywidualnie (w Sanity lub hardcoded).

### 5.4 Sourcing – cytuj badania

W każdym artykule:
- Linkuj do PubMed/NIH (nie do popularnych blogów)
- Format: `[1] Smith et al., 2023 – link do PubMed`
- Minimum 3-5 źródeł naukowych per artykuł o zdrowiu

---

## KROK 6: LINK BUILDING (Miesiąc 2-3)

### 6.1 Linki wewnętrzne – reguły

**Przy każdym nowym artykule:**
1. Linkuj do 2-4 innych artykułów ze swojego bloga
2. Używaj opisowych anchor textów (`optymalizacja snu w fazie lutealnej`, nie `kliknij tutaj`)
3. Artykuły "spoke" linkują do huba kategorii
4. Hub kategorii linkuje do wszystkich spoke

**Mapa linkowania (zrób to gdy masz 5+ artykułów):**
```
Strona główna → /blog, /kursy, /ebooki, /o-mnie
/blog → artykuły hub każdego filaru
Artykuł o IF → Artykuł o hormonach → Hub "Biohacking Kobiet"
```

### 6.2 Linki zewnętrzne – gdzie szukać

**Łatwe backlinki (zrób w miesiącu 2):**
1. **Katalogi polskie:** katalog.pl, dmoz.pl, firmy.pl (darmowe)
2. **Portale kobiece:** kobieta.pl, glamour.pl, ofeminin.pl → propozycja gościnnego artykułu
3. **Portale zdrowotne:** poradnikzdrowie.pl, medonet.pl → komentarze eksperta
4. **Instagram → blog:** każdy post na IG z linkiem do biohackmama.pl w bio i Stories

**Strategia gościnnych artykułów (miesiąc 3+):**
- Napisz do 3-5 polskich blogów o zdrowiu z propozycją wymiany artykułów
- Jeden artykuł gościnny miesięcznie = 12 backlinków rocznie

### 6.3 Cytowania i wzmianki

- Odpowiadaj na Quora.com (pytania po polsku o biohacking/hormony)
- Udzielaj się w grupach Facebook o zdrowiu kobiet (z linkiem do artykułu)
- Reddit: r/zdrowie, r/Polska (rzadko, tylko gdy faktycznie pomocne)

---

## KROK 7: PROGRAMMATIC SEO – NARZĘDZIA (Miesiąc 3+)

### 7.1 Kalkulator Snu

**URL:** `biohackmama.pl/narzedzia/kalkulator-snu`

```tsx
// Logika: wejście → godzina budzenia, wyjście → optymalne godziny zasypiania
// Cykle snu = 90 minut
// Przykład: budzę się o 7:00 → zaśnij o 23:30, 22:00, 00:30 itd.
// Opcjonalnie: chronotyp → "sowa" vs "skowronek"
```

**Cel SEO:** frazy `kalkulator snu`, `o której iść spać`, `ile spać kalkulator`

### 7.2 Indeks Protokołów Suplementacyjnych

**URL:** `biohackmama.pl/suplementy/[slug]`

Każdy suplement = osobna strona z:
- Dawkowanie (kobiety vs mężczyźni)
- Forma (chelat, glicynian, cytrynian...)
- Pora przyjmowania
- Z czym łączyć / nie łączyć
- Źródła naukowe (PubMed)
- Linki do artykułów powiązanych

**Docelowo 50-100 stron** = 50-100 dodatkowych długoogonowych fraz.

### 7.3 Kalkulator Okna Żywieniowego

**URL:** `biohackmama.pl/narzedzia/okno-zywieniowe`

Wejście: godzina wstawania, faza cyklu, cel (utrata wagi/energia/hormony)
Wyjście: rekomendowane okno żywieniowe + schemat posiłków

---

## KROK 8: MONITORING I KPI

### Co mierzyć (w GSC i GA4):

**Co tydzień:**
- Impresje i kliknięcia w GSC (trend rosnący?)
- Które strony zyskują pozycje
- Błędy indeksacji (Coverage report)

**Co miesiąc:**
- Ranking top 10 fraz docelowych (użyj Ubersuggest free lub Semrush trial)
- Ruch organiczny vs poprzedni miesiąc
- Bounce rate na artykułach (ideał < 60%)
- Czas na stronie (ideał > 2 min dla artykułów)
- Konwersja: ile czytelników zapisuje się do newslettera

### Narzędzia free:
- Google Search Console (gratis, niezbędne)
- Google Analytics 4 (gratis, niezbędne)
- Ubersuggest – 3 free searches/dzień
- Google Rich Results Test – sprawdzanie schema
- PageSpeed Insights – core web vitals

### Narzędzia płatne (warto gdy masz budżet):
- Senuto (polskie, najlepsze dla PL rynku, ~200 zł/mies.)
- Ahrefs lub Semrush (~100 USD/mies.)
- Screaming Frog (darmowy do 500 URL)

---

## KROK 9: NEWSLETTER I LEAD GEN

### 9.1 Lead magnety – co stworzyć jako pierwsze

| Lead Magnet | Strona docelowa | Format | Priorytet |
|-------------|-----------------|--------|-----------|
| "Starter Kit Biohackerki – 7 nawyków na pierwszy tydzień" | Strona główna | PDF 8-12 stron | #1 |
| "Tabela Cycle Syncing: żywienie i trening w 4 fazach" | Artykuł o infradian rhythm | PDF/Infografika | #2 |
| "Protokół snu – checklista 20 punktów" | Artykuł o śnie | PDF | #3 |
| "Lista suplementów z dawkami (dla kobiet)" | Artykuł o suplementach | PDF | #4 |

### 9.2 Platforma email

Polecane dla początku (darmowe do X subskrybentów):
- **Kit (dawniej ConvertKit)** – najlepsze dla twórców, darmowe do 10k subskrybentów
- **Mailerlite** – prosty, darmowy do 1000 subskrybentów
- **Beehiiv** – najlepszy dla newsletterów

### 9.3 Popup exit-intent

Zainstaluj prosty popup (np. przez Hotjar lub własny komponent React):
- Trigger: 60 sekund na stronie LUB zamiar wyjścia
- Treść: oferta lead magnetu (nie "zapisz się na newsletter"!)
- Konwersja: cel 3-5% odwiedzających

---

## KROK 10: HARMONOGRAM DZIAŁAŃ

### Tydzień 1 (Fundament):
- [ ] Dodaj stronę do Google Search Console
- [ ] Dodaj sitemap do GSC
- [ ] Utwórz konto GA4 i dodaj kod śledzenia
- [ ] Utwórz obraz OG (1200x630px) → public/images/og-default.webp
- [ ] Zainstaluj PortableText (`npm install @portabletext/react`)

### Tydzień 2 (Treść):
- [ ] Napisz artykuł #1: Infradian Rhythm (2500+ słów)
- [ ] Dodaj do Sanity z pełną metadata (seoTitle, seoDescription)
- [ ] Stwórz lead magnet #1 (Starter Kit Biohackerki)
- [ ] Dodaj popup z lead magnetem na stronę główną

### Tydzień 3-4 (Rozbudowa):
- [ ] Napisz artykuł #2: Post przerywany dla kobiet
- [ ] Napisz artykuł #3: Cycle syncing
- [ ] Połącz artykuły linkowaniem wewnętrznym
- [ ] Sprawdź GSC – pierwsze dane indeksacji

### Miesiąc 2:
- [ ] Artykuły #4-7
- [ ] Dodaj blok autora do każdego artykułu
- [ ] Stwórz lead magnet #2 (Cycle Syncing tabela)
- [ ] Pierwsze 3-5 backlinków (katalogi, bio na IG)

### Miesiąc 3:
- [ ] Artykuły #8-10
- [ ] Kalkulator snu (narzędzie #1)
- [ ] Propozycja gościnnego artykułu na 2 portale
- [ ] Sprawdź Senuto/GSC – pierwsze pozycje

### Miesiąc 4-6:
- [ ] Indeks Protokołów Suplementacyjnych (50 stron)
- [ ] Kalkulator okna żywieniowego
- [ ] Regularny post-gościnny raz w miesiącu
- [ ] Analiza: które artykuły rankują, które potrzebują aktualizacji

---

## QUICK WINS – Zrób dziś, efekt za 2-4 tygodnie

1. **GSC + sitemap** – bez tego Google nie wie że istniejesz
2. **Obraz OG** – bez tego posty na FB/IG wyglądają brzydko
3. **Artykuł o Infradian Rhythm** – zerowa konkurencja po polsku, fraza rosnąca
4. **PortableText** – bez tego treść artykułów jest niewidoczna dla Google
5. **Lead magnet + popup** – zbieraj emaile od pierwszego dnia

---

## SŁOWNIK KLUCZOWYCH FRAZ DO MONITOROWANIA

### Frazy docelowe (sprawdzaj pozycję co miesiąc w GSC):

**Krótki ogon (trudniejsze, ale warto):**
- biohacking dla kobiet
- hormony kobiety naturalnie
- optymalizacja snu
- post przerywany kobiety

**Długi ogon (zacznij od nich):**
- infradian rhythm po polsku
- cycle syncing po polsku
- co to jest infradian rhythm
- post przerywany a hormony kobiety
- jak synchronizować trening z cyklem
- biohacking dla kobiet po 30/35/40
- poranna rutyna biohacking kobiety
- ashwagandha dla kobiet dawkowanie
- mgła mózgowa przyczyny biohacking
- NAD suplementacja Polska
- Bryan Johnson protokół po polsku

**Frazy brandowe (monitoruj dla reputacji):**
- biohackmama
- vera delle biohacking
- vera delle biohackmama

---

*Dokument wygenerowany automatycznie na podstawie analizy biohackmama.pl i polskiego rynku biohackingu.*
*Aktualizuj ten dokument co kwartał.*
