// Preserve the generated original and create a light website asset.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const [id, source] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(id || '') || !source) throw new Error('Expected recipe id and source image path.');
async function main() {
  fs.mkdirSync('output/imagegen', { recursive: true });
  fs.mkdirSync('public/images/recipes', { recursive: true });
  const original = path.join('output/imagegen', `${id}.png`);
  const asset = path.join('public/images/recipes', `${id}.webp`);
  if (fs.existsSync(asset)) throw new Error(`Image already exists: ${id}`);
  fs.copyFileSync(source, original);
  await sharp(source).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(asset);
  console.log(JSON.stringify({ id, original, asset, bytes: fs.statSync(asset).size }));
}
main().catch(error => { console.error(error.message); process.exit(1); });
