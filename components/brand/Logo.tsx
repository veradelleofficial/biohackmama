/**
 * Logo BioHackMama (od 2026-11-18).
 * Znak: dwie przeplatające się nitki DNA, limonka (nauka) i róż (mama).
 * Napis: "biohackmama" w Sorze 600, w całości w kremie.
 */

export const LOGO_LIME = '#C9F24F'
export const LOGO_ROSE = '#E8AEBD'
export const LOGO_CREAM = '#F4EFE6'

// Ciasny viewBox wokół nitek (z marginesem na grubość linii)
export const HELIX_VIEWBOX = '6 2 28 36'
export const HELIX_LIME_PATH = 'M8 4 C8 14, 32 14, 32 20 C32 26, 8 26, 8 36'
export const HELIX_ROSE_PATH = 'M32 4 C32 14, 8 14, 8 20 C8 26, 32 26, 32 36'

export function LogoMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox={HELIX_VIEWBOX}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d={HELIX_LIME_PATH} fill="none" stroke={LOGO_LIME} strokeWidth="3.4" strokeLinecap="round" />
      <path d={HELIX_ROSE_PATH} fill="none" stroke={LOGO_ROSE} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`bhm-logo ${className ?? ''}`} aria-label="BioHackMama" role="img">
      <LogoMark className="bhm-logo__mark" />
      <span className="bhm-logo__word" aria-hidden="true">biohackmama</span>
    </span>
  )
}
