import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticlesByTag } from '@/lib/sanity/queries'
import TopicLandingContent from './TopicLandingContent'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://biohackmama.pl'

const TOPIC_META: Record<string, { label: string; description: string }> = {
  ziololecznictwo: {
    label: 'Ziołolecznictwo',
    description:
      'Adaptogeny, zioła wspierające hormony, sen i odporność. Praktyczne protokoły bez marketingowego szumu.',
  },
  naturopatia: {
    label: 'Naturopatia',
    description:
      'Naturalne podejście do zdrowia: szukamy przyczyn, a nie tłumimy objawów. Co działa, czego nie kupować.',
  },
  'medycyna-chinska': {
    label: 'Medycyna Chińska',
    description:
      'Tradycyjna mądrość TCM zderzona z nowoczesną nauką. Energia, cykl, narządy i nawyki dnia.',
  },
  biohacking: {
    label: 'Biohacking',
    description:
      'Mierzalne strategie optymalizacji ciała i umysłu. Bez gadżetów za miliony — to, co faktycznie działa.',
  },
  longevity: {
    label: 'Longevity',
    description:
      'Żyj długo i w dobrej formie. Co mówi nauka o długowieczności i jak wdrożyć to w mamy-realności.',
  },
  biochemia: {
    label: 'Biochemia',
    description:
      'Zrozum, co naprawdę dzieje się w Twoim organizmie. Hormony, neuroprzekaźniki, szlaki metaboliczne — po ludzku.',
  },
  nootropiki: {
    label: 'Nootropiki',
    description:
      'Wsparcie mózgu, pamięci i koncentracji. Co bezpieczne, co skuteczne, a co tylko ładnie sprzedane.',
  },
  hormony: {
    label: 'Hormony',
    description:
      'Tarczyca, kortyzol, estrogen, progesteron, insulina. Jak je czytać, jak wspierać, kiedy interweniować.',
  },
  'cykl-i-kobiecosc': {
    label: 'Cykl i Kobiecość',
    description:
      'Cykl jako kompas. Co jeść, kiedy trenować i jak żyć w zgodzie z każdą fazą.',
  },
  'rytm-dobowy': {
    label: 'Rytm Dobowy',
    description:
      'Słońce, światło, posiłki i sen. Dlaczego rytm dobowy to fundament wszystkiego, co biohackujesz.',
  },
  sen: {
    label: 'Sen',
    description:
      'Sen jako waluta zdrowia. Higiena snu, suplementy, hacki dla mam i dzieci.',
  },
  'post-przerywany': {
    label: 'Post Przerywany',
    description:
      'IF dla kobiet, mam i hormonów. Kiedy działa, kiedy szkodzi i jak wdrożyć go bez krzywdy.',
  },
  odzywianie: {
    label: 'Odżywianie',
    description:
      'Co jeść, czego unikać i dlaczego. Anty-marketingowe spojrzenie na żywność, oleje i etykiety.',
  },
  suplementacja: {
    label: 'Suplementacja',
    description:
      'Czego warto suplementować, czego nie. Formy, dawki, łączenia — i lista produktów, które testuję.',
  },
  'detoks-i-dom': {
    label: 'Detoks i Dom',
    description:
      'Czyste powietrze, czysta woda, czyste kosmetyki. Low-tox start bez paranoi i bez majątku.',
  },
  'mental-wellness': {
    label: 'Mental Wellness',
    description:
      'Psychika jako część biologii. Stres, regulacja, oddech i konkretne narzędzia codziennego użytku.',
  },
  'stres-i-kortyzol': {
    label: 'Stres i Kortyzol',
    description:
      'Co robi z Tobą przewlekły stres i jak zatrzymać kortyzolową spiralę. Pomiar, suplementy, praktyka.',
  },
}

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = TOPIC_META[params.slug]
  if (!meta) {
    return { title: 'Temat nie znaleziony', robots: { index: false, follow: false } }
  }
  const title = `${meta.label} — wszystkie artykuły | BioHackMama`
  return {
    title,
    description: meta.description,
    alternates: { canonical: `${BASE_URL}/temat/${params.slug}` },
    openGraph: {
      title,
      description: meta.description,
      url: `${BASE_URL}/temat/${params.slug}`,
      type: 'website',
      siteName: 'BioHackMama',
    },
  }
}

export default async function TopicPage({ params }: PageProps) {
  const meta = TOPIC_META[params.slug]
  if (!meta) notFound()

  const articles = await getArticlesByTag(params.slug)

  return (
    <TopicLandingContent
      slug={params.slug}
      label={meta.label}
      description={meta.description}
      articles={(articles as any[]) || []}
    />
  )
}
