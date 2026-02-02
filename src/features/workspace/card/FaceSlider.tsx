"use client"

import React from "react"

interface FaceSliderProps {
    activeFace: number
    children: React.ReactNode[]
    mode?: "mini" | "expanded"
}

export function FaceSlider({ activeFace, children, mode = "mini" }: FaceSliderProps) {
    const translateX = `-${activeFace * 100}%`

    const transitionStyle = {
        transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        transitionDuration: "280ms",
    }

    return (
        <div
            className="flex w-full h-full will-change-transform"
            style={{
                transform: `translateX(${translateX})`,
                ...transitionStyle
            }}
        >
            {children.map((child, index) => (
                <div key={index} className="w-full h-full flex-shrink-0">
                    {child}
                </div>
            ))}
        </div>
    )
}
