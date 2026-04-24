import { useRef, useState, useEffect, type MouseEvent as ReactMouseEvent } from "react";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  BrainCircuit,
  ChevronDown,
  ExternalLink,
  X,
  Database,
  Server,
  Cpu,
  Mic,
  FileText,
  Search,
  MessageSquare,
  Workflow,
  Box,
  Code2,
  Sliders,
  Repeat2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  SiNextdotjs,
  SiFastapi,
  SiSupabase,
  SiPython,
  SiReact,
  SiExpo,
  SiTypescript,
  SiApple,
  SiLangchain,
  SiGooglegemini,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiDocker,
  SiOllama,
  SiApachegroovy,
  SiGnubash,
  SiSvelte,
  SiVite,
  SiSqlite,
  SiNginx,
  SiCloudflare,
  SiPostgresql,
  SiMeta,
  SiDeepgram,
} from "react-icons/si";
import { LANGUAGES, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[13px] rounded-md border border-[var(--c-border-strong)] bg-[var(--c-surface)] text-[var(--c-fg)] align-middle leading-none font-medium whitespace-nowrap">
      <span className="flex items-center shrink-0 opacity-90">{icon}</span>
      {children}
    </span>
  );
}

// ─── FlagBadge ────────────────────────────────────────────────────────────────

export function FlagBadge({ flag, label, href }: { flag: string; label: string; href?: string }) {
  const content = (
    <Badge
      icon={
        <span className="text-[13px] leading-none select-none translate-y-px" aria-hidden>
          {flag}
        </span>
      }
    >
      {label}
    </Badge>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}

// ─── TechBadge ────────────────────────────────────────────────────────────────

export const TECH_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  // — already used across project pages —
  "Next.js":      { icon: SiNextdotjs,    color: "var(--c-fg)" },
  "FastAPI":      { icon: SiFastapi,      color: "#009688" },
  "LangGraph":    { icon: SiLangchain,    color: "#5eead4" },
  "LlamaIndex":   { icon: BrainCircuit,   color: "#a78bfa" },
  "Supabase":     { icon: SiSupabase,     color: "#3ECF8E" },
  "Gemini Flash": { icon: SiGooglegemini, color: "#4285F4" },
  "Gemini":       { icon: SiGooglegemini, color: "#4285F4" },
  "Python":       { icon: SiPython,       color: "#4b8bbe" },
  "pyobjc":       { icon: SiApple,        color: "#aaa"    },
  "rumps":        { icon: SiApple,        color: "#aaa"    },
  "pywebview":    { icon: SiPython,       color: "#4b8bbe" },
  "React Native": { icon: SiReact,        color: "#61DAFB" },
  "Expo":         { icon: SiExpo,         color: "var(--c-fg)" },
  "TypeScript":   { icon: SiTypescript,   color: "#3178C6" },
  "JavaScript":   { icon: SiJavascript,   color: "#F7DF1E" },
  "HTML":         { icon: SiHtml5,        color: "#E34F26" },
  "CSS":          { icon: SiCss,          color: "#1572B6" },
  "Git":          { icon: SiGit,          color: "#F05032" },
  "Docker":       { icon: SiDocker,       color: "#2496ED" },
  "Ollama":       { icon: SiOllama,       color: "var(--c-fg)" },

  // — Languages —
  "Groovy":       { icon: SiApachegroovy, color: "#4298B8" },
  "Jython":       { icon: SiPython,       color: "#4b8bbe" },
  "SQL":          { icon: Database,        color: "#64748b" },
  "Bash":         { icon: SiGnubash,      color: "#4EAA25" },

  // — AI / ML —
  "LangSmith":          { icon: SiLangchain,    color: "#5eead4" },
  "Docling":            { icon: FileText,        color: "#94a3b8" },
  "Groq":               { icon: Cpu,             color: "#f97316" },
  "Deepgram":           { icon: SiDeepgram,      color: "#7c3aed" },
  "AssemblyAI":         { icon: Mic,             color: "#6366f1" },
  "llama.cpp":          { icon: SiMeta,          color: "#0082FB" },
  "LLM orchestration":  { icon: BrainCircuit,    color: "#a78bfa" },
  "prompt engineering": { icon: MessageSquare,   color: "#94a3b8" },
  "RAG":                { icon: Search,          color: "#94a3b8" },

  // — Frameworks —
  "Svelte":   { icon: SiSvelte, color: "#FF3E00" },
  "Vite":     { icon: SiVite,   color: "#646CFF" },
  "Zustand":  { icon: Box,      color: "#94a3b8" },

  // — Data —
  "Oracle ODI":      { icon: Database,      color: "#F80000" },
  "ETL/ELT":         { icon: Workflow,      color: "#64748b" },
  "pgvector":        { icon: SiPostgresql,  color: "#336791" },
  "SQLite":          { icon: SiSqlite,      color: "#003B57" },
  "data warehousing":{ icon: Server,        color: "#64748b" },

  // — Tools —
  "Nginx":            { icon: SiNginx,      color: "#009639" },
  "Cloudflare":       { icon: SiCloudflare, color: "#F38020" },
  "Google Workspace": { icon: SiGooglegemini, color: "#4285F4" },
  "Cursor":           { icon: Code2,        color: "#94a3b8" },
  "Claude Code":      { icon: BrainCircuit, color: "#d97757" },

  // — Currently Learning —
  "ML fundamentals":       { icon: BrainCircuit, color: "#a78bfa" },
  "neural networks":       { icon: BrainCircuit, color: "#a78bfa" },
  "fine-tuning":           { icon: Sliders,      color: "#a78bfa" },
  "reinforcement learning":{ icon: Repeat2,      color: "#a78bfa" },
};

export function TechBadge({ label }: { label: string }) {
  const tech = TECH_ICONS[label];
  if (!tech) return <Badge icon={null}>{label}</Badge>;
  const Icon = tech.icon;
  return (
    <Badge icon={<Icon size={14} style={{ color: tech.color, flexShrink: 0 }} />}>
      {label}
    </Badge>
  );
}

// ─── GithubGlyph ──────────────────────────────────────────────────────────────

export function GithubGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

// ─── SocialLink ───────────────────────────────────────────────────────────────

export function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="link-anim inline-flex items-center gap-1.5 text-[var(--c-muted)] hover:text-[var(--c-fg)] text-sm pb-px">
      {children}
    </a>
  );
}

// ─── AnimatedLine ─────────────────────────────────────────────────────────────

export function AnimatedLine({ className = "", delay = 0.2 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={`h-[1px] bg-[var(--c-border-thin)] origin-left ${className}`}
    />
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider() {
  return <AnimatedLine className="my-10" />;
}

// ─── HoverRow ─────────────────────────────────────────────────────────────────

export function HoverRow({ children }: { children: React.ReactNode }) {
  const [touched, setTouched] = useState(false);
  const active = touched;
  return (
    <div
      className="-mx-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[var(--c-surface)]"
      style={{
        boxShadow: active ? "inset 2px 0 0 var(--c-border)" : "inset 0 0 0 0 transparent",
        backgroundColor: active ? "var(--c-surface)" : undefined,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "inset 2px 0 0 var(--c-border)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent")}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 400)}
      onTouchCancel={() => setTouched(false)}
    >
      {children}
    </div>
  );
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── LanguageSwitcher ─────────────────────────────────────────────────────────

export function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors text-xs font-medium px-2 py-1 rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] hover:bg-[var(--c-surface-3)]"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="uppercase tracking-wide">{current.code}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute right-0 top-full mt-1.5 w-36 rounded-lg border border-[var(--c-border)] bg-[var(--c-elevated)] shadow-xl overflow-hidden z-50"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs transition-colors ${
                lang === l.code
                  ? "bg-[var(--c-surface-3)] text-[var(--c-fg)]"
                  : "text-[var(--c-muted)] hover:bg-[var(--c-surface-2)] hover:text-[var(--c-fg)]"
              }`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <span className="text-sm shrink-0" aria-hidden>
                {l.flag}
              </span>
              <span className="font-medium">{l.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── CommandPalette ───────────────────────────────────────────────────────────

export type CmdItem = { label: string; icon: React.ReactNode; hint?: string; action: () => void };

export function CommandPalette({ items, open, onClose }: { items: CmdItem[]; open: boolean; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  idxRef.current = idx;

  useEffect(() => {
    if (!open) { setIdx(0); return; }
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => (i + 1) % items.length); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setIdx((i) => (i - 1 + items.length) % items.length); }
      if (e.key === "Enter")     { items[idxRef.current]?.action(); }
      if (e.key === "Escape")    { onClose(); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, items, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50" style={{ backdropFilter: "blur(4px)" }} />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[400px] mx-4 rounded-xl border border-[var(--c-border-strong)] bg-[var(--c-elevated-2)] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-3 pb-2 border-b border-[var(--c-border-thin)]">
              <p className="text-[10px] uppercase tracking-widest text-[var(--c-dim)] font-medium">Navigate</p>
            </div>
            <div className="py-1.5">
              {items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  onMouseEnter={() => setIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                    ${i === idx ? "bg-[var(--c-surface-2)] text-[var(--c-fg)]" : "text-[var(--c-muted)] hover:text-[var(--c-fg)]"}`}
                >
                  <span className="flex items-center opacity-60">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.hint && <span className="text-[10px] text-[var(--c-dim)] font-mono">{item.hint}</span>}
                </button>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-[var(--c-border-thin)] flex gap-4">
              <span className="text-[10px] text-[var(--c-deeper)]">↑↓ navigate</span>
              <span className="text-[10px] text-[var(--c-deeper)]">↵ select</span>
              <span className="text-[10px] text-[var(--c-deeper)]">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── AnimatedLogo ─────────────────────────────────────────────────────────────

export function AnimatedLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-baseline font-mono font-medium text-[1.125rem] tracking-tight opacity-90 hover:opacity-100 cursor-pointer transition-opacity ${className}`}>
      <motion.span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(90deg, var(--c-dim) 0%, var(--c-fg) 40%, var(--c-fg) 60%, var(--c-dim) 100%)",
          backgroundSize: "250% 100%",
          WebkitBackgroundClip: "text",
        }}
        animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        nn_
      </motion.span>
    </div>
  );
}

type ZoomableImageProps =
  | { src: string; alt: string; srcs?: undefined }
  | { srcs: Array<{ src: string; alt: string }>; src?: undefined; alt?: undefined };

export function ZoomableImage(props: ZoomableImageProps) {
  const slides = props.srcs ?? [{ src: props.src!, alt: props.alt! }];
  const hasMultiple = slides.length > 1;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (hasMultiple && e.key === "ArrowRight") next();
      else if (hasMultiple && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, hasMultiple, slides.length]);

  const ArrowButton = ({ side, onClick, inModal = false }: { side: "left" | "right"; onClick: (e: ReactMouseEvent) => void; inModal?: boolean }) => (
    <button
      type="button"
      aria-label={side === "left" ? "Previous image" : "Next image"}
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150",
        side === "left" ? "left-2" : "right-2",
        inModal
          ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white/80"
          : "bg-[var(--c-elevated)]/90 hover:bg-[var(--c-elevated)] border border-[var(--c-border)] text-[var(--c-fg)] backdrop-blur-sm",
      )}
    >
      {side === "left" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );

  const Dots = ({ inModal = false }: { inModal?: boolean }) => (
    <div className={cn(
      "absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2 py-1 rounded-full",
      inModal ? "bg-black/40 backdrop-blur-sm" : "bg-[var(--c-elevated)]/70 backdrop-blur-sm",
    )}>
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to image ${i + 1}`}
          onClick={(e) => { e.stopPropagation(); setIndex(i); }}
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-200",
            i === index
              ? inModal ? "bg-white w-4" : "bg-[var(--c-fg)] w-4"
              : inModal ? "bg-white/40 hover:bg-white/70" : "bg-[var(--c-muted)] hover:bg-[var(--c-fg)]",
          )}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="relative w-full grid rounded-lg overflow-hidden border border-[var(--c-border)] bg-[var(--c-elevated)]">
        {slides.map((s, i) => (
          <motion.img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
            decoding="async"
            onClick={() => setOpen(true)}
            style={{ gridArea: "1 / 1" }}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.03,
            }}
            transition={{ duration: 0 }}
            className={cn(
              "w-full cursor-zoom-in",
              i === index ? "pointer-events-auto" : "pointer-events-none",
            )}
          />
        ))}
        {hasMultiple && (
          <>
            <ArrowButton side="left" onClick={prev} />
            <ArrowButton side="right" onClick={next} />
            <Dots />
          </>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors duration-150"
            >
              <X size={15} className="text-white/80" />
            </button>
            {hasMultiple && (
              <>
                <ArrowButton side="left" onClick={prev} inModal />
                <ArrowButton side="right" onClick={next} inModal />
                <Dots inModal />
              </>
            )}
            <motion.div
              className="relative z-[5] grid"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {slides.map((s, i) => (
                <motion.img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  decoding="async"
                  style={{ gridArea: "1 / 1" }}
                  initial={false}
                  animate={{
                    opacity: i === index ? 1 : 0,
                    scale: i === index ? 1 : 1.03,
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className={cn(
                    "max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-zoom-out",
                    i === index ? "pointer-events-auto" : "pointer-events-none",
                  )}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DevelopmentIndicator({ accentColor = "#fb923c" }: { accentColor?: string }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-12 py-20 px-4 overflow-hidden border border-[var(--c-border-thin)] rounded-xl bg-[var(--c-surface-faint)] flex flex-col items-center justify-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[80px] rounded-full pointer-events-none opacity-10" style={{ backgroundColor: accentColor }} />

      <div className="relative w-16 h-16">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--c-border)]"
          style={{ borderTopColor: accentColor }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase font-bold" style={{ color: accentColor }}>
          Project in Development
        </p>
      </div>
    </div>
  );
}
