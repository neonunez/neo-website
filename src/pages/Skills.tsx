import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge } from "@/components/shared";
import { motion, AnimatePresence } from "framer-motion";
import { AIAgentSkills } from "@/components/AIAgentSkills";
import { MessageSquare, Brain, Compass, Target, ChevronRight, ChevronDown } from "lucide-react";

export default function Skills() {
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const { tr } = usePortfolio();

  const categories = [
    { label: tr.skillLang,      delay: 0.1, items: ["Python", "JavaScript", "TypeScript", "Groovy", "Jython", "SQL", "HTML", "CSS", "Bash"] },
    { label: tr.skillAiMl,      delay: 0.2, items: ["LangGraph", "Docling", "RAG", "LLM orchestration", "Gemini", "Ollama", "mlx-whisper", "prompt engineering", "Groq", "Deepgram", "AssemblyAI", "llama.cpp", "LangSmith"] },
    { label: tr.skillFrameworks, delay: 0.3, items: ["FastAPI", "Next.js", "React Native", "Expo", "Svelte", "Zustand", "Vite"] },
    { label: tr.skillData,  delay: 0.4, items: ["Oracle ODI", "ETL/ELT", "Supabase", "data warehousing", "pgvector", "SQLite"] },
    { label: tr.skillTools, delay: 0.5, items: ["Git", "Docker", "Cursor", "Google Workspace", "Nginx", "Cloudflare", "Claude Code"] },
    { label: tr.skillLearning, delay: 0.6, items: ["ML fundamentals", "neural networks", "fine-tuning", "reinforcement learning"] },
  ];

  const softSkills = [
    { title: tr.softSkill1Title, desc: tr.softSkill1Desc, icon: MessageSquare },
    { title: tr.softSkill2Title, desc: tr.softSkill2Desc, icon: Brain },
    { title: tr.softSkill3Title, desc: tr.softSkill3Desc, icon: Compass },
    { title: tr.softSkill4Title, desc: tr.softSkill4Desc, icon: Target },
  ];

  return (
    <Layout>
      <section className="py-6 space-y-16">
        <FadeUp>
          {/* Technical Skills Section */}
          <div>
            <h1 className="text-2xl font-bold text-[var(--c-fg)] mb-8">
              {tr.sectionSkills}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <motion.div 
                  key={cat.label} 
                  className="group relative overflow-hidden rounded-2xl border border-[var(--c-border-thin)] bg-[var(--c-surface)] hover:bg-[var(--c-surface-2)] transition-all duration-300 p-6 sm:p-7 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: cat.delay, 
                    ease: "easeOut",
                    scale: { type: "spring", stiffness: 400, damping: 30 },
                    y: { type: "spring", stiffness: 400, damping: 30 }
                  }}
                >
                  {/* Subtle gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-white/[0.05] dark:to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <h3 className="text-[var(--c-fg)] text-[15px] font-semibold tracking-tight group-hover:text-white transition-colors duration-300">
                      {cat.label}
                    </h3>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-2.5">
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
          {/* Soft Skills Section */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-8">
              {tr.sectionSoftSkills}
            </h2>
            <div className="space-y-3">
              {softSkills.map((skill, i) => {
                const Icon = skill.icon;
                const isOpen = openSkill === i;

                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-[var(--c-border-thin)] bg-[var(--c-surface)] hover:border-[var(--c-dim)] hover:bg-[var(--c-surface-2)] transition-all duration-300 shadow-sm group"
                  >
                    <button
                      onClick={() => setOpenSkill(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[var(--c-surface-3)] border border-[var(--c-border-faint)] flex items-center justify-center text-[var(--c-muted)] group-hover:text-[var(--c-fg)] group-hover:border-[var(--c-border)] transition-colors duration-300 shadow-sm">
                           <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[15px] font-semibold text-[var(--c-fg)] tracking-tight group-hover:text-white transition-colors duration-300">{skill.title}</h3>
                      </div>
                      <div className="text-[var(--c-muted)] group-hover:text-[var(--c-fg)] transition-colors duration-300 pr-2">
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 flex sm:gap-4 flex-col sm:flex-row">
                            <div className="w-10 shrink-0 hidden sm:block" />
                            <p className="text-[14px] text-[var(--c-muted)] leading-relaxed flex-1 pt-1 opacity-90">
                              {skill.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.6}>
          {/* AI Agent Skills Section */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-8">
              {tr.sectionAiAgentSkills}
            </h2>
            <AIAgentSkills />
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
