import { useEffect } from "react";
import {
  Building2,
  BrainCircuit,
  Mic,
  LayoutGrid,
  GraduationCap,
} from "lucide-react";

type BadgeProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function Badge({ icon, children }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md border border-white/[0.08] bg-white/[0.04] text-[#e4e4e7] align-middle leading-none font-medium whitespace-nowrap">
      <span className="flex items-center opacity-90">{icon}</span>
      {children}
    </span>
  );
}

type FlagBadgeProps = {
  flag: string;
  label: string;
};

function FlagBadge({ flag, label }: FlagBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md border border-white/[0.08] bg-white/[0.04] text-[#e4e4e7] align-middle leading-none font-medium whitespace-nowrap">
      <span className="text-sm leading-none">{flag}</span>
      {label}
    </span>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-[#888] hover:text-[#e4e4e7] transition-colors duration-150 text-sm"
    >
      {children}
    </a>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#888] hover:text-[#e4e4e7] transition-colors duration-150 text-sm"
    >
      {children}
    </a>
  );
}

function Divider() {
  return <div className="border-t border-white/[0.06] my-10" />;
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.title = "Neo Nuñez — AI Engineer";
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#e4e4e7] antialiased">

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between max-w-[900px] mx-auto">
        <a href="/" className="font-mono text-sm text-[#e4e4e7] opacity-80 hover:opacity-100 tracking-tight">
          nn_
        </a>
        <div className="flex items-center gap-6">
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <a
            href="https://github.com/neo-nunez"
            target="_blank"
            rel="noreferrer"
            className="text-[#888] hover:text-[#e4e4e7] transition-colors"
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/neo-nunez"
            target="_blank"
            rel="noreferrer"
            className="text-[#888] hover:text-[#e4e4e7] transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-24 pb-24 px-8 max-w-[640px] mx-auto">

        {/* Name */}
        <h1 className="text-2xl font-semibold text-[#e4e4e7] mb-3">
          Neo Nuñez
        </h1>

        {/* Tagline */}
        <p className="text-[#888] text-sm leading-relaxed mb-6">
          Hey! I'm Neo, an AI Engineer and Oracle Data Integration Developer based in Buenos Aires.
        </p>

        {/* Status lines */}
        <div className="space-y-2.5 text-sm leading-relaxed mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#888]">Working at</span>
            <Badge icon={<Building2 size={11} className="text-[#60a5fa]" />}>Apply Latam</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#888]">Building</span>
            <Badge icon={<BrainCircuit size={11} className="text-[#a78bfa]" />}>Enterprise RAG System</Badge>
            <Badge icon={<Mic size={11} className="text-[#34d399]" />}>VoiceFlow</Badge>
            <Badge icon={<LayoutGrid size={11} className="text-[#fb923c]" />}>FocusPad</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#888]">Studying at</span>
            <Badge icon={<GraduationCap size={11} className="text-[#f472b6]" />}>UBA — Computer Science</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#888]">Fluent in</span>
            <FlagBadge flag="🇦🇷" label="Spanish" />
            <FlagBadge flag="🇬🇧" label="English" />
            <FlagBadge flag="🇫🇷" label="French" />
            <FlagBadge flag="🇩🇪" label="German" />
            <FlagBadge flag="🇮🇹" label="Italian" />
            <FlagBadge flag="🇧🇷" label="Portuguese" />
          </div>
        </div>

        {/* Bio paragraphs */}
        <div className="space-y-4 text-sm leading-[1.85] text-[#aaa]">
          <p>
            I have a deep interest in building production-grade AI systems — RAG pipelines, LLM orchestration,
            and automation tools. I enjoy bridging the gap between complex data architectures and cutting-edge
            AI methods. You can find my open-source work on{" "}
            <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer" className="text-[#e4e4e7] underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors">
              github.com/neo-nunez
            </a>
            .
          </p>
          <p>
            Outside of coding, I find that speaking six languages has shaped how I think about structure,
            pattern recognition, and ambiguity — skills that transfer directly to systems design. I'm deeply
            interested in software architecture, personal productivity, open-source tooling, and economics.
          </p>
          <p>
            Currently seeking an AI Engineering role where I can design, build, and ship intelligent systems
            that solve real-world problems. If you're around Buenos Aires or working remotely,{" "}
            <a href="mailto:neonunez129@gmail.com" className="text-[#e4e4e7] underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors">
              reach out
            </a>
            .
          </p>
        </div>

        <Divider />

        {/* Experience */}
        <section id="experience">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">Experience</h2>

          <div className="space-y-8">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[#e4e4e7]">Oracle Data Integration Developer</h3>
                <span className="text-xs text-[#555] whitespace-nowrap">2025 — Present</span>
              </div>
              <p className="text-xs text-[#666] mb-3">Apply Latam · Buenos Aires</p>
              <ul className="space-y-1.5 text-sm text-[#888] leading-relaxed">
                <li>Designed and maintained end-to-end data integration pipelines for enterprise clients.</li>
                <li>Built advanced transformation logic and dynamic workflow automation in Oracle Data Integrator using Groovy.</li>
                <li>Extended platform capabilities and orchestrated complex integration scenarios with Jython scripting.</li>
                <li>Collaborated cross-functionally to model data mappings and deliver robust integration solutions.</li>
              </ul>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[#e4e4e7]">Enterprise Technical Support — Intern</h3>
                <span className="text-xs text-[#555] whitespace-nowrap">2024 — 2025</span>
              </div>
              <p className="text-xs text-[#666] mb-3">Apply Latam · Buenos Aires</p>
              <ul className="space-y-1.5 text-sm text-[#888] leading-relaxed">
                <li>Provided technical support for Oracle Enterprise Planning Services across multiple clients.</li>
                <li>Resolved service issues and managed server maintenance, reducing client downtime.</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* Projects */}
        <section id="projects">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">Projects</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[#e4e4e7]">Enterprise RAG System</h3>
                <a
                  href="https://github.com/neo-nunez"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#555] hover:text-[#888] transition-colors"
                >
                  In development
                </a>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-2">
                Production-grade Retrieval-Augmented Generation system for employee onboarding with Oracle EPM documentation.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge color="#60a5fa">Next.js</Badge>
                <Badge color="#60a5fa">FastAPI</Badge>
                <Badge color="#a78bfa">LangGraph</Badge>
                <Badge color="#a78bfa">LlamaIndex</Badge>
                <Badge color="#34d399">Supabase</Badge>
                <Badge color="#fb923c">Gemini Flash</Badge>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[#e4e4e7]">VoiceFlow</h3>
                <a
                  href="https://github.com/neo-nunez"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#555] hover:text-[#888] transition-colors"
                >
                  In development
                </a>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-2">
                macOS menu bar speech-to-text app. A self-hosted alternative to Wispr Flow running local models via MLX.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge color="#60a5fa">Python</Badge>
                <Badge color="#a78bfa">mlx-whisper</Badge>
                <Badge color="#34d399">pyobjc</Badge>
                <Badge color="#34d399">rumps</Badge>
                <Badge color="#fb923c">pywebview</Badge>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-[#e4e4e7]">FocusPad</h3>
                <a
                  href="https://github.com/neo-nunez"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#555] hover:text-[#888] transition-colors"
                >
                  In development
                </a>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-2">
                Personal iOS productivity app — reminders, notes, tasks, calendar, planner, and habit tracker.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge color="#60a5fa">React Native</Badge>
                <Badge color="#34d399">Expo</Badge>
                <Badge color="#e4e4e7">TypeScript</Badge>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Skills */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">Technical Skills</h2>
          <div className="space-y-3 text-sm text-[#888]">
            <div className="flex gap-2 flex-wrap items-baseline">
              <span className="text-[#555] text-xs w-28 shrink-0">Languages</span>
              <span>Python · JavaScript · Groovy · Jython · SQL · HTML · CSS</span>
            </div>
            <div className="flex gap-2 flex-wrap items-baseline">
              <span className="text-[#555] text-xs w-28 shrink-0">AI / ML</span>
              <span>LangGraph · LlamaIndex · RAG · LLM orchestration · Gemini · Ollama · mlx-whisper · prompt engineering</span>
            </div>
            <div className="flex gap-2 flex-wrap items-baseline">
              <span className="text-[#555] text-xs w-28 shrink-0">Frameworks</span>
              <span>FastAPI · Next.js · React Native (Expo)</span>
            </div>
            <div className="flex gap-2 flex-wrap items-baseline">
              <span className="text-[#555] text-xs w-28 shrink-0">Data</span>
              <span>Oracle ODI · ETL/ELT pipeline design · Supabase · data warehousing</span>
            </div>
            <div className="flex gap-2 flex-wrap items-baseline">
              <span className="text-[#555] text-xs w-28 shrink-0">Tools</span>
              <span>Git · Docker · Cursor · Google Workspace</span>
            </div>
            <div className="flex gap-2 flex-wrap items-baseline">
              <span className="text-[#555] text-xs w-28 shrink-0">Learning</span>
              <span>ML fundamentals · neural networks · fine-tuning · reinforcement learning</span>
            </div>
          </div>
        </section>

        <Divider />

        {/* Languages */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">Languages</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-[#888]">
            <div className="flex justify-between">
              <span>Spanish</span>
              <span className="text-[#555] text-xs">Native</span>
            </div>
            <div className="flex justify-between">
              <span>Portuguese</span>
              <span className="text-[#555] text-xs">Native-level</span>
            </div>
            <div className="flex justify-between">
              <span>English</span>
              <span className="text-[#555] text-xs">C1 · Cambridge</span>
            </div>
            <div className="flex justify-between">
              <span>French</span>
              <span className="text-[#555] text-xs">B2 · Alliance Française</span>
            </div>
            <div className="flex justify-between">
              <span>German</span>
              <span className="text-[#555] text-xs">B2 · Goethe Institut</span>
            </div>
            <div className="flex justify-between">
              <span>Italian</span>
              <span className="text-[#555] text-xs">B1 · Dante Alighieri</span>
            </div>
          </div>
        </section>

        <Divider />

        {/* Contact */}
        <section id="contact">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-5">Find me on</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
            <SocialLink href="https://github.com/neo-nunez">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/neo-nunez">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </SocialLink>
          </div>
          <p className="text-sm text-[#888]">
            Or mail me at{" "}
            <a
              href="mailto:neonunez129@gmail.com"
              className="text-[#e4e4e7] underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
            >
              neonunez129@gmail.com
            </a>
          </p>
        </section>

      </main>
    </div>
  );
}
