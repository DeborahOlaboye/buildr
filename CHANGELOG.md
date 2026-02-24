# Changelog

All notable changes to Buildr are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- REST API routes: `/api/builders`, `/api/ecosystems`, `/api/rewards`, `/api/activity`, `/api/search`, `/api/pricing`, `/api/health`
- Global search page at `/search` with ⌘K keyboard shortcut
- Static pages: Privacy Policy, Terms & Conditions, Data Policy, Blog, Token, API Docs
- Centralised environment config at `lib/config.ts`
- App-wide constants at `lib/constants.ts`
- `.env.example` documenting all environment variables
- `CONTRIBUTING.md` with branch, commit, and PR conventions
- `.editorconfig` for consistent formatting
- `type-check` and `check` npm scripts
- Health check endpoint at `/api/health`

### Fixed
- Footer links: replaced all `#` placeholder hrefs with real `<Link>` components
- `StartEarningCTA` connect buttons now navigate to `/connect`
- Navbar search form now submits to `/search?q=` on Enter
- Root layout wrapped Navbar in `<Suspense>` for `useSearchParams` support

### Changed
- README updated with correct tech stack (Next.js 15), project structure, env vars table, and API reference
- Server components use `getInternalUrl()` from `lib/config` instead of raw `process.env` concatenation

---

## [0.1.0] — 2025-02-01

### Added
- Initial MVP: Rewards page, Builders leaderboard, Ecosystems explorer, Pricing page, Connect flow
- Dark/light theme support
- Mock data layer (`lib/mock-data.ts`)
- Pagination, search, and filter UI components
- Builder profile pages and ecosystem detail pages
- Stacks+ pricing tiers and feature comparison table
