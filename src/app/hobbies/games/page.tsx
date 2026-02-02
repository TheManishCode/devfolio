"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import {
  ChevronLeft,
  ExternalLink,
  Target,
  Clock,
  Trophy,
  Gamepad2,
  Music,
  Monitor
} from "lucide-react"

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

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * COMPONENT: StatBox
 * A minimalist "spec-sheet" style stat display with loading skeleton
 */
const StatBox = ({ label, value, icon: Icon, isLoading }: { label: string; value: string | number; icon: any; isLoading?: boolean }) => (
  <div className="group relative p-8 bg-zinc-950/20 border border-zinc-900 backdrop-blur-3xl overflow-hidden transition-all duration-500 hover:border-zinc-700">
    <Icon className="absolute -right-4 -top-4 w-24 h-24 text-zinc-900 group-hover:text-zinc-800 transition-colors duration-500" />
    <div className="relative z-10">
      <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-4">{label}</p>
      {isLoading ? (
        <div className="h-10 w-32 bg-zinc-800 rounded animate-pulse" />
      ) : (
        <p className="text-4xl font-light text-zinc-200 tracking-tighter">{value}</p>
      )}
    </div>
  </div>
)

/**
 * COMPONENT: SkeletonLine
 * Simple loading placeholder
 */
const SkeletonLine = ({ className = "" }: { className?: string }) => (
  <div className={`bg-zinc-800 rounded animate-pulse ${className}`} />
)

export default function GamesPage() {
  const { data, isLoading, error } = useSWR<CombinedResponse>("/api/games", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  })

  const systemStats = data?.systemStats || { totalHours: 0, totalGames: 0, totalAchievementsUnlocked: 0, rankLevel: 0, sources: { steamGames: 0, epicGames: 0 } }
  const epicStats = data?.epic?.stats || { totalGames: 0, totalXP: 0, achievementsUnlocked: 0, platinum: 0 }
  const legacyArchive = data?.legacyArchive || []
  const platforms = data?.platforms || []

  return (
    <div className="min-h-screen bg-transparent text-zinc-400 font-sans selection:bg-zinc-200 selection:text-black">
      <div className="max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">

        {/* --- HEADER --- */}
        <nav className="mb-24">
          <Link
            href="/hobbies"
            className="group inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
          >
            <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Return to Index
          </Link>
        </nav>

        <header className="mb-32">
          <h1 className="text-7xl md:text-9xl font-light tracking-tighter text-white mb-10">
            Digital <span className="font-serif italic text-zinc-500">Manifest.</span>
          </h1>
          <div className="h-[1px] w-full bg-zinc-900 mb-10" />
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <p className="max-w-xl text-lg font-light leading-relaxed text-zinc-500">
              An exploration of interactive systems, narrative architecture, and
              mechanical complexity. Documenting a commitment to understanding
              user experience through the lens of play.
            </p>
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Status: active_session</span>
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest leading-loose">Location: local_host</span>
            </div>
          </div>
        </header>

        {/* --- PERFORMANCE METRICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 mb-32 rounded-sm overflow-hidden shadow-2xl">
          <StatBox label="System Rank" value={`LVL ${systemStats.rankLevel}`} icon={Target} isLoading={isLoading} />
          <StatBox label="Total Retention" value={`${systemStats.totalHours}H`} icon={Clock} isLoading={isLoading} />
          <StatBox label="Achievements" value={systemStats.totalAchievementsUnlocked} icon={Trophy} isLoading={isLoading} />
        </div>

        {/* --- EPIC METRICS --- */}
        <section className="mb-40">
          <div className="flex items-end justify-between mb-12 border-b border-zinc-900 pb-6">
            <h2 className="text-xs uppercase tracking-[0.5em] font-semibold text-zinc-200">Epic Games Metrics</h2>
            <span className="text-[10px] font-mono text-zinc-700 uppercase">{isLoading ? "Loading..." : "Live_Data"}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 border border-zinc-900 bg-zinc-950/20 backdrop-blur-3xl">
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-3">Library Size</p>
              {isLoading ? (
                <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
              ) : (
                <p className="text-2xl font-light text-zinc-200">{epicStats.totalGames}</p>
              )}
            </div>
            <div className="p-4 border border-zinc-900 bg-zinc-950/20 backdrop-blur-3xl">
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-3">Total XP</p>
              {isLoading ? (
                <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
              ) : (
                <p className="text-2xl font-light text-zinc-200">{epicStats.totalXP}</p>
              )}
            </div>
            <div className="p-4 border border-zinc-900 bg-zinc-950/20 backdrop-blur-3xl">
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-3">Achievements</p>
              {isLoading ? (
                <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
              ) : (
                <p className="text-2xl font-light text-zinc-200">{epicStats.achievementsUnlocked}</p>
              )}
            </div>
            <div className="p-4 border border-zinc-900 bg-zinc-950/20 backdrop-blur-3xl">
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-3">Platinum</p>
              {isLoading ? (
                <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
              ) : (
                <p className="text-2xl font-light text-zinc-200">{epicStats.platinum}</p>
              )}
            </div>
          </div>
        </section>

        {/* --- LIVE ANALYSIS (Now Playing) --- */}
        <section className="mb-40">
          <div className="flex items-end justify-between mb-12 border-b border-zinc-900 pb-6">
            <h2 className="text-xs uppercase tracking-[0.5em] font-semibold text-zinc-200">Current Analysis</h2>
            <span className="text-[10px] font-mono text-zinc-700 uppercase">{isLoading ? "Loading..." : "Offline_Now"}</span>
          </div>

          <p className="text-zinc-600 italic">No session data available</p>
        </section>

        {/* --- GALLERY --- */}
        <section className="mb-40">
          <div className="flex items-end justify-between mb-12 border-b border-zinc-900 pb-6">
            <h2 className="text-xs uppercase tracking-[0.5em] font-semibold text-zinc-200">Legacy Archive</h2>
            <span className="text-[10px] font-mono text-zinc-700 uppercase">{isLoading ? "Fetching..." : "Dynamic_Records"}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <SkeletonLine className="aspect-[3/4] mb-4" />
                  <SkeletonLine className="h-4 w-full mb-2" />
                  <SkeletonLine className="h-3 w-16" />
                </div>
              ))}
            </div>
          ) : legacyArchive.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {legacyArchive.map((game) => (
                <div key={game.id} className="group cursor-none">
                  {game.cover ? (
                    <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-zinc-900">
                      <Image
                        src={game.cover}
                        alt={game.title}
                        fill
                        className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] mb-4 bg-zinc-900 flex items-center justify-center text-zinc-700 border border-white/0 group-hover:border-white/10 transition-all duration-500">
                      <Monitor className="w-6 h-6" />
                    </div>
                  )}
                  <h4 className="text-[11px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-200 transition-colors truncate">{game.title}</h4>
                  {game.achievements ? (
                    <p className="text-[9px] font-mono text-zinc-700 mt-1">{game.achievements.unlocked}/{game.achievements.total}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 italic">No games in library yet</p>
          )}
        </section>

        {/* --- PLATFORMS / FOOTER --- */}
        <footer className="pt-24 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700">
          {isLoading ? (
            <>
              <SkeletonLine className="h-12 w-24" />
              <SkeletonLine className="h-12 w-24" />
            </>
          ) : Array.isArray(platforms) && platforms.length > 0 ? (
            platforms.map((p: any) => (
              <div key={p.name} className="flex flex-col gap-2">
                <span className="text-zinc-500">{p.name}</span>
                <span className="text-zinc-300 text-lg font-sans tracking-normal font-light">{p.count} Units</span>
              </div>
            ))
          ) : null}
          <div className="lg:col-span-1 text-right self-end">
            Design_ID: PC-4090-A <br />
            © 2026 Personal_Data_Sheet
          </div>
        </footer>

      </div>
    </div>
  )
}