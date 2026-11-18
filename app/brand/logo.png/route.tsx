import { renderLogoPng } from '@/lib/brand-image'

// Generowane na edge, cache na CDN (patrz lib/brand-image.tsx)
export const runtime = 'edge'

export async function GET() {
  return renderLogoPng()
}
