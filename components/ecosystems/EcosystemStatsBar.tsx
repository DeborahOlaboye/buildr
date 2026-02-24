import React from "react";
import { LayoutGrid, Users, DollarSign } from "lucide-react";
import type { EcosystemStats } from "@/types";

interface EcosystemStatsBarProps {
  stats: EcosystemStats;
}

function formatTVL(tvl: number): string {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  return `$${tvl.toLocaleString()}`;
}

const STAT_ITEMS = (stats: EcosystemStats) => [
  {
    icon: <LayoutGrid className="h-4 w-4" aria-hidden="true" />,
    label: "Ecosystems",
    value: stats.totalEcosystems.toLocaleString(),
  },
  {
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
    label: "Total Builders",
    value: stats.totalBuilders.toLocaleString(),
  },
  {
    icon: <DollarSign className="h-4 w-4" aria-hidden="true" />,
    label: "Total TVL",
    value: formatTVL(stats.totalTVL),
  },
];

export default function EcosystemStatsBar({ stats }: EcosystemStatsBarProps) {
  return (
    <div className="grid grid-cols-3 divide-x rounded-xl border bg-card overflow-hidden">
      {STAT_ITEMS(stats).map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center py-4 px-3 text-center gap-1"
          aria-label={`${item.label}: ${item.value}`}
        >
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs" aria-hidden="true">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <span className="text-xl font-bold tabular-nums" aria-hidden="true">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// Note: TVL figures are mocked and for display purposes only.
