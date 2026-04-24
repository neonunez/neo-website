import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public");
const DIRS = ["project-uis", "project-diagrams", "languages-certificates"];
const MAX_WIDTH = 1600;
const QUALITY = 88;

async function convertDir(rel) {
  const abs = path.join(ROOT, rel);
  const entries = await readdir(abs);
  for (const name of entries) {
    if (!name.toLowerCase().endsWith(".png")) continue;
    const src = path.join(abs, name);
    const dst = path.join(abs, name.replace(/\.png$/i, ".webp"));
    const before = (await stat(src)).size;

    const img = sharp(src);
    const meta = await img.metadata();
    const pipeline = (meta.width && meta.width > MAX_WIDTH)
      ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true })
      : img;

    await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(dst);
    const after = (await stat(dst)).size;
    await unlink(src);

    const pct = ((1 - after / before) * 100).toFixed(1);
    console.log(`${rel}/${name}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB  (-${pct}%)`);
  }
}

for (const d of DIRS) await convertDir(d);
console.log("Done.");
