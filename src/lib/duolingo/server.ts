/**
 * =============================================================================
 * DUOLINGO API INTEGRATION
 * =============================================================================
 * Fetches Duolingo learning statistics using duome.eu public service.
 * No authentication required - just a username.
 * =============================================================================
 */

export interface DuolingoStats {
    username: string;
    streak: number;
    totalXp: number;
    currentLanguage: string;
    languages: { name: string; level: number; xp: number }[];
    dailyGoal: number;
    streakExtendedToday: boolean;
}

/**
 * Fetch Duolingo user stats from duome.eu
 * Note: This scrapes public profile data
 */
export async function getDuolingoStats(username: string): Promise<DuolingoStats | null> {
    try {
        // Try to fetch from Duolingo's public JSON endpoint
        const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            // Fallback: return sample data structure for graceful degradation
            console.error(`Duolingo API error: ${response.status}`);
            return null;
        }

        const data = await response.json();
        const user = data.users?.[0];

        if (!user) {
            return null;
        }

        // Extract language courses
        const languages = (user.courses || []).map((course: {
            title: string;
            level?: number;
            crowns?: number;
            xp: number;
        }) => ({
            name: course.title,
            level: course.level || course.crowns || 0,
            xp: course.xp || 0,
        }));

        return {
            username: user.username || username,
            streak: user.streak || 0,
            totalXp: user.totalXp || 0,
            currentLanguage: user.currentCourse?.title || languages[0]?.name || '',
            languages,
            dailyGoal: user.xpGoal || 10,
            streakExtendedToday: user.streakData?.currentStreak?.endDate === new Date().toISOString().split('T')[0],
        };
    } catch (error) {
        console.error('Failed to fetch Duolingo stats:', error);
        return null;
    }
}
