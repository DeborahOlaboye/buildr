"use client";

import React from "react";
import Image from "next/image";
import {
  Github,
  Wallet,
  ShieldCheck,
  Code2,
  GitCommit,
  Trophy,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatSTX, truncateAddress } from "@/lib/utils";
import type { Builder } from "@/types";

interface BuilderProfileModalProps {
  builder: Builder | null;
  open: boolean;
  onClose: () => void;
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/40 p-3 gap-1">
      <div className="text-muted-foreground">{icon}</div>
      <span className="text-lg font-bold tabular-nums">{value}</span>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </div>
  );
}

export default function BuilderProfileModal({
  builder,
  open,
  onClose,
}: BuilderProfileModalProps) {
  if (!builder) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted flex-shrink-0 ring-2 ring-primary/20">
              <Image
                src={builder.avatarUrl}
                alt={builder.name}
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/fallback-avatar.svg";
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <DialogTitle className="text-lg">{builder.name}</DialogTitle>
                {builder.isVerified && (
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                )}
              </div>
              <DialogDescription className="text-sm">
                @{builder.handle}
              </DialogDescription>
            </div>
            <div className="ml-auto">
              <span className="text-2xl font-bold text-muted-foreground">
                #{builder.rank}
              </span>
            </div>
          </div>
        </DialogHeader>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed -mt-1">
          {builder.bio}
        </p>

        {/* Ecosystem tags */}
        <div className="flex flex-wrap gap-1.5">
          {builder.ecosystem.map((tag) => {
            const lc = tag.toLowerCase() as Parameters<typeof Badge>[0]["variant"];
            return (
              <Badge key={tag} variant={lc} className="text-xs">
                {tag}
              </Badge>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            icon={<Trophy className="h-4 w-4" aria-hidden="true" />}
            label="Monthly Reward"
            value={`${formatSTX(builder.monthlyReward)} STX`}
          />
          <StatCard
            icon={<Code2 className="h-4 w-4" aria-hidden="true" />}
            label="Contracts"
            value={builder.contractsDeployed}
          />
          <StatCard
            icon={<GitCommit className="h-4 w-4" aria-hidden="true" />}
            label="GH Contributions"
            value={builder.githubContributions}
          />
        </div>

        {/* Wallet */}
        <div className="rounded-lg border p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">Stacks Wallet</span>
            <code className="ml-auto text-xs text-muted-foreground font-mono">
              {truncateAddress(builder.walletAddress)}
            </code>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Github className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">GitHub</span>
            <a
              href={builder.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${builder.handle} GitHub profile (opens in new tab)`}
            >
              @{builder.handle}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* All-time */}
        <div className="flex items-center justify-between rounded-lg border bg-primary/5 p-3">
          <span className="text-sm font-medium">All-time Rewards</span>
          <span className="text-sm font-bold text-primary">
            {formatSTX(builder.allTimeReward)} $STX
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 gap-1.5" asChild>
            <a
              href={builder.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${builder.name} on GitHub (opens in new tab)`}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View GitHub
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
