"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/#projects"
          data-cursor="hover"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          {title}
        </p>
        <h1 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          Project page coming soon
        </h1>
        <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          This case study is being prepared. Check back shortly to explore the
          full process, research, and outcomes.
        </p>
      </motion.div>
    </section>
  )
}
