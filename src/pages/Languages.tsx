import { Link } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { Globe } from "@/components/Globe";
import { FadeUp } from "@/components/shared";
import { LANGUAGES, getLanguageLevel } from "@/lib/site-map";

export default function Languages() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <section className="py-6">
        <FadeUp>
          <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-5">
            {tr.sectionLanguages}
          </h2>
          <p className="text-sm leading-[1.85] text-[var(--c-muted)] mb-6">{tr.langsBio}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-[var(--c-muted)]">
            {LANGUAGES.map((l) => (
              <div key={l.slug} className="flex items-center justify-between gap-2">
                <Link
                  href={l.path}
                  className="group link-anim inline-flex items-center gap-1.5 text-[var(--c-fg)] pb-px hover:text-[var(--c-fg)]"
                >
                  {tr[l.nameKey]}
                </Link>
                <span className="text-[var(--c-faint)] text-xs shrink-0">
                  {getLanguageLevel(l.slug, tr)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Globe />
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
