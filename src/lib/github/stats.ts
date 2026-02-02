const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubStats {
    username: string;
    publicRepos: number;
    totalStars: number;
    followers: number;
    following: number;
    avatarUrl: string;
    profileUrl: string;
    bio: string | null;
}

export interface GitHubRepo {
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
    updatedAt: string;
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const user = await response.json();

    // Fetch repos to calculate total stars
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
    });

    let totalStars = 0;
    if (reposResponse.ok) {
        const repos = await reposResponse.json();
        totalStars = repos.reduce((sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count, 0);
    }

    return {
        username: user.login,
        publicRepos: user.public_repos,
        totalStars,
        followers: user.followers,
        following: user.following,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        bio: user.bio,
    };
}

export async function getTopRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=stars&direction=desc`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    return repos.slice(0, limit).map((repo: {
        name: string;
        description: string | null;
        stargazers_count: number;
        forks_count: number;
        language: string | null;
        html_url: string;
        updated_at: string;
    }) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        updatedAt: repo.updated_at,
    }));
}

export async function getLanguageStats(username: string): Promise<{ name: string; percentage: number; color: string }[]> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Count languages
    const languageCounts: Record<string, number> = {};
    for (const repo of repos) {
        if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
    }

    // Language colors (common ones)
    const languageColors: Record<string, string> = {
        TypeScript: '#3178c6',
        JavaScript: '#f7df1e',
        Python: '#3776ab',
        Java: '#b07219',
        'C++': '#f34b7d',
        C: '#555555',
        Go: '#00ADD8',
        Rust: '#dea584',
        Ruby: '#701516',
        PHP: '#4F5D95',
        CSS: '#563d7c',
        HTML: '#e34c26',
        Shell: '#89e051',
        Kotlin: '#A97BFF',
        Swift: '#ffac45',
        Dart: '#00B4AB',
    };

    const total = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);

    return Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({
            name,
            percentage: Math.round((count / total) * 100),
            color: languageColors[name] || '#6b7280',
        }));
}
