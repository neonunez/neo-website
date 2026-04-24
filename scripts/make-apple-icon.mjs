#!/usr/bin/env node
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, "..", "public");
const svg = readFileSync(resolve(pub, "favicon.svg"));

await sharp(svg, { density: 400 })
  .resize(180, 180, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
  .png()
  .toFile(resolve(pub, "apple-touch-icon.png"));

console.log("wrote public/apple-touch-icon.png (180×180)");
