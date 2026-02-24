import React from "react";
import PricingCard from "./PricingCard";
import type { BillingCycle, PricingTier } from "@/types";

interface PricingGridProps {
  tiers: PricingTier[];
  billing: BillingCycle;
}

export default function PricingGrid({ tiers, billing }: PricingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {tiers.map((tier) => (
        <PricingCard key={tier.id} tier={tier} billing={billing} />
      ))}
    </div>
  );
}
