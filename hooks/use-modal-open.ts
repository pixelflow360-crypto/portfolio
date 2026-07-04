"use client"

import { useEffect } from "react"

export function useModalOpen(open: boolean) {
  useEffect(() => {
    if (!open) return

    document.documentElement.dataset.modalOpen = "true"

    return () => {
      delete document.documentElement.dataset.modalOpen
    }
  }, [open])
}
