"use client"

import { useRef, useState, type FormEvent } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Clock, Globe, Mail, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const EASE = [0.16, 1, 0.3, 1] as const

const META_ITEMS = [
  { icon: Clock, label: "Responds within 24 hours" },
  { icon: Globe, label: "Working globally, based remotely" },
]

const LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub", href: "#" },
]

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" })

  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      e.currentTarget?.reset()
      setTimeout(() => setSent(false), 4000)
    }, 800)
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20 xl:gap-28"
      >
        {/* ── Left column: context & info ─────────────────────────────── */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col justify-between gap-10"
        >
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Contact
            </p>

            <h2 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-[3.5rem] md:leading-[1.05]">
              Have a project
              <br />
              worth building?
            </h2>

            <p className="max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
              Tell me about your product, your team, and the problem you&apos;re
              trying to solve. I reply to every thoughtful message.
            </p>
          </div>

          {/* Availability + meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-foreground">
                Available for new projects
              </span>
            </div>

            {META_ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>

          {/* Email + social */}
          <div className="space-y-4">
            <a
              href="mailto:hello@example.com"
              data-cursor="hover"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <Mail className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="underline-offset-4 group-hover:underline">
                hello@example.com
              </span>
            </a>

            <div className="flex items-center gap-5">
              {LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right column: form card ──────────────────────────────────── */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
        >
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_20px_60px_-15px_color-mix(in_oklch,var(--foreground)_4%,transparent)] lg:p-10">
            <p className="mb-8 font-heading text-xl font-medium tracking-tight text-foreground">
              Send a message
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-muted-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    data-cursor="hover"
                    className="border-border bg-background/60 transition-shadow duration-300 focus-visible:border-foreground focus-visible:ring-0 focus-visible:shadow-[0_0_22px_color-mix(in_oklch,var(--glow)_18%,transparent)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@studio.com"
                    data-cursor="hover"
                    className="border-border bg-background/60 transition-shadow duration-300 focus-visible:border-foreground focus-visible:ring-0 focus-visible:shadow-[0_0_22px_color-mix(in_oklch,var(--glow)_18%,transparent)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-muted-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project — scope, timeline, challenges…"
                  data-cursor="hover"
                  className="border-border bg-background/60 transition-shadow duration-300 focus-visible:border-foreground focus-visible:ring-0 focus-visible:shadow-[0_0_22px_color-mix(in_oklch,var(--glow)_18%,transparent)]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading || sent}
                data-cursor="hover"
                className="w-full rounded-xl bg-foreground text-background transition-all duration-300 hover:bg-foreground hover:shadow-[0_0_28px_color-mix(in_oklch,var(--glow)_28%,transparent)] disabled:opacity-70"
              >
                {sent ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Message sent — I&apos;ll be in touch
                  </span>
                ) : loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                    Sending…
                  </span>
                ) : (
                  "Send message →"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                No spam, ever. Just a direct conversation.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
