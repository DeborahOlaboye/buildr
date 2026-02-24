"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchResultsHeader from "@/components/search/SearchResultsHeader";
import SearchResultsSection from "@/components/search/SearchResultsSection";
import BuilderSearchResultRow from "@/components/search/BuilderSearchResultRow";
import EcosystemSearchResultRow from "@/components/search/EcosystemSearchResultRow";
import SearchEmptyState from "@/components/search/SearchEmptyState";
import SearchLoadingSkeleton from "@/components/search/SearchLoadingSkeleton";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchApiResponse } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchApiResponse | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data: SearchApiResponse = await res.json();
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run search whenever the URL query param changes
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setInputValue(q);
    runSearch(q);
  }, [searchParams, runSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  function handleClear() {
    setInputValue("");
    setResults(null);
    router.push("/search");
  }

  const query = searchParams.get("q") ?? "";

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 space-y-8">
      {/* Inline search bar so user can refine without going back to navbar */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search builders, ecosystems…"
            className="pl-9 pr-9"
            aria-label="Search"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" size="sm">Search</Button>
      </form>

      <SearchResultsHeader
        query={query}
        total={results?.total ?? 0}
        isLoading={isLoading}
      />

      {isLoading && <SearchLoadingSkeleton />}

      {!isLoading && results && results.total === 0 && (
        <SearchEmptyState query={query} />
      )}

      {!isLoading && results && results.total > 0 && (
        <div className="space-y-8">
          <SearchResultsSection title="Builders" count={results.builders.length}>
            {results.builders.map((b) => (
              <BuilderSearchResultRow key={b.id} result={b} query={query} />
            ))}
          </SearchResultsSection>

          <SearchResultsSection title="Ecosystems" count={results.ecosystems.length}>
            {results.ecosystems.map((e) => (
              <EcosystemSearchResultRow key={e.id} result={e} query={query} />
            ))}
          </SearchResultsSection>
        </div>
      )}

      {!isLoading && !results && !query && (
        <p className="text-muted-foreground text-sm text-center py-16">
          Start typing to search builders and ecosystems.
        </p>
      )}
    </div>
  );
}
