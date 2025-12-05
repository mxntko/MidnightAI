"use client";

import { useEffect } from "react";

export default function NotificationStack({ notifications = [] }) {
    useEffect(() => {
        // nothing here — parent controls lifecycle
    }, [notifications]);

    return (
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl p-3 shadow-2xl border border-red-400/30 w-80"
                >
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-sm opacity-90">{n.message}</div>
                    <div className="text-xs opacity-70 mt-1">{n.time}</div>
                </div>
            ))}
        </div>
    );
}
