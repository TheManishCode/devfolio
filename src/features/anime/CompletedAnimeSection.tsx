'use client';

import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';

interface AnimeItem {
    id: number;
    title: string;
    title_jp?: string;
    image: string;
    rating: number;
    status: string;
    genres: string[];
    year: number;
    studio: string;
    episodes: number;
    episodesWatched: number;
    malUrl: string;
}

interface CompletedAnimeSectionProps {
    initialData?: AnimeItem[];
}

function AnimeScrollCard({ anime }: { anime: AnimeItem }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="flex-shrink-0 w-[160px] md:w-[180px] group">
            <a
                href={anime.malUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900 hover:border-[#33E092]/50 transition-all duration-300"
                style={{ aspectRatio: '3/4' }}
            >
                {/* Image */}
                <img
                    src={imgError ? `https://placehold.co/300x400/1a1a1a/33E092?text=${encodeURIComponent(anime.title.slice(0, 10))}` : anime.image}
                    alt={anime.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setImgError(true)}
                    loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-[#33E092]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Rating badge */}
                {anime.rating > 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg border border-yellow-500/30">
                        <FaStar className="w-3 h-3 text-yellow-400" />
                        <span className="text-white text-xs font-bold">{anime.rating}</span>
                    </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-2 text-[10px] mb-1">
                        <span className="px-1.5 py-0.5 bg-[#33E092]/90 text-white font-bold rounded">{anime.year || '?'}</span>
                        <span className="text-zinc-400 truncate">{anime.studio}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-tight line-clamp-2 mb-1 group-hover:text-[#33E092] transition-colors">
                        {anime.title}
                    </h4>
                    {anime.title_jp && (
                        <p className="text-[10px] text-[#33E092]/70 truncate">{anime.title_jp}</p>
                    )}
                </div>

                {/* Hover overlay with MAL link */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#2E51A2] rounded-lg text-white text-xs font-medium transform scale-90 group-hover:scale-100 transition-transform">
                        <SiMyanimelist className="w-5 h-5" />
                        View on MAL
                    </div>
                </div>
            </a>
        </div>
    );
}

export default function CompletedAnimeSection({ initialData }: CompletedAnimeSectionProps) {
    const [animeList, setAnimeList] = useState<AnimeItem[]>(initialData || []);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!initialData) {
            fetch('/api/mal?type=completed')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setAnimeList(data);
                    } else {
                        setError(data.error || 'Failed to load');
                    }
                })
                .catch(() => setError('Failed to fetch anime'))
                .finally(() => setLoading(false));
        }
    }, [initialData]);

    if (loading) {
        return (
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="flex items-center gap-3 text-zinc-400">
                            <div className="w-6 h-6 border-2 border-[#33E092] border-t-transparent rounded-full animate-spin" />
                            <span>Loading anime collection...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || animeList.length === 0) {
        return (
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-10 bg-gradient-to-b from-[#33E092] to-emerald-600 rounded-full" />
                        <div>
                            <h2 className="text-3xl font-bold dark:text-white text-zinc-900">全完了アニメ</h2>
                            <p className="text-sm dark:text-zinc-500 text-zinc-600">All Completed Anime</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 border dark:border-zinc-800 border-zinc-200 rounded-lg">
                        <div className="text-center">
                            <p className="text-zinc-400 mb-2">{error || 'No anime data available'}</p>
                            <p className="text-xs text-zinc-500">Check MAL API credentials in .env.local</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Triple the list for seamless infinite scroll
    const tripleList = [...animeList, ...animeList, ...animeList];

    return (
        <section className="py-20 relative z-10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#33E092]/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-8">
                {/* Header - keeping original design */}
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-[#33E092] to-emerald-600 rounded-full" />
                    <div>
                        <h2 className="text-3xl font-bold dark:text-white text-zinc-900">全完了アニメ</h2>
                        <p className="text-sm dark:text-zinc-500 text-zinc-600">All Completed Anime</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-[#33E092]/10 border border-[#33E092]/30 rounded-full">
                        <span className="text-[#33E092] font-bold text-sm">{animeList.length}</span>
                        <span className="text-zinc-400 text-xs">titles</span>
                    </div>
                </div>
                <p className="text-xs dark:text-zinc-600 text-zinc-500 ml-6 pl-4">
                    Hover to pause • Data from MyAnimeList
                </p>
            </div>

            {/* Infinite scroll marquee */}
            <div
                className="relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >


                {/* Auto-scrolling container */}
                <div
                    className="flex gap-4 px-6 animate-scroll"
                    style={{
                        animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                >
                    {tripleList.map((anime, index) => (
                        <AnimeScrollCard key={`${anime.id}-${index}`} anime={anime} />
                    ))}
                </div>
            </div>

            {/* CSS for infinite scroll animation */}
            <style jsx>{`
                @keyframes scrollMarquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-33.333%));
                    }
                }
                .animate-scroll {
                    animation: scrollMarquee 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </section>
    );
}
