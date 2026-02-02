import { PortfolioProject, ProjectCategory } from "./types"

/**
 * CATEGORY FILTERING RULES:
 * - Categories come ONLY from project.metadata.categories
 * - No fallback logic - either project has the category or it doesn't
 * - No derived/inferred categories from GitHub data
 * - Filtering is strict: project.metadata.categories.includes(category)
 */

/**
 * Filter projects by category
 * 
 * IMPORTANT: This is the ONLY way to filter by category.
 * Categories are read exclusively from project.metadata.categories.
 * There is NO fallback logic.
 * 
 * @param projects - List of portfolio projects (already filtered for visibility: true)
 * @param category - Category to filter by
 * @returns Projects that include the specified category in their metadata
 */
export function filterByCategory(
    projects: PortfolioProject[],
    category: ProjectCategory
): PortfolioProject[] {
    // STRICT FILTER: Only include projects where metadata.categories contains the category
    // No fallbacks, no inference, no derived categories
    return projects.filter(p => p.metadata.categories.includes(category))
}

/**
 * Filter projects by security-related categories (flexible matching)
 * Matches: security, securities, secumilate, secure, etc. (case-insensitive)
 */
export function filterBySecurityCategory(projects: PortfolioProject[]): PortfolioProject[] {
    const securityPatterns = ['security', 'securities', 'secumilate', 'secure', 'cybersec']
    return projects.filter(p =>
        p.metadata.categories.some(cat =>
            securityPatterns.some(pattern =>
                cat.toLowerCase().includes(pattern.toLowerCase())
            )
        )
    )
}

/**
 * Filter projects by sketch-related categories (flexible matching)
 * Matches: sketches, sketch, art, design, visual, creative, generative, etc. (case-insensitive)
 */
export function filterBySketchCategory(projects: PortfolioProject[]): PortfolioProject[] {
    const sketchPatterns = ['sketch', 'art', 'design', 'visual', 'creative', 'generative', 'illustration', 'drawing']
    return projects.filter(p =>
        p.metadata.categories.some(cat =>
            sketchPatterns.some(pattern =>
                cat.toLowerCase().includes(pattern.toLowerCase())
            )
        )
    )
}

/**
 * Get featured projects (convenience wrapper)
 * 
 * Uses the same filtering logic as filterByCategory - no special treatment.
 * Projects must have 'featured' in their metadata.categories array.
 * 
 * @param projects - List of portfolio projects
 * @returns Projects marked as featured in their metadata
 */
export function getFeaturedProjects(projects: PortfolioProject[]): PortfolioProject[] {
    return filterByCategory(projects, 'featured')
}

/**
 * Get all available categories from projects
 * @param projects - List of portfolio projects
 * @returns Unique list of categories present in projects
 */
export function getAvailableCategories(projects: PortfolioProject[]): ProjectCategory[] {
    const categories = new Set<ProjectCategory>()
    projects.forEach(p => {
        p.metadata.categories.forEach(c => categories.add(c))
    })
    return Array.from(categories)
}

/**
 * Get project counts per category
 * @param projects - List of portfolio projects
 * @returns Object with category counts
 */
export function getCategoryCounts(projects: PortfolioProject[]): Record<ProjectCategory, number> {
    const counts: Record<ProjectCategory, number> = {
        'creations': 0,
        'now': 0,
        'sketches': 0,
        'open-source': 0,
        'featured': 0,
        'security': 0,
        'secumilate': 0,
    }

    projects.forEach(p => {
        p.metadata.categories.forEach(c => {
            counts[c]++
        })
    })

    return counts
}
