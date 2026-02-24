import React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

const SUGGESTIONS = [
  "Alex",
  "DeFi",
  "NFT",
  "Clarity",
  "Gaming",
  "DAO",
  "Infrastructure",
  "Stacks",
];

export default function SearchSuggestions() {
  return (
    <div className="py-10 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="h-4 w-4" />
        <span>Popular searches</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((term) => (
          <Link
            key={term}
            href={`/search?q=${encodeURIComponent(term)}`}
            className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium hover:bg-muted hover:text-foreground text-muted-foreground transition-colors"
          >
            {term}
          </Link>
        ))}
      </div>
    </div>
  );
}
