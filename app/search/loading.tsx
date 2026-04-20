import React from "react";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function SearchLoading() {
  return (
    <div
      className="container max-w-2xl mx-auto py-10 px-4 space-y-8"
      aria-busy="true"
      aria-label="Loading search"
    >
      <div className="skeleton-shimmer h-10 w-full rounded-md" aria-hidden="true" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} showAvatar lines={2} />
        ))}
      </div>
    </div>
  );
}
