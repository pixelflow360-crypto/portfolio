import type { Metadata } from "next"
import { AmbientBackground } from "@/components/ambient-background"
import { Navigation } from "@/components/navigation"
import { ProjectPlaceholder } from "@/components/project-placeholder"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Project Two — Studio",
}

export default function ProjectTwoPage() {
  return (
    <>
      <AmbientBackground />
      <Navigation />
      <main className="relative min-h-screen">
        <ProjectPlaceholder title="Project Two" />
      </main>
      <Footer />
    </>
  )
}
