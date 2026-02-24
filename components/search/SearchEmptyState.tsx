import React from "react";
import { SearchX } from "lucide-react";

interface SearchEmptyStateProps {
  query: string;
}

export default function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold">No results for &ldquo;{query}&rdquo;</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Try a different keyword, a builder handle, or an ecosystem name like{" "}
          <span className="font-medium text-foreground">DeFi</span> or{" "}
          <span className="font-medium text-foreground">Alex</span>.
        </p>
      </div>
    </div>
  );
}
