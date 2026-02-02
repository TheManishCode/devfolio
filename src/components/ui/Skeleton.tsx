/**
 * =============================================================================
 * SKELETON COMPONENTS
 * =============================================================================
 * Reusable loading skeleton components for consistent loading states.
 * Uses CSS animations for smooth shimmer effect.
 * =============================================================================
 */

import React from 'react'

// Base skeleton with shimmer animation
export function Skeleton({
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 ${className}`}
            {...props}
        />
    )
}

// Text line skeleton
export function SkeletonText({
    lines = 1,
    className = ''
}: {
    lines?: number
    className?: string
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    )
}

// Card skeleton for project cards
export function SkeletonCard({ className = '' }: { className?: string }) {
    return (
        <div className={`rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 ${className}`}>
            {/* Image placeholder */}
            <Skeleton className="h-40 w-full mb-4" />
            {/* Title */}
            <Skeleton className="h-6 w-3/4 mb-2" />
            {/* Description */}
            <SkeletonText lines={2} className="mb-4" />
            {/* Tags */}
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
            </div>
        </div>
    )
}

// Grid of card skeletons
export function SkeletonGrid({
    count = 6,
    columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    className = ''
}: {
    count?: number
    columns?: string
    className?: string
}) {
    return (
        <div className={`grid ${columns} gap-6 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )
}

// Experience timeline skeleton
export function SkeletonExperience({ className = '' }: { className?: string }) {
    return (
        <div className={`space-y-8 ${className}`}>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    {/* Timeline dot */}
                    <Skeleton className="h-4 w-4 rounded-full flex-shrink-0 mt-1" />
                    <div className="flex-1 space-y-3">
                        {/* Company & Role */}
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                        {/* Description */}
                        <SkeletonText lines={3} />
                        {/* Tech tags */}
                        <div className="flex gap-2 flex-wrap">
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-5 w-14 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Stats card skeleton
export function SkeletonStats({ className = '' }: { className?: string }) {
    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                </div>
            ))}
        </div>
    )
}

// Page header skeleton
export function SkeletonHeader({ className = '' }: { className?: string }) {
    return (
        <div className={`space-y-4 mb-8 ${className}`}>
            {/* Badge */}
            <Skeleton className="h-6 w-24 rounded-full" />
            {/* Title */}
            <Skeleton className="h-10 w-2/3" />
            {/* Description */}
            <SkeletonText lines={2} className="max-w-2xl" />
        </div>
    )
}

// Avatar skeleton
export function SkeletonAvatar({
    size = 'md',
    className = ''
}: {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-20 w-20'
    }
    return (
        <Skeleton className={`rounded-full ${sizeClasses[size]} ${className}`} />
    )
}
