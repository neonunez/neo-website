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
    path === "/" ? location === "/" || location === "" : location === path;

  const activeStyle  = { color: "var(--c-fg)", opacity: 0.65 };
  const inactiveStyle = { color: "var(--c-fg)", opacity: 0.18 };
  const lineStyle    = { color: "var(--c-fg)", opacity: 0.10 };
  const rootStyle    = { color: "var(--c-fg)", opacity: 0.13 };

  return (
    <div className="fixed left-7 top-[80px] z-30 hidden xl:flex flex-col py-6">
      <div className="flex flex-col font-mono text-[10px] tracking-widest select-none">

        {/* Root label */}
        <span className="leading-none mb-1.5" style={rootStyle}>neo</span>

        {/* Vertical connector from root to overview */}
        <span className="leading-[1.1] mb-0.5 ml-[0px]" style={lineStyle}>│</span>

        {/* Overview node */}
        <div className="flex items-center gap-1.5 mb-1">
          <span style={lineStyle}>└─</span>
          <Link
            href="/"
            className="transition-opacity duration-200 hover:opacity-40 uppercase"
            style={isActive("/") ? activeStyle : inactiveStyle}
          >
            overview
          </Link>
        </div>

        {/* Children */}
        <div className="flex flex-col gap-1 ml-[18px]">
          {CHILDREN.map((page, i) => {
            const isLast = i === CHILDREN.length - 1;
            return (
              <div key={page.path} className="flex items-center gap-1.5">
                <span style={lineStyle}>{isLast ? "└─" : "├─"}</span>
                <Link
                  href={page.path}
                  className="transition-opacity duration-200 hover:opacity-40 uppercase"
                  style={isActive(page.path) ? activeStyle : inactiveStyle}
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
