"use client";

import React, { useEffect, useRef } from "react";

export default function Waveform({ onThreatDetected }) {
  const canvasRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return; 
    mounted.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width;
    let height = canvas.height;
    let frame = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#6E00FF";

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x + frame) * 0.03) * 40;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      // Simulasi threat
      if (Math.random() < 0.002 && onThreatDetected) {
        onThreatDetected("⚠ Traffic anomaly detected on waveform");
      }

      frame += 2;
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} width={900} height={200} className="w-full rounded-lg" />;
}
