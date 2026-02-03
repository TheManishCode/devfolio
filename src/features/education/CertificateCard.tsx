"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ExternalLink, Clock, BarChart3 } from "lucide-react"

interface EnrichedData {
    level?: string
    duration?: string
    outcomes?: string[]
    skills?: string[]
}

interface Certificate {
    id: string
    title: string
    image: string
    issuer: string
    platform: string
    year: string
    verifyUrl: string
    enriched?: EnrichedData
}

export function CertificateCard({ cert }: { cert: Certificate }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const imageSrc = `/certificates/${cert.image}`

    // Safety check - if data is somehow invalid, don't render
    if (!cert.image || !cert.verifyUrl) return null

    const hasEnrichedData = cert.enriched && (
        cert.enriched.skills?.length ||
        cert.enriched.outcomes?.length ||
        cert.enriched.level ||
        cert.enriched.duration
    )

    return (
        <>
            {/* Card - Smaller preview */}
            <div
                className="group relative rounded-xl border border-zinc-400 dark:border-zinc-800 bg-[#d5d5da] dark:bg-zinc-950 overflow-hidden cursor-pointer hover:border-zinc-500 dark:hover:border-zinc-600 transition-all"
                onClick={() => setIsModalOpen(true)}
                role="button"
                tabIndex={0}
                aria-label={`View certificate: ${cert.title}`}
                onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
            >
                {/* Certificate Preview - Compact */}
                <div className="relative aspect-[4/3] bg-[#d5d5da] dark:bg-zinc-900 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={cert.title}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                {/* Meta Bar - Compact */}
                <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate mb-1">
                        {cert.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                        <span className="truncate">{cert.issuer}</span>
                        <span className="shrink-0 ml-2">{cert.year}</span>
                    </div>
                </div>
            </div>

            {/* Modal - Full certificate view */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b border-zinc-800">
                            <div className="flex-1 min-w-0 pr-4">
                                <p className="font-medium text-zinc-100 text-sm">{cert.title}</p>
                                <p className="text-xs text-zinc-400 mt-1">{cert.issuer}</p>
                                <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-500">
                                    <span className="px-1.5 py-0.5 bg-zinc-800 rounded">{cert.platform}</span>
                                    <span>ISSUED {cert.year}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close certificate modal"
                                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
                            >
                                <X size={18} className="text-zinc-400" />
                            </button>
                        </div>

                        {/* Certificate Image - Full view, no cropping */}
                        <div className="bg-[#d5d5da] p-4">
                            <img
                                src={imageSrc}
                                alt={cert.title}
                                className="w-full h-auto"
                                style={{ maxHeight: '70vh', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                            />
                        </div>

                        {/* Enriched Skills/Outcomes */}
                        {hasEnrichedData && (cert.enriched?.skills?.length || cert.enriched?.outcomes?.length) && (
                            <div className="p-4 border-t border-zinc-800">
                                <div className="flex items-center gap-4 mb-3 text-xs text-zinc-500">
                                    {cert.enriched?.level && (
                                        <span className="flex items-center gap-1">
                                            <BarChart3 size={12} />
                                            {cert.enriched.level}
                                        </span>
                                    )}
                                    {cert.enriched?.duration && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {cert.enriched.duration}
                                        </span>
                                    )}
                                </div>
                                {cert.enriched?.skills && cert.enriched.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {cert.enriched.skills.slice(0, 6).map((skill, i) => (
                                            <span key={i} className="px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-300 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
                            <p className="text-[10px] text-zinc-500 hidden sm:block">
                                Click outside to close
                            </p>
                            <a
                                href={cert.verifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#33E092] text-black text-xs font-medium rounded-lg hover:bg-[#2bc97e] transition-colors"
                            >
                                Verify Certificate
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
