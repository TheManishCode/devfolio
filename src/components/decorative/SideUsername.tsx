"use client";

import { siteConfig } from "@/config/site";

export function SideUsername() {
    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-zinc-300 dark:bg-zinc-700" />
            <a
                href={`https://github.com/${siteConfig.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-[#33E092] dark:hover:text-[#33E092] transition-colors"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
                @{siteConfig.githubUsername}
            </a>
            <div className="w-px h-16 bg-zinc-300 dark:bg-zinc-700" />
        </div>
    );
}
