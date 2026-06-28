export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
}

export const projects: Project[] = [
  {
    slug: "flowstate",
    title: "FlowState",
    description:
      "A mental health app that uses guided journaling and mood tracking based on cognitive behavioural principles.",
    longDescription:
      "FlowState helps users understand their emotional patterns through daily check-ins and personalised prompts. The design focused on creating a calming, non-judgmental space that encourages regular use without feeling clinical.",
    tags: ["UX Research", "Figma", "Prototyping", "Usability Testing"],
    image: "https://placehold.co/800x600/141414/FFFFFF?text=FlowState",
  },
  {
    slug: "loom",
    title: "Loom",
    description:
      "A collaborative whiteboard tool for remote design studios, focusing on real-time feedback loops.",
    longDescription:
      "Loom was built to reduce friction in remote design critiques. The interface combines infinite canvas freedom with structured feedback threads, allowing teams to annotate, vote, and iterate without leaving the board.",
    tags: ["Interaction Design", "UI Kit", "User Flows", "Figma"],
    image: "https://placehold.co/800x600/141414/FFFFFF?text=Loom",
  },
  {
    slug: "dash",
    title: "Dash",
    description:
      "A financial wellness dashboard that turns complex data into calm, actionable insights for freelancers.",
    longDescription:
      "Dash transforms financial anxiety into clarity. The dashboard uses progressive disclosure and micro-interactions to surface key metrics first, while deeper analysis remains available but unobtrusive.",
    tags: ["Data Visualisation", "UX Writing", "Prototyping", "A/B Testing"],
    image: "https://placehold.co/800x600/141414/FFFFFF?text=Dash",
  },
  {
    slug: "echo",
    title: "Echo",
    description:
      "A voice-first assistant for smart kitchens, designed with accessibility and natural language interaction at its core.",
    longDescription:
      "Echo explores the future of voice interaction in noisy environments. The design includes multi-modal feedback (visual + audio) and a wake-word system refined through extensive user testing with visually impaired participants.",
    tags: ["Voice UI", "Accessibility", "Wireframing", "User Research"],
    image: "https://placehold.co/800x600/141414/FFFFFF?text=Echo",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
