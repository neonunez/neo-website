import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layout } from "@/components/Layout";

const introDelay = [0.05, 0.12, 0.19, 0.26];

export default function AboutMe() {
  const { tr } = usePortfolio();

  return (
    <Layout>
      <div className="py-6">

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[0] }}
          className="text-2xl font-bold text-[var(--c-fg)] mb-6"
        >
          {tr.navAboutMe}
        </motion.h2>

        {/* Bio paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[1] }}
          className="space-y-4 text-sm leading-[1.85] text-[var(--c-soft)]"
        >
          <p>
            {tr.bio1.split("github.com/neo-nunez")[0]}
            <a
              href="https://github.com/neo-nunez"
              target="_blank"
              rel="noreferrer"
              className="link-anim text-[var(--c-fg)] pb-px"
            >
              github.com/neo-nunez
            </a>
            {tr.bio1.split("github.com/neo-nunez")[1]}
          </p>
          <p>{tr.bio2}</p>
          <p>
            {tr.bio3}{" "}
            <a
              href="mailto:neonunez129@gmail.com"
              className="link-anim text-[var(--c-fg)] pb-px"
            >
              {tr.bio3Link}
            </a>
            .
          </p>
        </motion.div>

      </div>
    </Layout>
  );
}
