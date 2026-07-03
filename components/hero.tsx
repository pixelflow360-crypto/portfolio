"use client"

import dynamic from "next/dynamic"
import { motion, type Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import TextType from "@/components/TextType"

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false })

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
        <Silk
          speed={5}
          scale={1}
          color="#777777"
          noiseIntensity={1.5}
          rotation={0}
          className="h-full w-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-background/20 to-background" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={item}
        className="pointer-events-none relative z-10 flex w-full max-w-4xl items-center justify-center text-center"
      >
        <motion.h1 className="text-balance font-heading text-5xl font-medium leading-[0.95] tracking-tighter text-foreground text-glow sm:text-7xl md:text-8xl">
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
        </motion.h1>
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
