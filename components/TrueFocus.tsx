"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import "./TrueFocus.css"

interface TrueFocusProps {
  sentence?: string
  separator?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
  className?: string
}

interface FocusRect {
  x: number
  y: number
  width: number
  height: number
}

export default function TrueFocus({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(separator)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (manualMode) return

    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
      },
      (animationDuration + pauseBetweenAnimations) * 1000,
    )

    return () => clearInterval(interval)
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length])

  useEffect(() => {
    const updateFocusRect = () => {
      const activeWord = wordRefs.current[currentIndex]
      const container = containerRef.current
      if (!activeWord || !container) return

      const parentRect = container.getBoundingClientRect()
      const activeRect = activeWord.getBoundingClientRect()

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      })
    }

    updateFocusRect()

    window.addEventListener("resize", updateFocusRect)
    return () => window.removeEventListener("resize", updateFocusRect)
  }, [currentIndex, words.length])

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return
    setLastActiveIndex(index)
    setCurrentIndex(index)
  }

  const handleMouseLeave = () => {
    if (!manualMode) return
    setCurrentIndex(lastActiveIndex ?? 0)
  }

  return (
    <div
      className={`focus-container ${className}`.trim()}
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${isActive && !manualMode ? "active" : ""}`}
            style={
              {
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        )
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as React.CSSProperties
        }
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  )
}
