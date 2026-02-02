import { PageHeader } from "@/components/layout/PageHeader"
import { PageSubtitle } from "@/components/ui/Typography"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function WorkspacePage() {
    return (
        <div className="max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">
            <PageHeader
                badge="Portfolio"
                title="Workspace"
                description="Where ideas become reality. A collection of my creative work, projects, and professional experience."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {SECTIONS.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="group block p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
                    >
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-incognito mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                            {section.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {section.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const SECTIONS = [
    {
        title: siteConfig.githubUsername,
        href: `/workspace/${siteConfig.githubUsername}`,
        description: "My GitHub profile README, rendered live."
    },
    {
        title: "Creations",
        href: "/workspace/creations",
        description: "A selection of open source projects and products."
    },
    {
        title: "Secumilate",
        href: "/workspace/secumilate",
        description: "Security + Simulate + Accumulate. Defensive knowledge base."
    },
    {
        title: "Open Source",
        href: "/workspace/oss",
        description: "Contributions to the open source ecosystem."
    },
    {
        title: "Experience",
        href: "/workspace/experience",
        description: "My professional journey and career roles."
    },
    {
        title: "Now",
        href: "/workspace/now",
        description: "What I'm focused on at this moment."
    },
    {
        title: "Sketches",
        href: "/workspace/sketches",
        description: "Experimental ideas and design explorations."
    }
]