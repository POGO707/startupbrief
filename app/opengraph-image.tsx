import { ImageResponse } from 'next/og';

export const alt = 'Startup Brief';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: 140, fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          Startup Brief<span style={{ color: '#FF6A00' }}>.</span>
        </div>
        <div style={{ fontSize: 40, color: '#a3a3a3', display: 'flex', textAlign: 'center' }}>
          Premium AI, Startup, Founder and Business Media Platform
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
