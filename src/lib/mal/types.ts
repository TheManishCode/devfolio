/**
 * =============================================================================
 * MYANIMELIST INTEGRATION TYPES
 * =============================================================================
 * Types specific to the MAL API integration.
 * Re-exported from server.ts for cleaner imports.
 * =============================================================================
 */

// Re-export types from server for external consumers
export type {
    MALAnime,
    MALAnimeListResponse,
    TransformedAnime,
    MALUserStats
} from './server';
