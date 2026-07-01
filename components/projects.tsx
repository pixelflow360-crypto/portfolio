"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { projects } from "@/data/projects"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

const EASE = [0.16, 1, 0.3, 1] as const

const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

// Card hover — one cohesive Framer Motion spring drives lift + scale so the
// whole card feels like a single soft, physical response.
const hoverTransition = { type: "spring" as const, stiffness: 320, damping: 26, mass: 0.6 }

// Slide transition for switching projects inside the modal.
const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
}

// Full-bleed, high-quality modal image rendered at its natural aspect ratio
// (measured on load) so it fills the modal width with no negative space. The
// surrounding scroll region caps the height, keeping modal proportions in check.
function ModalImage({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState(1.41)
  return (
    <Image
      src={src}
      alt={alt}
      width={1440}
      height={Math.round(1440 / ratio)}
      quality={100}
      priority
      sizes="(max-width: 896px) 100vw, 896px"
      onLoad={(e) => {
        const img = e.currentTarget
        if (img.naturalWidth && img.naturalHeight) {
          setRatio(img.naturalWidth / img.naturalHeight)
        }
      }}
      className="h-auto w-full"
    />
  )
}

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px 0px" })
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px 0px" })

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const open = activeIndex !== null
  const active = activeIndex !== null ? projects[activeIndex] : null

  const paginate = useCallback((dir: number) => {
    setDirection(dir)
    setActiveIndex((prev) =>
      prev === null ? prev : (prev + dir + projects.length) % projects.length,
    )
  }, [])

  // Arrow-key navigation while the modal is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1)
      else if (e.key === "ArrowLeft") paginate(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, paginate])

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
      {/* Section header */}
      <motion.div
        ref={headerRef}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: EASE }}
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
        {projects.map((project, index) => (
          <motion.div key={project.slug} variants={card} className="relative">
            {/* Soft glow halo — opacity only, so it never affects layout */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="pointer-events-none absolute -inset-1 -z-10 rounded-[1.75rem] bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklch,var(--glow)_38%,transparent),transparent_75%)] opacity-0 blur-2xl"
            />
            <motion.button
              type="button"
              onClick={() => {
                setDirection(0)
                setActiveIndex(index)
              }}
              data-cursor="hover"
              aria-label={`Open ${project.title}`}
              initial={{ y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={hoverTransition}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 text-left transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--glow)_28%,transparent)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Soft glow wash on hover (no hard strokes) */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklch,var(--glow)_26%,transparent),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded project modal with slider navigation */}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) setActiveIndex(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[88vh] w-[calc(100vw-2rem)] max-w-4xl flex-col gap-0 overflow-hidden border-border bg-card p-0"
        >
          {active && (
            <>
              {/* Close */}
              <DialogClose
                aria-label="Close"
                className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground/80 backdrop-blur-md outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </DialogClose>

              {/* Image viewport — full width preserved, scrolls if tall */}
              <div className="relative min-h-[38vh] shrink-0">
                {/* Overlaid lightbox arrows (no extra framed bar) */}
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  data-cursor="hover"
                  aria-label="Previous project"
                  className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground/80 backdrop-blur-md outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  data-cursor="hover"
                  aria-label="Next project"
                  className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground/80 backdrop-blur-md outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="max-h-[58vh] min-h-[38vh] overflow-y-auto overflow-x-hidden overscroll-contain bg-zinc-950">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={active.slug}
                      custom={direction}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <ModalImage src={active.image} alt={active.title} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots overlay */}
                <div className="pointer-events-auto absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 backdrop-blur-md">
                  {projects.map((project, i) => (
                    <button
                      key={project.slug}
                      type="button"
                      onClick={() => {
                        setDirection(i > (activeIndex ?? 0) ? 1 : -1)
                        setActiveIndex(i)
                      }}
                      data-cursor="hover"
                      aria-label={`Go to ${project.title}`}
                      aria-current={i === activeIndex}
                      className={
                        i === activeIndex
                          ? "h-1.5 w-6 rounded-full bg-foreground transition-all duration-300"
                          : "h-1.5 w-1.5 rounded-full bg-muted-foreground/50 transition-all duration-300 hover:bg-muted-foreground"
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={active.slug}
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <ul className="mb-4 flex flex-wrap gap-2">
                      {active.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <DialogTitle className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                      {active.title}
                    </DialogTitle>
                    <DialogDescription className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {active.caseStudy ?? active.description}
                    </DialogDescription>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
