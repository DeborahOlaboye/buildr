import React from "react";
import { Coins, TrendingUp, FileCode2, GitCommit, Trophy, CalendarDays } from "lucide-react";
import { formatSTX } from "@/lib/utils";
import type { Builder } from "@/types";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

interface BuilderStatGridProps {
  builder: Builder;
}

export default function BuilderStatGrid({ builder }: BuilderStatGridProps) {
  const joinYear = new Date(builder.joinedDate).getFullYear();

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide text-xs">
        Builder Stats
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard
          icon={<Coins className="h-4 w-4" />}
          label="Monthly Reward"
          value={formatSTX(builder.monthlyReward)}
          sub="This cycle"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="All-Time Earned"
          value={formatSTX(builder.allTimeReward)}
          sub="Since joining"
        />
        <StatCard
          icon={<Trophy className="h-4 w-4" />}
          label="Leaderboard Rank"
          value={`#${builder.rank}`}
          sub="Global ranking"
        />
        <StatCard
          icon={<FileCode2 className="h-4 w-4" />}
          label="Contracts Deployed"
          value={builder.contractsDeployed.toLocaleString()}
          sub="On Stacks mainnet"
        />
        <StatCard
          icon={<GitCommit className="h-4 w-4" />}
          label="GitHub Commits"
          value={builder.githubContributions.toLocaleString()}
          sub="Tracked contributions"
        />
        <StatCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Member Since"
          value={joinYear.toString()}
          sub={new Date(builder.joinedDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        />
      </div>
    </div>
  );
}
