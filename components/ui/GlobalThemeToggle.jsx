"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function GlobalThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                variant="outline"
                className="rounded-full border-gray-500 bg-black/30 dark:bg-white/20 backdrop-blur-xl"
                onClick={toggleTheme}
            >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
        </div>
    )
}
