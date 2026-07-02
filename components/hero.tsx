"use client"

import dynamic from "next/dynamic"
import { motion, type Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const GridScan = dynamic(
  () => import("@/components/GridScan").then((mod) => mod.GridScan),
  { ssr: false },
)

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
      <div className="absolute inset-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2a2535"
          scanColor="#e879f9"
          scanOpacity={0.35}
          gridScale={0.1}
          lineStyle="solid"
          lineJitter={0.08}
          scanDirection="pingpong"
          enablePost
          bloomIntensity={0.12}
          bloomThreshold={0.05}
          bloomSmoothing={0.85}
          chromaticAberration={0.002}
          noiseIntensity={0.008}
          scanGlow={0.5}
          scanSoftness={2}
          scanPhaseTaper={0.9}
          scanDuration={2.4}
          scanDelay={2.4}
          snapBackDelay={250}
          className="h-full w-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-background/20 to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="pointer-events-none relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.h1
          variants={item}
          className="text-balance font-heading text-5xl font-medium leading-[0.95] tracking-tighter text-foreground text-glow sm:text-7xl md:text-8xl"
        >
          Hi. I design websites.
        </motion.h1>

        <motion.div
          variants={item}
          className="pointer-events-auto mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#work"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-full px-8 text-sm tracking-wide",
            )}
          >
            View selected work
          </Link>
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full px-8 text-sm tracking-wide",
            )}
          >
            Start a project
          </Link>
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
