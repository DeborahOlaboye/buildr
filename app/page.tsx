import React from "react";
import RewardsBanner from "@/components/rewards/RewardsBanner";
import ActivitySection from "@/components/rewards/ActivitySection";
import MonthlyRewardSummary from "@/components/rewards/MonthlyRewardSummary";
import StartEarningCTA from "@/components/rewards/StartEarningCTA";
import ProgramProgressBar from "@/components/rewards/ProgramProgressBar";
import FAQSection from "@/components/rewards/FAQSection";
import RewardsLeaderboard from "@/components/rewards/RewardsLeaderboard";
import ActivityFeed from "@/components/rewards/ActivityFeed";
import { CURRENT_REWARD_PROGRAM, MOCK_USER_ACTIVITY, FAQ_ITEMS, MOCK_ACTIVITY_FEED } from "@/lib/mock-data";

const IS_USER_CONNECTED =
  MOCK_USER_ACTIVITY.wallet.status === "connected" &&
  MOCK_USER_ACTIVITY.github.status === "connected";

export default function RewardsPage() {
  return (
    <div className="container py-8 space-y-10">
      <RewardsBanner program={CURRENT_REWARD_PROGRAM} />
      <ProgramProgressBar program={CURRENT_REWARD_PROGRAM} />
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
              programName={CURRENT_REWARD_PROGRAM.name}
            />
          </div>
        )}
      </div>
      <ActivityFeed items={MOCK_ACTIVITY_FEED} />
      <FAQSection items={FAQ_ITEMS} />
      <RewardsLeaderboard />
    </div>
  );
}
