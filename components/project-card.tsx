"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/data/projects"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  CARD_IMAGE_HOVER,
  REVEAL_TRANSITION,
  revealDelay,
} from "@/lib/motion"

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

function projectStatus(project: Project) {
  if (project.access === "pending") return "Case study pending"
  if (project.access === "password") return "Protected"
  return "Full project"
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const hoverScale = project.transparentArtwork ? 1.26 : 1.18

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-40px 0px" }}
      transition={{
        ...REVEAL_TRANSITION,
        delay: reduced ? 0 : revealDelay(index),
      }}
      className="group"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open ${project.title}`}
      >
        <Card className="gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none ring-0">
          <CardContent className="overflow-hidden rounded-xl p-0 ring-1 ring-foreground/10 transition-[ring-color,box-shadow] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:ring-foreground/18">
            <div
              className={cn(
                "relative aspect-[16/10] overflow-hidden bg-card",
                project.transparentArtwork && "bg-muted/15",
              )}
            >
              <motion.div
                className="absolute inset-0 origin-center transform-gpu"
                initial={false}
                animate={
                  reduced
                    ? { scale: 1, filter: "grayscale(0)" }
                    : {
                        scale: hovered ? hoverScale : 1,
                        filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
                      }
                }
                transition={CARD_IMAGE_HOVER}
              >
                <div
                  className={cn(
                    "relative h-full w-full",
                    project.transparentArtwork && "p-4",
                  )}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                    quality={95}
                    priority={index < 2}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>
              </motion.div>
            </div>
          </CardContent>

          <CardFooter className="mt-4 flex items-end justify-between gap-4 border-0 bg-transparent px-0 py-0">
            <CardDescription className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </CardDescription>

            <CardTitle className="min-w-0 flex-1 text-balance text-center font-heading text-base tracking-tight sm:text-lg">
              {project.title}
            </CardTitle>

            <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:text-foreground">
              {projectStatus(project)}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </CardFooter>
        </Card>
      </button>
    </motion.article>
  )
}
