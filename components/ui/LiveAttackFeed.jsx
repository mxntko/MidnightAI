"use client";

import { useEffect, useState } from "react";

const attackTypes = [
    "Port Scanning",
    "SQL Injection",
    "DDoS Attempt",
    "Unauthorized Login",
    "XSS Payload",
    "Suspicious Traffic Spike",
];

export default function LiveAttackFeed() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.6) {
                const newAttack = {
                    time: new Date().toLocaleTimeString(),
                    type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
                    ip: `10.0.0.${Math.floor(Math.random() * 255)}`,
                };

                setLogs((prev) => [newAttack, ...prev].slice(0, 10));
            }
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-2 max-h-[400px] overflow-auto">
            {logs.map((log, i) => (
                <div
                    key={i}
                    className="p-3 bg-red-900/40 border border-red-700 rounded-lg"
                >
                    <p className="text-sm">
                        <span className="font-bold text-red-300">{log.type}</span>
                    </p>
                    <p className="text-xs text-gray-300">
                        {log.ip} — {log.time}
                    </p>
                </div>
            ))}

            {logs.length === 0 && (
                <p className="text-gray-500 text-sm">Menunggu aktivitas serangan...</p>
            )}
        </div>
    );
}
