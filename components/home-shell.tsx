"use client"

import { useCallback, useLayoutEffect, useState } from "react"
import { SplashReadyProvider } from "@/components/splash-ready"
import {
  markSplashSeen,
  shouldShowSplash,
  SplashScreen,
} from "@/components/splash-screen"

type HomeShellProps = {
  children: React.ReactNode
}

export function HomeShell({ children }: HomeShellProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    if (!shouldShowSplash()) {
      setShowSplash(false)
      setReady(true)
    }
  }, [])

  const handleSplashComplete = useCallback(() => {
    markSplashSeen()
    setShowSplash(false)
    setReady(true)
  }, [])

  return (
    <SplashReadyProvider ready={ready}>
      {showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : null}
      {children}
    </SplashReadyProvider>
  )
}
