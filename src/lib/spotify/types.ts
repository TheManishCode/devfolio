/**
 * =============================================================================
 * SPOTIFY INTEGRATION TYPES
 * =============================================================================
 * Types specific to the Spotify API integration.
 * =============================================================================
 */

/**
 * Spotify API access token response
 */
export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope?: string;
}

/**
 * Spotify now playing track response (raw API)
 */
export interface SpotifyNowPlayingResponse {
    is_playing: boolean;
    item: {
        name: string;
        artists: { name: string }[];
        album: {
            name: string;
            images: { url: string }[];
        };
        external_urls: {
            spotify: string;
        };
    } | null;
}

/**
 * Normalized now playing data for UI consumption
 */
export interface NowPlayingSong {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
}
