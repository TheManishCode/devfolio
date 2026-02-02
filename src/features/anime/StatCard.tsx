"use client"

import { useRef } from "react"

const STAT_DATA: Record<string, {
    attackName: string;
    attackDesc: string;
    weakness: string;
    resistance: string;
    kanji: string;
    pokemon: string;
    cry: string;
}> = {
    "COMPLETED": {
        attackName: "Binge Watch",
        attackDesc: "Complete an entire series in one sitting. Each title adds to your power level.",
        weakness: "Season Endings",
        resistance: "Filler Arcs",
        kanji: "完",
        pokemon: "https://projectpokemon.org/images/normal-sprite/pikachu.gif",
        cry: "/pokemon-sounds/pikachu.mp3"
    },
    "EPISODES": {
        attackName: "Marathon",
        attackDesc: "Watch episodes continuously. Time becomes meaningless when the plot is good.",
        weakness: "Cliffhangers",
        resistance: "Spoilers",
        kanji: "話",
        pokemon: "https://projectpokemon.org/images/normal-sprite/charizard.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/charizard.mp3"
    },
    "WATCH TIME": {
        attackName: "Time Dedication",
        attackDesc: "Days invested in anime worlds. Every hour is a journey through emotions.",
        weakness: "Real Life",
        resistance: "Sleep",
        kanji: "時",
        pokemon: "https://projectpokemon.org/images/normal-sprite/mew.gif",
        cry: "/pokemon-sounds/mewtwo.mp3"
    },
    "AVG SCORE": {
        attackName: "Critical Eye",
        attackDesc: "Judge anime with precision. Only the worthy receive high scores.",
        weakness: "Nostalgia",
        resistance: "Hype",
        kanji: "神",
        pokemon: "https://projectpokemon.org/images/normal-sprite/lugia.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lugia.mp3"
    },
}

// Ensures only one Pokemon cry plays at a time
let currentPlayingAudio: HTMLAudioElement | null = null

interface StatCardProps {
    value: string | number
    label: string
    color: string
}

export function StatCard({ value, label }: StatCardProps) {
    const data = STAT_DATA[label] || STAT_DATA["COMPLETED"]
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const playCry = () => {
        if (audioRef.current && data.cry) {
            if (currentPlayingAudio && currentPlayingAudio !== audioRef.current) {
                currentPlayingAudio.pause()
                currentPlayingAudio.currentTime = 0
            }
            audioRef.current.currentTime = 0
            audioRef.current.volume = 0.3
            audioRef.current.play().catch(() => { })
            currentPlayingAudio = audioRef.current
        }
    }

    const isMewCard = label === "WATCH TIME"

    return (
        <div
            className="relative overflow-hidden border dark:border-zinc-800 border-zinc-200 rounded-md h-full flex flex-col cursor-pointer"
            onMouseEnter={playCry}
        >
            {data.cry && <audio ref={audioRef} src={data.cry} preload="auto" />}

            <div className="px-3 py-2 flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200">
                <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[8px] dark:text-zinc-600 text-zinc-400 font-bold uppercase shrink-0">Basic</span>
                    <span className="text-xs font-black dark:text-white text-zinc-900 uppercase tracking-tight truncate">{label}</span>
                </div>
                <div className="flex items-baseline gap-0.5 shrink-0">
                    <span className="text-[8px] dark:text-zinc-500 text-zinc-400 font-black">HP</span>
                    <span className="text-xl font-black dark:text-white text-zinc-900 italic">{value}</span>
                </div>
            </div>

            <div className="relative h-28 dark:bg-zinc-800/30 bg-[#d5d5da] flex items-center justify-center overflow-hidden">
                {isMewCard ? (
                    <div className="relative flex items-end justify-center h-full pb-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://projectpokemon.org/images/normal-sprite/mew.gif"
                            alt="Mew"
                            loading="eager"
                            className="h-14 w-14 object-contain drop-shadow-lg absolute z-10"
                            style={{
                                right: 'calc(50% - 45px)',
                                top: '8px',
                                animation: 'tagTeamFloat 2.5s ease-in-out infinite'
                            }}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://projectpokemon.org/images/normal-sprite/mewtwo.gif"
                            alt="Mewtwo"
                            loading="eager"
                            className="h-24 w-24 object-contain drop-shadow-xl z-20"
                            style={{
                                animation: 'tagTeamFloat 2.5s ease-in-out infinite 0.1s'
                            }}
                        />
                        <style>{`
                            @keyframes tagTeamFloat {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-3px); }
                            }
                        `}</style>
                    </div>
                ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={data.pokemon}
                        alt={label}
                        loading="eager"
                        className="h-24 w-24 object-contain drop-shadow-lg"
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[90px] font-black dark:text-white/[0.05] text-zinc-900/[0.05] select-none leading-none">
                        {data.kanji}
                    </span>
                </div>
                <div className="absolute inset-1.5 border dark:border-zinc-700/30 border-zinc-300/50 rounded pointer-events-none" />
            </div>

            <div className="p-3 flex-1">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-black dark:text-white text-zinc-900 italic">
                        {data.attackName}
                    </span>
                    <span className="text-lg font-black dark:text-white text-zinc-900 italic tabular-nums">
                        {typeof value === 'number' ? value * 10 : 100}
                    </span>
                </div>
                <p className="text-[9px] dark:text-zinc-500 text-zinc-500 leading-snug">
                    {data.attackDesc}
                </p>
            </div>

            <div className="px-3 py-2 border-t dark:border-zinc-800 border-zinc-200">
                <div className="flex items-center justify-between text-[8px]">
                    <div className="flex items-center gap-1">
                        <span className="dark:text-zinc-600 text-zinc-400 font-black uppercase">weakness</span>
                        <span className="dark:text-zinc-500 text-zinc-500 truncate">{data.weakness}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="dark:text-zinc-600 text-zinc-400 font-black uppercase">resist</span>
                        <span className="dark:text-zinc-500 text-zinc-500 truncate">{data.resistance}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
