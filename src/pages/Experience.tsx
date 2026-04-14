import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp, HoverRow } from "@/components/shared";

export default function Experience() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <section className="py-6">
        <FadeUp>
          <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-6">
            {tr.sectionExperience}
          </h2>
        </FadeUp>
        <div className="space-y-6">
          <FadeUp delay={0.05}>
            <HoverRow>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[var(--c-fg)]">{tr.exp1Title}</h3>
                <span className="text-xs text-[var(--c-faint)] whitespace-nowrap">{tr.exp1Period}</span>
              </div>
              <p className="text-xs text-[var(--c-mid)] mb-3">Apply Latam · Buenos Aires</p>
              <ul className="space-y-1.5 text-sm text-[var(--c-muted)] leading-relaxed">
                <li>{tr.exp1p1}</li>
                <li>{tr.exp1p2}</li>
                <li>{tr.exp1p3}</li>
                <li>{tr.exp1p4}</li>
              </ul>
            </HoverRow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <HoverRow>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[var(--c-fg)]">{tr.exp2Title}</h3>
                <span className="text-xs text-[var(--c-faint)] whitespace-nowrap">{tr.exp2Period}</span>
              </div>
              <p className="text-xs text-[var(--c-mid)] mb-3">Apply Latam · Buenos Aires</p>
              <ul className="space-y-1.5 text-sm text-[var(--c-muted)] leading-relaxed">
                <li>{tr.exp2p1}</li>
                <li>{tr.exp2p2}</li>
              </ul>
            </HoverRow>
          </FadeUp>
        </div>
      </section>
    </Layout>
  );
}
