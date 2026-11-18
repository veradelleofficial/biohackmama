import { renderAvatarPng } from '@/lib/brand-image'

// Kwadratowy znak do social mediów: /brand/avatar.png
export const runtime = 'edge'

export async function GET() {
  return renderAvatarPng()
}
