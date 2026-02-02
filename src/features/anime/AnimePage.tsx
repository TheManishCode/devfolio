"use client"

import Link from "next/link"
import { SiMyanimelist, SiCrunchyroll } from "react-icons/si"

import { FloatingKanji } from "./HeroSection"
import { TypewriterQuote } from "./TypewriterQuote"
import { AnimeMalStats } from "./AnimeMalStats"
import { CurrentlyWatchingSection } from "./CurrentlyWatching"
import { CharacterShowcase } from "./CharacterShowcase"
import { OPPlaylist } from "./OPPlaylist"
import HallOfFame from "./HallOfFame"
import CompletedAnimeSection from "./CompletedAnimeSection"

export function AnimePageContent() {
    return (
        <div className="min-h-screen relative">
            <FloatingKanji />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto pt-20 lg:pt-28 px-6 sm:px-8 md:px-12 lg:px-16 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-5xl md:text-7xl font-black mb-4 dark:text-white text-zinc-900">
                            アニメ
                        </h1>
                        <p className="text-lg mb-2">
                            <span className="dark:text-zinc-400 text-zinc-600">My </span>
                            <span className="text-[#EC4899] font-semibold">ANIME</span>
                            <span className="dark:text-zinc-400 text-zinc-600"> COLLECTION</span>
                        </p>
                        <p className="text-sm dark:text-zinc-500 text-zinc-500 max-w-lg mx-auto">
                            A curated collection of my favorite anime series. Every show, every emotion, every protagonist.
                        </p>
                    </div>

                    <AnimeMalStats />
                </div>
            </section>

            <CurrentlyWatchingSection />

            <TypewriterQuote />

            <HallOfFame />

            <CharacterShowcase />

            <OPPlaylist />

            <CompletedAnimeSection />

            {/* Footer */}
            <footer className="px-6 py-12 border-t dark:border-[#33E092]/10 border-zinc-300 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link href="/hobbies" className="dark:text-zinc-400 text-zinc-600 hover:text-zinc-900 dark:hover:text-[#33E092] transition-colors">
                        ← Back to Hobbies
                    </Link>

                    <div className="flex items-center gap-6">
                        <a href="https://myanimelist.net" target="_blank" rel="noopener noreferrer"
                            className="dark:text-zinc-400 text-zinc-600 hover:text-[#2E51A2] transition-colors">
                            <SiMyanimelist className="w-10 h-10" />
                        </a>
                        <a href="https://crunchyroll.com" target="_blank" rel="noopener noreferrer"
                            className="dark:text-zinc-400 text-zinc-600 hover:text-[#F47521] transition-colors">
                            <SiCrunchyroll className="w-8 h-8" />
                        </a>
                    </div>

                    <div className="dark:text-zinc-400 text-zinc-600 text-sm flex items-center gap-2">
                        <span className="text-[#33E092] text-lg">お</span>たく is not a crime
                        <span className="text-[#33E092]">🎌</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
