"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Award, GraduationCap, Calendar, Layers, FileText } from "lucide-react"

// Education metrics
const metrics = [
    { label: "Years", value: "4+", icon: Calendar },
    { label: "Semesters", value: "8", icon: Layers },
    { label: "Domains", value: "5+", icon: BookOpen },
    { label: "Certifications", value: "10+", icon: Award },
]

export default function EduPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <main className="min-h-screen max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">

            {/* HERO — Education at a Glance */}
            <header className={`mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Education</span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <h1 className="text-4xl md:text-5xl font-serif dark:text-white text-zinc-900 mb-4 leading-tight">
                    The Architecture of Learning
                </h1>

                <p className="text-lg dark:text-zinc-400 text-zinc-600 max-w-2xl leading-relaxed mb-10">
                    A systematic journey through formal academics and continuous learning —
                    from classroom foundations to self-directed specialization.
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon
                        return (
                            <div
                                key={metric.label}
                                className={`group p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:border-zinc-400 dark:hover:border-zinc-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${100 + i * 50}ms` }}
                            >
                                <Icon size={18} className="mb-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                                <div className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">{metric.value}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">{metric.label}</div>
                            </div>
                        )
                    })}
                </div>
            </header>

            {/* DUAL-PILLAR PREVIEW SYSTEM */}
            <section className={`mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Explore</span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Pillar A: The Story of My Education */}
                    <Link
                        href="/edu/schooling"
                        className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                        {/* Corner decoration */}
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 opacity-50">01</div>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <GraduationCap size={20} className="text-zinc-500" />
                        </div>

                        <h3 className="text-xl font-serif dark:text-white text-zinc-900 mb-2">
                            The Story of My Education
                        </h3>

                        <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-6 leading-relaxed">
                            A narrative journey through formal academics — from primary foundations
                            to engineering curriculum. Chapter-style exploration of each phase.
                        </p>

                        {/* Abstract preview */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((n) => (
                                    <div
                                        key={n}
                                        className="w-8 h-8 rounded-full border-2 border-[#d5d5da] dark:border-zinc-900 bg-[#d5d5da] dark:bg-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-500"
                                    >
                                        {n}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-zinc-400">4 Chapters</span>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-sm font-medium dark:text-zinc-300 text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <span>Read the story</span>
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </Link>

                    {/* Pillar B: Learning & Credentials */}
                    <Link
                        href="/edu/courses"
                        className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                        {/* Corner decoration */}
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 opacity-50">02</div>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <Award size={20} className="text-zinc-500" />
                        </div>

                        <h3 className="text-xl font-serif dark:text-white text-zinc-900 mb-2">
                            Learning & Credentials
                        </h3>

                        <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-6 leading-relaxed">
                            Verified certifications and structured courses — from platforms like Coursera,
                            NPTEL, and beyond. Proof of continuous learning.
                        </p>

                        {/* Abstract preview */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex gap-1.5">
                                {['AI/ML', 'Web', 'Data'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 text-zinc-500 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-sm font-medium dark:text-zinc-300 text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <span>View credentials</span>
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </Link>

                </div>
            </section>

            {/* ORIENTATION LAYER — How to Read My Education */}
            <section className={`mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Orientation</span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-start gap-4 mb-6">
                        <FileText size={20} className="text-zinc-400 mt-1" />
                        <div>
                            <h3 className="text-lg font-medium dark:text-white text-zinc-900 mb-2">
                                How to Read My Education
                            </h3>
                            <p className="text-sm dark:text-zinc-500 text-zinc-500 leading-relaxed">
                                My education is structured across two parallel tracks that complement each other:
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="space-y-2">
                            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Formal Academics</div>
                            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                                Structured degree program with semester-based progression. Foundation in CS fundamentals,
                                systems, and AI specialization.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Certifications</div>
                            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                                Self-directed learning through verified platforms. Focused specializations
                                in AI/ML, web development, and data science.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Domain Capability</div>
                            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                                The intersection of both tracks — translating academic knowledge and
                                certifications into practical, employable skills.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER NAVIGATION */}
            <footer className={`pt-12 border-t border-zinc-200 dark:border-zinc-800 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <p className="text-sm dark:text-zinc-400 text-zinc-600">
                            Currently pursuing B.E. Computer Science (AI) at MIT Mysore
                        </p>
                        <p className="text-xs text-zinc-400">
                            Expected graduation: 2026
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/edu/engineering"
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            <span>View full curriculum</span>
                            <ArrowUpRight size={12} />
                        </Link>
                        <Link
                            href="/"
                            className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </footer>

        </main>
    )
}
