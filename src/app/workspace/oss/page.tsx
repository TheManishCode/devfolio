import { fetchPortfolioProjects } from "@/lib/github/api"
import { filterByCategory } from "@/lib/github/filters"
import { ProjectGrid } from "@/features/workspace/ProjectGrid"
import { PageSubtitle } from "@/components/ui/Typography"
import { PageContainer } from "@/components/layout/PageContainer"

export const metadata = {
    title: "Open Source | Engineering Portfolio",
    description: "My contributions to the open source community and projects I maintain.",
}

export const revalidate = 3600

export default async function OpenSourcePage() {
    const allProjects = await fetchPortfolioProjects()
    const projects = filterByCategory(allProjects, 'open-source')

    return (
        <PageContainer maxWidth="wide" className="space-y-8">
            <header className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-incognito">
                    Open Source
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Contributing to the open source community is one of my passions. Here's my involvement.
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
