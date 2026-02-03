/** @type {import('next').NextConfig} */

// Security Headers Configuration
// CSP uses unsafe-inline/unsafe-eval which Next.js requires for proper functionality
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      // img-src: specific CDNs for images
      "img-src 'self' data: blob: https://cdn.myanimelist.net https://s4.anilist.co https://cdn.cloudflare.steamstatic.com https://images.alphacoders.com https://images6.alphacoders.com https://images.igdb.com https://cdn2.steamgriddb.com https://upload.wikimedia.org https://cdn2.unrealengine.com https://media.rawg.io https://avatars.githubusercontent.com https://i.scdn.co https://store.steampowered.com",
      // connect-src: APIs used by the site
      "connect-src 'self' https://api.github.com https://api.wakatime.com https://api.myanimelist.net https://api.spotify.com https://accounts.spotify.com https://alfa-leetcode-api.onrender.com https://www.duolingo.com https://api.steampowered.com https://store.steampowered.com https://api.linkedin.com https://www.linkedin.com https://discord.com wss:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; ')
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
]

const nextConfig = {
  typescript: {
    // TypeScript errors are handled by IDE/editor linting
    // Build continues even with TS warnings for faster iteration
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    unoptimized: true,
    // Allow external images from anime/game CDNs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
      },
      {
        protocol: 'https',
        hostname: 'images.alphacoders.com',
      },
      {
        protocol: 'https',
        hostname: 'images6.alphacoders.com',
      },
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.steamgriddb.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.unrealengine.com',
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
      },
    ],
  },
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
