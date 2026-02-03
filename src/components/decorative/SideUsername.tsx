"use client";

import { siteConfig } from "@/config/site";

export function SideUsername() {
    return (
        <>
            {/* Desktop - vertical on left side */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
                <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800" />
                <a
                    href={`https://github.com/${siteConfig.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono tracking-wider text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-500 transition-colors"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                    @{siteConfig.githubUsername}
                </a>
                <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Mobile/Tablet - horizontal at bottom */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 flex lg:hidden items-center">
                <a
                    href={`https://github.com/${siteConfig.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] font-mono tracking-wider text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors px-3 py-1"
                >
                    @{siteConfig.githubUsername}
                </a>
            </div>
        </>
    );
}
