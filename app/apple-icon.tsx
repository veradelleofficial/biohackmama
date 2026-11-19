import { ImageResponse } from 'next/og'
import { SQUARE_DATA_URI } from '@/components/brand/logo-assets'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, display: 'flex', background: '#0E0D0A' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SQUARE_DATA_URI} width={180} height={180} alt="" />
      </div>
    ),
    { ...size }
  )
}
