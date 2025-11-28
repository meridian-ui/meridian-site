import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Meridian - Malleable user interfaces for the real world';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eff4f1',
          backgroundImage: `
            linear-gradient(to right, #3d4f3a 1px, transparent 1px),
            linear-gradient(to bottom, #3d4f3a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          position: 'relative',
        }}
      >
        {/* Grid overlay with low opacity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#eff4f1',
            opacity: 0.96,
          }}
        />
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Logo + Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {/* Simple logo placeholder - a circle with M */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: '#314d3b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#eff4f1',
                fontSize: 64,
                fontWeight: 700,
              }}
            >
              M
            </div>
            <span
              style={{
                fontSize: 96,
                fontWeight: 600,
                color: '#314d3b',
                letterSpacing: '-0.05em',
              }}
            >
              Meridian
            </span>
          </div>
          
          {/* Tagline */}
          <span
            style={{
              marginTop: 32,
              fontSize: 32,
              color: '#314d3b',
              opacity: 0.8,
            }}
          >
            Malleable user interfaces for the real world.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

