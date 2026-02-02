/**
 * =============================================================================
 * CERTIFICATE ENRICHMENT SCRIPT
 * =============================================================================
 * 
 * Run this script to enrich certificates with metadata from their sources.
 * 
 * Usage:
 *   npx tsx scripts/enrich-certificates.ts [--force]
 * 
 * Options:
 *   --force    Re-enrich all certificates, ignoring cache
 * =============================================================================
 */

import * as fs from 'fs'
import * as path from 'path'

// Import types and enrichment function
import type { BaseCertificate, CertificatesFile, EnrichedCertificatesFile } from '../src/lib/certificates/types'
import { enrichCertificates } from '../src/lib/certificates/enrichCertificate'

const DATA_DIR = path.join(process.cwd(), 'data')
const CERTIFICATES_PATH = path.join(DATA_DIR, 'certificates.json')
const ENRICHED_PATH = path.join(DATA_DIR, 'certificates.enriched.json')

async function main() {
    const forceRefresh = process.argv.includes('--force')

    console.log('='.repeat(60))
    console.log('CERTIFICATE ENRICHMENT SCRIPT')
    console.log('='.repeat(60))
    console.log()

    // Load certificates
    if (!fs.existsSync(CERTIFICATES_PATH)) {
        console.error(`❌ certificates.json not found at ${CERTIFICATES_PATH}`)
        process.exit(1)
    }

    const certificatesFile: CertificatesFile = JSON.parse(
        fs.readFileSync(CERTIFICATES_PATH, 'utf-8')
    )

    console.log(`📂 Found ${certificatesFile.certificates.length} certificates`)

    // Load existing enrichment cache
    let existingEnrichment: EnrichedCertificatesFile = {}
    if (fs.existsSync(ENRICHED_PATH) && !forceRefresh) {
        existingEnrichment = JSON.parse(fs.readFileSync(ENRICHED_PATH, 'utf-8'))
        console.log(`📦 Loaded ${Object.keys(existingEnrichment).length} cached enrichments`)
    }

    // Filter certificates that need enrichment
    const certificatesToEnrich = forceRefresh
        ? certificatesFile.certificates
        : certificatesFile.certificates.filter((c: BaseCertificate) => !existingEnrichment[c.id])

    if (certificatesToEnrich.length === 0) {
        console.log('\n✅ All certificates already enriched. Use --force to refresh.')
        return
    }

    console.log(`\n🔄 Enriching ${certificatesToEnrich.length} certificates...`)
    console.log()

    // Enrich certificates
    const newEnrichments = await enrichCertificates(certificatesToEnrich)

    // Merge with existing
    const allEnrichments: EnrichedCertificatesFile = {
        ...existingEnrichment,
        ...newEnrichments,
    }

    // Write enriched file
    fs.writeFileSync(
        ENRICHED_PATH,
        JSON.stringify(allEnrichments, null, 2),
        'utf-8'
    )

    console.log()
    console.log('='.repeat(60))
    console.log('ENRICHMENT COMPLETE')
    console.log('='.repeat(60))
    console.log()
    console.log(`📊 Summary:`)
    console.log(`   Total certificates: ${certificatesFile.certificates.length}`)
    console.log(`   Newly enriched: ${Object.keys(newEnrichments).length}`)
    console.log(`   Total enriched: ${Object.keys(allEnrichments).length}`)
    console.log()
    console.log(`💾 Written to: ${ENRICHED_PATH}`)
}

main().catch(console.error)
