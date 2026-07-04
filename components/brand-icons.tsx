import { cn } from "@/lib/utils"

type IconProps = {
  className?: string
}

export function FigmaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("inline-block h-4 w-4 shrink-0", className)}
    >
      <path
        fill="#F24E1E"
        d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Z"
      />
      <path
        fill="#A259FF"
        d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z"
      />
      <path
        fill="#1ABCFE"
        d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z"
      />
      <path
        fill="#0ACF83"
        d="M12 0h4a4 4 0 0 1 0 8h-4V0Z"
      />
      <path
        fill="#FF7262"
        d="M20 4a4 4 0 0 1-4 4h-4V0h4a4 4 0 0 1 4 4Z"
      />
    </svg>
  )
}

export function WebflowIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("inline-block h-4 w-4 shrink-0", className)}
    >
      <path
        fill="#146EF5"
        d="M17.48 4.5c-.42 0-.76.34-.76.76v13.48c0 .42.34.76.76.76h1.04c.42 0 .76-.34.76-.76V5.26c0-.42-.34-.76-.76-.76h-1.04ZM4.76 4.5c-.42 0-.76.34-.76.76v13.48c0 .42.34.76.76.76H8.1c3.46 0 5.9-2.2 5.9-5.52 0-2.46-1.28-4.12-3.34-4.78l3.18-4.74c.14-.2.06-.46-.16-.46h-1.3c-.2 0-.38.1-.48.26L9.58 9.02H8.52V5.26c0-.42-.34-.76-.76-.76H4.76Z"
      />
    </svg>
  )
}

export function ProjectToolIcon({
  icon,
  className,
}: {
  icon: "figma" | "webflow"
  className?: string
}) {
  if (icon === "figma") return <FigmaIcon className={className} />
  return <WebflowIcon className={className} />
}
