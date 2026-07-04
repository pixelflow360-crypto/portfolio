"use client"

import dynamic from "next/dynamic"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import TextType from "@/components/TextType"
import { useSplashReady } from "@/components/splash-ready"
import { EASE_OUT } from "@/lib/motion"
import { preloadSilk } from "@/lib/preload-silk"

const Silk = dynamic(
  () => preloadSilk().then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gradient-to-b from-muted/20 via-background/80 to-background" />
    ),
  },
)

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

export function Hero() {
  const reduced = useReducedMotion()
  const ready = useSplashReady()

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0">
        {!reduced ? (
          <Silk
            speed={5}
            scale={1}
            color="#777777"
            noiseIntensity={1.5}
            rotation={0}
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-muted/15 to-background" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-background/20 to-background" />

      <motion.div
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        variants={item}
        className="pointer-events-none relative z-10 flex w-full max-w-4xl items-center justify-center text-center"
      >
        <h1 className="text-balance font-heading text-5xl font-medium leading-[0.95] tracking-tighter text-foreground text-glow sm:text-7xl md:text-8xl">
          {ready ? (
            <TextType
              as="span"
              text="Hi. I design websites."
              typingSpeed={115}
              pauseDuration={1000}
              deletingSpeed={50}
              loop={false}
              showCursor
              cursorCharacter="_"
              cursorBlinkDuration={1}
            />
          ) : null}
        </h1>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: ready ? 1.2 : 0, duration: 0.6, ease: EASE_OUT }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        {reduced ? (
          <ArrowDown className="h-5 w-5" />
        ) : (
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="block transform-gpu"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.span>
        )}
      </motion.a>
    </section>
  )
}
