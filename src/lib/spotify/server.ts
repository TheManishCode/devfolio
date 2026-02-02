/**
 * =============================================================================
 * SPOTIFY API HELPER
 * =============================================================================
 * Handles Spotify OAuth token refresh and API calls for now-playing status.
 * =============================================================================
 */

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async (): Promise<{ access_token: string }> => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;



    if (!client_id || !client_secret || !refresh_token) {
        throw new Error('Spotify credentials not configured');
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error(`Spotify token error: ${response.status} - ${errorText}`);
        throw new Error(`Failed to get Spotify access token: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return data;
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-store',
    });
};
