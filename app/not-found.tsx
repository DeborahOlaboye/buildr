import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you were looking for doesn't exist on Buildr.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      {/* Large 404 */}
      <div className="space-y-2">
        <div className="relative inline-block">
          <span className="text-[8rem] font-extrabold tracking-tighter leading-none text-muted/60 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Zap className="h-7 w-7" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          This page doesn&apos;t exist on Buildr. It may have been moved, deleted,
          or you may have followed a broken link.
        </p>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-1.5" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/builders">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            View Builders
          </Link>
        </Button>
      </div>

      {/* Tip */}
      <p className="text-xs text-muted-foreground">
        Looking for a builder?{" "}
        <Link href="/builders" className="text-primary hover:underline">
          Search the leaderboard →
        </Link>
      </p>
    </div>
  );
}
