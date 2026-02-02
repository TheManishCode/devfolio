interface PageContainerProps {
    children: React.ReactNode
    /** Maximum content width. Defaults to '7xl' (max-w-7xl = 80rem) */
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'wide'
    /** Additional CSS classes */
    className?: string
    /** Use 'main' or 'div' as wrapper. Defaults to 'main' */
    as?: 'main' | 'div'
}

const widthClasses = {
    'sm': 'max-w-2xl',
    'md': 'max-w-3xl',
    'lg': 'max-w-4xl',
    'xl': 'max-w-5xl',
    '2xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'wide': 'max-w-[1400px]'
} as const

/**
 * Unified page container component for consistent spacing across all pages.
 * 
 * Standard spacing:
 * - Top padding: pt-20 lg:pt-28 (accounts for navbar)
 * - Bottom padding: pb-20
 * - Side padding: px-6 sm:px-8 md:px-12 lg:px-16
 * - Max width: Configurable via maxWidth prop
 */
export function PageContainer({
    children,
    maxWidth = '7xl',
    className = '',
    as: Component = 'main'
}: PageContainerProps) {
    return (
        <Component
            className={`
                ${widthClasses[maxWidth]} mx-auto
                pt-20 lg:pt-28 pb-20
                px-6 sm:px-8 md:px-12 lg:px-16
                ${className}
            `.trim().replace(/\s+/g, ' ')}
        >
            {children}
        </Component>
    )
}

/**
 * Page header component with consistent styling.
 * Use inside PageContainer for page titles.
 */
export function PageTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <h1 className={`font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight ${className}`}>
            {children}
        </h1>
    )
}

/**
 * Page description/subtitle with consistent styling.
 */
export function PageDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={`text-base dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-2xl ${className}`}>
            {children}
        </p>
    )
}
