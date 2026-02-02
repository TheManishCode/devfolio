/**
 * UI Primitives - Barrel Export
 * 
 * Reusable, presentation-focused UI components without business logic.
 * Import from this file for consistent UI building blocks across features.
 * 
 * @example
 * import { Card, Skeleton, SectionTitle } from '@/components/ui'
 */

// Layout primitives
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

// Theme management
export { ThemeToggle } from './ThemeToggle';
export { ThemeProvider } from './ThemeProvider';

// Animation components
export { Marquee } from './marquee';

// Loading states
export {
    Skeleton,
    SkeletonText,
    SkeletonCard,
    SkeletonGrid,
    SkeletonExperience,
    SkeletonStats,
    SkeletonHeader,
    SkeletonAvatar,
} from './Skeleton';

// Typography system
export {
    SectionTitle,
    PageSubtitle,
    CardTitle as TypographyCardTitle,
    ProjectTitle,
    MetaLabel,
    SectionLabel,
    BodyText,
    MutedText,
    AccentText,
    DateText,
} from './Typography';
