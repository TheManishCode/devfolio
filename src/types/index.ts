/**
 * Spotify Integration Types
 * 
 * Type definitions for Spotify Now Playing widget and Top Tracks features.
 * These types match the transformed response from the Spotify Web API.
 */

/** Currently playing track information from Spotify */
export type NowPlayingSong = {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
};

/** Simplified song data for track listings */
export type Song = {
    songUrl: string;
    artist: string;
    cover: string;
    title: string;
};

/** Collection of top tracks from Spotify listening history */
export type TopTracks = {
    tracks: Song[];
};
