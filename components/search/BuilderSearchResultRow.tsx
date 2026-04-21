import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatSTX } from "@/lib/utils";
import HighlightMatch from "@/components/search/HighlightMatch";
import type { BuilderSearchResult } from "@/types";

interface Props {
  result: BuilderSearchResult;
  query: string;
}

export default function BuilderSearchResultRow({ result, query }: Props) {
  return (
    <li role="listitem">
    <Link
      href={`/builders/${result.handle}`}
      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
    >
      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={result.avatarUrl}
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
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-muted-foreground">
            @<HighlightMatch text={result.handle} query={query} />
          </span>
          {result.ecosystem.slice(0, 2).map((e) => (
            <Badge key={e} variant="secondary" className="text-xs px-1.5 py-0">
              <HighlightMatch text={e} query={query} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-xs font-semibold tabular-nums">
          {formatSTX(result.monthlyReward)} STX
        </p>
        <p className="text-xs text-muted-foreground">Rank #{result.rank}</p>
      </div>
    </Link>
    </li>
  );
}
