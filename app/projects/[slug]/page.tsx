import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AmbientBackground } from "@/components/ambient-background"
import { CustomCursor } from "@/components/custom-cursor"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ProjectDetail } from "@/components/project-detail"
import { getProjectBySlug, projects } from "@/data/projects"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project — Studio" }
  return { title: `${project.title} — Studio` }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <AmbientBackground />
      <CustomCursor />
      <Navigation />
      <main className="relative min-h-screen">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  )
}
