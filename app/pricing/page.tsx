"use client";

import React, { useState, useEffect, useCallback } from "react";
import PricingHeader from "@/components/pricing/PricingHeader";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingGrid from "@/components/pricing/PricingGrid";
import FeatureComparisonTable from "@/components/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import EnterpriseCallout from "@/components/pricing/EnterpriseCallout";
import TrustBar from "@/components/pricing/TrustBar";
import SkeletonPricingCard from "@/components/shared/SkeletonPricingCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { fetchPricing } from "@/lib/api-client";
import type { BillingCycle, PricingApiResponse } from "@/types";

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [data, setData] = useState<PricingApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchPricing();
      setData(result);
    } catch {
      setError("Failed to load pricing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (isLoading) {
    return (
      <div className="pricing-page-root min-h-screen" aria-busy="true">
        <div className="container max-w-5xl mx-auto px-4 py-14 space-y-16">
          <div className="text-center space-y-3">
            <div className="skeleton-shimmer h-10 w-64 mx-auto rounded-md" aria-hidden="true" />
            <div className="skeleton-shimmer h-5 w-96 mx-auto rounded-md" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonPricingCard key={i} />
            ))}
          </div>
        </div>
        <span className="sr-only" aria-live="polite">Loading pricing information</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pricing-page-root min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">{error ?? "Something went wrong."}</p>
          <Button variant="outline" size="sm" onClick={load}>Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-page-root min-h-screen">
      <div className="container max-w-5xl mx-auto px-4 py-14 space-y-16">
        {/* Hero header */}
        <PricingHeader />

        {/* Billing toggle + trust bar */}
        <div className="flex flex-col items-center gap-6">
          <BillingToggle value={billing} onChange={setBilling} />
          <TrustBar />
        </div>

        {/* Tier cards */}
        <PricingGrid tiers={data.tiers} billing={billing} />

        <Separator />

        {/* Full feature comparison */}
        <FeatureComparisonTable features={data.features} />

        <Separator />

        {/* Enterprise callout */}
        <EnterpriseCallout />

        {/* FAQ */}
        <PricingFAQ items={data.faq} />
      </div>
    </div>
  );
}
