"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchResultsHeader from "@/components/search/SearchResultsHeader";
import SearchResultsSection from "@/components/search/SearchResultsSection";
import BuilderSearchResultRow from "@/components/search/BuilderSearchResultRow";
import EcosystemSearchResultRow from "@/components/search/EcosystemSearchResultRow";
import SearchEmptyState from "@/components/search/SearchEmptyState";
import SearchLoadingSkeleton from "@/components/search/SearchLoadingSkeleton";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchSuggestions from "@/components/search/SearchSuggestions";
import type { SearchApiResponse } from "@/types";

const MAX_QUERY_LENGTH = 100;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchApiResponse | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const runSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults(null);
      setSearchError(null);
      return;
    }
    setIsLoading(true);
    setSearchError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Search failed (${res.status})`);
      }
      const data: SearchApiResponse = await res.json();
      setResults(data);
    } catch (err: unknown) {
      setSearchError(err instanceof Error ? err.message : "Search failed. Please try again.");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setInputValue(q);
    runSearch(q);
  }, [searchParams, runSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val.length <= MAX_QUERY_LENGTH) {
      setInputValue(val);
    }
  }

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
    setSearchError(null);
    router.push("/search");
  }

  const query = searchParams.get("q") ?? "";

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 space-y-8">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search builders, ecosystems…"
            className="pl-9 pr-9"
            aria-label="Search"
            maxLength={MAX_QUERY_LENGTH}
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <Button type="submit" size="sm">Search</Button>
      </form>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {!isLoading && !searchError && results && `Found ${results.total} result${results.total === 1 ? "" : "s"} for ${query}`}
        {!isLoading && searchError && `Search error: ${searchError}`}
      </div>

      <SearchResultsHeader
        query={query}
        total={results?.total ?? 0}
        isLoading={isLoading}
      />

      {isLoading && <SearchLoadingSkeleton />}

      {!isLoading && searchError && (
        <ErrorMessage
          message={searchError}
          onRetry={() => runSearch(query)}
        />
      )}

      {!isLoading && !searchError && results && results.total === 0 && (
        <SearchEmptyState query={query} />
      )}

      {!isLoading && !searchError && results && results.total > 0 && (
        <div className="space-y-8" aria-live="polite">
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

      {!isLoading && !searchError && !results && !query && <SearchSuggestions />}
    </div>
  );
}
