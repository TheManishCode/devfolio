/**
 * Home Page
 * 
 * Landing page featuring hero section, work experience, featured projects,
 * tech stack showcase, and career milestones. Uses ISR (1 hour) for GitHub data.
 * 
 * Data Flow:
 * - Portfolio projects fetched from GitHub API via `fetchPortfolioProjects()`
 * - Featured projects filtered by 'now' category
 * - Experience data from internal API route
 */

import Link from "next/link"
import TechStacks from "@/components/decorative/TechStacks"
import GitHubContributions from "@/features/github/GitHubContributions"
import SocialLinks from "@/features/social/SocialLinks"
import HeroVisual from "@/components/decorative/HeroVisual"
import NavigationIcons from "@/components/navigation/NavigationIcons"
import { SectionTitle, CardTitle, BodyText, MutedText, DateText } from "@/components/ui/Typography"
import { fetchPortfolioProjects } from "@/lib/github/api"
import { filterByCategory } from "@/lib/github/filters"
import { ProjectGrid } from "@/features/workspace/ProjectGrid"
import { FiExternalLink, FiCalendar, FiMapPin } from "react-icons/fi"

export const revalidate = 3600

interface Experience {
    id: number
    role: string
    company: string
    companyUrl?: string
    location: string
    type: string
    period: string
    duration: string
    current: boolean
}

async function getExperienceData() {
    try {
        // Priority: explicit base URL > Netlify URL > Vercel URL > localhost
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
            process.env.URL ||  // Netlify sets this
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
            'http://localhost:3000'

        const res = await fetch(`${baseUrl}/api/experience`, {
            next: { revalidate: 3600 }
        })

        if (!res.ok) return { experiences: [], isEmpty: true }
        return await res.json()
    } catch {
        return { experiences: [], isEmpty: true }
    }
}

export default async function HomePage() {
    const allProjects = await fetchPortfolioProjects()
    const nowProjects = filterByCategory(allProjects, 'now')
    const experienceData = await getExperienceData()
    const experiences: Experience[] = experienceData.experiences || []

    return (
        <>
            {/* Main content container */}
            <main className="max-w-7xl mx-auto pt-20 lg:pt-28 px-6 sm:px-8 md:px-12 lg:px-16">

                <section className="mb-16 relative">
                    <div className="lg:max-w-2xl max-w-2xl animate-slide-up">

                        <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                            Software developer, technical writer & open-source maintainer
                        </h1>


                        <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                            Designing performant systems with C++ and Python, while crafting seamless frontends using React and Tailwind CSS. Focused on the future of Cloud Native and Open Source.
                        </p>


                        <SocialLinks />
                    </div>


                    <HeroVisual />
                </section>


                <section className="mt-12 animate-slide-up delay-100">
                    <div className="flex items-center justify-between mb-4">
                        <SectionTitle>Work Experience</SectionTitle>
                        <Link
                            href="/workspace/experience"
                            className="text-black dark:text-[#33E092] hover:underline text-sm"
                        >
                            View all →
                        </Link>
                    </div>
                </section>
            </main>

            {/* Work Experience cards - wider container aligned with 7xl boundaries */}
            <div className="max-w-[1400px] mx-auto lg:ml-[calc((100vw-80rem)/2)] px-6 sm:px-8 md:px-12 lg:px-16">
                {experiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {experiences.slice(0, 3).map((exp) => (
                            <div key={exp.id} className="group relative bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 h-[280px] flex flex-col">
                                {exp.current && (
                                    <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                                        Current
                                    </span>
                                )}
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-incognito mb-1 pr-16">
                                    {exp.role}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                                    {exp.companyUrl ? (
                                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                            {exp.company} <FiExternalLink className="w-3 h-3" />
                                        </a>
                                    ) : (
                                        <span>{exp.company}</span>
                                    )}
                                    <span className="text-zinc-400">•</span>
                                    <span className="text-xs">{exp.type}</span>
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                                    {exp.period && (
                                        <span className="flex items-center gap-1">
                                            <FiCalendar className="w-3 h-3" />
                                            {exp.period}
                                        </span>
                                    )}
                                    {exp.location && (
                                        <span className="flex items-center gap-1">
                                            <FiMapPin className="w-3 h-3" />
                                            {exp.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="font-incognito text-xl font-semibold tracking-tight dark:text-zinc-500 text-zinc-400">
                        Coming Soon
                    </p>
                )}
            </div>

            {/* Continue main content */}
            <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">


                <div className="mt-20">
                    <GitHubContributions />
                </div>


                <section className="mt-20 animate-slide-up delay-200">
                    <div className="flex items-center justify-between mb-4">
                        <SectionTitle>Featured</SectionTitle>
                        <Link
                            href="/workspace/now"
                            className="text-black dark:text-[#33E092] hover:underline text-sm"
                        >
                            View all →
                        </Link>
                    </div>
                </section>
            </main>

            {/* Featured cards - wider container */}
            <div className="max-w-[1400px] mx-auto lg:ml-[calc((100vw-80rem)/2)] px-6 sm:px-8 md:px-12 lg:px-16">
                {nowProjects.length > 0 ? (
                    <ProjectGrid projects={nowProjects} />
                ) : (
                    <p className="font-incognito text-xl font-semibold tracking-tight dark:text-zinc-500 text-zinc-400">
                        Coming Soon
                    </p>
                )}
            </div>

            {/* Continue main content */}
            <div className="max-w-7xl mx-auto pb-20 px-6 sm:px-8 md:px-12 lg:px-16">

                <div className="mt-20">
                    <TechStacks />
                </div>


                <section className="mt-20 mb-32 animate-slide-up delay-300">
                    <SectionTitle className="mb-10">Milestones</SectionTitle>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] dark:bg-zinc-800 bg-zinc-300" />

                        <div className="space-y-6">
                            {/* Present */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#33E092] border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText className="text-[#33E092] font-semibold">Present</DateText>
                                <CardTitle className="mt-1">Cloud Fundamentals & Placement Preparation</CardTitle>
                            </div>

                            {/* 2025 */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2025</DateText>
                                <CardTitle className="mt-1">Email Management System</CardTitle>
                                <BodyText>Scalable Full-Stack Project</BodyText>
                            </div>

                            {/* 2024 - Hackathon */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2024</DateText>
                                <CardTitle className="mt-1">VTU State-Level Hack-2-Intern Hackathon</CardTitle>
                                <BodyText>Organized by Centralised Placement Cell, VTU</BodyText>
                            </div>

                            {/* 2024 - Award */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2024</DateText>
                                <CardTitle className="mt-1">2nd Place – Poster Design (Project Exhibition)</CardTitle>
                                <BodyText>Recognized for creativity, collaboration, and visual storytelling</BodyText>
                            </div>

                            {/* 2024 - Skills */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2024</DateText>
                                <CardTitle className="mt-1">Full-Stack Web Development & ML Foundations</CardTitle>
                                <BodyText>MERN Stack, Machine Learning academic projects</BodyText>
                            </div>

                            {/* 2024 - Volunteer */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2024</DateText>
                                <CardTitle className="mt-1">Volunteer – Youth for Seva (Chiguru 2024)</CardTitle>
                                <BodyText>Contributed to an annual kids carnival for underprivileged children</BodyText>
                            </div>

                            {/* 2023 */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2023</DateText>
                                <CardTitle className="mt-1">Programming Foundations & DSA</CardTitle>
                                <BodyText>C++, Python, Data Structures & Algorithms, Problem Solving</BodyText>
                            </div>

                            {/* 2022 */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full dark:bg-zinc-700 bg-zinc-400 border-4 dark:border-zinc-900 border-[#e8e8ec]" />
                                <DateText>2022</DateText>
                                <CardTitle className="mt-1">B.E. Computer Science & Engineering (AI)</CardTitle>
                                <BodyText>Started undergraduate degree</BodyText>
                            </div>
                        </div>
                    </div>
                </section>


                <NavigationIcons />
            </div>
        </>
    )
}
