import { useParams } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { LANGUAGES, LANGUAGE_SLUGS, getLanguageLevel, type LanguageSlug } from "@/lib/site-map";
import { ZoomableImage } from "@/components/shared";

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

  const info = LANGUAGES.find((l) => l.slug === slug)!;
  const name = tr[info.nameKey];
  const level = getLanguageLevel(slug, tr);

  return (
    <Layout>
      <section className="py-6">
        <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-5">
          {name}
          <span className="ml-3 text-base font-normal text-[var(--c-muted)]">
            {level}
          </span>
        </h2>

        {slug === "german" ? (
          <div className="max-w-lg mx-auto">
            <ZoomableImage src="/languages-certificates/german-certificate.png" alt="German B2 Goethe certificate" />
          </div>
        ) : (
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
        )}
      </section>
    </Layout>
  );
}
