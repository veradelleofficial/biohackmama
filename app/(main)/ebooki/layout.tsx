import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ebooki o Biohackingu i Zdrowiu Kobiet',
  description:
    'Ebooki PDF o biohackingu, zdrowiu hormonalnym i wellness dla kobiet. Praktyczne przewodniki od Very Delle oparte na własnym doświadczeniu i badaniach naukowych.',
  alternates: {
    canonical: 'https://biohackmama.pl/ebooki',
  },
  openGraph: {
    title: 'Ebooki o Biohackingu i Zdrowiu | BioHackMama',
    description:
      'Ebooki PDF o biohackingu, zdrowiu hormonalnym i wellness dla kobiet. Vera Delle.',
    url: 'https://biohackmama.pl/ebooki',
    type: 'website',
    siteName: 'BioHackMama',
  },
}

export default function EbookiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
