"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { SortMode } from "@/types";

interface SortToggleProps {
  value: SortMode;
  onChange: (value: SortMode) => void;
}

const OPTIONS: { label: string; value: SortMode }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "All-time", value: "alltime" },
];

export default function SortToggle({ value, onChange }: SortToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-lg border bg-muted p-1 gap-1"
      role="group"
      aria-label="Sort leaderboard"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
            value === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
