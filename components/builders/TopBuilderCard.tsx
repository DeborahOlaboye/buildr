import React from "react";
import Image from "next/image";
import { ShieldCheck, Trophy } from "lucide-react";
import { formatSTX } from "@/lib/utils";
import type { Builder, SortMode } from "@/types";
import { cn } from "@/lib/utils";

interface TopBuilderCardProps {
  builder: Builder;
  sortMode: SortMode;
  onClick: (builder: Builder) => void;
}

const MEDAL: Record<number, { bg: string; label: string }> = {
  1: { bg: "bg-yellow-400 text-yellow-900", label: "🥇 1st" },
  2: { bg: "bg-gray-300 text-gray-800", label: "🥈 2nd" },
  3: { bg: "bg-orange-400 text-orange-900", label: "🥉 3rd" },
};

export default function TopBuilderCard({
  builder,
  sortMode,
  onClick,
}: TopBuilderCardProps) {
  const medal = MEDAL[builder.rank];
  const reward =
    sortMode === "monthly" ? builder.monthlyReward : builder.allTimeReward;

  return (
    <button
      onClick={() => onClick(builder)}
      aria-label={`View profile for ${builder.name}, rank #${builder.rank}, ${formatSTX(reward)} STX ${sortMode === "monthly" ? "monthly" : "all-time"} reward`}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all hover:shadow-md hover:-translate-y-0.5 w-full",
        builder.rank === 1 && "border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold",
          medal.bg
        )}
      >
        {medal.label}
      </span>
      <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted ring-2 ring-offset-2 ring-primary/20">
        <Image
          src={builder.avatarUrl}
          alt={builder.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div>
        <div className="flex items-center justify-center gap-1 font-semibold text-sm">
          {builder.name}
          {builder.isVerified && (
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">@{builder.handle}</p>
      </div>
      <div className="flex items-center gap-1 text-sm font-bold text-primary" aria-hidden="true">
        <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
        {formatSTX(reward)} $STX
      </div>
    </button>
  );
}
