// ─── Builder ────────────────────────────────────────────────────────────────

export interface Builder {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatarUrl: string;
  monthlyReward: number;
  allTimeReward: number;
  contractsDeployed: number;
  githubContributions: number;
  walletAddress: string;
  githubProfile: string;
  ecosystem: string[];
  joinedDate: string;
  bio: string;
  isVerified: boolean;
}

// ─── Pagination ──────────────────────────────────────────────────────────────

export interface PaginationState {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
}

export type RowsPerPageOption = 10 | 25 | 50;

// ─── Sort ────────────────────────────────────────────────────────────────────

export type SortMode = "monthly" | "alltime";

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardFilters {
  search: string;
  sort: SortMode;
  page: number;
  rowsPerPage: RowsPerPageOption;
}

// ─── Reward Program ──────────────────────────────────────────────────────────

export interface RewardProgram {
  id: string;
  name: string;
  totalPrize: number;
  currency: string;
  winnerCount: number;
  startDate: string;
  endDate: string;
  ecosystem: string;
}

// ─── User Activity ────────────────────────────────────────────────────────────

export type ConnectionStatus = "connected" | "disconnected";

export interface WalletConnection {
  status: ConnectionStatus;
  address: string | null;
  count: number;
}

export interface GitHubConnection {
  status: ConnectionStatus;
  handle: string | null;
  contributions: number;
}

export interface UserActivity {
  wallet: WalletConnection;
  github: GitHubConnection;
  contractsDeployed: number;
  estimatedReward: number;
  rank: number | null;
  rewardCompleted: boolean;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ─── Ecosystem ────────────────────────────────────────────────────────────────

export type EcosystemCategory =
  | "All"
  | "DeFi"
  | "NFT"
  | "Gaming"
  | "Infrastructure"
  | "Social"
  | "DAO";

export interface Ecosystem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Exclude<EcosystemCategory, "All">;
  logoUrl: string;
  builderCount: number;
  tvl: number | null;
  projectUrl: string;
  isFeatured: boolean;
  isVerified: boolean;
  launchDate: string;
}

// ─── Ecosystem Stats ──────────────────────────────────────────────────────────

export interface EcosystemStats {
  totalEcosystems: number;
  totalBuilders: number;
  totalTVL: number;
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export type BillingCycle = "monthly" | "annual";

export type PricingTierId = "free" | "pro" | "enterprise";

export interface PricingFeature {
  label: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export interface PricingTier {
  id: PricingTierId;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  currency: string;
  isRecommended: boolean;
  ctaLabel: string;
  features: string[];
}

export interface PricingFAQItem {
  id: string;
  question: string;
  answer: string;
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

export type ActivityEventType =
  | "contract_deployed"
  | "github_push"
  | "reward_claimed"
  | "ecosystem_joined";

export interface ActivityFeedItem {
  id: string;
  builderHandle: string;
  builderName: string;
  avatarUrl: string;
  eventType: ActivityEventType;
  description: string;
  timestamp: string; // ISO 8601
}

// ─── Search ───────────────────────────────────────────────────────────────────

export type SearchResultKind = "builder" | "ecosystem";

export interface BuilderSearchResult {
  kind: "builder";
  id: string;
  handle: string;
  name: string;
  avatarUrl: string;
  rank: number;
  monthlyReward: number;
  isVerified: boolean;
  ecosystem: string[];
}

export interface EcosystemSearchResult {
  kind: "ecosystem";
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  category: string;
  builderCount: number;
  isVerified: boolean;
  isFeatured: boolean;
}

export interface SearchApiResponse {
  query: string;
  builders: BuilderSearchResult[];
  ecosystems: EcosystemSearchResult[];
  total: number;
}
