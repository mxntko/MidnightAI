"use client";

import React, { useEffect, useRef } from "react";

export default function NetworkGraph({ onThreatDetected }) {
  const canvasRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 900;
    canvas.height = 400;

    const nodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw links
      ctx.strokeStyle = "#6E00FF33";
      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (i === j) return;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "#BB86FC";
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Random threat
      if (Math.random() < 0.001 && onThreatDetected) {
        onThreatDetected("🔗 Suspicious lateral movement inside network graph");
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} width={900} height={400} className="w-full rounded-xl" />;
}
