"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "framer-motion"
import { useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import "./TiltedCard.css"

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"]
  altText?: string
  captionText?: string
  tooltipContent?: ReactNode
  containerHeight?: React.CSSProperties["height"]
  containerWidth?: React.CSSProperties["width"]
  imageHeight?: React.CSSProperties["height"]
  imageWidth?: React.CSSProperties["width"]
  scaleOnHover?: number
  rotateAmplitude?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
  className?: string
  imageAspect?: number
  transparentArtwork?: boolean
}

const MAX_W = "min(92vw, 980px)"
const MAX_H = "min(72vh, 760px)"
/** Matches projects 1–3 frame width for consistent slider sizing. */
const REFERENCE_ASPECT = 4320 / 3072
const STANDARD_FRAME_WIDTH = `min(92vw, 980px, calc(${MAX_H} * ${REFERENCE_ASPECT}))`

const tiltSpring: SpringOptions = {
  stiffness: 170,
  damping: 26,
  mass: 0.55,
}

const scaleSpring: SpringOptions = {
  stiffness: 240,
  damping: 32,
  mass: 0.45,
}

const tooltipSpring: SpringOptions = {
  stiffness: 320,
  damping: 34,
  mass: 0.35,
}

export function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  tooltipContent,
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  className,
  imageAspect,
  transparentArtwork = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const rotateX = useSpring(0, tiltSpring)
  const rotateY = useSpring(0, tiltSpring)
  const rotateZ = useSpring(0, tiltSpring)
  const translateZ = useSpring(0, tiltSpring)
  const scale = useSpring(1, scaleSpring)
  const opacity = useSpring(0, tooltipSpring)
  const rotateFigcaption = useSpring(0, {
    stiffness: 280,
    damping: 28,
    mass: 0.5,
  })

  const smoothPointerX = useSpring(pointerX, tooltipSpring)
  const smoothPointerY = useSpring(pointerY, tooltipSpring)
  const smoothGlareX = useSpring(glareX, { stiffness: 200, damping: 28, mass: 0.5 })
  const smoothGlareY = useSpring(glareY, { stiffness: 200, damping: 28, mass: 0.5 })

  const boxShadow = useTransform(
    [rotateX, rotateY, translateZ],
    ([rx, ry, tz]) => {
      if (transparentArtwork) return "none"
      const depth = 28 + (tz as number) * 0.6
      const x = (ry as number) * 2.4
      const y = (rx as number) * -2.4 + depth
      const blur = 52 + (tz as number) * 1.4
      return `${x}px ${y}px ${blur}px -16px color-mix(in oklch, var(--foreground) 22%, transparent)`
    },
  )

  const glareBackground = useTransform(
    [smoothGlareX, smoothGlareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, color-mix(in oklch, white 28%, transparent) 0%, transparent 58%)`,
  )

  const [lastY, setLastY] = useState(0)

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    const normX = offsetX / (rect.width / 2)
    const normY = offsetY / (rect.height / 2)

    rotateX.set(-normY * rotateAmplitude)
    rotateY.set(normX * rotateAmplitude)
    rotateZ.set(normX * rotateAmplitude * 0.14)
    translateZ.set(transparentArtwork ? 0 : Math.min(Math.hypot(normX, normY) * 22, 28))

    pointerX.set(e.clientX - rect.left)
    pointerY.set(e.clientY - rect.top)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)

    const velocityY = offsetY - lastY
    rotateFigcaption.set(-velocityY * 0.35)
    setLastY(offsetY)
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover)
    opacity.set(1)
  }

  function handleMouseLeave() {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateZ.set(0)
    translateZ.set(0)
    rotateFigcaption.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  const hasTooltip = showTooltip && (tooltipContent || captionText)

  const framed = !transparentArtwork && imageAspect != null
  const frameWidth = transparentArtwork
    ? STANDARD_FRAME_WIDTH
    : framed
      ? `min(92vw, 980px, calc(${MAX_H} * ${imageAspect}))`
      : containerWidth
  const frameHeight = framed || transparentArtwork ? "auto" : containerHeight
  const mediaWidth =
    framed || transparentArtwork ? "100%" : imageWidth
  const mediaHeight =
    framed ? "100%" : transparentArtwork ? "auto" : imageHeight

  const transparentMediaStyle = transparentArtwork
    ? {
        width: "100%" as const,
        height: "auto" as const,
      }
    : undefined

  return (
    <figure
      ref={ref}
      className={cn(
        "tilted-card-figure",
        transparentArtwork && "tilted-card-figure--transparent",
        className,
      )}
      style={{
        width: frameWidth,
        height: frameHeight,
        ...(framed
          ? {
              aspectRatio: imageAspect,
              maxHeight: MAX_H,
            }
          : {}),
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          Tilt effect is reduced on mobile — best on desktop.
        </div>
      )}

      <motion.div
        className={cn(
          "tilted-card-inner",
          transparentArtwork && "tilted-card-inner--transparent",
        )}
        style={{
          width: mediaWidth,
          height: mediaHeight,
          rotateX,
          rotateY,
          rotateZ,
          z: translateZ,
          scale,
          boxShadow,
          transformPerspective: 1400,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          decoding="async"
          className={cn(
            "tilted-card-img",
            transparentArtwork && "tilted-card-img--transparent",
          )}
          style={{
            width: mediaWidth,
            height: mediaHeight,
            z: transparentArtwork ? 0 : 36,
            ...transparentMediaStyle,
          }}
        />

        {!transparentArtwork && (
          <motion.div
            className="tilted-card-glare"
            aria-hidden
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>

      {hasTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x: smoothPointerX,
            y: smoothPointerY,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {tooltipContent ?? captionText}
        </motion.figcaption>
      )}
    </figure>
  )
}
