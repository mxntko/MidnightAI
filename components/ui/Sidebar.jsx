"use client";

import Link from "next/link";
import { useState } from "react";

export function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <div
            className={`
                h-screen bg-black/20 backdrop-blur-xl border-r border-white/10
                transition-all duration-300 flex flex-col
                ${open ? "w-64" : "w-20"}
            `}
        >
            {/* HEADER */}
            <div className="flex items-center justify-between p-4">
                <span className="text-xl font-bold">
                    {open ? "AI NIDS" : "⚡"}
                </span>

                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 text-sm bg-white/10 rounded-lg hover:bg-white/20"
                >
                    {open ? "◀" : "▶"}
                </button>
            </div>

            {/* NAV LINKS */}
            <nav className="flex flex-col gap-2 mt-4 px-3">
                <SidebarLink open={open} href="/dashboard" label="Dashboard" emoji="📊" />
                <SidebarLink open={open} href="/monitoring" label="Monitoring" emoji="🛡️" />
                <SidebarLink open={open} href="/about" label="About" emoji="💡" />
            </nav>
        </div>
    );
}

function SidebarLink({ open, href, label, emoji }) {
    return (
        <Link
            href={href}
            className="
                flex items-center gap-3 p-3 rounded-xl
                hover:bg-white/10 transition-all group
            "
        >
            <span className="text-xl">{emoji}</span>
            {open && <span className="opacity-80 group-hover:opacity-100">{label}</span>}
        </Link>
    );
}
