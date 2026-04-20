import React from "react";

interface SearchResultsSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

export default function SearchResultsSection({
  title,
  count,
  children,
}: SearchResultsSectionProps) {
  if (count === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <ul role="list" className="space-y-2">{children}</ul>
    </section>
  );
}
