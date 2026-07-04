import dynamic from "next/dynamic"
import { HomeShell } from "@/components/home-shell"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { SectionSkeleton } from "@/components/section-skeleton"

const AmbientBackground = dynamic(
  () =>
    import("@/components/ambient-background").then((mod) => ({
      default: mod.AmbientBackground,
    })),
  { loading: () => null },
)

const Projects = dynamic(
  () =>
    import("@/components/projects").then((mod) => ({
      default: mod.Projects,
    })),
  {
    loading: () => (
      <SectionSkeleton className="my-28 h-[640px] md:my-36 md:h-[720px]" />
    ),
  },
)

const Process = dynamic(
  () =>
    import("@/components/process").then((mod) => ({
      default: mod.Process,
    })),
  {
    loading: () => (
      <SectionSkeleton className="my-28 h-[520px] md:my-36 md:h-[600px]" />
    ),
  },
)

const Skills = dynamic(
  () =>
    import("@/components/skills").then((mod) => ({
      default: mod.Skills,
    })),
  {
    loading: () => (
      <SectionSkeleton className="my-28 h-[480px] md:my-36 md:h-[540px]" />
    ),
  },
)

const Contact = dynamic(
  () =>
    import("@/components/contact").then((mod) => ({
      default: mod.Contact,
    })),
  {
    loading: () => (
      <SectionSkeleton className="my-28 h-[420px] md:my-36 md:h-[480px]" />
    ),
  },
)

const Footer = dynamic(
  () =>
    import("@/components/footer").then((mod) => ({
      default: mod.Footer,
    })),
)

export default function Page() {
  return (
    <HomeShell>
      <AmbientBackground />
      <Navigation />
      <main className="relative">
        <Hero />
        <Projects />
        <Process />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </HomeShell>
  )
}
