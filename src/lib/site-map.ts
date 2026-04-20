import type { Translations } from "./i18n";

// ─── Projects ────────────────────────────────────────────────────────────────

export interface ProjectInfo {
  id: string;
  name: string;
  slug: string;
  path: string;
  tags: readonly string[];
  descKey: keyof Translations;
  statusKey: keyof Translations;
}

export const PROJECTS: readonly ProjectInfo[] = [
  {
    id: "llm-academic-wiki",
    name: "llm-academic-wiki",
    slug: "llm-academic-wiki",
    path: "/projects/llm-academic-wiki",
    tags: ["Python", "LLMs", "RAG"],
    descKey: "proj_llmWikiDesc",
    statusKey: "llmWikiHero_badge",
  },
  {
    id: "llm-server",
    name: "llm-server",
    slug: "llm-server",
    path: "/projects/llm-server",
    tags: ["FastAPI", "Python", "LLMs"],
    descKey: "proj_llmServerDesc",
    statusKey: "llmSrvHero_badge",
  },
  {
    id: "voiceflow",
    name: "VoiceFlow",
    slug: "voiceflow",
    path: "/projects/voiceflow",
    tags: ["Python", "mlx-whisper", "pyobjc", "rumps", "pywebview"],
    descKey: "proj2Desc",
    statusKey: "voiceFlowHero_badge",
  },
  {
    id: "enterprise-rag",
    name: "Enterprise RAG System",
    slug: "rag-system",
    path: "/projects/rag-system",
    tags: ["Next.js", "FastAPI", "LangGraph", "LlamaIndex", "Supabase", "Gemini Flash"],
    descKey: "proj1Desc",
    statusKey: "ragSystemHero_badge",
  },
  {
    id: "focuspad",
    name: "FocusPad",
    slug: "focuspad",
    path: "/projects/focuspad",
    tags: ["React Native", "Expo", "TypeScript"],
    descKey: "proj3Desc",
    statusKey: "inDevelopment",
  },
];

// ─── Languages ───────────────────────────────────────────────────────────────

export const LANGUAGE_SLUGS = ["spanish", "english", "german", "french", "italian", "portuguese"] as const;
export type LanguageSlug = (typeof LANGUAGE_SLUGS)[number];

export interface LanguageInfo {
  id: LanguageSlug;
  slug: LanguageSlug;
  path: string;
  nameKey: keyof Translations;
}

export const LANGUAGES: readonly LanguageInfo[] = [
  { id: "spanish",    slug: "spanish",    path: "/languages/spanish",    nameKey: "langSpanish" },
  { id: "english",    slug: "english",    path: "/languages/english",    nameKey: "langEnglish" },
  { id: "german",     slug: "german",     path: "/languages/german",     nameKey: "langGerman" },
  { id: "french",     slug: "french",     path: "/languages/french",     nameKey: "langFrench" },
  { id: "italian",    slug: "italian",    path: "/languages/italian",    nameKey: "langItalian" },
  { id: "portuguese", slug: "portuguese", path: "/languages/portuguese", nameKey: "langPortuguese" },
];

export function getLanguageLevel(slug: LanguageSlug, tr: Translations): string {
  switch (slug) {
    case "spanish":    return tr.langNative;
    case "portuguese": return "A2 · Learning";
    case "english":    return "C1 · Cambridge";
    case "french":     return "B2 · Alliance Fr.";
    case "german":     return "B2 · Goethe";
    case "italian":    return "B1 · Dante Aligh.";
  }
}
