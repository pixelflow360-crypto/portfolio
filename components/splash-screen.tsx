"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { animate } from "framer-motion"
import { preloadSilk } from "@/lib/preload-silk"
import { EASE_OUT } from "@/lib/motion"
import { LogoMark } from "@/components/logo-mark"

const SPLASH_KEY = "portfolio:splash-seen"
const MIN_VISIBLE_MS = 2800
const COUNTER_DURATION = 2.35
const HOLD_AT_100_MS = 420

type SplashScreenProps = {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const silkReadyRef = useRef(false)
  const counterDoneRef = useRef(false)
  const startedAtRef = useRef(Date.now())
  const completedRef = useRef(false)

  const tryComplete = () => {
    if (completedRef.current) return
    if (!silkReadyRef.current || !counterDoneRef.current) return

    const elapsed = Date.now() - startedAtRef.current
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)

    window.setTimeout(() => {
      if (completedRef.current) return
      completedRef.current = true
      setProgress(100)
      window.setTimeout(() => setVisible(false), HOLD_AT_100_MS)
    }, wait)
  }

  useEffect(() => {
    if (reduced) {
      preloadSilk().finally(() => {
        sessionStorage.setItem(SPLASH_KEY, "1")
        onComplete()
      })
      return
    }

    preloadSilk().then(() => {
      silkReadyRef.current = true
      tryComplete()
    })

    const controls = animate(0, 100, {
      duration: COUNTER_DURATION,
      ease: EASE_OUT,
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => {
        counterDoneRef.current = true
        setProgress(100)
        tryComplete()
      },
    })

    return () => controls.stop()
  }, [onComplete, reduced])

  if (reduced) return null

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: EASE_OUT }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          aria-live="polite"
          aria-busy="true"
          aria-label={`Loading ${progress} percent`}
        >
          <div className="flex w-full max-w-xs flex-col items-center gap-8 px-6">
            <LogoMark className="h-10 px-5 sm:px-6 [&_span]:text-sm" />

            <div className="w-full space-y-3">
              <p className="text-center font-heading text-5xl font-medium tabular-nums tracking-tighter text-foreground">
                {progress}
                <span className="text-2xl text-muted-foreground">%</span>
              </p>

              <div className="h-px w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full origin-left bg-foreground transition-transform duration-300 ease-out"
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
              Loading
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function shouldShowSplash() {
  if (typeof window === "undefined") return true
  return sessionStorage.getItem(SPLASH_KEY) !== "1"
}

export function markSplashSeen() {
  sessionStorage.setItem(SPLASH_KEY, "1")
}
