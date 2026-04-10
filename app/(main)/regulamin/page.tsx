'use client'

import { motion } from 'framer-motion'

const sections = [
  {
    title: '1. Postanowienia ogólne',
    content: 'Niniejszy regulamin określa zasady korzystania z serwisu biohackmama.pl, prowadzonego przez Weronikę Kuźmińczuk, reprezentującą SOOCIALY spółkę z ograniczoną odpowiedzialnością. KRS: 0001172284, NIP: 8982320181, REGON: 541703808. Adres siedziby: Księcia Witolda 49/15, 50-202 Wrocław, Polska. Korzystając z serwisu, akceptujesz poniższe warunki.',
  },
  {
    title: '2. Definicje',
    content: 'Serwis: strona internetowa biohackmama.pl wraz ze wszystkimi podstronami. Użytkownik: każda osoba korzystająca z Serwisu. Kurs: produkt cyfrowy w formie materiałów wideo i tekstowych. Ebook: produkt cyfrowy w formie publikacji elektronicznej (PDF). Konto: indywidualny profil Użytkownika w Serwisie.',
  },
  {
    title: '3. Rejestracja i konto',
    content: 'Rejestracja w serwisie jest dobrowolna i bezpłatna. Do rejestracji wymagane jest podanie adresu e-mail. Użytkownik zobowiązuje się do podania prawdziwych danych. Konto można usunąć w dowolnym momencie kontaktując się z nami.',
  },
  {
    title: '4. Zakupy i płatności',
    content: 'Ceny podane w serwisie są cenami brutto w polskich złotych. Płatności obsługiwane są przez Stripe. Po dokonaniu płatności Użytkownik otrzymuje natychmiastowy dostęp do zakupionego produktu. Faktura VAT wystawiana jest na życzenie.',
  },
  {
    title: '5. Dostęp do produktów',
    content: 'Kursy dostępne są w panelu użytkownika po zalogowaniu. Dostęp do kursów jest bezterminowy od momentu zakupu. Ebooki dostępne są do pobrania w formacie PDF. Link do pobrania aktywny jest bezterminowo.',
  },
  {
    title: '6. Prawo odstąpienia',
    content: 'Zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, prawo odstąpienia od umowy nie przysługuje w przypadku dostarczania treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy.',
  },
  {
    title: '7. Prawa autorskie',
    content: 'Wszystkie materiały w serwisie (teksty, grafiki, wideo, ebooki, kursy) są chronione prawem autorskim. Zakup produktu oznacza nabycie licencji na użytek osobisty. Zabrania się kopiowania, udostępniania, odsprzedawania lub rozpowszechniania zakupionych materiałów.',
  },
  {
    title: '8. Charakter treści',
    content: 'Treści prezentowane w serwisie mają charakter edukacyjny i informacyjny. Nie stanowią porady medycznej, dietetycznej ani farmaceutycznej. Przed wprowadzeniem zmian w diecie, suplementacji lub stylu życia skonsultuj się z lekarzem lub wykwalifikowanym specjalistą. Autorka dzieli się własnym doświadczeniem i nie ponosi odpowiedzialności za decyzje zdrowotne podjęte na podstawie prezentowanych treści.',
  },
  {
    title: '9. Reklamacje',
    content: 'Reklamacje można składać drogą mailową na adres contact@biohackmama.pl. Reklamacja powinna zawierać opis problemu oraz dane kontaktowe. Reklamacje rozpatrywane są w terminie 14 dni roboczych.',
  },
  {
    title: '10. Zmiany regulaminu',
    content: 'Zastrzegamy sobie prawo do zmiany regulaminu. O istotnych zmianach Użytkownicy zostaną poinformowani drogą mailową. Korzystanie z serwisu po wprowadzeniu zmian oznacza ich akceptację.',
  },
  {
    title: '11. Kontakt',
    content: 'W sprawach związanych z regulaminem i działaniem serwisu: contact@biohackmama.pl.',
  },
]

export default function TermsPage() {
  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-4">
            Regulamin
          </h1>
          <p className="text-sm font-light mb-10" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Ostatnia aktualizacja: 10 kwietnia 2026
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="font-heading font-semibold text-xl mb-3 tracking-heading">
                {section.title}
              </h2>
              <p className="font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
