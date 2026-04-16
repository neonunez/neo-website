import { useRef, useState, useEffect } from "react";

import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BrainCircuit,
  ChevronDown,
  ExternalLink,
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
} from "react-icons/si";
import { LANGUAGES, type Lang } from "@/lib/i18n";

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

export function FlagBadge({ flag, label }: { flag: string; label: string }) {
  return (
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
}

// ─── TechBadge ────────────────────────────────────────────────────────────────

export const TECH_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  "Next.js":      { icon: SiNextdotjs,    color: "var(--c-fg)" },
  "FastAPI":      { icon: SiFastapi,      color: "#009688" },
  "LangGraph":    { icon: SiLangchain,    color: "#5eead4" },
  "LlamaIndex":   { icon: BrainCircuit,   color: "#a78bfa" },
  "Supabase":     { icon: SiSupabase,     color: "#3ECF8E" },
  "Gemini Flash": { icon: SiGooglegemini, color: "#4285F4" },
  "Gemini":       { icon: SiGooglegemini, color: "#4285F4" },
  "Python":       { icon: SiPython,       color: "#4b8bbe" },
  "mlx-whisper":  { icon: SiApple,        color: "#aaa"    },
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
  return (
    <div
      className="-mx-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[var(--c-surface)]"
      style={{ boxShadow: "inset 0 0 0 0 transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "inset 2px 0 0 var(--c-border)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent")}
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
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors text-left
                ${l.code === lang
                  ? "text-[var(--c-fg)] bg-[var(--c-surface-2)]"
                  : "text-[var(--c-muted)] hover:text-[var(--c-fg)] hover:bg-[var(--c-surface)]"
                }`}
            >
              <span className="text-sm leading-none">{l.flag}</span>
              <span>{l.name}</span>
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
