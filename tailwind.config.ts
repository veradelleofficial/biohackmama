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
          sand: '#F2EBDD',   /* cream linen */
          gold: '#4F5E44',   /* sage olive (CTA primary) */
          sky: '#B89668',    /* warm taupe (accent) */
          ocean: '#8B6F47',  /* tobacco (deep accent) */
          slate: '#2D3A2D',  /* forest deep */
        },
        alabaster:     'hsl(var(--alabaster))',
        'biolum-gold': 'hsl(var(--biolum-gold))',
        'sage-leaf':   'hsl(var(--sage-leaf))',
        'deep-earth':  'hsl(var(--deep-earth))',
        'lab-white':   'hsl(var(--lab-white))',
        graphite:      'hsl(var(--graphite))',

        /* ─── Earth Wise overrides for Tailwind semantic palettes ───────────
         * Override default Tailwind palettes so semantic classes (bg-rose-50,
         * text-emerald-700, border-amber-200 itp.) generują ziemiste odcienie
         * pasujące do palety Earth Wise zamiast saturowanych defaultów. */
        rose: {  /* clay terracotta — faza miesiączki, lifestyle, ciepło */
          50:  '#F8EEE6', 100: '#F0DBC8', 200: '#E2BEA1', 300: '#CE9D7A',
          400: '#B8825D', 500: '#9C6647', 600: '#825136', 700: '#673E28',
          800: '#4D2C1C', 900: '#341B12',
        },
        pink: {  /* warm peach-clay */
          50:  '#FAEEE6', 100: '#F2D9C8', 200: '#E5BCA1', 300: '#D49B7A',
          400: '#C07F5D', 500: '#A36347', 600: '#874E36', 700: '#6B3B28',
          800: '#502B1C', 900: '#371B12',
        },
        red: {  /* deep terracotta — alert/error */
          50:  '#F8E8DE', 100: '#F0CEB7', 200: '#E0A983', 300: '#CB7F54',
          400: '#B05D31', 500: '#90471F', 600: '#73381A', 700: '#582B14',
          800: '#3F1F0E', 900: '#261209',
        },
        fuchsia: {  /* warm rose */
          50:  '#F6EAE6', 100: '#EBD0C8', 200: '#D8AB9E', 300: '#BF8472',
          400: '#A26553', 500: '#85503F', 600: '#6A4032', 700: '#503127',
          800: '#39231C', 900: '#231613',
        },
        emerald: {  /* sage olive — success, info, faza folikularna */
          50:  '#EFF1E4', 100: '#DEE3C9', 200: '#C4CCA5', 300: '#A3B07F',
          400: '#869462', 500: '#6C7B4D', 600: '#576540', 700: '#445033',
          800: '#333D26', 900: '#252C1B',
        },
        green: {
          50:  '#EEF1E2', 100: '#DDE2C5', 200: '#C2CC9F', 300: '#A1B079',
          400: '#84945C', 500: '#697B47', 600: '#54643A', 700: '#414F2D',
          800: '#303C22', 900: '#222C18',
        },
        teal: {  /* deep sage */
          50:  '#E8EFE6', 100: '#CFDDC9', 200: '#A6BFA0', 300: '#7E9D78',
          400: '#5F8059', 500: '#496946', 600: '#3A5638', 700: '#2C432B',
          800: '#1F311F', 900: '#152216',
        },
        lime: {  /* light sage */
          50:  '#F2F3DE', 100: '#E2E5BD', 200: '#C8CD92', 300: '#A8AF6B',
          400: '#8B934F', 500: '#717939', 600: '#5B632D', 700: '#454C22',
          800: '#33381A', 900: '#222612',
        },
        amber: {  /* honey wheat — warning, owulacja */
          50:  '#F9F0DA', 100: '#F1DFB3', 200: '#E5C684', 300: '#D4A859',
          400: '#C18F38', 500: '#A57624', 600: '#86601D', 700: '#684A18',
          800: '#4D3712', 900: '#33260C',
        },
        yellow: {  /* sunlit honey */
          50:  '#FAF2DC', 100: '#F4E2B0', 200: '#E8C778', 300: '#D5A648',
          400: '#BE8A28', 500: '#9F7220', 600: '#825D1A', 700: '#624715',
          800: '#48340F', 900: '#2F210A',
        },
        orange: {  /* terracotta */
          50:  '#FAEBE0', 100: '#F2D2BC', 200: '#E5AE89', 300: '#D38858',
          400: '#BC6932', 500: '#9F541E', 600: '#824218', 700: '#653213',
          800: '#4A240D', 900: '#321809',
        },
        indigo: {  /* mauve — fact, faza lutealna (jedyny chłodniejszy ton) */
          50:  '#EBE7E5', 100: '#D5CECB', 200: '#B5ABA7', 300: '#928481',
          400: '#74655F', 500: '#5C4D49', 600: '#4A3E3A', 700: '#39302D',
          800: '#2A2421', 900: '#1C1816',
        },
        violet: {  /* dusty plum */
          50:  '#EDE7E8', 100: '#D8CECF', 200: '#B7A6A8', 300: '#917D7F',
          400: '#735D5F', 500: '#594548', 600: '#473637', 700: '#372829',
          800: '#291D1E', 900: '#1B1314',
        },
        purple: {  /* deep mauve */
          50:  '#EAE6E7', 100: '#D2CACC', 200: '#AC9FA2', 300: '#857678',
          400: '#695A5C', 500: '#504345', 600: '#403436', 700: '#312729',
          800: '#241D1F', 900: '#181214',
        },
        sky: {  /* warm cream-taupe — ZERO blue */
          50:  '#F6EFE0', 100: '#EBDCBE', 200: '#DBC18A', 300: '#C29D5C',
          400: '#A37F3C', 500: '#86652C', 600: '#6A5024', 700: '#503D1C',
          800: '#392B14', 900: '#241A0C',
        },
        blue: {  /* warm stone — ZERO blue undertone */
          50:  '#EFEAE0', 100: '#DDD3BE', 200: '#C2B294', 300: '#A48E6C',
          400: '#86714F', 500: '#6C593C', 600: '#574830', 700: '#423626',
          800: '#2E261B', 900: '#1B1610',
        },
        cyan: {  /* warm sage-stone — ZERO cyan */
          50:  '#EDECE2', 100: '#D7D3C0', 200: '#B7B193', 300: '#948C6A',
          400: '#776F4F', 500: '#5F583E', 600: '#4C4733', 700: '#3A3627',
          800: '#28251C', 900: '#171510',
        },
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
        'coastal-sm': '0 4px 12px -2px rgba(79, 94, 68, 0.06)',
        'coastal': '0 8px 24px -4px rgba(79, 94, 68, 0.08)',
        'coastal-lg': '0 16px 40px -8px rgba(79, 94, 68, 0.10)',
        'coastal-xl': '0 24px 48px -12px rgba(79, 94, 68, 0.14)',
        'coastal-blue': '0 8px 24px -4px rgba(184, 150, 104, 0.12)',
        'coastal-blue-lg': '0 16px 40px -8px rgba(184, 150, 104, 0.14)',
        'inner-frost': 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'card': '0 2px 12px rgba(79, 94, 68, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(45, 58, 45, 0.12)',
        'header': '0 1px 3px rgba(45, 58, 45, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config

