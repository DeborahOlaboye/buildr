"use client";

import React, { useState, useEffect, useCallback } from "react";
import FeaturedSection from "@/components/ecosystems/FeaturedSection";
import EcosystemStatsBar from "@/components/ecosystems/EcosystemStatsBar";
import EcosystemSearchBar from "@/components/ecosystems/EcosystemSearchBar";
import EcosystemCategoryTabs from "@/components/ecosystems/EcosystemCategoryTabs";
import EcosystemGrid from "@/components/ecosystems/EcosystemGrid";
import SkeletonCard from "@/components/shared/SkeletonCard";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { fetchEcosystems } from "@/lib/api-client";
import type { EcosystemCategory, EcosystemsApiResponse } from "@/types";

export default function EcosystemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EcosystemCategory>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EcosystemsApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchEcosystems({ search, category, limit: 50 });
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load ecosystems.");
    } finally {
      setIsLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    load();
  }, [load]);

  function handleClear() {
    setSearch("");
    setCategory("All");
  }

  function handleCategoryChange(cat: EcosystemCategory) {
    setCategory(cat);
    setSearch("");
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    if (value.trim() && category !== "All") {
      setCategory("All");
    }
  }

  const ecosystems = data?.ecosystems ?? [];
  const featured = data?.featured ?? [];
  const stats = data?.stats ?? { totalEcosystems: 0, totalBuilders: 0, totalTVL: 0 };
  const categoryCounts = data?.categoryCounts ?? {};
  const total = data?.total ?? 0;

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ecosystems</h1>
        <p className="text-muted-foreground mt-1">
          Discover projects, protocols, and ecosystems building on the Stacks Bitcoin L2 network.
        </p>
      </div>

      <EcosystemStatsBar stats={stats} />

      {!search.trim() && category === "All" && featured.length > 0 && (
        <FeaturedSection ecosystems={featured} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <EcosystemCategoryTabs
          value={category}
          onChange={handleCategoryChange}
          counts={categoryCounts as Record<EcosystemCategory, number>}
        />
        <div className="sm:ml-auto w-full sm:w-auto">
          <EcosystemSearchBar value={search} onChange={handleSearchChange} />
        </div>
      </div>

      {(search.trim() || category !== "All") && (
        <p className="text-sm text-muted-foreground -mt-2">
          <span className="font-semibold text-foreground">{total}</span>{" "}
          ecosystem{total !== 1 ? "s" : ""} found
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} lines={3} showAvatar />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={load} />
      ) : (
        <EcosystemGrid
          ecosystems={ecosystems}
          query={search}
          category={category}
          onClear={handleClear}
        />
      )}

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoading
          ? "Loading ecosystems"
          : `${total} ecosystem${total !== 1 ? "s" : ""} loaded`}
      </span>
    </div>
  );
}
