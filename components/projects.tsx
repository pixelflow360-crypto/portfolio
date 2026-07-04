"use client"

import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ProjectAccessModal } from "@/components/project-access-modal"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/projects"
import { REVEAL_TRANSITION } from "@/lib/motion"
import { isProjectUnlocked, unlockProject } from "@/lib/project-access"

export function Projects() {
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const headerInView = useInView(headerRef, { once: true, margin: "-60px 0px" })
  const [gateOpen, setGateOpen] = useState(false)
  const [gateProject, setGateProject] = useState<(typeof projects)[number] | null>(
    null,
  )

  const openProject = useCallback(
    (item: (typeof projects)[number]) => {
      if (item.access === "pending") {
        setGateProject(item)
        setGateOpen(true)
        return
      }

      if (item.access === "password" && !isProjectUnlocked(item.slug)) {
        setGateProject(item)
        setGateOpen(true)
        return
      }

      router.push(`/projects/${item.slug}`)
    },
    [router],
  )

  const handleGateUnlock = useCallback(() => {
    if (!gateProject) return
    unlockProject(gateProject.slug)
    router.push(`/projects/${gateProject.slug}`)
  }, [gateProject, router])

  return (
    <section id="work" className="scroll-mt-24 px-6 py-28 md:py-36">
      <motion.div
        ref={headerRef}
        initial={reduced ? false : { opacity: 0, y: 48 }}
        animate={
          reduced || headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }
        }
        transition={{ ...REVEAL_TRANSITION, duration: 1 }}
        className="mx-auto mb-14 max-w-6xl md:mb-20"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Portfolio
        </p>
        <h2 className="max-w-3xl text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          Some of my work
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          Selected projects — hover to explore, click to open the full write-up.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onOpen={openProject}
          />
        ))}
      </div>

      {gateProject?.access ? (
        <ProjectAccessModal
          open={gateOpen}
          onOpenChange={setGateOpen}
          mode={gateProject.access}
          projectTitle={gateProject.title}
          onUnlock={handleGateUnlock}
        />
      ) : null}
    </section>
  )
}
