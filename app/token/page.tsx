import React from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Shield, TrendingUp, Globe } from "lucide-react";

const STATS = [
  { label: "Total Supply", value: "1.818B STX" },
  { label: "Network", value: "Stacks L2" },
  { label: "Settlement", value: "Bitcoin" },
  { label: "Consensus", value: "Proof of Transfer" },
];

const USE_CASES = [
  {
    icon: Zap,
    title: "Builder Rewards",
    description:
      "Active builders on the Stacks network earn $STX every month through Buildr. The more you build, the more you earn.",
  },
  {
    icon: Shield,
    title: "Smart Contract Fees",
    description:
      "STX is used to pay for deploying and executing Clarity smart contracts on the Stacks blockchain.",
  },
  {
    icon: TrendingUp,
    title: "DeFi & Stacking",
    description:
      "Stack STX to earn BTC yield through the Proof of Transfer consensus mechanism, or use it in Stacks DeFi protocols.",
  },
  {
    icon: Globe,
    title: "Ecosystem Currency",
    description:
      "STX powers NFT marketplaces, DAO governance, gaming economies, and the broader Stacks ecosystem.",
  },
];

export default function TokenPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-12">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">STX Token</h1>
        <p className="text-muted-foreground text-lg">
          The native token powering the Stacks Bitcoin L2 network — and your builder rewards.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map(({ label, value }) => (
          <div key={label} className="rounded-lg border p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
            <p className="font-bold text-sm">{value}</p>
          </div>
        ))}
      </div>

      {/* What is STX */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What is STX?</h2>
        <p className="text-muted-foreground">
          STX (Stacks) is the native cryptocurrency of the Stacks blockchain — a Bitcoin Layer 2 network
          that brings smart contracts and decentralised applications to Bitcoin. Unlike other L2 solutions,
          Stacks settles all transactions directly on the Bitcoin blockchain, inheriting Bitcoin&apos;s
          unparalleled security and finality.
        </p>
        <p className="text-muted-foreground">
          Buildr uses STX to reward developers who actively contribute to the Stacks ecosystem through
          smart contract deployments, open-source development, and ecosystem participation.
        </p>
      </section>

      {/* Use cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How STX is Used</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {USE_CASES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-lg border p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Where to get STX */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Where to Get STX</h2>
        <p className="text-muted-foreground">
          STX is available on major cryptocurrency exchanges and can be stored in Stacks-compatible
          wallets. To connect your wallet to Buildr and start earning rewards, you&apos;ll need a Stacks
          wallet with a valid SP... address.
        </p>
        <Link
          href="/connect"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Zap className="h-4 w-4" />
          Connect your wallet
        </Link>
      </section>
    </div>
  );
}
