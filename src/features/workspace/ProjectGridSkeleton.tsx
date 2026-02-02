/**
 * =============================================================================
 * PROJECT GRID LOADING SKELETON
 * =============================================================================
 * Used as Suspense fallback for async project grid loading.
 * =============================================================================
 */

import { SkeletonGrid, SkeletonHeader } from "@/components/ui/Skeleton"

export function ProjectGridSkeleton() {
    return (
        <div className="space-y-8">
            <SkeletonHeader />
            <SkeletonGrid count={6} />
        </div>
    )
}
