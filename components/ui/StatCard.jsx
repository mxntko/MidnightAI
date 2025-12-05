"use client";

export default function StatCard({ title, value, desc }) {
  return (
    <div className="bg-[#0b1220] p-4 rounded-lg border border-gray-800">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold mt-2">{value ?? "--"}</div>
      <div className="text-xs text-gray-500 mt-1">{desc}</div>
    </div>
  );
}
