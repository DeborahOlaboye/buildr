import React from "react";
import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded bg-muted", className)} />
  );
}

function ResultRowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      <Shimmer className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-3 w-48" />
      </div>
      <Shimmer className="h-5 w-16 rounded-full" />
    </div>
  );
}

export default function SearchLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Builders section */}
      <div className="space-y-3">
        <Shimmer className="h-5 w-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <ResultRowSkeleton key={i} />
        ))}
      </div>
      {/* Ecosystems section */}
      <div className="space-y-3">
        <Shimmer className="h-5 w-28" />
        {Array.from({ length: 2 }).map((_, i) => (
          <ResultRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
