/**
 * App-wide constants.
 * These are static values that do not change between environments.
 * For environment-specific values, use lib/config.ts instead.
 */

// ─── App ─────────────────────────────────────────────────────────────────────

export const APP_NAME = "Buildr";
export const APP_TAGLINE = "Builder Rewards & Ecosystem Discovery on Stacks";
export const APP_URL = "https://buildr.app";
export const SUPPORT_EMAIL = "support@buildr.app";
export const LEGAL_EMAIL = "legal@buildr.app";
export const PRIVACY_EMAIL = "privacy@buildr.app";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const SEO_SITE_NAME = "Buildr";
export const SEO_LOCALE = "en_US";
export const SEO_TWITTER_HANDLE = "@buildrapp";
export const SEO_DEFAULT_TITLE = "Buildr — Stacks Builder Rewards";
export const SEO_DEFAULT_DESCRIPTION =
  "Track onchain activity and GitHub contributions on Stacks. Earn $STX rewards as a top Bitcoin L2 builder.";
export const SEO_DEFAULT_KEYWORDS = [
  "Stacks",
  "Bitcoin L2",
  "builder rewards",
  "STX",
  "Clarity",
  "smart contracts",
  "blockchain",
];
export const SEO_OG_IMAGE = `${APP_URL}/og-image.png`;

// ─── Stacks ───────────────────────────────────────────────────────────────────

export const STACKS_WALLET_PREFIX = "SP";
export const STACKS_TESTNET_WALLET_PREFIX = "ST";
export const MIN_WALLET_ADDRESS_LENGTH = 40;
export const MAX_WALLET_ADDRESS_LENGTH = 42;

// ─── GitHub ──────────────────────────────────────────────────────────────────

export const GITHUB_BASE_URL = "https://github.com";
export const MIN_GITHUB_HANDLE_LENGTH = 1;
export const MAX_GITHUB_HANDLE_LENGTH = 39;

// ─── Rewards ─────────────────────────────────────────────────────────────────

export const STX_CURRENCY_SYMBOL = "$STX";
export const MAX_REWARD_WINNERS = 50;
export const REWARD_CYCLE_DAYS = 30;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE = 1;
export const DEFAULT_ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;

// ─── Rate Limiting ────────────────────────────────────────────────────────────

export const API_RATE_LIMIT_PER_MINUTE = 60;

// ─── Cache TTLs (seconds) ─────────────────────────────────────────────────────

export const CACHE_TTL_BUILDERS = 60;        // 1 minute
export const CACHE_TTL_ECOSYSTEMS = 300;     // 5 minutes
export const CACHE_TTL_REWARDS = 3600;       // 1 hour
export const CACHE_TTL_ACTIVITY = 30;        // 30 seconds

// ─── Smart Contract Names ─────────────────────────────────────────────────────

export const CONTRACT_BUILDR_REGISTRY = "buildr-registry";
export const CONTRACT_BUILDER_SCORES  = "builder-scores";
export const CONTRACT_REWARD_PROGRAM  = "reward-program";
export const CONTRACT_SUBSCRIPTION    = "subscription";

// ─── Contract Score Weights ───────────────────────────────────────────────────

export const SCORE_WEIGHT_ONCHAIN = 60;
export const SCORE_WEIGHT_GITHUB  = 40;

// ─── Subscription Tiers ───────────────────────────────────────────────────────

export const SUBSCRIPTION_TIER_FREE       = 0;
export const SUBSCRIPTION_TIER_PRO        = 1;
export const SUBSCRIPTION_TIER_ENTERPRISE = 2;

export const SUBSCRIPTION_CYCLE_MONTHLY = 0;
export const SUBSCRIPTION_CYCLE_ANNUAL  = 1;

export const PRICE_PRO_MONTHLY_USTX = 10_000_000;   // 10 STX
export const PRICE_PRO_ANNUAL_USTX  = 96_000_000;   // 96 STX
