"use client"

import { useRef, useState } from "react"
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

type Step = {
  title: string
  description: string
  Icon: (props: { active?: boolean }) => React.ReactNode
}

function DiscoverIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      <circle
        cx="16"
        cy="16"
        r="4"
        className={active ? "fill-foreground" : "fill-foreground/70"}
      />
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="currentColor"
        strokeWidth="1"
        className={active ? "text-foreground/40" : "text-foreground/20"}
      />
    </svg>
  )
}

function DefineIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      {[6, 10, 14].map((r) => (
        <circle
          key={r}
          cx="16"
          cy="16"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          className={
            active ? "text-foreground/50" : "text-foreground/25"
          }
          style={{ opacity: 1 - (r - 6) / 12 }}
        />
      ))}
    </svg>
  )
}

function IdeateIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      {[
        [8, 10],
        [24, 10],
        [16, 24],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          className={active ? "fill-foreground" : "fill-foreground/60"}
        />
      ))}
      <path
        d="M8 10 L16 24 L24 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
        className={active ? "text-foreground/35" : "text-foreground/15"}
      />
    </svg>
  )
}

function PrototypeIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      <rect
        x="7"
        y="9"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className={active ? "text-foreground/70" : "text-foreground/30"}
      />
      <path
        d="M13 21 L19 15 L25 21"
        stroke="currentColor"
        strokeWidth="1"
        className={active ? "text-foreground/70" : "text-foreground/30"}
      />
      <circle
        cx="22"
        cy="11"
        r="4"
        className={active ? "fill-foreground/80" : "fill-foreground/40"}
      />
    </svg>
  )
}

function ValidateIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      {[12, 16, 20].map((r) => (
        <circle
          key={r}
          cx="16"
          cy="16"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          className={active ? "text-foreground/30" : "text-foreground/12"}
        />
      ))}
      <path
        d="M11 16 L14.5 19.5 L21 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-foreground" : "text-foreground/60"}
      />
    </svg>
  )
}

const steps: Step[] = [
  {
    title: "Discover",
    description: "Deep user interviews & competitive audits",
    Icon: DiscoverIcon,
  },
  {
    title: "Define",
    description: "Synthesising insights into frameworks",
    Icon: DefineIcon,
  },
  {
    title: "Ideate",
    description: "Rapid sketching & collaborative workshops",
    Icon: IdeateIcon,
  },
  {
    title: "Prototype",
    description: "High-fidelity interactive prototypes",
    Icon: PrototypeIcon,
  },
  {
    title: "Validate",
    description: "Usability testing & iteration until it sings",
    Icon: ValidateIcon,
  },
]

function ProcessStep({
  step,
  index,
  active,
  scrollYProgress,
}: {
  step: Step
  index: number
  active: boolean
  scrollYProgress: MotionValue<number>
}) {
  const fromLeft = index % 2 === 0
  const start = index * 0.14
  const end = start + 0.22

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [fromLeft ? -48 : 48, 0],
  )
  const mobileX = useTransform(scrollYProgress, [start, end], [-24, 0])

  const { Icon } = step

  return (
    <>
      {/* Desktop: alternating columns */}
      <div
        className={`relative hidden min-h-[11rem] items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-10 lg:gap-x-16 ${
          index < steps.length - 1 ? "md:pb-16" : ""
        }`}
      >
        <motion.div
          style={{ opacity, x: fromLeft ? x : undefined }}
          className={`flex ${fromLeft ? "justify-end text-right" : "justify-end"}`}
        >
          {fromLeft ? (
            <StepContent step={step} index={index} active={active} align="right" />
          ) : (
            <span aria-hidden />
          )}
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            style={{ opacity }}
            className={`flex h-14 w-14 items-center justify-center rounded-full border bg-background transition-shadow duration-500 ${
              active
                ? "border-foreground/40 shadow-[0_0_32px_color-mix(in_oklch,var(--glow)_35%,transparent)]"
                : "border-border"
            }`}
          >
            <Icon active={active} />
          </motion.div>
        </div>

        <motion.div
          style={{
            opacity,
            x: !fromLeft ? x : undefined,
          }}
          className={`flex ${!fromLeft ? "justify-start text-left" : "justify-start"}`}
        >
          {!fromLeft ? (
            <StepContent step={step} index={index} active={active} align="left" />
          ) : (
            <span aria-hidden />
          )}
        </motion.div>
      </div>

      {/* Mobile: stacked with left progress rail */}
      <motion.div
        style={{ opacity, x: mobileX }}
        className={`relative pl-12 md:hidden ${index < steps.length - 1 ? "pb-12" : ""}`}
      >
        <div
          className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border bg-background transition-shadow duration-500 ${
            active
              ? "border-foreground/40 shadow-[0_0_24px_color-mix(in_oklch,var(--glow)_30%,transparent)]"
              : "border-border"
          }`}
        >
          <Icon active={active} />
        </div>
        <StepContent step={step} index={index} active={active} align="left" />
      </motion.div>
    </>
  )
}

function StepContent({
  step,
  index,
  active,
  align,
}: {
  step: Step
  index: number
  active: boolean
  align: "left" | "right"
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p
        className={`text-xs uppercase tracking-[0.35em] transition-colors duration-500 ${
          active ? "text-foreground/80" : "text-muted-foreground"
        }`}
      >
        0{index + 1}
      </p>
      <h3
        className={`mt-2 font-heading text-2xl font-medium tracking-tight transition-all duration-500 sm:text-3xl ${
          active ? "text-foreground text-glow" : "text-foreground/85"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`mt-2 max-w-xs text-pretty text-sm leading-relaxed transition-colors duration-500 ${
          active ? "text-foreground/75" : "text-muted-foreground"
        } ${align === "right" ? "ml-auto" : ""}`}
      >
        {step.description}
      </p>
    </div>
  )
}

export function Process() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px 0px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(steps.length - 1, Math.floor(value * steps.length))
    setActiveIndex(index)
  })

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative scroll-mt-24 border-y border-border/60 bg-foreground/[0.02] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--glow)_4%,transparent),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          ref={headerRef}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Process
          </p>
          <h2 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            How I Work
          </h2>
        </motion.div>

        <div className="relative">
          {/* Desktop: central drawing line */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
            <div className="absolute inset-0 bg-foreground/10" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-foreground/70"
            />
          </div>

          {/* Mobile: left progress bar */}
          <div className="pointer-events-none absolute bottom-0 left-[22px] top-0 w-px md:hidden">
            <div className="absolute inset-0 bg-foreground/10" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-foreground/70"
            />
          </div>

          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              step={step}
              index={index}
              active={activeIndex === index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
