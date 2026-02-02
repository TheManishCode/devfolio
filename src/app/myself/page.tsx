import { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { FiUser, FiImage, FiArrowRight } from "react-icons/fi"

export const metadata: Metadata = {
    title: "Myself | Personal",
    description: "Personal dashboard: story highlights and photo gallery.",
}

const sections = [
    {
        title: "Story",
        description: "My journey, background, and what drives me to build things.",
        href: "/myself/story",
        icon: FiUser,
    },
    {
        title: "Gallery",
        description: "A visual journey through moments, places, and memories.",
        href: "/myself/gallery",
        icon: FiImage,
    },
]

export default function MyselfPage() {
    return (
        <main className="max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">
            <PageHeader
                title="Myself"
                description="A personal space — my story, interests, and visual memories."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {sections.map((section) => {
                    const Icon = section.icon
                    return (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="group block p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-zinc-500" />
                                </div>
                                <FiArrowRight className="w-5 h-5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 font-incognito mb-2">
                                {section.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                {section.description}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </main>
    )
}
