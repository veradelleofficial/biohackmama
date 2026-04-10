'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

const posts = [
  {
    id: 1,
    image: '/images/pexels-fbyf-studio-1601304170-29705721.webp',
    alt: 'Kobieta na plazy, wellness i biohacking',
    href: 'https://instagram.com/biohackmama',
  },
  {
    id: 2,
    image: '/images/pexels-daria-liudnaya-8187452.webp',
    alt: 'Zdrowy styl zycia i rownowaga hormonalna',
    href: 'https://instagram.com/biohackmama',
  },
  {
    id: 3,
    image: '/images/pexels-daria-liudnaya-8187450.webp',
    alt: 'Spolecznosc kobiet wspierajacych sie wzajemnie',
    href: 'https://instagram.com/veradelleofficial',
  },
  {
    id: 4,
    image: '/images/kira-severinova-5nk1IVc0h5Y-unsplash.webp',
    alt: 'Joga i regeneracja ciala',
    href: 'https://instagram.com/veradelleofficial',
  },
  {
    id: 5,
    image: '/images/pexels-daria-liudnaya-8187444.webp',
    alt: 'Naturalne odzywianie i energia',
    href: 'https://instagram.com/biohackmama',
  },
  {
    id: 6,
    image: '/images/pexels-fbyf-studio-1601304170-29705714.webp',
    alt: 'Aktywny styl zycia na plaży',
    href: 'https://instagram.com/veradelleofficial',
  },
]

const accounts = [
  { handle: '@biohackmama', href: 'https://instagram.com/biohackmama', description: 'Non-toxic life, clean living, biohacking' },
  { handle: '@veradelleofficial', href: 'https://instagram.com/veradelleofficial', description: 'Za kulisami, codziennosc, inspiracje' },
]

export default function InstagramSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div className="container">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-secondary/15 rounded-2xl">
              <Instagram className="w-6 h-6 text-coastal-ocean" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Sledz nas na Instagramie
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {accounts.map((account) => (
              <a
                key={account.handle}
                href={account.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-coastal-ocean/30 rounded-full hover:bg-secondary/10 hover:border-coastal-ocean/50 transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-coastal-ocean" />
                <span className="text-sm font-medium text-coastal-slate">{account.handle}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 hover:border-coastal-ocean/40 transition-all duration-500"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
                style={{ filter: 'sepia(8%) saturate(92%)' }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
              />
              <div className="absolute inset-0 bg-coastal-slate/0 group-hover:bg-coastal-slate/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
