export function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isTouchDevice() {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 768px)").matches
  )
}

export function isLowPowerDevice() {
  if (typeof window === "undefined") return false
  const nav = navigator as Navigator & {
    deviceMemory?: number
    hardwareConcurrency?: number
  }
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4
  const lowCores =
    nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4
  return lowMemory || lowCores || isTouchDevice()
}
