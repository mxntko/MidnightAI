"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TrafficChart({ data }) {
  return (
    <div className="bg-[#1E293B] p-4 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-xl mb-4 font-semibold text-indigo-300">Network Traffic (Realtime)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="traffic" stroke="#22D3EE" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
