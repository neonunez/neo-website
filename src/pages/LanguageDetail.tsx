import { useParams } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";

const LANGUAGE_SLUGS = [
  "spanish",
  "portuguese",
  "english",
  "french",
  "german",
  "italian",
] as const;

type LanguageSlug = (typeof LANGUAGE_SLUGS)[number];

function getLangName(
  slug: LanguageSlug,
  tr: ReturnType<typeof usePortfolio>["tr"]
): string {
  const map: Record<LanguageSlug, string> = {
    spanish: tr.langSpanish,
    portuguese: tr.langPortuguese,
    english: tr.langEnglish,
    french: tr.langFrench,
    german: tr.langGerman,
    italian: tr.langItalian,
  };
  return map[slug];
}

function getLangLevel(slug: LanguageSlug, tr: ReturnType<typeof usePortfolio>["tr"]): string {
  const map: Record<LanguageSlug, string> = {
    spanish: tr.langNative,
    portuguese: tr.langNativeLevel,
    english: "C1 · Cambridge",
    french: "B2 · Alliance Fr.",
    german: "B2 · Goethe",
    italian: "B1 · Dante Aligh.",
  };
  return map[slug];
}

export default function LanguageDetail() {
  const params = useParams<{ slug: string }>();
  const { tr } = usePortfolio();
  const slug = params.slug as LanguageSlug;

  if (!LANGUAGE_SLUGS.includes(slug)) {
    return (
      <Layout>
        <div className="py-6 text-sm text-[var(--c-muted)]">Language not found.</div>
      </Layout>
    );
  }

  const name = getLangName(slug, tr);
  const level = getLangLevel(slug, tr);

  return (
    <Layout>
      <section className="py-6">
        <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-5">
          {name}
          <span className="ml-3 text-base font-normal text-[var(--c-muted)]">
            {level}
          </span>
        </h2>

        {/* Full-viewport-height certification image placeholder */}
        <div
          className="w-full rounded-lg border border-dashed border-[var(--c-faint)]/40 flex items-center justify-center"
          style={{ minHeight: "calc(100vh - 220px)" }}
        >
          <div className="flex flex-col items-center gap-3 text-center select-none pointer-events-none">
            <div className="w-16 h-16 rounded-full border border-dashed border-[var(--c-faint)]/40 flex items-center justify-center">
              <svg
                className="opacity-20"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="text-xs text-[var(--c-faint)] uppercase tracking-widest opacity-50">
              certification · {name}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
