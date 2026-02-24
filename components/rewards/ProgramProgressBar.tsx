import React from "react";
import type { RewardProgram } from "@/types";

interface ProgramProgressBarProps {
  program: RewardProgram;
}

function getDayProgress(start: string, end: string): number {
  const now = new Date();
  const s = new Date(start);
  const e = new Date(end);
  const total = e.getTime() - s.getTime();
  const elapsed = now.getTime() - s.getTime();
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

function getDaysRemaining(end: string): number {
  const now = new Date();
  const e = new Date(end);
  const diff = e.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function ProgramProgressBar({ program }: ProgramProgressBarProps) {
  const progress = getDayProgress(program.startDate, program.endDate);
  const daysLeft = getDaysRemaining(program.endDate);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{new Date(program.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        <span className="font-medium text-foreground">
          {daysLeft > 0 ? `${daysLeft} days remaining` : "Program ended"}
        </span>
        <span>{new Date(program.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
