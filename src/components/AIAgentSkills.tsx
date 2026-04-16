import { useState } from "react";
import { motion } from "framer-motion";

const aiSkills = [
  { slug: "prompt-engineering", type: "capability", meta: "~188 tok" },
  { slug: "agentic-workflows",  type: "orchestration", meta: "~124 tok" },
  { slug: "rag-pipeline",       type: "retrieval", meta: "~215 tok" },
  { slug: "ai-coding",          type: "workflow", meta: "~108 tok" },
  { slug: "llm-orchestration",  type: "framework", meta: "~256 tok" },
  { slug: "local-inference",    type: "deployment", meta: "~302 tok" },
];

export function AIAgentSkills() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rounded-xl border border-[var(--c-border-strong)] bg-[var(--c-elevated)] overflow-hidden font-mono shadow-sm transition-all hover:border-[var(--c-dim)]">
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--c-border-thin)] bg-[var(--c-surface-2)]">
        <span className="text-[var(--c-muted)] font-bold text-sm">{'>'}</span>
        <span className="text-[var(--c-fg)] font-medium tracking-wide text-sm">/skills</span>
      </div>

      <div className="p-2 select-none">
        {/* Header section */}
        <div className="px-3 pb-2 pt-2 border-b border-[var(--c-border-thin)] mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-[var(--c-fg)] font-semibold text-[13px] tracking-wide">Skills</h3>
            <p className="text-[var(--c-muted)] text-xs mt-1">{aiSkills.length} skills · Esc to close</p>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col pb-1">
          {aiSkills.map((skill, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={skill.slug}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-center px-1 py-1.5 rounded-md cursor-pointer transition-colors duration-75 ${
                  isActive ? "bg-[var(--c-surface-3)]" : ""
                }`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                {/* Active Indicator */}
                <div className="flex flex-col items-center justify-center w-6 shrink-0 text-[var(--c-muted)]">
                  {isActive && <span className="text-[var(--c-fg)] text-[11px] font-bold">{'>'}</span>}
                </div>
                
                {/* Status Column */}
                <div className="flex items-center gap-1.5 w-[4.5rem] shrink-0 text-emerald-500 [.light_&]:text-emerald-600 text-xs whitespace-nowrap">
                  <span className="text-[10px]">✔</span>
                  <span className="font-medium tracking-wide">on</span>
                </div>

                {/* Content */}
                <div className="flex flex-1 items-center gap-3 overflow-hidden text-[13px]">
                  <span className="text-[var(--c-fg)]">{skill.slug}</span>
                  <span className="text-[var(--c-dim)] shrink-0">·</span>
                  <span className="text-[var(--c-muted)]">{skill.type}</span>
                  <span className="text-[var(--c-dim)] shrink-0">·</span>
                  <span className="text-[var(--c-faint)]">{skill.meta}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
