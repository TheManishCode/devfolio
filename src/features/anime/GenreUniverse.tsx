"use client"

import { useState } from "react"
import { FaFire, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"

const GENRE_DATA = [
    { name: "Action", count: 45, color: "#EF4444", icon: "⚔️", image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg" },
    { name: "Romance", count: 38, color: "#33E092", icon: "💕", image: "https://cdn.myanimelist.net/images/anime/1792/95351.jpg" },
    { name: "Fantasy", count: 42, color: "#8B5CF6", icon: "🔮", image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg" },
    { name: "Psychological", count: 28, color: "#6366F1", icon: "🧠", image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg" },
    { name: "Slice of Life", count: 32, color: "#10B981", icon: "☕", image: "https://cdn.myanimelist.net/images/anime/1925/138899.jpg" },
    { name: "Thriller", count: 25, color: "#F59E0B", icon: "🎭", image: "https://cdn.myanimelist.net/images/anime/5/50331.jpg" },
    { name: "Sports", count: 18, color: "#06B6D4", icon: "🏀", image: "https://cdn.myanimelist.net/images/anime/7/76014.jpg" },
    { name: "Mecha", count: 15, color: "#84CC16", icon: "🤖", image: "https://cdn.myanimelist.net/images/anime/1314/108941.jpg" },
]

function GenreCard({ genre, isActive }: { genre: typeof GENRE_DATA[0]; isActive: boolean }) {
    const [imgError, setImgError] = useState(false)

    return (
        <div className={`relative h-[400px] rounded-md overflow-hidden transition-all duration-500 border dark:border-zinc-800 border-zinc-200 ${isActive ? "scale-100" : "scale-90 opacity-70"}`}>
            <img
                src={imgError ? `https://placehold.co/400x600/${genre.color.slice(1)}/fff?text=${genre.icon}` : genre.image}
                alt={genre.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgError(true)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

            <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-30" : "opacity-0"}`}
                style={{ background: `radial-gradient(circle at 50% 100%, ${genre.color}50, transparent 70%)` }} />

            <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${genre.color}, transparent)` }} />

            <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                <div className="text-6xl mb-4 drop-shadow-lg"
                    style={{ filter: isActive ? `drop-shadow(0 0 20px ${genre.color})` : "none" }}>
                    {genre.icon}
                </div>

                <h3 className="text-3xl font-black mb-2 tracking-wide"
                    style={{ color: isActive ? genre.color : "#fff", textShadow: isActive ? `0 0 30px ${genre.color}` : "none" }}>
                    {genre.name}
                </h3>

                <div className="px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm border"
                    style={{ backgroundColor: `${genre.color}20`, borderColor: `${genre.color}50`, color: genre.color }}>
                    {genre.count} 作品
                </div>

                <div className="w-full max-w-[200px] h-2 bg-zinc-800/50 rounded-full mt-4 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                        style={{
                            width: isActive ? `${(genre.count / 50) * 100}%` : "0%",
                            background: `linear-gradient(90deg, ${genre.color}, ${genre.color}88)`
                        }} />
                </div>
            </div>

            <div className="absolute top-4 left-4 w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: genre.color }} />
                <div className="absolute top-0 left-0 w-0.5 h-full" style={{ backgroundColor: genre.color }} />
            </div>
            <div className="absolute top-4 right-4 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-0.5" style={{ backgroundColor: genre.color }} />
                <div className="absolute top-0 right-0 w-0.5 h-full" style={{ backgroundColor: genre.color }} />
            </div>
        </div>
    )
}

export function GenreUniverse() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="py-20 relative z-10 overflow-hidden">
            <div className="absolute inset-0 transition-all duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${GENRE_DATA[activeIndex].color}10, transparent 70%)` }} />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
                    <h2 className="text-4xl font-black text-center dark:text-white text-zinc-900">
                        GENRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33E092] to-purple-400">UNIVERSE</span>
                    </h2>
                    <FaFire className="w-6 h-6 text-orange-500 animate-pulse" />
                </div>

                <div className="relative">
                    <Swiper
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        coverflowEffect={{ rotate: 0, stretch: 0, depth: 200, modifier: 2, slideShadows: false }}
                        navigation={{ nextEl: ".genre-next", prevEl: ".genre-prev" }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="!overflow-visible py-10"
                    >
                        {GENRE_DATA.map((genre, i) => (
                            <SwiperSlide key={genre.name} className="!w-[300px] md:!w-[350px]">
                                <GenreCard genre={genre} isActive={activeIndex === i} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="genre-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border dark:border-zinc-800 border-zinc-200 rounded-md text-[#33E092]">
                        <FaChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="genre-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border dark:border-zinc-800 border-zinc-200 rounded-md text-[#33E092]">
                        <FaChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8">
                    {GENRE_DATA.map((genre, i) => (
                        <div key={genre.name}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? "scale-125" : "scale-100 opacity-40"}`}
                            style={{ backgroundColor: genre.color }} />
                    ))}
                </div>
            </div>
        </section>
    )
}
