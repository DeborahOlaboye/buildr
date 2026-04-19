"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EcosystemCategory } from "@/types";

const CATEGORIES: EcosystemCategory[] = [
  "All",
  "DeFi",
  "NFT",
  "Gaming",
  "Infrastructure",
  "Social",
  "DAO",
];

interface EcosystemCategoryTabsProps {
  value: EcosystemCategory;
  onChange: (category: EcosystemCategory) => void;
  counts: Record<EcosystemCategory, number>;
}

export default function EcosystemCategoryTabs({
  value,
  onChange,
  counts,
}: EcosystemCategoryTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as EcosystemCategory)}
    >
      <TabsList className="h-auto flex-wrap gap-1 p-1 w-full sm:w-auto" aria-label="Filter by ecosystem category">
        {CATEGORIES.map((cat) => (
          <TabsTrigger
            key={cat}
            value={cat}
            className="text-xs px-3 py-1.5 gap-1.5"
          >
            {cat}
            <span
              className="rounded-full bg-muted-foreground/10 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
              aria-label={`${counts[cat]} ecosystem${counts[cat] === 1 ? "" : "s"}`}
            >
              {counts[cat]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
