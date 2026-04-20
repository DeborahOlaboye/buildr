import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: "full" | "3/4" | "2/3" | "1/2";
}

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-md", className)} />;
}

export default function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = "2/3",
}: SkeletonTextProps) {
  const widthMap = {
    full: "w-full",
    "3/4": "w-3/4",
    "2/3": "w-2/3",
    "1/2": "w-1/2",
  };

  return (
    <div
      className={cn("space-y-2", className)}
      aria-busy="true"
      aria-label="Loading text"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn("h-3", i === lines - 1 ? widthMap[lastLineWidth] : "w-full")}
        />
      ))}
    </div>
  );
}
