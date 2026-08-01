import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Startup Brief',
    short_name: 'Startup Brief',
    description: 'Premium AI, Startup, Founder and Business Media Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#FF6A00',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
