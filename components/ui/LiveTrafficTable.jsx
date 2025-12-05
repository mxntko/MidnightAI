"use client";

import { useEffect, useState } from "react";

export default function LiveTrafficTable() {
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic((prev) => {
        const newRow = {
          time: new Date().toLocaleTimeString(),
          ip: `192.168.0.${Math.floor(Math.random() * 255)}`,
          method: ["GET", "POST", "PUT"][Math.floor(Math.random() * 3)],
          status: [200, 302, 404, 500][Math.floor(Math.random() * 4)],
        };

        return [newRow, ...prev].slice(0, 10);
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-auto max-h-[400px]">
      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left py-2">Time</th>
            <th className="text-left">IP</th>
            <th className="text-left">Method</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {traffic.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              <td className="py-2">{row.time}</td>
              <td>{row.ip}</td>
              <td>{row.method}</td>
              <td className="font-semibold">
                {row.status === 200 ? (
                  <span className="text-green-400">{row.status}</span>
                ) : row.status < 400 ? (
                  <span className="text-yellow-400">{row.status}</span>
                ) : (
                  <span className="text-red-400">{row.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
