"use client";

import React, { useEffect, useRef } from "react";

export default function ThreatMap({ onThreatDetected }) {
  const canvasRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 900;
    canvas.height = 450;

    function drawWorld() {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#6E00FF55";
      for (let i = 0; i < 120; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    function attackPulse() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      ctx.beginPath();
      ctx.fillStyle = "#ff004080";
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();

      if (onThreatDetected) {
        onThreatDetected("🌍 Global threat ping detected");
      }
    }

    drawWorld();

    const interval = setInterval(attackPulse, 1500);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} width={900} height={450} className="w-full rounded-xl" />;
}
