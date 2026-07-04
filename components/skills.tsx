"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

// ─── Token helpers for syntax highlighting ────────────────────────────────────
type Token = { t: string; c?: string }
const K = (t: string): Token => ({ t, c: "text-violet-400" })
const I = (t: string): Token => ({ t, c: "text-sky-300" })
const S = (t: string): Token => ({ t, c: "text-amber-300" })
const P = (t: string): Token => ({ t, c: "text-rose-300" })
const C = (t: string): Token => ({ t, c: "text-zinc-500 italic" })
const O = (t: string): Token => ({ t, c: "text-zinc-400" })
const N = (t: string): Token => ({ t })

// ─── Code to type out ─────────────────────────────────────────────────────────
const LINES: Token[][] = [
  [C("// toolkit.ts — capabilities of a UX designer")],
  [N("")],
  [K("const "), I("whoami"), O(" = "), S('"UX Designer · Creative Technologist"')],
  [N("")],
  [K("const "), I("skills"), O(" = {")],
  [N("  "), P("design:    "), O("[ "), S('"Figma"'), O(", "), S('"Framer"'), O(", "), S('"Webflow"'), O(", "), S('"Design Systems"'), O(" ],")],
  [N("  "), P("research:  "), O("[ "), S('"User Research"'), O(", "), S('"Usability Testing"'), O(", "), S('"Service Design"'), O(" ],")],
  [N("  "), P("technology:"), O("[ "), S('"Full Stack Dev"'), O(", "), S('"Claude AI"'), O(", "), S('"Make"'), O(", "), S('"Figma Make"'), O(" ],")],
  [N("  "), P("strategy:  "), O("[ "), S('"Design Strategy"'), O(", "), S('"Accessibility"'), O(", "), S('"Interaction Design"'), O(" ],")],
  [O("}")],
  [N("")],
  [C("// daily drivers")],
  [K("const "), I("tools"), O(" = [ "), S('"Figma"'), O(", "), S('"Claude AI"'), O(", "), S('"Framer"'), O(", "), S('"VS Code"'), O(" ]")],
  [N("")],
  [K("export default "), O("{ "), I("whoami"), O(", "), I("skills"), O(", "), I("tools"), O(" }")],
  [N("")],
  [C("// ● Available for new projects")],
]

const EASE = EASE_OUT

// ─── Blinking cursor ──────────────────────────────────────────────────────────
// Hard on/off keyframes (no fade) at a ~530ms cadence mimic a real terminal
// caret / live typing. `times` holds each state flat so the blink reads crisp.
function BlinkCursor() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1.06,
        times: [0, 0.5, 0.5, 1],
        repeat: Infinity,
        ease: "linear",
      }}
      className="inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-sky-400"
    />
  )
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px 0px" })
  const isTerminalInView = useInView(terminalRef, { once: true, margin: "-80px 0px" })

  const [revealedLines, setRevealedLines] = useState(reduced ? LINES.length : 0)
  const [typingDone, setTypingDone] = useState(!!reduced)

  useEffect(() => {
    if (reduced) {
      setRevealedLines(LINES.length)
      setTypingDone(true)
      return
    }

    if (!isTerminalInView) return

    let currentLine = 0
    let interval: ReturnType<typeof setInterval>

    const startDelay = window.setTimeout(() => {
      interval = setInterval(() => {
        currentLine++
        setRevealedLines(currentLine)
        if (currentLine >= LINES.length) {
          clearInterval(interval)
          setTypingDone(true)
        }
      }, 85)
    }, 350)

    return () => {
      window.clearTimeout(startDelay)
      clearInterval(interval)
    }
  }, [isTerminalInView, reduced])

  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-14 md:mb-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              Capabilities
            </motion.p>
            <motion.h2
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="text-balance font-heading text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl"
            >
              A toolkit built
              <br />
              around people
            </motion.h2>
          </div>
          <motion.p
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="max-w-sm text-pretty text-base leading-relaxed text-muted-foreground md:text-right"
          >
            Design, research, and technology skills refined across 7+ years of
            product work.
          </motion.p>
        </div>
      </div>

      {/* ── Terminal window ────────────────────────────────────────────── */}
      <motion.div
        ref={terminalRef}
        animate={
          isTerminalInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.8, ease: EASE }}
        className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-[#111113] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-4 font-mono text-xs text-zinc-500">toolkit.ts</span>
        </div>

        {/* Code area — lines appear as typed */}
        <div className="overflow-x-auto px-4 py-6 font-mono text-[0.8rem] leading-7 md:px-8">
          {LINES.slice(0, revealedLines).map((tokens, lineIdx) => (
            <div
              key={lineIdx}
              className="flex min-h-[1.75rem] items-start"
            >
              <span className="mr-6 min-w-[1.5rem] select-none text-right text-[0.7rem] leading-7 text-zinc-600">
                {lineIdx + 1}
              </span>
              <code>
                {tokens.map((token, ti) =>
                  token.c ? (
                    <span key={ti} className={token.c}>
                      {token.t}
                    </span>
                  ) : (
                    token.t
                  ),
                )}
                {/* Cursor travels with the last revealed line while typing */}
                {lineIdx === revealedLines - 1 && !typingDone && (
                  <BlinkCursor />
                )}
              </code>
            </div>
          ))}

          {/* Cursor — always visible and blinking after typing completes */}
          {typingDone && (
            <div className="flex min-h-[1.75rem] items-center">
              <span className="mr-6 min-w-[1.5rem] select-none text-right text-[0.7rem] leading-7 text-zinc-600">
                {LINES.length + 1}
              </span>
              <code>
                <BlinkCursor />
              </code>
            </div>
          )}

          {/* Cursor blinking before typing starts (idle state) */}
          {revealedLines === 0 && (
            <div className="flex min-h-[1.75rem] items-center">
              <span className="mr-6 min-w-[1.5rem] select-none text-right text-[0.7rem] leading-7 text-zinc-600">
                1
              </span>
              <code>
                <BlinkCursor />
              </code>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-6 border-t border-zinc-800 bg-[#111113] px-4 py-2">
          <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-sky-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            TypeScript
          </span>
          <span className="font-mono text-[0.7rem] text-zinc-600">
            {LINES.length} lines
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.7rem] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for new projects
          </span>
        </div>
      </motion.div>
    </section>
  )
}
