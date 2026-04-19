import React from "react";
import SkeletonCard from "@/components/shared/SkeletonCard";
import SkeletonStatBar from "@/components/shared/SkeletonStatBar";

export default function EcosystemsLoading() {
  return (
    <div className="container py-8 space-y-8" aria-busy="true" aria-label="Loading ecosystems">
      <div className="space-y-1">
        <div className="skeleton-shimmer h-8 w-36 rounded-md" />
        <div className="skeleton-shimmer h-4 w-80 rounded-md" />
      </div>

      <SkeletonStatBar stats={3} />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="skeleton-shimmer h-10 flex-1 rounded-md" />
        <div className="skeleton-shimmer h-10 w-40 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} lines={3} showAvatar />
        ))}
      </div>
    </div>
  );
}
