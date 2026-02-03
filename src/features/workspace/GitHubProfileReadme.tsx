"use client";

import { ArsenalGrid } from "./ArsenalGrid";
import { links } from "@/config/links";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

interface GitHubProfileReadmeProps {
    content: string;
    username: string;
}

export function GitHubProfileReadme({ content, username }: GitHubProfileReadmeProps) {
    // Extract GitHub username from content if available
    const profileSummaryMatch = content.match(
        /github-profile-summary-cards\.vercel\.app\/api\/cards\/profile-details\?username=([^"&\s]+)/
    );
    const githubUsername = profileSummaryMatch?.[1] || username;

    return (
        <div className="github-readme-section space-y-12">
            {/* Hero Section - Typing Animation & Tagline */}
            <section className="text-center space-y-6">
                {/* Typing SVG Animation */}
                <div className="flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=33E092&background=FFFFFF00&center=true&vCenter=true&width=600&lines=Name:+Manish+P;USER:+${username};STATUS:+Final+Year+CS+Undergrad;FOCUS:+AI-ML+%26+Security;ESTABLISHING+UPLINK...`}
                        alt="Typing SVG"
                        className="max-w-full h-auto"
                    />
                </div>

                {/* Developer Animation & Tagline */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://raw.githubusercontent.com/TheDudeThatCode/TheDudeThatCode/master/Assets/Developer.gif"
                        alt="Developer"
                        width={60}
                        height={60}
                    />
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                        Building Scalable Apps | Exploring Cybersecurity | Crafting Digital Experiences
                    </p>
                </div>
            </section>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Two Column Layout - System Access & User Metrics */}
            <section className="grid md:grid-cols-2 gap-8">
                {/* SYSTEM_ACCESS Panel */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <h3 className="text-center font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        &gt;_ SYSTEM_ACCESS
                    </h3>

                    <div className="text-center space-y-2">
                        <code className="block text-sm text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded mx-auto w-fit">
                            [!] GITHUB GUI: READ-ONLY
                        </code>
                        <code className="block text-sm text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded mx-auto w-fit">
                            [!] ROOT ACCESS: RESTRICTED
                        </code>
                    </div>

                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
                        To access the full <strong className="text-zinc-700 dark:text-zinc-300">Interactive CLI</strong> and execute commands, initialize the live environment.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://themanishcode.github.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-800 text-zinc-100 rounded-lg font-mono text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors border border-transparent hover:border-[#33E092]/50"
                        >
                            <span className="text-[#33E092]">&gt;_</span>
                            INITIALIZE_TERMINAL_CORE
                        </a>
                    </div>

                    <p className="text-center text-xs text-zinc-500 dark:text-zinc-600">
                        Gateway: themanishcode.github.io
                    </p>
                </div>

                {/* USER_METRICS Panel */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <h3 className="text-center font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        &gt;_ USER_METRICS
                    </h3>

                    <div className="space-y-4">
                        {/* Profile Summary Card */}
                        <div className="flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubUsername}&theme=transparent`}
                                alt="GitHub Stats"
                                className="rounded-lg border border-zinc-200 dark:border-zinc-800 max-w-full h-auto hover:border-[#33E092]/50 transition-colors"
                            />
                        </div>

                        {/* Streak Stats */}
                        <div className="flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&background=00000000&ring=33E092&fire=33E092&currStreakNum=888888&sideNums=888888&currStreakLabel=33E092&sideLabels=888888&dates=666666`}
                                alt="GitHub Streak"
                                className="rounded-lg border border-zinc-200 dark:border-zinc-800 max-w-full h-auto hover:border-[#33E092]/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ARSENAL_AND_TOOLS Section */}
            <section className="space-y-6">
                <h3 className="text-center font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    &gt;_ ARSENAL_AND_TOOLS
                </h3>
                <ArsenalGrid />
            </section>

            {/* CONTRIBUTION_LOG Section */}
            <section className="space-y-6">
                <h3 className="text-center font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    &gt;_ CONTRIBUTION_LOG
                </h3>

                <div className="flex justify-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                    {/* Snake Animation - Use dark theme for dark mode compatibility */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://raw.githubusercontent.com/${githubUsername}/${githubUsername}/output/github-contribution-grid-snake-dark.svg`}
                        alt="Contribution Snake Animation"
                        className="w-full max-w-4xl h-auto"
                    />
                </div>
            </section>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* ESTABLISH COMMUNICATION Section */}
            <section className="space-y-6 text-center">
                <h3 className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    📡 ESTABLISH COMMUNICATION
                </h3>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a
                        href={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-[#0077B5] dark:hover:border-[#0077B5] text-zinc-700 dark:text-zinc-300 hover:text-[#0077B5] transition-all hover:-translate-y-0.5"
                    >
                        <FiLinkedin className="w-5 h-5" />
                        <span className="font-medium">LinkedIn</span>
                    </a>

                    <a
                        href={links.email}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-[#D14836] dark:hover:border-[#D14836] text-zinc-700 dark:text-zinc-300 hover:text-[#D14836] transition-all hover:-translate-y-0.5"
                    >
                        <FiMail className="w-5 h-5" />
                        <span className="font-medium">Email</span>
                    </a>

                    <a
                        href={links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:-translate-y-0.5"
                    >
                        <FaXTwitter className="w-5 h-5" />
                        <span className="font-medium">X</span>
                    </a>
                </div>

                {/* Visitor Count */}
                <div className="pt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://komarev.com/ghpvc/?username=${githubUsername}&style=flat&color=33E092&label=SYSTEM+HITS`}
                        alt="Visitor Count"
                        className="mx-auto h-auto"
                    />
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-600">
                    Authorized Personnel Only. Session ID: <code className="text-[#33E092] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">#STUDENT-DEV-2025</code>
                </p>
            </section>
        </div>
    );
}
