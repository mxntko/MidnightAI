"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function MonitoringPage() {
    const [confirmedThreats, setConfirmedThreats] = useState([]);
    const [selectedThreat, setSelectedThreat] = useState(null);
    const [popup, setPopup] = useState(null);
    const [loadingTrack, setLoadingTrack] = useState(false);

    useEffect(() => {
        const data = typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("confirmedThreats") || "[]")
            : [];
        setConfirmedThreats(data);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("confirmedThreats", JSON.stringify(confirmedThreats));
        }
    }, [confirmedThreats]);

    const openThreatInfo = (t) => {
        setSelectedThreat(t);
        setPopup("info");
    };

    const startTracking = () => {
        setLoadingTrack(true);
        setTimeout(() => {
            setLoadingTrack(false);
            const updated = confirmedThreats.map((c) =>
                c.id === selectedThreat.id ? { ...c, analyzed: true } : c
            );
            setConfirmedThreats(updated);
            setSelectedThreat({ ...selectedThreat, analyzed: true });
            setPopup("tracked-result");
        }, 3000);
    };

    const fixThreat = () => {
        setPopup("fixed");
        setTimeout(() => {
            setPopup(null);
            setSelectedThreat(null);
        }, 3000);
    };

    const removeThreat = (id) => {
        const f = confirmedThreats.filter((c) => c.id !== id);
        setConfirmedThreats(f);
    };

    return (
        <div className="relative min-h-screen w-full p-6 text-white overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[#0d0f17]">
                <div className="absolute inset-0 animate-nebula opacity-60"></div>
                <div className="absolute inset-0 animate-aurora opacity-40"></div>
            </div>

            <h1 className="text-3xl font-bold mb-6">Monitoring</h1>

            <Card className="bg-[#11131d]/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                <CardContent className="p-4">
                    {confirmedThreats.length === 0 && (
                        <p className="text-white/50 text-sm">No confirmed threats yet.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {confirmedThreats.map((t) => (
                            <Card
                                key={t.id}
                                className="bg-[#141722]/70 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-3 hover:bg-[#151a27]/80 transition shadow-lg"
                            >
                                <p className="text-lg font-semibold">{t.type}</p>
                                <p className="text-white/60 text-sm">Source IP: {t.ip}</p>

                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="secondary"
                                        className="bg-blue-600 hover:bg-blue-700"
                                        onClick={() => openThreatInfo(t)}
                                    >
                                        Details
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        onClick={() => removeThreat(t.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {popup === "info" && selectedThreat && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
                    <Card className="bg-[#151822]/80 backdrop-blur-xl border border-white/10 w-[420px] p-6 shadow-2xl animate-fadeIn">
                        <h2 className="text-xl font-semibold mb-3">{selectedThreat.type}</h2>
                        <p className="text-white/60 text-sm mb-3">IP: {selectedThreat.ip}</p>
                        <p className="text-white/60 text-sm mb-3">
                            Traffic: {selectedThreat.traffic} KB/s
                        </p>

                        {!selectedThreat.analyzed ? (
                            <p className="text-yellow-400 mb-3">Threat is not analyzed yet.</p>
                        ) : (
                            <div className="flex items-center gap-2 mb-3">
                                <p className="text-green-400">Threat has been analyzed.</p>
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setPopup("tracked-result")}
                                >
                                    Result
                                </Button>
                            </div>
                        )}

                        <div className="flex gap-3 mt-4">
                            <Button
                                className={
                                    selectedThreat.analyzed
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-gray-700 cursor-not-allowed"
                                }
                                disabled={!selectedThreat.analyzed}
                                onClick={fixThreat}
                            >
                                Fix
                            </Button>

                            <Button
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={startTracking}
                                disabled={loadingTrack}
                            >
                                {loadingTrack ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    "Track"
                                )}
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => setPopup(null)}
                            >
                                Leave
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {popup === "tracked-result" && selectedThreat && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
                    <Card className="bg-[#151822]/80 backdrop-blur-xl border border-white/10 w-[420px] p-6 shadow-2xl animate-fadeIn">
                        <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>

                        <p className="text-white/70 text-sm">Affected Account: user_042</p>
                        <p className="text-white/70 text-sm">Target IP: {selectedThreat.ip}</p>
                        <p className="text-white/70 text-sm mb-4">
                            Impact: System resource disruption risk
                        </p>

                        <Button
                            className="bg-red-600 hover:bg-red-700 mt-3"
                            onClick={() => setPopup("info")}
                        >
                            Leave
                        </Button>
                    </Card>
                </div>
            )}

            {popup === "fixed" && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
                    <Card className="bg-[#151822]/80 backdrop-blur-xl border border-green-500 w-[360px] p-6 text-center shadow-2xl animate-fadeIn">
                        <h2 className="text-xl font-semibold text-green-400">
                            Threat has been fixed.
                        </h2>
                    </Card>
                </div>
            )}
        </div>
    );
}
