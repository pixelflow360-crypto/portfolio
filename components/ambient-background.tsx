"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let raf = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(46, Math.floor((width * height) / 38000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.4 + 0.1,
      }))
    }

    // Read --foreground once, then only re-read when the theme class flips.
    // Calling getComputedStyle every frame forces a style recalc and is the
    // single biggest cost in this loop, so we cache it instead.
    let color = "oklch(0.93 0 0)"
    const readColor = () => {
      color =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--foreground")
          .trim() || "oklch(0.93 0 0)"
    }

    const themeObserver = new MutationObserver(readColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

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
        ctx.fillStyle = `color-mix(in oklch, ${color} ${Math.round(
          p.a * 100,
        )}%, transparent)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    readColor()
    resize()
    if (!reduced) {
      draw()
    }
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Slow drifting ambient glows */}
      <div
        className="absolute left-[10%] top-[8%] h-[42vw] w-[42vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--glow) 8%, transparent), transparent 70%)",
          animation: "ambient-drift 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[6%] right-[8%] h-[38vw] w-[38vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--glow) 6%, transparent), transparent 70%)",
          animation: "ambient-drift 34s ease-in-out infinite reverse",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
    </div>
  )
}
