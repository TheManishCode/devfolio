import { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { FiExternalLink, FiLinkedin, FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi"

export const metadata: Metadata = {
    title: "Work Experience",
    description: "My professional work experience and career journey.",
}

// ISR: Revalidate every hour
export const revalidate = 3600

interface Experience {
    id: number
    role: string
    company: string
    companyUrl?: string
    companyLogo?: string | null
    location: string
    startDate: string
    endDate: string | null
    type: "Full-time" | "Part-time" | "Internship" | "Contract" | "Freelance"
    description: string
    responsibilities: string[]
    technologies: string[]
    period: string
    duration: string
    current: boolean
}

interface ExperienceResponse {
    experiences: Experience[]
    isEmpty: boolean
    lastUpdated?: string
    linkedInProfile?: string
    message?: string
}

async function getExperienceData(): Promise<ExperienceResponse> {
    try {
        // Fetch from our API route (handles data loading and enrichment)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
            process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
            'http://localhost:3000'

        const res = await fetch(`${baseUrl}/api/experience`, {
            next: { revalidate: 3600 }
        })

        if (!res.ok) {
            throw new Error('Failed to fetch experience data')
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching experience:', error)
        return {
            experiences: [],
            isEmpty: true,
            message: "Unable to load experience data"
        }
    }
}

function ExperienceCard({ experience }: { experience: Experience }) {
    return (
        <div className="group relative bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
            {/* Current badge */}
            {experience.current && (
                <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-300 dark:border-zinc-700">
                    Current
                </span>
            )}

            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 font-incognito">
                    {experience.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    {experience.companyUrl ? (
                        <Link
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium flex items-center gap-1"
                        >
                            {experience.company}
                            <FiExternalLink className="w-3 h-3" />
                        </Link>
                    ) : (
                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                            {experience.company}
                        </span>
                    )}
                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-500">
                        {experience.type}
                    </span>
                </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                {experience.period && (
                    <span className="flex items-center gap-1.5">
                        <FiCalendar className="w-4 h-4" />
                        {experience.period}{experience.duration ? ` · ${experience.duration}` : ''}
                    </span>
                )}
                {experience.location && (
                    <span className="flex items-center gap-1.5">
                        <FiMapPin className="w-4 h-4" />
                        {experience.location}
                    </span>
                )}
            </div>

            {/* Description */}
            {experience.description && (
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    {experience.description}
                </p>
            )}

            {/* Responsibilities */}
            {experience.responsibilities?.length > 0 && (
                <ul className="mb-4 space-y-2">
                    {experience.responsibilities.map((item, index) => (
                        <li
                            key={index}
                            className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2"
                        >
                            <span className="text-zinc-400 dark:text-zinc-600 mt-1">›</span>
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {/* Technologies */}
            {experience.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    {experience.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

function ComingSoon({ linkedInProfile }: { linkedInProfile?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <FiBriefcase className="w-8 h-8 text-zinc-400" />
            </div>
            <h2 className="font-incognito text-2xl font-semibold dark:text-zinc-300 text-zinc-600 mb-2">
                Coming Soon
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-6">
                Professional experience details are being updated. Check back soon for my career journey.
            </p>
            {linkedInProfile && (
                <Link
                    href={linkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg font-medium transition-colors"
                >
                    <FiLinkedin className="w-5 h-5" />
                    View on LinkedIn
                </Link>
            )}
        </div>
    )
}

export default async function ExperiencePage() {
    const data = await getExperienceData()

    return (
        <main className="max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">
            <PageHeader
                title="Work Experience"
                description="My professional journey and the roles that have shaped my career."
            />

            {data.isEmpty || data.experiences.length === 0 ? (
                <ComingSoon linkedInProfile={data.linkedInProfile} />
            ) : (
                <div className="space-y-6">
                    {/* Experience timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block ml-6" />

                        <div className="space-y-6">
                            {data.experiences.map((experience) => (
                                <div key={experience.id} className="relative md:pl-16">
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden md:block ml-[18px]" />
                                    <ExperienceCard experience={experience} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LinkedIn link */}
                    {data.linkedInProfile && (
                        <div className="text-center pt-8">
                            <Link
                                href={data.linkedInProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                            >
                                <FiLinkedin className="w-4 h-4" />
                                <span>View full profile on LinkedIn</span>
                                <FiExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    )}

                    {/* Last updated */}
                    {data.lastUpdated && (
                        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
                            Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}
                </div>
            )}
        </main>
    )
}
