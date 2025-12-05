// components/TrafficWaveform.jsx
"use client";

import { useEffect, useRef } from "react";

export default function TrafficWaveform({ data = [], height = 120 }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function draw() {
      const w = (c.width = c.clientWidth * dpr);
      const h = (c.height = height * dpr);
      c.style.height = `${height}px`;

      ctx.clearRect(0, 0, w, h);
      // baseline style
      ctx.lineWidth = 2 * dpr;
      ctx.strokeStyle = "#22D3EE";
      ctx.beginPath();

      const len = Math.max(1, Math.min(60, data.length || 40));
      for (let i = 0; i < len; i++) {
        const sample = data[i] || Math.floor(10 + Math.sin(i/3 + Date.now()/600)*40 + Math.random()*10);
        const x = (i / (len - 1 || 1)) * w;
        const v = Math.min(1, (sample || 0) / 200000);
        const y = h - v * h * 0.9;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // fill gradient
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(34,211,238,0.16)");
      g.addColorStop(1, "rgba(34,211,238,0.02)");
      ctx.fillStyle = g;
      ctx.fill();
    }

    let raf = requestAnimationFrame(function tick() {
      draw();
      raf = requestAnimationFrame(tick);
    });

    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", draw);
    };
  }, [data, height]);

  return <canvas ref={ref} className="w-full rounded-lg bg-transparent" />;
}
