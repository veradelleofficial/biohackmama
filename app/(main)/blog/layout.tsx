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

import Sidebar from '@/components/layout/Sidebar'
import { MobileSidebar } from '@/components/layout/Sidebar'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="flex-1 min-w-0">
        {children}
        <div className="container max-w-5xl">
          <MobileSidebar />
        </div>
      </div>
      <aside className="hidden xl:block w-[300px] flex-shrink-0 pt-32 pr-8 pl-6">
        <Sidebar />
      </aside>
    </div>
  )
}
