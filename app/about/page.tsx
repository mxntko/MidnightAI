"use client"




import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Sun, Moon } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutPage() {
  const [theme, setTheme] = useState("dark")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // ------------ Theme Toggle ------------
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // ------------ Parallax Scroll Effect ------------
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 300], [0, -80])

  // ------------ Animated Network Graph ------------
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const nodes = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    function animate() {
      ctx.clearRect(0, 0, width, height)

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy

        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      })

      // Draw lines between close nodes
      nodes.forEach((a) => {
        nodes.forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(80,160,255,${1 - dist / 120})`
                : `rgba(0,0,0,${1 - dist / 120})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach((n) => {
        ctx.fillStyle = theme === "dark" ? "#5fb3ff" : "#000"
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeHandler)
    return () => window.removeEventListener("resize", resizeHandler)
  }, [theme])

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${theme === "dark"
        ? "bg-gradient-to-br from-slate-900 via-black to-slate-950 text-white"
        : "bg-gradient-to-br from-white via-gray-200 to-gray-300 text-black"
        }`}
    >
      {/* Animated Network Graph Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 opacity-40 pointer-events-none"
      />

      {/* Parallax Glow Layer */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-cyan-500/20 to-blue-300/20 blur-3xl -z-10"
      />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="outline"
          className="rounded-full border-gray-500 bg-black/30 dark:bg-white/20 backdrop-blur-xl"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>

      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          About the Midnight NIDS AI System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-lg max-w-2xl mx-auto opacity-80"
        >
          Sistem AI yang memantau traffic jaringan secara real-time dan mendeteksi
          serangan menggunakan Machine Learning serta Neural Networks.
        </motion.p>
      </div>

      {/* Feature Badges */}
      <div className="flex justify-center gap-4 flex-wrap mb-20">
        <Badge className="px-4 py-2 text-md bg-cyan-500/20 text-cyan-300 border-cyan-500">
          Real-time Monitoring
        </Badge>
        <Badge className="px-4 py-2 text-md bg-blue-500/20 text-blue-300 border-blue-500">
          ML-Powered Detection
        </Badge>
        <Badge className="px-4 py-2 text-md bg-purple-500/20 text-purple-300 border-purple-500">
          Neural Network Engine
        </Badge>
      </div>

      {/* DEVELOPER CARDS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-20">

        {/* Mikko */}
        <Card className="bg-slate-900/60 dark:bg-white/40 border-slate-700 dark:border-gray-400 backdrop-blur-xl shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-cyan-400 dark:text-cyan-700">
              Mikko — Lead Backend Developer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 opacity-90">
            <p>
              Mikko bertanggung jawab dalam arsitektur backend, integrasi AI,
              dan perancangan modul Network Intrusion Detection.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("YOUR_GITHUB_LINK_MIKKO", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" /> GitHub Profile
            </Button>
          </CardContent>
        </Card>

        {/* Daus */}
        <Card className="bg-slate-900/60 dark:bg-white/40 border-slate-700 dark:border-gray-400 backdrop-blur-xl shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-blue-400 dark:text-blue-700">
              Daus — Frontend & UI/UX Engineer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 opacity-90">
            <p>
              Daus merancang tampilan UI, animasi, dan dashboard monitoring realtime
              untuk visualisasi data serangan.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("YOUR_GITHUB_LINK_DAUS", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" /> GitHub Profile
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* FOOTER */}
      <div className="pb-16 text-center opacity-60 text-sm">
        © {new Date().getFullYear()} AI-Powered NIDS — All Rights Reserved.
      </div>
    </div>
  )
}
