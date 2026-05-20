// ─── Newsletter subscribe — JEDYNY punkt integracji ──────────────────────────
// TODO: podłączyć realny system mailingowy (MailerLite / Brevo / Mailchimp).
// Kiedy będzie gotowe API route /api/newsletter, odkomentuj fetch poniżej.
// Na razie symuluje sukces, żeby UX działał — ale MAILE NIE SĄ ZAPISYWANE.

export async function subscribeEmail(
  email: string,
  source: string = 'unknown'
): Promise<{ ok: boolean }> {
  if (!email) return { ok: false }

  // --- Docelowo (po podłączeniu backendu): ---
  // try {
  //   const res = await fetch('/api/newsletter', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, source }),
  //   })
  //   return { ok: res.ok }
  // } catch {
  //   return { ok: false }
  // }

  // --- Tymczasowa symulacja ---
  await new Promise((r) => setTimeout(r, 800))
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(`[newsletter] (symulacja) zapis: ${email} · źródło: ${source}`)
  }
  return { ok: true }
}
