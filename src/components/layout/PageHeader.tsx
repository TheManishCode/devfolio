interface PageHeaderProps {
    title: string

    description?: string

    badge?: string

    children?: React.ReactNode
}

export function PageHeader({ title, description, badge, children }: PageHeaderProps) {
    return (
        <header className="mb-12 animate-slide-up">

            {badge && (
                <span
                    className="
            inline-block mb-4 px-3 py-1
            text-sm font-medium
            text-[var(--color-accent-primary)]
            bg-[var(--color-accent-primary)]/10
            rounded-full
          "
                >
                    {badge}
                </span>
            )}


            <h1
                className="
          text-4xl sm:text-5xl font-bold
          mb-4
          gradient-text
        "
            >
                {title}
            </h1>


            {description && (
                <p
                    className="
            text-lg sm:text-xl
            text-[var(--color-text-secondary)]
            max-w-2xl
            leading-relaxed
          "
                >
                    {description}
                </p>
            )}


            {children && (
                <div className="mt-6">
                    {children}
                </div>
            )}
        </header>
    )
}
