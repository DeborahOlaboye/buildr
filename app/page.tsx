import React from "react";
import RewardsBanner from "@/components/rewards/RewardsBanner";
import ActivitySection from "@/components/rewards/ActivitySection";
import MonthlyRewardSummary from "@/components/rewards/MonthlyRewardSummary";
import StartEarningCTA from "@/components/rewards/StartEarningCTA";
import ProgramProgressBar from "@/components/rewards/ProgramProgressBar";
import FAQSection from "@/components/rewards/FAQSection";
import RewardsLeaderboard from "@/components/rewards/RewardsLeaderboard";
import ActivityFeed from "@/components/rewards/ActivityFeed";
import { MOCK_USER_ACTIVITY } from "@/lib/mock-data";
import type { RewardsApiResponse, ActivityApiResponse } from "@/types";

async function getRewardsData(): Promise<RewardsApiResponse | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${base}/api/rewards`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getActivityFeed(): Promise<ActivityApiResponse | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${base}/api/activity?limit=10`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

const IS_USER_CONNECTED =
  MOCK_USER_ACTIVITY.wallet.status === "connected" &&
  MOCK_USER_ACTIVITY.github.status === "connected";

export default async function RewardsPage() {
  const [rewardsData, activityData] = await Promise.all([
    getRewardsData(),
    getActivityFeed(),
  ]);

  if (!rewardsData) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Failed to load rewards data.</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-10">
      <RewardsBanner program={rewardsData.program} />
      <ProgramProgressBar program={rewardsData.program} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {IS_USER_CONNECTED ? (
            <ActivitySection activity={MOCK_USER_ACTIVITY} />
          ) : (
            <StartEarningCTA />
          )}
        </div>
        {IS_USER_CONNECTED && (
          <div className="lg:col-span-1">
            <MonthlyRewardSummary
              activity={MOCK_USER_ACTIVITY}
              programName={rewardsData.program.name}
            />
          </div>
        )}
      </div>
      {activityData && <ActivityFeed items={activityData.items} />}
      <FAQSection items={rewardsData.faqItems} />
      <RewardsLeaderboard />
    </div>
  );
}
