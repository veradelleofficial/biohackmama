import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kursy Online o Biohackingu i Zdrowiu',
  description:
    'Kursy online z biohackingu dla kobiet. Hormony w równowadze, optymalizacja snu, żywienie i longevity. Praktyczna wiedza oparta na nauce i własnym doświadczeniu Very Delle.',
  alternates: {
    canonical: 'https://biohackmama.pl/kursy',
  },
  openGraph: {
    title: 'Kursy Online o Biohackingu | BioHackMama',
    description:
      'Kursy online z biohackingu dla kobiet – hormony, sen, żywienie, longevity. Vera Delle.',
    url: 'https://biohackmama.pl/kursy',
    type: 'website',
    siteName: 'BioHackMama',
  },
}

export default function KursyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
