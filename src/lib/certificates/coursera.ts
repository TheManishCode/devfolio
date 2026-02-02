/**
 * =============================================================================
 * COURSERA RESOLVER
 * =============================================================================
 * 
 * Fetches certificate metadata from Coursera verification pages.
 * Uses OpenGraph and JSON-LD metadata when available.
 * =============================================================================
 */

import { EnrichedCertificateData } from './types'

/**
 * Extract certificate metadata from a Coursera verification page
 * 
 * Note: This is a best-effort extraction. Coursera pages may change structure.
 * If extraction fails, returns null and the certificate renders without enrichment.
 */
export async function enrichFromCoursera(verifyUrl: string): Promise<EnrichedCertificateData | null> {
    try {
        const response = await fetch(verifyUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; CertificateEnrichment/1.0)',
                'Accept': 'text/html',
            },
        })

        if (!response.ok) {
            console.warn(`[Coursera] Failed to fetch ${verifyUrl}: ${response.status}`)
            return null
        }

        const html = await response.text()

        // Try to extract JSON-LD data
        const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)
        if (jsonLdMatch) {
            try {
                const jsonLd = JSON.parse(jsonLdMatch[1])
                return extractFromJsonLd(jsonLd)
            } catch {
                // JSON-LD parsing failed, continue to fallback
            }
        }

        // Fallback: Extract from OpenGraph meta tags
        const enriched: EnrichedCertificateData = {}

        // Try to extract description for outcomes
        const descMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"/)
        if (descMatch && descMatch[1]) {
            enriched.outcomes = [descMatch[1]]
        }

        return Object.keys(enriched).length > 0 ? enriched : null

    } catch (error) {
        console.error(`[Coursera] Error enriching ${verifyUrl}:`, error)
        return null
    }
}

/**
 * Extract enrichment data from JSON-LD structured data
 */
function extractFromJsonLd(jsonLd: Record<string, unknown>): EnrichedCertificateData | null {
    const enriched: EnrichedCertificateData = {}

    // Handle array of JSON-LD objects
    const data = Array.isArray(jsonLd) ? jsonLd[0] : jsonLd

    // Extract skills if available
    if (data.teaches && Array.isArray(data.teaches)) {
        enriched.skills = data.teaches.map((t: { name?: string }) => t.name || String(t))
    }

    // Extract duration if available
    if (data.timeRequired) {
        enriched.duration = String(data.timeRequired)
    }

    // Extract level if available
    if (data.educationalLevel) {
        enriched.level = String(data.educationalLevel)
    }

    // Extract learning outcomes if available
    if (data.teaches && Array.isArray(data.teaches)) {
        enriched.outcomes = data.teaches.slice(0, 4).map((t: { name?: string }) => t.name || String(t))
    }

    return Object.keys(enriched).length > 0 ? enriched : null
}
