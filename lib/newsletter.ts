// ─── Newsletter subscribe — JEDYNY punkt integracji ──────────────────────────
// Podłączone do Brevo przez /api/newsletter (klucz API server-side w .env.local).
// Lista docelowa: BREVO_LIST_ID (Biohackmama newsletter).

export async function subscribeEmail(
  email: string,
  source: string = 'unknown'
): Promise<{ ok: boolean }> {
  if (!email) return { ok: false }

  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    })
    return { ok: res.ok }
  } catch {
    return { ok: false }
  }
}
