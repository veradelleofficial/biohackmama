import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-normal tracking-heading mb-2">
            Witaj ponownie
          </h1>
          <p className="text-base font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Zaloguj się do swojego konta
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto w-full',
              card: 'shadow-coastal border border-border/60 rounded-3xl',
              headerTitle: 'font-heading',
              formButtonPrimary:
                'bg-coastal-gold hover:brightness-110 transition-all duration-300 rounded-2xl',
              formFieldInput:
                'rounded-2xl border-border/60 focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60',
              footerActionLink: 'text-coastal-gold hover:text-coastal-gold/80',
            },
          }}
        />
      </div>
    </main>
  )
}
