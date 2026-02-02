import { TechData } from "@/lib/github/types"
import { MetaLabel } from "@/components/ui/Typography"

interface FaceTechProps {
    tech: TechData
    techStack?: string[]  // Explicit tech stack from project.json metadata
}

export function FaceTech({ tech, techStack }: FaceTechProps) {
    // Use techStack from metadata if provided, otherwise fall back to GitHub data
    const allTech = techStack && techStack.length > 0
        ? techStack
        : Array.from(new Set([
            tech.mainLanguage,
            ...tech.languages,
            ...tech.tools
        ])).filter(Boolean)

    return (
        <div className="w-full h-full p-6 flex flex-col select-none">
            <div className="flex-1 min-h-0 flex flex-col gap-1">
                <MetaLabel className="mb-3">
                    Stack
                </MetaLabel>

                <div className="flex flex-col gap-2 min-h-0 overflow-hidden">
                    {allTech.slice(0, 5).map((item, i) => (
                        <div key={item} className="flex items-center gap-3 group">
                            <div className={`
                                w-1.5 h-1.5 rounded-full 
                            ${i === 0 ? 'bg-zinc-500' : 'bg-zinc-300 dark:bg-zinc-700'}
                            `} />
                            <span className={`
                                text-sm font-medium truncate
                                ${i === 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}
                            `}>
                                {item}
                            </span>
                        </div>
                    ))}

                    {allTech.length > 5 && (
                        <div className="text-xs text-zinc-400 pl-4.5 pt-1">
                            + {allTech.length - 5} more
                        </div>
                    )}
                </div>
            </div>

            {/* Decorative bottom element */}
            <div className="h-px w-full bg-gradient-to-r from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 dark:to-transparent mt-4" />
        </div>
    )
}

