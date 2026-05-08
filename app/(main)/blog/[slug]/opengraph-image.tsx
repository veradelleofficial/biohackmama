import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/lib/sanity/queries'

export const runtime = 'edge'
export const alt = 'BioHackMama – Artykuł'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  const title = article?.title || 'BioHackMama'
  const category = article?.category || 'Biohacking'
  const readTime = article?.readTime ? `${article.readTime} min czytania` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: '#F2EBDD',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Left gold accent */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '8px',
            height: '630px',
            background: '#B89668',
          }}
        />

        {/* Top teal bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1200px',
            height: '4px',
            background: '#4F5E44',
          }}
        />

        {/* Background decorative circle */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            bottom: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(79, 94, 68, 0.06)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            left: '80px',
            top: 0,
            right: '80px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#4F5E44',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              BioHackMama
            </span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#B89668' }} />
            <span
              style={{
                fontSize: '14px',
                color: '#B89668',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </span>
            {readTime && (
              <>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(45, 58, 45,0.3)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(45, 58, 45,0.6)', letterSpacing: '1px' }}>
                  {readTime}
                </span>
              </>
            )}
          </div>

          {/* Article title */}
          <div
            style={{
              fontSize: title.length > 60 ? '42px' : title.length > 40 ? '50px' : '58px',
              fontWeight: 700,
              color: '#2D3A2D',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              maxWidth: '980px',
            }}
          >
            {title}
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: '80px',
              height: '3px',
              background: '#B89668',
              borderRadius: '2px',
            }}
          />

          {/* Author */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F5E44, #2D3A2D)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              🌿
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#2D3A2D' }}>Vera Delle</span>
              <span style={{ fontSize: '13px', color: 'rgba(45, 58, 45,0.6)', letterSpacing: '1px' }}>
                biohackmama.pl
              </span>
            </div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #B89668 0%, transparent 60%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
