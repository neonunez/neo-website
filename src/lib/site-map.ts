import type { Translations } from "./i18n";

// ─── Projects ────────────────────────────────────────────────────────────────

export interface ProjectInfo {
  id: string;
  name: string;
  slug: string;
  path: string;
  tags: readonly string[];
  descKey: keyof Translations;
}

export const PROJECTS: readonly ProjectInfo[] = [
  {
    id: "llm-academic-wiki",
    name: "llm-academic-wiki",
    slug: "llm-academic-wiki",
    path: "/projects/llm-academic-wiki",
    tags: ["Python", "LLMs", "RAG"],
    descKey: "proj_llmWikiDesc",
  },
  {
    id: "llm-server",
    name: "llm-server",
    slug: "llm-server",
    path: "/projects/llm-server",
    tags: ["FastAPI", "Python", "LLMs"],
    descKey: "proj_llmServerDesc",
  },
  {
    id: "voiceflow",
    name: "VoiceFlow",
    slug: "voiceflow",
    path: "/projects/voiceflow",
    tags: ["Python", "mlx-whisper", "pyobjc", "rumps", "pywebview"],
    descKey: "proj2Desc",
  },
  {
    id: "enterprise-rag",
    name: "Enterprise RAG System",
    slug: "rag-system",
    path: "/projects/rag-system",
    tags: ["Next.js", "FastAPI", "LangGraph", "LlamaIndex", "Supabase", "Gemini Flash"],
    descKey: "proj1Desc",
  },
  {
    id: "focuspad",
    name: "FocusPad",
    slug: "focuspad",
    path: "/projects/focuspad",
    tags: ["React Native", "Expo", "TypeScript"],
    descKey: "proj3Desc",
  },
];

// ─── Languages ───────────────────────────────────────────────────────────────

export const LANGUAGE_SLUGS = ["spanish", "portuguese", "english", "french", "german", "italian"] as const;
export type LanguageSlug = (typeof LANGUAGE_SLUGS)[number];

export interface LanguageInfo {
  id: LanguageSlug;
  slug: LanguageSlug;
  path: string;
  nameKey: keyof Translations;
}

export const LANGUAGES: readonly LanguageInfo[] = [
  { id: "spanish",    slug: "spanish",    path: "/languages/spanish",    nameKey: "langSpanish" },
  { id: "portuguese", slug: "portuguese", path: "/languages/portuguese", nameKey: "langPortuguese" },
  { id: "english",    slug: "english",    path: "/languages/english",    nameKey: "langEnglish" },
  { id: "french",     slug: "french",     path: "/languages/french",     nameKey: "langFrench" },
  { id: "german",     slug: "german",     path: "/languages/german",     nameKey: "langGerman" },
  { id: "italian",    slug: "italian",    path: "/languages/italian",    nameKey: "langItalian" },
];

export function getLanguageLevel(slug: LanguageSlug, tr: Translations): string {
  switch (slug) {
    case "spanish":    return tr.langNative;
    case "portuguese": return tr.langNativeLevel;
    case "english":    return "C1 · Cambridge";
    case "french":     return "B2 · Alliance Fr.";
    case "german":     return "B2 · Goethe";
    case "italian":    return "B1 · Dante Aligh.";
  }
}
