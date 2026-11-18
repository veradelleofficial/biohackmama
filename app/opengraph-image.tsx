import { renderOgImage, OG_SIZE } from '@/lib/brand-image'

export const runtime = 'edge'
export const alt = 'BioHackMama: mniej chemii, więcej energii'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Biohacking · Low-tox · Longevity',
    title: 'Mniej chemii, więcej energii.',
    accent: 'energii.',
    subtitle: 'Naukowe protokoły dopasowane do ciała: hormony, sen, żywienie i longevity.',
  })
}
