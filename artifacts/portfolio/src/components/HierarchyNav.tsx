import { useLocation, Link } from "wouter";

const PAGES = [
  { path: "/",           label: "overview"    },
  { path: "/experience", label: "experience"  },
  { path: "/projects",   label: "projects"    },
  { path: "/skills",     label: "skills"      },
  { path: "/languages",  label: "languages"   },
];

const CHILDREN = PAGES.slice(1);

export function HierarchyNav() {
  const [location] = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location === "/" || location === "" : location === path || location.startsWith(path + "/");

  const activeStyle   = { color: "var(--c-fg)", opacity: 1.0 };
  const inactiveStyle = { color: "var(--c-fg)", opacity: 0.18 };
  const lineActive    = { color: "var(--c-fg)", opacity: 1.0 };
  const lineInactive  = { color: "var(--c-fg)", opacity: 0.10 };

  return (
    <div className="fixed left-7 top-[80px] z-30 hidden xl:flex flex-col py-6">
      <div className="flex flex-col font-mono text-[10px] tracking-widest select-none">

        {/* Root label — always full brightness */}
        <span className="leading-none mb-1.5" style={activeStyle}>neo</span>

        {/* Vertical connector from root to overview — always full brightness */}
        <span className="leading-[1.1] mb-0.5 ml-[0px]" style={lineActive}>│</span>

        {/* Overview node — always full brightness, underline on hover */}
        <div className="flex items-center gap-1.5 mb-1">
          <span style={lineActive}>└─</span>
          <Link
            href="/"
            className="uppercase transition-colors duration-150 hover:underline underline-offset-2 decoration-[var(--c-fg)]/70"
            style={activeStyle}
          >
            overview
          </Link>
        </div>

        {/* Children */}
        <div className="flex flex-col gap-1 ml-[18px]">
          {CHILDREN.map((page, i) => {
            const active = isActive(page.path);
            const isLast = i === CHILDREN.length - 1;
            return (
              <div key={page.path} className="flex items-center gap-1.5">
                <span style={active ? lineActive : lineInactive}>
                  {isLast ? "└─" : "├─"}
                </span>
                <Link
                  href={page.path}
                  className={`uppercase transition-colors duration-150 ${active ? "hover:underline underline-offset-2 decoration-[var(--c-fg)]/70" : ""}`}
                  style={active ? activeStyle : inactiveStyle}
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
