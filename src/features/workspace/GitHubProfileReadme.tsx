"use client";

import { ArsenalGrid } from "./ArsenalGrid";
import { links } from "@/config/links";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import useSWR from "swr";
import GitHubContributions from "@/features/github/GitHubContributions";

interface GitHubProfileReadmeProps {
    content: string;
    username: string;
}

const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
});

export function GitHubProfileReadme({ content, username }: GitHubProfileReadmeProps) {
    const githubUsername = username;
    
    // Fetch GitHub profile data
    const { data: profile } = useSWR(
        `/api/github?type=profile&username=${githubUsername}`, 
        fetcher,
        { revalidateOnFocus: false }
    );
    const { data: impact, error: impactError } = useSWR(
        `/api/github?type=impact&username=${githubUsername}`, 
        fetcher,
        { revalidateOnFocus: false }
    );

    // Extract values with fallbacks
    const isLoading = !impact && !impactError;
    const commits = impact?.commits ?? (isLoading ? '—' : 0);
    const stars = impact?.stars ?? (isLoading ? '—' : 0);
    const repos = impact?.repos ?? profile?.public_repos ?? (isLoading ? '—' : 0);
    const followers = impact?.followers ?? profile?.followers ?? (isLoading ? '—' : 0);

    return (
        <div className="github-readme-section space-y-10">
            {/* Hero Section - Typing Animation & Tagline */}
            <section className="text-center space-y-6">
                {/* Typing SVG Animation */}
                <div className="flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1000&color=52525B&background=FFFFFF00&center=true&vCenter=true&width=550&lines=Hi,+I'm+Manish+P;Final+Year+CS+Undergrad;AI-ML+%26+Security+Enthusiast;Welcome+to+my+space...`}
                        alt="Typing SVG"
                        className="max-w-full h-auto opacity-90"
                    />
                </div>

                {/* Tagline */}
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                    Building scalable apps · Exploring cybersecurity · Crafting digital experiences
                </p>
            </section>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Two Column Layout - System Access & User Metrics */}
            <section className="grid md:grid-cols-2 gap-6">
                {/* SYSTEM_ACCESS Panel */}
                <div className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 p-6 space-y-5">
                    <h3 className="text-center font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        System Access
                    </h3>

                    <div className="text-center space-y-2">
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                            GitHub GUI: Read-only mode
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                            Root access: Restricted
                        </p>
                    </div>

                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
                        Access the full <span className="text-zinc-700 dark:text-zinc-300">interactive terminal</span> for live commands.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://themanishcode.github.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-mono text-sm font-medium transition-colors"
                        >
                            <span>→</span>
                            Launch Terminal
                        </a>
                    </div>

                    <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                        themanishcode.github.io
                    </p>
                </div>

                {/* USER_METRICS Panel */}
                <div className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 p-6 space-y-5">
                    <h3 className="text-center font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Stats
                    </h3>

                    {/* Profile Summary Card */}
                    <div className="rounded-lg overflow-hidden">
                        <div className="flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubUsername}&theme=transparent`}
                                alt="GitHub Profile Summary"
                                className="max-w-full h-auto opacity-90"
                            />
                        </div>
                    </div>

                    {/* Stats Grid - Minimal */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="text-center py-3">
                            <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                {commits}
                            </div>
                            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Commits</div>
                        </div>
                        <div className="text-center py-3">
                            <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                {stars}
                            </div>
                            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Stars</div>
                        </div>
                        <div className="text-center py-3">
                            <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                {repos}
                            </div>
                            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Repos</div>
                        </div>
                        <div className="text-center py-3">
                            <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                {followers}
                            </div>
                            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Followers</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contribution Graph - Using the working component */}
            <GitHubContributions />

            {/* ARSENAL_AND_TOOLS Section */}
            <section className="space-y-6">
                <h3 className="text-center font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Tech Stack
                </h3>
                <ArsenalGrid />
            </section>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* ESTABLISH COMMUNICATION Section */}
            <section className="space-y-6 text-center">
                <h3 className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Connect
                </h3>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                        href={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                    >
                        <FiLinkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                    </a>

                    <a
                        href={links.email}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                    >
                        <FiMail className="w-4 h-4" />
                        <span className="text-sm">Email</span>
                    </a>

                    <a
                        href={links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                    >
                        <FaXTwitter className="w-4 h-4" />
                        <span className="text-sm">X</span>
                    </a>
                </div>

                {/* Visitor Count */}
                <div className="pt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://komarev.com/ghpvc/?username=${githubUsername}&style=flat-square&color=a1a1aa&label=views`}
                        alt="Visitor Count"
                        className="mx-auto h-auto opacity-60"
                    />
                </div>
            </section>
        </div>
    );
}
