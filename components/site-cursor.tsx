"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { isLowPowerDevice, isTouchDevice } from "@/lib/device"

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
  loading: () => null,
})

export function SiteCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!reduced && !isTouchDevice() && !isLowPowerDevice())
  }, [reduced])

  if (!enabled) return null

  return (
    <SplashCursor
      SIM_RESOLUTION={96}
      DYE_RESOLUTION={720}
      DENSITY_DISSIPATION={2.5}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.25}
      CURL={3}
      SPLAT_RADIUS={0.28}
      SPLAT_FORCE={4800}
      COLOR_UPDATE_SPEED={20}
      SHADING
      RAINBOW_MODE
      COLOR="#A855F7"
    />
  )
}
