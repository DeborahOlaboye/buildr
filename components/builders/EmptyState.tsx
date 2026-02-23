import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export default function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">No results found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          No builders matched{" "}
          <span className="font-medium text-foreground">"{query}"</span>.
          Try a different name or handle.
        </p>
      </div>
      <Button variant="outline" onClick={onClear}>
        Clear search
      </Button>
    </div>
  );
}
