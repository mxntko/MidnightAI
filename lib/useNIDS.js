"use client";
import { useEffect, useState } from "react";

export default function useNIDS(interval = 3000) {
    const [traffic, setTraffic] = useState([]);
    const [latestAttack, setLatestAttack] = useState(null);
    const [stats, setStats] = useState({
        totalTraffic: 0,
        totalAttacks: 0,
        avgAnomaly: 0
    });

    // ==========================
    // FETCH DATA EVERY X SECONDS
    // ==========================
    async function fetchData() {
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    packet: {
                        ip: "192.168.1.20",
                        bytes: Math.floor(Math.random() * 200000),
                        method: "POST",
                        path: "/login",
                        userAgent: "Mozilla"
                    }
                })
            });

            const data = await res.json();
            if (!data.success) return;

            const result = data.result;

            // Tambahkan ke grafik
            setTraffic(prev => [...prev, {
                time: new Date().toLocaleTimeString(),
                bytes: result.bytes
            }].slice(-20));

            // Jika attackType bukan "Normal Traffic", masukkan log
            if (result.attackType !== "Normal Traffic") {
                setLatestAttack(prev => [result, ...(prev || [])].slice(0, 10));
            }

            setStats(prev => ({
                totalTraffic: prev.totalTraffic + result.bytes,
                totalAttacks:
                    prev.totalAttacks +
                    (result.attackType !== "Normal Traffic" ? 1 : 0),
                avgAnomaly: Number(
                    ((prev.avgAnomaly + result.anomalyScore) / 2).toFixed(2)
                )
            }));
        } catch (err) {
            console.log("NIDS Fetch Error:", err);
        }
    }

    useEffect(() => {
        fetchData(); // run first time
        const timer = setInterval(fetchData, interval);
        return () => clearInterval(timer);
    }, []);

    return { traffic, latestAttack, stats };
}
