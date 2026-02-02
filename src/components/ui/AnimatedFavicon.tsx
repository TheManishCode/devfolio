"use client"

import { useEffect } from "react"

/**
 * =============================================================================
 * FAVICON - "M" WITH BLINKING CURSOR (HACKERRANK STYLE)
 * =============================================================================
 */

export function AnimatedFavicon() {
    useEffect(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 32
        canvas.height = 32
        const ctx = canvas.getContext("2d")

        if (!ctx) return

        let frame = 0
        const PRIMARY = "#33E092"
        const DARK_BG = "#18181b"

        const drawFavicon = () => {
            // Background
            ctx.fillStyle = DARK_BG
            ctx.fillRect(0, 0, 32, 32)

            // Draw bold "M" in green
            ctx.font = "bold 20px Arial, sans-serif"
            ctx.fillStyle = PRIMARY
            ctx.textAlign = "left"
            ctx.textBaseline = "middle"
            ctx.fillText("M", 3, 16)

            // Blinking cursor - toggles every 15 frames (~500ms)
            const cursorVisible = Math.floor(frame / 15) % 2 === 0

            if (cursorVisible) {
                ctx.fillStyle = PRIMARY
                ctx.fillRect(22, 7, 5, 15)
            }

            // Update favicon
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
            if (link) {
                link.href = canvas.toDataURL("image/png")
            } else {
                const newLink = document.createElement("link")
                newLink.rel = "icon"
                newLink.href = canvas.toDataURL("image/png")
                document.head.appendChild(newLink)
            }

            frame++
        }

        drawFavicon()
        const interval = setInterval(drawFavicon, 33)

        return () => clearInterval(interval)
    }, [])

    return null
}
