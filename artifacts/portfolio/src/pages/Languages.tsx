import { Link } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp } from "@/components/shared";

export default function Languages() {
  const { tr } = usePortfolio();

  const langs = [
    { name: tr.langSpanish,    level: tr.langNative,      slug: "spanish"    },
    { name: tr.langPortuguese, level: tr.langNativeLevel,  slug: "portuguese" },
    { name: tr.langEnglish,    level: "C1 · Cambridge",    slug: "english"    },
    { name: tr.langFrench,     level: "B2 · Alliance Fr.", slug: "french"     },
    { name: tr.langGerman,     level: "B2 · Goethe",       slug: "german"     },
    { name: tr.langItalian,    level: "B1 · Dante Aligh.", slug: "italian"    },
  ];

  return (
    <Layout>
      <section className="py-6">
        <FadeUp>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)] mb-5">
            {tr.sectionLanguages}
          </h2>
          <p className="text-sm leading-[1.85] text-[var(--c-muted)] mb-6">{tr.langsBio}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-[var(--c-muted)]">
            {langs.map(({ name, level, slug }) => (
              <div key={slug} className="flex items-center justify-between gap-2">
                <Link
                  href={`/languages/${slug}`}
                  className="group link-anim inline-flex items-center gap-1.5 text-[var(--c-fg)] pb-px hover:text-[var(--c-fg)]"
                >
                  {name}
                </Link>
                <span className="text-[var(--c-faint)] text-xs shrink-0">{level}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
