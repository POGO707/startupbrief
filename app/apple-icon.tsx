import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  const sizeValue = 180;
  const radius = sizeValue * 0.25;
  const fontSize = sizeValue * 0.6;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: `${radius}px`,
        }}
      >
        <div style={{ fontSize: `${fontSize}px`, fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center' }}>
          S<span style={{ color: '#FF6A00' }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
