"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const bubbles: Bubble[] = [];

    interface Bubble {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
    }

    const createBubbles = (count: number) => {
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 10 + Math.random() * 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };

    createBubbles(60);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#1e0f3d"; // dark purple background
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move bubble
        b.x += b.vx;
        b.y += b.vy;

        // Wrap around screen
        if (b.x > width) b.x = 0;
        if (b.x < 0) b.x = width;
        if (b.y > height) b.y = 0;
        if (b.y < 0) b.y = height;
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Mouse effect
    const handleMouse = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      bubbles.forEach(b => {
        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          b.vx += dx * 0.0005;
          b.vy += dy * 0.0005;
        }
      });
    };

    window.addEventListener("mousemove", handleMouse);

    // Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
}
