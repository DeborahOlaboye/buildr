"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-7">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          An unexpected error occurred. You can try again or head back to the
          home page.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} className="gap-1.5">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-1.5" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
