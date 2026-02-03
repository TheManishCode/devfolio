import { NextResponse } from 'next/server';
import { getDuolingoStats } from '@/lib/duolingo/server';

// Force dynamic rendering - no static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Use Node.js runtime for better fetch compatibility

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

        // Return with cache headers for CDN
        return NextResponse.json(stats, {
            headers: {
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
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
