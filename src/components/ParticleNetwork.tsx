import React, { useEffect, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = Math.random() * 1.5 + 0.5;
  }

  update(mouseX: number | null, mouseY: number | null) {
    // Wall bounces
    if (this.x < 0 || this.x > this.canvasWidth) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.canvasHeight) this.vy = -this.vy;

    this.x += this.vx;
    this.y += this.vy;

    // Mouse interaction (repel slightly)
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = 100;

      if (distance < minDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (minDistance - distance) / minDistance;
        this.x -= Math.cos(angle) * force * 2;
        this.y -= Math.sin(angle) * force * 2;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = usePortfolio();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    // Set colors based on theme
    const dotColor = theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)";
    const getLineColor = (opacity: number) =>
      theme === "dark" ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;

    const isMobile = () => window.innerWidth < 768;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const rawCount = Math.floor((canvas.width * canvas.height) / 12000);
      const particleCount = isMobile() ? Math.min(rawCount, 20) : rawCount;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOut = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Initial setup
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update(mouseX, mouseY);
        p.draw(ctx, dotColor);
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = getLineColor(opacity);
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }

        // Draw mouse lines
        if (mouseX !== null && mouseY !== null) {
          const dMouseX = particles[i].x - mouseX;
          const dMouseY = particles[i].y - mouseY;
          const distanceToMouse = Math.sqrt(dMouseX * dMouseX + dMouseY * dMouseY);

          if (distanceToMouse < 150) {
            const opacity = (1 - distanceToMouse / 150) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = getLineColor(opacity);
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes to update canvas colors

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
}
