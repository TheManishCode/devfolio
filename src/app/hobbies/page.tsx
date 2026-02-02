"use client"

import Link from "next/link"

export default function HobbiesPage() {
    return (
        <main className="min-h-screen max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16 relative">

            {/* Background Blurs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-32 right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-10 w-80 h-80 bg-[#33E092]/5 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="mb-16 max-w-3xl">
                <span className="text-[#33E092] text-xs font-bold tracking-[0.25em] uppercase">Beyond Code</span>
                <h1 className="mt-4 font-serif text-4xl md:text-5xl italic dark:text-white text-zinc-900">
                    Hobbies & Thinking Spaces
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed dark:text-zinc-400 text-zinc-600">
                    A curated look into how stories, strategy, and systems outside of programming influence how I think, design, and build as an engineer.
                </p>
            </header>

            {/* Dashboard Cards */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Anime Card */}
                <div className="group relative rounded-2xl border dark:border-zinc-800 border-zinc-200 p-8 overflow-hidden bg-transparent">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <span className="text-purple-400 text-xs font-semibold tracking-widest uppercase">Anime</span>
                        <h2 className="mt-3 text-2xl font-semibold dark:text-white text-zinc-900">
                            Narrative & World Systems
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                            Exploring character psychology, world-building, symbolism, and long-form storytelling through modern and classic anime.
                        </p>

                        <ul className="mt-6 space-y-2 text-sm dark:text-zinc-400 text-zinc-600">
                            <li>• Narrative pattern recognition</li>
                            <li>• Character arcs → user journey thinking</li>
                            <li>• Complex worlds → system design mindset</li>
                            <li>• Cultural & creative exploration</li>
                        </ul>

                        <Link
                            href="/hobbies/anime"
                            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-purple-400 hover:underline"
                        >
                            Explore Anime Dashboard
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Games Card */}
                <div className="group relative rounded-2xl border dark:border-zinc-800 border-zinc-200 p-8 overflow-hidden bg-transparent">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#33E092]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <span className="text-[#33E092] text-xs font-semibold tracking-widest uppercase">Games</span>
                        <h2 className="mt-3 text-2xl font-semibold dark:text-white text-zinc-900">
                            Strategy & Interactive Systems
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                            Games sharpen my understanding of real-time decision making, feedback loops, optimization, and competitive systems.
                        </p>

                        <ul className="mt-6 space-y-2 text-sm dark:text-zinc-400 text-zinc-600">
                            <li>• Strategic planning & adaptability</li>
                            <li>• Resource management & optimization</li>
                            <li>• Fast decision-making under pressure</li>
                            <li>• Multiplayer teamwork & coordination</li>
                        </ul>

                        <Link
                            href="/hobbies/games"
                            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-[#33E092] hover:underline"
                        >
                            Explore Games Dashboard
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Insight Section */}
            <section className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Systems Thinking", desc: "Understanding interconnected components and long-term impact." },
                    { title: "Pattern Recognition", desc: "Spotting recurring structures across stories, games, and code." },
                    { title: "Creative Problem Solving", desc: "Approaching challenges from narrative and strategic angles." },
                    { title: "User-Centric Design", desc: "Thinking deeply about experience, feedback, and engagement." },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="rounded-xl border dark:border-zinc-800 border-zinc-200 p-6 bg-transparent"
                    >
                        <h3 className="font-medium dark:text-white text-zinc-900">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </section>

            {/* Footer Nav */}
            <footer className="mt-24 pt-8 border-t dark:border-zinc-800/50 border-zinc-200">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-[#33E092] transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </footer>
        </main>
    )
}
