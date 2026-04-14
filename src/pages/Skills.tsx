import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge } from "@/components/shared";
import { motion } from "framer-motion";
import { SoftSkillsInteractive } from "@/components/SoftSkillsInteractive";
import { AIAgentSkills } from "@/components/AIAgentSkills";

export default function Skills() {
  const { tr } = usePortfolio();

  const categories = [
    { label: tr.skillLang,  delay: 0.1, items: ["Python", "JavaScript", "TypeScript", "Groovy", "Jython", "SQL", "HTML", "CSS"] },
    { label: "AI / ML",     delay: 0.2, items: ["LangGraph", "LlamaIndex", "RAG", "LLM orchestration", "Gemini", "Ollama", "mlx-whisper", "prompt engineering"] },
    { label: "Frameworks",  delay: 0.3, items: ["FastAPI", "Next.js", "React Native", "Expo"] },
    { label: tr.skillData,  delay: 0.4, items: ["Oracle ODI", "ETL/ELT", "Supabase", "data warehousing"] },
    { label: tr.skillTools, delay: 0.5, items: ["Git", "Docker", "Cursor", "Google Workspace"] },
    { label: tr.skillLearning, delay: 0.6, items: ["ML fundamentals", "neural networks", "fine-tuning", "reinforcement learning"] },
  ];

  return (
    <Layout>
      <section className="py-6 space-y-16">
        <FadeUp>
          {/* Technical Skills Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)]">
                {tr.sectionSkills}
              </h2>
              <div className="flex-1 h-[1px] bg-[var(--c-border-thin)] max-w-xs" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <motion.div 
                  key={cat.label} 
                  className="rounded-2xl border border-[var(--c-border-thin)] bg-[var(--c-surface)] hover:bg-[var(--c-surface-2)] transition-colors p-6 sm:p-7 space-y-4 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: cat.delay, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[var(--c-fg)] text-[15px] font-semibold tracking-tight">
                      {cat.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.items.map((item) => (
                      <TechBadge key={item} label={item} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          {/* AI Agent Skills Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)]">
                AI Agent Skills
              </h2>
              <div className="flex-1 h-[1px] bg-[var(--c-border-thin)] max-w-xs" />
            </div>
            <AIAgentSkills />
          </div>
        </FadeUp>

        <FadeUp delay={0.6}>
          {/* Soft Skills Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)]">
                Soft Skills
              </h2>
              <div className="flex-1 h-[1px] bg-[var(--c-border-thin)] max-w-xs" />
            </div>
            <SoftSkillsInteractive />
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
