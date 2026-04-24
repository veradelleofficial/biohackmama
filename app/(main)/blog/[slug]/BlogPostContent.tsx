'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Link2, Check } from 'lucide-react'
import { ArticleAudioPlayer } from '@/components/blog/ArticleAudioPlayer'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  category: string
  categorySlug?: string
  pilarSlug?: string
  coverImageUrl?: string | null
  coverImage?: any
  content: any
  author?: string
}

interface RelatedArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  readTime?: number
  category?: string
  coverImageUrl?: string | null
}

// ─── Reading Progress Bar ────────────────────────────────────────────────────

function ReadingProgressBar() {
  // Raw scroll progress 0–100
  const raw = useMotionValue(0)
  // Spring-smoothed — removes all jitter, feels liquid
  const smoothed = useSpring(raw, { stiffness: 100, damping: 28, mass: 0.6 })
  // Map 0–100 → 0–1 for scaleX
  const scaleX = useTransform(smoothed, [0, 100], [0, 1])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      if (scrollHeight > 0) raw.set((scrollTop / scrollHeight) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [raw])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #A68A69 0%, #AECAE8 60%, #A68A69 100%)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function extractHeadings(content: any[]): { id: string; text: string; level: number }[] {
  if (!Array.isArray(content)) return []
  const headings: { id: string; text: string; level: number }[] = []
  for (const block of content) {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      const text = block.children?.map((c: any) => c.text || '').join('') || ''
      if (text) headings.push({ id: slugify(text), text, level: block.style === 'h2' ? 2 : 3 })
    }
  }
  return headings
}

function getCoverUrl(coverImage: any): string | null {
  if (!coverImage) return null
  try {
    if (coverImage?.asset?.url) return coverImage.asset.url
    return urlFor(coverImage).width(1200).height(600).fit('crop').url() || null
  } catch {
    return null
  }
}

// ─── Share Buttons ────────────────────────────────────────────────────────────

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }, [])

  const getUrl = (platform: string) => {
    if (typeof window === 'undefined') return '#'
    const url = encodeURIComponent(window.location.href)
    const t = encodeURIComponent(title)
    if (platform === 'fb') return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    if (platform === 'x') return `https://twitter.com/intent/tweet?url=${url}&text=${t}`
    if (platform === 'wa') return `https://wa.me/?text=${t}%20${url}`
    return '#'
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(72,89,107,0.5)' }}>
        Udostępnij
      </span>
      <a
        href={getUrl('fb')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-coastal-gold/60 hover:bg-coastal-gold/8 transition-all duration-300 text-sm font-bold text-coastal-slate"
        aria-label="Facebook"
      >
        f
      </a>
      <a
        href={getUrl('x')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-coastal-gold/60 hover:bg-coastal-gold/8 transition-all duration-300 text-xs font-bold text-coastal-slate"
        aria-label="X / Twitter"
      >
        𝕏
      </a>
      <a
        href={getUrl('wa')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-coastal-gold/60 hover:bg-coastal-gold/8 transition-all duration-300 text-coastal-slate"
        aria-label="WhatsApp"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <button
        onClick={copyLink}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-coastal-gold/60 hover:bg-coastal-gold/8 transition-all duration-300 text-coastal-slate"
        aria-label="Kopiuj link"
      >
        {copied ? <Check size={12} className="text-coastal-gold" /> : <Link2 size={12} />}
      </button>
    </div>
  )
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0% -60% 0%' }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <div className="my-10 rounded-3xl border border-coastal-gold/25 bg-card overflow-hidden shadow-coastal-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-coastal-gold/4 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📋</span>
          <span className="font-heading text-lg font-semibold tracking-heading text-coastal-slate">
            Spis treści
          </span>
        </div>
        <span
          className="text-coastal-ocean transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>
      {open && (
        <ol className="px-6 pb-5 space-y-1 border-t border-coastal-gold/15">
          {headings.map((h, i) => (
            <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`flex items-start gap-3 py-1.5 text-sm transition-colors duration-200 group ${
                  active === h.id
                    ? 'text-coastal-gold font-medium'
                    : 'text-coastal-slate/70 hover:text-coastal-gold'
                }`}
              >
                <span
                  className={`mt-0.5 text-xs font-medium min-w-[20px] ${
                    active === h.id ? 'text-coastal-gold' : 'text-coastal-ocean/60'
                  }`}
                >
                  {i + 1}.
                </span>
                <span className="leading-snug">{h.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

// ─── Callout Box ─────────────────────────────────────────────────────────────

const calloutConfig = {
  protip: {
    icon: '💡',
    label: 'Pro-tip',
    border: 'border-coastal-gold/50',
    bg: 'bg-coastal-gold/6',
    labelColor: 'text-coastal-gold',
  },
  warning: {
    icon: '⚠️',
    label: 'Uwaga',
    border: 'border-orange-300/60',
    bg: 'bg-orange-50/60',
    labelColor: 'text-orange-600',
  },
  research: {
    icon: '🔬',
    label: 'Badania',
    border: 'border-coastal-ocean/50',
    bg: 'bg-coastal-sky/15',
    labelColor: 'text-coastal-ocean',
  },
  info: {
    icon: 'ℹ️',
    label: 'Info',
    border: 'border-coastal-slate/30',
    bg: 'bg-coastal-slate/5',
    labelColor: 'text-coastal-slate',
  },
  fact: {
    icon: '💎',
    label: 'Ciekawostka',
    border: 'border-emerald-300/50',
    bg: 'bg-emerald-50/50',
    labelColor: 'text-emerald-700',
  },
}

function CalloutBox({ value }: { value: any }) {
  const config = calloutConfig[value.variant as keyof typeof calloutConfig] || calloutConfig.info
  return (
    <div className={`my-8 rounded-2xl border-l-4 p-5 ${config.border} ${config.bg}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{config.icon}</span>
        <span className={`text-xs font-semibold uppercase tracking-widest ${config.labelColor}`}>
          {value.title || config.label}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(72,89,107,0.85)' }}>
        {value.body}
      </p>
    </div>
  )
}

// ─── Inline Link Block ────────────────────────────────────────────────────────

const inlineLinkLabels: Record<string, string> = {
  doswiadcz: 'Doświadcz też',
  dowiedz: 'Dowiedz się też',
  sprawdz: 'Sprawdź też',
  przeczytaj: 'Przeczytaj też',
  zobacz: 'Zobacz też',
}

const inlineLinkIcons: Record<string, string> = {
  article: '📄',
  ebook: '📖',
  instagram: '📸',
  external: '↗',
}

function InlineLinkBlock({ value }: { value: any }) {
  const label = inlineLinkLabels[value.label] || 'Zobacz też'
  const icon = inlineLinkIcons[value.type] || '→'
  const isExternal = value.type === 'instagram' || value.type === 'external'

  return (
    <a
      href={value.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 my-8 rounded-2xl overflow-hidden border border-coastal-slate/20 hover:border-coastal-gold/50 transition-all duration-300 hover:shadow-coastal-sm no-underline"
    >
      <div
        className="flex-shrink-0 flex items-center justify-center px-5 py-4 self-stretch text-white text-xs font-semibold uppercase tracking-widest writing-vertical"
        style={{ background: '#48596B', minWidth: '3.5rem' }}
      >
        <span className="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="flex-1 py-4 pr-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className="font-heading text-lg font-semibold leading-snug group-hover:text-coastal-gold transition-colors duration-300"
            style={{ color: '#48596B' }}
          >
            <span className="mr-2">{icon}</span>
            {value.title}
          </span>
          <span className="flex-shrink-0 text-coastal-gold group-hover:translate-x-1 transition-transform duration-300 mt-1">
            →
          </span>
        </div>
        {value.type && (
          <span className="text-xs text-coastal-ocean/70 mt-1 inline-block">
            {value.type === 'article' && 'Artykuł'}
            {value.type === 'ebook' && 'Ebook'}
            {value.type === 'instagram' && 'Instagram'}
            {value.type === 'external' && 'Link zewnętrzny'}
          </span>
        )}
      </div>
    </a>
  )
}

// ─── Related Articles ─────────────────────────────────────────────────────────

function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="mt-14">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-coastal-gold/40 to-transparent" />
        <h2
          className="text-xs font-semibold uppercase tracking-[0.2em] flex-shrink-0"
          style={{ color: 'rgba(72,89,107,0.55)' }}
        >
          Przeczytaj też
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-coastal-gold/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {articles.map((a) => {
          const coverUrl = a.coverImageUrl || null

          return (
            <Link
              key={a._id}
              href={`/blog/${a.slug.current}`}
              className="group block bg-card rounded-2xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
            >
              <div className="relative w-full h-36 bg-gradient-to-br from-secondary/15 to-primary/8 overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ filter: 'sepia(8%) saturate(88%)' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📄</div>
                )}
              </div>
              <div className="p-4">
                {a.category && (
                  <span className="text-xs text-coastal-ocean/80 font-medium mb-1.5 block">
                    {a.category}
                  </span>
                )}
                <h3
                  className="font-heading font-semibold text-base leading-snug line-clamp-2 group-hover:text-coastal-gold transition-colors duration-300"
                  style={{ color: '#48596B' }}
                >
                  {a.title}
                </h3>
                {a.readTime && (
                  <p className="text-xs mt-2" style={{ color: 'rgba(72,89,107,0.5)' }}>
                    {a.readTime} min czytania
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ─── PortableText Components ──────────────────────────────────────────────────

const makePortableTextComponents = (): PortableTextComponents => ({
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-coastal">
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-muted-foreground mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => <CalloutBox value={value} />,
    inlineLink: ({ value }) => <InlineLinkBlock value={value} />,
    pullQuote: ({ value }) => (
      <blockquote className="my-10 relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
          style={{ background: 'linear-gradient(180deg, #A68A69, #AECAE8)' }}
        />
        <div className="pl-8">
          <p
            className="font-heading text-2xl md:text-3xl font-normal italic leading-snug tracking-heading mb-3"
            style={{ color: 'rgba(72,89,107,0.85)' }}
          >
            "{value.text}"
          </p>
          {value.attribution && (
            <cite className="text-sm font-medium not-italic text-coastal-gold">
              — {value.attribution}
            </cite>
          )}
        </div>
      </blockquote>
    ),
  },
  block: {
    h2: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text || '').join('') || ''
      const id = slugify(text)
      return (
        <h2
          id={id}
          className="text-2xl md:text-3xl font-accent font-semibold normal-case mt-14 mb-5 scroll-mt-24"
          style={{ color: '#213a50', letterSpacing: '-0.02em', lineHeight: '1.2' }}
        >
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text || '').join('') || ''
      const id = slugify(text)
      return (
        <h3
          id={id}
          className="text-xl font-body font-semibold normal-case mt-10 mb-4 scroll-mt-24"
          style={{ color: '#213a50', letterSpacing: '-0.01em' }}
        >
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4
        className="text-lg font-body font-semibold normal-case mt-8 mb-3 scroll-mt-24"
        style={{ color: '#213a50' }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-base font-body" style={{ color: 'rgba(33,58,80,0.90)' }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 border-coastal-gold/60 pl-6 my-6 italic text-lg"
        style={{ color: 'rgba(33,58,80,0.78)' }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 space-y-2.5 pl-0" style={{ color: 'rgba(33,58,80,0.90)' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 space-y-2.5 pl-0 list-decimal list-inside" style={{ color: 'rgba(33,58,80,0.90)' }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 leading-relaxed font-body">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coastal-gold flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="leading-relaxed pl-1 font-body">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold" style={{ color: '#213a50' }}>
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-coastal-gold underline underline-offset-2 hover:text-coastal-gold/75 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
})

// ─── Author Box ───────────────────────────────────────────────────────────────

function AuthorBox({ author }: { author?: string }) {
  return (
    <div className="mt-14 rounded-3xl border border-coastal-gold/25 bg-card p-6 md:p-8 shadow-coastal-sm flex gap-5 items-start">
      <div className="flex-shrink-0">
        <Image
          src="/images/vera-delle.jpg.jpg"
          alt="Vera Delle"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover shadow-coastal-sm"
          style={{ objectPosition: 'center top' }}
        />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-coastal-ocean mb-1">Autorka</p>
        <Link
          href="/o-mnie"
          className="font-heading text-xl font-semibold text-coastal-slate hover:text-coastal-gold transition-colors duration-300"
        >
          {author || 'Vera Delle'}
        </Link>
        <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(72,89,107,0.72)' }}>
          Mama, biohackerka i pasjonatka naturalnego zdrowia. Sama pokonałam niedoczynność tarczycy i rozregulowane hormony. Dzielę się tym, co naprawdę działa, krok po kroku.
        </p>
        <div className="flex gap-3 mt-3">
          <a
            href="https://www.instagram.com/veradelleofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-coastal-gold hover:text-coastal-gold/75 transition-colors"
          >
            Instagram ↗
          </a>
          <Link
            href="/o-mnie"
            className="text-xs font-medium text-coastal-ocean hover:text-coastal-ocean/75 transition-colors"
          >
            O mnie →
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── TL;DR Box ────────────────────────────────────────────────────────────────

function TldrBox({ excerpt }: { excerpt: string }) {
  if (!excerpt) return null
  return (
    <div
      className="my-10 rounded-3xl p-6 border border-coastal-gold/30 shadow-coastal-sm"
      style={{ background: 'linear-gradient(135deg, rgba(166,138,105,0.07) 0%, rgba(174,202,232,0.10) 100%)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">✦</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-coastal-gold">
          W skrócie
        </span>
      </div>
      <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(72,89,107,0.88)' }}>
        {excerpt}
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogPostContent({
  article,
  relatedArticles = [],
}: {
  article: Article | null
  relatedArticles?: RelatedArticle[]
}) {
  const portableTextComponents = useMemo(() => makePortableTextComponents(), [])
  const articleContentRef = useRef<HTMLDivElement>(null)

  const headings = useMemo(
    () => (article?.content ? extractHeadings(article.content) : []),
    [article?.content]
  )

  const coverUrl = article?.coverImageUrl || getCoverUrl(article?.coverImage)

  if (!article) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <h1 className="text-2xl font-heading font-semibold mb-4">Artykuł nie znaleziony</h1>
          <Link href="/blog" className="text-coastal-gold hover:underline">
            Wróć do bloga
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <ReadingProgressBar />

      {/* ── HERO ZONE — header above image, full-bleed cover ──────────────── */}
      <div className="relative">

        {/* Breadcrumb + article header (above image) */}
        <div className="pt-24 md:pt-32 pb-6">
          <div className="container max-w-2xl xl:max-w-3xl">

            {/* Back + breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 flex items-center gap-2 text-sm"
              style={{ color: 'rgba(72,89,107,0.55)' }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 hover:text-coastal-gold transition-colors duration-200"
              >
                <ArrowLeft size={15} />
                Blog
              </Link>
              <span>/</span>
              <span className="truncate max-w-[200px]">{article.title}</span>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-4"
            >
              {article.category && (
                <span className="inline-block text-xs px-3 py-1.5 rounded-full font-medium bg-coastal-sky/25 text-coastal-ocean">
                  {article.category}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.60, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-body font-bold normal-case leading-tight mb-5"
              style={{ color: '#213a50', letterSpacing: '-0.02em' }}
            >
              {article.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.50, delay: 0.12 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div
                className="flex flex-wrap items-center gap-4 text-sm"
                style={{ color: 'rgba(72,89,107,0.6)' }}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : ''}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {article.readTime} min czytania
                </span>
              </div>
              <ShareButtons title={article.title} />
            </motion.div>

          </div>
        </div>

        {/* Full-bleed cover image */}
        {coverUrl ? (
          // layoutId matches the thumbnail in BlogList — Framer Motion animates
          // the image from its card position to this full-bleed hero on navigation.
          <motion.div
            layoutId={`article-cover-${article.slug.current}`}
            className="relative w-full overflow-hidden vintage-film"
            style={{ height: 'clamp(260px, 42vh, 500px)' }}
          >
            <Image
              src={coverUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ filter: 'sepia(8%) saturate(88%)' }}
            />
            {/* Bottom fade to page background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 45%, hsl(33,16%,92%) 100%)',
              }}
            />
          </motion.div>
        ) : (
          // Fallback placeholder when no cover
          <div
            className="w-full"
            style={{
              height: '12px',
              background: 'linear-gradient(135deg, rgba(166,138,105,0.12) 0%, rgba(174,202,232,0.16) 100%)',
            }}
          />
        )}
      </div>

      {/* ── CONTENT — pulls up over hero image ───────────────────────────── */}
      <main className={`relative pb-20 ${coverUrl ? '-mt-16 md:-mt-24' : 'pt-4'}`}>
        <div className="container max-w-2xl xl:max-w-3xl">

          {/* Floating card — overlaps bottom of cover image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-card mb-10 overflow-hidden"
            style={{ boxShadow: 'var(--shadow-float)' }}
          >
            <div className="px-6 py-7 md:px-10 md:py-9">
              <TldrBox excerpt={article.excerpt} />
              <TableOfContents headings={headings} />
            </div>
          </motion.div>

          {/* Audio Player */}
          <ArticleAudioPlayer
            audioSrc={(article as any).audioUrl}
            articleContentRef={articleContentRef}
          />

          {/* Article Content */}
          <motion.div
            ref={articleContentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.65 }}
            className="text-base"
            data-article-content
          >
            {article.content ? (
              <PortableText value={article.content} components={portableTextComponents} />
            ) : (
              <div className="bg-card border border-border/60 rounded-3xl p-8 text-center shadow-coastal-sm">
                <p className="text-muted-foreground">
                  Treść artykułu pojawi się tutaj po dodaniu w Sanity CMS.
                </p>
              </div>
            )}
          </motion.div>

          {/* Divider */}
          <div className="mt-14 mb-10 h-px bg-gradient-to-r from-transparent via-coastal-gold/30 to-transparent" />

          {/* Share again + CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
            <ShareButtons title={article.title} />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-coastal-gold/40 text-coastal-gold hover:bg-coastal-gold hover:text-white transition-all duration-300 text-sm font-medium"
              >
                Zobacz wszystkie artykuły →
              </Link>
            </motion.div>
          </div>

          {/* Ad Slot A-3 — after content, before related articles */}
          <div className="mt-12">
            <a
              href="https://aquatruwater.pxf.io/9LqYAy"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block mx-auto max-w-[728px]"
            >
              <Image
                src="/images/aquatru-ad.jpg.png"
                alt="AquaTru – specjalny rabat, nalicza się automatycznie z linkiem"
                width={728}
                height={120}
                quality={100}
                sizes="(max-width: 728px) 100vw, 728px"
                className="block w-full rounded-2xl"
              />
            </a>
          </div>

          {/* Related Articles */}
          <RelatedArticles articles={relatedArticles} />

          {/* Author Box */}
          <AuthorBox author={article.author} />

          {/* Disclaimer */}
          <div className="mt-10 pt-8 border-t border-border/40 text-center">
            <p
              className="text-xs font-light leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'rgba(72,89,107,0.55)' }}
            >
              Treści prezentowane na tej stronie mają charakter wyłącznie informacyjny i edukacyjny. Nie jestem lekarzem. Dzielę się własnym doświadczeniem. Przed zmianami w diecie, suplementacji lub stylu życia skonsultuj się ze specjalistą.
            </p>
          </div>

        </div>
      </main>
    </>
  )
}
