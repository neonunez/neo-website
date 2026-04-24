export const SITE_URL = "https://neo-nunez.vercel.app";

export type RouteDef = {
  path: string;
  prerender: boolean;
};

export const ROUTES: RouteDef[] = [
  { path: "/", prerender: true },
  { path: "/about", prerender: true },
  { path: "/experience", prerender: true },
  { path: "/projects", prerender: true },
  { path: "/projects/llm-academic-wiki", prerender: true },
  { path: "/projects/llm-server", prerender: true },
  { path: "/projects/voiceflow", prerender: true },
  { path: "/projects/rag-system", prerender: true },
  { path: "/projects/focuspad", prerender: true },
  { path: "/skills", prerender: true },
  { path: "/languages", prerender: true },
  { path: "/languages/spanish", prerender: true },
  { path: "/languages/english", prerender: true },
  { path: "/languages/german", prerender: true },
  { path: "/languages/french", prerender: true },
  { path: "/languages/italian", prerender: true },
  { path: "/languages/portuguese", prerender: true },
];

export const PRERENDER_ROUTES = ROUTES.filter((r) => r.prerender).map((r) => r.path);
