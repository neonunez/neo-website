import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, GitBranch, Layers, Database, Zap, CheckCircle2, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge } from "@/components/shared";

const techStack = [
  "Next.js",
  "FastAPI",
  "LangGraph",
  "LlamaIndex",
  "Supabase",
  "Gemini Flash",
  "Python",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)] mb-4">
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

function ArchCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
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

export default function ProjectRagSystem() {
  return (
    <Layout>
      <div className="py-6">

        {/* Back nav */}
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

        {/* Hero */}
        <FadeUp delay={0.04}>
          <div className="mb-10">
            <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <h1 className="text-xl font-semibold text-[var(--c-fg)] leading-tight">
                Enterprise RAG System
              </h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] whitespace-nowrap">
                <Clock size={10} className="text-[#fb923c]" />
                In development
              </span>
            </div>
            <p className="text-[var(--c-muted)] text-sm leading-relaxed">
              A production-grade Retrieval-Augmented Generation system built for employee onboarding,
              surfacing accurate answers from Oracle EPM documentation through a natural language interface.
            </p>
          </div>
        </FadeUp>

        {/* Divider */}
        <div className="border-t border-[var(--c-border-thin)] mb-10" />

        {/* Problem */}
        <ContentBlock delay={0.08}>
          <SectionLabel>Problem</SectionLabel>
          <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
            <p>
              Onboarding engineers to Oracle EPM environments is slow and costly. Documentation
              is sprawling, version-fragmented, and hard to search — new hires routinely spend days
              hunting down answers that a senior engineer would know in seconds.
            </p>
            <p>
              The business needed a way to encode that institutional knowledge and serve it
              reliably at scale, without requiring constant human intervention or expensive
              fine-tuning on proprietary models.
            </p>
          </div>
        </ContentBlock>

        {/* Approach */}
        <ContentBlock delay={0.12}>
          <SectionLabel>Approach</SectionLabel>
          <div className="space-y-3 text-sm leading-[1.85] text-[var(--c-soft)]">
            <p>
              The system follows a classic RAG architecture: ingest, embed, retrieve, and
              generate — but with several production-specific additions to improve faithfulness
              and reduce hallucinations.
            </p>
            <p>
              Documentation is chunked, embedded, and stored in a Supabase vector store with
              rich metadata so the retrieval step can filter by document type, product version,
              and topic area. Queries go through a LangGraph agent that decides whether to retrieve,
              clarify, or escalate — rather than blindly generating against raw context.
            </p>
            <p>
              LlamaIndex handles the document ingestion and indexing pipeline, keeping
              the retrieval layer decoupled from the generation layer and easy to update
              when documentation changes.
            </p>
          </div>
        </ContentBlock>

        {/* Architecture */}
        <ContentBlock delay={0.16}>
          <SectionLabel>Architecture highlights</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ArchCard
              icon={<Database size={14} />}
              title="Vector store"
              description="Supabase pgvector with metadata filtering. Documents are chunked with overlap and tagged by product, version, and module."
            />
            <ArchCard
              icon={<GitBranch size={14} />}
              title="Agent graph"
              description="LangGraph orchestrates the query flow — routing between direct retrieval, clarification prompts, and graceful fallbacks."
            />
            <ArchCard
              icon={<Layers size={14} />}
              title="Indexing pipeline"
              description="LlamaIndex ingestion pipeline with incremental refresh — only changed documents are re-embedded on each update cycle."
            />
            <ArchCard
              icon={<Zap size={14} />}
              title="Generation"
              description="Gemini Flash for latency-sensitive chat responses, with structured prompting that grounds answers in retrieved passages."
            />
          </div>
        </ContentBlock>

        {/* Tech stack */}
        <ContentBlock delay={0.20}>
          <SectionLabel>Tech stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {techStack.map((label) => (
              <TechBadge key={label} label={label} />
            ))}
          </div>
        </ContentBlock>

        {/* Outcomes */}
        <ContentBlock delay={0.24}>
          <SectionLabel>Outcomes &amp; status</SectionLabel>
          <div className="space-y-2.5">
            {[
              "End-to-end RAG pipeline implemented — ingestion, embedding, retrieval, and generation.",
              "LangGraph agent with multi-step reasoning reduces irrelevant retrievals.",
              "Supabase vector store with metadata filtering in place.",
              "Next.js chat interface with streaming responses connected to FastAPI backend.",
              "Actively iterating on reranking and context compression to improve answer quality.",
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
