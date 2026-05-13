import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <main className="min-h-[90vh] flex items-center justify-center py-16 md:py-24 px-4">
      <div className="w-full max-w-md">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
          <ol
            className="lr-mono flex items-center gap-2 flex-wrap"
            style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
          >
            <li>
              <Link href="/" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>
                HOME
              </Link>
            </li>
            <li>/</li>
            <li style={{ color: 'var(--lr-rose)' }}>ZALOGUJ</li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <span className="lr-eyebrow">Konto</span>
          <h1 className="mt-6 mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Witaj{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              ponownie.
            </span>
          </h1>
          <p style={{ maxWidth: '36ch', margin: '0 auto', fontSize: '0.9375rem' }}>
            Zaloguj się do swojego konta, żeby kontynuować.
          </p>
        </div>

        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#C9F24F',
              colorBackground: '#1E1B16',
              colorText: '#F4EFE6',
              colorTextSecondary: '#B8B0A3',
              colorInputBackground: '#0E0D0A',
              colorInputText: '#F4EFE6',
              colorDanger: '#E8AEBD',
              borderRadius: '2px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '0.9375rem',
            },
            elements: {
              rootBox: 'mx-auto w-full',
              card:
                'border bg-[#1E1B16] shadow-[0_28px_64px_-16px_rgba(0,0,0,0.65)]',
              headerTitle: 'font-heading text-[#F4EFE6] !text-base',
              headerSubtitle: 'text-[#B8B0A3] !text-xs',
              socialButtonsBlockButton:
                'border border-[#46402F] bg-[#0E0D0A] text-[#F4EFE6] hover:bg-[#262218]',
              socialButtonsBlockButtonText: 'text-[#F4EFE6]',
              dividerLine: 'bg-[#2A2622]',
              dividerText: 'text-[#948C7F]',
              formFieldLabel: 'text-[#B8B0A3] text-xs uppercase tracking-widest',
              formFieldInput:
                'bg-[#0E0D0A] border border-[#46402F] text-[#F4EFE6] focus:border-[#C9F24F] focus:ring-1 focus:ring-[#C9F24F]',
              formButtonPrimary:
                'bg-[#C9F24F] text-[#0E0D0A] hover:bg-[#E8AEBD] font-mono tracking-widest uppercase text-xs font-semibold',
              footerActionText: 'text-[#B8B0A3]',
              footerActionLink: 'text-[#C9F24F] hover:text-[#D4FF3D]',
              identityPreviewText: 'text-[#F4EFE6]',
              identityPreviewEditButton: 'text-[#C9F24F]',
              otpCodeFieldInput: 'bg-[#0E0D0A] border border-[#46402F] text-[#F4EFE6]',
            },
          }}
        />
      </div>
    </main>
  )
}
