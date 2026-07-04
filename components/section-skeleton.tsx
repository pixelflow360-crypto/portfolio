import { cn } from "@/lib/utils"

export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto max-w-6xl animate-pulse rounded-xl bg-muted/20",
        className,
      )}
    />
  )
}
