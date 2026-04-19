/**
 * Typed fetch helpers for client-side components.
 * Server components should call the API routes directly via fetch() with an
 * absolute URL (using the internal base URL), or import from lib/data-access.ts.
 */

import { publicConfig } from "@/lib/config";
import type {
  BuildersApiResponse,
  BuilderApiResponse,
  EcosystemsApiResponse,
  RewardsApiResponse,
  ActivityApiResponse,
  PricingApiResponse,
  SortMode,
  EcosystemCategory,
  RowsPerPageOption,
} from "@/types";

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  return publicConfig.baseUrl;
}

async function apiFetch<T>(path: string): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `API error ${res.status}`);
  }
  return (await res.json()) as T;
}

// ─── Builders ────────────────────────────────────────────────────────────────

export interface FetchBuildersParams {
  search?: string;
  sort?: SortMode;
  page?: number;
  limit?: RowsPerPageOption;
}

export function fetchBuilders(params: FetchBuildersParams = {}): Promise<BuildersApiResponse> {
  const sp = new URLSearchParams();
  if (params.search) sp.set("search", params.search);
  if (params.sort) sp.set("sort", params.sort);
  if (params.page) sp.set("page", String(params.page));
  if (params.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return apiFetch<BuildersApiResponse>(`/api/builders${qs ? `?${qs}` : ""}`);
}

export function fetchBuilder(handle: string): Promise<BuilderApiResponse> {
  return apiFetch<BuilderApiResponse>(`/api/builders/${encodeURIComponent(handle)}`);
}

// ─── Ecosystems ───────────────────────────────────────────────────────────────

export interface FetchEcosystemsParams {
  search?: string;
  category?: EcosystemCategory;
  page?: number;
  limit?: RowsPerPageOption;
}

export function fetchEcosystems(params: FetchEcosystemsParams = {}): Promise<EcosystemsApiResponse> {
  const sp = new URLSearchParams();
  if (params.search) sp.set("search", params.search);
  if (params.category) sp.set("category", params.category);
  if (params.page) sp.set("page", String(params.page));
  if (params.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return apiFetch<EcosystemsApiResponse>(`/api/ecosystems${qs ? `?${qs}` : ""}`);
}

export function fetchEcosystem(slug: string): Promise<{ ecosystem: import("@/types").Ecosystem; builders: import("@/types").Builder[] }> {
  return apiFetch(`/api/ecosystems/${encodeURIComponent(slug)}`);
}

// ─── Rewards ─────────────────────────────────────────────────────────────────

export function fetchRewards(): Promise<RewardsApiResponse> {
  return apiFetch<RewardsApiResponse>("/api/rewards");
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export function fetchActivity(limit?: number): Promise<ActivityApiResponse> {
  const qs = limit ? `?limit=${limit}` : "";
  return apiFetch<ActivityApiResponse>(`/api/activity${qs}`);
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

export function fetchPricing(): Promise<PricingApiResponse> {
  return apiFetch<PricingApiResponse>("/api/pricing");
}
