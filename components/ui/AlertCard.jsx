"use client";

export default function AlertCard({ alert }) {
  if (!alert) return <div className="p-3 rounded-md bg-[#061024] text-slate-400">No active alerts</div>;
  return (
    <div className="p-3 rounded-md bg-[#0b1220] border-l-4 border-grape-500">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-purple-200 font-bold">{alert.attackType}</div>
          <div className="text-xs text-slate-400 mt-1">IP: {alert.ip}</div>
        </div>
        <div className="text-xs text-slate-400">{new Date(alert.timestamp).toLocaleTimeString()}</div>
      </div>
      <div className="mt-2 text-xs text-slate-300">Anomaly score: {(alert.anomalyScore || 0).toFixed(2)}</div>
    </div>
  );
}
