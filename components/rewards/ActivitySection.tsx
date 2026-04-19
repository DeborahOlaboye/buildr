"use client";

import React, { useState } from "react";
import { Wallet, Github, Code2, GitCommit, Eye } from "lucide-react";
import ConnectionCard from "./ConnectionCard";
import type { UserActivity } from "@/types";

interface ActivitySectionProps {
  activity: UserActivity;
}

export default function ActivitySection({ activity }: ActivitySectionProps) {
  const [walletStatus, setWalletStatus] = useState(activity.wallet.status);
  const [githubStatus, setGithubStatus] = useState(activity.github.status);

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h2 className="text-xl font-semibold">View my activity</h2>
      </div>
      <p className="text-sm text-muted-foreground -mt-2">
        See your tracked activity and rewards. Connect your Bitcoin L2 wallet
        and GitHub profile to start earning $STX.
      </p>

      {/* 4 connection cards — 2-column grid on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Stacks Wallet */}
        <ConnectionCard
          icon={<Wallet className="h-4 w-4" />}
          title="Stacks Wallet"
          subtitle="Connect your Bitcoin L2 wallet"
          status={walletStatus}
          statLabel={`Wallet${activity.wallet.count > 1 ? "s" : ""} Connected`}
          statValue={activity.wallet.count}
          onConnect={() => setWalletStatus("connected")}
          onDisconnect={() => setWalletStatus("disconnected")}
        />

        {/* GitHub */}
        <ConnectionCard
          icon={<Github className="h-4 w-4" />}
          title="GitHub"
          subtitle="Connect your GitHub profile"
          status={githubStatus}
          statLabel="Contributions"
          statValue={activity.github.contributions}
          onConnect={() => setGithubStatus("connected")}
          onDisconnect={() => setGithubStatus("disconnected")}
        />

        {/* Stacks Contracts — optional */}
        <ConnectionCard
          icon={<Code2 className="h-4 w-4" />}
          title="Stacks Contracts"
          subtitle="Deploy verified contracts on Stacks"
          status={walletStatus === "connected" ? "connected" : "disconnected"}
          optional
          statLabel="Contracts Deployed"
          statValue={activity.contractsDeployed}
        />

        {/* GitHub Contributions — optional */}
        <ConnectionCard
          icon={<GitCommit className="h-4 w-4" />}
          title="GitHub Contributions"
          subtitle="Contribute to public repos"
          status={githubStatus === "connected" ? "connected" : "disconnected"}
          optional
          statLabel="Contributions (Feb 1–28)"
          statValue={activity.github.contributions}
        />
      </div>
    </section>
  );
}
