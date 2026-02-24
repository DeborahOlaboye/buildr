import React from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EcosystemEmptyStateProps {
  query: string;
  category: string;
  onClear: () => void;
}

export default function EcosystemEmptyState({
  query,
  category,
  onClear,
}: EcosystemEmptyStateProps) {
  const hasQuery = query.trim().length > 0;
  const hasCategory = category !== "All";

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">No ecosystems found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          {hasQuery && (
            <>
              No results for{" "}
              <span className="font-medium text-foreground">"{query}"</span>
              {hasCategory && (
                <> in <span className="font-medium text-foreground">{category}</span></>
              )}
              .
            </>
          )}
          {!hasQuery && hasCategory && (
            <>
              No ecosystems in the{" "}
              <span className="font-medium text-foreground">{category}</span> category yet.
            </>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onClear}>
          Clear filters
        </Button>
        {query.trim() && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/search?q=${encodeURIComponent(query.trim())}`}>
              Search everywhere
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
