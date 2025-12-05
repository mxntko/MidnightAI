"use client";

import { useEffect, useRef } from "react";

export default function AttackTimeline({ logs = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // simple fade-in animation by class toggle
    el.querySelectorAll(".timeline-item").forEach((item, idx) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(8px)";
      setTimeout(() => {
        item.style.transition = "all 400ms ease-out";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 80 * idx);
    });
  }, [logs]);

  return (
    <div ref={ref} className="space-y-3 max-h-64 overflow-y-auto">
      {logs.length === 0 ? <p className="text-slate-400">No timeline events</p> : (
        logs.map((l, i) => (
          <div key={l.id ?? i} className="timeline-item p-2 rounded-md bg-[#071427] border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-200 font-semibold">{l.attackType}</div>
              <div className="text-xs text-slate-400">{new Date(l.timestamp).toLocaleTimeString()}</div>
            </div>
            <div className="text-xs text-slate-400 mt-1">IP: {l.ip} • Score: {l.anomalyScore}</div>
          </div>
        ))
      )}
    </div>
  );
}
