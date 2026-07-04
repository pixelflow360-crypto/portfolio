const STORAGE_KEY = "portfolio:project-3-unlocked"

export const PROJECT_3_PASSWORD =
  process.env.NEXT_PUBLIC_PROJECT_3_PASSWORD ?? "portfolio"

export function isProjectUnlocked(slug: string): boolean {
  if (typeof window === "undefined") return false
  if (slug !== "project-3") return true
  return sessionStorage.getItem(STORAGE_KEY) === "true"
}

export function unlockProject(slug: string): void {
  if (slug !== "project-3") return
  sessionStorage.setItem(STORAGE_KEY, "true")
}

export function verifyProjectPassword(password: string): boolean {
  return password === PROJECT_3_PASSWORD
}
