"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatSTX } from "@/lib/utils";
import type { Builder, SortMode } from "@/types";

interface LeaderboardRowProps {
  builder: Builder;
  sortMode: SortMode;
  onClick: (builder: Builder) => void;
}

function RankCell({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-950 text-xs font-bold"
        aria-label="Rank 1"
      >
        1
      </span>
    );
  if (rank === 2)
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-gray-800 dark:bg-gray-500 dark:text-gray-950 text-xs font-bold"
        aria-label="Rank 2"
      >
        2
      </span>
    );
  if (rank === 3)
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-400 text-orange-900 dark:bg-orange-500 dark:text-orange-950 text-xs font-bold"
        aria-label="Rank 3"
      >
        3
      </span>
    );
  return (
    <span className="text-sm font-medium text-muted-foreground tabular-nums">
      #{rank}
    </span>
  );
}

type EcosystemVariant = "defi" | "nft" | "gaming" | "dao" | "infrastructure" | "social";

const ECOSYSTEM_VARIANTS = new Map<string, EcosystemVariant>([
  ["defi", "defi"],
  ["nft", "nft"],
  ["gaming", "gaming"],
  ["dao", "dao"],
  ["infrastructure", "infrastructure"],
  ["social", "social"],
]);

function EcosystemBadge({ tag }: { tag: string }) {
  const variant = ECOSYSTEM_VARIANTS.get(tag.toLowerCase()) ?? "secondary";
  return (
    <Badge variant={variant} className="text-[10px] px-1.5 py-0">
      {tag}
    </Badge>
  );
}

export default function LeaderboardRow({
  builder,
  sortMode,
  onClick,
}: LeaderboardRowProps) {
  const reward =
    sortMode === "monthly" ? builder.monthlyReward : builder.allTimeReward;

  return (
    <tr
      className={cn(
        "leaderboard-row border-b last:border-b-0",
        builder.rank <= 3 && "bg-muted/30"
      )}
      onClick={() => onClick(builder)}
      role="button"
      tabIndex={0}
      aria-label={`View profile for ${builder.name}, rank #${builder.rank}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(builder);
      }}
    >
      {/* Rank */}
      <td className="py-3 pl-4 pr-2 w-12">
        <RankCell rank={builder.rank} />
      </td>

      {/* Profile */}
      <td className="py-3 px-3">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={builder.avatarUrl}
              alt={builder.name}
              fill
              className="object-cover"
              unoptimized
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/fallback-avatar.svg";
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium truncate">{builder.name}</span>
              {builder.isVerified && (
                <ShieldCheck className="h-3.5 w-3.5 text-primary flex-shrink-0" aria-hidden="true" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">@{builder.handle}</span>
          </div>
        </div>
      </td>

      {/* Ecosystems — hidden on small screens */}
      <td className="py-3 px-3 hidden sm:table-cell">
        <div className="flex flex-wrap gap-1">
          {builder.ecosystem.slice(0, 2).map((tag) => (
            <EcosystemBadge key={tag} tag={tag} />
          ))}
        </div>
      </td>

      {/* Reward */}
      <td className="py-3 px-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <span className="text-sm font-semibold tabular-nums">
            {formatSTX(reward)}
          </span>
          <span className="text-xs text-muted-foreground">$STX</span>
          <ExternalLink className="h-3 w-3 text-muted-foreground ml-1 opacity-0 group-hover:opacity-100" aria-hidden="true" />
        </div>
      </td>
    </tr>
  );
}
