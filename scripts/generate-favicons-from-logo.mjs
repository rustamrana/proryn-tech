/**
 * Generate all favicon / app-icon assets from public/logo.png.
 * One-off helper. Run: node scripts/generate-favicons-from-logo.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');
const SRC = resolve(PUBLIC, 'logo.png');

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function main() {
  const src = readFileSync(SRC);
  for (const { name, size } of SIZES) {
    await sharp(src)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(resolve(PUBLIC, name));
    console.log(`generated ${name} (${size}x${size})`);
  }

  const ico = await pngToIco([
    readFileSync(resolve(PUBLIC, 'favicon-16x16.png')),
    readFileSync(resolve(PUBLIC, 'favicon-32x32.png')),
    readFileSync(resolve(PUBLIC, 'favicon-48x48.png')),
  ]);
  writeFileSync(resolve(PUBLIC, 'favicon.ico'), ico);
  console.log(`generated favicon.ico (${ico.length} bytes)`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
