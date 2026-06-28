"use client"

import { motion } from "framer-motion"

function RotatingSculpture() {
  return (
    <div
      className="relative flex aspect-square w-full items-center justify-center"
      style={{ perspective: "1000px" }}
      aria-hidden
    >
      <div
        className="absolute h-48 w-48 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--glow) 14%, transparent), transparent 70%)",
        }}
      />
      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{
          duration: 26,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[
          "rotateY(0deg) translateZ(80px)",
          "rotateY(90deg) translateZ(80px)",
          "rotateY(180deg) translateZ(80px)",
          "rotateY(270deg) translateZ(80px)",
          "rotateX(90deg) translateZ(80px)",
          "rotateX(-90deg) translateZ(80px)",
        ].map((transform, i) => (
          <div
            key={i}
            className="absolute h-40 w-40 rounded-lg border border-foreground/25 bg-foreground/[0.03] backdrop-blur-sm"
            style={{
              transform,
              left: "-80px",
              top: "-80px",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            About
          </p>
          <h2 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl">
            Quiet design, deliberate decisions
          </h2>
          <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a UX designer working at the intersection of research and
              craft. For over a decade I&apos;ve helped teams turn ambiguous
              problems into products people actually understand.
            </p>
            <p>
              My approach is simple: listen first, prototype early, and remove
              everything that doesn&apos;t serve the person on the other side of
              the screen. I prefer to stay behind the work — the outcomes speak
              louder than a name.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <dt className="text-3xl font-medium tracking-tight text-foreground">
                12+
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                Years designing products
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-medium tracking-tight text-foreground">
                40+
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                Shipped engagements
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-first md:order-last"
        >
          <RotatingSculpture />
        </motion.div>
      </div>
    </section>
  )
}
