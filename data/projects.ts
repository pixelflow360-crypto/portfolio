export type ProjectAccess = "password" | "pending"

export type ProjectToolIcon = "figma" | "webflow"

export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  imageWidth: number
  imageHeight: number
  /** PNG exported with clip content disabled — show full canvas, no card frame. */
  transparentArtwork?: boolean
  /** Optional line shown below description with a tool icon. */
  descriptionFooter?: {
    text: string
    icon: ProjectToolIcon
  }
  /** Gate slider / detail access for protected work. */
  access?: ProjectAccess
  longDescription?: string
}

export const CONFIDENTIALITY_NOTICE =
  "Full project showcase capabilities are limited due to client's confidentiality policies."

export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Landing proposal for startup agency website",
    description:
      "Dark-mode contact page optimized for accessibility and ease, enabling the brand to showcase their digital identity.",
    descriptionFooter: { text: "Designed in Figma", icon: "figma" },
    tags: ["UX Design"],
    image: "/projects/project-1/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
  },
  {
    slug: "project-2",
    title: "Component showcase — navigation entries",
    description:
      "Mono header and footer components for a high-end wooden materials distribution website.",
    tags: ["UX Design"],
    image: "/projects/project-2/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
  },
  {
    slug: "project-3",
    title: "Digital wallet",
    description: "",
    tags: ["UX Design"],
    image: "/projects/project-3/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
    access: "password",
  },
  {
    slug: "project-4",
    title: "Online gaming platform UI",
    description:
      "A live website enabling users to enjoy custom-coded & high-quality online video slots with free spins in a minimal, dark interface environment.",
    tags: ["UX Design"],
    image: "/projects/project-4/main.png",
    imageWidth: 4320,
    imageHeight: 3525,
    transparentArtwork: true,
  },
  {
    slug: "project-5",
    title: "React component showcase — Webflow",
    description: "",
    tags: ["UX Design"],
    image: "/projects/project-5/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
    transparentArtwork: true,
    access: "pending",
  },
  {
    slug: "project-6",
    title: "Vehicle parts ecom",
    description:
      "Full website proposal for a large automotive company operating in Europe & Asia.",
    tags: ["UX Design"],
    image: "/projects/project-6/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
  },
  {
    slug: "project-7",
    title: "Conceptual exploration",
    description:
      "Cloud platform enabling users for ease of storing & transferring data online without hassles.",
    tags: ["UX Design"],
    image: "/projects/project-7/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
    transparentArtwork: true,
  },
  {
    slug: "project-8",
    title: "Website front-end development — Webflow",
    description:
      "Marketing website design & code-handling for Oil & gas distributor operating in Europe & Asia.",
    descriptionFooter: {
      text: "Website user interface + development done in Webflow",
      icon: "webflow",
    },
    tags: ["UX Design"],
    image: "/projects/project-8/main.png",
    imageWidth: 4320,
    imageHeight: 3072,
    transparentArtwork: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
