import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp, HoverRow, TechBadge } from "@/components/shared";

export default function Projects() {
  const { tr } = usePortfolio();

  const projects = [
    {
      name: "llm-academic-wiki",
      desc: "Open source project. Details coming soon.",
      tags: ["Python", "LLMs", "RAG"],
      detailHref: "/projects/llm-academic-wiki",
    },
    {
      name: "llm-server",
      desc: "Open source project. Details coming soon.",
      tags: ["FastAPI", "Python", "LLMs"],
      detailHref: "/projects/llm-server",
    },
    {
      name: "VoiceFlow",
      desc: tr.proj2Desc,
      tags: ["Python", "mlx-whisper", "pyobjc", "rumps", "pywebview"],
      detailHref: "/projects/voiceflow",
    },
    {
      name: "Enterprise RAG System",
      desc: tr.proj1Desc,
      tags: ["Next.js", "FastAPI", "LangGraph", "LlamaIndex", "Supabase", "Gemini Flash"],
      detailHref: "/projects/rag-system",
    },
    {
      name: "FocusPad",
      desc: tr.proj3Desc,
      tags: ["React Native", "Expo", "TypeScript"],
      detailHref: "/projects/focuspad",
    },
  ];

  return (
    <Layout>
      <section className="py-6">
        <FadeUp>
          <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-6">
            {tr.sectionProjects}
          </h2>
        </FadeUp>
        <div className="space-y-4">
          {projects.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.06}>
              {p.detailHref ? (
                <Link href={p.detailHref} className="block group">
                  <HoverRow>
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="text-sm font-medium text-[var(--c-fg)] flex items-center gap-1">
                        {p.name}
                        <ChevronRight
                          size={12}
                          className="text-[var(--c-faint)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 -mb-px"
                        />
                      </h3>
                      <span className="text-xs text-[var(--c-faint)] whitespace-nowrap">
                        {tr.inDevelopment}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--c-muted)] leading-relaxed mb-2">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((label) => <TechBadge key={label} label={label} />)}
                    </div>
                  </HoverRow>
                </Link>
              ) : (
                <HoverRow>
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="text-sm font-medium text-[var(--c-fg)]">{p.name}</h3>
                    <a
                      href="https://github.com/neo-nunez"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[var(--c-faint)] hover:text-[var(--c-muted)] transition-colors whitespace-nowrap"
                    >
                      {tr.inDevelopment}
                    </a>
                  </div>
                  <p className="text-sm text-[var(--c-muted)] leading-relaxed mb-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((label) => <TechBadge key={label} label={label} />)}
                  </div>
                </HoverRow>
              )}
            </FadeUp>
          ))}
        </div>
      </section>
    </Layout>
  );
}
