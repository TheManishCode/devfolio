import { fetchProfileReadme } from "@/lib/github/api"
import { PageContainer } from "@/components/layout/PageContainer"
import { PageSubtitle } from "@/components/ui/Typography"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"
import { ArsenalGrid } from "@/features/workspace/ArsenalGrid"

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
                <RenderSplitContent content={readme} username={username} />
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

async function RenderSplitContent({ content, username }: { content: string, username: string }) {
    const fullHtml = await renderMarkdown(content);

    // If user is TheManishCode, replace the Arsenal section with custom component
    if (username.toLowerCase() === "themanishcode") {
        // Find Arsenal section and split around it
        const splitRegex = /(<h3[^>]*>(?:(?!<\/h3>)[\s\S])*?ARSENAL_AND_TOOLS[\s\S]*?<\/h3>[\s\S]*?)(?=<h3[^>]*>[\s\S]*?CONTRIBUTION_LOG)/i;
        const parts = fullHtml.split(splitRegex);

        if (parts.length >= 3) {
            return (
                <div className="space-y-8">
                    <article
                        className="prose prose-zinc dark:prose-invert max-w-none
                            prose-headings:font-incognito prose-headings:tracking-tight
                            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                            prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                            prose-a:text-zinc-700 dark:prose-a:text-zinc-300 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200
                            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:border prose-pre:border-zinc-800
                            prose-img:rounded-xl prose-img:shadow-lg
                            prose-ul:text-zinc-600 dark:prose-ul:text-zinc-400
                            prose-li:marker:text-zinc-400 dark:prose-li:marker:text-zinc-600"
                        dangerouslySetInnerHTML={{ __html: parts[0] }}
                    />

                    {/* The Replacement Component */}
                    <div className="text-center">
                        <h3 className="font-incognito text-xl font-bold tracking-tight mb-6">
                            &gt;_ ARSENAL_AND_TOOLS
                        </h3>
                        <ArsenalGrid />
                    </div>

                    <article
                        className="prose prose-zinc dark:prose-invert max-w-none
                            prose-headings:font-incognito prose-headings:tracking-tight
                            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                            prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                            prose-a:text-zinc-700 dark:prose-a:text-zinc-300 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200
                            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:border prose-pre:border-zinc-800
                            prose-img:rounded-xl prose-img:shadow-lg
                            prose-ul:text-zinc-600 dark:prose-ul:text-zinc-400
                            prose-li:marker:text-zinc-400 dark:prose-li:marker:text-zinc-600"
                        dangerouslySetInnerHTML={{ __html: parts[2] }}
                    />
                </div>
            )
        }
    }

    // Fallback: Render full markdown without splitting
    return (
        <article
            className="prose prose-zinc dark:prose-invert max-w-none
                prose-headings:font-incognito prose-headings:tracking-tight
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                prose-a:text-zinc-700 dark:prose-a:text-zinc-300 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:border prose-pre:border-zinc-800
                prose-img:rounded-xl prose-img:shadow-lg
                prose-ul:text-zinc-600 dark:prose-ul:text-zinc-400
                prose-li:marker:text-zinc-400 dark:prose-li:marker:text-zinc-600"
            dangerouslySetInnerHTML={{
                __html: await renderMarkdown(content)
            }}
        />
    )
}

async function renderMarkdown(content: string): Promise<string> {
    const { marked } = await import('marked')

    marked.setOptions({
        gfm: true,
        breaks: true,
    })

    // marked can return a Promise or string depending on options/extensions.
    // Use await to be safe.
    const html = await marked(content)

    // Inject transparency into GitHub Readme Stats and similar URLs
    // This regex looks for common stats APIs and appends &bg_color=transparent if not present
    const processedHtml = html
        // GitHub Readme Stats (vercel.app)
        .replace(
            /(https?:\/\/github-readme-stats\.vercel\.app\/api(?:\/|\?)[^"'\)\s]*)/g,
            (match: string) => {
                if (match.includes('bg_color=transparent')) return match
                const separator = match.includes('?') ? '&' : '?'
                return `${match}${separator}bg_color=transparent`
            }
        )
        // GitHub Streak Stats (herokuapp.com)
        .replace(
            /(https?:\/\/github-readme-streak-stats\.herokuapp\.com(?:\/|\?)[^"'\)\s]*)/g,
            (match: string) => {
                if (match.includes('background=transparent')) return match
                // Streak stats uses 'background' param for transparency or theme
                const separator = match.includes('?') ? '&' : '?'
                return `${match}${separator}background=transparent`
            }
        )
        // GitHub Streak Stats (demolab.com - newer version)
        .replace(
            /(https?:\/\/streak-stats\.demolab\.com(?:\/|\?)[^"'\)\s]*)/g,
            (match: string) => {
                if (match.includes('background=transparent')) return match
                // Streak stats uses 'background' param
                const separator = match.includes('?') ? '&' : '?'
                return `${match}${separator}background=transparent`
            }
        )
        // Top Langs (github-readme-stats)
        .replace(
            /(https?:\/\/github-readme-stats\.vercel\.app\/api\/top-langs(?:\/|\?)[^"'\)\s]*)/g,
            (match: string) => {
                if (match.includes('bg_color=transparent')) return match
                const separator = match.includes('?') ? '&' : '?'
                return `${match}${separator}bg_color=transparent`
            }
        )
        // Trophy Stats
        .replace(
            /(https?:\/\/github-profile-trophy\.vercel\.app(?:\/|\?)[^"'\)\s]*)/g,
            (match: string) => {
                if (match.includes('bg=transparent')) return match
                const separator = match.includes('?') ? '&' : '?'
                return `${match}${separator}bg=transparent`
            }
        )
        // Profile Summary Cards (github-profile-summary-cards.vercel.app)
        .replace(
            /(https?:\/\/github-profile-summary-cards\.vercel\.app\/api\/cards\/profile-details(?:\/|\?)[^"'\)\s]*)/g,
            (match: string) => {
                // Use theme=transparent as per documentation
                let newUrl = match
                if (newUrl.includes('theme=')) {
                    newUrl = newUrl.replace(/theme=[^&"'\)\s]*/, "theme=transparent")
                } else {
                    const separator = newUrl.includes('?') ? '&' : '?'
                    newUrl = `${newUrl}${separator}theme=transparent`
                }
                return newUrl
            }
        )
        // Snake Animation - Proxy through local API to strip background colors
        .replace(
            /(<img[^>]*src=")([^"]*github-contribution-grid-snake(?:-dark)?\.svg[^"]*)(")/g,
            (match: string, prefix: string, url: string, suffix: string) => {
                const encodedUrl = encodeURIComponent(url)
                return `${prefix}/api/snake?url=${encodedUrl}${suffix}`
            }
        )
        // Communication Section - Replace Badges with Bold Text
        // LinkedIn
        .replace(
            /<a\s+href="([^"]+)"[^>]*>\s*<img\s+src="[^"]*badge\/LinkedIn[^"]*"[^>]*>\s*<\/a>/gi,
            '<a href="$1" class="font-bold mx-2 hover:underline dark:text-zinc-100 text-zinc-900" target="_blank">LinkedIn</a>'
        )
        // Email
        .replace(
            /<a\s+href="([^"]+)"[^>]*>\s*<img\s+src="[^"]*badge\/Email[^"]*"[^>]*>\s*<\/a>/gi,
            '<a href="$1" class="font-bold mx-2 hover:underline dark:text-zinc-100 text-zinc-900">Email</a>'
        )
        // X / Twitter
        .replace(
            /<a\s+href="([^"]+)"[^>]*>\s*<img\s+src="[^"]*badge\/X[^"]*"[^>]*>\s*<\/a>/gi,
            '<a href="$1" class="font-bold mx-2 hover:underline dark:text-zinc-100 text-zinc-900" target="_blank">X</a>'
        )

    return processedHtml
}

