import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, GitBranch, Layers, Zap, CheckCircle2,
  Terminal, Image, ExternalLink,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge, AnimatedLine } from "@/components/shared";

const techStack = [
  "Python", "Claude Code", "Obsidian", "Git", "Markdown", "Bash", "YAML", "pdftotext",
];

const SECTIONS = [
  { id: "problem",       label: "The Problem" },
  { id: "insight",       label: "The Insight" },
  { id: "how-it-works",  label: "How It Works" },
  { id: "architecture",  label: "Architecture" },
  { id: "tech-stack",    label: "Tech Stack" },
  { id: "outcomes",      label: "Outcomes" },
  { id: "learnings",     label: "What I Learned" },
];

/* ── Reading-progress nav (right side, xl+) ─────────────────── */
function ReadingNav({ activeId }: { activeId: string }) {
  return (
    <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-0 select-none">
      {/* Vertical spine */}
      <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[var(--c-border)]" />
      {SECTIONS.map((s) => {
        const isActive = s.id === activeId;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="relative flex items-center gap-3 py-[7px] group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {/* Dot */}
            <span
              className="relative z-10 w-[11px] h-[11px] rounded-full border flex-shrink-0 transition-all duration-200"
              style={{
                borderColor: isActive ? "var(--c-fg)" : "var(--c-border-strong)",
                backgroundColor: isActive ? "var(--c-fg)" : "transparent",
                transform: isActive ? "scale(1.15)" : "scale(1)",
              }}
            />
            {/* Label */}
            <span
              className="text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-200"
              style={{
                color: isActive ? "var(--c-fg)" : "var(--c-faint)",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-4px)",
              }}
            >
              {s.label}
            </span>
            {/* Hover label (for non-active) */}
            {!isActive && (
              <span className="absolute left-8 text-[10px] font-medium tracking-wide whitespace-nowrap text-[var(--c-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                {s.label}
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
    <div className="flex items-center gap-3 mb-5">
      <span className="w-4 h-px bg-[var(--c-line)] shrink-0" />
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--c-fg)]">
        {children}
      </h2>
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

/* ── Page ────────────────────────────────────────────────────── */
export default function ProjectLlmAcademicWiki() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Layout>
      <ReadingNav activeId={activeId} />

      <div className="py-6">

        {/* Back nav */}
        <FadeUp delay={0}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--c-faint)] hover:text-[var(--c-muted)] transition-colors mb-8 group"
          >
            <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Projects
          </Link>
        </FadeUp>

        {/* Hero */}
        <FadeUp delay={0.04}>
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <h1 className="text-3xl font-bold text-[var(--c-fg)] leading-tight tracking-tight">
                LLM Academic Wiki
              </h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] whitespace-nowrap mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0" />
                Open Source
              </span>
            </div>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed mb-5">
              A personal knowledge system that uses Claude Code as the librarian —
              so I can focus on actually learning.
            </p>
            <ImagePlaceholder label="project screenshot / demo" />
          </div>
        </FadeUp>

        <AnimatedLine className="mb-10" />

        {/* The Problem */}
        <div id="problem">
          <ContentBlock delay={0.08}>
            <SectionLabel>The Problem</SectionLabel>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>
                Every university course dumps the same amount of material on you: lectures, practice guides,
                past exams, community summaries. By the end of a semester, you're sitting on 50+ PDFs with
                no unified way to navigate them, search across them, or understand how they relate to each other.
              </p>
              <p>
                The naive fix — dumping everything into a chat window — doesn't scale. You burn tokens,
                lose structure, and the model forgets what it read three PDFs ago. There had to be a better way.
              </p>
              <p>
                What I actually needed was a system that understood <em>how I study</em>: exams are the north star,
                practice guides are the training ground, and lectures are the reference. None of the off-the-shelf
                tools (Notion, Anki, even manual Obsidian) understood that hierarchy.
              </p>
            </div>
          </ContentBlock>
        </div>

        {/* The Insight */}
        <div id="insight">
          <ContentBlock delay={0.12}>
            <SectionLabel>The Insight</SectionLabel>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>
                Inspired by Andrej Karpathy's "LLM Wiki" idea, I landed on a simple but powerful reframe:
                instead of using the LLM as an oracle, use it as a <strong className="text-[var(--c-fg)] font-medium">maintainer</strong>.
                Claude Code does the boring work — parsing PDFs, creating structured pages, cross-referencing exercises,
                updating the log. I do the learning.
              </p>
              <p>
                The result: a parse-once, query-many architecture. Every PDF is processed exactly one time
                and stored as structured Markdown in an Obsidian vault. From that point on, all queries
                work against clean, well-organized text — never against raw PDFs again.
              </p>
              <p>
                And the most important design decision: <strong className="text-[var(--c-fg)] font-medium">ingest exams first</strong>.
                Everything else (lectures, guides) is cross-referenced against them. That way, when you study
                a topic, you already know which exercises appeared in which exams and how often.
              </p>
            </div>
          </ContentBlock>
        </div>

        {/* How It Works */}
        <div id="how-it-works">
          <ContentBlock delay={0.16}>
            <SectionLabel>How It Works</SectionLabel>
            <div className="mb-5">
              <ImagePlaceholder label="system architecture diagram" aspectClass="aspect-[16/7]" />
            </div>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>
                Each university subject gets its own isolated folder with a consistent structure: raw PDFs go in,
                Markdown wiki pages come out. The system supports <strong className="text-[var(--c-fg)] font-medium">7 distinct page types</strong> —
                theory extractions, practice sessions, guide exercises, analyzed exams, handwritten transcriptions,
                exercise-type pattern pages, and synthesis notes.
              </p>
              <p>
                PDF extraction uses a dual strategy: <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">pdftotext</code> handles
                LaTeX-compiled lecture slides fast and reliably. When it returns less than 500 characters on a
                multi-page document — a reliable signal for scanned or handwritten content — it falls back to
                Claude's vision capabilities. One command handles both cases transparently.
              </p>
              <p>
                The whole lifecycle is driven by <strong className="text-[var(--c-fg)] font-medium">11 slash commands</strong> defined
                as Markdown files in <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">.claude/commands/</code>.
                They're version-controlled, readable, and easy to customize.{" "}
                <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">/ingestar</code> parses a PDF,{" "}
                <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">/resolver</code> works through pending exercises,{" "}
                <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">/simular</code> generates exam-style practice problems,
                and <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">/chuleta</code> assembles a consolidated cheat sheet on any topic.
              </p>
            </div>
          </ContentBlock>
        </div>

        {/* Architecture Highlights */}
        <div id="architecture">
          <ContentBlock delay={0.20}>
            <SectionLabel>Architecture highlights</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ArchCard
                icon={<Zap size={14} />}
                title="Dual parse pipeline"
                description="pdftotext for LaTeX slides (fast, exact). Claude vision as automatic fallback for scanned exams and handwritten content — triggered by a <500 char heuristic."
              />
              <ArchCard
                icon={<Layers size={14} />}
                title="7-type page taxonomy"
                description="Every page has a type, YAML frontmatter, and Obsidian cross-links. Content is structured for LLM retrieval first, human navigation second."
              />
              <ArchCard
                icon={<Terminal size={14} />}
                title="11 slash commands"
                description="Full study lifecycle in code: ingest, resolve, lint, simulate, cheat-sheet. Each command is a Markdown file — readable, version-controlled, customizable."
              />
              <ArchCard
                icon={<GitBranch size={14} />}
                title="Exam-first design"
                description="Past exams are ingested before anything else. Every exercise in lectures and guides is then flagged with its exam appearances, so patterns emerge naturally."
              />
            </div>
          </ContentBlock>
        </div>

        {/* Tech Stack */}
        <div id="tech-stack">
          <ContentBlock delay={0.24}>
            <SectionLabel>Tech stack</SectionLabel>
            <TechMarquee />
          </ContentBlock>
        </div>

        {/* Outcomes */}
        <div id="outcomes">
          <ContentBlock delay={0.28}>
            <SectionLabel>Outcomes &amp; status</SectionLabel>
            <div className="space-y-2.5">
              {[
                "51 PDFs processed — 36+ structured wiki pages generated across 10 algorithm topics.",
                "13 exercise-type pattern pages capturing recurring exam structures (Master Theorem, exchange-argument proofs, flow modeling, etc.).",
                "6 past exams fully analyzed with solutions, explanations, and cross-references.",
                "11 slash commands covering the full study lifecycle, from raw PDF to exam simulation.",
                "Pilot subject (Algorithms & Data Structures III) at 88% completion.",
                "Architecture is fully reusable — adding a new subject is one new folder.",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.28 + i * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 size={13} className="text-[#34d399] mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--c-soft)] leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </ContentBlock>
        </div>

        {/* What I Learned */}
        <div id="learnings">
          <ContentBlock delay={0.32}>
            <SectionLabel>What I learned</SectionLabel>
            <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
              <p>
                The biggest shift was learning to <strong className="text-[var(--c-fg)] font-medium">design for LLM retrieval, not human browsing</strong>.
                A well-structured wiki page isn't the same as a readable article. Focused, narrow pages
                with explicit metadata outperform monolithic documents — even when the monolith "reads" better.
              </p>
              <p>
                I also learned the value of <strong className="text-[var(--c-fg)] font-medium">separating phases of work</strong>.
                Ingestion (parse, structure, link) and resolution (think, solve, synthesize) are cognitively
                different tasks. Mixing them in one session leads to shallow output on both. The two-phase
                guide workflow — ingest first, solve separately — produced dramatically better results.
              </p>
              <p>
                Building slash commands as Markdown files taught me something about automation philosophy:
                the best automations are the ones you can read, edit, and understand without running them first.
                Treating commands as documentation meant they improved over time instead of becoming black boxes.
              </p>
              <p>
                And finally — immutability matters. Never editing source PDFs, always re-processing,
                always appending to the log: these constraints felt restrictive at first but made the system
                trustworthy. I always knew exactly what state everything was in.
              </p>
            </div>
          </ContentBlock>
        </div>

        {/* GitHub CTA */}
        <FadeUp delay={0.36}>
          <div className="border border-[var(--c-border)] rounded-lg p-5 flex items-center justify-between gap-4 bg-[var(--c-surface)]">
            <div>
              <p className="text-sm font-medium text-[var(--c-fg)] mb-0.5">View the source</p>
              <p className="text-xs text-[var(--c-muted)]">Full repo, slash commands, and CLAUDE.md on GitHub.</p>
            </div>
            <a
              href="https://github.com/neo-nunez/llm-academic-wiki"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md border border-[var(--c-border)] bg-[var(--c-surface-2)] text-[var(--c-fg)] hover:bg-[var(--c-surface-3)] hover:border-[var(--c-border-strong)] transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub ↗
            </a>
          </div>
        </FadeUp>

      </div>
    </Layout>
  );
}
