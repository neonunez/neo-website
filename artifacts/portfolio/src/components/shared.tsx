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
} from "react-icons/si";
import { LANGUAGES, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// ─── Badge icon well (nested tile; matches Overview status badges) ───────────

export function BadgeIconWell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[6px] bg-white/[0.09] px-2 py-1.5",
        "ring-1 ring-white/18 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "[.light_&]:bg-black/[0.06] [.light_&]:ring-black/12 [.light_&]:shadow-[0_2px_10px_-2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-fg)] align-middle leading-none font-medium whitespace-nowrap">
      <span className="flex items-center">{icon}</span>
      {children}
    </span>
  );
}

// ─── FlagBadge ────────────────────────────────────────────────────────────────

export function FlagBadge({ flag, label, compact }: { flag: string; label: string; compact?: boolean }) {
  const tight = Boolean(compact);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-fg)] align-middle leading-none font-medium whitespace-nowrap",
        tight ? "px-1.5 py-0.5" : "px-2 py-1",
      )}
    >
      <span className="flex items-center shrink-0">
        <BadgeIconWell
          className={cn(
            "box-border",
            tight ? "min-h-[26px] min-w-[26px] px-1 py-0.5" : "min-h-[32px] min-w-[32px] px-1.5 py-1.5",
          )}
        >
          <span className={cn("leading-none select-none", tight ? "text-[16px]" : "text-[20px]")} aria-hidden>
            {flag}
          </span>
        </BadgeIconWell>
      </span>
      {label}
    </span>
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
  "Python":       { icon: SiPython,       color: "#4b8bbe" },
  "mlx-whisper":  { icon: SiApple,        color: "#aaa"    },
  "pyobjc":       { icon: SiApple,        color: "#aaa"    },
  "rumps":        { icon: SiApple,        color: "#aaa"    },
  "pywebview":    { icon: SiPython,       color: "#4b8bbe" },
  "React Native": { icon: SiReact,        color: "#61DAFB" },
  "Expo":         { icon: SiExpo,         color: "var(--c-fg)" },
  "TypeScript":   { icon: SiTypescript,   color: "#3178C6" },
};

export function TechBadge({ label }: { label: string }) {
  const tech = TECH_ICONS[label];
  if (!tech) return <Badge icon={null}>{label}</Badge>;
  const Icon = tech.icon;
  return (
    <Badge icon={<Icon size={11} style={{ color: tech.color, flexShrink: 0 }} />}>
      {label}
    </Badge>
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
