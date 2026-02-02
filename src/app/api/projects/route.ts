/**
 * Projects API Route
 * Returns portfolio projects filtered by category from project.json metadata
 * 
 * DATA FLOW:
 * 1. Calls fetchPortfolioProjects() which handles all caching
 * 2. Filters by category using filterByCategory() - strict metadata filtering
 * 3. Returns formatted response
 * 
 * CACHING:
 * - Production: ISR with 1 hour revalidation
 * - Development: Fresh data on every request (via fetchPortfolioProjects)
 * 
 * CATEGORY FILTERING:
 * - Categories come ONLY from project.metadata.categories
 * - Status comes ONLY from project.metadata.status
 * - No fallback logic exists
 */
import { NextResponse } from 'next/server'
import { fetchPortfolioProjects } from '@/lib/github/api'
import { filterByCategory, getFeaturedProjects } from '@/lib/github/filters'
import { ProjectCategory } from '@/lib/github/types'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 hour ISR - matches fetchPortfolioProjects

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'featured'

    try {
        // Fetch all portfolio projects (with project.json metadata)
        // This is the SINGLE source of truth - no duplicate fetch logic
        const projects = await fetchPortfolioProjects()

        if (type === 'featured') {
            const featuredProjects = getFeaturedProjects(projects)

            // Format for API response
            // CRITICAL: status comes from metadata.status, NOT inferred from GitHub
            const response = featuredProjects.map(p => ({
                id: p.id.toString(),
                name: p.name,
                description: p.description,
                stack: p.faces.tech.mainLanguage,
                status: p.metadata.status.toUpperCase(), // FROM METADATA ONLY
                liveUrl: p.faces.demo?.url || null,
                githubUrl: p.githubUrl,
                tags: p.metadata.tags,
                type: p.metadata.type,
            }))

            return NextResponse.json(response)
        }

        // Handle other category filters
        const validCategories: ProjectCategory[] = ['creations', 'now', 'sketches', 'open-source', 'featured']

        if (validCategories.includes(type as ProjectCategory)) {
            // Strict category filtering - uses metadata.categories ONLY
            const filtered = filterByCategory(projects, type as ProjectCategory)

            const response = filtered.map(p => ({
                id: p.id.toString(),
                name: p.name,
                description: p.description,
                stack: p.faces.tech.mainLanguage,
                status: p.metadata.status.toUpperCase(), // FROM METADATA ONLY
                liveUrl: p.faces.demo?.url || null,
                githubUrl: p.githubUrl,
                tags: p.metadata.tags,
                type: p.metadata.type,
            }))

            return NextResponse.json(response)
        }

        // Return all projects if type is 'all'
        if (type === 'all') {
            const response = projects.map(p => ({
                id: p.id.toString(),
                name: p.name,
                description: p.description,
                stack: p.faces.tech.mainLanguage,
                status: p.metadata.status.toUpperCase(), // FROM METADATA ONLY
                liveUrl: p.faces.demo?.url || null,
                githubUrl: p.githubUrl,
                categories: p.metadata.categories, // FROM METADATA ONLY
                tags: p.metadata.tags,
                type: p.metadata.type,
                priority: p.metadata.priority,
            }))

            return NextResponse.json(response)
        }

        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })

    } catch (error) {
        console.error('Projects API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch projects', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
