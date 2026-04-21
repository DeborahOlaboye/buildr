import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import HighlightMatch from "@/components/search/HighlightMatch";
import type { EcosystemSearchResult } from "@/types";

interface Props {
  result: EcosystemSearchResult;
  query: string;
}

export default function EcosystemSearchResultRow({ result, query }: Props) {
  return (
    <li role="listitem">
    <Link
      href={`/ecosystems/${result.slug}`}
      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
    >
      <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={result.logoUrl}
          alt={result.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
            <HighlightMatch text={result.name} query={query} />
          </span>
          {result.isVerified && (
            <ShieldCheck className="h-3.5 w-3.5 text-primary flex-shrink-0" aria-hidden="true" />
          )}
          {result.isFeatured && (
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 flex-shrink-0" aria-hidden="true" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            <HighlightMatch text={result.category} query={query} />
          </Badge>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-xs font-semibold tabular-nums">
          {result.builderCount.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">builders</p>
      </div>
    </Link>
    </li>
  );
}
