# Buildr

**Buildr** is a builder rewards and ecosystem discovery platform built natively on [Stacks](https://www.stacks.co/) — the Bitcoin Layer 2 for smart contracts. It tracks onchain activity and GitHub contributions from Stacks developers, ranks them on a live leaderboard, and distributes monthly $STX rewards to the most impactful builders in the Bitcoin L2 ecosystem.

---

## Overview

Buildr connects builders, projects, and ecosystems in one place. Whether you're deploying smart contracts on Stacks, contributing to open-source repos, or discovering the next wave of Bitcoin L2 projects — Buildr is your home base.

### Core Sections

| Section | Description |
|---|---|
| **Rewards** | Monthly $STX reward programs tracking onchain and GitHub activity |
| **Builders** | Live leaderboard of ranked Stacks builders with estimated rewards |
| **Ecosystems** | Discover and explore projects and ecosystems building on Stacks |
| **Pricing** | Stacks+ subscription tiers and STX-gated feature unlocks |
| **Search** | Unified search across builders and ecosystems |

---

## Features

- **Builder Leaderboard** — Real-time ranking of builders based on smart contract usage, fees generated, and GitHub contributions
- **Wallet Integration** — Connect your Bitcoin L2 / Stacks wallet to start tracking onchain activity
- **GitHub Integration** — Link your GitHub profile to track open-source contributions to public Stacks repos
- **Monthly Reward Programs** — Participate in time-boxed programs (e.g. Feb 1–28) with a shared $STX prize pool
- **Activity Dashboard** — View your personal tracked activity, connection status, and estimated rewards
- **Ecosystem Explorer** — Browse builders, projects, and ecosystems across the Stacks network
- **Stacks+ Membership** — STX-gated premium tier with advanced analytics and priority features
- **Global Search** — Search builders and ecosystems via navbar or `/search` page (⌘K shortcut)
- **REST API** — Public JSON API at `/api/*` for builders, ecosystems, rewards, activity, and more
- **Dark / Light Theme** — Full theme toggle with system preference support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + shadcn/ui |
| Icons | [Lucide React](https://lucide.dev/) |
| Data | Mock data (MVP) — API routes at `app/api/` |

---

## Project Structure

```
buildr/
├── app/
│   ├── api/                  # REST API routes (builders, ecosystems, rewards, etc.)
│   ├── builders/             # Builder leaderboard + profile pages
│   ├── ecosystems/           # Ecosystem explorer + detail pages
│   ├── search/               # Global search results page
│   ├── pricing/              # Stacks+ pricing tiers
│   ├── connect/              # Wallet + GitHub connection flow
│   ├── blog/                 # Blog index
│   ├── token/                # STX token info
│   ├── api-docs/             # API documentation
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms & conditions
│   ├── data-policy/          # Data policy
│   ├── layout.tsx            # Root layout (Navbar, Footer, ThemeProvider)
│   └── page.tsx              # Home / Rewards page
├── components/
│   ├── builders/             # Leaderboard, profiles, modals
│   ├── ecosystems/           # Cards, grid, filters, detail
│   ├── rewards/              # Banners, activity feed, FAQ
│   ├── search/               # Search results components
│   ├── pricing/              # Pricing cards, comparison table
│   ├── connect/              # Wallet + GitHub connection steps
│   ├── legal/                # Shared legal page components
│   ├── layout/               # Navbar, Footer, ThemeToggle
│   ├── shared/               # Pagination, skeleton loaders
│   └── ui/                   # Radix UI primitives (shadcn/ui)
├── lib/
│   ├── config.ts             # Centralised env var config + getInternalUrl
│   ├── constants.ts          # App-wide static constants
│   ├── api-client.ts         # Typed fetch helpers for client components
│   ├── mock-data.ts          # Seed data (replaced by real APIs in production)
│   └── utils.ts              # cn, formatSTX, debounce, formatRelativeTime
├── types/
│   └── index.ts              # Shared TypeScript types and API response types
├── .env.example              # Template for required environment variables
├── .editorconfig             # Editor formatting rules
├── CONTRIBUTING.md           # Contribution guide
└── next.config.ts            # Next.js configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/DeborahOlaboye/buildr.git
cd buildr

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in NEXT_PUBLIC_BASE_URL (at minimum)

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | Yes | Public base URL (e.g. `http://localhost:3000`) |
| `HIRO_API_KEY` | For live data | Hiro Platform API key for Stacks blockchain |
| `GITHUB_CLIENT_ID` | For auth | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | For auth | GitHub OAuth App client secret |
| `NEXTAUTH_SECRET` | For auth | Random secret for NextAuth.js |
| `DATABASE_URL` | For persistence | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | For payments | Stripe secret key for Stacks+ subscriptions |

See `.env.example` for the full list.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm run check        # Run type-check + lint together
```

---

## API Reference

The platform exposes a REST API at `/api/*`. All endpoints return JSON.

| Endpoint | Description |
|---|---|
| `GET /api/builders` | Paginated builder list with search and sort |
| `GET /api/builders/[handle]` | Single builder by handle |
| `GET /api/ecosystems` | Paginated ecosystems with category filter |
| `GET /api/ecosystems/[slug]` | Single ecosystem with builder list |
| `GET /api/rewards` | Current reward program and top builders |
| `GET /api/activity` | Recent activity feed |
| `GET /api/search?q=` | Unified search across builders and ecosystems |
| `GET /api/pricing` | Pricing tiers and feature comparison |
| `GET /api/health` | Health check |

See [/api-docs](/api-docs) for full parameter documentation.

---

## Reward Program Logic

Each monthly program runs from the 1st to the last day of the month. Rewards are calculated based on:

1. **Onchain Activity** — Users and fees generated by verified smart contracts deployed on Stacks
2. **GitHub Contributions** — Commits, PRs, and issues on public Stacks-related repositories
3. **Eligibility** — Must connect both a Stacks wallet and a GitHub profile

---

## Roadmap

- [ ] Live Stacks API integration (Hiro Platform)
- [ ] Real-time leaderboard via WebSocket
- [ ] GitHub OAuth authentication
- [ ] Payment processing (Stacks+ subscriptions)
- [ ] Notification system for reward drops
- [ ] Multi-ecosystem support (other Bitcoin L2s)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, commit message conventions, and PR guidelines.

---

## License

[MIT](LICENSE)

---

> Built with love for the Stacks ecosystem. Powered by Bitcoin.
