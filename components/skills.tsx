"use client"

import { motion } from "framer-motion"

const skills = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Figma",
  "Usability Testing",
  "Design Systems",
  "Information Architecture",
  "Interaction Design",
  "Accessibility",
  "Service Design",
  "Journey Mapping",
  "Design Strategy",
  "Motion Design",
  "Rapid Prototyping",
  "Stakeholder Workshops",
]

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28 text-center md:py-36"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        Capabilities
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl"
      >
        A toolkit built around people
      </motion.h2>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.04 }}
        className="mt-12 flex flex-wrap justify-center gap-3"
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            data-cursor="hover"
            className="cursor-default rounded-full border border-border px-5 py-2.5 text-sm tracking-wide text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-[0_0_24px_color-mix(in_oklch,var(--glow)_25%,transparent)]"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
