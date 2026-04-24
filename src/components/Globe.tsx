import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

const markers = [
  { id: "ar", code: "ar", language: "Spanish", level: "Native", lat: -38.4161, lon: -63.6167 },
  { id: "gb", code: "gb-eng", language: "English", level: "C1 · Cambridge", lat: 55.0, lon: -4.0 },
  { id: "de", code: "de", language: "German", level: "B2 · Goethe", lat: 53.0, lon: 14.0 },
  { id: "fr", code: "fr", language: "French", level: "B2 · Alliance Fr.", lat: 43.0, lon: -2.0 },
  { id: "br", code: "br", language: "Portuguese", level: "A2 · Learning", lat: -14.235, lon: -51.9253 },
  { id: "it", code: "it", language: "Italian", level: "B1 · Dante Aligh.", lat: 39.0, lon: 16.0 },
  { id: "us", code: "us", language: "English", level: "I can adapt to the accent ;)", lat: 37.0902, lon: -95.7129 },
  { id: "au", code: "au", language: "English", level: "I can adapt to the accent mate ;)", lat: -25.2744, lon: 133.7751 },
  {
    id: "jp",
    code: "jp",
    language: "Japanese",
    level: "Planning to learn",
    lat: 36.2048,
    lon: 138.2529,
    planned: true,
  },
  {
    id: "ru",
    code: "ru",
    language: "Russian",
    level: "Planning to learn",
    lat: 61.524,
    lon: 105.3188,
    planned: true,
  },
];

export function Globe({ className }: { className?: string }) {
  const { theme } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  useEffect(() => {
    if (!hoveredMarker) return;
    const onDocPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setHoveredMarker(null);
        isHoveredRef.current = false;
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [hoveredMarker]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let phi = 0;
    let currentWidth = 0;
    let pointerInteracting: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting = e.clientX;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
      setHoveredMarker(null);
      isHoveredRef.current = false;
    };

    const onPointerUp = () => {
      pointerInteracting = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting !== null) {
        const delta = e.clientX - pointerInteracting;
        phi += delta / 200;
        pointerInteracting = e.clientX;
      }
    };

    const precomputedMarkers = markers.map((marker) => {
      const latRad = marker.lat * (Math.PI / 180);
      const lonRad = marker.lon * (Math.PI / 180);
      return {
        ...marker,
        xBase: Math.cos(latRad) * Math.cos(lonRad),
        yBase: Math.sin(latRad),
        zBase: -Math.cos(latRad) * Math.sin(lonRad),
      };
    });

    currentWidth = containerRef.current.getBoundingClientRect().width;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        currentWidth = entries[0].contentRect.width;
      }
    });
    resizeObserver.observe(containerRef.current);

    const onVisibilityChange = () => {
      if (document.hidden) onPointerUp();
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("blur", onPointerUp);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const globe = createGlobe(canvas, {
      devicePixelRatio: window.devicePixelRatio || 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: theme === "dark" ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: theme === "dark" ? [0.1, 0.1, 0.1] : [1, 1, 1],
      markerColor: theme === "dark" ? [0.1, 0.1, 0.3] : [0.3, 0.3, 0.8],
      glowColor: theme === "dark" ? [0.15, 0.15, 0.15] : [0.9, 0.9, 0.9],
      markers: [],
    });

    let reqId: number;

    const render = () => {
      if (!isHoveredRef.current && pointerInteracting === null) {
        phi += 0.003;
      }
      globe.update({ phi });

      if (currentWidth > 0) {
        precomputedMarkers.forEach((marker, i) => {
          const badge = badgesRef.current[i];
          if (!badge) return;

          const xRot = Math.cos(phi) * marker.xBase + Math.sin(phi) * marker.zBase;
          const yRot = marker.yBase;
          const zRot = -Math.sin(phi) * marker.xBase + Math.cos(phi) * marker.zBase;

          let progress = Math.max(0, Math.min(1, (zRot + 0.05) / 0.2));

          if (progress === 0) {
            if (badge.style.display !== "none") badge.style.display = "none";
            return;
          }

          if (badge.style.display === "none") badge.style.display = "flex";

          progress = progress * progress * (3 - 2 * progress);

          const radius = 0.8;
          const c = xRot * radius;
          const s = yRot * radius;

          const screenX = ((c + 1) / 2) * currentWidth;
          const screenY = ((-s + 1) / 2) * currentWidth;

          badge.style.opacity = progress.toString();
          badge.style.pointerEvents = progress > 0.5 ? "auto" : "none";

          const blurAmount = (1 - progress) * 4;
          badge.style.filter = `blur(${blurAmount}px)`;

          const yOffset = (1 - progress) * 12;

          badge.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) translate(${screenX}px, ${screenY}px)`;

          const scale = (0.8 + zRot * 0.2) * (0.5 + progress * 0.5);
          badge.style.transform += ` scale(${scale})`;
          badge.style.zIndex = Math.round(zRot * 100).toString();
        });
      }

      reqId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      globe.destroy();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-[600px] aspect-square mx-auto animate-globe-intro opacity-0", className)}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: theme === "dark" ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 65%)" : "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, transparent 65%)" }} 
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab touch-pan-y"
        style={{ contain: "layout paint size" }}
        role="img"
        aria-label="Interactive 3D globe showing Neo's multi-lingual proficiency and planned travels"
      />
      {markers.map((marker, i) => (
        <div
          key={marker.id}
          ref={(el) => {
            badgesRef.current[i] = el;
          }}
          className="absolute top-0 left-0 flex flex-col items-center"
          style={{ opacity: 0 }}
        >
          <div
            className="flex flex-col items-center animate-badge-intro opacity-0 group"
            style={{ animationDelay: `${i * 60 + 200}ms` }}
          >
            <div
              className={cn(
                "flex flex-col items-center transition-opacity duration-300",
                hoveredMarker && hoveredMarker !== marker.id ? "opacity-20" : "opacity-100",
              )}
            >
              <AnimatePresence>
                {hoveredMarker === marker.id && (
                  <motion.div
                    initial={{ opacity: 0, x: "-50%", y: 10, scale: 0.9, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: "-50%", y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: "-50%", y: 5, scale: 0.95, filter: "blur(2px)" }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    className="absolute -top-11 left-1/2 px-3 py-1.5 bg-[var(--c-elevated)]/90 backdrop-blur-md rounded-md border border-[var(--c-border-strong)] font-mono text-[11px] whitespace-nowrap z-30 flex gap-2 items-center pointer-events-none shadow-lg"
                  >
                    <span className="text-[var(--c-fg)] font-medium">{marker.language}</span>
                    <span className="text-[var(--c-faint)]">·</span>
                    <span className="text-[var(--c-muted)]">{marker.level}</span>
                    <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--c-elevated)] backdrop-blur-md border-b border-r border-[var(--c-border-strong)] rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={cn(
                  "p-1 bg-[var(--c-elevated)] border mb-1 relative flex items-center justify-center transition-all duration-300 ease-out cursor-pointer",
                  hoveredMarker === marker.id ? (theme === "dark" ? "scale-110 shadow-[0_0_15px_rgba(255,255,255,0.15)] z-10" : "scale-110 shadow-[0_0_15px_rgba(0,0,0,0.15)] z-10") : "z-0",
                  marker.planned ? "border-[var(--c-border-strong)] border-dashed" : "border-[var(--c-border)]",
                )}
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setHoveredMarker(marker.id);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setHoveredMarker(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hoveredMarker === marker.id) {
                    setHoveredMarker(null);
                    isHoveredRef.current = false;
                  } else {
                    setHoveredMarker(marker.id);
                    isHoveredRef.current = true;
                  }
                }}
              >
                <div className="relative w-6 h-4">
                  <img
                    src={`https://flagcdn.com/${marker.code}.svg`}
                    alt={`${marker.language} flag`}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-300",
                      marker.planned && "grayscale opacity-30",
                    )}
                  />
                  {marker.planned && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-3 w-3 text-[var(--c-fg)] opacity-80"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "absolute left-1/2 -bottom-1 w-2 h-2 bg-[var(--c-elevated)] border-b border-r transform -translate-x-1/2 rotate-45",
                    marker.planned ? "border-[var(--c-border-strong)] border-dashed" : "border-[var(--c-border)]",
                  )}
                />
              </div>

              <div className="relative flex items-center justify-center mt-0.5">
                <div className={cn("w-1 h-1 bg-[var(--c-faint)]", marker.planned && "animate-ping absolute")} />
                {marker.planned && <div className="w-1 h-1 bg-[var(--c-faint)] relative" />}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
