'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-coastal-slate/5 border-t border-border/50 mt-20">
      <div className="container py-10 md:py-14">
        {/* Newsletter */}
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-normal mb-4 tracking-heading">Subskrybuj newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Twój email..."
              required
              className="flex-1 px-4 py-3 md:px-5 md:py-3.5 bg-card border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all duration-300 text-sm md:text-base"
            />
            <button
              type="submit"
              className="px-6 py-3 md:py-3.5 bg-coastal-gold text-white rounded-2xl hover:brightness-110 hover:shadow-coastal transition-all duration-300 text-cta text-sm"
            >
              Subskrybuj
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 text-sm text-coastal-ocean font-medium">✓ Dziękujemy za rejestrację!</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.webp"
                alt="BioHackMama"
                width={150}
                height={40}
                className="h-14 md:h-16 w-auto"
              />
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
              Zdrowsze alternatywy, biohacking i wellness dla kobiet.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-normal mb-4 tracking-heading text-sm uppercase" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>Produkty</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">Blog</Link></li>
              <li><Link href="/kursy" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">Kursy</Link></li>
              <li><Link href="/ebooki" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">Ebooki</Link></li>
            </ul>
          </div>

          {/* Strona */}
          <div>
            <h4 className="font-heading font-normal mb-4 tracking-heading text-sm uppercase" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>Strona</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/o-mnie" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">O mnie</Link></li>
              <li><Link href="/kontakt" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">Kontakt</Link></li>
              <li><Link href="/polityka-prywatnosci" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">Polityka prywatności</Link></li>
              <li><Link href="/regulamin" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">Regulamin</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-heading font-normal mb-4 tracking-heading text-sm uppercase" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>Śledź nas</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/biohackmama" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300" title="@biohackmama">
                <Instagram size={20} />
              </a>
              <a href="https://instagram.com/veradelleofficial" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300" title="@veradelleofficial">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">
                <Youtube size={20} />
              </a>
              <a href="mailto:contact@biohackmama.pl" className="text-muted-foreground hover:text-coastal-gold transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} BioHackMama. Wszystkie prawa zastrzeżone.</p>
          <p className="text-coastal-ocean">Zrobione z ❤️ dla Twojego zdrowia</p>
        </div>
      </div>
    </footer>
  )
}
