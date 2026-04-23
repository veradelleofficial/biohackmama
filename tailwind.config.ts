import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          deep: 'hsl(var(--secondary-deep))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        coastal: {
          sand: '#EFEAE4',
          gold: '#A68A69',
          sky: '#AECAE8',
          ocean: '#7A90A8',
          slate: '#48596B',
        },
        alabaster:     'hsl(var(--alabaster))',
        'biolum-gold': 'hsl(var(--biolum-gold))',
        'sage-leaf':   'hsl(var(--sage-leaf))',
        'deep-earth':  'hsl(var(--deep-earth))',
        'lab-white':   'hsl(var(--lab-white))',
        graphite:      'hsl(var(--graphite))',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        accent: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      letterSpacing: {
        'heading': '-0.02em',
        'cta': '0.05em',
        'wide-sm': '0.03em',
      },
      lineHeight: {
        'body': '1.6',
        'heading-tight': '1.1',
        'heading': '1.2',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        morph: 'morph 8s ease-in-out infinite',
        fadeIn: 'fadeIn 0.6s ease-out',
        slideUp: 'slideUp 0.7s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out both',
        'floating': 'floatingCard 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(24px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          from: { transform: 'translateY(24px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        floatingCard: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'coastal-sm': '0 4px 12px -2px rgba(166, 138, 105, 0.06)',
        'coastal': '0 8px 24px -4px rgba(166, 138, 105, 0.08)',
        'coastal-lg': '0 16px 40px -8px rgba(166, 138, 105, 0.10)',
        'coastal-xl': '0 24px 48px -12px rgba(166, 138, 105, 0.14)',
        'coastal-blue': '0 8px 24px -4px rgba(122, 144, 168, 0.10)',
        'coastal-blue-lg': '0 16px 40px -8px rgba(122, 144, 168, 0.12)',
        'inner-frost': 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'card': '0 2px 12px rgba(166, 138, 105, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(166, 138, 105, 0.12)',
        'header': '0 1px 3px rgba(72, 89, 107, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config

