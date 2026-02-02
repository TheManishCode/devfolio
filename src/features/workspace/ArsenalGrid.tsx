"use client";

import {
    SiFlutter,
    SiDart,
    SiReact,
    SiPython,
    SiNodedotjs, // Note: react-icons/si exports Node.js as SiNodedotjs usually, but checking import
    SiFirebase,
    SiLinux,
    SiGit,
    SiMarkdown,
} from "react-icons/si";

// Ensure we have correct imports. If SiNodedotjs isn't correct, it might be SiNode-dot-js or similar.
// Usually it is SiNodedotjs or just SiNodejs. Let's assume standard names or check if error.
// Based on common react-icons usage:
// Flutter -> SiFlutter
// Dart -> SiDart
// React -> SiReact
// Python -> SiPython
// Node.js -> SiNodedotjs
// Firebase -> SiFirebase
// Linux -> SiLinux
// Git -> SiGit
// Markdown -> SiMarkdown

const coreArsenal = [
    { icon: <SiFlutter size={28} />, name: "Flutter", color: "text-[#02569B]" },
    { icon: <SiDart size={28} />, name: "Dart", color: "text-[#0175C2]" },
    { icon: <SiReact size={28} />, name: "React", color: "text-[#61DAFB]" },
    { icon: <SiPython size={28} />, name: "Python", color: "text-[#3776AB]" },
    { icon: <SiNodedotjs size={28} />, name: "Node.js", color: "text-[#339933]" },
    { icon: <SiFirebase size={28} />, name: "Firebase", color: "text-[#FFCA28]" },
    { icon: <SiLinux size={28} />, name: "Linux", color: "dark:text-white text-zinc-900" },
    { icon: <SiGit size={28} />, name: "Git", color: "text-[#F05032]" },
    { icon: <SiMarkdown size={28} />, name: "Markdown", color: "dark:text-white text-zinc-900" },
];

export function ArsenalGrid() {
    return (
        <section className="mb-8 mt-8">
            {/* Uses the same grid classes as Colophon Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {coreArsenal.map((tech, i) => (
                    <div
                        key={i}
                        className="group flex flex-col items-center justify-center p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 hover:border-[#33E092]/50 transition-all hover:-translate-y-1 bg-transparent"
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
    );
}
