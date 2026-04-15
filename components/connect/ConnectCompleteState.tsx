import React from "react";
import Link from "next/link";
import { PartyPopper, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";

interface ConnectCompleteStateProps {
  walletAddress: string;
  githubHandle: string;
}

export default function ConnectCompleteState({
  walletAddress,
  githubHandle,
}: ConnectCompleteStateProps) {
  return (
    <div className="rounded-2xl border bg-card p-8 text-center space-y-6">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
        <PartyPopper className="h-8 w-8 text-primary" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Your wallet and GitHub are connected. Buildr will now track your onchain
          activity and contributions to calculate your $STX rewards.
        </p>
      </div>

      {/* Connected accounts summary */}
      <div className="inline-flex flex-col sm:flex-row gap-2 mx-auto">
        <div className="rounded-lg border bg-muted/40 px-4 py-2 text-left">
          <p className="text-xs text-muted-foreground">Wallet</p>
          <p className="text-sm font-mono font-medium">{truncateAddress(walletAddress)}</p>
        </div>
        <div className="rounded-lg border bg-muted/40 px-4 py-2 text-left">
          <p className="text-xs text-muted-foreground">GitHub</p>
          <p className="text-sm font-medium">@{githubHandle}</p>
        </div>
      </div>

      {/* CTA */}
      <Button className="gap-2 mx-auto" asChild>
        <Link href="/">
          <Zap className="h-4 w-4" />
          Go to Rewards Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
