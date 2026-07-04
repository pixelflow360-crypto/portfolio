let silkModulePromise: Promise<typeof import("@/components/Silk")> | null = null

export function preloadSilk() {
  if (!silkModulePromise) {
    silkModulePromise = import("@/components/Silk")
  }
  return silkModulePromise
}
