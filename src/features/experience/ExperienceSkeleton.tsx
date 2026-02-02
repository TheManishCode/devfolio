/**
 * =============================================================================
 * EXPERIENCE LOADING SKELETON
 * =============================================================================
 * Used as Suspense fallback for async experience data loading.
 * =============================================================================
 */

import { SkeletonHeader, SkeletonExperience } from "@/components/ui/Skeleton"

export function ExperienceSkeleton() {
    return (
        <div className="space-y-8">
            <SkeletonHeader />
            <SkeletonExperience />
        </div>
    )
}
