import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

function SectionHeading({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.h3
      {...fade(delay)}
      className="text-base font-semibold text-[var(--c-fg)] mt-10 mb-3"
    >
      {children}
    </motion.h3>
  );
}

function Para({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.p
      {...fade(delay)}
      className="text-sm leading-[1.85] text-[var(--c-soft)]"
    >
      {children}
    </motion.p>
  );
}

export default function AboutMe() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <div className="py-6">

        <motion.h2
          {...fade(0.05)}
          className="text-2xl font-bold text-[var(--c-fg)] mb-6"
        >
          {tr.navAboutMe}
        </motion.h2>

        {/* Introduction */}
        <SectionHeading delay={0.08}>{tr.sectionIntro}</SectionHeading>
        <div className="space-y-4">
          <Para delay={0.11}>{tr.aboutIntro1}</Para>
          <Para delay={0.14}>{tr.aboutIntro2}</Para>
          <Para delay={0.17}>{tr.aboutIntro3}</Para>
        </div>

        {/* My technical journey */}
        <SectionHeading delay={0.20}>{tr.aboutSectionJourney}</SectionHeading>
        <div className="space-y-4">
          <Para delay={0.23}>{tr.aboutJourney1}</Para>
          <Para delay={0.26}>{tr.aboutJourney2}</Para>
          <Para delay={0.29}>{tr.aboutJourney3}</Para>
        </div>

        {/* Other interests */}
        <SectionHeading delay={0.32}>{tr.aboutSectionInterests}</SectionHeading>
        <div className="space-y-4">
          <Para delay={0.35}>{tr.aboutInterests1}</Para>
          <Para delay={0.38}>{tr.aboutInterests2}</Para>
          <Para delay={0.41}>{tr.aboutInterests3}</Para>
          <Para delay={0.44}>{tr.aboutInterests4}</Para>
          <Para delay={0.47}>
            {tr.aboutInterests5}
            <em>
              <a
                href="https://letterboxd.com/film/the-brutalist/"
                target="_blank"
                rel="noreferrer"
                className="link-anim text-[var(--c-fg)] pb-px inline-flex items-center gap-[3px]"
              >
                The Brutalist<ExternalLink size={10} className="opacity-60 shrink-0" />
              </a>
            </em>
          </Para>
        </div>

        {/* Personal stuff */}
        <SectionHeading delay={0.50}>{tr.aboutSectionPersonal}</SectionHeading>
        <div className="space-y-4">
          <Para delay={0.53}>{tr.aboutPersonal1}</Para>
          <Para delay={0.56}>{tr.aboutPersonal2}</Para>
          <Para delay={0.59}>
            {tr.aboutPersonal3a}
            <a
              href="https://letterboxd.com/neo_nunez/"
              target="_blank"
              rel="noreferrer"
              className="link-anim text-[var(--c-fg)] pb-px inline-flex items-center gap-[3px]"
            >
              here<ExternalLink size={10} className="opacity-60 shrink-0" />
            </a>
            {tr.aboutPersonal3b}
          </Para>
        </div>

      </div>
    </Layout>
  );
}
