"use client"

import SplashCursor from "@/components/SplashCursor"

export function SiteCursor() {
  return (
    <SplashCursor
      DENSITY_DISSIPATION={2.5}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.25}
      CURL={3}
      SPLAT_RADIUS={0.31}
      SPLAT_FORCE={6000}
      COLOR_UPDATE_SPEED={24}
      SHADING
      RAINBOW_MODE
      COLOR="#A855F7"
    />
  )
}
