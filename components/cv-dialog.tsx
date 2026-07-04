"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const FOCUS = [
  "Landing Pages",
  "Webflow",
  "Figma",
  "Claude",
  "Animations",
  "Product & UX Design",
  "Design Systems",
  "Creative Development",
  "Prototyping",
]

type CvDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CvDialog({ open, onOpenChange }: CvDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/75 backdrop-blur-sm" />
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] max-h-[min(90vh,820px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border/60 bg-[oklch(0.12_0.004_285)] p-0 text-sm text-popover-foreground shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-foreground/8 outline-none sm:max-w-md",
            "duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          )}
        >
          <div className="border-b border-border/50 px-8 pb-7 pt-9">
            <DialogHeader className="gap-3 text-left">
              <p className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
                Curriculum Vitae
              </p>
              <DialogTitle className="font-heading text-3xl font-medium tracking-tighter text-foreground">
                Shalva
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                UX Designer · Creative Technologist
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-8 px-8 py-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  Experience
                </p>
                <p className="font-heading text-2xl font-medium tracking-tight text-foreground">
                  5+ years
                </p>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  Education
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  Bachelor&apos;s degree in Fine Arts
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                About
              </p>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                I design thoughtful digital products where clarity, craft, and
                usability meet. From early discovery to polished interfaces, I
                help teams ship work that feels intentional and effortless to
                use.
              </p>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Focus
              </p>
              <ul className="flex flex-wrap gap-2">
                {FOCUS.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DialogClose
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
