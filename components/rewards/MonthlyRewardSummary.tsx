import React from "react";
import { CheckCircle2, Trophy, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatSTX } from "@/lib/utils";
import type { UserActivity } from "@/types";

interface MonthlyRewardSummaryProps {
  activity: UserActivity;
  programName: string;
}

export default function MonthlyRewardSummary({
  activity,
  programName,
}: MonthlyRewardSummaryProps) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">{programName}</span>
        </div>
        {activity.rewardCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            <span>Completed</span>
          </span>
        )}
      </div>

      {/* Estimated reward */}
      <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">
            Estimated Reward
          </p>
          <p className="text-3xl font-extrabold text-primary tabular-nums">
            {formatSTX(activity.estimatedReward)}
            <span className="text-base font-semibold ml-1">$STX</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-0.5">Your rank</p>
          <p className="text-2xl font-bold tabular-nums">
            #{activity.rank ?? "—"}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-lg border bg-muted/40 p-2.5">
          <p className="font-bold tabular-nums">{activity.wallet.count}</p>
          <p className="text-xs text-muted-foreground">Wallets</p>
        </div>
        <div className="rounded-lg border bg-muted/40 p-2.5">
          <p className="font-bold tabular-nums">{activity.contractsDeployed}</p>
          <p className="text-xs text-muted-foreground">Contracts</p>
        </div>
        <div className="rounded-lg border bg-muted/40 p-2.5">
          <p className="font-bold tabular-nums">
            {activity.github.contributions}
          </p>
          <p className="text-xs text-muted-foreground">Contributions</p>
        </div>
      </div>

      <Button variant="outline" className="w-full gap-2 text-sm">
        <TrendingUp className="h-4 w-4" />
        View full activity breakdown
      </Button>
    </div>
  );
}
