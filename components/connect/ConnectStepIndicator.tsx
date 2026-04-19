import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
}

interface ConnectStepIndicatorProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  completedSteps: number[]; // 0-indexed list of completed step indices
}

export default function ConnectStepIndicator({
  steps,
  currentStep,
  completedSteps,
}: ConnectStepIndicatorProps) {
  return (
    <nav aria-label="Registration steps" className="flex items-center justify-center gap-0">
      <ol className="flex items-center gap-0">
      {steps.map((step, idx) => {
        const isCompleted = completedSteps.includes(idx);
        const isActive = idx === currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={step.label}>
            <li className="flex flex-col items-center gap-1.5">
              <div
                aria-current={isActive ? "step" : undefined}
                aria-label={
                  isCompleted
                    ? `${step.label} — completed`
                    : isActive
                    ? `${step.label} — current step`
                    : `${step.label} — upcoming`
                }
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground/30 bg-transparent text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  <span aria-hidden="true">{idx + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                aria-hidden="true"
              >
                {step.label}
              </span>
            </li>

            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  "h-0.5 w-16 sm:w-24 mb-5 mx-1 transition-all",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
      </ol>
    </nav>
  );
}
