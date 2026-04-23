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

import Sidebar from '@/components/layout/Sidebar'
import { MobileSidebar } from '@/components/layout/Sidebar'

export default function EbookiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="flex-1 min-w-0">
        {children}
        <div className="container">
          <MobileSidebar />
        </div>
      </div>
      <aside className="hidden xl:block w-[300px] flex-shrink-0 pt-32 pr-8 pl-6">
        <Sidebar />
      </aside>
    </div>
  )
}
