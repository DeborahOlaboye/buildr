"use client";

import React, { useState, useMemo } from "react";
import type { Metadata } from "next";
import SearchBar from "@/components/builders/SearchBar";
import SortToggle from "@/components/builders/SortToggle";
import BuilderCount from "@/components/builders/BuilderCount";
import LeaderboardTable from "@/components/builders/LeaderboardTable";
import EmptyState from "@/components/builders/EmptyState";
import Pagination from "@/components/shared/Pagination";
import { MOCK_BUILDERS, TOTAL_BUILDERS } from "@/lib/mock-data";
import type { SortMode, RowsPerPageOption } from "@/types";

export default function BuildersPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("monthly");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(10);

  // Filter builders by search query (name or handle)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MOCK_BUILDERS;
    return MOCK_BUILDERS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.handle.toLowerCase().includes(q) ||
        b.ecosystem.some((e) => e.toLowerCase().includes(q))
    );
  }, [search]);

  // Sort filtered results
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      sort === "monthly"
        ? b.monthlyReward - a.monthlyReward
        : b.allTimeReward - a.allTimeReward
    );
  }, [filtered, sort]);

  // Paginate
  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [sorted, page, rowsPerPage]);

  // Total count: use TOTAL_BUILDERS for unfiltered, filtered.length for filtered
  const totalCount = search.trim() ? filtered.length : TOTAL_BUILDERS;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleSortChange(value: SortMode) {
    setSort(value);
    setPage(1);
  }

  function handleRowsPerPageChange(rows: RowsPerPageOption) {
    setRowsPerPage(rows);
    setPage(1);
  }

  return (
    <div className="container py-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Builders</h1>
        <p className="text-muted-foreground mt-1">
          Discover and rank the top builders on the Stacks Bitcoin L2 network.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 w-full sm:max-w-sm">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search builders, projects, ecosystems…"
          />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <SortToggle value={sort} onChange={handleSortChange} />
        </div>
      </div>

      {/* Count */}
      <BuilderCount count={totalCount} filtered={!!search.trim()} />

      {/* Table or Empty State */}
      {paginated.length === 0 ? (
        <EmptyState query={search} onClear={() => handleSearchChange("")} />
      ) : (
        <>
          <LeaderboardTable builders={paginated} sortMode={sort} />
          <Pagination
            currentPage={page}
            rowsPerPage={rowsPerPage}
            totalItems={totalCount}
            onPageChange={setPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
    </div>
  );
}
