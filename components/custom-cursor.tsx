"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const dotX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.2 })
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add("custom-cursor-active")

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement | null
      setHovering(
        !!target?.closest('a, button, input, textarea, [data-cursor="hover"]'),
      )
    }

    window.addEventListener("mousemove", move)
    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.classList.remove("custom-cursor-active")
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-foreground"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.9 : 0.4 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="absolute -ml-5 -mt-5 h-10 w-10 rounded-full border border-foreground/60"
      />
    </div>
  )
}
