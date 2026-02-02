/**
 * GitHub Integration Types
 * 
 * Type definitions for GitHub API responses and portfolio project models.
 * These types form the contract between raw GitHub data and the application.
 */

/** Raw GitHub repository response from the GitHub REST API v3 */
export interface GitHubRepo {
    id: number
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    topics: string[]
    language: string | null
    stargazers_count: number
    forks_count: number
    fork: boolean
    updated_at: string
    pushed_at: string
    default_branch: string
}

/** Technology stack data extracted from repository */
export interface TechData {
    mainLanguage: string
    languages: string[]
    tools: string[]
}

/** Demo configuration for projects with live previews */
export interface DemoConfig {
    url: string
    type: "iframe" | "redirect"
}

/** Truncated README preview for project cards */
export interface ReadmePreview {
    content: string
    url: string
}

/** Normalized project model derived from GitHub repository data */
export interface ProjectModel {
    id: number
    name: string
    description: string
    githubUrl: string
    stats: {
        stars: number
        forks: number
        commits: number
        fork: boolean
    }
    faces: {
        tech: TechData
        demo: null | DemoConfig
        readme: ReadmePreview
    }
    updatedAt: string
}

/**
 * Valid portfolio categories for routing and filtering.
 * Each category corresponds to a page in /workspace/[category]
 */
export type ProjectCategory =
    | 'creations'
    | 'now'
    | 'sketches'
    | 'open-source'
    | 'featured'
    | 'security'
    | 'secumilate'

/**
 * Project metadata from project.json files in repositories.
 * This is the source of truth for portfolio display decisions.
 */
export interface ProjectMetadata {
    title: string
    description?: string

    categories: ProjectCategory[]
    status: 'in-progress' | 'completed' | 'ongoing'
    priority: number
    type: 'project' | 'experiment' | 'collection'
    visibility: boolean

    tags: string[]
    techStack?: string[]
}

/** Complete portfolio project combining GitHub data with metadata */
export interface PortfolioProject extends ProjectModel {
    metadata: ProjectMetadata
}
