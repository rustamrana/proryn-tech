/**
 * PRORYN TECH — Icon Generation Script
 * 
 * Generates all favicon and app icon assets from /public/favicon.svg
 * 
 * Usage: pnpm icons:generate
 * 
 * Source: /public/favicon.svg (SINGLE SOURCE OF TRUTH)
 * 
 * Output:
 *   /public/favicon-16x16.png   (16×16)
 *   /public/favicon-32x32.png   (32×32)
 *   /public/favicon-48x48.png   (48×48)
 *   /public/apple-touch-icon.png (180×180)
 *   /public/icon-192.png        (192×192)
 *   /public/icon-512.png        (512×512)
 *   /public/favicon.ico         (multi-size ICO)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = resolve(ROOT, 'public');

const FAVICON_SVG = resolve(PUBLIC, 'favicon.svg');

const SIZES = [
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'favicon-48x48.png', width: 48, height: 48 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'icon-192.png', width: 192, height: 192 },
  { name: 'icon-512.png', width: 512, height: 512 },
];

async function main() {
  console.log('🎨 PRORYN TECH Icon Generator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Source: ${FAVICON_SVG}`);
  console.log('');

  // Read SVG source
  const svgBuffer = readFileSync(FAVICON_SVG);
  console.log(`✓ Read favicon.svg (${svgBuffer.length} bytes)`);

  // Generate PNG files at each size
  for (const { name, width, height } of SIZES) {
    const outputPath = resolve(PUBLIC, name);
    
    await sharp(svgBuffer, { density: 300 })
      .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputPath);

    // Verify dimensions
    const meta = await sharp(outputPath).metadata();
    if (meta.width !== width || meta.height !== height) {
      throw new Error(`${name}: expected ${width}×${height}, got ${meta.width}×${meta.height}`);
    }

    console.log(`✓ Generated ${name} (${width}×${height})`);
  }

  // Generate favicon.ico from 16, 32, 48 PNG files
  console.log('');
  console.log('Generating favicon.ico...');
  
  const ico16 = readFileSync(resolve(PUBLIC, 'favicon-16x16.png'));
  const ico32 = readFileSync(resolve(PUBLIC, 'favicon-32x32.png'));
  const ico48 = readFileSync(resolve(PUBLIC, 'favicon-48x48.png'));
  
  const icoBuffer = await pngToIco([ico16, ico32, ico48]);
  writeFileSync(resolve(PUBLIC, 'favicon.ico'), icoBuffer);
  
  console.log(`✓ Generated favicon.ico (${icoBuffer.length} bytes, contains 16×16 + 32×32 + 48×48)`);

  // Summary
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ All icons generated successfully!');
  console.log('');
  console.log('Files:');
  console.log('  /public/favicon-16x16.png   (16×16)');
  console.log('  /public/favicon-32x32.png   (32×32)');
  console.log('  /public/favicon-48x48.png   (48×48)');
  console.log('  /public/apple-touch-icon.png (180×180)');
  console.log('  /public/icon-192.png        (192×192)');
  console.log('  /public/icon-512.png        (512×512)');
  console.log('  /public/favicon.ico         (multi-size)');
}

main().catch((err) => {
  console.error('❌ Icon generation failed:', err.message);
  process.exit(1);
});
