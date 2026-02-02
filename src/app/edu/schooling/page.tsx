/**
 * =============================================================================
 * SCHOOLING PAGE - Novel Design (Compact Layout)
 * =============================================================================
 */

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const chapters = [
    {
        number: 4,
        title: "Maharaja Institute of Tech, Mysore",
        subtitle: "B.E. Computer Science (Artificial Intelligence)",
        period: "2022 - 2026",
        grades: "Bachelor's Degree",
        location: "Mysore, Karnataka",
        content: "This is my current chapter — and honestly, the most exciting one so far. I’m exploring the core of Computer Science while going deeper into AI. From algorithms and data structures to software engineering, I’m learning how to build things that actually work in the real world (and solving problems along the way).",
        current: true,
    },
    {
        number: 3,
        title: "St. Joseph's Pre-University College",
        subtitle: "PUC - PCMCs Science Stream",
        period: "2020 - 2022",
        grades: "Grade 11-12",
        location: "Hunsur, Mysore",
        content: "This phase was the bridge between school life and engineering. Physics, Chemistry, Mathematics, and Computer Science shaped my thinking and gave me the strong base I still rely on today. It’s where I learned how to stay consistent and handle academic pressure with focus.",
        current: false,
    },
    {
        number: 2,
        title: "Adarsha Vidyalaya [R.M.S.A]",
        subtitle: "Secondary Education",
        period: "2016 - 2020",
        grades: "Grade 6-10",
        location: "Hunsur, Mysore",
        content: "This is where my curiosity really started turning into confidence. I found myself enjoying science and math, learning fast, and slowly figuring out what I was good at. It was also the best part of school life — amazing friends, great memories, and the first time I started taking my future seriously.",
        current: false,
    },
    {
        number: 1,
        title: "Talent School [T.E.T]",
        subtitle: "Primary Education",
        period: "2010 - 2015",
        grades: "Grade 1-5",
        location: "Hunsur, Mysore",
        content: "The beginning of everything. These years shaped the basics — discipline, curiosity, and the habit of learning every day. Looking back, it’s the foundation stage that quietly built who I am today.",
        current: false,
    },
]

const stats = [
    { value: "12+", label: "Years", symbols: ["∑", "π", "∫"] },
    { value: "4", label: "Chapters", symbols: ["√", "∆", "∞"] },
    { value: "∞", label: "Ahead", symbols: ["λ", "θ", "Ω"] },
]

export default function SchoolingPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-20 right-[20%] w-[500px] h-[500px] bg-[#33E092]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <main className="max-w-7xl mx-auto px-6 lg:pt-20 pt-16 pb-20 relative z-10 sm:px-8 md:px-12 lg:px-16">
                {/* Header */}
                <header className={`mb-32 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-[#33E092]" />
                        <span className="text-xs uppercase tracking-[0.3em] dark:text-zinc-500 text-zinc-500">Chronicle</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif italic dark:text-white text-zinc-900 leading-tight mb-4">
                        The Story of My Education
                    </h1>

                    <p className="dark:text-zinc-500 text-zinc-500 max-w-lg mb-6">
                        A journey through four institutions of learning, growth, and discovery.
                    </p>

                    {/* Stats - enhanced boxes with floating math symbols */}
                    <div className="flex flex-wrap gap-3">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="relative px-6 py-4 border dark:border-zinc-700 border-zinc-300 rounded-xl overflow-hidden min-w-[100px] group hover:border-[#33E092] transition-colors"
                            >
                                {/* Floating math symbols - darker */}
                                {stat.symbols.map((sym, j) => (
                                    <span
                                        key={j}
                                        className="absolute font-serif select-none pointer-events-none dark:text-zinc-600 text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-[#33E092]/70 transition-colors"
                                        style={{
                                            fontSize: `${16 + j * 5}px`,
                                            left: `${8 + j * 25}%`,
                                            top: `${18 + j * 18}%`,
                                            animation: `float-symbol-${j} ${3 + j}s ease-in-out infinite`,
                                            animationDelay: `${i * 0.2 + j * 0.3}s`,
                                        }}
                                    >
                                        {sym}
                                    </span>
                                ))}

                                {/* Background watermark */}
                                <span className="absolute -top-2 -right-1 text-4xl font-serif dark:text-zinc-800 text-zinc-200 select-none">
                                    {stat.value}
                                </span>

                                {/* Content */}
                                <span className="relative text-2xl font-serif dark:text-white text-zinc-900 block">{stat.value}</span>
                                <span className="relative block text-[10px] uppercase tracking-[0.15em] dark:text-zinc-500 text-zinc-500 mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CSS for floating animation */}
                    <style jsx>{`
                        @keyframes float-symbol-0 {
                            0%, 100% { transform: translateY(0) rotate(0deg); }
                            50% { transform: translateY(-6px) rotate(5deg); }
                        }
                        @keyframes float-symbol-1 {
                            0%, 100% { transform: translateY(0) rotate(0deg); }
                            50% { transform: translateY(-10px) rotate(-3deg); }
                        }
                        @keyframes float-symbol-2 {
                            0%, 100% { transform: translateY(0) rotate(0deg); }
                            50% { transform: translateY(-4px) rotate(8deg); }
                        }
                    `}</style>
                </header>

                {/* Engineering Education Preview - Chapter Style */}
                <section className={`mb-16 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
                    <article>
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-5xl font-serif dark:text-zinc-800 text-zinc-200">★</span>
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.2em] dark:text-zinc-600 text-zinc-400 block">Featured</span>
                                        <span className="flex items-center gap-1.5 text-xs text-[#33E092] mt-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#33E092] animate-pulse" />
                                            In Progress
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif dark:text-white text-zinc-900 mb-2">Engineering Curriculum</h2>
                                <p className="text-[#33E092] mb-1">B.E. Computer Science (Artificial Intelligence)</p>
                                <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-4">8 Semesters • Visvesvaraya Technological University</p>
                                <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed italic">&ldquo;A deep dive into the engineering curriculum — from algorithms and systems to AI and security. Eight semesters of structured learning, building the foundation for real-world engineering.&rdquo;</p>
                                <span className="inline-block mt-4 font-mono text-xs px-3 py-1.5 dark:bg-zinc-800/50 bg-[#d5d5da] dark:text-zinc-400 text-zinc-600 rounded">2022 - 2026</span>
                                <div className="mt-4">
                                    <Link href="/edu/engineering" className="inline-flex items-center gap-2 text-sm text-[#33E092] hover:underline underline-offset-4">Explore Full Curriculum →</Link>
                                </div>
                            </div>
                            <div className="lg:w-80 w-full max-w-xs mx-auto lg:mx-0 relative flex-shrink-0">
                                <div className="aspect-square rounded-2xl overflow-hidden border dark:border-zinc-800 border-zinc-200">
                                    <div className="w-full h-full flex flex-col items-center justify-center dark:bg-zinc-900 bg-[#d5d5da] p-6">
                                        <span className="text-6xl font-serif dark:text-[#33E092]/60 text-[#33E092]/60 mb-2">∑</span>
                                        <span className="text-xs uppercase tracking-[0.15em] dark:text-zinc-500 text-zinc-500">8 Semesters</span>
                                        <span className="text-xs dark:text-zinc-600 text-zinc-400 mt-1">CS • AI/ML • Security</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-2 border-[#33E092] rounded-2xl -z-10" />
                                <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#33E092]/20 rounded-xl -z-10" />
                            </div>
                        </div>
                    </article>
                    <div className="flex items-center justify-center mt-10">
                        <div className="w-10 h-px dark:bg-zinc-800 bg-zinc-200" />
                        <span className="mx-3 text-sm dark:text-zinc-700 text-zinc-300">✦</span>
                        <div className="w-10 h-px dark:bg-zinc-800 bg-zinc-200" />
                    </div>
                </section>

                {/* Chapters - Compact */}
                <div className="space-y-12">
                    {chapters.map((chapter, index) => (
                        <article
                            key={chapter.number}
                            className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                        >
                            {/* Chapter content and image side by side */}
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                {/* Text content */}
                                <div className="flex-1">
                                    {/* Chapter number */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-5xl font-serif dark:text-zinc-800 text-zinc-200">
                                            {chapter.number}
                                        </span>
                                        <div>
                                            <span className="text-xs uppercase tracking-[0.2em] dark:text-zinc-600 text-zinc-400 block">
                                                Chapter
                                            </span>
                                            {chapter.current && (
                                                <span className="flex items-center gap-1.5 text-xs text-[#33E092] mt-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#33E092] animate-pulse" />
                                                    Writing
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl md:text-3xl font-serif dark:text-white text-zinc-900 mb-2">
                                        {chapter.title}
                                    </h2>

                                    <p className="text-[#33E092] mb-1">{chapter.subtitle}</p>
                                    <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-4">
                                        {chapter.grades} • {chapter.location}
                                    </p>

                                    {/* Content */}
                                    <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed italic">
                                        &ldquo;{chapter.content}&rdquo;
                                    </p>

                                    {/* Period */}
                                    <span className="inline-block mt-4 font-mono text-xs px-3 py-1.5 dark:bg-zinc-800/50 bg-[#d5d5da] dark:text-zinc-400 text-zinc-600 rounded">
                                        {chapter.period}
                                    </span>
                                </div>

                                {/* Image - story page styling (exact match) */}
                                <div className="lg:w-80 w-full max-w-xs mx-auto lg:mx-0 relative flex-shrink-0">
                                    <div className="aspect-square rounded-2xl overflow-hidden border dark:border-zinc-800 border-zinc-200">
                                        <div className="w-full h-full flex items-center justify-center dark:bg-zinc-900 bg-[#d5d5da]">
                                            <svg
                                                className="w-24 h-24 dark:text-purple-500/60 text-purple-400/60"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Corner decorations */}
                                    <div className="absolute -bottom-3 -right-3 w-20 h-20 border-2 border-[#33E092] rounded-2xl -z-10" />
                                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#33E092]/20 rounded-xl -z-10" />
                                </div>
                            </div>

                            {/* Divider */}
                            {index < chapters.length - 1 && (
                                <div className="flex items-center justify-center mt-10">
                                    <div className="w-10 h-px dark:bg-zinc-800 bg-zinc-200" />
                                    <span className="mx-3 text-sm dark:text-zinc-700 text-zinc-300">✦</span>
                                    <div className="w-10 h-px dark:bg-zinc-800 bg-zinc-200" />
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                {/* End */}
                <div className="text-center mt-12">
                    <span className="text-xs uppercase tracking-[0.4em] dark:text-zinc-600 text-zinc-400">
                        To Be Continued...
                    </span>
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t dark:border-zinc-800/50 border-zinc-200">
                    <blockquote className="text-center max-w-md mx-auto mb-8">
                        <p className="text-lg font-serif italic dark:text-zinc-400 text-zinc-600">
                            &ldquo;The beautiful thing about learning is that nobody can take it away from you.&rdquo;
                        </p>
                        <cite className="text-sm dark:text-zinc-500 text-zinc-500 mt-2 block not-italic">
                            — B.B. King
                        </cite>
                    </blockquote>

                    <nav className="flex items-center justify-between text-sm">
                        <Link
                            href="/edu"
                            className="dark:text-zinc-500 text-zinc-500 hover:text-zinc-900 dark:hover:text-[#33E092] transition-colors"
                        >
                            ← Back to Education
                        </Link>
                        <Link
                            href="/edu/courses"
                            className="px-5 py-2.5 rounded-xl bg-[#33E092] text-black text-sm font-medium hover:bg-[#2bc97f] transition-colors"
                        >
                            View Courses →
                        </Link>
                    </nav>
                </footer>
            </main>
        </div>
    )
}
