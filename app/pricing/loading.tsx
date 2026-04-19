import React from "react";
import SkeletonPricingCard from "@/components/shared/SkeletonPricingCard";

export default function PricingLoading() {
  return (
    <div className="min-h-screen" aria-busy="true" aria-label="Loading pricing">
      <div className="container max-w-5xl mx-auto px-4 py-14 space-y-16">
        <div className="text-center space-y-3">
          <div className="skeleton-shimmer h-10 w-64 mx-auto rounded-md" />
          <div className="skeleton-shimmer h-5 w-96 mx-auto rounded-md" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="skeleton-shimmer h-10 w-44 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonPricingCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
