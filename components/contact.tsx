"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const focusGlow =
  "border-border bg-transparent transition-shadow duration-300 focus-visible:border-foreground focus-visible:ring-0 focus-visible:shadow-[0_0_22px_color-mix(in_oklch,var(--glow)_22%,transparent)]"

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    e.currentTarget.reset()
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Contact
        </p>
        <h2 className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl">
          Have a problem worth solving?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          Tell me about your product and where it&apos;s getting stuck. I reply
          to every thoughtful message.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-muted-foreground">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Your name"
              className={focusGlow}
              data-cursor="hover"
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
              placeholder="you@studio.com"
              className={focusGlow}
              data-cursor="hover"
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
            rows={5}
            placeholder="What are you working on?"
            className={focusGlow}
            data-cursor="hover"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          data-cursor="hover"
          className="w-full rounded-full bg-foreground text-background transition-all duration-300 hover:bg-foreground hover:shadow-[0_0_28px_color-mix(in_oklch,var(--glow)_30%,transparent)] sm:w-auto"
        >
          {sent ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" /> Message sent
            </span>
          ) : (
            "Send message"
          )}
        </Button>
      </motion.form>
    </section>
  )
}
