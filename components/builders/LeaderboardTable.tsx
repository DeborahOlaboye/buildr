"use client";

import React, { useState } from "react";
import LeaderboardRow from "./LeaderboardRow";
import BuilderProfileModal from "./BuilderProfileModal";
import type { Builder, SortMode } from "@/types";

interface LeaderboardTableProps {
  builders: Builder[];
  sortMode: SortMode;
}

export default function LeaderboardTable({
  builders,
  sortMode,
}: LeaderboardTableProps) {
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleRowClick(builder: Builder) {
    setSelectedBuilder(builder);
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="w-full text-left" aria-label="Builder leaderboard">
          <thead>
            <tr className="border-b bg-muted/50">
              <th scope="col" className="py-3 pl-4 pr-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-12">
                #
              </th>
              <th scope="col" className="py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Profile
              </th>
              <th scope="col" className="py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                Ecosystem
              </th>
              <th scope="col" className="py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">
                {sortMode === "monthly" ? "Monthly Reward" : "All-time Reward"}
              </th>
            </tr>
          </thead>
          <tbody>
            {builders.map((builder) => (
              <LeaderboardRow
                key={builder.id}
                builder={builder}
                sortMode={sortMode}
                onClick={handleRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      <BuilderProfileModal
        builder={selectedBuilder}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
