import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ExternalLink, Users, DollarSign, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ecosystem } from "@/types";

interface EcosystemDetailHeroProps {
  ecosystem: Ecosystem;
}

const CATEGORY_COLORS: Record<string, string> = {
  DeFi: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  NFT: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Gaming: "bg-green-500/10 text-green-600 border-green-500/20",
  Infrastructure: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Social: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  DAO: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
};

function formatTVL(tvl: number): string {
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(0)}K`;
  return `$${tvl}`;
}

export default function EcosystemDetailHero({ ecosystem }: EcosystemDetailHeroProps) {
  const launchYear = new Date(ecosystem.launchDate).getFullYear();

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link
        href="/ecosystems"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Back to ecosystems list"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Ecosystems
      </Link>

      {/* Hero card */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Logo */}
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-muted">
            <Image
              src={ecosystem.logoUrl}
              alt={`${ecosystem.name} logo`}
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{ecosystem.name}</h1>
              {ecosystem.isVerified && (
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" aria-label="Verified project" title="Verified project" />
              )}
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  CATEGORY_COLORS[ecosystem.category] ?? "bg-muted text-muted-foreground"
                }`}
              >
                {ecosystem.category}
              </span>
              {ecosystem.isFeatured && (
                <Badge className="text-xs">Featured</Badge>
              )}
            </div>
            <p className="text-sm text-foreground leading-relaxed max-w-xl">
              {ecosystem.description}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 pt-1 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-semibold text-foreground">{ecosystem.builderCount}</span>
            <span>builders</span>
          </div>
          {ecosystem.tvl !== null && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="font-semibold text-foreground">{formatTVL(ecosystem.tvl)}</span>
              <span>TVL</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Launched {launchYear}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
            <a
              href={ecosystem.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${ecosystem.name} project (opens in new tab)`}
            >
              Visit Project
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
