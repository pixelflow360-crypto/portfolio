"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" })
  const year = new Date().getFullYear()

  return (
    <motion.footer
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border px-6 py-12"
    >
      <p className="text-center text-sm tracking-wide text-muted-foreground">
        &copy; {year}
      </p>
    </motion.footer>
  )
}
