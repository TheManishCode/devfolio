import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface EpicGame {
  id: string
  title: string
  cover: string | null
  achievements: { unlocked: number; total: number } | null
}

interface CombinedResponse {
  systemStats: {
    totalHours: number
    totalGames: number
    totalAchievementsUnlocked: number
    rankLevel: number
    sources: {
      steamGames: number
      epicGames: number
    }
  }
  epic: {
    stats: {
      totalGames: number
      totalXP: number
      achievementsUnlocked: number
      platinum: number
    }
    library: EpicGame[]
  }
  nowPlaying: []
  legacyArchive: EpicGame[]
  platforms: Array<{ name: string; count: number }>
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Load Epic library from JSON using fs to bypass module cache
    let epicData = {
      stats: {
        totalGames: 0,
        totalXP: 35,
        achievementsUnlocked: 3,
        platinum: 0,
      },
      library: [] as EpicGame[],
    }

    try {
      const jsonPath = path.join(process.cwd(), 'src', 'data', 'epic-library.json')
      const fileContent = fs.readFileSync(jsonPath, 'utf-8')
      const epicLibrary = JSON.parse(fileContent)

      epicData.stats.totalGames = epicLibrary.stats?.totalGames || 0
      epicData.stats.totalXP = epicLibrary.stats?.totalXP || 35
      epicData.stats.achievementsUnlocked = epicLibrary.stats?.achievementsUnlocked || 3
      epicData.stats.platinum = epicLibrary.stats?.platinum || 0
      epicData.library = (epicLibrary.library || [])
        .filter((game: any) => game.cover !== null) // Only include games with covers
        .map((game: any) => ({
          id: game.id,
          title: game.title,
          cover: game.cover || null,
          achievements: game.achievements || null,
        }))
    } catch (error) {
      console.error("[Games API] Error loading Epic library:", error)
      epicData.library = []
    }

    // Build response
    const response: CombinedResponse = {
      systemStats: {
        totalHours: 0,
        totalGames: epicData.library.length,
        totalAchievementsUnlocked: epicData.stats.achievementsUnlocked,
        rankLevel: 0,
        sources: {
          steamGames: 0,
          epicGames: epicData.library.length,
        },
      },
      epic: epicData,
      nowPlaying: [],
      legacyArchive: epicData.library.slice(0, 40),
      platforms: [
        { name: "Epic Games", count: epicData.library.length },
        { name: "Epic XP", count: epicData.stats.totalXP },
        { name: "Epic Achievements", count: epicData.stats.achievementsUnlocked },
      ],
    }

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    })
  } catch (error) {
    console.error("[Games API] Error:", error)
    return NextResponse.json(
      {
        systemStats: {
          totalHours: 0,
          totalGames: 0,
          totalAchievementsUnlocked: 0,
          rankLevel: 0,
          sources: {
            steamGames: 0,
            epicGames: 0,
          },
        },
        epic: {
          stats: { totalGames: 0, totalXP: 35, achievementsUnlocked: 3, platinum: 0 },
          library: [],
        },
        nowPlaying: [],
        legacyArchive: [],
        platforms: [
          { name: "Epic Games", count: 0 },
          { name: "Epic XP", count: 35 },
          { name: "Epic Achievements", count: 3 },
        ],
      },
      { status: 500 }
    )
  }
}
