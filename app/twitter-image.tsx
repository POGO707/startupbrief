import { ImageResponse } from 'next/og';

export const alt = 'Startup Brief';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
            <path d="M 60 6 A 54 54 0 1 0 114 60" stroke="#ffffff" strokeWidth="7" fill="none" />
            <path d="M 114 60 A 54 54 0 0 0 60 6" stroke="#ff6a00" strokeWidth="7" fill="none" />
            <g transform="translate(32, 28)">
              <path d="M 6 4 C 3.79 4 2 5.79 2 8 L 2 52 C 2 54.21 3.79 56 6 56 L 38 56 C 40.21 56 42 54.21 42 52 L 42 16 L 30 4 Z" fill="#ffffff" />
              <path d="M 30 4 L 42 16 L 30 16 Z" fill="#94a3b8" />
              <rect x="10" y="16" width="14" height="3.5" rx="1.75" fill="#ff6a00" />
              <rect x="10" y="24" width="18" height="3.5" rx="1.75" fill="#ff6a00" />
              <rect x="10" y="32" width="12" height="3.5" rx="1.75" fill="#ff6a00" />
              <path d="M 12 28 L 38 28 C 41.31 28 44 30.69 44 34 L 44 48 C 44 51.31 41.31 54 38 54 L 18 54 L 10 62 L 12 50 C 9.79 50 8 48.21 8 46 L 8 32 C 8 29.79 9.79 28 12 28 Z" fill="#ff6a00" />
            </g>
          </svg>
          <div style={{ fontSize: 96, fontWeight: 800, color: 'white', display: 'flex' }}>
            Startup <span style={{ color: '#ff6a00', marginLeft: '12px' }}>Brief</span>
          </div>
        </div>
        <div style={{ fontSize: 32, color: '#cbd5e1', display: 'flex', textAlign: 'center' }}>
          Premium AI, Startup, Founder and Business Media Platform
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
