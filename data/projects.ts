export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  caseStudy?: string
  longDescription?: string
}

const PLACEHOLDER_CASE_STUDY =
  "A short placeholder case study. Replace this with a 3–4 line overview of the project — the problem, your approach, and the outcome. Keep it focused on the impact and the key design decisions that mattered most."

export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Project One",
    description: "A short placeholder description.",
    tags: ["UX Design"],
    image: "/projects/project-1/main.png",
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
  {
    slug: "project-2",
    title: "Project Two",
    description: "A short placeholder description.",
    tags: ["UX Design"],
    image: "/projects/project-2/main.png",
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
  {
    slug: "project-3",
    title: "Project Three",
    description: "A short placeholder description.",
    tags: ["UX Design"],
    image: "/projects/project-3/main.png",
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
  {
    slug: "project-4",
    title: "Project Four",
    description: "A short placeholder description.",
    tags: ["UX Design"],
    image: "/projects/project-4/main.png",
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
  {
    slug: "project-5",
    title: "Project Five",
    description: "A short placeholder description.",
    tags: ["UX Design"],
    image: "/projects/project-5/main.png",
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
