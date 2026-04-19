import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonPricingCardProps {
  className?: string;
}

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-md", className)} />;
}

export default function SkeletonPricingCard({ className }: SkeletonPricingCardProps) {
  return (
    <div
      className={cn("rounded-2xl border p-6 space-y-5", className)}
      aria-busy="true"
      aria-label="Loading pricing tier"
    >
      <div className="space-y-2">
        <Shimmer className="h-5 w-20" />
        <Shimmer className="h-3 w-40" />
      </div>
      <div className="space-y-1">
        <Shimmer className="h-9 w-28" />
        <Shimmer className="h-3 w-16" />
      </div>
      <Shimmer className="h-9 w-full rounded-lg" />
      <div className="space-y-2 pt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Shimmer className="h-4 w-4 rounded-full shrink-0" />
            <Shimmer className="h-3 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
