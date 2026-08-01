/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PRIMARY_COLOR = '#FF6A00';
const SECONDARY_COLOR = '#111111';

// Base SVG logo: 'S' with an orange dot on a dark background.
const baseSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="${SECONDARY_COLOR}" rx="128" />
  <text x="256" y="340" font-family="Arial, sans-serif" font-weight="bold" font-size="280" fill="white" text-anchor="middle">
    S<tspan fill="${PRIMARY_COLOR}">.</tspan>
  </text>
</svg>
`;

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${SECONDARY_COLOR}" />
  <text x="600" y="360" font-family="Arial, sans-serif" font-weight="bold" font-size="160" fill="white" text-anchor="middle">
    Startup Brief<tspan fill="${PRIMARY_COLOR}">.</tspan>
  </text>
  <text x="600" y="480" font-family="Arial, sans-serif" font-size="40" fill="#a3a3a3" text-anchor="middle">
    AI, Startups, Founders &amp; Technology
  </text>
</svg>
`;

async function generateIcons() {
  const appDir = path.join(__dirname, 'app');
  
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir);
  }

  // 1. icon.png (512x512)
  await sharp(Buffer.from(baseSvg(512)))
    .png()
    .toFile(path.join(appDir, 'icon.png'));
    
  // 2. apple-icon.png (180x180)
  await sharp(Buffer.from(baseSvg(180)))
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));
    
  // 3. favicon.ico (32x32)
  // Sharp doesn't support writing .ico directly without specific plugins, but a 32x32 PNG renamed to .ico usually works for modern browsers, or we can use next.js app/icon.png to auto-generate the HTML tags.
  // Actually, we'll just write a 32x32 .png and rename it to .ico.
  await sharp(Buffer.from(baseSvg(32)))
    .png()
    .toFile(path.join(appDir, 'favicon.ico'));

  // 4. opengraph-image.png (1200x630)
  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(appDir, 'opengraph-image.png'));

  // 5. twitter-image.png (1200x630)
  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(appDir, 'twitter-image.png'));

  console.log('All icons generated successfully.');
}

generateIcons().catch(console.error);
