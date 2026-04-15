import type { Metadata } from 'next'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'O mnie – Vera Delle, Biohackerka i Twórczyni BioHackMama',
  description:
    'Vera Delle – pierwsza polska biohackerka z wizerunkiem. Dwukrotnie pokonała niedoczynność tarczycy naturalnie. Tworzy kursy i artykuły o biohackingu dla kobiet. Poznaj jej historię.',
  alternates: {
    canonical: `${BASE_URL}/o-mnie`,
  },
  openGraph: {
    title: 'O mnie – Vera Delle | BioHackMama',
    description:
      'Vera Delle – biohackerka, która dwukrotnie pokonała niedoczynność tarczycy naturalnie. Historia, wartości i misja BioHackMama.',
    url: `${BASE_URL}/o-mnie`,
    type: 'profile',
    siteName: 'BioHackMama',
    images: [
      {
        url: `${BASE_URL}/images/pexels-fbyf-studio-1601304170-29705721.webp`,
        width: 800,
        height: 1067,
        alt: 'Vera Delle – BioHackMama',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O mnie – Vera Delle | BioHackMama',
    description: 'Vera Delle – biohackerka, która dwukrotnie pokonała niedoczynność tarczycy naturalnie.',
    creator: '@veradelleofficial',
    images: [`${BASE_URL}/images/pexels-fbyf-studio-1601304170-29705721.webp`],
  },
}

export default function OMnieLayout({ children }: { children: React.ReactNode }) {
  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Vera Delle',
      url: `${BASE_URL}/o-mnie`,
      image: `${BASE_URL}/images/pexels-fbyf-studio-1601304170-29705721.webp`,
      jobTitle: 'Biohackerka, Twórczyni Treści o Zdrowiu i Wellness',
      description:
        'Vera Delle – pierwsza polska biohackerka z wizerunkiem. Dwukrotnie pokonała niedoczynność tarczycy naturalnie. Tworzy kursy i artykuły o biohackingu dopasowanym do kobiecego ciała.',
      sameAs: [
        'https://www.instagram.com/veradelleofficial',
        'https://www.instagram.com/biohackmama',
      ],
      knowsAbout: [
        'Biohacking dla kobiet',
        'Optymalizacja hormonów',
        'Infradian rhythm',
        'Optymalizacja snu',
        'Longevity',
        'Żywienie funkcjonalne',
        'Suplementacja',
        'Niedoczynność tarczycy leczenie naturalne',
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      {children}
    </>
  )
}
