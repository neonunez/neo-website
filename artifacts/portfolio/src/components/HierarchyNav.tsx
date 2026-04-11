import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";

const ARM_W     = 16;
const LABEL_GAP = 4;
const INDENT    = ARM_W + LABEL_GAP; // 20px — labels' paddingLeft

const DIM_ARM   = 0.15; // inactive child arm + label opacity
const DIM_SPINE = 0.10; // spine below active child

const PROJECTS = [
  { id: "llm-academic-wiki", label: "llm-academic-wiki", path: "/projects/llm-academic-wiki" },
  { id: "llm-server",        label: "llm-server",        path: "/projects/llm-server" },
  { id: "voiceflow",         label: "VoiceFlow",         path: "/projects/voiceflow" },
  { id: "enterprise-rag",    label: "Enterprise RAG System", path: "/projects/rag-system" },
  { id: "focuspad",          label: "FocusPad",          path: "/projects/focuspad" },
];

interface Geo {
  neoBottom:    number;
  overviewMid:  number;
  childMids:    number[];
  lastChildMid: number;
  svgW:         number;
  svgH:         number;
  subParentMid?: number | null;
  subParentRight?: number | null;
  subCLeft?:    number | null;
  subItemMids?: number[];
  lastSubItemMid?: number | null;
}

export function HierarchyNav({ isMobile }: { isMobile?: boolean } = {}) {
  const [location] = useLocation();
  const { tr } = usePortfolio();

  const CHILDREN = [
    { path: "/about",      label: tr.navAboutMe   },
    { path: "/experience", label: tr.navExperience },
    { path: "/projects",   label: tr.navProjects   },
    { path: "/skills",     label: "skills"     },
    { path: "/languages",  label: tr.sectionLanguages  },
  ];

  const LANGUAGES = [
    { id: "spanish",    label: tr.langSpanish,    path: "/languages/spanish" },
    { id: "portuguese", label: tr.langPortuguese, path: "/languages/portuguese" },
    { id: "english",    label: tr.langEnglish,    path: "/languages/english" },
    { id: "french",     label: tr.langFrench,     path: "/languages/french" },
    { id: "german",     label: tr.langGerman,     path: "/languages/german" },
    { id: "italian",    label: tr.langItalian,    path: "/languages/italian" },
  ];

  const isActive = (path: string) =>
    location === path || location.startsWith(path + "/");

  const activeIndex = CHILDREN.findIndex((p) => isActive(p.path));

  const activeParentIsProjects = isActive("/projects");
  const activeParentIsLanguages = isActive("/languages");
  const activeSubItems = activeParentIsProjects ? PROJECTS : activeParentIsLanguages ? LANGUAGES : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const neoRef       = useRef<HTMLSpanElement>(null);
  const overviewRef  = useRef<HTMLDivElement>(null);
  const childRefs    = useRef<(HTMLDivElement | null)[]>(
    new Array(CHILDREN.length).fill(null)
  );

  const subContainerRef = useRef<HTMLDivElement>(null);
  const subItemRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    function measure() {
      const c = containerRef.current;
      const n = neoRef.current;
      const o = overviewRef.current;
      if (!c || !n || !o) return;

      const cTop  = c.getBoundingClientRect().top;
      const cLeft = c.getBoundingClientRect().left;
      const nRect = n.getBoundingClientRect();
      const oRect = o.getBoundingClientRect();

      const childMids = childRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return (r.top + r.bottom) / 2 - cTop;
      });

      const validMids = childMids.filter((m) => m > 0);
      const lastChildMid = validMids.length > 0 ? validMids[validMids.length - 1] : (oRect.top + oRect.bottom) / 2 - cTop;

      let subParentMid = null;
      let subParentRight = null;
      if (activeIndex !== -1 && childRefs.current[activeIndex]) {
        const r = childRefs.current[activeIndex]!.getBoundingClientRect();
        subParentMid = (r.top + r.bottom) / 2 - cTop;
        subParentRight = r.right - cLeft;
      }

      let subCLeft = null;
      if (subContainerRef.current) {
        subCLeft = subContainerRef.current.getBoundingClientRect().left - cLeft;
      }

      const subItemMids = subItemRefs.current.slice(0, activeSubItems.length).map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return (r.top + r.bottom) / 2 - cTop;
      });

      const validSubMids = subItemMids.filter(m => m > 0);
      const lastSubItemMid = validSubMids.length > 0 ? validSubMids[validSubMids.length - 1] : null;

      setGeo({
        neoBottom:    nRect.bottom - cTop,
        overviewMid:  (oRect.top + oRect.bottom) / 2 - cTop,
        childMids,
        lastChildMid,
        svgW: c.getBoundingClientRect().width,
        svgH: c.getBoundingClientRect().height,
        subParentMid,
        subParentRight,
        subCLeft,
        subItemMids,
        lastSubItemMid,
      });
    }

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [activeIndex, activeSubItems.length]);

  const activeMid = geo && activeIndex !== -1 ? geo.childMids[activeIndex] : null;

  const extraPadding = isMobile && activeSubItems.length > 0 ? " pb-[140px]" : "";

  return (
    <div className={isMobile ? `py-6 mt-8 pl-4${extraPadding}` : "fixed left-7 top-[80px] z-30 hidden xl:block py-6"}>
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

            {/* 2a. Bright spine: overview → active child at x=ARM_W (full opacity) */}
            {activeMid != null && (
              <path
                d={`M ${ARM_W} ${geo.overviewMid} L ${ARM_W} ${activeMid}`}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
              />
            )}

            {/* 2b. Dim spine: active child → last child at x=ARM_W (or full spine on overview) */}
            <path
              d={
                activeMid != null
                  ? `M ${ARM_W} ${activeMid} L ${ARM_W} ${geo.lastChildMid}`
                  : `M ${ARM_W} ${geo.overviewMid} L ${ARM_W} ${geo.lastChildMid}`
              }
              fill="none"
              stroke="var(--c-fg)"
              strokeWidth="1"
              opacity={DIM_SPINE}
            />

            {/* 3. Dim horizontal arm for every inactive child (from x=ARM_W to x=ARM_W*2) */}
            {geo.childMids.map((mid, i) => {
              if (i === activeIndex) return null;
              return (
                <path
                  key={i}
                  d={`M ${ARM_W} ${mid} L ${ARM_W * 2} ${mid}`}
                  fill="none"
                  stroke="var(--c-fg)"
                  strokeWidth="1"
                  opacity={DIM_ARM}
                />
              );
            })}

            {/* 4. Animated full-opacity arm for active child (from x=ARM_W to x=ARM_W*2) */}
            {activeMid != null && (
              <motion.path
                key={activeIndex}
                d={`M ${ARM_W} ${activeMid} L ${ARM_W * 2} ${activeMid}`}
                fill="none"
                stroke="var(--c-fg)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}

            {/* 5. Sub-items drawing */}
            {geo.subItemMids && geo.subItemMids.length > 0 && geo.subParentMid !== null && geo.subParentRight !== null && geo.subCLeft !== null && (
              <>
                {(() => {
                  if (geo.subParentRight == null || geo.subCLeft == null) return null;
                  
                  const X_start = geo.subParentRight + 6;
                  const X_end = geo.subCLeft - 6;
                  const spineX = (X_start + X_end) / 2;

                  if (X_start >= X_end) return null;

                  const activeSubIndex = activeSubItems.findIndex((p) => location === p.path);
                  const activeSubMid = activeSubIndex !== -1 ? geo.subItemMids[activeSubIndex] : null;

                  return (
                    <>
                      {/* Bridge from parent to sub-spine */}
                      <path
                        d={`M ${X_start} ${geo.subParentMid} L ${spineX} ${geo.subParentMid}`}
                        fill="none"
                        stroke="var(--c-fg)"
                        strokeWidth="1"
                        opacity={activeSubMid != null ? 1 : DIM_ARM}
                      />
                      
                      {/* Full dim sub-spine */}
                      {geo.lastSubItemMid !== null && (
                        <path
                          d={`M ${spineX} ${geo.subParentMid} L ${spineX} ${geo.lastSubItemMid}`}
                          fill="none"
                          stroke="var(--c-fg)"
                          strokeWidth="1"
                          opacity={DIM_SPINE}
                        />
                      )}

                      {/* Overwrite bright partial spine from parent to active sub-item */}
                      {activeSubMid != null && (
                        <path
                          d={`M ${spineX} ${geo.subParentMid} L ${spineX} ${activeSubMid}`}
                          fill="none"
                          stroke="var(--c-fg)"
                          strokeWidth="1"
                          opacity={1}
                        />
                      )}

                      {/* Sub-item horizontal limbs */}
                      {geo.subItemMids.map((mid, i) => {
                        if (mid === 0) return null;
                        if (i === activeSubIndex) return null; // drawn separately
                        return (
                          <path
                            key={`sub-${i}`}
                            d={`M ${spineX} ${mid} L ${X_end} ${mid}`}
                            fill="none"
                            stroke="var(--c-fg)"
                            strokeWidth="1"
                            opacity={DIM_ARM}
                          />
                        );
                      })}

                      {/* Active sub-item animated bright limb */}
                      {activeSubMid != null && (
                        <motion.path
                          key={`sub-active-${activeSubIndex}`}
                          d={`M ${spineX} ${activeSubMid} L ${X_end} ${activeSubMid}`}
                          fill="none"
                          stroke="var(--c-fg)"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      )}
                    </>
                  );
                })()}
              </>
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
            className={`uppercase transition-colors duration-150 pb-px ${location === "/" ? "" : "link-anim"}`}
            style={{ color: "var(--c-fg)", opacity: 1 }}
          >
            {tr.navOverview}
          </Link>
        </div>

        {/* child pages — double-indented (children of overview) */}
        <div className="flex flex-col gap-[5px]" style={{ paddingLeft: INDENT * 2 }}>
          {CHILDREN.map((page, i) => {
            const active = isActive(page.path);
            const isSubParent = page.path === "/projects" || page.path === "/languages";
            
            return (
              <div key={page.path} className="relative flex flex-row items-start">
                <div ref={(el) => { childRefs.current[i] = el; }}>
                  <Link
                    href={page.path}
                    className={`uppercase transition-colors duration-150 pb-px ${active ? "opacity-100" : "opacity-[0.15] hover:opacity-100 link-anim"}`}
                    style={{ color: "var(--c-fg)" }}
                  >
                    {page.label}
                  </Link>
                </div>

                {/* Dynamic sub header for projects/languages */}
                {isSubParent && active && activeSubItems.length > 0 && (
                  <div 
                    ref={subContainerRef}
                    className="absolute left-[90px] top-0 flex flex-col gap-[5px]"
                  >
                    {activeSubItems.map((item, pI) => {
                      const isSubActive = location === item.path;
                      return (
                        <div key={item.id} ref={(el) => { subItemRefs.current[pI] = el; }}>
                          <Link 
                            href={item.path}
                            className={`transition-all duration-150 whitespace-nowrap pb-px ${isSubActive ? "font-semibold opacity-100" : "opacity-[0.15] hover:opacity-100 link-anim"}`}
                            style={{ color: "var(--c-fg)" }}
                          >
                            {item.label}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
