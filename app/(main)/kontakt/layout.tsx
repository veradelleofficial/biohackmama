import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – Napisz do Very Delle',
  description:
    'Skontaktuj się z Verą Delle. Pytania o kursy, ebooki, współpracę lub biohacking – odpiszę w ciągu 24-48 godzin.',
  alternates: {
    canonical: 'https://biohackmama.pl/kontakt',
  },
  openGraph: {
    title: 'Kontakt | BioHackMama',
    description: 'Skontaktuj się z Verą Delle – pytania o kursy, współpracę lub biohacking.',
    url: 'https://biohackmama.pl/kontakt',
    type: 'website',
    siteName: 'BioHackMama',
  },
}

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
