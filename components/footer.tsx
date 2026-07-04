"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Copyright } from "lucide-react"

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" })

  return (
    <motion.footer
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border px-6 py-12"
    >
      <p className="flex items-center justify-center gap-1.5 text-sm tracking-wide text-muted-foreground">
        <Copyright className="h-3.5 w-3.5" aria-hidden />
        All rights reserved. 2026
      </p>
    </motion.footer>
  )
}
