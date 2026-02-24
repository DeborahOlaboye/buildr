"use client";

import React, { useState, useMemo, useEffect } from "react";
import FeaturedSection from "@/components/ecosystems/FeaturedSection";
import EcosystemStatsBar from "@/components/ecosystems/EcosystemStatsBar";
import EcosystemSearchBar from "@/components/ecosystems/EcosystemSearchBar";
import EcosystemCategoryTabs from "@/components/ecosystems/EcosystemCategoryTabs";
import EcosystemGrid from "@/components/ecosystems/EcosystemGrid";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { MOCK_ECOSYSTEMS, ECOSYSTEM_STATS } from "@/lib/mock-data";
import type { EcosystemCategory } from "@/types";

export default function EcosystemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EcosystemCategory>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Featured ecosystems (max 3)
  const featured = useMemo(
    () => MOCK_ECOSYSTEMS.filter((e) => e.isFeatured).slice(0, 3),
    []
  );

  // Per-category counts (for tab badges)
  const categoryCounts = useMemo(() => {
    const counts = { All: MOCK_ECOSYSTEMS.length } as Record<EcosystemCategory, number>;
    const cats: EcosystemCategory[] = ["DeFi", "NFT", "Gaming", "Infrastructure", "Social", "DAO"];
    for (const cat of cats) {
      counts[cat] = MOCK_ECOSYSTEMS.filter((e) => e.category === cat).length;
    }
    return counts;
  }, []);

  // Filter by category + search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MOCK_ECOSYSTEMS.filter((e) => {
      const matchesCategory = category === "All" || e.category === category;
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  function handleClear() {
    setSearch("");
    setCategory("All");
  }

  function handleCategoryChange(cat: EcosystemCategory) {
    setCategory(cat);
    // Reset search when switching category so results are not doubly filtered
    setSearch("");
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    // Reset to All when user types a new search query
    if (value.trim() && category !== "All") {
      setCategory("All");
    }
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ecosystems</h1>
        <p className="text-muted-foreground mt-1">
          Discover projects, protocols, and ecosystems building on the Stacks Bitcoin L2 network.
        </p>
      </div>

      {/* Stats bar */}
      <EcosystemStatsBar stats={ECOSYSTEM_STATS} />

      {/* Spotlight / Featured */}
      {!search.trim() && category === "All" && (
        <FeaturedSection ecosystems={featured} />
      )}

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <EcosystemCategoryTabs
          value={category}
          onChange={handleCategoryChange}
          counts={categoryCounts}
        />
        <div className="sm:ml-auto w-full sm:w-auto">
          <EcosystemSearchBar value={search} onChange={handleSearchChange} />
        </div>
      </div>

      {/* Result count */}
      {(search.trim() || category !== "All") && (
        <p className="text-sm text-muted-foreground -mt-2">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          ecosystem{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} lines={3} showAvatar />
          ))}
        </div>
      ) : (
        <EcosystemGrid
          ecosystems={filtered}
          query={search}
          category={category}
          onClear={handleClear}
        />
      )}
    </div>
  );
}
