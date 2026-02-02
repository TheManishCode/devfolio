import { NextResponse } from "next/server"

/**
 * Experience API Route
 * 
 * ⚠️ IMPORTANT: This data is NOT fetched from LinkedIn.
 * It is local structured data that mirrors LinkedIn experience format.
 * 
 * WHY NOT LINKEDIN API:
 * LinkedIn does NOT provide a public API for fetching profile data.
 * Their API requires OAuth 2.0, an approved developer app, and user consent.
 * Scraping LinkedIn violates their ToS and is legally risky.
 * 
 * CURRENT APPROACH:
 * - Data lives in /src/data/experience.json (manually maintained)
 * - This API enriches it with computed fields (duration, formatted dates)
 * - Updates require editing the JSON file directly
 * 
 * TO UPDATE YOUR EXPERIENCE:
 * 1. Edit src/data/experience.json
 * 2. Redeploy (ISR will pick up changes within 1 hour)
 */

// ISR: Revalidate every hour (data changes infrequently)
export const revalidate = 3600

export interface Experience {
    id: string
    role: string
    company: string
    companyUrl?: string
    companyLogo?: string | null
    location: string
    startDate: string      // ISO date string (YYYY-MM-DD)
    endDate: string | null // null = current position
    type: "Full-time" | "Part-time" | "Internship" | "Contract" | "Freelance"
    description: string
    responsibilities: string[]
    technologies: string[]
    period?: string        // Pre-formatted period string
    duration?: string      // Pre-formatted duration string
    current?: boolean      // True if current position
}

export interface ExperienceData {
    experiences: Experience[]
    lastUpdated: string
    linkedInProfile: string
}

async function fetchExperienceData(): Promise<ExperienceData | null> {
    try {
        // Load LOCAL JSON data (not fetched from LinkedIn or any external source)
        const data = await import("@/data/experience.json")
        return data.default as ExperienceData
    } catch (error) {
        console.error("Failed to load experience data:", error)
        return null
    }
}

/**
 * Format date range for display
 * Handles current positions (endDate = null)
 * FAIL-SAFE: Returns fallback on invalid input
 */
function formatPeriod(startDate: string | undefined, endDate: string | null | undefined): string {
    if (!startDate) return "Date unavailable"

    const formatDate = (dateStr: string) => {
        try {
            const [year, month] = dateStr.split("-")
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const monthIndex = parseInt(month) - 1
            if (monthIndex < 0 || monthIndex > 11) return dateStr
            return `${monthNames[monthIndex]} ${year}`
        } catch {
            return dateStr
        }
    }

    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : "Present"

    return `${start} - ${end}`
}

/**
 * Calculate duration in months/years
 * FAIL-SAFE: Returns empty string on invalid input
 */
function calculateDuration(startDate: string | undefined, endDate: string | null | undefined): string {
    if (!startDate) return ""

    try {
        const start = new Date(startDate + "-01")
        const end = endDate ? new Date(endDate + "-01") : new Date()

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return ""

        const months = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth())

        if (months < 1) return "< 1 month"
        if (months === 1) return "1 month"
        if (months < 12) return `${months} months`

        const years = Math.floor(months / 12)
        const remainingMonths = months % 12

        if (remainingMonths === 0) {
            return years === 1 ? "1 year" : `${years} years`
        }

        return `${years} yr ${remainingMonths} mo`
    } catch {
        return ""
    }
}

export async function GET() {
    const data = await fetchExperienceData()

    if (!data || !Array.isArray(data.experiences) || data.experiences.length === 0) {
        return NextResponse.json({
            experiences: [],
            isEmpty: true,
            message: "No experience data available",
            linkedInProfile: data?.linkedInProfile ?? null
        })
    }

    // Enrich experiences with computed fields (additive, never required)
    const enrichedExperiences = data.experiences.map(exp => ({
        ...exp,
        // Ensure arrays exist (schema tolerance)
        responsibilities: exp.responsibilities ?? [],
        technologies: exp.technologies ?? [],
        // Computed fields (additive enrichment)
        period: formatPeriod(exp.startDate, exp.endDate),
        duration: calculateDuration(exp.startDate, exp.endDate),
        current: exp.endDate === null
    }))

    // Sort by start date (most recent first), with fallback for missing dates
    enrichedExperiences.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0
        return dateB - dateA
    })

    return NextResponse.json({
        experiences: enrichedExperiences,
        isEmpty: false,
        lastUpdated: data.lastUpdated ?? null,
        linkedInProfile: data.linkedInProfile ?? null
    })
}
