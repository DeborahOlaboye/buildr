import React from "react";
import { Sparkles } from "lucide-react";
import FeaturedEcosystemCard from "./FeaturedEcosystemCard";
import type { Ecosystem } from "@/types";

interface FeaturedSectionProps {
  ecosystems: Ecosystem[];
}

export default function FeaturedSection({ ecosystems }: FeaturedSectionProps) {
  if (ecosystems.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Spotlight</h2>
        <span className="text-sm text-muted-foreground">
          — top ecosystems building on Stacks
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ecosystems.map((ecosystem) => (
          <FeaturedEcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
        ))}
      </div>
    </section>
  );
}
