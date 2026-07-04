import { cn } from "@/lib/utils"

type LogoMarkProps = {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-8 items-center justify-center px-3.5 sm:h-9 sm:px-4",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 h-full w-full text-foreground/40"
        fill="none"
      >
        <path
          d="M 9 6 H 91 Q 94 6 94 9 V 27 Q 94 30 91 30 H 9 Q 6 30 6 27 V 9 Q 6 6 9 6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="relative z-10 font-heading text-[11px] font-medium leading-none tracking-wide text-foreground sm:text-xs">
        shacoux
      </span>
    </span>
  )
}
