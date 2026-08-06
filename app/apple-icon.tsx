import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: '36px',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 60 6 A 54 54 0 1 0 114 60"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 114 60 A 54 54 0 0 0 60 6"
            stroke="#ff6a00"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(32, 28)">
            <path
              d="M 6 4 C 3.79 4 2 5.79 2 8 L 2 52 C 2 54.21 3.79 56 6 56 L 38 56 C 40.21 56 42 54.21 42 52 L 42 16 L 30 4 Z"
              fill="#0f172a"
            />
            <path d="M 30 4 L 42 16 L 30 16 Z" fill="#334155" />
            <rect x="10" y="16" width="14" height="3.5" rx="1.75" fill="#ff6a00" />
            <rect x="10" y="24" width="18" height="3.5" rx="1.75" fill="#ff6a00" />
            <rect x="10" y="32" width="12" height="3.5" rx="1.75" fill="#ff6a00" />
            <path
              d="M 12 28 L 38 28 C 41.31 28 44 30.69 44 34 L 44 48 C 44 51.31 41.31 54 38 54 L 18 54 L 10 62 L 12 50 C 9.79 50 8 48.21 8 46 L 8 32 C 8 29.79 9.79 28 12 28 Z"
              fill="#ff6a00"
            />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
