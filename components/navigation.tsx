"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CvDialog } from "@/components/cv-dialog"
import { LogoMark } from "@/components/logo-mark"

const links = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const

function Logo() {
  return (
    <a
      href="/"
      aria-label="shacoux — Home"
      className="relative inline-flex shrink-0 items-center justify-center"
    >
      <LogoMark />
    </a>
  )
}

const navLinkClass =
  "group relative text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const openCv = () => {
    setOpen(false)
    setCvOpen(true)
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
          <Logo />

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={navLinkClass}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={openCv} className={navLinkClass}>
                CV
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col px-6 py-4">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-lg tracking-tight text-foreground"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * links.length }}
                >
                  <button
                    type="button"
                    onClick={openCv}
                    className="block w-full py-3 text-left text-lg tracking-tight text-foreground"
                  >
                    CV
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CvDialog open={cvOpen} onOpenChange={setCvOpen} />
    </>
  )
}
