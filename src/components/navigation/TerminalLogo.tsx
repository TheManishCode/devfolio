"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

// Ref-based lock prevents hover spam from causing animation glitches
const words = ["dev.", "code.", "build.", "debug.", "deploy.", "ship."]

type AnimationState = 'typing' | 'paused' | 'deleting'

export function TerminalLogo() {
    const [wordIndex, setWordIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [cursorVisible, setCursorVisible] = useState(true)
    const [animState, setAnimState] = useState<AnimationState>('typing')

    // Hover state - only committedHover affects the animation
    const [committedHover, setCommittedHover] = useState(false)

    // Use refs for hover logic - prevents re-render loops
    const hoverIntentRef = useRef(false)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Lock: true = we're in the middle of a hover switch, ignore new hover events
    const switchInProgressRef = useRef(false)

    // Force update trigger - only used to kick the animation when needed
    const [switchTrigger, setSwitchTrigger] = useState(0)

    const currentWord = committedHover ? "Manish P" : words[wordIndex]

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(prev => !prev), 530)
        return () => clearInterval(interval)
    }, [])

    // Animation state machine
    useEffect(() => {
        let timeout: NodeJS.Timeout

        switch (animState) {
            case 'typing':
                if (displayText.length < currentWord.length) {
                    timeout = setTimeout(() => {
                        setDisplayText(currentWord.slice(0, displayText.length + 1))
                    }, 100)
                } else {
                    setAnimState('paused')
                }
                break

            case 'paused':
                // Check if we should switch hover state (lock is set)
                if (switchInProgressRef.current) {
                    timeout = setTimeout(() => {
                        setAnimState('deleting')
                    }, 50)
                } else if (!committedHover) {
                    // Only auto-advance when not hovered
                    timeout = setTimeout(() => {
                        setAnimState('deleting')
                    }, 1500)
                }
                break

            case 'deleting':
                if (displayText.length > 0) {
                    timeout = setTimeout(() => {
                        setDisplayText(displayText.slice(0, -1))
                    }, 50)
                } else {
                    // Text is now empty - safe to switch hover state
                    if (switchInProgressRef.current) {
                        // Commit the hover change and release lock
                        setCommittedHover(hoverIntentRef.current)
                        switchInProgressRef.current = false
                    } else if (!committedHover) {
                        // Move to next word
                        setWordIndex((prev) => (prev + 1) % words.length)
                    }
                    setAnimState('typing')
                }
                break
        }

        return () => clearTimeout(timeout)
    }, [animState, displayText, currentWord, committedHover, switchTrigger])

    // Debounced hover handler - waits 250ms before committing
    const handleMouseEnter = useCallback(() => {
        hoverIntentRef.current = true

        // Clear any pending debounce
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            // Only proceed if: still hovering, not already hovered, and not mid-switch
            if (hoverIntentRef.current && !committedHover && !switchInProgressRef.current) {
                switchInProgressRef.current = true
                // Trigger animation by updating state
                setSwitchTrigger(prev => prev + 1)
            }
        }, 250)
    }, [committedHover])

    const handleMouseLeave = useCallback(() => {
        hoverIntentRef.current = false

        // Clear any pending debounce
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            // Only proceed if: not hovering, currently hovered, and not mid-switch
            if (!hoverIntentRef.current && committedHover && !switchInProgressRef.current) {
                switchInProgressRef.current = true
                // Trigger animation by updating state
                setSwitchTrigger(prev => prev + 1)
            }
        }, 250)
    }, [committedHover])

    // Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    return (
        <Link
            href="/"
            className="flex items-baseline font-mono text-xl tracking-tight px-4 py-4 -mx-4 -my-4 min-w-[120px]"
            style={{ textDecoration: 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="dark:text-[#33E092] text-[#0CCE6B] font-semibold select-none">
                &gt;
            </span>

            <span
                className="dark:text-white text-zinc-900 font-bold ml-1 select-none"
                style={{ textDecoration: 'none' }}
            >
                {displayText}
            </span>

            <span
                className={`
                    inline-block w-[3px] h-5 ml-0.5 select-none
                    dark:bg-[#33E092] bg-[#0CCE6B]
                    ${cursorVisible ? 'opacity-100' : 'opacity-0'}
                `}
            />
        </Link>
    )
}
