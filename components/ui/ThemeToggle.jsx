"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("light", theme === "light");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
                p-3 rounded-2xl bg-black/30 backdrop-blur-md shadow-xl
                hover:bg-black/50 transition-all border border-white/10
            "
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
