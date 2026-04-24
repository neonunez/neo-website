#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const SITE_URL = "https://neo-nunez.vercel.app";
const AUTHOR = "Neo Nuñez";

const META = {
  "/": {
    title: "Neo Nuñez · AI Systems & Software Engineer",
    description: "Portfolio of Neo Nuñez — AI systems and software engineer building LLM infrastructure, agentic RAG, and developer tools. Based in Buenos Aires.",
  },
  "/about": {
    title: "About · Neo Nuñez",
    description: "About Neo Nuñez: background, interests, and the path from Computer Science at UBA into AI engineering.",
  },
  "/experience": {
    title: "Experience · Neo Nuñez",
    description: "Professional experience of Neo Nuñez — AI engineering roles, projects shipped, and the technical problems solved along the way.",
  },
  "/projects": {
    title: "Projects · Neo Nuñez",
    description: "Selected projects by Neo Nuñez: enterprise RAG, self-hosted LLM inference server, academic wiki with LLMs, VoiceFlow macOS app, and FocusPad.",
  },
  "/projects/llm-academic-wiki": {
    title: "LLM Academic Wiki · Neo Nuñez",
    description: "LLM-powered academic wiki with retrieval-augmented generation for research. Architecture, tech stack, and outcomes.",
  },
  "/projects/llm-server": {
    title: "LLM Server · Neo Nuñez",
    description: "Self-hosted FastAPI LLM inference server exposing an OpenAI-compatible API over Cloudflare Tunnel.",
  },
  "/projects/voiceflow": {
    title: "VoiceFlow · Neo Nuñez",
    description: "VoiceFlow — macOS Python app for on-device voice transcription and LLM-powered post-processing.",
  },
  "/projects/rag-system": {
    title: "Enterprise RAG System · Neo Nuñez",
    description: "Enterprise-grade agentic RAG built with Next.js, FastAPI, Supabase, and Gemini. Citations, dark mode, and production workflows.",
  },
  "/projects/focuspad": {
    title: "FocusPad · Neo Nuñez",
    description: "FocusPad — React Native focus and productivity mobile app with construction-indicator UI.",
  },
  "/skills": {
    title: "Skills · Neo Nuñez",
    description: "Technical stack and soft skills: Python, TypeScript, LLM tooling, RAG, vector databases, frontend and infrastructure.",
  },
  "/languages": {
    title: "Languages · Neo Nuñez",
    description: "Languages spoken by Neo Nuñez: Spanish (native), English C1, German B2, French B2, Italian B1, Portuguese A2.",
  },
  "/languages/spanish": {
    title: "Spanish · Languages · Neo Nuñez",
    description: "Spanish (native) — background, usage, and context.",
  },
  "/languages/english": {
    title: "English · Languages · Neo Nuñez",
    description: "English (C1) — certification and professional usage.",
  },
  "/languages/german": {
    title: "German · Languages · Neo Nuñez",
    description: "German (B2) — Goethe certification and experience.",
  },
  "/languages/french": {
    title: "French · Languages · Neo Nuñez",
    description: "French (B2) — DELF certification and experience.",
  },
  "/languages/italian": {
    title: "Italian · Languages · Neo Nuñez",
    description: "Italian (B1) — certification and experience.",
  },
  "/languages/portuguese": {
    title: "Portuguese · Languages · Neo Nuñez",
    description: "Portuguese (A2) — learning in progress.",
  },
};

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHead(path, meta) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  return { title, desc, url };
}

const indexPath = resolve(DIST, "index.html");
let baseHtml;
try {
  baseHtml = readFileSync(indexPath, "utf8");
} catch {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

let count = 0;
for (const [path, meta] of Object.entries(META)) {
  const { title, desc, url } = renderHead(path, meta);

  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${desc}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${desc}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${desc}" />`
  );

  if (path === "/") {
    writeFileSync(indexPath, html, "utf8");
  } else {
    const outDir = resolve(DIST, path.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), html, "utf8");
  }
  count++;
}

console.log(`prerendered meta for ${count} routes → dist/`);
