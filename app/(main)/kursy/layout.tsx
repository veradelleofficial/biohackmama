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

import Sidebar from '@/components/layout/Sidebar'
import { MobileSidebar } from '@/components/layout/Sidebar'

export default function KursyLayout({ children }: { children: React.ReactNode }) {
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
