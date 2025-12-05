"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark")

    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved) {
            setTheme(saved)
            if (saved === "dark") document.documentElement.classList.add("dark")
        } else {
            localStorage.setItem("theme", "dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
