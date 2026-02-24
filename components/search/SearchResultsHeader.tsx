import React from "react";

interface SearchResultsHeaderProps {
  query: string;
  total: number;
  isLoading: boolean;
}

export default function SearchResultsHeader({
  query,
  total,
  isLoading,
}: SearchResultsHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">
        Search results
      </h1>
      {query && !isLoading && (
        <p className="text-muted-foreground text-sm">
          {total > 0 ? (
            <>
              <span className="font-semibold text-foreground">{total}</span>{" "}
              result{total !== 1 ? "s" : ""} for{" "}
              <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <>
              No results for{" "}
              <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </p>
      )}
      {isLoading && query && (
        <p className="text-muted-foreground text-sm">
          Searching for <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>…
        </p>
      )}
    </div>
  );
}
