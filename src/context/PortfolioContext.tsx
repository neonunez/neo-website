import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, type Translations, t } from "@/lib/i18n";

type Theme = "dark" | "light";

interface PortfolioContextValue {
  theme: Theme;
  setTheme: (v: Theme) => void;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (v: Lang) => void;
  tr: Translations;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("nn-theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("nn-lang");
    const valid: Lang[] = ["en", "es", "fr", "de", "it", "pt"];
    return valid.includes(stored as Lang) ? (stored as Lang) : "en";
  });

  const setTheme = (v: Theme) => setThemeState(v);
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  const setLang = (v: Lang) => setLangState(v);

  useEffect(() => { localStorage.setItem("nn-theme", theme); }, [theme]);
  useEffect(() => {
    localStorage.setItem("nn-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const tr = t[lang];

  return (
    <PortfolioContext.Provider value={{ theme, setTheme, toggleTheme, lang, setLang, tr }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}
