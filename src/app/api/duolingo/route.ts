import { NextResponse } from 'next/server';
import { getDuolingoStats } from '@/lib/duolingo/server';

// Force dynamic rendering - real-time data
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || process.env.DUOLINGO_USERNAME;

    if (!username) {
        return NextResponse.json(
            { error: 'Duolingo username not configured' },
            { status: 400 }
        );
    }

    try {
        const stats = await getDuolingoStats(username);

        if (!stats) {
            return NextResponse.json(
                { error: 'User not found or API unavailable' },
                { status: 404 }
            );
        }

        // No caching - always fresh data
        return NextResponse.json(stats, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Duolingo API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Duolingo data', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
