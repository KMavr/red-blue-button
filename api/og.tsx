import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#06060a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Red glow */}
        <div
          style={{
            position: 'absolute',
            left: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Blue glow */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            zIndex: 1,
          }}
        >
          {/* RED or BLUE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <span
              style={{
                fontSize: '140px',
                fontWeight: 900,
                color: '#dc2626',
                letterSpacing: '-4px',
                lineHeight: 1,
              }}
            >
              RED
            </span>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 400,
                color: '#7070a0',
                lineHeight: 1,
              }}
            >
              or
            </span>
            <span
              style={{
                fontSize: '140px',
                fontWeight: 900,
                color: '#3b82f6',
                letterSpacing: '-4px',
                lineHeight: 1,
              }}
            >
              BLUE
            </span>
          </div>

          {/* Tagline */}
          <span
            style={{
              fontSize: '28px',
              color: '#7070a0',
              letterSpacing: '2px',
            }}
          >
            One button. Everyone's fate.
          </span>

          {/* Domain */}
          <span
            style={{
              fontSize: '20px',
              color: '#3a3a5a',
              letterSpacing: '3px',
              marginTop: '8px',
            }}
          >
            redor.blue
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
