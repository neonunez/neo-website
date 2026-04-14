import { useState } from "react";
import { motion } from "framer-motion";
import { MessagesSquare, Lightbulb, RefreshCw, Flag } from "lucide-react";

const softSkills = [
  {
    id: "communication",
    title: "Cross-functional Communication",
    description: "Effectively translating complex technical concepts to non-technical stakeholders and vice-versa.",
    icon: MessagesSquare,
    color: "#a78bfa" // purple
  },
  {
    id: "problem-solving",
    title: "Analytical Problem Solving",
    description: "Deconstructing ambiguous challenges into systematic, manageable engineering tasks.",
    icon: Lightbulb,
    color: "#5eead4" // teal
  },
  {
    id: "adaptability",
    title: "Adaptability & Ambiguity",
    description: "Thriving in fast-paced environments where requirements shift and new technologies emerge rapidly.",
    icon: RefreshCw,
    color: "#fbbf24" // amber
  },
  {
    id: "ownership",
    title: "End-to-end Ownership",
    description: "Taking full accountability for product delivery, from initial architecture to post-deployment monitoring.",
    icon: Flag,
    color: "#f87171" // red
  }
];

export function SoftSkillsInteractive() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full h-[300px] sm:h-[160px] overflow-hidden">
      {softSkills.map((skill, index) => {
        const isHovered = hoveredIndex === index;
        const Icon = skill.icon;
        
        return (
          <motion.div
            key={skill.id}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
            className="relative rounded-2xl border border-[var(--c-border-thin)] bg-[var(--c-surface)] overflow-hidden cursor-pointer flex items-center sm:items-start p-4 sm:p-5"
            layout
            initial={false}
            animate={{
              flex: isHovered ? 4 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ minHeight: "60px", minWidth: "60px", backgroundColor: isHovered ? "var(--c-surface-2)" : "var(--c-surface)" }}
          >
            <div className="flex sm:flex-col items-center sm:items-start gap-4 flex-1 h-full min-w-max sm:min-w-0">
              <div 
                className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-[var(--c-surface-3)] border border-[var(--c-border-strong)] transition-colors duration-300"
                style={{ color: isHovered ? skill.color : "var(--c-muted)" }}
              >
                <Icon size={20} />
              </div>
              
              <div className="flex flex-col justify-center sm:justify-start overflow-hidden flex-1 select-none">
                <motion.h4 
                  layout
                  className="font-medium text-sm text-[var(--c-fg)] whitespace-nowrap"
                  animate={{ opacity: isHovered ? 1 : 0.8 }}
                >
                  {skill.title}
                </motion.h4>
                <div className="relative w-full overflow-hidden">
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0, 
                      height: isHovered ? "auto" : 0 
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-[var(--c-muted)] mt-1 max-w-[200px]"
                    style={{ whiteSpace: "normal" }}
                  >
                    {skill.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
