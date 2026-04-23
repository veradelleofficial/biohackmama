import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { LayoutAnimationProvider } from '@/components/layout/LayoutAnimationProvider'
import './globals.css'



const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  weight: ['300', '400', '600'],
})


const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | BioHackMama',
    default: 'BioHackMama – Biohacking i Wellness dla Kobiet | Vera Delle',
  },
  description:
    'Naukowe protokoły biohackingu dopasowane do kobiecego ciała. Hormony, sen, żywienie i longevity – przez Verę Delle, pierwszą polską biohackerkę z wizerunkiem. Kursy, ebooki i artykuły.',
  keywords: [
    'biohacking dla kobiet',
    'biohacking Polska',
    'hormony kobiety naturalnie',
    'wellness kobiety',
    'infradian rhythm po polsku',
    'optymalizacja snu',
    'cycle syncing',
    'longevity dieta',
    'post przerywany kobiety',
    'biohack mama',
    'Vera Delle',
    'zdrowy styl życia kobiety',
    'suplementacja kobiety',
    'biohacking tarczyca',
  ],
  authors: [{ name: 'Vera Delle', url: `${BASE_URL}/o-mnie` }],
  creator: 'Vera Delle',
  publisher: 'BioHackMama',
  category: 'health',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: BASE_URL,
    siteName: 'BioHackMama',
    title: 'BioHackMama – Biohacking i Wellness dla Kobiet',
    description:
      'Naukowe protokoły biohackingu dopasowane do kobiecego ciała. Hormony, sen, żywienie i longevity przez Verę Delle.',
    images: [
      {
        url: '/images/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'BioHackMama – Biohacking i Wellness dla Kobiet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BioHackMama – Biohacking i Wellness dla Kobiet',
    description: 'Naukowe protokoły biohackingu dopasowane do kobiecego ciała. Vera Delle.',
    images: ['/images/og-default.webp'],
    creator: '@veradelleofficial',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'pl-PL': BASE_URL,
    },
  },
  verification: {
    google: 'google7cad2942fe08adc7',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BioHackMama',
  url: BASE_URL,
  description: 'Biohacking i wellness dla kobiet – naukowe protokoły dopasowane do kobiecego ciała',
  author: {
    '@type': 'Person',
    name: 'Vera Delle',
    url: `${BASE_URL}/o-mnie`,
    sameAs: [
      'https://www.instagram.com/veradelleofficial',
      'https://www.instagram.com/biohackmama',
    ],
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vera Delle',
  url: `${BASE_URL}/o-mnie`,
  image: `${BASE_URL}/images/pexels-fbyf-studio-1601304170-29705721.webp`,
  jobTitle: 'Biohackerka, Twórczyni Treści o Zdrowiu i Wellness',
  description:
    'Vera Delle – pierwsza polska biohackerka z wizerunkiem. Dwukrotnie pokonała niedoczynność tarczycy naturalnie. Tworzy kursy i ebooki o biohackingu dla kobiet.',
  knowsAbout: [
    'Biohacking',
    'Hormony kobiety',
    'Optymalizacja snu',
    'Longevity',
    'Żywienie funkcjonalne',
    'Suplementacja',
    'Wellness',
  ],
  sameAs: [
    'https://www.instagram.com/veradelleofficial',
    'https://www.instagram.com/biohackmama',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'BioHackMama',
    url: BASE_URL,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BioHackMama',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.svg`,
  description: 'Platforma edukacyjna o biohackingu i wellness dla kobiet',
  founder: {
    '@type': 'Person',
    name: 'Vera Delle',
  },
  sameAs: [
    'https://www.instagram.com/biohackmama',
    'https://www.instagram.com/veradelleofficial',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@biohackmama.pl',
    contactType: 'customer support',
    availableLanguage: 'Polish',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pl" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
        </head>
        <body>
          <SmoothScrollProvider>
            <Navbar />
            <LayoutAnimationProvider>
              {children}
            </LayoutAnimationProvider>
            <Footer />
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
