import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageHeaderProps {
  title: string;
  lastUpdated: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * Reusable header for legal/policy pages (Privacy, Terms, Data Policy).
 * Renders back link, title, and last updated date.
 */
export default function LegalPageHeader({
  title,
  lastUpdated,
  backHref = "/",
  backLabel = "Back to home",
}: LegalPageHeaderProps) {
  return (
    <div className="space-y-3">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
    </div>
  );
}
