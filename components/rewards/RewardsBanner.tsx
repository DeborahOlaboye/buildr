import React from "react";
import { Calendar, Trophy, Users, Zap } from "lucide-react";
import type { RewardProgram } from "@/types";
import { formatSTX } from "@/lib/utils";

interface RewardsBannerProps {
  program: RewardProgram;
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}`;
}

export default function RewardsBanner({ program }: RewardsBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-950/30 dark:to-purple-950/30 p-6 sm:p-8">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: title + meta */}
        <div className="space-y-3">
          {/* ecosystem chip */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
            <Zap className="h-3 w-3" aria-hidden="true" />
            {program.ecosystem}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {program.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={`${program.startDate}/${program.endDate}`}>
                {formatDateRange(program.startDate, program.endDate)}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden="true" />
              {program.winnerCount} Winners / month
            </span>
          </div>
        </div>

        {/* Right: prize pool */}
        <div
          className="flex flex-col items-center justify-center rounded-xl border bg-background/80 backdrop-blur px-6 py-4 text-center shadow-sm min-w-[140px]"
          aria-label={`Prize pool: ${formatSTX(program.totalPrize)} ${program.currency}`}
        >
          <Trophy className="h-5 w-5 text-primary mb-1" aria-hidden="true" />
          <span className="text-3xl font-extrabold tabular-nums text-primary" aria-hidden="true">
            {formatSTX(program.totalPrize).split(".")[0]}
          </span>
          <span className="text-sm font-semibold text-muted-foreground" aria-hidden="true">
            ${program.currency}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5" aria-hidden="true">
            Prize Pool
          </span>
        </div>
      </div>
    </div>
  );
}
