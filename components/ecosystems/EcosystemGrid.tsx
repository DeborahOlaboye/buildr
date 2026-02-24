import React from "react";
import EcosystemCard from "./EcosystemCard";
import EcosystemEmptyState from "./EcosystemEmptyState";
import type { Ecosystem, EcosystemCategory } from "@/types";

interface EcosystemGridProps {
  ecosystems: Ecosystem[];
  query: string;
  category: EcosystemCategory;
  onClear: () => void;
}

export default function EcosystemGrid({
  ecosystems,
  query,
  category,
  onClear,
}: EcosystemGridProps) {
  if (ecosystems.length === 0) {
    return (
      <EcosystemEmptyState
        query={query}
        category={category}
        onClear={onClear}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ecosystems.map((ecosystem) => (
        <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
      ))}
    </div>
  );
}
