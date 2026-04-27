import { SITE_URL } from "./routes";

type Meta = {
  title: string;
  description: string;
};

const AUTHOR = "Neo Nuñez";

const META: Record<string, Meta> = {
  "/": {
    title: "Neo Nuñez · AI Systems & Software Engineer",
    description:
      "Portfolio of Neo Nuñez — AI systems and software engineer building LLM infrastructure, agentic RAG, and developer tools. Based in Buenos Aires.",
  },
  "/about": {
    title: "About · Neo Nuñez",
    description:
      "About Neo Nuñez: background, interests, and the path from Computer Science at UBA into AI engineering.",
  },
  "/experience": {
    title: "Experience · Neo Nuñez",
    description:
      "Professional experience of Neo Nuñez — AI engineering roles, projects shipped, and the technical problems solved along the way.",
  },
  "/projects": {
    title: "Projects · Neo Nuñez",
    description:
      "Selected projects by Neo Nuñez: enterprise RAG, self-hosted LLM inference server, academic wiki with LLMs, VoiceFlow macOS app, and Browser Redactor.",
  },
  "/projects/llm-academic-wiki": {
    title: "LLM Academic Wiki · Neo Nuñez",
    description:
      "LLM-powered academic wiki with retrieval-augmented generation for research. Architecture, tech stack, and outcomes.",
  },
  "/projects/llm-server": {
    title: "LLM Server · Neo Nuñez",
    description:
      "Self-hosted FastAPI LLM inference server exposing an OpenAI-compatible API over Cloudflare Tunnel.",
  },
  "/projects/voiceflow": {
    title: "VoiceFlow · Neo Nuñez",
    description:
      "VoiceFlow — macOS Python app for on-device voice transcription and LLM-powered post-processing.",
  },
  "/projects/rag-system": {
    title: "Enterprise RAG System · Neo Nuñez",
    description:
      "Enterprise-grade agentic RAG built with Next.js, FastAPI, Supabase, and Gemini. Citations, dark mode, and production workflows.",
  },
  "/projects/browser-redactor": {
    title: "Browser Redactor · Neo Nuñez",
    description:
      "Browser Redactor — paste any text and instantly anonymize personal information. 100% in-browser PII detection powered by an on-device ML model. Nothing leaves your device.",
  },
  "/skills": {
    title: "Skills · Neo Nuñez",
    description:
      "Technical stack and soft skills: Python, TypeScript, LLM tooling, RAG, vector databases, frontend and infrastructure.",
  },
  "/languages": {
    title: "Languages · Neo Nuñez",
    description:
      "Languages spoken by Neo Nuñez: Spanish (native), English C1, German B2, French B2, Italian B1, Portuguese A2.",
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

const FALLBACK: Meta = {
  title: "Neo Nuñez · AI Systems & Software Engineer",
  description:
    "Portfolio of Neo Nuñez — AI systems and software engineer.",
};

export function getMeta(path: string): Meta {
  if (META[path]) return META[path];
  const match = Object.keys(META)
    .filter((k) => k !== "/" && path.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? META[match] : FALLBACK;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace(/[\[\]"]/g, "").split("=");
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function setMetaTags(path: string) {
  if (typeof document === "undefined") return;
  const meta = getMeta(path);
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  document.title = meta.title;
  setMeta('meta[name="description"]', "content", meta.description);
  setMeta('meta[name="author"]', "content", AUTHOR);
  setLink("canonical", url);

  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:type"]', "content", "website");
  setMeta('meta[property="og:site_name"]', "content", AUTHOR);

  setMeta('meta[name="twitter:card"]', "content", "summary");
  setMeta('meta[name="twitter:title"]', "content", meta.title);
  setMeta('meta[name="twitter:description"]', "content", meta.description);
}
