"use client";

export default function AttackLog({ logs = [] }) {
  const safe = Array.isArray(logs) ? logs : [];
  if (safe.length === 0) return <p className="text-slate-400">No attacks detected.</p>;
  return (
    <div className="space-y-2">
      {safe.map((l, idx) => (
        <div key={idx} className="p-2 rounded-md bg-[#071427] border border-slate-800">
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold text-purple-300">{l.attackType}</div>
            <div className="text-xs text-slate-400">{new Date(l.timestamp).toLocaleTimeString()}</div>
          </div>
          <div className="text-xs text-slate-300 mt-1">IP: {l.ip} • Bytes: {l.bytes}</div>
        </div>
      ))}
    </div>
  );
}
