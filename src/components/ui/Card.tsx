import { cn } from "@/utils"

interface CardProps {
    /** Card content */
    children: React.ReactNode

    /** Visual style variant */
    variant?: "default" | "glass" | "bordered" | "gradient"

    /** Enable hover lift effect */
    hover?: boolean

    /** Additional CSS classes */
    className?: string

    /** Optional click handler - makes card interactive */
    onClick?: () => void

    /** Optional inline styles */
    style?: React.CSSProperties
}

export function Card({
    children,
    variant = "default",
    hover = false,
    className,
    onClick,
    style
}: CardProps) {
    // Base styles applied to all variants
    const baseStyles = `
    p-6 rounded-xl
    transition-all duration-300
  `

    // Variant-specific styles
    const variantStyles = {
        default: `
      bg-[var(--color-bg-secondary)]
      border border-[var(--color-border-subtle)]
    `,
        glass: `
      glass
      shadow-lg
    `,
        bordered: `
      bg-transparent
      border-2 border-[var(--color-border-default)]
    `,
        gradient: `
      bg-gradient-to-br from-[var(--color-accent-primary)]/10 to-[var(--color-accent-secondary)]/10
      border border-[var(--color-accent-primary)]/20
    `,
    }

    // Hover styles when hover prop is true
    const hoverStyles = hover ? `
    cursor-pointer
    hover:translate-y-[-4px]
    hover:shadow-xl
    hover:border-[var(--color-accent-primary)]/50
  ` : ""

    // Interactive styles when onClick is provided
    const interactiveStyles = onClick ? "cursor-pointer" : ""

    return (
        <div
            className={cn(
                baseStyles,
                variantStyles[variant],
                hoverStyles,
                interactiveStyles,
                className
            )}
            onClick={onClick}
            style={style}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onClick()
                }
            } : undefined}
        >
            {children}
        </div>
    )
}

/**
 * CardHeader - Used for card title and subtitle sections
 */
export function CardHeader({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("mb-4", className)}>
            {children}
        </div>
    )
}

/**
 * CardTitle - Styled title for cards
 */
export function CardTitle({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <h3 className={cn(
            "text-xl font-semibold text-[var(--color-text-primary)]",
            className
        )}>
            {children}
        </h3>
    )
}

/**
 * CardDescription - Styled description text for cards
 */
export function CardDescription({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <p className={cn(
            "text-sm text-[var(--color-text-secondary)] mt-1",
            className
        )}>
            {children}
        </p>
    )
}

/**
 * CardContent - Main content area of the card
 */
export function CardContent({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("", className)}>
            {children}
        </div>
    )
}

/**
 * CardFooter - Footer section for actions or metadata
 */
export function CardFooter({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn(
            "mt-4 pt-4 border-t border-[var(--color-border-subtle)]",
            className
        )}>
            {children}
        </div>
    )
}
