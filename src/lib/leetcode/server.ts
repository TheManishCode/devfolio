/**
 * =============================================================================
 * LEETCODE API INTEGRATION
 * =============================================================================
 * Fetches LeetCode statistics using leetcode-api-faisalshohag.
 * =============================================================================
 */

const LEETCODE_API_BASE = 'https://leetcode-api-faisalshohag.vercel.app';

export interface LeetCodeStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    acceptanceRate: number;
    contributionPoints: number;
    reputation: number;
}

export interface LeetCodeProfile {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
}

/**
 * Fetch all LeetCode data for a user
 */
export async function getLeetCodeData(username: string): Promise<{ profile: LeetCodeProfile | null; stats: LeetCodeStats | null }> {
    try {
        const response = await fetch(`${LEETCODE_API_BASE}/${username}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`LeetCode API error: ${response.status}`);
            return { profile: null, stats: null };
        }

        const data = await response.json();

        return {
            profile: {
                username: username,
                name: data.name || '',
                avatar: data.avatar || '',
                ranking: data.ranking || 0,
            },
            stats: {
                totalSolved: data.totalSolved || 0,
                easySolved: data.easySolved || 0,
                mediumSolved: data.mediumSolved || 0,
                hardSolved: data.hardSolved || 0,
                ranking: data.ranking || 0,
                acceptanceRate: parseFloat(data.acceptanceRate) || 0,
                contributionPoints: data.contributionPoints || 0,
                reputation: data.reputation || 0,
            },
        };
    } catch (error) {
        console.error('Failed to fetch LeetCode data:', error);
        return { profile: null, stats: null };
    }
}
