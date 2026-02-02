# manishp.dev

A modern, feature-rich personal portfolio website built with Next.js 16, React 19, and Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## ✨ Features

- **Responsive Design** — Optimized for all screen sizes
- **Dark/Light Mode** — Theme switching with system preference detection
- **GitHub Integration** — Real-time repository data and contribution stats
- **MyAnimeList Integration** — Anime watchlist and stats display
- **Steam Integration** — Gaming library showcase
- **Spotify Integration** — Now playing widget
- **Interactive 3D Pokedex** — Custom anime watchlist viewer
- **Smooth Animations** — Lenis smooth scroll and modern transitions
- **SEO Optimized** — OpenGraph, Twitter cards, and structured metadata

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router (pages, layouts, API routes)
├── features/      # Domain-specific components (anime, workspace, etc.)
├── components/    # Shared UI components
├── lib/           # External service clients (GitHub, APIs)
├── config/        # Site configuration and constants
├── data/          # Static data files
└── styles/        # Global stylesheets
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# GitHub (required)
GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_GITHUB_USERNAME=your_username

# Spotify (optional)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# MyAnimeList (optional)
MAL_CLIENT_ID=
MAL_ACCESS_TOKEN=

# Steam (optional)
STEAM_API_KEY=
STEAM_ID=

# NextAuth (required for guestbook)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Icons | Lucide React, React Icons |
| Data Fetching | SWR |
| Auth | NextAuth.js |
| Carousel | Swiper |
| Smooth Scroll | Lenis |
| Markdown | react-markdown + remark-gfm |

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run enrich:certs` | Enrich certificate data |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://manishp.dev">Manish P</a>
</p>
