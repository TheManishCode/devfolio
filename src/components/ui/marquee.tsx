"use client";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef, useState } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            {...props}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            className={cn(
                "flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className,
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                            "animate-marquee flex-row": !vertical && !reverse,
                            "animate-marquee-reverse flex-row": !vertical && reverse,
                            "animate-marquee-vertical flex-col": vertical,
                        })}
                        style={{ animationPlayState: isPaused ? "paused" : "running" }}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}



