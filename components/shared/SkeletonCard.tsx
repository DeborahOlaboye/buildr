import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-md", className)} />;
}

export default function SkeletonCard({
  className,
  lines = 2,
  showAvatar = false,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 space-y-3",
        className
      )}
      aria-busy="true"
      aria-label="Loading content"
    >
      {/* Optional avatar + title row */}
      <div className="flex items-center gap-3">
        {showAvatar && (
          <Shimmer className="h-10 w-10 rounded-full shrink-0" />
        )}
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-3/4" />
          <Shimmer className="h-3 w-1/2" />
        </div>
      </div>

      {/* Body lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}
