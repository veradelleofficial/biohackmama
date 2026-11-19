/**
 * Logo BioHackMama (od 2026-11-18, wersja "i3").
 * "biohack" Sora 300 + "mama" Sora 600, w kremie. Litera "i" to drabinka DNA:
 * limonkowa i kremowa nitka ze szczeblami, kropka limonkowa.
 * Kształty to kontury czcionki (components/brand/logo-assets.ts), więc logo
 * wygląda identycznie niezależnie od ładowania fontów.
 */
import { WORDMARK_SVG, MARK_SVG } from './logo-assets'

export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`bhm-logo ${className ?? ''}`}
      role="img"
      aria-label="BioHackMama"
      dangerouslySetInnerHTML={{ __html: WORDMARK_SVG }}
    />
  )
}

/** Sam znak (litera "i" jako helisa), np. do dekoracji */
export function LogoMark({ className }: { className?: string }) {
  return <span className={`bhm-mark ${className ?? ''}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: MARK_SVG }} />
}
