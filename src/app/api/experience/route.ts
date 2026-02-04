import { NextResponse } from "next/server"
import { getExperienceData } from "@/lib/experience"

/**
 * Experience API Route
 * 
 * NOTE: This is now just a wrapper around the shared library function.
 * It's kept for potential client-side fetching needs, but the main app
 * now uses the library function directly in Server Components.
 */

// ISR: Revalidate every hour
export const revalidate = 3600

export async function GET() {
    const data = await getExperienceData()
    return NextResponse.json(data)
}
