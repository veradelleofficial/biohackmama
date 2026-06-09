import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let email = ''
  let source = 'unknown'
  try {
    const body = await req.json()
    email = String(body?.email || '').trim().toLowerCase()
    source = String(body?.source || 'unknown')
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID)

  if (!apiKey || !listId) {
    console.error('[newsletter] Brevo env vars missing')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: false,
        tags: source ? [source] : [],
      }),
    })

    // 201 created, 204 updated — both success
    if (res.ok) {
      return NextResponse.json({ ok: true })
    }

    // Brevo returns 400 "Contact already exist" — treat as success (idempotent)
    const data = await res.json().catch(() => ({}))
    if (res.status === 400 && (data?.code === 'duplicate_parameter' || data?.message?.includes('already exist'))) {
      return NextResponse.json({ ok: true, already: true })
    }

    console.error('[newsletter] Brevo error', res.status, data)
    return NextResponse.json({ ok: false, error: 'brevo_error' }, { status: 502 })
  } catch (err) {
    console.error('[newsletter] fetch failed', err)
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 })
  }
}
