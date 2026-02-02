"use client"

import { links } from "@/config/links"
import {
    SiGithub,
    SiLinkedin,
    SiCodepen,
    SiDribbble,
    SiInstagram,
    SiSteam,
    SiUnsplash,
    SiYoutube,
    SiProducthunt,
    SiStackoverflow,
    SiCodewars,
    SiGitlab,
    SiX,
    SiDailydotdev,
    SiDevdotto,
} from "react-icons/si"

const socialItems = [
    { name: "GitHub", href: links.github, icon: SiGithub },
    { name: "X", href: links.x, icon: SiX },
    { name: "Linkedin", href: links.linkedin, icon: SiLinkedin },
    { name: "Codepen", href: links.codepen, icon: SiCodepen },
    { name: "Dribbble", href: links.dribbble, icon: SiDribbble },
    { name: "Instagram", href: links.instagram, icon: SiInstagram },
    { name: "Steam", href: links.steam, icon: SiSteam },
    { name: "Unsplash", href: links.unsplash, icon: SiUnsplash },
    { name: "Youtube", href: links.youtube, icon: SiYoutube },
    { name: "Daily.dev", href: links.dailydev, icon: SiDailydotdev },
    { name: "Producthunt", href: links.producthunt, icon: SiProducthunt },
    { name: "Stackoverflow", href: links.stackoverflow, icon: SiStackoverflow },
    { name: "Codewars", href: links.codewars, icon: SiCodewars },
    { name: "Gitlab", href: links.gitlab, icon: SiGitlab },
    { name: "Dev.to", href: links.dev, icon: SiDevdotto },
]

export function SocialLinks() {
    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4 mt-8">
            {socialItems.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 dark:text-zinc-400 text-zinc-600 hover:text-zinc-900 dark:hover:text-[#33E092] transition-colors duration-200"
                >
                    <item.icon className="w-4 h-4" />
                    <span className="text-base">{item.name}</span>
                </a>
            ))}
        </div>
    )
}

export default SocialLinks
