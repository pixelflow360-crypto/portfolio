export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const REVEAL_TRANSITION = {
  duration: 0.85,
  ease: EASE_OUT,
} as const

export const HOVER_TRANSITION = {
  duration: 0.95,
  ease: EASE_OUT,
} as const

/** Smooth zoom + color fade on project card images */
export const CARD_IMAGE_HOVER = {
  duration: 0.88,
  ease: [0.33, 1, 0.68, 1] as const,
}

export function revealDelay(index: number, maxStagger = 3) {
  return Math.min(index, maxStagger) * 0.07
}
