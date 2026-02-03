"use client"

import { useState } from "react"
import { FaStar, FaSpotify, FaYoutube } from "react-icons/fa"
import { SiMyanimelist } from "react-icons/si"
import { FAVORITE_ANIME } from "@/data/anime"

interface AnimeCardProps {
    anime: typeof FAVORITE_ANIME[0]
    rank: number
}

export function AnimeCard({ anime, rank }: AnimeCardProps) {
    const [imageError, setImageError] = useState(false)

    const imageSrc = imageError
        ? `https://placehold.co/400x600/1a1a1a/33E092?text=${encodeURIComponent(anime.title.split(':')[0])}`
        : anime.image

    return (
        <div
            className="relative rounded-md overflow-hidden border dark:border-zinc-800 border-zinc-200"
            style={{ aspectRatio: "3/4" }}
        >
            <img
                src={imageSrc}
                alt={anime.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImageError(true)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-3 border-2 border-white/10 pointer-events-none" />

            <div className="absolute top-4 left-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#33E092] to-emerald-600 rounded-xl blur-sm" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-[#33E092] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
                        <span className="text-white text-lg font-black transform rotate-3">#{rank}</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
                {anime.status === "Completed" && (
                    <div className="px-2 py-1 bg-green-500/90 text-white text-xs font-bold rounded transform rotate-2">✓ 完了</div>
                )}
                <div className="flex items-center gap-1 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg border border-yellow-500/50">
                    <FaStar className="w-3 h-3 text-yellow-400" />
                    <span className="text-white text-sm font-bold">{anime.rating}</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="px-2 py-0.5 bg-[#33E092]/90 text-white font-bold rounded">{anime.year}</span>
                    <span className="text-zinc-400">{anime.studio}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 leading-tight">{anime.title}</h3>
                {anime.title_jp && (
                    <p className="text-[#33E092]/80 text-sm mb-3 font-medium">{anime.title_jp}</p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {anime.genres.slice(0, 3).map(g => (
                        <span key={g} className="px-2 py-0.5 text-xs bg-white/10 text-white/80 rounded-full border border-white/20">{g}</span>
                    ))}
                </div>

                <div className="flex gap-2">
                    {anime.ost?.spotifyUrl && (
                        <a href={anime.ost.spotifyUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-[#1DB954] rounded-lg text-white text-xs font-bold"
                            onClick={e => e.stopPropagation()}>
                            <FaSpotify className="w-4 h-4" /> OP
                        </a>
                    )}
                    {anime.ost?.youtubeUrl && (
                        <a href={anime.ost.youtubeUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-red-600 rounded-lg text-white text-xs font-bold"
                            onClick={e => e.stopPropagation()}>
                            <FaYoutube className="w-4 h-4" /> Watch
                        </a>
                    )}
                    {anime.malUrl && (
                        <a href={anime.malUrl} target="_blank" rel="noopener noreferrer"
                            aria-label="View on MyAnimeList"
                            className="flex items-center justify-center w-10 h-9 bg-[#2E51A2] rounded-lg"
                            onClick={e => e.stopPropagation()}>
                            <SiMyanimelist className="w-5 h-5 text-white" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
