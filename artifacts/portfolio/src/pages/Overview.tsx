import { motion } from "framer-motion";
import { Link } from "wouter";
import { StickyNote, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { Badge, BadgeIconWell, FlagBadge, AnimatedLine } from "@/components/shared";
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
          className="space-y-2.5 text-sm leading-relaxed mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[var(--c-muted)]">{tr.workingAt}</span>
            <Badge
              icon={
                <BadgeIconWell>
                  <img
                    src={iconUrl("apply-logo.svg")}
                    alt=""
                    className="h-[20px] w-auto max-w-[40px] object-contain object-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </BadgeIconWell>
              }
            >
              Apply Latam
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[var(--c-muted)]">{tr.building}</span>
            <Badge
              icon={
                <BadgeIconWell>
                  <img
                    src={iconUrl("apply-logo.svg")}
                    alt=""
                    className="h-[20px] w-auto max-w-[40px] object-contain object-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </BadgeIconWell>
              }
            >
              Enterprise RAG System
            </Badge>
            <Badge
              icon={
                <BadgeIconWell>
                  <img
                    src={iconUrl("voiceflow-face.svg")}
                    alt=""
                    className="h-[20px] w-[24px] object-contain object-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] [.light_&]:brightness-0"
                  />
                </BadgeIconWell>
              }
            >
              VoiceFlow
            </Badge>
            <Badge
              icon={
                <BadgeIconWell>
                  <StickyNote size={20} strokeWidth={2.5} className="text-[#fb923c] drop-shadow-[0_0_10px_rgba(251,146,60,0.4)]" />
                </BadgeIconWell>
              }
            >
              FocusPad
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[var(--c-muted)]">{tr.studyingAt}</span>
            <Badge
              icon={
                <BadgeIconWell>
                  <img
                    src={iconUrl("uba.svg")}
                    alt=""
                    className="h-6 w-6 object-contain [.light_&]:brightness-0"
                  />
                </BadgeIconWell>
              }
            >
              UBA — Computer Science
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
            <span className="text-[var(--c-muted)] shrink-0 mr-1">{tr.fluentIn}</span>
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
            <div className="flex flex-wrap gap-3">
              {[
                { label: tr.navAboutMe,    href: "/about"      },
                { label: tr.navExperience, href: "/experience"  },
                { label: tr.navProjects,   href: "/projects"    },
                { label: "Contact",        href: "#contact"     },
              ].map(({ label, href }) =>
                href.startsWith("#") ? (
                  <a key={label} href={href}
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--c-border-strong)] bg-[var(--c-surface)] hover:border-[var(--c-dim)] hover:bg-[var(--c-surface-2)] transition-all">
                    <span className="text-sm font-medium text-[var(--c-fg)]">{label}</span>
                    <ArrowRight size={14} className="text-[var(--c-muted)] group-hover:text-[var(--c-fg)] group-hover:translate-x-0.5 transition-all" />
                  </a>
                ) : (
                  <Link key={label} href={href}
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--c-border-strong)] bg-[var(--c-surface)] hover:border-[var(--c-dim)] hover:bg-[var(--c-surface-2)] transition-all">
                    <span className="text-sm font-medium text-[var(--c-fg)]">{label}</span>
                    <ArrowRight size={14} className="text-[var(--c-muted)] group-hover:text-[var(--c-fg)] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </Layout>
  );
}
