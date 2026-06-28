import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AmbientBackground } from "@/components/ambient-background"
import { Navigation } from "@/components/navigation"
import { ProjectDetail } from "@/components/project-detail"
import { Footer } from "@/components/footer"
import { getProjectBySlug, projects } from "@/data/projects"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Project not found" }
  }

  return {
    title: `${project.title} — Studio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <AmbientBackground />
      <Navigation />
      <main className="relative min-h-screen">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  )
}
