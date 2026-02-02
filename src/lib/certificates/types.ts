/**
 * =============================================================================
 * CERTIFICATE TYPE DEFINITIONS
 * =============================================================================
 * 
 * Type definitions for the certificate system.
 * Base certificates come from JSON, enriched data is auto-generated.
 * =============================================================================
 */

/**
 * Base certificate data from certificates.json
 */
export interface BaseCertificate {
    id: string
    title: string
    issuer: string
    platform: string
    year: string
    image: string
    verifyUrl: string
}

/**
 * Enriched certificate metadata (auto-generated)
 */
export interface EnrichedCertificateData {
    level?: string
    duration?: string
    outcomes?: string[]
    skills?: string[]
}

/**
 * Full certificate with optional enrichment
 */
export interface Certificate extends BaseCertificate {
    enriched?: EnrichedCertificateData
}

/**
 * Structure of certificates.json
 */
export interface CertificatesFile {
    certificates: BaseCertificate[]
}

/**
 * Structure of certificates.enriched.json
 */
export interface EnrichedCertificatesFile {
    [certificateId: string]: EnrichedCertificateData
}

/**
 * Supported platforms for enrichment
 */
export type CertificatePlatform = 'coursera' | 'credly' | 'aws' | 'google' | 'unknown'

/**
 * Detect platform from verification URL
 */
export function detectPlatform(verifyUrl: string): CertificatePlatform {
    const url = verifyUrl.toLowerCase()

    if (url.includes('coursera.org')) return 'coursera'
    if (url.includes('credly.com')) return 'credly'
    if (url.includes('aws.amazon.com') || url.includes('credly.com/badges')) return 'aws'
    if (url.includes('google.com') || url.includes('skillshop.exceedlms.com')) return 'google'

    return 'unknown'
}
