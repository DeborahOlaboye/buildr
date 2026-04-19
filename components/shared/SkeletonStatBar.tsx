import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonStatBarProps {
  stats?: number;
  className?: string;
}

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-md", className)} />;
}

export default function SkeletonStatBar({ stats = 3, className }: SkeletonStatBarProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 flex flex-wrap gap-6",
        className
      )}
      aria-busy="true"
      aria-label="Loading statistics"
    >
      {Array.from({ length: stats }).map((_, i) => (
        <div key={i} className="space-y-1.5 min-w-[80px]">
          <Shimmer className="h-6 w-20" />
          <Shimmer className="h-3 w-14" />
        </div>
      ))}
    </div>
  );
}
