import React from "react";
import Image from "next/image";
import { Users, ExternalLink, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ecosystem } from "@/types";

interface EcosystemCardProps {
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

export default function EcosystemCard({ ecosystem }: EcosystemCardProps) {
  const variant = CATEGORY_VARIANT[ecosystem.category] ?? "secondary";

  return (
    <Card className="group flex flex-col h-full hover:shadow-md transition-all duration-200 hover:-translate-y-0.5" role="article" aria-labelledby={`ecosystem-${ecosystem.id}`}>
      <CardContent className="flex flex-col gap-3 p-5 flex-1">
        {/* Logo + name row */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-muted flex-shrink-0 border">
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
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span id={`ecosystem-${ecosystem.id}`} className="font-semibold text-sm truncate">{ecosystem.name}</span>
              {ecosystem.isVerified && (
                <ShieldCheck className="h-3.5 w-3.5 text-primary flex-shrink-0" aria-hidden="true" />
              )}
            </div>
            <Badge variant={variant} className="text-[10px] mt-0.5">
              {ecosystem.category}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {ecosystem.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-foreground">{ecosystem.builderCount}</span>
            {" "}builders
          </span>
          {ecosystem.tvl !== null && (
            <span>
              TVL{" "}
              <span className="font-medium text-foreground">{formatTVL(ecosystem.tvl)}</span>
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 text-xs"
          asChild
        >
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
      </CardFooter>
    </Card>
  );
}
