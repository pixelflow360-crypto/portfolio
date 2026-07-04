"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/data/projects"
import { ProjectAccessModal } from "@/components/project-access-modal"
import { ProjectCopy } from "@/components/project-copy"
import { isProjectUnlocked, unlockProject } from "@/lib/project-access"

export function ProjectDetail({ project }: { project: Project }) {
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [ready, setReady] = useState(false)

  const isPassword = project.access === "password"
  const isPending = project.access === "pending"
  const isGated = isPassword || isPending

  useEffect(() => {
    if (isPassword) {
      const allowed = isProjectUnlocked(project.slug)
      setUnlocked(allowed)
      setGateOpen(!allowed)
    } else if (isPending) {
      setGateOpen(true)
    }
    setReady(true)
  }, [isPassword, isPending, project.slug])

  const handleUnlock = () => {
    unlockProject(project.slug)
    setUnlocked(true)
  }

  const showContent = !isGated || (isPassword && unlocked)

  return (
    <>
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
            Back to work
          </Link>

          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Project
          </p>
          <h1 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          {showContent ? (
            <>
              <ProjectCopy project={project} className="mt-6 md:mt-8" />

              <div
                className={cn(
                  "mt-10 flex justify-center md:mt-12",
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
            </>
          ) : ready ? (
            <p className="mt-8 text-sm text-muted-foreground opacity-50">
              This project is not available to view yet.
            </p>
          ) : null}
        </motion.div>
      </article>

      {ready && isGated ? (
        <ProjectAccessModal
          open={gateOpen}
          onOpenChange={setGateOpen}
          mode={project.access!}
          projectTitle={project.title}
          onUnlock={handleUnlock}
        />
      ) : null}
    </>
  )
}
