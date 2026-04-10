'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from '@phosphor-icons/react'

const mockArticles = [
  {
    id: 1,
    title: 'Jak naturalne hormony wpływają na twoje samopoczucie',
    excerpt: 'Odkryj głębokie powiązania między hormonami a twoją codzienną energią, nastrojem i zdrowiem.',
    category: 'Hormony',
    readTime: 7,
    date: '2024-04-01',
    image: '/images/pexels-fbyf-studio-1601304170-29705711.webp',
    imageAlt: 'Kobieta na plaży — zdrowie hormonalne i świadomość ciała',
  },
  {
    id: 2,
    title: 'Biohacking snu - zasady do praktykowania dzisiaj',
    excerpt: 'Praktyczne porady na to, jak poprawić jakość snu i obudzić się wyspana każdego dnia.',
    category: 'Sen',
    readTime: 5,
    date: '2024-03-28',
    image: '/images/kira-severinova-5nk1IVc0h5Y-unsplash.webp',
    imageAlt: 'Kobieta praktykująca jogę — regeneracja i spokój',
  },
  {
    id: 3,
    title: 'Adaptogeny - naturalne wsparcie dla stresu',
    excerpt: 'Co to są adaptogeny i jak mogą pomóc ci w radzeniu sobie ze stresem?',
    category: 'Wellness',
    readTime: 6,
    date: '2024-03-25',
    image: '/images/pexels-leeloothefirst-20140033.webp',
    imageAlt: 'Suplementy wellness — adaptogeny na stres',
  },
]

export default function BlogPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-14 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-1.5 md:mb-2">
            <Image src="/images/icon.webp" alt="" width={64} height={64} className="h-14 md:h-16 w-auto" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Najnowsze artykuły
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light px-4 md:px-0" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Porady, strategie i przepisy na twoje zdrowie
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mockArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
            >
              {/* Article image — 16:9 with hover scale */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  style={{ filter: 'sepia(8%) saturate(92%)' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-coastal-sand/10 pointer-events-none" />
              </div>

              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime} min czytania
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading group-hover:text-coastal-gold transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-sm font-light mb-4 line-clamp-2" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={14} weight="duotone" className="text-coastal-ocean" />
                    {new Date(article.date).toLocaleDateString('pl-PL')}
                  </div>
                  <Link
                    href={`/blog/${article.id}`}
                    className="text-coastal-gold hover:text-coastal-gold/80 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-sm font-medium">Czytaj</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/blog"
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl hover:bg-secondary/10 hover:border-coastal-ocean/50 transition-all duration-300 text-cta text-sm"
          >
            Wszystkie artykuły
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
