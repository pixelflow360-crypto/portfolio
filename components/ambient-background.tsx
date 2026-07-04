"use client"

import { useEffect, useRef, useState } from "react"
import { isTouchDevice, prefersReducedMotion } from "@/lib/device"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

const PARTICLE_COLOR = "oklch(0.93 0 0)"

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showCanvas, setShowCanvas] = useState(false)

  useEffect(() => {
    setShowCanvas(!prefersReducedMotion() && !isTouchDevice())
  }, [])

  useEffect(() => {
    if (!showCanvas) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let particles: Particle[] = []
    let raf = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(28, Math.floor((width * height) / 52000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.35 + 0.08,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.fillStyle = `color-mix(in oklch, ${PARTICLE_COLOR} ${Math.round(
          p.a * 100,
        )}%, transparent)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [showCanvas])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="ambient-blob absolute left-[10%] top-[8%] h-[42vw] w-[42vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--glow) 8%, transparent), transparent 70%)",
        }}
      />
      <div
        className="ambient-blob ambient-blob--reverse absolute bottom-[6%] right-[8%] h-[38vw] w-[38vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--glow) 6%, transparent), transparent 70%)",
        }}
      />
      {showCanvas ? (
        <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
      ) : null}
    </div>
  )
}
