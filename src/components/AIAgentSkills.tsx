import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const aiSkills = [
  { name: "Prompt Engineering & Few-Shot", proficiency: 95 },
  { name: "Agentic Workflows (Tool Calling, Planning)", proficiency: 90 },
  { name: "RAG & Vector Embeddings", proficiency: 85 },
  { name: "AI Coding Bots (Cursor, Copilot)", proficiency: 95 },
  { name: "LLM Orchestration (LangChain, LangGraph)", proficiency: 80 },
  { name: "Local Inference (Ollama, MLX)", proficiency: 85 },
];

export function AIAgentSkills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {aiSkills.map((skill, index) => (
        <div key={skill.name} className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-[var(--c-fg)] font-medium">
              <Bot size={14} className="text-[var(--c-muted)]" />
              {skill.name}
            </div>
            <span className="text-[11px] text-[var(--c-faint)] font-mono">{skill.proficiency}%</span>
          </div>
          <div className="h-2 w-full bg-[var(--c-surface-2)] rounded-full overflow-hidden border border-[var(--c-border-thin)]">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundImage: "linear-gradient(90deg, #a78bfa 0%, #5eead4 100%)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: `${skill.proficiency}%`, opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
