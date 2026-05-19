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
  title: 'BioHackMama – Naukowy biohacking dla mam | Vera Delle',
  description:
    'Mierzone protokoły hormonalne, snu i regeneracji oparte na badaniach. Bez ezoteryki, bez suplementacji za 800 zł miesięcznie. Tylko to, co działa w 14 dni. Vera Delle.',
  alternates: {
    canonical: 'https://biohackmama.pl',
  },
  openGraph: {
    title: 'BioHackMama – Naukowy biohacking dla mam',
    description:
      'Mierzone protokoły hormonalne, snu i regeneracji. Bez ezoteryki. Tylko to, co działa w 14 dni.',
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
