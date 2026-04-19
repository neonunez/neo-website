import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, FileText, CheckSquare, Bell, ClipboardList, TrendingUp, Calendar, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge, AnimatedLine, DevelopmentIndicator } from "@/components/shared";
import { usePortfolio } from "@/context/PortfolioContext";

const techStack = [
  "React Native", "Expo Go", "TypeScript", "SQLite", "Zustand",
  "expo-router", "expo-notifications", "expo-calendar", "Qwen3-8b", "FlashList",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--c-muted)] mb-6 flex items-center gap-3">
      <span className="flex-shrink-0">{children}</span>
      <span className="flex-1 h-px bg-[var(--c-border)]" />
    </h2>
  );
}


export default function ProjectFocusPad() {
  const { tr } = usePortfolio();

  const modules = [
    { icon: <FileText size={14} />,     name: "Notes",        desc: tr.focusPadMod_notes },
    { icon: <CheckSquare size={14} />,  name: "Tasklists",    desc: tr.focusPadMod_tasks },
    { icon: <Bell size={14} />,         name: "Reminders",    desc: tr.focusPadMod_reminders },
    { icon: <ClipboardList size={14} />,name: "Daily Planner",desc: tr.focusPadMod_planner },
    { icon: <TrendingUp size={14} />,   name: "Habits",       desc: tr.focusPadMod_habits },
    { icon: <Calendar size={14} />,     name: "Calendar",     desc: tr.focusPadMod_calendar },
  ];

  const relatedProjects = [
    { name: "VoiceFlow",   desc: tr.proj2Desc,         href: "/projects/voiceflow" },
    { name: "LLM Server",  desc: tr.proj_llmServerDesc, href: "/projects/llm-server" },
  ];

  return (
    <Layout>
      <div className="py-6">
        {/* Back nav */}
        <FadeUp delay={0}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--c-faint)] hover:text-[var(--c-muted)] transition-colors mb-8 group"
          >
            <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            {tr.navProjects}
          </Link>
        </FadeUp>

        {/* Hero */}
        <FadeUp delay={0.03}>
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <h1 className="text-3xl font-bold text-[var(--c-fg)] leading-tight">FocusPad</h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] whitespace-nowrap">
                <Clock size={10} className="text-[#fb923c]" />
                {tr.inDevelopment}
              </span>
            </div>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed max-w-xl">
              {tr.focusPadHero_tagline}
            </p>
          </div>
        </FadeUp>

        {/* Development Loading Circle */}
        <FadeUp delay={0.05}>
          <DevelopmentIndicator accentColor="#fb923c" />
        </FadeUp>

        <AnimatedLine className="mb-8 mt-6" />

        {/* About */}
        <FadeUp delay={0.08}>
          <div className="mb-10">
            <div className="border-l border-[var(--c-border)] pl-4 space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>{tr.focusPadAbout_p1}</p>
              <p>{tr.focusPadAbout_p2}</p>
            </div>
          </div>
        </FadeUp>

        {/* Modules */}
        <FadeUp delay={0.12}>
          <div className="mb-10">
            <SectionLabel>{tr.focusPadMod_heading}</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modules.map((mod) => (
                <div
                  key={mod.name}
                  className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-4 transition-all duration-200 hover:border-[var(--c-border-strong)] hover:bg-[var(--c-surface-2)]"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[var(--c-muted)]">{mod.icon}</span>
                    <span className="text-sm font-medium text-[var(--c-fg)]">{mod.name}</span>
                  </div>
                  <p className="text-xs text-[var(--c-muted)] leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Tech stack */}
        <FadeUp delay={0.16}>
          <div className="mb-10">
            <SectionLabel>{tr.focusPadStack_heading}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Status card — orange accent */}
        <FadeUp delay={0.20}>
          <div className="mb-10 rounded-lg border border-[var(--c-border)] border-l-[3px] border-l-[#fb923c] bg-[var(--c-surface-2)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#fb923c] animate-pulse shrink-0" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-muted)]">
                {tr.focusPadStatus_heading}
              </p>
            </div>
            <p className="text-sm text-[var(--c-soft)] leading-relaxed">{tr.focusPadStatus_desc}</p>
          </div>
        </FadeUp>

        {/* Related projects */}
        <FadeUp delay={0.24}>
          <div className="mt-8 pt-8 border-t border-[var(--c-border)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-muted)] mb-4">
              {tr.focusPadRelated_heading}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory scrollbar-none">
              {relatedProjects.map((p) => (
                <Link key={p.href} href={p.href} className="block group flex-none w-64 snap-start">
                  <div className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-4 transition-all duration-200 hover:border-[var(--c-border-strong)] hover:bg-[var(--c-surface-2)] h-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-[var(--c-fg)]">{p.name}</p>
                      <ChevronRight size={12} className="text-[var(--c-faint)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0" />
                    </div>
                    <p className="text-xs text-[var(--c-muted)] leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </Layout>
  );
}
