"use client"

import { useState } from "react"
import { Clock, Lock, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ProjectAccess } from "@/data/projects"
import { useModalOpen } from "@/hooks/use-modal-open"
import { verifyProjectPassword } from "@/lib/project-access"

type ProjectAccessModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: ProjectAccess
  projectTitle: string
  onUnlock?: () => void
}

export function ProjectAccessModal({
  open,
  onOpenChange,
  mode,
  projectTitle,
  onUnlock,
}: ProjectAccessModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  useModalOpen(open)

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setPassword("")
      setError(false)
    }
    onOpenChange(next)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (verifyProjectPassword(password)) {
      setError(false)
      onUnlock?.()
      handleOpenChange(false)
      return
    }
    setError(true)
  }

  const isPassword = mode === "password"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 border-border/60 bg-[oklch(0.12_0.004_285)] p-0 sm:max-w-sm"
      >
        <div className="px-8 pb-8 pt-9">
          <DialogHeader className="gap-4 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/40">
              {isPassword ? (
                <Lock className="h-4 w-4 text-foreground/80" />
              ) : (
                <Clock className="h-4 w-4 text-foreground/80" />
              )}
            </div>
            <div className="space-y-2">
              <DialogTitle className="font-heading text-2xl font-medium tracking-tighter text-foreground">
                {isPassword ? "Protected project" : "Case study pending"}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {isPassword ? (
                  <>
                    <span className="text-foreground/90">{projectTitle}</span>{" "}
                    is locked. Enter the access password to view the full
                    project.
                  </>
                ) : (
                  <>
                    The write-up for{" "}
                    <span className="text-foreground/90">{projectTitle}</span>{" "}
                    is still in progress and will be published soon.
                  </>
                )}
              </DialogDescription>
            </div>
          </DialogHeader>

          {isPassword ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="project-password"
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
                >
                  Password
                </Label>
                <Input
                  id="project-password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setError(false)
                  }}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="border-border/70 bg-background/40"
                />
                {error ? (
                  <p className="text-xs text-destructive">
                    Incorrect password. Please try again.
                  </p>
                ) : null}
              </div>
              <Button type="submit" className="w-full">
                Unlock project
              </Button>
            </form>
          ) : (
            <div className="mt-8 rounded-lg border border-border/50 bg-background/30 px-4 py-3">
              <p className="text-center text-sm tracking-wide text-muted-foreground">
                Case study pending
              </p>
            </div>
          )}
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
      </DialogContent>
    </Dialog>
  )
}
