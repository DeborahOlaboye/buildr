"use client";

import React, { useState, useEffect } from "react";
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
import { formatSTX } from "@/lib/utils";
import { fetchBuilders } from "@/lib/api-client";
import type { Builder, RowsPerPageOption, BuildersApiResponse } from "@/types";

const ROWS_PER_PAGE: RowsPerPageOption = 10;

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold">
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-gray-800 text-xs font-bold">
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-400 text-orange-900 text-xs font-bold">
        3
      </span>
    );
  return (
    <span className="text-sm text-muted-foreground font-medium tabular-nums">
      #{rank}
    </span>
  );
}

export default function RewardsLeaderboard() {
  const [page, setPage] = useState(1);
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<BuildersApiResponse | null>(null);

  useEffect(() => {
    fetchBuilders({ sort: "monthly", page, limit: ROWS_PER_PAGE })
      .then(setData)
      .catch(console.error);
  }, [page]);

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
        <span className="text-sm text-muted-foreground">
          {total.toLocaleString()} Profiles
        </span>
      </div>

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
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{builder.name}</span>
                        {builder.isVerified && (
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
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
                    <ExternalLink className="h-3 w-3 text-muted-foreground ml-1" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={page}
        rowsPerPage={ROWS_PER_PAGE}
        totalItems={total}
        onPageChange={setPage}
        onRowsPerPageChange={() => {}}
      />

      <BuilderProfileModal
        builder={selectedBuilder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
