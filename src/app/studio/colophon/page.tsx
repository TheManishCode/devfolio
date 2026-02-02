"use client";

import Link from "next/link";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiVercel,
    SiGithub,
    SiSwiper,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import {
    ArrowUpRight,
    Layers,
    Palette,
    Type,
    Coffee,
    Heart,
    Terminal,
    Cpu,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/Typography";

export default function ColophonPage() {
    const techStack = [
        { icon: <SiNextdotjs size={28} />, name: "Next.js 16", color: "dark:text-white text-zinc-900" },
        { icon: <SiReact size={28} />, name: "React 19", color: "text-[#61DAFB]" },
        { icon: <SiTypescript size={28} />, name: "TypeScript 5", color: "text-[#3178C6]" },
        { icon: <SiTailwindcss size={28} />, name: "Tailwind v4", color: "text-[#06B6D4]" },
        { icon: <TbBrandFramerMotion size={28} />, name: "Lenis", color: "dark:text-white text-zinc-900" },
        { icon: <SiSwiper size={28} />, name: "Swiper", color: "text-[#6332F6]" },
        { icon: <SiVercel size={28} />, name: "Vercel Edge", color: "dark:text-white text-zinc-900" },
        { icon: <SiGithub size={28} />, name: "GitHub", color: "dark:text-white text-zinc-900" },
    ];

    const colors = [
        { hex: "#33E092", name: "Primary", desc: "Accent & CTAs" },
        { hex: "#18181b", name: "Dark", desc: "Backgrounds" },
        { hex: "#fafafa", name: "Light", desc: "Surfaces" },
        { hex: "#71717a", name: "Muted", desc: "Secondary" },
    ];

    return (
        <article className="mx-auto max-w-7xl pt-20 lg:pt-28 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">

            {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
            <header className="mb-20 md:mb-32">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border dark:border-zinc-800 border-zinc-200 mb-8">
                    <Terminal size={12} className="text-[#33E092]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest dark:text-zinc-400 text-zinc-500">
                        System Documentation
                    </span>
                </div>

                <h1 className="font-incognito text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8 dark:text-white text-zinc-950">
                    Colophon<span className="text-[#33E092]">.</span>
                </h1>

                <p className="text-lg md:text-xl dark:text-zinc-400 text-zinc-600 max-w-xl leading-relaxed">
                    The technical blueprint behind this portfolio — architecture,
                    design system, and engineering philosophy.
                </p>
            </header>

            {/* ═══════════════════════════════════════════════════════════════════════
          INTRO STATEMENT
      ═══════════════════════════════════════════════════════════════════════ */}
            <section className="mb-20 md:mb-32">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-5">
                        <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-zinc-900 leading-snug mb-4">
                            Built with <span className="text-[#33E092]">intention</span>.
                        </h2>
                        <p className="dark:text-zinc-500 text-zinc-500 text-sm">
                            Every decision serves a purpose.
                        </p>
                    </div>
                    <div className="lg:col-span-7 space-y-6 dark:text-zinc-400 text-zinc-600 leading-relaxed">
                        <p>
                            This portfolio isn&apos;t just a showcase — it&apos;s a demonstration of how I build.
                            The architecture follows atomic design principles: small, composable units
                            that scale infinitely without sacrificing performance or developer experience.
                        </p>
                        <p>
                            React Server Components handle data fetching at the edge. TypeScript provides
                            end-to-end type safety. Tailwind enables rapid iteration while maintaining
                            design consistency. Every dependency earns its place in the bundle.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════
          TECH STACK
      ═══════════════════════════════════════════════════════════════════════ */}
            <section className="mb-20 md:mb-32">
                <div className="flex items-center gap-3 mb-8">
                    <Cpu size={16} className="text-[#33E092]" />
                    <SectionLabel>
                        Core Stack
                    </SectionLabel>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {techStack.map((tech, i) => (
                        <div
                            key={i}
                            className="group flex flex-col items-center justify-center p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 hover:border-[#33E092]/50 transition-all hover:-translate-y-1"
                        >
                            <div className={`${tech.color} mb-3 group-hover:scale-110 transition-transform`}>
                                {tech.icon}
                            </div>
                            <span className="text-xs font-medium dark:text-zinc-400 text-zinc-600 text-center">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════
          ARCHITECTURE
      ═══════════════════════════════════════════════════════════════════════ */}
            <section className="mb-20 md:mb-32 p-8 md:p-12 rounded-2xl border dark:border-zinc-800 border-zinc-200">
                <div className="flex items-center gap-3 mb-10">
                    <Layers size={16} className="text-[#33E092]" />
                    <SectionLabel>
                        Architecture
                    </SectionLabel>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold dark:text-white text-zinc-900 mb-6 leading-snug">
                            Performance is a feature,<br />not an afterthought.
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { metric: "<1s", label: "First Contentful Paint" },
                                { metric: "100%", label: "TypeScript Coverage" },
                                { metric: "30+", label: "Edge Regions" },
                                { metric: "AA", label: "WCAG Compliance" },
                            ].map((item) => (
                                <li key={item.label} className="flex items-baseline gap-4">
                                    <span className="text-2xl font-bold text-[#33E092] font-mono w-16">{item.metric}</span>
                                    <span className="dark:text-zinc-400 text-zinc-600 text-sm">{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-mono text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-400 mb-4">
                            Dependencies
                        </h4>
                        {[
                            { cat: "Auth", val: "NextAuth.js" },
                            { cat: "Data Fetching", val: "SWR" },
                            { cat: "Carousel", val: "Swiper" },
                            { cat: "Icons", val: "Lucide + React Icons" },
                            { cat: "Markdown", val: "React Markdown" },
                            { cat: "Utilities", val: "clsx + tailwind-merge" },
                        ].map((dep) => (
                            <div key={dep.cat} className="flex justify-between items-center py-2 border-b dark:border-zinc-800/50 border-zinc-100 last:border-0">
                                <span className="text-sm dark:text-zinc-500 text-zinc-500">{dep.cat}</span>
                                <span className="text-sm font-medium dark:text-white text-zinc-900">{dep.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════
          DESIGN SYSTEM
      ═══════════════════════════════════════════════════════════════════════ */}
            <section className="mb-20 md:mb-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Colors */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <Palette size={16} className="text-[#33E092]" />
                            <SectionLabel>
                                Palette
                            </SectionLabel>
                        </div>

                        <p className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed mb-8">
                            Intentionally constrained. The accent is reserved for
                            interactive elements and emphasis.
                        </p>

                        <div className="space-y-3">
                            {colors.map((color) => (
                                <div key={color.hex} className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-lg border dark:border-zinc-700 border-zinc-300 shrink-0"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium dark:text-white text-zinc-900 text-sm">{color.name}</span>
                                            <span className="font-mono text-xs dark:text-zinc-500 text-zinc-500">{color.hex}</span>
                                        </div>
                                        <span className="text-xs dark:text-zinc-500 text-zinc-500">{color.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Typography */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <Type size={16} className="text-[#33E092]" />
                            <SectionLabel>
                                Typography
                            </SectionLabel>
                        </div>

                        <p className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed mb-8">
                            Clear hierarchy through restraint. Two primary faces,
                            one monospace for technical content.
                        </p>

                        <div className="space-y-6">
                            <div className="pb-6 border-b dark:border-zinc-800 border-zinc-200">
                                <p className="font-incognito text-3xl font-black tracking-tight dark:text-white text-zinc-950 mb-1">Incognito</p>
                                <p className="text-xs dark:text-zinc-500 text-zinc-500">Display & Headings</p>
                            </div>
                            <div className="pb-6 border-b dark:border-zinc-800 border-zinc-200">
                                <p className="text-2xl font-medium dark:text-white text-zinc-950 mb-1">Inter Variable</p>
                                <p className="text-xs dark:text-zinc-500 text-zinc-500">Interface & Body</p>
                            </div>
                            <div>
                                <p className="text-xl font-mono dark:text-white text-zinc-950 mb-1">Fira Code</p>
                                <p className="text-xs dark:text-zinc-500 text-zinc-500">Code & Technical</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════
          ACKNOWLEDGMENTS
      ═══════════════════════════════════════════════════════════════════════ */}
            <section className="mb-20 md:mb-32">
                <div className="flex items-center gap-3 mb-8">
                    <Heart size={16} className="text-[#33E092]" />
                    <SectionLabel>
                        Acknowledgments
                    </SectionLabel>
                </div>

                <p className="dark:text-zinc-400 text-zinc-600 text-sm mb-8 max-w-lg">
                    Standing on the shoulders of giants. Grateful to these developers
                    for sharing their craft openly.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        {
                            name: "Victor Eke",
                            url: "https://victoreke.com/",
                            role: "Design inspiration",
                            note: "Aesthetic direction, accent color, Incognito typography"
                        },
                        {
                            name: "Manish Tamang",
                            url: "https://manishtamang.com/",
                            role: "Structure inspiration",
                            note: "Portfolio organization, colophon documentation concept"
                        },
                    ].map((person) => (
                        <Link
                            key={person.name}
                            href={person.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 hover:border-[#33E092]/50 transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <h3 className="font-incognito text-lg font-bold dark:text-white text-zinc-900 group-hover:text-zinc-600 dark:group-hover:text-[#33E092] transition-colors">
                                        {person.name}
                                    </h3>
                                    <p className="text-xs text-[#33E092]">{person.role}</p>
                                </div>
                                <ArrowUpRight size={16} className="dark:text-zinc-600 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-[#33E092] transition-colors shrink-0" />
                            </div>
                            <p className="text-sm dark:text-zinc-500 text-zinc-500">{person.note}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
            <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t dark:border-zinc-800 border-zinc-200">
                <div className="flex items-center gap-4 font-mono text-xs dark:text-zinc-500 text-zinc-500">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#33E092] rounded-full" />
                        <span className="uppercase">Online</span>
                    </div>
                    <span>·</span>
                    <span>Build 2026.01.27</span>
                </div>

                <div className="flex items-center gap-2 text-sm dark:text-zinc-400 text-zinc-600">
                    <Coffee size={14} className="text-[#33E092]" />
                    <span>Hunsur, Karnataka</span>
                </div>

                <div className="flex gap-4 font-mono text-xs uppercase">
                    <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" className="dark:text-zinc-500 text-zinc-500 hover:text-zinc-900 dark:hover:text-[#33E092] transition-colors">GitHub</Link>
                    <Link href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="dark:text-zinc-500 text-zinc-500 hover:text-zinc-900 dark:hover:text-[#33E092] transition-colors">Vercel</Link>
                </div>
            </footer>
        </article>
    );
}
