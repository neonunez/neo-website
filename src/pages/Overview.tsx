import { motion } from "framer-motion";
import { Link } from "wouter";
import { StickyNote, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { Badge, FlagBadge, AnimatedLine } from "@/components/shared";
import { ChatPanel } from "@/components/ChatPanel";

const nameChars = "Neo Nuñez".split("");
const introDelay = [0.05, 0.12, 0.19, 0.26];

const iconUrl = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export default function Overview() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <div className="py-6">

        {/* Name */}
        <h1 className="text-2xl font-semibold text-[var(--c-fg)] mb-3 flex flex-wrap">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 + i * 0.028 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[0] }}
          className="text-[var(--c-muted)] text-sm leading-relaxed mb-6"
        >
          {tr.tagline}
        </motion.p>

        {/* Status lines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[1] }}
          className="space-y-3.5 text-[15px] leading-relaxed mb-6"
        >
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[var(--c-fg)] opacity-90">{tr.workingAt}</span>
            <Badge
              icon={
                <img
                  src={iconUrl("apply-logo.svg")}
                  alt=""
                  className="h-[14px] w-auto max-h-[14px] object-contain object-left shrink-0"
                  aria-hidden
                />
              }
            >
              Apply Latam
            </Badge>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[var(--c-fg)] opacity-90">{tr.building}</span>
            <Badge
              icon={
                <img
                  src={iconUrl("apply-logo.svg")}
                  alt=""
                  className="h-[14px] w-auto max-h-[14px] object-contain object-left shrink-0"
                  aria-hidden
                />
              }
            >
              Enterprise RAG System
            </Badge>
            <Badge
              icon={
                <img
                  src={iconUrl("voiceflow-face.svg")}
                  alt=""
                  className="h-[14px] w-auto max-h-[14px] object-contain object-left shrink-0 [.light_&]:invert"
                  aria-hidden
                />
              }
            >
              VoiceFlow
            </Badge>
            <Badge icon={<StickyNote size={14} className="text-[#fb923c]" />}>
              FocusPad
            </Badge>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[var(--c-fg)] opacity-90">{tr.studyingAt}</span>
            <Badge
              icon={
                <img
                  src={iconUrl("uba.svg")}
                  alt=""
                  className="h-[14px] w-[14px] object-contain shrink-0 [.light_&]:brightness-0"
                  aria-hidden
                />
              }
            >
              UBA — Computer Science
            </Badge>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap md:flex-nowrap">
            <span className="text-[var(--c-fg)] opacity-90 shrink-0 mr-0.5">{tr.fluentIn}</span>
            <FlagBadge flag="🇦🇷" label={tr.langSpanish} />
            <FlagBadge flag="🇬🇧" label={tr.langEnglish} />
            <FlagBadge flag="🇫🇷" label={tr.langFrench} />
            <FlagBadge flag="🇩🇪" label={tr.langGerman} />
            <FlagBadge flag="🇮🇹" label={tr.langItalian} />
            <FlagBadge flag="🇧🇷" label={tr.langPortuguese} />
          </div>
        </motion.div>

        {/* AI Chat Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
        >
          <ChatPanel />
          <div className="mt-8 pt-6 relative">
            <AnimatedLine delay={0.4} className="absolute top-0 left-0 right-0" />
            <h4 className="text-sm font-medium text-[var(--c-fg)] mb-1">Site Navigation</h4>
            <p className="text-xs text-[var(--c-soft)] mb-4 leading-relaxed">
              Prefer the traditional way? Browse through the website sections below.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: tr.navAboutMe,    href: "/about"      },
                { label: tr.navExperience, href: "/experience"  },
                { label: tr.navProjects,   href: "/projects"    },
                { label: "Contact",        href: "#contact"     },
              ].map(({ label, href }) => {
                const inner = (
                  <>
                    <span className="text-sm font-medium text-[var(--c-fg)]">{label}</span>
                    <ArrowRight size={14} className="text-[var(--c-muted)] group-hover:text-[var(--c-fg)] group-hover:translate-x-1 transition-all ml-auto" />
                  </>
                );
                const classes = "group flex items-center px-4 py-3 rounded-xl border border-[var(--c-border-strong)] bg-[var(--c-surface)] hover:border-[var(--c-dim)] hover:bg-[var(--c-surface-2)] transition-all shadow-sm";
                return href.startsWith("#") ? (
                  <a key={label} href={href} className={classes}>
                    {inner}
                  </a>
                ) : (
                  <Link key={label} href={href} className={classes}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </Layout>
  );
}
