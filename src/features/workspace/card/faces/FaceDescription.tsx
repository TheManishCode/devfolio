import { MetaLabel } from "@/components/ui/Typography"

interface FaceDescriptionProps {
    description: string
}

export function FaceDescription({ description }: FaceDescriptionProps) {
    return (
        <div className="w-full h-full p-6 relative group bg-[#d5d5da] dark:bg-zinc-800/20 overflow-hidden">
            <div className="prose dark:prose-invert prose-xs max-w-none">
                <MetaLabel className="mb-4">
                    Readme Preview
                </MetaLabel>
                <div className="opacity-75">
                    <p className="text-xs leading-relaxed mb-3 text-zinc-600 dark:text-zinc-400">
                        {description || "No description available."}
                    </p>
                </div>
            </div>

            {/* Fade Mask */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent pointer-events-none" />
        </div>
    )
}
