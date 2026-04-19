import React from "react";
import Image from "next/image";
import { Users, ExternalLink, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Ecosystem } from "@/types";

interface FeaturedEcosystemCardProps {
  ecosystem: Ecosystem;
}

const CATEGORY_VARIANT: Record<string, Parameters<typeof Badge>[0]["variant"]> = {
  DeFi: "defi",
  NFT: "nft",
  Gaming: "gaming",
  Infrastructure: "infrastructure",
  Social: "social",
  DAO: "dao",
};

function formatTVL(tvl: number): string {
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(0)}K`;
  return `$${tvl}`;
}

export default function FeaturedEcosystemCard({ ecosystem }: FeaturedEcosystemCardProps) {
  const variant = CATEGORY_VARIANT[ecosystem.category] ?? "secondary";

  return (
    <div
      role="article"
      aria-labelledby={`featured-ecosystem-${ecosystem.id}`}
      className={cn(
        "relative rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5 flex flex-col gap-4",
        "hover:border-primary/40 hover:shadow-lg transition-all duration-200"
      )}
    >
      {/* Featured badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary" aria-hidden="true">
        <Star className="h-3 w-3 fill-current" />
        Featured
      </div>

      {/* Logo + name */}
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-muted border-2 border-primary/10 flex-shrink-0">
          <Image
            src={ecosystem.logoUrl}
            alt={ecosystem.name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/fallback-avatar.svg";
            }}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 id={`featured-ecosystem-${ecosystem.id}`} className="font-bold text-base">{ecosystem.name}</h3>
            {ecosystem.isVerified && (
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            )}
          </div>
          <Badge variant={variant} className="text-xs mt-1">
            {ecosystem.category}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {ecosystem.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Builders</p>
          <p className="font-bold flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            {ecosystem.builderCount}
          </p>
        </div>
        {ecosystem.tvl !== null && (
          <div>
            <p className="text-xs text-muted-foreground">TVL</p>
            <p className="font-bold">{formatTVL(ecosystem.tvl)}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button size="sm" className="w-full gap-2 mt-auto" asChild>
        <a
          href={ecosystem.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${ecosystem.name} project (opens in new tab)`}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          View Project
        </a>
      </Button>
    </div>
  );
}
