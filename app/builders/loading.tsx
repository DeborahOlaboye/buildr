import React from "react";
import SkeletonCard from "@/components/shared/SkeletonCard";
import SkeletonRow from "@/components/shared/SkeletonRow";

export default function BuildersLoading() {
  return (
    <div className="container py-8 space-y-6" aria-busy="true" aria-label="Loading builders">
      <div className="space-y-1">
        <div className="skeleton-shimmer h-8 w-32 rounded-md" />
        <div className="skeleton-shimmer h-4 w-64 rounded-md" />
      </div>

      <div className="flex gap-3">
        <div className="skeleton-shimmer h-10 flex-1 max-w-sm rounded-md" />
        <div className="skeleton-shimmer h-10 w-32 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} showAvatar lines={2} />
        ))}
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonRow key={i} cols={5} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
