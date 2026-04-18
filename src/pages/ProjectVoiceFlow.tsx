import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, Cpu, Layers, Shield, GitBranch, CheckCircle2,
  Image, ChevronRight,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge, AnimatedLine, GithubGlyph } from "@/components/shared";
import { usePortfolio } from "@/context/PortfolioContext";

const techStack = [
  "Python", "Svelte", "pywebview", "sounddevice", "Groq", "Deepgram",
  "AssemblyAI", "Gemini", "SQLite", "PyInstaller", "rumps", "Vite",
];

const SECTIONS = [
  { id: "intro",         label: "intro" },
  { id: "problem",       label: "problem" },
  { id: "insight",       label: "insight" },
  { id: "how-it-works",  label: "how-it-works" },
  { id: "architecture",  label: "architecture" },
  { id: "tech-stack",    label: "tech-stack" },
  { id: "outcomes",      label: "outcomes" },
  { id: "learnings",     label: "learnings" },
];

const GITHUB_URL = "https://github.com/neonunez/voiceflow";

/* ── Reading-progress nav (right side, xl+) ─────────────────── */
function ReadingNav({ activeId, labels }: { activeId: string; labels: Record<string, string> }) {
  const activeIndex = SECTIONS.findIndex(s => s.id === activeId);
  const progress = activeIndex / (SECTIONS.length - 1);
  return (
    <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-0 select-none">
      <div className="absolute left-[5px] top-[12.5px] bottom-[12.5px] w-px bg-[var(--c-border)]" />
      <div className="absolute left-[5px] top-[12.5px] bottom-[12.5px] w-px overflow-hidden">
        <div className="w-full bg-[var(--c-fg)] transition-all duration-300" style={{ height: `${progress * 100}%` }} />
      </div>
      {SECTIONS.map((s) => {
        const isActive = s.id === activeId;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="relative flex items-center gap-3 py-[7px] group"
            onClick={(e) => {
              e.preventDefault();
              if (s.id === "intro") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <span
              className="relative z-10 w-[11px] h-[11px] rounded-full border flex-shrink-0 transition-all duration-200"
              style={{
                borderColor: isActive ? "var(--c-fg)" : "var(--c-border-strong)",
                backgroundColor: isActive ? "var(--c-fg)" : "transparent",
                transform: isActive ? "scale(1.15)" : "scale(1)",
              }}
            />
            <span
              className="text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-200"
              style={{
                color: isActive ? "var(--c-fg)" : "var(--c-faint)",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-4px)",
              }}
            >
              {labels[s.id]}
            </span>
            {!isActive && (
              <span className="absolute left-8 text-[10px] font-medium tracking-wide whitespace-nowrap text-[var(--c-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                {labels[s.id]}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

/* ── Section label ───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="text-3xl font-bold text-[var(--c-fg)] tracking-tight leading-snug">
        {children}
      </h2>
      <AnimatedLine className="mt-3" delay={0} />
    </div>
  );
}

function ContentBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="mb-12">{children}</div>
    </FadeUp>
  );
}

function ArchCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-4 transition-all duration-200 hover:border-[var(--c-border-strong)] hover:bg-[var(--c-surface-2)] hover:shadow-[0_0_0_1px_var(--c-border-strong)] cursor-default">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-[var(--c-muted)] group-hover:text-[var(--c-fg)] flex items-center transition-colors duration-200">
          {icon}
        </span>
        <span className="text-sm font-medium text-[var(--c-fg)]">{title}</span>
      </div>
      <p className="text-sm text-[var(--c-muted)] group-hover:text-[var(--c-soft)] leading-relaxed transition-colors duration-200">
        {description}
      </p>
    </div>
  );
}

function ImagePlaceholder({ label, aspectClass = "aspect-video" }: { label: string; aspectClass?: string }) {
  return (
    <div className={`w-full ${aspectClass} rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col items-center justify-center gap-2`}>
      <Image size={18} className="text-[var(--c-faint)]" />
      <span className="text-xs text-[var(--c-faint)] font-mono">{label}</span>
    </div>
  );
}

function TechMarquee() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const doubled = [...techStack, ...techStack];
  const len = techStack.length;

  return (
    <div className="marquee-outer -mx-1">
      <div
        className="marquee-track"
        style={{ animationPlayState: hoveredIndex !== null ? "paused" : "running" }}
      >
        {doubled.map((label, i) => (
          <span
            key={i}
            className="mx-1.5 shrink-0"
            style={{
              opacity: hoveredIndex === null ? 1 : i % len === hoveredIndex % len ? 1 : 0.35,
              transform: hoveredIndex !== null && i % len === hoveredIndex % len ? "scale(1.06)" : "scale(1)",
              transition: "opacity 150ms ease, transform 150ms ease",
            }}
            onMouseEnter={() => setHoveredIndex(i % len)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <TechBadge label={label} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Scroll-triggered outcomes list ─────────────────────────── */
function OutcomesList({ items }: { items: string[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.07 }}
          className="flex items-start gap-2.5"
        >
          <CheckCircle2 size={13} className="text-[#34d399] mt-0.5 shrink-0" />
          <span className="text-sm text-[var(--c-soft)] leading-relaxed">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function ProjectVoiceFlow() {
  const { tr } = usePortfolio();
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navLabels: Record<string, string> = {
    "intro":        "VoiceFlow",
    "problem":      tr.voiceFlowLabel_problem,
    "insight":      tr.voiceFlowLabel_insight,
    "how-it-works": tr.voiceFlowLabel_howItWorks,
    "architecture": tr.voiceFlowLabel_architecture,
    "tech-stack":   tr.voiceFlowLabel_techStack,
    "outcomes":     tr.voiceFlowLabel_outcomes,
    "learnings":    tr.voiceFlowLabel_learnings,
  };

  const relatedProjects = [
    { name: "LLM Academic Wiki", desc: tr.proj_llmWikiDesc, href: "/projects/llm-academic-wiki" },
    { name: "Enterprise RAG System", desc: tr.proj1Desc, href: "/projects/rag-system" },
  ];

  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Layout>
      <ReadingNav activeId={activeId} labels={navLabels} />

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
        <FadeUp delay={0.04}>
          <div id="intro" className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <h1 className="text-3xl font-bold text-[var(--c-fg)] leading-tight tracking-tight">
                VoiceFlow
              </h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] whitespace-nowrap mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0" />
                {tr.voiceFlowHero_badge}
              </span>
            </div>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed mb-5">
              {tr.voiceFlowHero_tagline}
            </p>
            <ImagePlaceholder label="project screenshot / demo" />
          </div>
        </FadeUp>

        {/* TL;DR card */}
        <FadeUp delay={0.07}>
          <div className="mb-8 rounded-lg border border-[var(--c-border)] border-l-[3px] border-l-[#34d399] bg-[var(--c-surface-2)] p-5">
            <div className="flex items-start justify-between gap-5 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-muted)] mb-3">
                  {tr.voiceFlowTldr_heading}
                </p>
                <ul className="space-y-2">
                  {[tr.voiceFlowTldr_b1, tr.voiceFlowTldr_b2, tr.voiceFlowTldr_b3].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--c-soft)] leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-[#34d399] shrink-0 mt-[0.55em]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md border border-[var(--c-border)] bg-[var(--c-surface-2)] text-[var(--c-fg)] hover:bg-[var(--c-surface-3)] hover:border-[var(--c-border-strong)] transition-all duration-150 whitespace-nowrap shrink-0 self-start"
              >
                <GithubGlyph size={13} />
                {tr.voiceFlowCta_btn}
              </a>
            </div>
          </div>
        </FadeUp>

        {/* The Problem */}
        <div id="problem">
          <ContentBlock delay={0.08}>
            <SectionLabel>{tr.voiceFlowLabel_problem}</SectionLabel>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>{tr.voiceFlowProblem_p1}</p>
              <p>{tr.voiceFlowProblem_p2}</p>
              <p>{tr.voiceFlowProblem_p3}</p>
            </div>
          </ContentBlock>
        </div>

        {/* The Insight */}
        <div id="insight">
          <ContentBlock delay={0.12}>
            <SectionLabel>{tr.voiceFlowLabel_insight}</SectionLabel>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>{tr.voiceFlowInsight_p1}</p>
              <p>{tr.voiceFlowInsight_p2}</p>
              <p>{tr.voiceFlowInsight_p3}</p>
            </div>
          </ContentBlock>
        </div>

        {/* How It Works */}
        <div id="how-it-works">
          <ContentBlock delay={0.16}>
            <SectionLabel>{tr.voiceFlowLabel_howItWorks}</SectionLabel>
            <div className="mb-5">
              <ImagePlaceholder label="system architecture diagram" aspectClass="aspect-[16/7]" />
            </div>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>{tr.voiceFlowHowItWorks_p1}</p>
              <p>
                {tr.voiceFlowHowItWorks_p2a}
                <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">sounddevice</code>
                {tr.voiceFlowHowItWorks_p2b}
              </p>
              <p>{tr.voiceFlowHowItWorks_p3}</p>
            </div>
          </ContentBlock>
        </div>

        {/* Architecture Highlights */}
        <div id="architecture">
          <ContentBlock delay={0.20}>
            <SectionLabel>{tr.voiceFlowLabel_architecture}</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ArchCard icon={<Cpu size={14} />}       title={tr.voiceFlowArch_1_title} description={tr.voiceFlowArch_1_desc} />
              <ArchCard icon={<Shield size={14} />}    title={tr.voiceFlowArch_2_title} description={tr.voiceFlowArch_2_desc} />
              <ArchCard icon={<Layers size={14} />}    title={tr.voiceFlowArch_3_title} description={tr.voiceFlowArch_3_desc} />
              <ArchCard icon={<GitBranch size={14} />} title={tr.voiceFlowArch_4_title} description={tr.voiceFlowArch_4_desc} />
            </div>
          </ContentBlock>
        </div>

        {/* Tech Stack */}
        <div id="tech-stack">
          <ContentBlock delay={0.24}>
            <SectionLabel>{tr.voiceFlowLabel_techStack}</SectionLabel>
            <div className="py-10">
              <TechMarquee />
            </div>
          </ContentBlock>
        </div>

        {/* Outcomes */}
        <div id="outcomes">
          <ContentBlock delay={0.28}>
            <SectionLabel>{tr.voiceFlowLabel_outcomes}</SectionLabel>
            <OutcomesList items={[
              tr.voiceFlowOutcome_1,
              tr.voiceFlowOutcome_2,
              tr.voiceFlowOutcome_3,
              tr.voiceFlowOutcome_4,
              tr.voiceFlowOutcome_5,
              tr.voiceFlowOutcome_6,
            ]} />
          </ContentBlock>
        </div>

        {/* What I Learned */}
        <div id="learnings">
          <ContentBlock delay={0.32}>
            <SectionLabel>{tr.voiceFlowLabel_learnings}</SectionLabel>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>{tr.voiceFlowLearnings_p1}</p>
              <p>{tr.voiceFlowLearnings_p2}</p>
              <p>{tr.voiceFlowLearnings_p3}</p>
              <p>{tr.voiceFlowLearnings_p4}</p>
            </div>
          </ContentBlock>
        </div>

        {/* GitHub CTA */}
        <FadeUp delay={0.36}>
          <div className="border border-[var(--c-border)] rounded-lg p-5 flex items-center justify-between gap-4 bg-[var(--c-surface)]">
            <div>
              <p className="text-sm font-medium text-[var(--c-fg)] mb-0.5">{tr.voiceFlowCta_title}</p>
              <p className="text-xs text-[var(--c-muted)]">{tr.voiceFlowCta_desc}</p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md border border-[var(--c-border)] bg-[var(--c-surface-2)] text-[var(--c-fg)] hover:bg-[var(--c-surface-3)] hover:border-[var(--c-border-strong)] transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <GithubGlyph size={13} />
              {tr.voiceFlowCta_btn}
            </a>
          </div>
        </FadeUp>

        {/* Related Projects */}
        <FadeUp delay={0.40}>
          <div className="mt-12 pt-8 border-t border-[var(--c-border)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-muted)] mb-4">
              {tr.voiceFlowRelated_heading}
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
