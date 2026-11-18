import { ImageResponse } from 'next/og'
import { HELIX_LIME_PATH, HELIX_ROSE_PATH, LOGO_LIME, LOGO_ROSE } from '@/components/brand/Logo'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0E0D0A' }}>
        <svg width="112" height="112" viewBox="0 0 40 40">
          <path d={HELIX_LIME_PATH} fill="none" stroke={LOGO_LIME} strokeWidth="3.6" strokeLinecap="round" />
          <path d={HELIX_ROSE_PATH} fill="none" stroke={LOGO_ROSE} strokeWidth="3.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
