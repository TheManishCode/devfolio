/**
 * =============================================================================
 * TOOLKIT PAGE - Tamang-Style Design
 * =============================================================================
 * 
 * My Gear & Uses - Showcasing tools, software, and hardware
 * 
 * Route: /studio/toolkit
 * =============================================================================
 */

"use client"

import { useState } from "react"
import Image from "next/image"
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiPython,
    SiGit,
    SiGithub,
    SiVercel,
    SiNetlify,
    SiNotion,
    SiPostman,
    SiFigma,
    SiSpotify,
    SiDiscord,
    SiSlack,
    SiGooglechrome,
    SiDavinciresolve,
    SiCanva,
    SiKalilinux
} from "react-icons/si"
import { FaWindows, FaExternalLinkAlt } from "react-icons/fa"
import { BiLogoVisualStudio } from "react-icons/bi"
import { VscCopilot } from "react-icons/vsc"

// =============================================================================
// DATA
// =============================================================================

const gearItems = [
    {
        name: "Laptop",
        description: "ASUS ROG Strix G15 2022 Electro Punk",
        image: "/images/gear/laptop.png",
        tags: ["ASUS", "ROG", "Gaming"],
    },
    {
        name: "Mouse",
        description: "ROG Impact Mouse",
        image: "/images/gear/mouse.png",
        tags: ["ASUS", "ROG", "Gaming"],
    },
    {
        name: "Phone",
        description: "Samsung S23 FE",
        image: "/images/gear/phone.png",
        tags: ["Samsung", "Android"],
    },
    {
        name: "Earbuds",
        description: "CMF Buds by Nothing",
        image: "/images/gear/earbuds.png",
        tags: ["Nothing", "Wireless"],
    },
]

const systemItems = [
    {
        name: "Windows 11",
        description: "Operating System",
        icon: FaWindows,
        link: "https://www.microsoft.com/windows",
    },
    {
        name: "Kali Linux",
        description: "Security OS",
        icon: SiKalilinux,
        link: "https://www.kali.org/",
    },
    {
        name: "VS Code",
        description: "Primary Code Editor",
        icon: BiLogoVisualStudio,
        link: "https://code.visualstudio.com/",
    },
    {
        name: "Chrome",
        description: "Primary Browser",
        icon: SiGooglechrome,
        link: "https://www.google.com/chrome/",
    },
    {
        name: "GitHub Copilot",
        description: "AI Coding Assistant",
        icon: VscCopilot,
        link: "https://copilot.github.com/",
    },
    {
        name: "Notion",
        description: "Notes & Organization",
        icon: SiNotion,
        link: "https://www.notion.so/",
    },
]

const codingItems = [
    {
        name: "React",
        description: "Frontend Library",
        icon: SiReact,
        link: "https://reactjs.org/",
    },
    {
        name: "Next.js",
        description: "React Framework",
        icon: SiNextdotjs,
        link: "https://nextjs.org/",
    },
    {
        name: "TypeScript",
        description: "Type Safety",
        icon: SiTypescript,
        link: "https://www.typescriptlang.org/",
    },
    {
        name: "TailwindCSS",
        description: "Utility-first CSS",
        icon: SiTailwindcss,
        link: "https://tailwindcss.com/",
    },
    {
        name: "Python",
        description: "Backend & AI/ML",
        icon: SiPython,
        link: "https://www.python.org/",
    },
    {
        name: "Git",
        description: "Version Control",
        icon: SiGit,
        link: "https://git-scm.com/",
    },
    {
        name: "GitHub",
        description: "Code Hosting",
        icon: SiGithub,
        link: "https://github.com/",
    },
    {
        name: "Vercel",
        description: "Deployment Platform",
        icon: SiVercel,
        link: "https://vercel.com/",
    },
    {
        name: "Netlify",
        description: "Alternative Hosting",
        icon: SiNetlify,
        link: "https://netlify.com/",
    },
    {
        name: "Postman",
        description: "API Testing",
        icon: SiPostman,
        link: "https://www.postman.com/",
    },
]

const softwareItems = [
    {
        name: "Spotify",
        description: "Music Streaming",
        icon: SiSpotify,
        link: "https://www.spotify.com/",
    },
    {
        name: "Figma",
        description: "UI/UX Design",
        icon: SiFigma,
        link: "https://www.figma.com/",
    },
    {
        name: "DaVinci Resolve",
        description: "Video Editing",
        icon: SiDavinciresolve,
        link: "https://www.blackmagicdesign.com/products/davinciresolve",
    },
    {
        name: "Canva",
        description: "Quick Graphics",
        icon: SiCanva,
        link: "https://www.canva.com/",
    },
    {
        name: "Discord",
        description: "Community & Chat",
        icon: SiDiscord,
        link: "https://discord.com/",
    },
    {
        name: "Slack",
        description: "Team Communication",
        icon: SiSlack,
        link: "https://slack.com/",
    },
]

const bookmarks = [
    {
        title: "React Documentation",
        description: "Official React docs with hooks, patterns, and best practices.",
        url: "https://react.dev/",
    },
    {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework documentation.",
        url: "https://tailwindcss.com/docs",
    },
    {
        title: "MDN Web Docs",
        description: "Comprehensive web development documentation.",
        url: "https://developer.mozilla.org/",
    },
    {
        title: "GitHub",
        description: "Code hosting, version control, and collaboration.",
        url: "https://github.com/",
    },
]

// =============================================================================
// COMPONENTS
// =============================================================================

// Gear Card - Enhanced with hover effects
function GearCard({ item }: { item: typeof gearItems[0] }) {
    const [imageError, setImageError] = useState(false)

    return (
        <div className="group border dark:border-zinc-800 border-zinc-200 rounded-md p-4 flex flex-col items-center transition-all duration-300 hover:border-[#33E092]/50 hover:shadow-[0_0_20px_rgba(51,224,146,0.1)]">
            <div className="relative w-20 h-20 mb-2 transition-transform duration-300 group-hover:scale-110">
                {imageError ? (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                        📦
                    </div>
                ) : (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 text-center transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-[#33E092]">{item.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{item.description}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
                {item.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-2 py-0.5 text-xs bg-[#d5d5da] dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-400 dark:border-zinc-700 rounded transition-transform duration-200 hover:scale-105"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}

// Icon Card - Enhanced with hover effects
function IconCard({ item }: { item: { name: string; description: string; icon: React.ComponentType<any>; link: string } }) {
    const Icon = item.icon

    return (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-24 h-24 border dark:border-zinc-800 border-zinc-200 rounded-md flex flex-col items-center justify-center gap-2 !no-underline hover:!no-underline transition-all duration-300 hover:border-[#33E092]/50 hover:shadow-[0_0_15px_rgba(51,224,146,0.1)]"
        >
            <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-zinc-900 dark:group-hover:text-[#33E092] group-hover:scale-110" />
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center transition-colors duration-300 group-hover:text-zinc-900 dark:group-hover:text-[#33E092]">{item.name}</span>
        </a>
    )
}

// Bookmark Card - Enhanced with better hover effects
function BookmarkCard({ item }: { item: typeof bookmarks[0] }) {
    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 border dark:border-zinc-800 border-zinc-200 rounded-md !no-underline hover:!no-underline transition-all duration-300 hover:border-[#33E092]/50 hover:shadow-[0_0_25px_rgba(51,224,146,0.15)] hover:-translate-y-1 hover:scale-[1.02]"
        >
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-2">
                <span className="text-xs truncate">{item.url.replace(/https?:\/\//, "").replace(/\/$/, "")}</span>
                <FaExternalLinkAlt className="h-3 w-3 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-900 dark:group-hover:text-[#33E092]" />
            </div>
            <h3 className="text-sm font-medium dark:text-white text-gray-900 mb-1 no-underline transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-[#33E092]">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
        </a>
    )
}

// =============================================================================
// PAGE
// =============================================================================

export default function ToolkitPage() {
    return (
        <div className="max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2 dark:text-white text-gray-900">
                    My Gear & Uses
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    A peek into the tools and technologies I use daily.
                </p>
            </div>

            {/* Setup Box - Profile style like story page */}
            <div className="relative max-w-xs mb-8">
                <div className="aspect-square rounded-2xl overflow-hidden border dark:border-zinc-800 border-zinc-200">
                    <div className="w-full h-full flex items-center justify-center text-6xl dark:bg-zinc-900 bg-[#d5d5da] dark:text-zinc-700 text-zinc-400">
                        🖥️
                    </div>
                </div>
                {/* Decorative corner boxes like story page */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-2 border-[#33E092] rounded-2xl -z-10" />
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#33E092]/20 rounded-xl -z-10" />
            </div>

            {/* Gear Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Gear</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {gearItems.map((item, i) => (
                        <GearCard key={i} item={item} />
                    ))}
                </div>
            </section>

            {/* System Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">System</h2>
                <div className="flex flex-wrap gap-3">
                    {systemItems.map((item, i) => (
                        <IconCard key={i} item={item} />
                    ))}
                </div>
            </section>

            {/* Coding Tools Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Coding Tools</h2>
                <div className="flex flex-wrap gap-3">
                    {codingItems.map((item, i) => (
                        <IconCard key={i} item={item} />
                    ))}
                </div>
            </section>

            {/* Software/Applications Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Software/Applications</h2>
                <div className="flex flex-wrap gap-3">
                    {softwareItems.map((item, i) => (
                        <IconCard key={i} item={item} />
                    ))}
                </div>
            </section>

            {/* Bookmarks Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Bookmarks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarks.map((item, i) => (
                        <BookmarkCard key={i} item={item} />
                    ))}
                </div>
            </section>


        </div >
    )
}
