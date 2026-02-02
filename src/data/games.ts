/**
 * =============================================================================
 * GAMES DATA - Premium Edition
 * =============================================================================
 * 
 * Features: OST/soundtracks, platform info, playtime, Steam links
 * =============================================================================
 */

export interface Game {
    id: number
    title: string
    image: string
    bannerImage?: string
    rating: number
    status: "Playing" | "Completed" | "Backlog" | "Dropped" | "100%"
    genres: string[]
    year: number
    platform: string[]
    playtime?: number // hours
    description: string
    developer?: string
    publisher?: string
    quote?: string
    ost?: {
        name: string
        artist?: string
        spotifyUrl?: string
        youtubeUrl?: string
    }
    steamUrl?: string
    trailerUrl?: string
}

// 🎮 FAVORITE GAMES - Update with your actual favorites!
export const FAVORITE_GAMES: Game[] = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/540/540373.jpg",
        rating: 10,
        status: "100%",
        genres: ["RPG", "Open World", "Story Rich"],
        year: 2015,
        platform: ["PC", "PS5", "Xbox", "Switch"],
        playtime: 180,
        developer: "CD Projekt Red",
        description: "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy.",
        quote: "Evil is evil. Lesser, greater, middling... it's all the same.",
        ost: {
            name: "Silver for Monsters",
            artist: "Marcin Przybyłowicz",
            spotifyUrl: "https://open.spotify.com/track/0kTZBzFq95qvLxZG1pCk4R",
            youtubeUrl: "https://www.youtube.com/watch?v=YQS4o_bYA_M"
        },
        steamUrl: "https://store.steampowered.com/app/292030",
        trailerUrl: "https://www.youtube.com/watch?v=c0i88t0Kacs"
    },
    {
        id: 2,
        title: "Red Dead Redemption 2",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/992/992952.jpg",
        rating: 10,
        status: "Completed",
        genres: ["Action", "Adventure", "Open World"],
        year: 2018,
        platform: ["PC", "PS4", "Xbox"],
        playtime: 120,
        developer: "Rockstar Games",
        description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run.",
        quote: "We're thieves in a world that don't want us no more.",
        ost: {
            name: "That's the Way It Is",
            artist: "Daniel Lanois",
            spotifyUrl: "https://open.spotify.com/track/3d5zMp8fVbi0x2NMBC7Tbj",
            youtubeUrl: "https://www.youtube.com/watch?v=YdW5-uJqCVY"
        },
        steamUrl: "https://store.steampowered.com/app/1174180"
    },
    {
        id: 3,
        title: "Elden Ring",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/120/1206860.jpg",
        rating: 9.5,
        status: "Playing",
        genres: ["Souls-like", "Open World", "Action RPG"],
        year: 2022,
        platform: ["PC", "PS5", "Xbox"],
        playtime: 85,
        developer: "FromSoftware",
        description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        quote: "Put these foolish ambitions to rest.",
        ost: {
            name: "Elden Ring Main Theme",
            artist: "Yuka Kitamura",
            youtubeUrl: "https://www.youtube.com/watch?v=JldMvQMO_5U"
        },
        steamUrl: "https://store.steampowered.com/app/1245620"
    },
    {
        id: 4,
        title: "Hollow Knight",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/103/1031804.jpg",
        rating: 9.5,
        status: "100%",
        genres: ["Metroidvania", "Souls-like", "Indie"],
        year: 2017,
        platform: ["PC", "Switch", "PS4", "Xbox"],
        playtime: 65,
        developer: "Team Cherry",
        description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
        ost: {
            name: "City of Tears",
            artist: "Christopher Larkin",
            spotifyUrl: "https://open.spotify.com/track/0bEHZ5rbKb9ijXwvgMHLLc",
            youtubeUrl: "https://www.youtube.com/watch?v=1unm0LS10ao"
        },
        steamUrl: "https://store.steampowered.com/app/367520"
    },
    {
        id: 5,
        title: "Cyberpunk 2077",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/108/1089894.jpg",
        rating: 9,
        status: "Completed",
        genres: ["RPG", "Open World", "Cyberpunk"],
        year: 2020,
        platform: ["PC", "PS5", "Xbox"],
        playtime: 95,
        developer: "CD Projekt Red",
        description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City.",
        quote: "Wake the f*ck up, Samurai. We have a city to burn.",
        ost: {
            name: "Never Fade Away",
            artist: "SAMURAI (Refused)",
            spotifyUrl: "https://open.spotify.com/track/6bLjqzE0J6QJjQ3n2j5yLI",
            youtubeUrl: "https://www.youtube.com/watch?v=P4bKRG_fbvk"
        },
        steamUrl: "https://store.steampowered.com/app/1091500"
    },
    {
        id: 6,
        title: "Hades",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/110/1104534.jpg",
        rating: 9.5,
        status: "100%",
        genres: ["Roguelike", "Action", "Indie"],
        year: 2020,
        platform: ["PC", "Switch", "PS5", "Xbox"],
        playtime: 110,
        developer: "Supergiant Games",
        description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.",
        ost: {
            name: "Good Riddance",
            artist: "Darren Korb ft. Ashley Barrett",
            spotifyUrl: "https://open.spotify.com/track/3MYJVCUKWstEOpNzVx3V1J",
            youtubeUrl: "https://www.youtube.com/watch?v=Yj5Jy85a2Hs"
        },
        steamUrl: "https://store.steampowered.com/app/1145360"
    }
]

// 🎮 CURRENTLY PLAYING
export const PLAYING_NOW: Game[] = [
    {
        id: 101,
        title: "Baldur's Gate 3",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900_2x.jpg",
        bannerImage: "https://images.alphacoders.com/130/1305553.jpg",
        rating: 10,
        status: "Playing",
        genres: ["RPG", "Turn-Based", "Co-op"],
        year: 2023,
        platform: ["PC", "PS5"],
        playtime: 45,
        developer: "Larian Studios",
        description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival.",
        ost: {
            name: "I Want to Live",
            artist: "Borislav Slavov",
            spotifyUrl: "https://open.spotify.com/track/6VGbLpJxMV7LOMlLOxSLsb",
            youtubeUrl: "https://www.youtube.com/watch?v=6fkJRKrLPQQ"
        },
        steamUrl: "https://store.steampowered.com/app/1086940"
    }
]

// 📊 STATS
export const GAME_STATS = {
    totalGames: 156,
    hoursPlayed: 2840,
    completionRate: 68,
    achievementsUnlocked: 1247,
    currentStreak: 12, // days
    favoriteGenre: "RPG"
}

// 🏆 PLATFORM BREAKDOWN
export const PLATFORMS = [
    { name: "PC", count: 98, color: "#33E092", icon: "💻" },
    { name: "PlayStation", count: 34, color: "#006FCD", icon: "🎮" },
    { name: "Nintendo", count: 18, color: "#E60012", icon: "🕹️" },
    { name: "Xbox", count: 6, color: "#107C10", icon: "🎯" },
]
