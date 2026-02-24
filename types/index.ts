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
