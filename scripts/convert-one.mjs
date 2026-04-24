import sharp from "sharp";
import { stat, unlink } from "node:fs/promises";

const inputs = process.argv.slice(2);
const MAX_WIDTH = 1600;
const QUALITY = 88;

for (const src of inputs) {
  const dst = src.replace(/\.png$/i, ".webp");
  const before = (await stat(src)).size;
  const img = sharp(src);
  const meta = await img.metadata();
  const pipeline = (meta.width && meta.width > MAX_WIDTH)
    ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : img;
  await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(dst);
  const after = (await stat(dst)).size;
  if (after > 0) {
    await unlink(src);
    const pct = ((1 - after / before) * 100).toFixed(1);
    console.log(`${src.split("/").pop()}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (-${pct}%)`);
  } else {
    console.error(`FAILED to convert ${src} — leaving PNG in place`);
    process.exit(1);
  }
}
