import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp, HoverRow, TechBadge } from "@/components/shared";
import { PROJECTS } from "@/lib/site-map";

export default function Projects() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <section className="py-6">
        <FadeUp>
          <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-6">
            {tr.sectionProjects}
          </h2>
        </FadeUp>
        <div className="space-y-4">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <Link href={p.path} className="block group">
                <HoverRow>
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="text-sm font-medium text-[var(--c-fg)] flex items-center gap-1">
                      {p.name}
                      <ChevronRight
                        size={12}
                        className="text-[var(--c-faint)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 -mb-px"
                      />
                    </h3>
                    <span className="text-xs text-[var(--c-faint)] whitespace-nowrap">
                      {tr.inDevelopment}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--c-muted)] leading-relaxed mb-2">{tr[p.descKey]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((label) => <TechBadge key={label} label={label} />)}
                  </div>
                </HoverRow>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </Layout>
  );
}
