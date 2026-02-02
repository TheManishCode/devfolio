/**
 * Root Layout
 * 
 * Application shell that wraps all pages. Provides:
 * - Global CSS and font configuration
 * - Theme system (light/dark mode)
 * - Session context for auth features (guestbook)
 * - Smooth scroll behavior
 * - Persistent navigation and footer
 * 
 * @remarks
 * Uses Next.js Metadata API for SEO. Page-level metadata uses the template
 * format: "[Page Title] | Manish P"
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/ui/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedFavicon } from "@/components/ui/AnimatedFavicon"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { incognito } from "@/assets/fonts/font"
import { siteConfig } from "@/config/site"

import { SessionProvider } from "@/components/providers/SessionProvider"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: {
        default: `${siteConfig.name} | ${siteConfig.title}`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
        title: `${siteConfig.name} | ${siteConfig.title}`,
        siteName: siteConfig.openGraph.siteName,
        locale: siteConfig.openGraph.locale,
        type: siteConfig.openGraph.type,
        description: siteConfig.description,
    },
    twitter: {
        card: "summary_large_image",
        creator: siteConfig.social.twitter,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} ${incognito.variable} dark:bg-zinc-900 bg-[#d5d5da] dark:text-zinc-100 text-zinc-800`}>
                <SessionProvider>
                    <ThemeProvider>
                        <SmoothScroll>
                            <AnimatedFavicon />
                            <Navbar />
                            {children}
                            <Footer />
                        </SmoothScroll>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
