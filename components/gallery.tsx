"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"

const galleryIds = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15]

const images = galleryIds.map((id, i) => ({
  src: `/gallery/gallery-${id}.png`,
  alt: `Conceptual landing page design ${i + 1}`,
}))

function GalleryHeader({
  opacity,
  y,
}: {
  opacity?: MotionValue<number>
  y?: MotionValue<number>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity, y }}
      className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Gallery
        </p>
        <h2 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          Some of my conceptual work
        </h2>
      </div>
      <p className="max-w-sm text-pretty text-base leading-relaxed text-muted-foreground md:text-right">
        A selection of conceptual landing pages and interface explorations —
        visual studies in clarity, rhythm, and restraint.
      </p>
    </motion.div>
  )
}

function ScreenImage({
  src,
  alt,
  priority,
  opacity,
}: {
  src: string
  alt: string
  priority: boolean
  opacity?: MotionValue<number>
}) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 bg-[#050505]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={100}
        sizes="(min-width: 1024px) 78vw, 92vw"
        className="object-contain object-center"
      />
    </motion.div>
  )
}

// Clamp raw progress stops into [0, 1] and dedupe shared boundaries (keeping
// the last value), yielding a strictly increasing stop array safe for
// Framer Motion's accelerated scroll keyframes.
function buildStops(points: Array<[number, number | string]>) {
  const map = new Map<number, number | string>()
  for (const [rawStop, value] of points) {
    const stop = Math.min(1, Math.max(0, rawStop))
    map.set(stop, value)
  }
  const stops = [...map.keys()].sort((a, b) => a - b)
  const values = stops.map((s) => map.get(s) as number | string)
  return { stops, values }
}

function StackCard({
  index,
  progress,
  src,
  alt,
}: {
  index: number
  progress: MotionValue<number>
  src: string
  alt: string
}) {
  const step = 1 / images.length

  // Each new screen is revealed as an opaque layer over the previous one.
  // This avoids crossfading text-heavy screenshots into each other.
  const pEnter = (index - 0.08) * step
  const pFront = (index + 0.28) * step

  // Stops are clamped to [0, 1] (and deduped, keeping the last value at a
  // shared boundary). Framer Motion accelerates scroll-linked transforms with
  // a ScrollTimeline whose keyframe offsets come from these stops, and those
  // offsets must be monotonically non-decreasing and within range.
  const xKeys = buildStops([
    [pEnter, "5%"],
    [pFront, "0%"],
  ])
  const scaleKeys = buildStops([
    [pEnter, 1.012],
    [pFront, 1],
  ])
  const clipKeys = buildStops([
    [pEnter, "inset(0% 100% 0% 0% round 0px)"],
    [pFront, "inset(0% 0% 0% 0% round 0px)"],
  ])

  const x = useTransform(progress, xKeys.stops, xKeys.values as string[])
  const scale = useTransform(progress, scaleKeys.stops, scaleKeys.values as number[])
  const clipPath = useTransform(progress, clipKeys.stops, clipKeys.values as string[])

  return (
    <motion.div
      style={{ x, scale, clipPath, zIndex: index + 1 }}
      className="absolute inset-0"
    >
      <ScreenImage src={src} alt={alt} priority={index < 3} />
    </motion.div>
  )
}

function MacBookMockup({
  progress,
  screenProgress,
}: {
  progress: MotionValue<number>
  screenProgress: MotionValue<number>
}) {
  const scale = useTransform(progress, [0, 0.1, 0.28, 1], [0.5, 0.58, 0.92, 0.94])
  const y = useTransform(progress, [0, 0.1, 0.28, 1], [124, 92, 12, 0])
  const rotateX = useTransform(progress, [0, 0.28], [12, 0])
  const rotateY = useTransform(progress, [0, 0.28], [-5, 0])
  const lidRotateX = useTransform(progress, [0, 0.08, 0.28], [-76, -52, 0])
  const screenOpacity = useTransform(progress, [0, 0.2, 0.32], [0, 0, 1])
  const blackoutOpacity = useTransform(screenOpacity, (v) => 1 - v)
  const closedPlateOpacity = useTransform(progress, [0, 0.12, 0.26], [1, 0.7, 0])

  return (
    <motion.div
      style={{
        scale,
        y,
        rotateX,
        rotateY,
        transformPerspective: 2200,
        transformStyle: "preserve-3d",
      }}
      className="relative mx-auto w-[min(86vw,calc((100vh-12rem)*1.44),70rem)] origin-center will-change-transform [backface-visibility:hidden]"
      aria-label="Conceptual work displayed inside an open MacBook mockup"
    >
      <div className="absolute inset-x-[8%] bottom-1 h-16 rounded-[100%] bg-black/55 blur-2xl" aria-hidden />

      <div className="relative mx-auto aspect-[16/10] w-full [perspective:1800px]">
        <motion.div
          style={{
            rotateX: lidRotateX,
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 z-20 rounded-[1.65rem] border border-foreground/20 bg-[linear-gradient(145deg,#18181a,#050505_58%,#111113)] p-2.5 shadow-[0_28px_80px_-48px_rgba(255,255,255,0.28),0_42px_90px_-44px_rgba(0,0,0,0.95)] [backface-visibility:hidden] will-change-transform"
        >
          <motion.div
            style={{ opacity: closedPlateOpacity }}
            className="absolute inset-2.5 rounded-[1.25rem] bg-[linear-gradient(145deg,#161618,#070707)] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(255,255,255,0.04)]"
            aria-hidden
          />
          <div className="absolute left-1/2 top-2 z-30 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/20 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
          <div className="relative h-full overflow-hidden rounded-[1.2rem] bg-black ring-1 ring-white/10 [backface-visibility:hidden] [transform:translateZ(0)]">
            <div className="pointer-events-none absolute inset-0 z-30 rounded-[1.2rem] ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute inset-[1px] z-30 rounded-[1.15rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_18%,transparent_78%,rgba(255,255,255,0.035))]" />
            {images.map((image, index) => (
              <StackCard
                key={image.src}
                index={index}
                progress={screenProgress}
                src={image.src}
                alt={image.alt}
              />
            ))}
            <motion.div className="absolute inset-0 z-40 bg-black" style={{ opacity: blackoutOpacity }} />
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-[86%]">
          <div className="relative mx-auto h-10 w-full">
            <div className="absolute inset-x-0 top-0 h-4 rounded-b-[2rem] bg-[linear-gradient(180deg,#2a2a2c,#101012)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_52px_-26px_rgba(0,0,0,0.95)]" />
            <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-xl bg-black/50" />
            <div className="absolute inset-x-[10%] top-4 h-5 rounded-b-full bg-[linear-gradient(180deg,#151517,#050505)]" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  const [frame, setFrame] = useState(1)
  const scaleY = useTransform(progress, [0, 1], [0, 1])
  const opacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0])
  const thumbY = useTransform(progress, [0, 1], ["0%", "100%"])

  useMotionValueEvent(progress, "change", (latest) => {
    setFrame(Math.min(images.length, Math.max(1, Math.floor(latest * images.length) + 1)))
  })

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute right-6 top-1/2 z-40 flex -translate-y-1/2 items-center gap-3 rounded-2xl border border-border bg-card/80 px-2.5 py-3 text-card-foreground shadow-[0_20px_70px_-36px_rgba(255,255,255,0.25)] backdrop-blur-xl"
      aria-hidden
    >
      <div className="flex h-32 flex-col items-center">
        <div className="relative h-full w-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            style={{ scaleY, transformOrigin: "50% 0%" }}
            className="absolute left-0 top-0 h-full w-full rounded-full bg-foreground"
          />
          <motion.span
            style={{ top: thumbY }}
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background bg-foreground shadow-[0_0_18px_rgba(255,255,255,0.26)]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[0.62rem] font-medium tabular-nums tracking-[0.18em] text-foreground/75">
          {String(frame).padStart(2, "0")}
        </span>
        <span className="h-px w-4 bg-border" />
        <span className="text-[0.62rem] font-medium tabular-nums tracking-[0.18em] text-muted-foreground">
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
      <div className="flex h-32 flex-col justify-between py-0.5">
        {images.map((image) => (
          <span key={image.src} className="h-1 w-1 rounded-full bg-muted-foreground/35" />
        ))}
      </div>
      {/* Keep a real progress bar shape in the DOM, matching shadcn/ui's simple Progress anatomy. */}
      <div className="sr-only">
        <motion.div
          style={{ scaleY, transformOrigin: "50% 0%" }}
          className="h-full w-full bg-foreground"
        />
      </div>
    </motion.div>
  )
}

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const headerOpacity = useTransform(scrollYProgress, [0, 0.075, 0.16], [1, 0.35, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.16], [0, -44])
  const screenProgress = useTransform(scrollYProgress, [0.3, 1], [0, 1])

  return (
    <section id="work" className="scroll-mt-24 overflow-x-clip bg-background">
      {/* Desktop / tablet: full-width scroll-driven stacked deck */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${images.length * 58 + 90}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-6xl px-6 pt-20 lg:pt-24">
            <GalleryHeader opacity={headerOpacity} y={headerY} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-6 pb-28 pt-32">
            <MacBookMockup progress={scrollYProgress} screenProgress={screenProgress} />
            <ScrollProgress progress={screenProgress} />
          </div>
        </div>
      </div>

      {/* Mobile: stacked vertical list with gentle fade/slide */}
      <div className="md:hidden">
        <div className="mx-auto max-w-6xl px-6 pt-24">
          <GalleryHeader />
        </div>
        <div className="mx-auto mt-10 flex max-w-md flex-col gap-6 px-6 pb-4">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index < 2}
                sizes="100vw"
                className="object-cover object-top"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
