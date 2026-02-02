"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Wrench, BarChart3, Code2, Layers, Settings, Terminal } from "lucide-react"

// Studio metrics
const metrics = [
    { label: "Tools", value: "20+", icon: Wrench },
    { label: "Languages", value: "8+", icon: Code2 },
    { label: "Years Coding", value: "5+", icon: Terminal },
    { label: "Active Setups", value: "3", icon: Settings },
]

export default function StudioPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <main className="min-h-screen max-w-7xl mx-auto pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">

            {/* HERO */}
            <header className={`mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Studio</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif dark:text-white text-zinc-900 mb-4 leading-tight">
                    The Workshop
                </h1>

                <p className="text-lg dark:text-zinc-400 text-zinc-600 max-w-2xl leading-relaxed mb-10">
                    A look inside my digital workspace — the tools I use, the metrics I track,
                    and the technical decisions behind this site.
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

            {/* DASHBOARD PREVIEW */}
            <section className={`mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Toolkit Card - No visual preview, just text */}
                    <Link
                        href="/studio/toolkit"
                        className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 opacity-50">01</div>

                        <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <Wrench size={20} className="text-zinc-500" />
                        </div>

                        <h3 className="text-xl font-serif dark:text-white text-zinc-900 mb-2">
                            Toolkit
                        </h3>

                        <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-6 leading-relaxed">
                            The tools, software, and hardware powering my workflow.
                        </p>

                        <div className="flex items-center gap-2 text-sm font-medium dark:text-zinc-300 text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <span>View toolkit</span>
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </Link>

                    {/* Metrics Card - With bar chart visual */}
                    <Link
                        href="/studio/metrics"
                        className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 opacity-50">02</div>

                        <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <BarChart3 size={20} className="text-zinc-500" />
                        </div>

                        <h3 className="text-xl font-serif dark:text-white text-zinc-900 mb-2">
                            Metrics
                        </h3>

                        <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-6 leading-relaxed">
                            GitHub activity, coding stats, and development analytics.
                        </p>

                        {/* Visual: Bar chart */}
                        <div className="flex items-end gap-2 h-16 mb-6">
                            {[40, 70, 55, 85, 60, 75, 50].map((h, j) => (
                                <div
                                    key={j}
                                    className="flex-1 rounded-t-sm bg-gradient-to-t from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 transition-all group-hover:from-green-400/50 group-hover:to-green-300/30"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium dark:text-zinc-300 text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <span>View metrics</span>
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </Link>

                    {/* Colophon Card - With stack layers visual */}
                    <Link
                        href="/studio/colophon"
                        className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 opacity-50">03</div>

                        <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <Layers size={20} className="text-zinc-500" />
                        </div>

                        <h3 className="text-xl font-serif dark:text-white text-zinc-900 mb-2">
                            Colophon
                        </h3>

                        <p className="text-sm dark:text-zinc-500 text-zinc-500 mb-6 leading-relaxed">
                            The technical stack and architecture behind this site.
                        </p>

                        {/* Visual: Stack layers */}
                        <div className="flex flex-col gap-1.5 mb-6">
                            {[
                                { label: 'Next.js', width: 'w-full' },
                                { label: 'React', width: 'w-4/5' },
                                { label: 'Tailwind', width: 'w-3/5' },
                            ].map((layer, j) => (
                                <div key={j} className={`${layer.width} h-6 rounded bg-[#d5d5da] dark:bg-zinc-800 flex items-center px-3`}>
                                    <span className="text-[10px] font-mono text-zinc-500">{layer.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium dark:text-zinc-300 text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <span>View colophon</span>
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </Link>

                </div>
            </section>

            {/* ORIENTATION LAYER */}
            <section className={`mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-start gap-4 mb-6">
                        <Terminal size={20} className="text-zinc-400 mt-1" />
                        <div>
                            <h3 className="text-lg font-medium dark:text-white text-zinc-900 mb-2">
                                How Studio is Organized
                            </h3>
                            <p className="text-sm dark:text-zinc-500 text-zinc-500 leading-relaxed">
                                The Studio is structured around three pillars of my development environment.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="space-y-2">
                            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Toolkit</div>
                            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                                The software and hardware I use daily — from code editors to productivity apps.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Metrics</div>
                            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                                Live data about my coding activity — GitHub stats, language usage, and productivity.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Colophon</div>
                            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                                Technical documentation for this website — framework choices and design system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className={`pt-12 border-t border-zinc-200 dark:border-zinc-800 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <p className="text-sm dark:text-zinc-400 text-zinc-600">
                        Constantly evolving setup optimized for productivity
                    </p>

                    <Link
                        href="/"
                        className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        ← Back to home
                    </Link>
                </div>
            </footer>

        </main>
    )
}
