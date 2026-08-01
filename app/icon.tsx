import { ImageResponse } from 'next/og';

export function generateImageMetadata() {
  return [
    { id: '16', size: { width: 16, height: 16 }, contentType: 'image/png' },
    { id: '32', size: { width: 32, height: 32 }, contentType: 'image/png' },
    { id: '48', size: { width: 48, height: 48 }, contentType: 'image/png' },
    { id: '192', size: { width: 192, height: 192 }, contentType: 'image/png' },
    { id: '512', size: { width: 512, height: 512 }, contentType: 'image/png' },
  ];
}

export default function Icon({ id }: { id: string }) {
  const sizeValue = parseInt(id, 10) || 512;
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
      width: sizeValue,
      height: sizeValue,
    }
  );
}
