import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, GitBranch, Layers, Database, Zap, CheckCircle2, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge , AnimatedLine } from "@/components/shared";

const techStack = ["React Native", "Expo", "TypeScript"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-4">
      {children}
    </h2>
  );
}

function ContentBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="mb-10">{children}</div>
    </FadeUp>
  );
}

function ArchCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-4">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-[var(--c-muted)] flex items-center">{icon}</span>
        <span className="text-sm font-medium text-[var(--c-fg)]">{title}</span>
      </div>
      <p className="text-sm text-[var(--c-muted)] leading-relaxed">{description}</p>
    </div>
  );
}

export default function ProjectFocusPad() {
  return (
    <Layout>
      <div className="py-6">
        <FadeUp delay={0}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--c-faint)] hover:text-[var(--c-muted)] transition-colors mb-8 group"
          >
            <ArrowLeft
              size={12}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Projects
          </Link>
        </FadeUp>

        <FadeUp delay={0.04}>
          <div className="mb-10">
            <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <h1 className="text-xl font-semibold text-[var(--c-fg)] leading-tight">
                FocusPad
              </h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] whitespace-nowrap">
                <Clock size={10} className="text-[#fb923c]" />
                In development
              </span>
            </div>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed">
              Personal iOS productivity app — reminders, notes, tasks, calendar, planner, and habit tracker. Detailed project description coming soon...
            </p>
          </div>
        </FadeUp>

        <AnimatedLine className="mb-10" />

        <ContentBlock delay={0.08}>
          <SectionLabel>Problem</SectionLabel>
          <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
            <p>Details about the problem this project solves will be added here...</p>
          </div>
        </ContentBlock>

        <ContentBlock delay={0.12}>
          <SectionLabel>Approach</SectionLabel>
          <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
            <p>Details about the technical approach will be documented here...</p>
          </div>
        </ContentBlock>

        <ContentBlock delay={0.16}>
          <SectionLabel>Architecture highlights</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ArchCard
              icon={<Database size={14} />}
              title="Placeholder System"
              description="Architecture component description to be detailed soon."
            />
          </div>
        </ContentBlock>

        <ContentBlock delay={0.20}>
          <SectionLabel>Tech stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {techStack.map((label) => (
              <TechBadge key={label} label={label} />
            ))}
          </div>
        </ContentBlock>

        <ContentBlock delay={0.24}>
          <SectionLabel>Outcomes &amp; status</SectionLabel>
          <div className="space-y-2.5">
            {[
              "Outcomes and achievements placeholder 1",
              "Outcomes and achievements placeholder 2",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.24 + i * 0.06 }}
                className="flex items-start gap-2.5"
              >
                <CheckCircle2 size={13} className="text-[#34d399] mt-0.5 shrink-0" />
                <span className="text-sm text-[var(--c-soft)] leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </ContentBlock>

      </div>
    </Layout>
  );
}
