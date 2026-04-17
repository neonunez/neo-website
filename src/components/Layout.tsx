import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Copy, Check, ExternalLink, ChevronRight, ArrowUp, User, Briefcase, Code2, Mail, Menu, X } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { HierarchyNav } from "./HierarchyNav";
import { LanguageSwitcher, CommandPalette, type CmdItem, SocialLink, AnimatedLine, AnimatedLogo, GithubGlyph } from "./shared";
import { ParticleNetwork } from "./ParticleNetwork";

function ContactFooter() {
  const { tr } = usePortfolio();
  const [copied, setCopied] = useState(false);

  return (
    <footer id="contact" className="relative pt-10 pb-16">
      <AnimatedLine delay={0.4} className="absolute top-0 left-0 right-0" />
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-faint)] mb-5">
        {tr.sectionFindMe}
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
        <SocialLink href="https://github.com/neo-nunez">
          <GithubGlyph />
          GitHub
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/neo-nunez">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </SocialLink>
      </div>
      <p className="text-sm text-[var(--c-muted)]">
        {tr.orMailMe}{" "}
        <button
          onClick={() => {
            navigator.clipboard.writeText("neonunez129@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="link-anim inline-flex items-center gap-1.5 text-[var(--c-fg)] cursor-pointer pb-px"
        >
          {copied
            ? <><Check size={12} className="text-[#34d399]" /><span className="text-[#34d399]">Copied!</span></>
            : "neonunez129@gmail.com"
          }
        </button>
      </p>
      <p className="text-sm text-[var(--c-faint)] mt-3">
        You can also{" "}
        <a
          href="/cv.pdf"
          download
          className="link-anim text-[var(--c-muted)] hover:text-[var(--c-fg)] pb-px inline-flex items-center gap-1"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          download my CV
        </a>
        .
      </p>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, lang, setLang, tr } = usePortfolio();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const cmdItems: CmdItem[] = [
    {
      label: tr.navOverview,
      icon: <ArrowUp size={13} />,
      hint: "↑",
      action: () => { navigate("/"); setCmdOpen(false); },
    },
    {
      label: tr.navAboutMe,
      icon: <User size={13} />,
      hint: "§0",
      action: () => { navigate("/about"); setCmdOpen(false); },
    },
    {
      label: tr.navExperience,
      icon: <ChevronRight size={13} />,
      hint: "§1",
      action: () => { navigate("/experience"); setCmdOpen(false); },
    },
    {
      label: tr.navProjects,
      icon: <ChevronRight size={13} />,
      hint: "§2",
      action: () => { navigate("/projects"); setCmdOpen(false); },
    },
    {
      label: tr.sectionSkills,
      icon: <ChevronRight size={13} />,
      hint: "§3",
      action: () => { navigate("/skills"); setCmdOpen(false); },
    },
    {
      label: tr.sectionLanguages,
      icon: <ChevronRight size={13} />,
      hint: "§4",
      action: () => { navigate("/languages"); setCmdOpen(false); },
    },
    {
      label: "GitHub",
      icon: <ExternalLink size={13} />,
      hint: "↗",
      action: () => { window.open("https://github.com/neo-nunez", "_blank"); setCmdOpen(false); },
    },
    {
      label: "LinkedIn",
      icon: <ExternalLink size={13} />,
      hint: "↗",
      action: () => { window.open("https://linkedin.com/in/neo-nunez", "_blank"); setCmdOpen(false); },
    },
    {
      label: tr.cmdCopyEmail,
      icon: <Copy size={13} />,
      hint: "⌘C",
      action: () => {
        navigator.clipboard.writeText("neonunez129@gmail.com");
        setCmdOpen(false);
      },
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col base-bg text-[var(--c-fg)] antialiased${theme === "light" ? " light" : ""}`}>

      {/* Particle Network Ambient Background */}
      <ParticleNetwork />

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Hierarchy nav (xl+) */}
      <HierarchyNav />

      {/* Command palette */}
      <CommandPalette items={cmdItems} open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Navbar */}
      {/* Desktop Logo */}
      <div className="hidden xl:block fixed left-7 top-8 z-50">
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-block"
          aria-label="Go to Overview"
        >
          <AnimatedLogo />
        </Link>
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 xl:bg-transparent xl:backdrop-filter-none xl:pointer-events-none">
        {/* Mobile background with blur */}
        <div
          className="absolute inset-0 xl:hidden"
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", backgroundColor: "var(--c-nav)" }}
        />

        <nav className="relative px-8 py-3.5 xl:py-8 flex items-center justify-between xl:justify-end max-w-[860px] xl:max-w-none mx-auto">
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="xl:hidden inline-block pointer-events-auto"
            aria-label="Go to Overview"
          >
            <AnimatedLogo />
          </Link>
          <div className="flex items-center gap-5 pointer-events-auto">
            {/* GitHub */}
            <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer"
              className="text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors" aria-label="GitHub">
              <GithubGlyph size={16} />
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/neo-nunez" target="_blank" rel="noreferrer"
              className="text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="hidden xl:block text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            {/* ⌘K */}
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-[var(--c-dim)] hover:text-[var(--c-mid)] transition-colors text-[10px] font-mono border border-[var(--c-border-faint)] rounded px-1.5 py-0.5"
              aria-label="Open command palette"
            >
              <span>⌘K</span>
            </button>
            <LanguageSwitcher lang={lang} setLang={setLang} />
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--c-bg)] flex flex-col xl:hidden shadow-xl border-b border-[var(--c-border-faint)]"
          >
            <div className="flex items-center justify-between px-8 py-3.5">
              <Link
                href="/"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-block"
                aria-label="Go to Overview"
              >
                <AnimatedLogo />
              </Link>
              <div className="flex items-center gap-5">
                <button
                  onClick={toggleTheme}
                  className="text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[var(--c-muted)] hover:text-[var(--c-fg)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="px-4 pb-8">
              <HierarchyNav isMobile={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-grow pt-20 pb-4 px-8 max-w-[860px] mx-auto w-full"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Persistent footer — outside animation so it never re-animates on navigation */}
      <div className="px-8 max-w-[860px] mx-auto w-full">
        <ContactFooter />
      </div>
    </div>
  );
}
