# BioHackMama — CLAUDE.md

## Design Context

### Users

Polki w wieku 25–45 lat, które traktują swoje zdrowie poważnie i chcą rozumieć mechanizmy swojego ciała — nie tylko "jeść zdrowo", ale optymalizować hormony, sen, energię na podstawie nauki. Korzystają z telefonu i laptopa, często wieczorami po pracy. Poszukują wiedzy, której nie daje im lekarz pierwszego kontaktu. Chcą czuć się zainspirowane i zmotywowane — "chcę to zrobić, zaczynam dziś" — nie przytłoczone lub zagubione.

### Brand Personality

Naturalna, holistyczna, ciepła.

Marka to naukowiec-przyjaciółka, która mieszka przy morzu i pisze notatki naturalnym tuszem. Mówi o hormonach i biohackingu tak, jak opowiadałaby o gotowaniu — z pasją, precyzją i troską. Nie jest zimna ani kliniczna. Nie jest też influencerką z różowymi balonami. Jest autentyczna, kompetentna i serdeczna.

### Aesthetic Direction

**Motyw**: Jasny (light mode only).

**Paleta**: Coastal Wellness — ciepły piasek (#EFEAE4), stłumiony złoty (#A68A69), oceański niebieski (#7A90A8), głęboki łupek (#48596B). Nie dodawać nowych kolorów poza tokenami `coastal-*`.

**Typografia**: Cormorant Garamond (nagłówki), Inter (treść), Playfair Display (akcenty). System zamknięty — nie dodawać nowych fontów.

**Anti-referencje**: SaaS dark mode, kliniki, MLM wellness, typowy blog zdrowotny.

### Design Principles

1. **Ciepło zamiast sterylności** — unikaj zimnych bieli, klinicznych układów
2. **Zaufanie przez substancję** — treść i nauka prowadzą, nie dekoracja
3. **Kobiece bez infantylizacji** — eleganckie, poważne, naturalne; nie różowe
4. **Inspiracja do działania** — hierarchia wizualna prowadzi do konwersji
5. **Bez SaaS-estetyki** — żadnych ciemnych motywów, neonów, dashboardów

### Technical Constraints

- Next.js 14 App Router + Tailwind CSS
- Framer Motion z istniejącymi easing curves (`--ease-out-strong`, `--ease-spring`)
- Light mode only
- WCAG AA minimum
- Obrazy przez Sanity CDN + Next.js Image
