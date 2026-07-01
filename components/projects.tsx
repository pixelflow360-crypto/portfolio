"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/data/projects"

const card: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px 0px" })
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px 0px" })

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
      {/* Section header */}
      <motion.div
        ref={headerRef}
        animate={
          isHeaderInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 48, filter: "blur(8px)" }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Selected Work
          </p>
          <h2 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            A few things
            <br />
            worth showing
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          Each project starts with questions, not pixels. A selection of work
          across health, collaboration, finance, and voice interaction.
        </p>
      </motion.div>

      {/* Project grid */}
      <motion.div
        ref={gridRef}
        animate={isGridInView ? "visible" : "hidden"}
        initial="hidden"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            variants={card}
            whileHover={{ scale: 1.025 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 transition-shadow duration-500 hover:glow-ring"
              data-cursor="hover"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklch,var(--glow)_22%,transparent),transparent_60%)]" />
                </div>
                <ArrowUpRight className="absolute right-4 top-4 z-10 h-5 w-5 translate-y-1 text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-heading text-xl font-medium tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
