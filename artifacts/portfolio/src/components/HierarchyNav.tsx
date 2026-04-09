import { Fragment } from "react";
import { useLocation, Link } from "wouter";

const CHILDREN = [
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

  const full = { color: "var(--c-fg)", opacity: 1.0 };
  const dim  = { color: "var(--c-fg)", opacity: 0.18 };
  const wire = { color: "var(--c-fg)", opacity: 0.10 };

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
        <div className="flex flex-col ml-[18px]">
          {CHILDREN.map((page, i) => {
            const active    = isActive(page.path);
            const isLast    = i === CHILDREN.length - 1;
            // arm ├─/└─ is bright ONLY for the active child itself
            const armBright = active;
            // the │ AFTER row i is always dim — only the active arm brightens
            const postBright = false;

            return (
              <Fragment key={page.path}>
                <div className="flex items-center gap-1.5">
                  <span style={armBright ? full : wire}>
                    {isLast ? "└─" : "├─"}
                  </span>
                  <Link
                    href={page.path}
                    className={`uppercase transition-colors duration-150${active ? " hover:underline underline-offset-2 decoration-[var(--c-fg)]/70" : ""}`}
                    style={active ? full : dim}
                  >
                    {page.label}
                  </Link>
                </div>

                {/* Vertical segment connecting to next row */}
                {!isLast && (
                  <span className="leading-[1.2]" style={postBright ? full : wire}>│</span>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
