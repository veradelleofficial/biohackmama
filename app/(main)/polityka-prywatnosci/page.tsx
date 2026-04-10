'use client'

import { motion } from 'framer-motion'

const sections = [
  {
    title: '1. Administrator danych',
    content: 'Administratorem Twoich danych osobowych jest BioHackMama, prowadzona przez Weronikę Kuźmińczuk. SOOCIALY spółka z ograniczoną odpowiedzialnością, adres: Księcia Witolda 49/15, 50-202 Wrocław, Polska. KRS: 0001172284, NIP: 8982320181, REGON: 541703808.',
  },
  {
    title: '2. Jakie dane zbieramy',
    content: 'Zbieramy dane, które podajesz dobrowolnie: imię, adres e-mail (przy rejestracji, zakupie lub zapisie na newsletter), dane płatności (przetwarzane przez Stripe). Automatycznie zbieramy dane techniczne: adres IP, typ przeglądarki, czas wizyty (pliki cookies i narzędzia analityczne).',
  },
  {
    title: '3. W jakim celu przetwarzamy dane',
    content: 'Twoje dane wykorzystujemy do: realizacji zamówień i dostarczania zakupionych kursów i ebooków, obsługi konta użytkownika, wysyłki newslettera (jeśli wyrazisz zgodę), poprawy jakości naszych usług i strony, kontaktu w sprawie Twoich zapytań.',
  },
  {
    title: '4. Podstawa prawna',
    content: 'Przetwarzamy dane na podstawie: Twojej zgody (art. 6 ust. 1 lit. a RODO), wykonania umowy (art. 6 ust. 1 lit. b RODO), prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO).',
  },
  {
    title: '5. Udostępnianie danych',
    content: 'Twoje dane mogą być udostępniane: Stripe (obsługa płatności), Clerk (autoryzacja i logowanie), Sanity (system zarządzania treścią), dostawcom usług hostingowych i analitycznych. Nie sprzedajemy Twoich danych osobowych podmiotom trzecim.',
  },
  {
    title: '6. Okres przechowywania',
    content: 'Dane przechowujemy tak długo, jak posiadasz konto w naszym serwisie lub jak jest to wymagane przepisami prawa. Dane związane z newsletterem przechowujemy do momentu wypisania się.',
  },
  {
    title: '7. Twoje prawa',
    content: 'Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania, cofnięcia zgody w dowolnym momencie, wniesienia skargi do Prezesa UODO.',
  },
  {
    title: '8. Pliki cookies',
    content: 'Nasza strona korzysta z plików cookies w celu zapewnienia prawidłowego działania serwisu, analizy ruchu i personalizacji treści. Możesz zarządzać ustawieniami cookies w swojej przeglądarce.',
  },
  {
    title: '9. Zmiany w polityce prywatności',
    content: 'Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce prywatności. O istotnych zmianach poinformujemy drogą mailową lub poprzez komunikat na stronie.',
  },
  {
    title: '10. Kontakt',
    content: 'W sprawach dotyczących ochrony danych osobowych skontaktuj się z nami: contact@biohackmama.pl.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-4">
            Polityka prywatności
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
