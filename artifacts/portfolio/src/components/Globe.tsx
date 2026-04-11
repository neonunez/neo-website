import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const markers = [
  { id: "ar", code: "ar", language: "Spanish", level: "Native", lat: -38.4161, lon: -63.6167 },
  { id: "br", code: "br", language: "Portuguese", level: "Native-level", lat: -14.235, lon: -51.9253 },
  { id: "gb", code: "gb-eng", language: "English", level: "C1 · Cambridge", lat: 55.0, lon: -4.0 },
  { id: "fr", code: "fr", language: "French", level: "B2 · Alliance Fr.", lat: 43.0, lon: -2.0 },
  { id: "de", code: "de", language: "German", level: "B2 · Goethe", lat: 53.0, lon: 14.0 },
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

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

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        currentWidth = entries[0].contentRect.width;
      }
    });
    resizeObserver.observe(containerRef.current);

    const canvas = canvasRef.current;
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const globe = createGlobe(canvas, {
      devicePixelRatio: window.devicePixelRatio || 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.1, 0.1, 0.3],
      glowColor: [0.15, 0.15, 0.15],
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

          let progress = Math.max(0, Math.min(1, (zRot + 0.15) / 0.3));

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

          const blurAmount = (1 - progress) * 8;
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
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      globe.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-[600px] aspect-square mx-auto animate-globe-intro opacity-0", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_65%)] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab touch-pan-y"
        style={{ contain: "layout paint size" }}
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
            style={{ animationDelay: `${i * 150 + 600}ms` }}
          >
            <div
              className={cn(
                "flex flex-col items-center transition-opacity duration-300",
                hoveredMarker && hoveredMarker !== marker.id ? "opacity-20" : "opacity-100",
              )}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 bg-[#0a0a0a] border border-white/10 font-mono text-[10px] whitespace-nowrap z-20 flex gap-1.5 items-center pointer-events-none">
                <span className="text-white font-medium">{marker.language}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">{marker.level}</span>
              </div>

              <div
                className={cn(
                  "p-1 bg-[#0a0a0a] border mb-1 relative flex items-center justify-center transition-all duration-200 group-hover:scale-110 cursor-pointer",
                  marker.planned ? "border-white/20 border-dashed" : "border-white/10",
                )}
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setHoveredMarker(marker.id);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setHoveredMarker(null);
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
                        className="animate-spin h-3 w-3 text-white/80"
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
                    "absolute left-1/2 -bottom-1 w-2 h-2 bg-[#0a0a0a] border-b border-r transform -translate-x-1/2 rotate-45",
                    marker.planned ? "border-white/20 border-dashed" : "border-white/10",
                  )}
                />
              </div>

              <div className="relative flex items-center justify-center mt-0.5">
                <div className={cn("w-1 h-1 bg-white/40", marker.planned && "animate-ping absolute")} />
                {marker.planned && <div className="w-1 h-1 bg-white/40 relative" />}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
