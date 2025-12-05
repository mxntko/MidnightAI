"use client";

import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
    const chartRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const [stats, setStats] = useState({
        totalTraffic: null,
        detectedThreats: null,
        activeConnections: null,
        modelAccuracy: null,
    });

    const [feed, setFeed] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [pendingThreat, setPendingThreat] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [health, setHealth] = useState({ cpu: 27, ram: 62, disk: 45 });

    useEffect(() => {
        const data = {
            totalTraffic: JSON.parse(localStorage.getItem("totalTraffic") || "0"),
            detectedThreats: JSON.parse(localStorage.getItem("detectedThreats") || "0"),
            activeConnections: JSON.parse(localStorage.getItem("activeConnections") || "0"),
            modelAccuracy: JSON.parse(localStorage.getItem("modelAccuracy") || "00.0"),
            feed: JSON.parse(localStorage.getItem("feed") || "null"),
            graphData: JSON.parse(localStorage.getItem("graphData") || "[3,6,4,10,7,12,9,14]"),
        };

        if (!data.feed) {
            data.feed = [
                { text: "[AI] Model Initialized…", threat: false },
                { text: "[Traffic] 2200 packets scanned", threat: false },
                { text: "[Threat] No anomalies detected", threat: false },
                { text: "[System] CPU load stable at 27%", threat: false },
            ];
        }

        setStats({
            totalTraffic: data.totalTraffic,
            detectedThreats: data.detectedThreats,
            activeConnections: data.activeConnections,
            modelAccuracy: data.modelAccuracy,
        });

        setFeed(data.feed);
        setGraphData(data.graphData);
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        localStorage.setItem("totalTraffic", JSON.stringify(stats.totalTraffic));
        localStorage.setItem("detectedThreats", JSON.stringify(stats.detectedThreats));
        localStorage.setItem("activeConnections", JSON.stringify(stats.activeConnections));
        localStorage.setItem("modelAccuracy", JSON.stringify(stats.modelAccuracy));

        localStorage.setItem("feed", JSON.stringify(feed));
        localStorage.setItem("graphData", JSON.stringify(graphData));
    }, [isReady, stats, feed, graphData]);

    const drawChart = (data) => {
        if (!chartRef.current || !data?.length) return;

        const canvas = chartRef.current;
        const ctx = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(300, Math.floor(rect.width));
        canvas.height = 220;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 12;
        const w = canvas.width - padding * 2;
        const h = canvas.height - padding * 2;

        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = Math.max(1, maxValue - minValue);

        const points = data.map((v, i) => {
            const x = padding + (i / (data.length - 1)) * w;
            const y = padding + h - ((v - minValue) / range) * h;
            return { x, y };
        });

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#00FFC6";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const cx = (p0.x + p1.x) / 2;
            ctx.quadraticCurveTo(p0.x, p0.y, cx, (p0.y + p1.y) / 2);
        }

        ctx.lineTo(points.at(-1).x, points.at(-1).y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[0].x, canvas.height - padding);
        points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points.at(-1).x, canvas.height - padding);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, "rgba(0,255,198,0.07)");
        grad.addColorStop(1, "rgba(127,0,255,0.02)");
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#00FFC6";
        ctx.arc(points.at(-1).x, points.at(-1).y, 3.5, 0, Math.PI * 2);
        ctx.fill();
    };

    useEffect(() => {
        if (!isReady) return;
        drawChart(graphData);
        const onResize = () => drawChart(graphData);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [isReady, graphData]);

    useEffect(() => {
        if (!isReady) return;
        const interval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            const inc = Math.floor(Math.random() * 3000) + 500;
            const attack = Math.random() < 0.45;

            setStats((s) => ({
                ...s,
                totalTraffic: s.totalTraffic + inc,
                activeConnections: s.activeConnections + (Math.random() > 0.5 ? 5 : -7),
                detectedThreats: attack ? s.detectedThreats + 1 : s.detectedThreats,
            }));

            if (attack) {
                const threatObj = {
                    id: Date.now(),
                    type: "Anomaly Attack",
                    ip: `192.168.0.${Math.floor(Math.random() * 255)}`,
                    traffic: inc,
                    analyzed: false,
                };

                setFeed((prev) => [
                    { text: `[${timestamp}] ⚠️ New threat detected! Pattern anomaly found.`, threat: true, obj: threatObj },
                    ...prev.slice(0, 9),
                ]);

                setGraphData((prev) => [...prev.slice(1), prev.at(-1) + Math.random() * 4]);
            } else {
                setFeed((prev) => [
                    { text: `[${timestamp}] Normal traffic scanned (${inc} pkts)…`, threat: false },
                    ...prev.slice(0, 9),
                ]);

                setGraphData((prev) => [...prev.slice(1), prev.at(-1) + (Math.random() * 1 - 0.5)]);
            }
        }, 3500);

        return () => clearInterval(interval);
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;
        const interval = setInterval(() => {
            setHealth((h) => ({
                cpu: Math.max(5, Math.min(95, Math.round(h.cpu + (Math.random() * 8 - 4)))),
                ram: Math.max(10, Math.min(95, Math.round(h.ram + (Math.random() * 6 - 3)))),
                disk: Math.max(10, Math.min(95, Math.round(h.disk + (Math.random() * 4 - 2)))),
            }));
        }, 2100);
        return () => clearInterval(interval);
    }, [isReady]);

    const onClickFeed = (item) => {
        if (!item?.threat) return;
        setPendingThreat(item.obj);
        setShowConfirmPopup(true);
    };

    const confirmThreat = () => {
        const db = JSON.parse(localStorage.getItem("confirmedThreats") || "[]");
        db.push(pendingThreat);
        localStorage.setItem("confirmedThreats", JSON.stringify(db));
        setShowConfirmPopup(false);
        setPendingThreat(null);
    };

    const denyThreat = () => {
        setShowConfirmPopup(false);
        setPendingThreat(null);
    };

    if (!isReady) return <div className="text-white p-6">Loading dashboard…</div>;

    return (
        <div className="text-white p-6 overflow-y-auto h-full custom-scroll">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Traffic" value={format(stats.totalTraffic)} icon="📡" />
                <StatCard title="Detected Threats" value={stats.detectedThreats} icon="⚠️" />
                <StatCard title="Active Connections" value={stats.activeConnections} icon="🔌" />
                <StatCard title="Model Accuracy" value={stats.modelAccuracy.toFixed(2) + "%"} icon="🤖" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                    <h2 className="text-xl font-semibold mb-2">AI Threat Overview</h2>
                    <div className="w-full h-[260px]">
                        <canvas ref={chartRef} className="w-full h-full rounded-lg border border-white/10" />
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                    <h2 className="text-xl font-semibold mb-2">Realtime Event Feed</h2>

                    <div className="h-64 overflow-y-auto space-y-2 pr-2 custom-scroll">
                        {feed.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => onClickFeed(item)}
                                className={`text-sm font-mono p-2 rounded-lg border cursor-pointer transition ${
                                    item.threat
                                        ? "bg-red-900/40 border-red-700 hover:bg-red-800/40"
                                        : "bg-black/30 border-white/10"
                                }`}
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">System Health</h2>
                <HealthBar label="CPU Load" value={health.cpu} />
                <HealthBar label="Memory Usage" value={health.ram} />
                <HealthBar label="Disk Usage" value={health.disk} />
            </div>

            {showConfirmPopup && pendingThreat && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#151822] p-6 rounded-xl border border-white/10 w-[380px]">
                        <h2 className="text-xl font-semibold mb-4">Send to Monitoring?</h2>

                        <p className="text-white/60 text-sm mb-6">
                            Threat detected: {pendingThreat.type} ({pendingThreat.ip})
                        </p>

                        <div className="flex gap-3">
                            <button
                                className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700"
                                onClick={confirmThreat}
                            >
                                Yes
                            </button>
                            <button
                                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                                onClick={denyThreat}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-md hover:shadow-2xl transition-all">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-lg opacity-80">{title}</p>
            <h3 className="text-2xl font-bold text-[#00FFC6]">{value}</h3>
        </div>
    );
}

function HealthBar({ label, value }) {
    return (
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{Math.round(value)}%</span>
            </div>

            <div className="w-full h-3 bg-black/30 rounded-lg overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#00FFC6] to-[#7F00FF]"
                    style={{ width: `${value}%`, transition: "width 1s" }}
                />
            </div>
        </div>
    );
}

function format(x) {
    return Intl.NumberFormat("en-US").format(x);
}
