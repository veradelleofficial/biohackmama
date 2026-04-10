import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
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

export const metadata: Metadata = {
  title: 'BioHackMama - Biohacking i wellness dla kobiet',
  description: 'Praktyczne poradniki, efektywne kursy i ebooki na temat zdrowia, wellness i biohackingu',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://biohackmama.pl',
    siteName: 'BioHackMama',
    title: 'BioHackMama',
    description: 'Zdrowiej, biohackuj, rośnij',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BioHackMama',
    description: 'Biohacking i wellness dla kobiet',
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
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
