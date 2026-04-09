import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp } from "@/components/shared";

export default function Skills() {
  const { tr } = usePortfolio();

  const rows = [
    { label: tr.skillLang,  value: "Python · JavaScript · TypeScript · Groovy · Jython · SQL · HTML · CSS" },
    { label: "AI / ML",     value: "LangGraph · LlamaIndex · RAG · LLM orchestration · Gemini · Ollama · mlx-whisper · prompt engineering" },
    { label: "Frameworks",  value: "FastAPI · Next.js · React Native (Expo)" },
    { label: tr.skillData,  value: "Oracle ODI · ETL/ELT · Supabase · data warehousing" },
    { label: tr.skillTools, value: "Git · Docker · Cursor · Google Workspace" },
    { label: tr.skillLearning, value: "ML fundamentals · neural networks · fine-tuning · reinforcement learning" },
  ];

  return (
    <Layout>
      <section className="py-6">
        <FadeUp>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)] mb-6">
            {tr.sectionSkills}
          </h2>
          <div className="space-y-3 text-sm text-[var(--c-muted)]">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-x-6" style={{ gridTemplateColumns: "7rem 1fr" }}>
                <span className="text-[var(--c-faint)] text-xs self-start pt-[3px] leading-relaxed">
                  {row.label}
                </span>
                <span className="leading-relaxed">{row.value}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
