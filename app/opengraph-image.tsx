import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BioHackMama – Biohacking i Wellness dla Kobiet'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: '#F5F0E8',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Left teal accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '8px',
            height: '630px',
            background: '#4A7C7E',
          }}
        />

        {/* Right photo strip */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '420px',
            height: '630px',
            background: 'linear-gradient(135deg, #4A7C7E 0%, #2C5F61 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'rgba(194, 160, 90, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: '56px',
                lineHeight: 1,
              }}
            >
              🌿
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '16px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              @veradelleofficial
            </div>
          </div>
        </div>

        {/* Left content area */}
        <div
          style={{
            position: 'absolute',
            left: '60px',
            top: 0,
            width: '680px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 20px',
            gap: '20px',
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '2px',
                background: '#C2A05A',
              }}
            />
            <span
              style={{
                color: '#C2A05A',
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              Biohacking · Wellness · Longevity
            </span>
          </div>

          {/* Logo / Brand name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: '#2C3E50',
                lineHeight: 1,
                letterSpacing: '-1px',
              }}
            >
              BioHack
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 400,
                color: '#4A7C7E',
                lineHeight: 1,
                letterSpacing: '-1px',
                fontStyle: 'italic',
              }}
            >
              Mama
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              color: 'rgba(72, 89, 107, 0.8)',
              fontSize: '22px',
              lineHeight: 1.5,
              maxWidth: '560px',
            }}
          >
            Naukowe protokoły biohackingu dopasowane do kobiecego ciała.
          </div>

          {/* Pillars */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '8px',
              flexWrap: 'wrap',
            }}
          >
            {['Hormony', 'Sen', 'Żywienie', 'Longevity'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 18px',
                  background: 'rgba(74, 124, 126, 0.12)',
                  border: '1px solid rgba(74, 124, 126, 0.3)',
                  borderRadius: '100px',
                  color: '#4A7C7E',
                  fontSize: '14px',
                  letterSpacing: '1px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              color: 'rgba(72, 89, 107, 0.5)',
              fontSize: '15px',
              letterSpacing: '1px',
              marginTop: '8px',
            }}
          >
            biohackmama.pl
          </div>
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '780px',
            height: '4px',
            background: 'linear-gradient(90deg, #C2A05A 0%, transparent 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
