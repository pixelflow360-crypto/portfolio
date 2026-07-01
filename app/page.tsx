import { AmbientBackground } from "@/components/ambient-background"
import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Process } from "@/components/process"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <AmbientBackground />
      <CustomCursor />
      <Navigation />
      <main className="relative">
        <Hero />
        <Projects />
        <Process />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
