import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";
import { FadeUp } from "@/components/shared";
import { 
  User, 
  Cpu, 
  Languages as LanguagesIcon, 
  TrendingUp, 
  Atom,
  Smile,
  Plane,
  Volleyball,
  Film,
  BookOpen,
  ExternalLink
} from "lucide-react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

const SECTIONS = [
  { id: "intro", icon: User },
  { id: "journey", icon: Cpu },
  { id: "interests", icon: LanguagesIcon },
  { id: "personal", icon: Smile },
];

const SCROLL_OFFSET_DESKTOP = 20; // px above section title on desktop — increase to show more space above
const SCROLL_OFFSET_MOBILE  = 100; // px above section title on mobile

function scrollToSection(id: string, offset: number) {
  if (id === SECTIONS[0].id) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
}

/* ── Reading Navigation ────────────────────────────────────────── */
function ReadingNav({ activeId }: { activeId: string | null }) {
  const { tr } = usePortfolio();

  const labels: Record<string, string> = {
    intro: tr.sectionIntro,
    journey: tr.aboutSectionJourney,
    interests: tr.aboutSectionInterests,
    personal: tr.aboutSectionPersonal,
  };

  const activeIndex = SECTIONS.findIndex(s => s.id === activeId);
  const progress = activeIndex < 0 ? 0 : activeIndex / (SECTIONS.length - 1);

  return (
    <>
      {/* Desktop: vertical right-side nav */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-0 select-none">
        <div className="absolute left-[5px] top-[12.5px] bottom-[12.5px] w-px bg-[var(--c-border)]" />
        <div className="absolute left-[5px] top-[12.5px] bottom-[12.5px] w-px overflow-hidden">
          <div className="w-full bg-[var(--c-fg)] transition-all duration-300" style={{ height: `${progress * 100}%` }} />
        </div>
        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          const labelText = labels[s.id] || s.id;

          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="relative flex items-center gap-3 py-[7px] group"
              onClick={(e) => { e.preventDefault(); scrollToSection(s.id, SCROLL_OFFSET_DESKTOP); }}
            >
              <span
                className="relative z-10 w-[11px] h-[11px] rounded-full border flex-shrink-0 transition-all duration-200"
                style={{
                  borderColor: isActive ? "var(--c-fg)" : "var(--c-border-strong)",
                  backgroundColor: isActive ? "var(--c-fg)" : "transparent",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              />
              <span
                className="text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-200"
                style={{
                  color: isActive ? "var(--c-fg)" : "var(--c-faint)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-4px)",
                }}
              >
                {labelText}
              </span>
              {!isActive && (
                <span className="absolute left-8 text-[10px] font-medium tracking-wide whitespace-nowrap text-[var(--c-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  {labelText}
                </span>
              )}
            </a>
          );
        })}
      </div>

      {/* Mobile: horizontal bottom bar */}
      <div className="xl:hidden fixed bottom-6 left-0 right-0 flex justify-center z-30 select-none pointer-events-none">
        <div className="pointer-events-auto relative flex items-center gap-5 px-5 py-[10px] rounded-full border shadow-[0_4px_24px_rgba(0,0,0,0.5)]" style={{ backgroundColor: "var(--c-bg)", borderColor: "var(--c-border-strong)" }}>
          <div className="absolute inset-x-[26px] top-1/2 -translate-y-1/2 h-px bg-[var(--c-border)]" />
          <div
            className="absolute left-[26px] top-1/2 -translate-y-1/2 h-px bg-[var(--c-fg)] transition-all duration-300 origin-left"
            style={{ width: `calc((100% - 52px) * ${progress})` }}
          />
          {SECTIONS.map((s) => {
            const isActive = activeId === s.id;
            const labelText = labels[s.id] || s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(s.id, SCROLL_OFFSET_MOBILE); }}
                className="relative z-10 flex flex-col items-center touch-manipulation"
              >
                {isActive && (
                  <span
                    className="absolute bottom-full mb-2 text-[9px] font-medium tracking-wide whitespace-nowrap"
                    style={{ color: "var(--c-fg)" }}
                  >
                    {labelText}
                  </span>
                )}
                <span
                  className="block w-[11px] h-[11px] rounded-full border transition-all duration-200"
                  style={{
                    borderColor: isActive ? "var(--c-fg)" : "var(--c-border-strong)",
                    backgroundColor: isActive ? "var(--c-fg)" : "transparent",
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Helper for the rolling icons
function RollingIcon({ icons, interval = 1800 }: { icons: React.ElementType[], interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, interval);
    return () => clearInterval(timer);
  }, [icons, interval]);

  const Icon = icons[index];

  return (
    <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Section({
  id,
  children,
  icon,
  title,
  delay = 0,
  isActive = false,
}: {
  id: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  delay?: number;
  isActive?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <div id={id} ref={ref} className="relative pl-8 sm:pl-12 pb-16 last:pb-8">
      {/* Marginalia - Desktop only */}
      <div className="absolute left-[-40px] top-0 hidden xl:block">
        <motion.div
          animate={{
            opacity: isInView ? 1 : 0.1,
            x: isInView ? 0 : -10,
            scale: isInView ? 1 : 0.9
          }}
          transition={{ duration: 0.4 }}
          className="transition-colors duration-300"
          style={{ color: isActive ? "var(--c-fg)" : "var(--c-dim)" }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Narrative Node */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-[var(--c-border-strong)] bg-[var(--c-bg)] z-10">
        <motion.div 
          animate={{ scale: isInView ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 1, repeat: isInView ? Infinity : 0, repeatDelay: 2 }}
          className="absolute inset-0 rounded-full bg-[var(--c-fg)] opacity-20"
        />
      </div>

      <motion.div {...fade(delay)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="xl:hidden text-[var(--c-muted)] scale-75 origin-left">
            {icon}
          </div>
          <h3 className="text-base font-bold text-[var(--c-fg)] uppercase tracking-widest">
            {title}
          </h3>
        </div>
        <div className="space-y-5 text-[15px] leading-[1.8] text-[var(--c-soft)] max-w-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutMe() {
  const { tr } = usePortfolio();
  const containerRef = useRef(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Active section tracking — rAF-throttled, reading-line based
  useEffect(() => {
    let rafId: number | null = null;

    function detect() {
      rafId = null;

      // Near-bottom shortcut: last section can't always cross the reading line
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActiveId(SECTIONS[SECTIONS.length - 1].id);
        return;
      }

      const readingLine = window.innerHeight * 0.25;
      let current = SECTIONS[0].id;

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= readingLine && bottom > readingLine) {
          current = s.id;
          break;
        }
        if (top <= readingLine) current = s.id;
      }

      setActiveId(current);
    }

    function onScroll() {
      if (rafId === null) rafId = requestAnimationFrame(detect);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    detect();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Layout>
      <ReadingNav activeId={activeId} />
      
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--c-dim)] opacity-[0.03] blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 60, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--c-fg)] opacity-[0.02] blur-[100px] rounded-full" 
        />
      </div>

      <section className="py-6">
        <FadeUp>
          <h2 className="text-2xl font-bold text-[var(--c-fg)] mb-10">
            {tr.navAboutMe}
          </h2>
        </FadeUp>

        <div ref={containerRef} className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-[5px] top-2 bottom-8 w-[1px] bg-[var(--c-border-thin)]" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[5px] top-2 bottom-8 w-[1px] bg-gradient-to-b from-[var(--c-fg)] to-transparent z-0" 
          />

          {/* Introduction */}
          <Section id="intro" icon={<User size={24} strokeWidth={1.5} />} title={tr.sectionIntro} delay={0.1} isActive={activeId === "intro"}>
            <p>{tr.aboutIntro1}</p>
            <p>{tr.aboutIntro2}</p>
            <p>{tr.aboutIntro3}</p>
          </Section>

          {/* Technical Journey */}
          <Section id="journey" icon={<Cpu size={24} strokeWidth={1.5} />} title={tr.aboutSectionJourney} delay={0.2} isActive={activeId === "journey"}>
            <p>{tr.aboutJourney1}</p>
            <p>{tr.aboutJourney2}</p>
            <p>{tr.aboutJourney3}</p>
          </Section>

          {/* Interests */}
          <Section
            id="interests"
            icon={<RollingIcon icons={[LanguagesIcon, TrendingUp, Atom]} />}
            title={tr.aboutSectionInterests}
            delay={0.3}
            isActive={activeId === "interests"}
          >
            <p>{tr.aboutInterests1}</p>
            <p>{tr.aboutInterests2}</p>
            <div className="text-[var(--c-fg)] font-medium italic opacity-90 border-l-2 border-[var(--c-border-strong)] pl-4 py-1">
               <p className="text-sm">
                 "{tr.aboutInterests5} 
                 <a href="https://letterboxd.com/film/the-brutalist/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-[var(--c-fg)] underline underline-offset-4 decoration-1 decoration-[var(--c-border-strong)] hover:decoration-[var(--c-fg)] transition-all">The Brutalist<ExternalLink size={11} className="opacity-50 mb-0.5" /></a>"
               </p>
            </div>
            <p>{tr.aboutInterests3}</p>
            <p>{tr.aboutInterests4}</p>
          </Section>

          {/* Personal */}
          <Section
            id="personal"
            icon={<RollingIcon icons={[Smile, Plane, Volleyball, Film, BookOpen]} />}
            title={tr.aboutSectionPersonal}
            delay={0.4}
            isActive={activeId === "personal"}
          >
            <p>{tr.aboutPersonal1}</p>
            <p>{tr.aboutPersonal2}</p>
            <p>
              {tr.aboutPersonal3a} 
              <a href="https://letterboxd.com/neo_nunez/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-[var(--c-fg)] font-medium border-b border-[var(--c-border-strong)] hover:border-[var(--c-fg)] transition-colors mx-1">
                here<ExternalLink size={11} className="opacity-50 mb-0.5" />
              </a> 
              {tr.aboutPersonal3b}
            </p>
          </Section>
        </div>
      </section>
    </Layout>
  );
}