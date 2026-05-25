import type { Metadata } from 'next'
import LeadMagnetLibrary from './LeadMagnetLibrary'

export const metadata: Metadata = {
  title: 'Darmowe materiały — protokoły, checklisty i przewodniki',
  description:
    'Bezpłatne materiały BioHackMama: poranny protokół, lista toksyn do wyrzucenia, dziennik snu i więcej. Wpisz mail i odbierz od razu na skrzynkę.',
  alternates: { canonical: 'https://biohackmama.pl/darmowe-materialy' },
  openGraph: {
    title: 'Darmowe materiały | BioHackMama',
    description:
      'Bezpłatne protokoły, checklisty i przewodniki. Wpisz mail i odbierz od razu.',
    url: 'https://biohackmama.pl/darmowe-materialy',
    type: 'website',
  },
}

export default function DarmoweMaterialyPage() {
  return <LeadMagnetLibrary />
}
