import React from "react";
import { ShieldCheck, Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { truncateAddress, getRankLabel } from "@/lib/utils";
import type { Builder } from "@/types";

interface BuilderProfileHeroProps {
  builder: Builder;
}

const ECOSYSTEM_COLORS: Record<string, string> = {
  DeFi: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  NFT: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Gaming: "bg-green-500/10 text-green-600 border-green-500/20",
  Infrastructure: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Social: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  DAO: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
};

export default function BuilderProfileHero({ builder }: BuilderProfileHeroProps) {
  const initials = builder.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link
        href="/builders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Back to builder leaderboard"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Leaderboard
      </Link>

      {/* Hero card */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <Avatar className="h-20 w-20 shrink-0">
            <AvatarImage src={builder.avatarUrl} alt={builder.name} />
            <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
          </Avatar>

          {/* Name + identifiers */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold truncate">{builder.name}</h1>
              {builder.isVerified && (
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" aria-label="Verified builder" />
              )}
              <Badge variant="secondary" className="text-xs">
                {getRankLabel(builder.rank)}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground font-mono">@{builder.handle}</p>

            <p className="text-sm text-foreground leading-relaxed max-w-xl">
              {builder.bio}
            </p>
          </div>
        </div>

        {/* Ecosystems */}
        {builder.ecosystem.length > 0 && (
          <ul role="list" aria-label="Ecosystems" className="flex flex-wrap gap-2">
            {builder.ecosystem.map((eco) => (
              <li
                key={eco}
                role="listitem"
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  ECOSYSTEM_COLORS[eco] ?? "bg-muted text-muted-foreground border-border"
                }`}
              >
                {eco}
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-md border bg-muted/50 px-3 py-1.5 text-xs font-mono text-muted-foreground">
            {truncateAddress(builder.walletAddress)}
          </span>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7" asChild>
            <a
              href={builder.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${builder.name} GitHub profile (opens in new tab)`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
              <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
