"use client";

import { useEffect, useRef } from "react";

export default function ConfidenceBars({ latest }) {
  const ref = useRef(null);
  const score = latest?.anomalyScore ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width = `${Math.min(100, (score || 0) * 100)}%`;
  }, [score]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">AI Confidence</h3>
      <div className="w-full bg-[#081226] rounded h-4">
        <div ref={ref} className="h-4 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded" style={{ width: `${Math.min(100, score * 100)}%`, transition: "width 400ms ease" }} />
      </div>
      <div className="text-sm mt-2 text-slate-300">Score: {(score || 0).toFixed(2)}</div>
    </div>
  );
}
