/**
 * External Links Registry
 * 
 * Centralized registry of all external profile URLs and document links.
 * Single source of truth for social media, coding platforms, and resource URLs.
 * 
 * @remarks
 * - Update URLs here to propagate changes across all components
 * - Uses `as const` for type-safe link key autocomplete
 * - Resume path is relative to public directory
 * - Email uses mailto: protocol for native email client integration
 */
export const links = {
    // Professional profiles - primary professional presence
    github: `https://github.com/TheManishCode`,
    gitlab: `https://gitlab.com/manishp.dev`,
    linkedin: `https://linkedin.com/in/rixscx`,
    stackoverflow: `https://stackoverflow.com/users/32262219/manish-p`,

    // Coding platforms - competitive and collaborative coding
    codepen: `https://codepen.io/Manish-P-the-looper`,
    codewars: `https://www.codewars.com/users/manishp_ai`,
    dailydev: `https://app.daily.dev/manishp_ai`,

    // Product & design - product launches and design work
    producthunt: `https://www.producthunt.com/@manishp_ai`,
    dribbble: `https://dribbble.com/manishp_ai`,

    // Social media - personal brand and updates
    twitter: `https://x.com/manishp_dev`,
    x: `https://x.com/manishp_dev`,
    instagram: `https://www.instagram.com/v8coder`,
    youtube: `https://youtube.com/`,

    // Creative - photography and visual content
    unsplash: `https://unsplash.com/@manishp_ai`,

    // Gaming - Steam profile for games hobby page
    steam: `https://steamcommunity.com/id/manishp_ai`,

    // Blogs - technical writing platforms
    dev: `https://dev.to/manishp_ai`,

    // Direct resources
    resume: "/resume/Manish_Pcollege (21).pdf",
    email: "mailto:manishp.dev@gmail.com",
} as const


export type LinkKey = keyof typeof links
