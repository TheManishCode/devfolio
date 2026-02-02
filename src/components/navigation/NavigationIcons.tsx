"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import { NowPlayingSong } from "@/types"
import {
    BiUser,
    BiPen,
    BiBookBookmark,
    BiJoystick,
    BiCodeBlock,
    BiPalette
} from "react-icons/bi"
import { SiSpotify } from "react-icons/si"


const navLinks = [
    { label: "Myself", href: "/myself", icon: BiUser },
    { label: "Studio", href: "/studio", icon: BiPalette },
    { label: "Workspace", href: "/workspace", icon: BiCodeBlock },
    { label: "Ink", href: "/ink", icon: BiPen },
    { label: "Edu", href: "/edu", icon: BiBookBookmark },
    { label: "Hobbies", href: "/hobbies", icon: BiJoystick },
]


function useSpotifyNowPlaying() {
    const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher, {
        refreshInterval: 2000, // Refresh every 2 seconds for near-instant updates
        revalidateOnFocus: true,
        dedupingInterval: 0, // Allow immediate re-fetches
    })

    // Only show song info if actively playing, otherwise show "Not Playing"
    if (!data || !data.isPlaying) {
        return {
            title: "Not Playing",
            artist: "Spotify",
            isPlaying: false,
            albumImageUrl: null,
            songUrl: null,
        }
    }

    return {
        title: data.title || "Not Playing",
        artist: data.artist || "Spotify",
        isPlaying: data.isPlaying,
        albumImageUrl: data.albumImageUrl,
        songUrl: data.songUrl,
    }
}


function useWeather() {
    const [weather, setWeather] = useState<{ temp: number; city: string } | null>(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY
                const city = process.env.NEXT_PUBLIC_WEATHERAPI_CITY || "YourCity"

                if (!apiKey || apiKey === "your_weatherapi_key_here") {
                    setWeather({ temp: 22, city: "Mysore" }) // Default placeholder
                    return
                }

                const res = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
                )

                if (res.ok) {
                    const data = await res.json()
                    setWeather({
                        temp: Math.round(data.current.temp_c),
                        city: data.location.name,
                    })
                } else {
                    setWeather({ temp: 22, city: "Mysore" })
                }
            } catch (error) {
                console.error("Weather fetch error:", error)
                setWeather({ temp: 22, city: "Mysore" })
            }
        }

        fetchWeather()
    }, [])

    return weather
}

export function NavigationIcons() {
    const song = useSpotifyNowPlaying()
    const weather = useWeather()

    return (
        <section className="mt-20 mb-8 border-t dark:border-gray-800 border-gray-200 pt-8">

            <div className="flex items-center justify-between mb-8">

                <div className="flex items-center gap-3">
                    <SiSpotify className="w-6 h-6 text-[#1DB954]" />
                    <div>
                        <p className="font-medium dark:text-white text-gray-900 text-sm">
                            {song?.title || "Not Playing"}
                        </p>
                        <p className="text-xs dark:text-gray-500 text-gray-500">
                            {song?.artist || "Spotify"}
                        </p>
                    </div>
                </div>


                <div className="px-3 py-1.5 rounded-md border dark:border-gray-700 border-gray-400 dark:bg-neutral-900 bg-[#d5d5da]">
                    <span className="text-sm font-medium dark:text-white text-gray-900">
                        {weather ? `${weather.temp}°C` : "..."}
                    </span>
                </div>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4">
                {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center gap-2 dark:text-gray-400 text-gray-600 hover:text-[#38A662] dark:hover:text-[#38A662] transition-colors text-sm"
                        >
                            <Icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default NavigationIcons
