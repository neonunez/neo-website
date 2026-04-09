import { motion } from "framer-motion";
import { Building2, BrainCircuit, Mic, LayoutGrid, GraduationCap } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { Badge, FlagBadge } from "@/components/shared";

const nameChars = "Neo Nuñez".split("");
const introDelay = [0.05, 0.12, 0.19, 0.26];

export default function Overview() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <div className="py-6">

        {/* Name */}
        <h1 className="text-2xl font-semibold text-[var(--c-fg)] mb-3 flex flex-wrap">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 + i * 0.028 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[0] }}
          className="text-[var(--c-muted)] text-sm leading-relaxed mb-6"
        >
          {tr.tagline}
        </motion.p>

        {/* Status lines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[1] }}
          className="space-y-2.5 text-sm leading-relaxed mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[var(--c-muted)]">{tr.workingAt}</span>
            <Badge icon={<Building2 size={11} className="text-[#60a5fa]" />}>Apply Latam</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[var(--c-muted)]">{tr.building}</span>
            <Badge icon={<BrainCircuit size={11} className="text-[#a78bfa]" />}>Enterprise RAG System</Badge>
            <Badge icon={<Mic size={11} className="text-[#34d399]" />}>VoiceFlow</Badge>
            <Badge icon={<LayoutGrid size={11} className="text-[#fb923c]" />}>FocusPad</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[var(--c-muted)]">{tr.studyingAt}</span>
            <Badge icon={<GraduationCap size={11} className="text-[#f472b6]" />}>UBA — Computer Science</Badge>
          </div>
          <div className="flex items-center gap-1 flex-wrap md:flex-nowrap">
            <span className="text-[var(--c-muted)] shrink-0 mr-1">{tr.fluentIn}</span>
            <FlagBadge flag="🇦🇷" label={tr.langSpanish} compact />
            <FlagBadge flag="🇬🇧" label={tr.langEnglish} compact />
            <FlagBadge flag="🇫🇷" label={tr.langFrench} compact />
            <FlagBadge flag="🇩🇪" label={tr.langGerman} compact />
            <FlagBadge flag="🇮🇹" label={tr.langItalian} compact />
            <FlagBadge flag="🇧🇷" label={tr.langPortuguese} compact />
          </div>
        </motion.div>


      </div>
    </Layout>
  );
}
