
import { PortfolioProject } from "@/lib/github/types"
import { ProjectCard } from "./ProjectCard"

interface ProjectGridProps {
    projects: PortfolioProject[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    if (projects.length === 0) {
        return (
            <div className="py-20 text-center text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-lg border-dashed">
                <p>No projects found. Check GitHub configuration.</p>
            </div>
        )
    }

    return (
        <section
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 w-full"
            role="list"
            aria-label="Projects grid"
        >
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </section>
    )
}
