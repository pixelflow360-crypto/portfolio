"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TiltedCard } from "@/components/TiltedCard"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

export function Projects() {
  const [index, setIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.38], reduced ? [0, 0] : [120, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.32], [0, 1])
  const headerScale = useTransform(scrollYProgress, [0, 0.38], reduced ? [1, 1] : [0.9, 1])

  const stageY = useTransform(scrollYProgress, [0.06, 0.52], reduced ? [0, 0] : [240, 0])
  const stageOpacity = useTransform(scrollYProgress, [0.1, 0.48], [0, 1])
  const stageScale = useTransform(scrollYProgress, [0.1, 0.52], reduced ? [1, 1] : [0.72, 1])
  const stageRotateX = useTransform(scrollYProgress, [0.1, 0.52], reduced ? [0, 0] : [14, 0])

  const navOpacity = useTransform(scrollYProgress, [0.28, 0.5], [0, 1])
  const navX = useTransform(scrollYProgress, [0.28, 0.5], reduced ? [0, 0] : [24, 0])
  const navXRight = useTransform(navX, (v) => -v)

  const controlsOpacity = useTransform(scrollYProgress, [0.38, 0.6], [0, 1])
  const controlsY = useTransform(scrollYProgress, [0.38, 0.6], reduced ? [0, 0] : [48, 0])

  const total = projects.length
  const project = projects[index]

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + total) % total)
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.25
      if (!inView) return
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex min-h-[100svh] scroll-mt-24 flex-col bg-transparent px-4 py-24 md:px-6 md:py-28"
    >
      <motion.div
        style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
        className="relative mx-auto mb-8 w-full max-w-6xl origin-top text-center md:mb-10"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Portfolio
        </p>
        <h2 className="font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          Conceptual Pieces
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
          One piece at a time — hover to explore, click to open the full write-up.
        </p>
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center [perspective:1200px]">
        <motion.div
          style={{ opacity: navOpacity, x: navX }}
          className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 md:block"
        >
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Previous project"
            onClick={() => go(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          style={{ opacity: navOpacity, x: navXRight }}
          className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 md:block"
        >
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Next project"
            onClick={() => go(1)}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          style={{
            y: stageY,
            opacity: stageOpacity,
            scale: stageScale,
            rotateX: stageRotateX,
          }}
          className="flex w-full origin-center items-center justify-center will-change-transform"
        >
          <div
            className="flex w-full items-center justify-center"
            style={{ minHeight: "min(72vh, 760px)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 0.92, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="flex w-full items-center justify-center"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`Open ${project.title}`}
                >
                  <TiltedCard
                    imageSrc={project.image}
                    altText={project.title}
                    containerHeight="min(72vh, 760px)"
                    containerWidth="min(92vw, 980px)"
                    imageHeight="min(72vh, 760px)"
                    imageWidth="min(92vw, 980px)"
                    rotateAmplitude={20}
                    scaleOnHover={1.035}
                    showMobileWarning={false}
                    showTooltip
                    tooltipContent={
                      <div className="text-left">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </p>
                        <p className="mt-1.5 font-heading text-base font-medium leading-snug tracking-tight text-foreground">
                          {project.title}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-border/80 bg-background/40 px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: controlsOpacity, y: controlsY }}
          className="mt-8 flex items-center gap-3"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Go to ${p.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-full transition-all duration-500 ease-out",
                i === index
                  ? "h-2 w-8 bg-foreground"
                  : "h-2 w-2 bg-muted-foreground/40 hover:bg-muted-foreground",
              )}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: controlsOpacity, y: controlsY }}
          className="mt-6 flex gap-3 md:hidden"
        >
          <Button type="button" variant="outline" size="sm" onClick={() => go(-1)}>
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => go(1)}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
