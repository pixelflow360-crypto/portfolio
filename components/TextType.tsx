"use client"

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import "./TextType.css"

interface TextTypeProps {
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: string | ReactNode
  cursorBlinkDuration?: number
  cursorClassName?: string
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  textColors?: string[]
  variableSpeed?: { min: number; max: number }
  onSentenceComplete?: (sentence: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
}

type MachineState = {
  textIndex: number
  charIndex: number
  deleting: boolean
}

export default function TextType({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & HTMLAttributes<HTMLElement>) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(!startOnVisible)

  const containerRef = useRef<HTMLElement>(null)
  const displayedRef = useRef("")
  const machineRef = useRef<MachineState>({
    textIndex: 0,
    charIndex: 0,
    deleting: false,
  })

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const configRef = useRef({
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    loop,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    textArray,
  })

  configRef.current = {
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    loop,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    textArray,
  }

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!isVisible) return

    let cancelled = false
    let timeoutId = 0

    const getProcessedText = (index: number) => {
      const value = configRef.current.textArray[index] ?? ""
      return configRef.current.reverseMode
        ? value.split("").reverse().join("")
        : value
    }

    const getDelay = (base: number) => {
      const { variableSpeed: vs } = configRef.current
      if (!vs) return base
      return Math.random() * (vs.max - vs.min) + vs.min
    }

    const commitDisplay = (value: string) => {
      displayedRef.current = value
      setDisplayedText(value)
    }

    const schedule = (delay: number, fn: () => void) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) fn()
      }, delay)
    }

    const tick = () => {
      const cfg = configRef.current
      const state = machineRef.current
      const processedText = getProcessedText(state.textIndex)
      const isLastText = state.textIndex === cfg.textArray.length - 1

      if (state.deleting) {
        if (displayedRef.current.length === 0) {
          state.deleting = false
          state.charIndex = 0
          setIsActive(false)

          cfg.onSentenceComplete?.(cfg.textArray[state.textIndex], state.textIndex)

          if (isLastText && !cfg.loop) return

          const nextIndex = isLastText ? 0 : state.textIndex + 1
          state.textIndex = nextIndex
          setCurrentTextIndex(nextIndex)
          schedule(cfg.pauseDuration, tick)
          return
        }

        commitDisplay(displayedRef.current.slice(0, -1))
        setIsActive(true)
        schedule(getDelay(cfg.deletingSpeed), tick)
        return
      }

      if (state.charIndex < processedText.length) {
        const nextChar = processedText[state.charIndex]
        state.charIndex += 1
        commitDisplay(displayedRef.current + nextChar)
        setIsActive(true)
        schedule(getDelay(cfg.typingSpeed), tick)
        return
      }

      if (!cfg.loop && isLastText) {
        setIsActive(false)
        return
      }

      setIsActive(false)
      schedule(cfg.pauseDuration, () => {
        machineRef.current.deleting = true
        tick()
      })
    }

    machineRef.current = { textIndex: 0, charIndex: 0, deleting: false }
    commitDisplay("")
    setCurrentTextIndex(0)
    setIsActive(false)

    schedule(configRef.current.initialDelay, tick)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [isVisible, textArray])

  const textColor =
    textColors.length === 0 ? "inherit" : textColors[currentTextIndex % textColors.length]

  const shouldHideCursor = hideCursorWhileTyping && isActive

  const cursorStyle =
    cursorBlinkDuration !== 0.5
      ? ({ animationDuration: `${cursorBlinkDuration}s` } as const)
      : undefined

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props,
    },
    <>
      <span className="text-type__content" style={{ color: textColor }}>
        {displayedText}
      </span>
      {showCursor && (
        <span
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`}
          style={cursorStyle}
          aria-hidden
        >
          {cursorCharacter}
        </span>
      )}
    </>,
  )
}
