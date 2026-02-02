"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
    children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"           // Apply theme as class on <html>
            defaultTheme="dark"         // Default to dark theme
            enableSystem                // Allow system preference
            disableTransitionOnChange   // Prevent flash during theme change
        >
            {children}
        </NextThemesProvider>
    )
}
