"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

interface SmoothScrollProps {
    children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.5,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            infinite: false,
            autoResize: true,
        })

        let rafId: number
        function raf(time: number) {
            lenisRef.current?.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        // Intercept anchor links for smooth scroll
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const anchor = target.closest('a[href^="#"]')

            if (anchor) {
                const href = anchor.getAttribute('href')
                if (href && href !== '#') {
                    e.preventDefault()
                    const targetElement = document.querySelector(href)
                    if (targetElement) {
                        lenisRef.current?.scrollTo(targetElement as HTMLElement, {
                            offset: -100,
                            duration: 1.5,
                        })
                    }
                }
            }
        }
        document.addEventListener('click', handleAnchorClick)

        // Pause scroll during form input to prevent janky behavior
        const handleFocus = (e: FocusEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                lenisRef.current?.stop()
            }
        }
        const handleBlur = (e: FocusEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                lenisRef.current?.start()
            }
        }
        document.addEventListener('focusin', handleFocus)
        document.addEventListener('focusout', handleBlur)

        return () => {
            cancelAnimationFrame(rafId)
            document.removeEventListener('click', handleAnchorClick)
            document.removeEventListener('focusin', handleFocus)
            document.removeEventListener('focusout', handleBlur)
            lenisRef.current?.destroy()
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll
