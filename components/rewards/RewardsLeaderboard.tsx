"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, ShieldCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BuilderProfileModal from "@/components/builders/BuilderProfileModal";
import Pagination from "@/components/shared/Pagination";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { formatSTX } from "@/lib/utils";
import { fetchBuilders } from "@/lib/api-client";
import type { Builder, RowsPerPageOption, BuildersApiResponse } from "@/types";

const DEFAULT_ROWS_PER_PAGE: RowsPerPageOption = 10;

const FALLBACK_AVATAR = "/fallback-avatar.svg";

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span
        aria-label="Rank 1"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-950 text-xs font-bold"
      >
        1
      </span>
    );
  if (rank === 2)
    return (
      <span
        aria-label="Rank 2"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-gray-800 dark:bg-gray-500 dark:text-gray-950 text-xs font-bold"
      >
        2
      </span>
    );
  if (rank === 3)
    return (
      <span
        aria-label="Rank 3"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-400 text-orange-900 dark:bg-orange-500 dark:text-orange-950 text-xs font-bold"
      >
        3
      </span>
    );
  return (
    <span aria-label={`Rank ${rank}`} className="text-sm text-muted-foreground font-medium tabular-nums">
      #{rank}
    </span>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="rounded-lg border overflow-hidden" aria-busy="true" aria-label="Loading leaderboard">
      {Array.from({ length: DEFAULT_ROWS_PER_PAGE }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 animate-pulse">
          <div className="h-6 w-6 rounded-full bg-muted" />
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-32 rounded bg-muted" />
            <div className="h-2.5 w-20 rounded bg-muted" />
          </div>
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function EmptyLeaderboard() {
  return (
    <div className="rounded-lg border py-16 text-center text-muted-foreground text-sm">
      No builders found for this period.
    </div>
  );
}

export default function RewardsLeaderboard() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(DEFAULT_ROWS_PER_PAGE);
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<BuildersApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchBuilders({ sort: "monthly", page, limit: rowsPerPage })
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load leaderboard.");
        setIsLoading(false);
      });
  }, [page, rowsPerPage]);

  useEffect(() => {
    load();
  }, [load]);

  function handleRowClick(builder: Builder) {
    setSelectedBuilder(builder);
    setModalOpen(true);
  }

  const builders = data?.builders ?? [];
  const total = data?.total ?? 0;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        {!isLoading && !error && (
          <span className="text-sm text-muted-foreground">
            {total.toLocaleString()} Profiles
          </span>
        )}
      </div>

      {isLoading && <LeaderboardSkeleton />}

      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={load} />
      )}

      {!isLoading && !error && builders.length === 0 && <EmptyLeaderboard />}

      {!isLoading && !error && builders.length > 0 && (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-14 text-xs uppercase tracking-wide">#</TableHead>
                <TableHead className="text-xs uppercase tracking-wide">Profile</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-right">
                  Rewards Estimated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {builders.map((builder) => (
                <TableRow
                  key={builder.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(builder)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View profile for ${builder.name}, rank #${builder.rank}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleRowClick(builder);
                  }}
                >
                  <TableCell className="py-3">
                    <RankBadge rank={builder.rank} />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={builder.avatarUrl}
                          alt={builder.name}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR;
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{builder.name}</span>
                          {builder.isVerified && (
                            <ShieldCheck
                              className="h-3.5 w-3.5 text-primary"
                              aria-label="Verified builder"
                            />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          @{builder.handle}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-sm font-semibold tabular-nums">
                        {formatSTX(builder.monthlyReward)}
                      </span>
                      <span className="text-xs text-muted-foreground">$STX</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-1" aria-hidden="true" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!isLoading && !error && builders.length > 0 && (
        <Pagination
          currentPage={page}
          rowsPerPage={rowsPerPage}
          totalItems={total}
          onPageChange={setPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setPage(1);
          }}
        />
      )}

      <BuilderProfileModal
        builder={selectedBuilder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
