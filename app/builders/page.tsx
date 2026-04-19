"use client";

import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/builders/SearchBar";
import SortToggle from "@/components/builders/SortToggle";
import BuilderCount from "@/components/builders/BuilderCount";
import LeaderboardTable from "@/components/builders/LeaderboardTable";
import TopBuilderCard from "@/components/builders/TopBuilderCard";
import EmptyState from "@/components/builders/EmptyState";
import Pagination from "@/components/shared/Pagination";
import SkeletonRow from "@/components/shared/SkeletonRow";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { fetchBuilders } from "@/lib/api-client";
import type { Builder, SortMode, RowsPerPageOption, BuildersApiResponse } from "@/types";

const DEFAULT_ROWS: RowsPerPageOption = 10;

export default function BuildersPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("monthly");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(DEFAULT_ROWS);
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<BuildersApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchBuilders({ search, sort, page, limit: rowsPerPage });
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load builders.");
    } finally {
      setIsLoading(false);
    }
  }, [search, sort, page, rowsPerPage]);

  useEffect(() => {
    load();
  }, [load]);

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

  const builders = data?.builders ?? [];
  const total = data?.total ?? 0;
  const topThree = data?.topThree ?? [];

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Builders</h1>
        <p className="text-muted-foreground mt-1">
          Discover and rank the top builders on the Stacks Bitcoin L2 network.
        </p>
      </div>

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

      {!search.trim() && topThree.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topThree.map((builder) => (
            <TopBuilderCard
              key={builder.id}
              builder={builder}
              sortMode={sort}
              onClick={setSelectedBuilder}
            />
          ))}
        </div>
      )}

      <BuilderCount count={total} filtered={!!search.trim()} />

      {isLoading ? (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full">
            <tbody>
              {Array.from({ length: rowsPerPage }).map((_, i) => (
                <SkeletonRow key={i} cols={5} />
              ))}
            </tbody>
          </table>
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={load} />
      ) : builders.length === 0 ? (
        <EmptyState query={search} onClear={() => handleSearchChange("")} />
      ) : (
        <>
          <LeaderboardTable
            builders={builders}
            sortMode={sort}
          />
          <Pagination
            currentPage={page}
            rowsPerPage={rowsPerPage}
            totalItems={total}
            onPageChange={setPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}

      {selectedBuilder && (
        <span className="hidden" data-selected={selectedBuilder.id} />
      )}
    </div>
  );
}
