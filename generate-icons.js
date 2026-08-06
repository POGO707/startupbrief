/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PRIMARY_COLOR = '#FF6A00';
const SECONDARY_COLOR = '#0F172A';

// Icon-Only SVG (No text!) for Favicon and PWA icons
const baseIconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" rx="24" fill="#ffffff"/>
  <!-- Outer Circle Ring -->
  <path d="M 60 8 A 52 52 0 1 0 112 60" stroke="${SECONDARY_COLOR}" stroke-width="7" stroke-linecap="round" fill="none" />
  <path d="M 112 60 A 52 52 0 0 0 60 8" stroke="${PRIMARY_COLOR}" stroke-width="7" stroke-linecap="round" fill="none" />
  
  <!-- Document Body -->
  <g transform="translate(32, 28)">
    <path d="M 6 4 C 3.79 4 2 5.79 2 8 L 2 52 C 2 54.21 3.79 56 6 56 L 38 56 C 40.21 56 42 54.21 42 52 L 42 16 L 30 4 Z" fill="${SECONDARY_COLOR}" />
    <path d="M 30 4 L 42 16 L 30 16 Z" fill="#334155" />
    <rect x="10" y="16" width="14" height="3.5" rx="1.75" fill="${PRIMARY_COLOR}" />
    <rect x="10" y="24" width="18" height="3.5" rx="1.75" fill="${PRIMARY_COLOR}" />
    <rect x="10" y="32" width="12" height="3.5" rx="1.75" fill="${PRIMARY_COLOR}" />

    <!-- Orange Folder Badge -->
    <path d="M 12 28 L 38 28 C 41.31 28 44 30.69 44 34 L 44 48 C 44 51.31 41.31 54 38 54 L 18 54 L 10 62 L 12 50 C 9.79 50 8 48.21 8 46 L 8 32 C 8 29.79 9.79 28 12 28 Z" fill="${PRIMARY_COLOR}" />
  </g>
</svg>
`;

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${SECONDARY_COLOR}" />
  <g transform="translate(420, 200)">
    <circle cx="60" cy="60" r="54" stroke="${PRIMARY_COLOR}" stroke-width="8" fill="none" />
    <path d="M 60 6 A 54 54 0 1 0 114 60" stroke="#ffffff" stroke-width="8" stroke-linecap="round" fill="none" />
    <g transform="translate(32, 28)">
      <path d="M 6 4 C 3.79 4 2 5.79 2 8 L 2 52 C 2 54.21 3.79 56 6 56 L 38 56 C 40.21 56 42 54.21 42 52 L 42 16 L 30 4 Z" fill="#ffffff" />
      <path d="M 30 4 L 42 16 L 30 16 Z" fill="#94a3b8" />
      <rect x="10" y="16" width="14" height="3" rx="1.5" fill="${PRIMARY_COLOR}" />
      <rect x="10" y="24" width="18" height="3" rx="1.5" fill="${PRIMARY_COLOR}" />
      <rect x="10" y="32" width="12" height="3" rx="1.5" fill="${PRIMARY_COLOR}" />
      <path d="M 12 28 L 38 28 C 41.31 28 44 30.69 44 34 L 44 48 C 44 51.31 41.31 54 38 54 L 18 54 L 10 62 L 12 50 C 9.79 50 8 48.21 8 46 L 8 32 C 8 29.79 9.79 28 12 28 Z" fill="${PRIMARY_COLOR}" />
    </g>
  </g>
  <text x="600" y="380" font-family="Arial, sans-serif" font-weight="bold" font-size="72" fill="white" text-anchor="middle">
    Startup <tspan fill="${PRIMARY_COLOR}">Brief</tspan>
  </text>
  <text x="600" y="440" font-family="Arial, sans-serif" font-size="28" fill="#cbd5e1" text-anchor="middle">
    AI, Startups, Founders &amp; Technology News
  </text>
</svg>
`;

async function generateIcons() {
  const appDir = path.join(__dirname, 'app');
  const publicDir = path.join(__dirname, 'public');

  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  // Generate icon files for app/ and public/
  await sharp(Buffer.from(baseIconSvg(512))).png().toFile(path.join(appDir, 'icon.png'));
  await sharp(Buffer.from(baseIconSvg(512))).png().toFile(path.join(publicDir, 'icon.png'));
  await sharp(Buffer.from(baseIconSvg(180))).png().toFile(path.join(appDir, 'apple-icon.png'));
  await sharp(Buffer.from(baseIconSvg(180))).png().toFile(path.join(publicDir, 'apple-icon.png'));
  await sharp(Buffer.from(baseIconSvg(32))).png().toFile(path.join(appDir, 'favicon.ico'));
  await sharp(Buffer.from(baseIconSvg(32))).png().toFile(path.join(publicDir, 'favicon.ico'));

  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(appDir, 'opengraph-image.png'));
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(appDir, 'twitter-image.png'));

  console.log('Icons generated successfully with icon-only favicon branding.');
}

generateIcons().catch(console.error);
