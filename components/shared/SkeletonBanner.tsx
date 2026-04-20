import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonBannerProps {
  className?: string;
}

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-md", className)} />;
}

export default function SkeletonBanner({ className }: SkeletonBannerProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8 space-y-4",
        className
      )}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
        <div className="space-y-3 flex-1">
          <Shimmer className="h-5 w-24 rounded-full" />
          <Shimmer className="h-8 w-64" />
          <div className="flex gap-4">
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-4 w-24" />
          </div>
        </div>
        <div className="rounded-xl border p-5 space-y-2 min-w-[140px] text-center">
          <Shimmer className="h-5 w-5 mx-auto rounded-full" />
          <Shimmer className="h-8 w-20 mx-auto" />
          <Shimmer className="h-3 w-12 mx-auto" />
        </div>
      </div>
    </div>
  );
}
