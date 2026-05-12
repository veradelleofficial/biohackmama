export default function Disclaimer() {
  return (
    <section
      style={{ padding: '3rem 0', borderTop: '1px solid var(--lr-rule)' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <p
          className="lr-mono"
          style={{
            color: 'var(--lr-ink-dim)',
            fontSize: '0.625rem',
            letterSpacing: '0.22em',
            lineHeight: 1.8,
          }}
        >
          Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią
          porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji
          lub stylu życia, skonsultuj się z lekarzem.
        </p>
      </div>
    </section>
  )
}
