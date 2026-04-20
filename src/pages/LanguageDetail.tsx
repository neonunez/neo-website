import { useParams } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { LANGUAGES, LANGUAGE_SLUGS, getLanguageLevel, type LanguageSlug } from "@/lib/site-map";
import { ZoomableImage } from "@/components/shared";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MateIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* The cup */}
    <path d="M7 11c0 0 0 7 5 7s5-7 5-7" />
    <path d="M7 11h10" />
    {/* The bombilla (straw) */}
    <path d="M12 11L14 4" />
    <circle cx="14" cy="4" r="0.5" fill="currentColor" />
    {/* Steam lines */}
    <motion.path
      d="M10 8c0-1 1-1 1-2s-1-1-1-2"
      animate={{ opacity: [0, 0.5, 0], y: [0, -2] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
    />
    <motion.path
      d="M13 8c0-1 1-1 1-2s-1-1-1-2"
      animate={{ opacity: [0, 0.5, 0], y: [0, -2] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
    />
  </svg>
);

const BrazilFlagIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden rounded-md border border-[var(--c-border-strong)] bg-[var(--c-surface-3)]", className)}>
    <img
      src="https://flagcdn.com/br.svg"
      alt="Brazil Flag"
      className="w-full h-full object-cover grayscale brightness-[0.7] contrast-[1.1] opacity-70"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)]/20 to-transparent pointer-events-none" />
  </div>
);

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

        {slug === "english" ? (
          <div className="max-w-lg mx-auto">
            <ZoomableImage src="/languages-certificates/english-certificate.png" alt="English C1 certificate" />
          </div>
        ) : slug === "german" ? (
          <div className="max-w-lg mx-auto">
            <ZoomableImage src="/languages-certificates/german-certificate.png" alt="German B2 Goethe certificate" />
          </div>
        ) : slug === "french" ? (
          <div className="max-w-lg mx-auto">
            <ZoomableImage src="/languages-certificates/french-certificate.png" alt="French B2 certificate" />
          </div>
        ) : slug === "italian" ? (
          <div className="max-w-2xl mx-auto">
            <ZoomableImage src="/languages-certificates/italian-certificate.png" alt="Italian B1 certificate" />
          </div>
        ) : slug === "portuguese" ? (
          <div
            className="w-full rounded-xl border border-[var(--c-border-thin)] bg-[var(--c-surface-faint)] flex flex-col items-center justify-center p-12 text-center"
            style={{ minHeight: "calc(100vh - 220px)" }}
          >
            <div className="relative mb-10">
              <div className="absolute inset-0 blur-3xl bg-[var(--c-border)] opacity-20" />
              <BrazilFlagIcon className="w-24 h-16 relative z-10" />
            </div>
            
            <div className="max-w-md space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-[var(--c-fg)]">
                  {tr.langPortugueseProofTitle}
                </h3>
                <p className="text-[var(--c-muted)] leading-relaxed">
                  {tr.langPortugueseProofDesc}
                </p>
              </div>

              <div className="pt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--c-surface)] border border-[var(--c-border)] text-[10px] uppercase tracking-widest text-[var(--c-dim)] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  {tr.langCurrentlyLearning}
                </span>
              </div>
            </div>
          </div>
        ) : slug === "spanish" ? (
          <div
            className="w-full rounded-xl border border-[var(--c-border-thin)] bg-[var(--c-surface-faint)] flex flex-col items-center justify-center p-12 text-center"
            style={{ minHeight: "calc(100vh - 220px)" }}
          >
            <div className="relative mb-10">
              <div className="absolute inset-0 blur-3xl bg-[var(--c-border)] opacity-20" />
              <MateIcon className="w-24 h-24 text-[var(--c-fg)] relative z-10 opacity-80" />
            </div>
            
            <div className="max-w-md space-y-4">
              <h3 className="text-xl font-medium text-[var(--c-fg)]">
                {tr.langSpanishProofTitle}
              </h3>
              <p className="text-[var(--c-muted)] leading-relaxed">
                {tr.langSpanishProofDesc}
              </p>
              <div className="pt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--c-surface)] border border-[var(--c-border)] text-[10px] uppercase tracking-widest text-[var(--c-dim)] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {tr.langNativeBuenosAires}
                </span>
              </div>
            </div>
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
