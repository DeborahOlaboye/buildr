import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewards — Buildr",
  description:
    "Track your Stacks builder score, earn $STX monthly rewards, and compete on the builder leaderboard.",
  keywords: [
    "Stacks rewards",
    "STX builder rewards",
    "Bitcoin L2 developer",
    "Clarity smart contract rewards",
    "Stacks leaderboard",
  ],
  openGraph: {
    title: "Buildr — Earn $STX Rewards for Building on Stacks",
    description:
      "Connect your wallet and GitHub to track your Stacks activity and earn monthly $STX rewards.",
    type: "website",
  },
  other: {
    "talentapp:project_verification":
      "3c7a971c1139d65b2ffe91b1c1d1ad3d686c14932151307db82526caf13ce1e6eb49561207afdbdd15c66d847a3b45ad8a742e4f18d256213f1009bc14477887",
  },
};
import RewardsBanner from "@/components/rewards/RewardsBanner";
import ActivitySection from "@/components/rewards/ActivitySection";
import MonthlyRewardSummary from "@/components/rewards/MonthlyRewardSummary";
import StartEarningCTA from "@/components/rewards/StartEarningCTA";
import ProgramProgressBar from "@/components/rewards/ProgramProgressBar";
import FAQSection from "@/components/rewards/FAQSection";
import RewardsLeaderboard from "@/components/rewards/RewardsLeaderboard";
import ActivityFeed from "@/components/rewards/ActivityFeed";
import {
  MOCK_USER_ACTIVITY,
  CURRENT_REWARD_PROGRAM,
  FAQ_ITEMS,
  MOCK_ACTIVITY_FEED,
} from "@/lib/mock-data";

const IS_USER_CONNECTED =
  MOCK_USER_ACTIVITY.wallet.status === "connected" &&
  MOCK_USER_ACTIVITY.github.status === "connected";

export default function RewardsPage() {
  const activityItems = MOCK_ACTIVITY_FEED.slice(0, 10);

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
      <ActivityFeed items={activityItems} />
      <FAQSection items={FAQ_ITEMS} />
      <RewardsLeaderboard />
    </div>
  );
}
