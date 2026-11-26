import type { Metadata } from 'next'
import ProgramPage from './ProgramPage'
import './program.css'

export const metadata: Metadata = {
  title: 'Zdrowe zamienniki: program',
  description:
    'Program Weroniki o tym, czym zastąpić to, co stoi w kuchni, łazience i sypialni. Konkretne produkty, tańsze domowe wersje i to, co sprawdziłam u siebie.',
  alternates: { canonical: 'https://biohackmama.pl/program' },
}

export default function Page() {
  return <ProgramPage />
}
