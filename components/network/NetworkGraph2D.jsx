// components/NetworkGraph2D.jsx
"use client";

import { useEffect, useRef } from "react";

export default function NetworkGraph2D({ nodes = 30, height = 260 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    function resize() {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = height * dpr;
      canvas.style.height = `${height}px`;
    }
    resize();

    const points = Array.from({ length: nodes }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // background subtle gradient
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, "rgba(8,12,20,0.5)");
      g.addColorStop(1, "rgba(5,7,12,0.5)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw links
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 140 * dpr) {
            ctx.strokeStyle = `rgba(130,56,179,${1 - dist/(140*dpr)})`; // grape
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (let p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = "#8b5cf6";
        ctx.arc(p.x, p.y, 2.2 * dpr, 0, Math.PI*2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [nodes, height]);

  return <canvas ref={ref} className="w-full rounded-lg" />;
}
