import type { Metadata } from 'next'
import LabRoseScope from '@/components/lab-rose/LabRoseScope'
import Hero from '@/components/lab-rose/Hero'
import StatsBar from '@/components/lab-rose/StatsBar'
import StartHere from '@/components/lab-rose/StartHere'
import FeaturedCourses from '@/components/lab-rose/FeaturedCourses'
import FeaturedEbooks from '@/components/lab-rose/FeaturedEbooks'
import BlogPreview from '@/components/lab-rose/BlogPreview'
import Authority from '@/components/lab-rose/Authority'
import NewsletterCTA from '@/components/lab-rose/NewsletterCTA'
import SignatureBlock from '@/components/lab-rose/SignatureBlock'
import Disclaimer from '@/components/lab-rose/Disclaimer'

export const metadata: Metadata = {
  title: 'BioHackMama – Holistyczny, low-tox biohacking | Weronika Kuźmińczuk',
  description:
    'Holistyczne, low-tox podejście do zdrowia: mierzone protokoły hormonalne, snu i regeneracji oparte na badaniach. Świadomy styl życia bez ezoteryki i bez suplementacji za 800 zł miesięcznie.',
  alternates: {
    canonical: 'https://biohackmama.pl',
  },
  openGraph: {
    title: 'BioHackMama – Holistyczny, low-tox biohacking',
    description:
      'Holistyczne, low-tox podejście do zdrowia. Świadomy styl życia i mierzone protokoły hormonalne, snu i regeneracji oparte na badaniach.',
    url: 'https://biohackmama.pl',
    type: 'website',
  },
}

export default function Home() {
  return (
    <LabRoseScope>
      <Hero />
      <StatsBar />
      <StartHere />
      <FeaturedCourses />
      <FeaturedEbooks />
      <Authority />
      <BlogPreview />
      <NewsletterCTA />
      <SignatureBlock />
      <Disclaimer />
    </LabRoseScope>
  )
}
