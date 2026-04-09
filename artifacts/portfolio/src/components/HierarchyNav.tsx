import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";

const CHILDREN = [
  { path: "/about",      label: "about me"   },
  { path: "/experience", label: "experience" },
  { path: "/projects",   label: "projects"   },
  { path: "/skills",     label: "skills"     },
  { path: "/languages",  label: "languages"  },
];

export function HierarchyNav() {
  const [location] = useLocation();

  const isActive = (path: string) =>
    location === path || location.startsWith(path + "/");

  const activeIndex = CHILDREN.findIndex((p) => isActive(p.path));

  const pct =
    activeIndex === -1
      ? 0
      : ((activeIndex + 0.5) / CHILDREN.length) * 100;

  const full = { color: "var(--c-fg)", opacity: 1.0 };
  const dim  = { color: "var(--c-fg)", opacity: 0.18 };

  return (
    <div className="fixed left-7 top-[80px] z-30 hidden xl:flex flex-col py-6">
      <div className="flex flex-col font-mono text-[10px] tracking-widest select-none">

        {/* Root — always full */}
        <span className="leading-none mb-1.5" style={full}>neo</span>

        {/* neo → overview wire — always full */}
        <span className="leading-[1.2]" style={full}>│</span>

        {/* Overview node — always full */}
        <div className="flex items-center gap-1.5">
          <span style={full}>└─</span>
          <Link
            href="/"
            className="uppercase transition-colors duration-150 hover:underline underline-offset-2 decoration-[var(--c-fg)]/70"
            style={full}
          >
            overview
          </Link>
        </div>

        {/* Children column */}
        <div className="relative flex flex-col ml-[4px]">
          {/* Continuous vertical line: bright + dim segments */}
          <div className="absolute left-0 inset-y-0 flex flex-col" style={{ width: "1px" }}>
            <motion.div
              key={activeIndex}
              initial={{ height: 0 }}
              animate={{ height: `${pct}%` }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ backgroundColor: "var(--c-fg)", width: "1px" }}
            />
            <div
              style={{
                flex: 1,
                backgroundColor: "var(--c-fg)",
                opacity: 0.10,
                width: "1px",
              }}
            />
          </div>

          {CHILDREN.map((page) => {
            const active = isActive(page.path);

            return (
              <div key={page.path} className="flex items-center pl-3 py-[2px]">
                <span style={{ color: "var(--c-fg)", opacity: active ? 1.0 : 0.10, marginRight: "6px" }}>─</span>
                <Link
                  href={page.path}
                  className={`uppercase transition-colors duration-150${active ? " hover:underline underline-offset-2 decoration-[var(--c-fg)]/70" : ""}`}
                  style={active ? full : dim}
                >
                  {page.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
