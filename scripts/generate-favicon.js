const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '..', 'public', 'assets', 'icons', 'logo.svg');
const APP_DIR = path.join(__dirname, '..', 'app');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(SVG_PATH);

  // Generate 32x32 PNG for favicon.ico (placed in app/ for Next.js convention)
  const ico32 = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  // Generate 16x16 PNG
  const ico16 = await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toBuffer();

  // Generate 48x48 PNG (Google recommended size)
  const png48 = await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toBuffer();

  // Generate 180x180 apple-touch-icon
  const apple180 = await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toBuffer();

  // Generate 192x192 (for web manifest / Android)
  const png192 = await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toBuffer();

  // Generate 512x512 (for web manifest)
  const png512 = await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toBuffer();

  // Build ICO file (contains 16x16 and 32x32 PNGs)
  const icoBuffer = buildIco([ico16, ico32]);

  // Write files
  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(APP_DIR, 'apple-icon.png'), apple180);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-192x192.png'), png192);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-512x512.png'), png512);

  console.log('Favicons generated successfully!');
  console.log('  - app/favicon.ico (16x16 + 32x32)');
  console.log('  - app/apple-icon.png (180x180)');
  console.log('  - public/favicon-48x48.png (48x48)');
  console.log('  - public/icon-192x192.png (192x192)');
  console.log('  - public/icon-512x512.png (512x512)');
}

// Build a minimal ICO file from PNG buffers
function buildIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  let dataOffset = headerSize + dirSize;

  // ICO Header: reserved(2) + type(2) + count(2)
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);        // Reserved
  header.writeUInt16LE(1, 2);        // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  const dirEntries = [];
  const sizes = [16, 32];

  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const size = sizes[i];
    entry.writeUInt8(size === 256 ? 0 : size, 0);  // Width
    entry.writeUInt8(size === 256 ? 0 : size, 1);  // Height
    entry.writeUInt8(0, 2);                          // Color palette
    entry.writeUInt8(0, 3);                          // Reserved
    entry.writeUInt16LE(1, 4);                       // Color planes
    entry.writeUInt16LE(32, 6);                      // Bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8);    // Size of image data
    entry.writeUInt32LE(dataOffset, 12);             // Offset to image data
    dataOffset += pngBuffers[i].length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

generateFavicons().catch(console.error);
