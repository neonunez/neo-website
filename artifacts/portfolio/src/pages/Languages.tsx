import { ExternalLink } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp } from "@/components/shared";

export default function Languages() {
  const { tr } = usePortfolio();

  const langs = [
    { name: tr.langSpanish,    level: tr.langNative,     cert: "#" },
    { name: tr.langPortuguese, level: tr.langNativeLevel, cert: "#" },
    { name: tr.langEnglish,    level: "C1 · Cambridge",   cert: "#" },
    { name: tr.langFrench,     level: "B2 · Alliance Fr.", cert: "#" },
    { name: tr.langGerman,     level: "B2 · Goethe",      cert: "#" },
    { name: tr.langItalian,    level: "B1 · Dante Aligh.", cert: "#" },
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
            {langs.map(({ name, level, cert }) => (
              <div key={name} className="flex items-center justify-between gap-2">
                <a
                  href={cert}
                  target="_blank"
                  rel="noreferrer"
                  className="group link-anim inline-flex items-center gap-1.5 text-[var(--c-fg)] pb-px hover:text-[var(--c-fg)]"
                >
                  {name}
                  <ExternalLink
                    size={10}
                    className="opacity-25 group-hover:opacity-60 transition-opacity shrink-0"
                  />
                </a>
                <span className="text-[var(--c-faint)] text-xs shrink-0">{level}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
