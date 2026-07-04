"use client"

import { createContext, useContext } from "react"

const SplashReadyContext = createContext(true)

export function SplashReadyProvider({
  ready,
  children,
}: {
  ready: boolean
  children: React.ReactNode
}) {
  return (
    <SplashReadyContext.Provider value={ready}>
      {children}
    </SplashReadyContext.Provider>
  )
}

export function useSplashReady() {
  return useContext(SplashReadyContext)
}
