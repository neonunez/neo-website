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
  const [theme, setThemeState] = useState<Theme>(() =>
    (localStorage.getItem("nn-theme") as Theme) ?? "dark"
  );
  const [lang, setLangState] = useState<Lang>(() =>
    (localStorage.getItem("nn-lang") as Lang) ?? "en"
  );

  const setTheme = (v: Theme) => setThemeState(v);
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  const setLang = (v: Lang) => setLangState(v);

  useEffect(() => { localStorage.setItem("nn-theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("nn-lang", lang); }, [lang]);

  useEffect(() => {
    document.title = "Neo Nuñez — AI Engineer";
  }, []);

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
