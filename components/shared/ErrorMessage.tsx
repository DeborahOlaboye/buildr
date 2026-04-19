import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-8 text-center",
        className
      )}
    >
      <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
      <p className="text-sm text-destructive font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
