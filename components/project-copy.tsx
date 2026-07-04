import { ProjectToolIcon } from "@/components/brand-icons"
import { CONFIDENTIALITY_NOTICE, type Project } from "@/data/projects"
import { cn } from "@/lib/utils"

type ProjectCopyProps = {
  project: Project
  className?: string
}

export function ProjectCopy({ project, className }: ProjectCopyProps) {
  const hasDescription =
    project.description.trim().length > 0 || project.descriptionFooter

  if (!hasDescription && !CONFIDENTIALITY_NOTICE) return null

  return (
    <div className={cn("max-w-2xl space-y-6", className)}>
      {project.description ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {project.description}
        </p>
      ) : null}

      {project.descriptionFooter ? (
        <p className="inline-flex flex-wrap items-center gap-2 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          <span>{project.descriptionFooter.text}</span>
          <ProjectToolIcon
            icon={project.descriptionFooter.icon}
            className="h-[1.1em] w-[1.1em]"
          />
        </p>
      ) : null}

      <p className="text-pretty text-sm leading-relaxed text-muted-foreground opacity-50 md:text-base">
        {CONFIDENTIALITY_NOTICE}
      </p>
    </div>
  )
}
