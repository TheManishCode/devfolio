interface CardViewportProps {
    children: React.ReactNode
    className?: string
}

export function CardViewport({ children, className = "" }: CardViewportProps) {
    // Fixed height as per requirements, overflow hidden for sliding effect
    return (
        <div className={`relative w-full h-[280px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 group-hover:border-[#33E092]/50 ${className}`}>
            {children}
        </div>
    )
}
