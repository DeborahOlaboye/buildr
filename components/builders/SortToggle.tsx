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
      role="radiogroup"
      aria-label="Sort leaderboard by"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              const next = OPTIONS[(OPTIONS.findIndex((o) => o.value === value) + 1) % OPTIONS.length];
              onChange(next.value);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              const prev = OPTIONS[(OPTIONS.findIndex((o) => o.value === value) - 1 + OPTIONS.length) % OPTIONS.length];
              onChange(prev.value);
            }
          }}
          tabIndex={value === opt.value ? 0 : -1}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
