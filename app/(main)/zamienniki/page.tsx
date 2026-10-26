import type { Metadata } from 'next'
import PageHeader from '@/components/lab-rose/PageHeader'
import SwapsLibrary from './SwapsLibrary'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Zdrowsze zamienniki: co kupić zamiast | BioHackMama',
  description:
    'Proste zamiany na zdrowsze opcje: papier do pieczenia, patelnia, pojemniki, folia spożywcza i więcej. Co zwykle kupujemy w markecie i czym to zastąpić.',
  alternates: { canonical: `${BASE_URL}/zamienniki` },
}

export default function ZamiennikiPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title={
          <>
            Wybierz <span className="lr-rose">zdrowszą</span> opcję.
          </>
        }
        description="Nie musisz wymieniać wszystkiego naraz. Weź jedną rzecz, która właśnie Ci się kończy, i następnym razem kup jej zdrowszą wersję. Krok po kroku."
      />
      <SwapsLibrary />
    </main>
  )
}
