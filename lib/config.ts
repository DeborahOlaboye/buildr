/**
 * Centralised application configuration.
 *
 * All environment variables are read here and exported as typed values.
 * Server-only variables (no NEXT_PUBLIC_ prefix) must NOT be imported in
 * client components — TypeScript will catch this via the "server-only" import
 * if you add it, but the naming convention alone makes it obvious.
 *
 * Usage:
 *   import { serverConfig } from "@/lib/config";      // in server components / API routes
 *   import { publicConfig } from "@/lib/config";      // in client or server components
 */

// ─── Public config (safe to use in client components) ────────────────────────

export const publicConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  enableLiveData: process.env.NEXT_PUBLIC_ENABLE_LIVE_DATA === "true",
  enablePayments: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === "true",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
} as const;

// ─── Server config (never import in client components) ────────────────────────

export const serverConfig = {
  // Stacks / Hiro
  hiroApiKey: process.env.HIRO_API_KEY ?? "",
  stacksApiUrl: process.env.STACKS_API_URL ?? "https://api.hiro.so",
  stacksNetwork: (process.env.STACKS_NETWORK ?? "mainnet") as "mainnet" | "testnet",

  // GitHub
  githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  githubApiToken: process.env.GITHUB_API_TOKEN ?? "",

  // Auth
  nextAuthSecret: process.env.NEXTAUTH_SECRET ?? "",
  nextAuthUrl: process.env.NEXTAUTH_URL ?? "http://localhost:3000",

  // Database
  databaseUrl: process.env.DATABASE_URL ?? "",

  // Payments
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",

  // Email
  emailFrom: process.env.EMAIL_FROM ?? "noreply@buildr.app",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
} as const;

// ─── Required variable check (dev-mode warning only) ─────────────────────────

const REQUIRED_SERVER_VARS: (keyof typeof serverConfig)[] = [
  "nextAuthSecret",
  "databaseUrl",
];

if (process.env.NODE_ENV === "development") {
  for (const key of REQUIRED_SERVER_VARS) {
    if (!serverConfig[key]) {
      console.warn(
        `[buildr/config] Missing required environment variable: ${key}. ` +
          `Copy .env.example to .env.local and fill in the value.`
      );
    }
  }
}

// ─── Helper: get absolute internal URL for server-side fetch ─────────────────

export function getInternalUrl(path: string): string {
  const base = publicConfig.baseUrl.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
