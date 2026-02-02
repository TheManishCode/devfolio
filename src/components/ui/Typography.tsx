import { cn } from "@/utils"

interface TypographyProps {
    children: React.ReactNode
    className?: string
}

/**
 * Section title for home page sections
 * Pattern: font-incognito text-xl font-semibold dark:text-white text-zinc-900
 */
export function SectionTitle({ children, className }: TypographyProps) {
    return (
        <h2 className={cn("font-incognito text-xl font-semibold dark:text-white text-zinc-900", className)}>
            {children}
        </h2>
    )
}

/**
 * Page subtitle used across workspace, myself, gallery pages
 * Pattern: font-incognito text-2xl font-semibold dark:text-zinc-400 text-zinc-500
 */
export function PageSubtitle({ children, className }: TypographyProps) {
    return (
        <p className={cn("font-incognito text-2xl font-semibold dark:text-zinc-400 text-zinc-500", className)}>
            {children}
        </p>
    )
}

/**
 * Card/item title for project cards, timeline items, etc.
 * Pattern: font-incognito font-semibold text-lg dark:text-white text-zinc-900
 */
export function CardTitle({ children, className }: TypographyProps) {
    return (
        <h3 className={cn("font-incognito font-semibold text-lg dark:text-white text-zinc-900", className)}>
            {children}
        </h3>
    )
}

/**
 * Project card title (larger variant)
 * Pattern: font-incognito font-semibold text-xl text-zinc-800 dark:text-zinc-100
 */
export function ProjectTitle({ children, className }: TypographyProps) {
    return (
        <h3 className={cn("font-incognito font-semibold text-xl text-zinc-800 dark:text-zinc-100", className)}>
            {children}
        </h3>
    )
}

/**
 * Uppercase meta label used for categories, badges, technical labels
 * Pattern: font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400
 */
export function MetaLabel({ children, className }: TypographyProps) {
    return (
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400", className)}>
            {children}
        </span>
    )
}

/**
 * Uppercase section label (slightly larger variant with tracking-widest)
 * Pattern: font-mono text-sm uppercase tracking-widest dark:text-zinc-400 text-zinc-500
 */
export function SectionLabel({ children, className }: TypographyProps) {
    return (
        <h2 className={cn("font-mono text-sm uppercase tracking-widest dark:text-zinc-400 text-zinc-500", className)}>
            {children}
        </h2>
    )
}

/**
 * Body text paragraph
 * Pattern: text-base dark:text-zinc-400 text-zinc-600 leading-relaxed
 */
export function BodyText({ children, className }: TypographyProps) {
    return (
        <p className={cn("text-base dark:text-zinc-400 text-zinc-600 leading-relaxed", className)}>
            {children}
        </p>
    )
}

/**
 * Muted/secondary text
 * Pattern: dark:text-zinc-400 text-zinc-600
 */
export function MutedText({ children, className }: TypographyProps) {
    return (
        <p className={cn("dark:text-zinc-400 text-zinc-600", className)}>
            {children}
        </p>
    )
}

/**
 * Accent-colored text (primary green)
 * Pattern: text-[#33E092]
 */
export function AccentText({ children, className }: TypographyProps) {
    return (
        <span className={cn("text-[#33E092]", className)}>
            {children}
        </span>
    )
}

/**
 * Timeline/date metadata
 * Pattern: text-sm dark:text-zinc-500 text-zinc-500
 */
export function DateText({ children, className }: TypographyProps) {
    return (
        <span className={cn("text-sm dark:text-zinc-500 text-zinc-500", className)}>
            {children}
        </span>
    )
}
