import { Marquee } from "@/components/ui/marquee";
import {
    SiTailwindcss,
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiVercel,
    SiGithub,
    SiSwiper,
} from 'react-icons/si';
import { TbBrandFramerMotion } from "react-icons/tb";
import { Database, Shield } from "lucide-react";
import { SectionTitle } from "@/components/ui/Typography";

const TechCard = ({ tech }: { tech: { icon: React.ReactNode; label: string; desc: string } }) => (
    <div className="flex items-center space-x-3 px-4 py-2 min-w-[150px]">
        <div className="text-2xl flex-shrink-0">{tech.icon}</div>
        <div>
            <p className="text-sm font-semibold dark:text-white text-zinc-900">{tech.label}</p>
            <p className="text-xs dark:text-zinc-500 text-zinc-500">{tech.desc}</p>
        </div>
    </div>
);

const TechStacks = () => {
    const techStack = [
        { icon: <SiNextdotjs className="dark:text-white text-black" />, label: "Next.js 16", desc: "React Framework" },
        { icon: <SiReact color="#61DBFB" />, label: "React 19", desc: "UI Library" },
        { icon: <SiTypescript color="#3178C6" />, label: "TypeScript", desc: "Type Safety" },
        { icon: <SiTailwindcss color="#06B6D4" />, label: "Tailwind v4", desc: "Styling" },
        { icon: <TbBrandFramerMotion className="dark:text-white text-black" />, label: "Lenis", desc: "Smooth Scroll" },
        { icon: <Database className="text-[#33E092]" size={24} />, label: "SWR", desc: "Data Fetching" },
        { icon: <Shield className="text-[#33E092]" size={24} />, label: "NextAuth", desc: "Authentication" },
        { icon: <SiSwiper color="#6332F6" />, label: "Swiper", desc: "Carousels" },
        { icon: <SiVercel className="dark:text-white text-black" />, label: "Vercel", desc: "Deployment" },
        { icon: <SiGithub className="dark:text-white text-black" />, label: "GitHub", desc: "Version Control" },
    ];

    // Split tech stack into two rows
    const firstRow = techStack.slice(0, 5);
    const secondRow = techStack.slice(5);

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">

            <SectionTitle className="mb-8 self-start">
                Powered by
            </SectionTitle>

            <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
                {firstRow.map((tech) => (
                    <TechCard key={`first-${tech.label}`} tech={tech} />
                ))}
            </Marquee>
            <div className="mt-4">
                <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:1rem]">
                    {secondRow.map((tech) => (
                        <TechCard key={`second-${tech.label}`} tech={tech} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default TechStacks;

