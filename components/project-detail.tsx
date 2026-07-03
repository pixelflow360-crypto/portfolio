"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/data/projects"

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/#work"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Conceptual Pieces
        </Link>

        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Conceptual Piece
        </p>
        <h1 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          {project.title}
        </h1>

        <div
          className={cn(
            "mt-10 flex justify-center",
            project.transparentArtwork
              ? "bg-transparent"
              : "overflow-hidden rounded-2xl border border-border bg-card",
          )}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={project.imageWidth}
            height={project.imageHeight}
            className={
              project.transparentArtwork
                ? "block h-auto w-full object-contain"
                : "block h-auto w-full"
            }
            sizes="(max-width: 896px) 100vw, 896px"
            quality={100}
            unoptimized
            priority
          />
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {project.caseStudy ?? project.description}
        </p>
      </motion.div>
    </article>
  )
}
