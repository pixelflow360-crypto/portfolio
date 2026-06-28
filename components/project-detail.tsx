"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import type { Project } from "@/data/projects"

const page: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <motion.article
      variants={page}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-6 py-28 md:py-36"
    >
      <motion.div variants={item}>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to work
        </Link>
      </motion.div>

      <motion.p
        variants={item}
        className="mb-4 mt-10 text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        Case study
      </motion.p>

      <motion.h1
        variants={item}
        className="font-heading text-4xl font-medium tracking-tighter text-foreground text-glow sm:text-5xl md:text-6xl"
      >
        {project.title}
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {project.description}
      </motion.p>

      <motion.div
        variants={item}
        className="relative mt-12 aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </motion.div>

      <motion.div variants={item} className="mt-12 space-y-6">
        <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Overview
        </h2>
        <p className="text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg">
          {project.longDescription}
        </p>
      </motion.div>

      <motion.ul variants={item} className="mt-12 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border px-4 py-1.5 text-xs tracking-wide text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </motion.ul>
    </motion.article>
  )
}
