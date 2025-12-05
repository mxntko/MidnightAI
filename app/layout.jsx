"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import "./globals.css";
import { Sidebar } from "@/components/ui/Sidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="relative flex bg-[#0B0E14] text-white overflow-hidden">

                {/* ANIMATED BACKGROUND */}
                <div className="fixed inset-0 -z-10 pointer-events-none">
                    <div className="
                        absolute inset-0 
                        bg-gradient-to-br from-[#0A0F1F] via-[#0B1225] to-[#05070D]
                    "/>

                    <div className="
                        absolute w-[900px] h-[900px] top-[-200px] left-[-200px]
                        bg-[#1e3a8a]/20 rounded-full blur-[180px]
                        animate-pulse-slow
                    "></div>

                    <div className="
                        absolute w-[900px] h-[900px] bottom-[-250px] right-[-250px]
                        bg-[#6d28d9]/20 rounded-full blur-[200px]
                        animate-pulse-slower
                    "></div>
                </div>

                {/* SIDEBAR */}
                <Sidebar />

                {/* MAIN CONTENT */}
                <div className="flex-1 min-h-screen p-6 relative">
                    {children}

                    <div className="fixed bottom-6 right-6 z-50">
                        <ThemeToggle />
                    </div>
                </div>
            </body>
        </html>
    );
}
