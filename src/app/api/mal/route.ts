import { getCompletedAnime, getWatchingAnime, getAnimeStats } from '@/lib/mal/server';
import { NextResponse } from 'next/server';

/**
 * CACHING: 10 minute ISR - Anime lists change infrequently
 */
export const dynamic = 'force-dynamic';
export const revalidate = 600;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'completed';

    const clientId = process.env.MAL_CLIENT_ID;
    const username = process.env.MAL_USERNAME;

    if (!clientId || !username) {
        return NextResponse.json(
            { error: 'MAL credentials not configured' },
            { status: 500 }
        );
    }

    try {
        let data;
        if (type === 'watching') {
            data = await getWatchingAnime(username, clientId);
        } else if (type === 'stats') {
            data = await getAnimeStats(username, clientId);
        } else {
            data = await getCompletedAnime(username, clientId);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('MAL API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch anime data', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
