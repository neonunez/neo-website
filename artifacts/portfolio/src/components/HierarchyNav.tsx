import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";

const ARM_W     = 16;
const LABEL_GAP = 4;
const INDENT    = ARM_W + LABEL_GAP; // 20px — labels' paddingLeft

const DIM_ARM   = 0.15; // inactive child arm + label opacity
const DIM_SPINE = 0.10; // spine below active child

const CHILDREN = [
  { path: "/about",      label: "about me"   },
  { path: "/experience", label: "experience" },
  { path: "/projects",   label: "projects"   },
  { path: "/skills",     label: "skills"     },
  { path: "/languages",  label: "languages"  },
];

interface Geo {
  neoBottom:    number;
  overviewMid:  number;
  childMids:    number[];
  lastChildMid: number;
  svgW:         number;
  svgH:         number;
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

      const cTop  = c.getBoundingClientRect().top;
      const nRect = n.getBoundingClientRect();
      const oRect = o.getBoundingClientRect();

      const childMids = childRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return (r.top + r.bottom) / 2 - cTop;
      });

      const validMids = childMids.filter((m) => m > 0);
      const lastChildMid = validMids.length > 0 ? validMids[validMids.length - 1] : (oRect.top + oRect.bottom) / 2 - cTop;

      setGeo({
        neoBottom:    nRect.bottom - cTop,
        overviewMid:  (oRect.top + oRect.bottom) / 2 - cTop,
        childMids,
        lastChildMid,
        svgW: c.getBoundingClientRect().width,
        svgH: c.getBoundingClientRect().height,
      });
    }

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const activeMid = geo && activeIndex !== -1 ? geo.childMids[activeIndex] : null;

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
            {/* 1. Static L: neo → overview (always full opacity) */}
            <path
              d={`M 0 ${geo.neoBottom} L 0 ${geo.overviewMid} L ${ARM_W} ${geo.overviewMid}`}
              fill="none"
              stroke="var(--c-fg)"
              strokeWidth="1"
            />

            {/* 2a. Bright spine: overview → active child (full opacity) */}
            {activeMid != null && (
              <path
                d={`M 0 ${geo.overviewMid} L 0 ${activeMid}`}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
              />
            )}

            {/* 2b. Dim spine: active child → last child (or full spine when on overview) */}
            <path
              d={
                activeMid != null
                  ? `M 0 ${activeMid} L 0 ${geo.lastChildMid}`
                  : `M 0 ${geo.overviewMid} L 0 ${geo.lastChildMid}`
              }
              fill="none"
              stroke="var(--c-fg)"
              strokeWidth="1"
              opacity={DIM_SPINE}
            />

            {/* 3. Dim horizontal arm for every inactive child */}
            {geo.childMids.map((mid, i) => {
              if (i === activeIndex) return null;
              return (
                <path
                  key={i}
                  d={`M 0 ${mid} L ${ARM_W} ${mid}`}
                  fill="none"
                  stroke="var(--c-fg)"
                  strokeWidth="1"
                  opacity={DIM_ARM}
                />
              );
            })}

            {/* 4. Animated full-opacity arm for active child */}
            {activeMid != null && (
              <motion.path
                key={activeIndex}
                d={`M 0 ${activeMid} L ${ARM_W} ${activeMid}`}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
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
                  style={{ color: "var(--c-fg)", opacity: active ? 1 : DIM_ARM }}
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
