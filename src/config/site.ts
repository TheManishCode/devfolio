/**
 * Site Configuration
 * 
 * Central source of truth for site-wide metadata, SEO settings, and social handles.
 * Used by Next.js metadata API, OpenGraph tags, and throughout the application.
 * 
 * @remarks
 * - All values are frozen (`as const`) to ensure type safety and prevent accidental mutation
 * - GitHub username falls back to environment variable for deployment flexibility
 * - Update this file when personal branding or SEO strategy changes
 */
export const siteConfig = {
    name: "Manish P",
    title: "Software Developer",
    tagline: "Software developer, technical writer & open-source maintainer",

    url: "https://manishp.dev",
    domain: "manishp.dev",

    description: "Software Developer and Technical Writer passionate about building solutions and contributing to open source communities",

    openGraph: {
        type: "website" as const,
        locale: "en-US",
        siteName: "manishp.dev",
    },

    social: {
        twitter: "@manishp_dev",
        github: "TheManishCode",
    },

    githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "TheManishCode",
} as const

export type SiteConfig = typeof siteConfig
