#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://neo-nunez.vercel.app";

const ROUTES = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/projects/llm-academic-wiki",
  "/projects/llm-server",
  "/projects/voiceflow",
  "/projects/rag-system",
  "/projects/focuspad",
  "/skills",
  "/languages",
  "/languages/spanish",
  "/languages/english",
  "/languages/german",
  "/languages/french",
  "/languages/italian",
  "/languages/portuguese",
];

const today = new Date().toISOString().split("T")[0];

const urls = ROUTES.map((path) => {
  const loc = `${SITE_URL}${path === "/" ? "" : path}`;
  const priority = path === "/" ? "1.0" : path.startsWith("/projects/") || path.startsWith("/languages/") ? "0.6" : "0.8";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(__dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`sitemap.xml written (${ROUTES.length} URLs) → ${outPath}`);
