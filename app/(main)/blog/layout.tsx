import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog o Biohackingu i Zdrowiu Kobiet',
  description:
    'Artykuły o biohackingu dla kobiet, optymalizacji snu, hormonach, żywieniu i longevity. Naukowe podejście dopasowane do kobiecego ciała – bez ogólników.',
  alternates: {
    canonical: 'https://biohackmama.pl/blog',
  },
  openGraph: {
    title: 'Blog o Biohackingu i Zdrowiu Kobiet | BioHackMama',
    description:
      'Artykuły o biohackingu dla kobiet, optymalizacji snu, hormonach i longevity. Vera Delle.',
    url: 'https://biohackmama.pl/blog',
    type: 'website',
    siteName: 'BioHackMama',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
