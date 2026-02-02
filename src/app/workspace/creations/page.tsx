import { fetchPortfolioProjects } from "@/lib/github/api"
import { filterByCategory } from "@/lib/github/filters"
import { ProjectGrid } from "@/features/workspace/ProjectGrid"
import { PageSubtitle } from "@/components/ui/Typography"
import { PageContainer } from "@/components/layout/PageContainer"

export const metadata = {
    title: "Creations | Engineering Portfolio",
    description: "A selection of open source projects and engineering experiments.",
}

export const revalidate = 3600

export default async function CreationsPage() {
    const allProjects = await fetchPortfolioProjects()
    const projects = filterByCategory(allProjects, 'creations')

    return (
        <PageContainer maxWidth="wide" className="space-y-8">
            <header className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-incognito">
                    Creations
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    A simplified selection of my engineering work.
                    Fetched live from GitHub, architected for extensibility.
                </p>
            </header>

            {projects.length > 0 ? (
                <ProjectGrid projects={projects} />
            ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                    <PageSubtitle>
                        Coming Soon
                    </PageSubtitle>
                </div>
            )}
        </PageContainer>
    )
}
