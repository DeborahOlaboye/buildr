import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonRowProps {
  cols?: number;
  className?: string;
}

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded", className)} />;
}

export default function SkeletonRow({ cols = 5, className }: SkeletonRowProps) {
  // Column width patterns to look like real data
  const widths = ["w-6", "w-32", "w-20", "w-16", "w-14"];

  return (
    <tr
      className={cn("border-b", className)}
      aria-busy="true"
      aria-label="Loading row"
    >
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <Shimmer
            className={cn("h-3", widths[i % widths.length])}
          />
        </td>
      ))}
    </tr>
  );
}
