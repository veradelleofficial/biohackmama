import { ImageResponse } from 'next/og'
import { getCourseBySlug } from '@/lib/sanity/queries'

export const runtime = 'edge'
export const alt = 'BioHackMama – Kurs Online'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug)

  const title = course?.title || 'Kurs Online'
  const description = course?.description || ''
  const price = course?.price ? `${course.price} zł` : ''
  const level = course?.level || ''
  const duration = course?.duration || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(135deg, #2C5F61 0%, #1a3d3f 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(194, 160, 90, 0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '300px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
          }}
        />

        {/* Left gold accent */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '6px',
            height: '630px',
            background: '#C2A05A',
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
            gap: '20px',
          }}
        >
          {/* Brand + type */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', letterSpacing: '3px', textTransform: 'uppercase' }}>
              BioHackMama
            </span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C2A05A' }} />
            <span style={{ fontSize: '13px', color: '#C2A05A', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Kurs Online
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? '46px' : '56px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.5,
                maxWidth: '800px',
              }}
            >
              {description.length > 100 ? description.slice(0, 100) + '...' : description}
            </div>
          )}

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
            {level && (
              <div
                style={{
                  padding: '8px 20px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '14px',
                  letterSpacing: '1px',
                }}
              >
                {level}
              </div>
            )}
            {duration && (
              <div
                style={{
                  padding: '8px 20px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '14px',
                  letterSpacing: '1px',
                }}
              >
                {duration}
              </div>
            )}
            {price && (
              <div
                style={{
                  padding: '8px 24px',
                  background: '#C2A05A',
                  borderRadius: '100px',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                }}
              >
                {price}
              </div>
            )}
          </div>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>
              Vera Delle · biohackmama.pl
            </span>
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #C2A05A 0%, transparent 60%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
