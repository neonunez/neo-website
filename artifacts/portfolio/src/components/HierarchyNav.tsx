import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";

const ARM_W  = 16;
const INDENT = ARM_W + 4; // 20px — labels' paddingLeft

const CHILDREN = [
  { path: "/about",      label: "about me"   },
  { path: "/experience", label: "experience" },
  { path: "/projects",   label: "projects"   },
  { path: "/skills",     label: "skills"     },
  { path: "/languages",  label: "languages"  },
];

interface Geo {
  neoBottom:   number;
  overviewMid: number;
  childMids:   number[];
  svgW:        number;
  svgH:        number;
}

export function HierarchyNav() {
  const [location] = useLocation();

  const isActive = (path: string) =>
    location === path || location.startsWith(path + "/");

  const activeIndex = CHILDREN.findIndex((p) => isActive(p.path));

  const containerRef = useRef<HTMLDivElement>(null);
  const neoRef       = useRef<HTMLSpanElement>(null);
  const overviewRef  = useRef<HTMLDivElement>(null);
  const childRefs    = useRef<(HTMLDivElement | null)[]>(
    new Array(CHILDREN.length).fill(null)
  );

  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    function measure() {
      const c = containerRef.current;
      const n = neoRef.current;
      const o = overviewRef.current;
      if (!c || !n || !o) return;

      const cRect  = c.getBoundingClientRect();
      const cTop   = cRect.top;

      const nRect  = n.getBoundingClientRect();
      const oRect  = o.getBoundingClientRect();

      const childMids = childRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return (r.top + r.bottom) / 2 - cTop;
      });

      setGeo({
        neoBottom:   nRect.bottom - cTop,
        overviewMid: (oRect.top + oRect.bottom) / 2 - cTop,
        childMids,
        svgW: cRect.width,
        svgH: cRect.height,
      });
    }

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const activeMid = geo && activeIndex !== -1 ? geo.childMids[activeIndex] : null;

  const staticPath = geo
    ? `M 0 ${geo.neoBottom} L 0 ${geo.overviewMid} L ${ARM_W} ${geo.overviewMid}`
    : null;

  const dynamicPath =
    geo && activeMid != null
      ? `M 0 ${geo.overviewMid} L 0 ${activeMid} L ${ARM_W} ${activeMid}`
      : null;

  const dimPath =
    geo && activeMid != null
      ? `M 0 ${activeMid} L 0 ${geo.svgH}`
      : geo
      ? `M 0 ${geo.overviewMid} L 0 ${geo.svgH}`
      : null;

  return (
    <div className="fixed left-7 top-[80px] z-30 hidden xl:block py-6">
      <div
        ref={containerRef}
        className="relative font-mono text-[10px] tracking-widest select-none flex flex-col"
      >
        {/* SVG overlay */}
        {geo && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={geo.svgW}
            height={geo.svgH}
            style={{ overflow: "visible" }}
          >
            {/* Static L: neo → overview (always visible) */}
            {staticPath && (
              <path
                d={staticPath}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
                strokeLinecap="square"
              />
            )}

            {/* Animated L: overview → active child */}
            {dynamicPath && (
              <motion.path
                key={activeIndex}
                d={dynamicPath}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}

            {/* Dim remainder: active child (or overview) → bottom */}
            {dimPath && (
              <path
                d={dimPath}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
                strokeLinecap="square"
                opacity="0.10"
              />
            )}
          </svg>
        )}

        {/* neo — flush left */}
        <span
          ref={neoRef}
          className="mb-3 leading-none"
          style={{ color: "var(--c-fg)", opacity: 1 }}
        >
          neo
        </span>

        {/* overview — indented */}
        <div
          ref={overviewRef}
          className="mb-2"
          style={{ paddingLeft: INDENT }}
        >
          <Link
            href="/"
            className="uppercase hover:underline underline-offset-2 decoration-[var(--c-fg)]/70 transition-colors duration-150"
            style={{ color: "var(--c-fg)", opacity: 1 }}
          >
            overview
          </Link>
        </div>

        {/* child pages — same indent */}
        <div className="flex flex-col gap-[5px]" style={{ paddingLeft: INDENT }}>
          {CHILDREN.map((page, i) => {
            const active = isActive(page.path);
            return (
              <div
                key={page.path}
                ref={(el) => { childRefs.current[i] = el; }}
              >
                <Link
                  href={page.path}
                  className={`uppercase transition-colors duration-150${active ? " hover:underline underline-offset-2 decoration-[var(--c-fg)]/70" : ""}`}
                  style={{ color: "var(--c-fg)", opacity: active ? 1 : 0.18 }}
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
