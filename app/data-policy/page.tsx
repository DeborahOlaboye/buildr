import React from "react";
import { Database, GitBranch, Wallet, BarChart3 } from "lucide-react";
import LegalPageHeader from "@/components/legal/LegalPageHeader";
import LegalLinksBar from "@/components/legal/LegalLinksBar";

const LAST_UPDATED = "February 1, 2025";

const DATA_SOURCES = [
  {
    icon: Wallet,
    title: "Stacks Blockchain",
    description: "Smart contract deployments, transaction history, and STX balances are read directly from the Stacks blockchain via public RPC nodes. This data is immutable and publicly available.",
  },
  {
    icon: GitBranch,
    title: "GitHub API",
    description: "Repository contributions, commit history, pull requests, and issue activity are fetched from the public GitHub API using your connected username. Only public repositories are counted.",
  },
  {
    icon: BarChart3,
    title: "Platform Analytics",
    description: "Page views, feature usage, and interaction patterns are collected to improve the platform. This data is aggregated and never sold to third parties.",
  },
  {
    icon: Database,
    title: "Buildr Database",
    description: "Your Buildr profile, reward history, and connection settings are stored in our secure database. This data can be deleted upon request.",
  },
];

export default function DataPolicyPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-3">
        <LegalPageHeader title="Data Policy" lastUpdated={LAST_UPDATED} />
        <p className="text-muted-foreground">
          Buildr is built on transparency. Here&apos;s a plain-language breakdown of exactly
          what data we collect, where it comes from, and how it&apos;s used.
        </p>
      </div>

      {/* Data sources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Data Sources</h2>
        <div className="grid gap-4">
          {DATA_SOURCES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 p-4 rounded-lg border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reward calculation */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How Rewards Are Calculated</h2>
        <p className="text-muted-foreground">
          Monthly $STX rewards are calculated using a weighted scoring system that considers:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Smart contract deployments</strong> — each deployed Clarity contract on Stacks mainnet earns points</li>
          <li><strong className="text-foreground">GitHub contributions</strong> — commits, PRs, and issues on Stacks-ecosystem repositories</li>
          <li><strong className="text-foreground">Ecosystem participation</strong> — activity in recognised Stacks DeFi, NFT, and infrastructure projects</li>
          <li><strong className="text-foreground">Consistency bonus</strong> — builders active across consecutive months receive a multiplier</li>
        </ul>
      </section>

      {/* Data refresh */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Data Refresh Frequency</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Data Type</th>
                <th className="px-4 py-3 text-left font-medium">Refresh Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Stacks onchain activity", "Every 10 minutes"],
                ["GitHub contributions", "Every 6 hours"],
                ["Leaderboard rankings", "Every 1 hour"],
                ["Reward calculations", "Daily at 00:00 UTC"],
                ["Ecosystem stats", "Every 24 hours"],
              ].map(([type, rate], i) => (
                <tr key={type} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                  <td className="px-4 py-3 text-muted-foreground">{type}</td>
                  <td className="px-4 py-3 font-medium">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Data deletion */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Data Deletion</h2>
        <p className="text-muted-foreground">
          You can request deletion of your Buildr profile and associated data at any time by contacting{" "}
          <span className="text-primary">privacy@buildr.app</span>. Note that blockchain data (wallet
          addresses, onchain transactions) cannot be removed from the public Stacks blockchain, but your
          Buildr profile will be deleted within 30 days of a verified request.
        </p>
      </section>

      <LegalLinksBar current="/data-policy" />
    </div>
  );
}
