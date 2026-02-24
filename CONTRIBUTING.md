# Contributing to Buildr

Thanks for your interest in contributing! Please read this guide before opening a PR.

---

## Getting Started

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/your-username/buildr.git
   cd buildr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Fill in the required values in .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Branch Naming

Use the following convention:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<issue-number>-<short-description>` | `feature/42-add-builder-search` |
| Bug fix | `fix/<issue-number>-<short-description>` | `fix/17-pagination-off-by-one` |
| Docs | `docs/<short-description>` | `docs/update-api-reference` |
| Chore | `chore/<short-description>` | `chore/upgrade-next-15` |
| Refactor | `refactor/<short-description>` | `refactor/extract-api-client` |

Always branch off `main`:
```bash
git checkout main && git pull origin main
git checkout -b feature/42-your-feature
```

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or user-facing change |
| `fix` | Bug fix |
| `refactor` | Code restructure without behaviour change |
| `docs` | Documentation changes only |
| `chore` | Tooling, deps, CI (no production code change) |
| `test` | Adding or updating tests |
| `style` | Formatting, whitespace (no logic change) |
| `perf` | Performance improvement |

### Examples

```
feat(api): add GET /api/builders with search and pagination
fix(navbar): search form submits to correct route on mobile
refactor(builders): extract LeaderboardRow into separate component
docs(readme): add environment variable setup instructions
chore(deps): upgrade next from 15.1.3 to 15.2.0
```

---

## Pull Requests

1. **One concern per PR** — keep PRs focused on a single issue or feature
2. **Reference the issue** — include `Fixes #<issue-number>` or `Closes #<issue-number>` in the PR description
3. **Fill in the PR template** — describe what changed and how to test it
4. **Pass all checks** — run `npm run check` before opening a PR:
   ```bash
   npm run type-check   # TypeScript validation
   npm run lint         # ESLint
   ```
5. **No force pushes** to shared branches — use `git revert` for corrections

---

## Code Style

- **TypeScript** everywhere — no `any` unless absolutely necessary and commented
- **Components** are in `PascalCase`, files match the component name
- **API routes** live in `app/api/` following Next.js App Router conventions
- **Client components** have `"use client"` at the top; avoid them for data-only components
- **Styles** via Tailwind CSS utility classes — no custom CSS files
- **No barrel files** — import directly from the source file
- Import order: React → Next.js → external libs → internal `@/` aliases

---

## Questions?

Open a [GitHub Discussion](https://github.com/DeborahOlaboye/buildr/discussions) or email
[support@buildr.app](mailto:support@buildr.app).
