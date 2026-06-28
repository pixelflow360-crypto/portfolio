"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import LiquidHero from "@/components/LiquidHero"

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <LiquidHero />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={item}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          the vibe
        </motion.p>

        <motion.h1
          variants={item}
          className="text-balance font-heading text-5xl font-medium leading-[0.95] tracking-tighter text-foreground text-glow sm:text-7xl md:text-8xl"
        >
          Designing clarity
          <br />
          from complexity
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          A research-led practice crafting calm, considered digital products —
          where every interaction is intentional and nothing is decorative.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className="group rounded-full bg-foreground px-8 py-3 text-sm font-medium tracking-wide text-background transition-transform duration-300 hover:scale-[1.03]"
          >
            View selected work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-foreground/5"
          >
            Start a project
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
          className="block"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
