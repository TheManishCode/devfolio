import { fetchProfileReadme } from "@/lib/github/api"
import { PageContainer } from "@/components/layout/PageContainer"
import { PageSubtitle } from "@/components/ui/Typography"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"
import { GitHubProfileReadme } from "@/features/workspace/GitHubProfileReadme"

export const revalidate = 3600

interface Props {
    params: Promise<{
        username: string
    }>
}

export async function generateMetadata({ params }: Props) {
    const { username } = await params
    return {
        title: `${username} | Engineering Portfolio`,
        description: `GitHub profile README for ${username}.`,
    }
}

export default async function DynamicProfilePage({ params }: Props) {
    const { username } = await params

    // Verify this is the portfolio owner
    if (username.toLowerCase() !== siteConfig.githubUsername.toLowerCase()) {
        return notFound()
    }

    const readme = await fetchProfileReadme()

    return (
        <PageContainer maxWidth="wide" className="space-y-8">
            <header className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-incognito">
                    {username}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    My GitHub profile README, rendered live.
                </p>
            </header>

            {readme ? (
                <GitHubProfileReadme content={readme} username={username} />
            ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                    <PageSubtitle>
                        README not available
                    </PageSubtitle>
                </div>
            )}
        </PageContainer>
    )
}

