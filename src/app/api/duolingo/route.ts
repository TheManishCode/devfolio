import { NextResponse } from 'next/server';
import { getDuolingoStats } from '@/lib/duolingo/server';

export const dynamic = 'force-dynamic';
export const revalidate = 600; // 10 minutes ISR - Duolingo data doesn't change frequently

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

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Duolingo API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Duolingo data', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
