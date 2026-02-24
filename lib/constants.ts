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
