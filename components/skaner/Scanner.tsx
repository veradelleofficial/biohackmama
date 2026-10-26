'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, Image as ImageIcon, Keyboard, ScanBarcode, Star, RotateCcw } from 'lucide-react'
import type { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser'

const EASE = [0.22, 1, 0.36, 1] as const

type Mode = 'camera' | 'photo' | 'manual'

interface Flag { id: string; name: string; severity: 'avoid' | 'limit'; reason: string }
interface Result {
  found: boolean
  ean: string
  kind?: 'food' | 'cosmetic'
  source?: string
  sourceUrl?: string
  name?: string
  brand?: string
  image?: string | null
  ingredientsText?: string
  stars?: 1 | 2 | 3 | 4 | 5
  verdict?: 'buy' | 'alternative' | 'avoid'
  verdictLabel?: string
  verdictText?: string
  flags?: Flag[]
  hasIngredients?: boolean
  error?: string
}

const VERDICT_COLOR: Record<string, string> = {
  buy: 'var(--lr-accent)',
  alternative: '#F0B35A',
  avoid: '#FF7A8A',
}

async function makeReader(): Promise<BrowserMultiFormatReader> {
  const [{ BrowserMultiFormatReader }, { DecodeHintType, BarcodeFormat }] = await Promise.all([
    import('@zxing/browser'),
    import('@zxing/library'),
  ])
  const hints = new Map()
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E,
  ])
  hints.set(DecodeHintType.TRY_HARDER, true)
  return new BrowserMultiFormatReader(hints)
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} na 5 gwiazdek`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 400, damping: 18 }}
        >
          <Star
            size={22}
            strokeWidth={1.5}
            fill={i <= n ? 'var(--lr-accent)' : 'transparent'}
            color={i <= n ? 'var(--lr-accent)' : 'var(--lr-rule-strong)'}
          />
        </motion.span>
      ))}
    </div>
  )
}

export default function Scanner({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>('camera')
  const [scanning, setScanning] = useState(false)
  const [camError, setCamError] = useState<string | null>(null)
  const [manual, setManual] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [showIngredients, setShowIngredients] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<IScannerControls | null>(null)

  const stopCamera = useCallback(() => {
    controlsRef.current?.stop()
    controlsRef.current = null
    setScanning(false)
  }, [])

  useEffect(() => stopCamera, [stopCamera])

  const lookup = useCallback(async (ean: string) => {
    stopCamera()
    setLoading(true)
    setResult(null)
    setShowIngredients(false)
    try {
      const res = await fetch(`/api/sklad?ean=${encodeURIComponent(ean)}`)
      const data = (await res.json()) as Result
      setResult(res.ok ? data : { found: false, ean, error: data.error })
    } catch {
      setResult({ found: false, ean, error: 'Brak połączenia. Spróbuj jeszcze raz.' })
    } finally {
      setLoading(false)
    }
  }, [stopCamera])

  const startCamera = useCallback(async () => {
    setCamError(null)
    setResult(null)
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamError('Ta przeglądarka nie daje dostępu do aparatu. Zrób zdjęcie kodu albo wpisz numer.')
      return
    }
    try {
      const reader = await makeReader()
      setScanning(true)
      controlsRef.current = await reader.decodeFromConstraints(
        { video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } } },
        videoRef.current!,
        (res) => {
          if (res) {
            if (navigator.vibrate) navigator.vibrate(60)
            lookup(res.getText())
          }
        },
      )
    } catch (e: any) {
      setScanning(false)
      setCamError(
        e?.name === 'NotAllowedError'
          ? 'Nie mam zgody na aparat. Zezwól na dostęp w ustawieniach przeglądarki albo zrób zdjęcie kodu.'
          : 'Nie udało się włączyć aparatu. Zrób zdjęcie kodu albo wpisz numer.',
      )
    }
  }, [lookup])

  const onPhoto = async (file?: File) => {
    if (!file) return
    setCamError(null)
    setResult(null)
    setLoading(true)
    const url = URL.createObjectURL(file)
    try {
      const reader = await makeReader()
      const res = await reader.decodeFromImageUrl(url)
      await lookup(res.getText())
    } catch {
      setLoading(false)
      setResult({ found: false, ean: '', error: 'Nie widzę kodu na zdjęciu. Zrób je z bliska, prosto i przy dobrym świetle.' })
    } finally {
      URL.revokeObjectURL(url)
    }
  }

  const switchMode = (m: Mode) => {
    if (m !== 'camera') stopCamera()
    setMode(m)
    setCamError(null)
  }

  const reset = () => {
    setResult(null)
    setManual('')
    if (mode === 'camera') startCamera()
  }

  const TABS: { id: Mode; label: string; Icon: typeof Camera }[] = [
    { id: 'camera', label: 'Aparat', Icon: Camera },
    { id: 'photo', label: 'Zdjęcie', Icon: ImageIcon },
    { id: 'manual', label: 'Wpisz', Icon: Keyboard },
  ]

  return (
    <div className="lr-scanner">
      {/* Zakładki trybu */}
      {!result && (
        <div className="lr-scanner__tabs" role="tablist">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={mode === id}
              onClick={() => switchMode(id)}
              className={`lr-scanner__tab ${mode === id ? 'is-active' : ''}`}
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Wejście */}
      {!result && !loading && (
        <div className="mt-4">
          {mode === 'camera' && (
            <div>
              <div className="lr-scanner__viewport" style={{ aspectRatio: compact ? '4 / 3' : '16 / 10' }}>
                <video ref={videoRef} muted playsInline className={scanning ? '' : 'opacity-0'} />
                {scanning ? (
                  <>
                    <div className="lr-scanner__frame" aria-hidden />
                    <div className="lr-scanner__laser" aria-hidden />
                    <span className="lr-scanner__hint lr-mono">Nakieruj na kod kreskowy</span>
                  </>
                ) : (
                  <button type="button" onClick={startCamera} className="lr-scanner__start">
                    <ScanBarcode size={34} strokeWidth={1.25} />
                    <span>Włącz aparat i zeskanuj</span>
                  </button>
                )}
              </div>
              {scanning && (
                <button type="button" onClick={stopCamera} className="lr-scanner__link mt-3">
                  Wyłącz aparat
                </button>
              )}
            </div>
          )}

          {mode === 'photo' && (
            <label className="lr-scanner__drop">
              <ImageIcon size={30} strokeWidth={1.25} />
              <span>Zrób zdjęcie kodu kreskowego albo wybierz je z galerii</span>
              <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.18em' }}>
                z bliska · prosto · przy dobrym świetle
              </span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(e) => onPhoto(e.target.files?.[0])}
              />
            </label>
          )}

          {mode === 'manual' && (
            <form
              onSubmit={(e) => { e.preventDefault(); if (manual.replace(/\D/g, '').length >= 8) lookup(manual) }}
              className="flex flex-col gap-3"
            >
              <input
                inputMode="numeric"
                autoComplete="off"
                value={manual}
                onChange={(e) => setManual(e.target.value.replace(/[^\d ]/g, ''))}
                placeholder="np. 5900259128843"
                className="lr-lead-card__input lr-mono"
                aria-label="Numer kodu kreskowego"
                style={{ width: '100%', letterSpacing: '0.12em' }}
              />
              <button type="submit" className="lr-cta-primary" style={{ justifyContent: 'center' }} disabled={manual.replace(/\D/g, '').length < 8}>
                Sprawdź skład <span aria-hidden>→</span>
              </button>
              <p style={{ fontSize: '0.8125rem', color: 'var(--lr-ink-dim)' }}>
                Numer znajdziesz pod kodem kreskowym, zwykle 13 cyfr.
              </p>
            </form>
          )}

          {camError && <p className="lr-lead-card__err mt-3">{camError}</p>}
        </div>
      )}

      {/* Ładowanie */}
      {loading && (
        <div className="lr-scanner__loading">
          <span className="lr-scanner__spinner" aria-hidden />
          <span className="lr-mono">Czytam skład…</span>
        </div>
      )}

      {/* Wynik */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            key={result.ean + (result.found ? 'y' : 'n')}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-2"
          >
            {result.found && result.hasIngredients ? (
              <div>
                <div className="flex gap-4 items-start">
                  {result.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={result.image} alt="" className="lr-scanner__thumb" />
                  )}
                  <div className="min-w-0">
                    <p className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.18em' }}>
                      {result.kind === 'cosmetic' ? 'Kosmetyk' : 'Żywność'} · {result.ean}
                    </p>
                    <h3 style={{ fontSize: '1.125rem', marginTop: '0.25rem' }}>
                      {result.name || 'Produkt bez nazwy'}
                    </h3>
                    {result.brand && <p style={{ fontSize: '0.875rem', color: 'var(--lr-ink-soft)' }}>{result.brand}</p>}
                  </div>
                </div>

                <div className="lr-scanner__verdict" style={{ ['--v' as any]: VERDICT_COLOR[result.verdict!] }}>
                  <Stars n={result.stars!} />
                  <p className="lr-scanner__verdict-label">{result.verdictLabel}</p>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>{result.verdictText}</p>
                </div>

                {result.flags && result.flags.length > 0 && (
                  <ul className="lr-scanner__flags">
                    {result.flags.map((f) => (
                      <li key={f.id} className={`is-${f.severity}`}>
                        <span className="lr-mono lr-scanner__badge">{f.severity === 'avoid' ? 'Unikaj' : 'Ograniczaj'}</span>
                        <strong>{f.name}</strong>
                        <span>{f.reason}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {result.ingredientsText && (
                  <div className="mt-4">
                    <button type="button" className="lr-scanner__link" onClick={() => setShowIngredients((v) => !v)}>
                      {showIngredients ? 'Ukryj pełny skład' : 'Pokaż pełny skład'}
                    </button>
                    {showIngredients && (
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, marginTop: '0.5rem' }}>{result.ingredientsText}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="lr-scanner__empty">
                <p style={{ color: 'var(--lr-ink)', fontWeight: 600 }}>
                  {result.error
                    ? result.error
                    : result.found
                      ? 'Produkt jest w bazie, ale bez składu.'
                      : 'Nie znalazłam tego produktu w bazie.'}
                </p>
                {!result.error && (
                  <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
                    Baza jest tworzona przez ludzi, więc nie ma jeszcze wszystkiego. Możesz dodać ten produkt w
                    aplikacji Open Food Facts, a następnym razem skaner go oceni.
                  </p>
                )}
              </div>
            )}

            <button type="button" onClick={reset} className="lr-cta-primary mt-5" style={{ width: '100%', justifyContent: 'center' }}>
              <RotateCcw size={14} /> Skanuj kolejny
            </button>

            {result.found && result.source && (
              <p className="mt-3" style={{ fontSize: '0.6875rem', color: 'var(--lr-ink-dim)', lineHeight: 1.5 }}>
                Dane:{' '}
                <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                  {result.source}
                </a>{' '}
                (licencja ODbL). Ocena według moich zasad low-tox, ma charakter edukacyjny i nie jest poradą medyczną.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
