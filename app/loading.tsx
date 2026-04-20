import React from "react";
import SkeletonBanner from "@/components/shared/SkeletonBanner";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function RootLoading() {
  return (
    <div className="container py-8 space-y-10" aria-busy="true" aria-label="Loading page">
      <SkeletonBanner />
      <div className="h-2 rounded-full skeleton-shimmer w-full" aria-hidden="true" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} lines={3} showAvatar />
        ))}
      </div>
    </div>
  );
}
