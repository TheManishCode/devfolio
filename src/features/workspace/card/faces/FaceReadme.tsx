import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ReadmePreview } from "@/lib/github/types"
import { MetaLabel } from "@/components/ui/Typography"

interface FaceReadmeProps {
    readme: ReadmePreview
}

export function FaceReadme({ readme }: FaceReadmeProps) {
    const { content } = readme

    return (
        <div className="w-full h-full p-6 relative group bg-[#d5d5da] dark:bg-zinc-800/20 overflow-hidden">
            <div className="prose dark:prose-invert prose-xs max-w-none">
                <MetaLabel className="mb-4">
                    Readme Preview
                </MetaLabel>
                <div className="opacity-75">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => <strong className="block text-sm text-zinc-900 dark:text-zinc-100 mb-2 mt-1" {...props} />,
                            h2: ({ node, ...props }) => <strong className="block text-sm text-zinc-900 dark:text-zinc-100 mb-2 mt-1" {...props} />,
                            h3: ({ node, ...props }) => <strong className="block text-xs font-medium text-zinc-800 dark:text-zinc-200 mb-1 mt-1" {...props} />,
                            p: ({ node, ...props }) => <p className="text-xs leading-relaxed mb-3 text-zinc-600 dark:text-zinc-400" {...props} />,
                            ul: ({ node, ...props }) => <ul className="space-y-1 mb-2" {...props} />,
                            li: ({ node, ...props }) => <li className="text-xs text-zinc-600 dark:text-zinc-400 pl-2 border-l-2 border-zinc-200 dark:border-zinc-700" {...props} />,
                            a: ({ node, ...props }) => <span className="text-zinc-800 dark:text-zinc-200 font-medium" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="pl-3 border-l-2 border-zinc-400/30 italic text-zinc-500 my-2" {...props} />,
                        }}
                    >
                        {content || "No detailed information available."}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Fade Mask */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent pointer-events-none" />
        </div>
    )
}

