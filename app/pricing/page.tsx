"use client";

import React, { useState, useEffect, useCallback } from "react";
import PricingHeader from "@/components/pricing/PricingHeader";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingGrid from "@/components/pricing/PricingGrid";
import FeatureComparisonTable from "@/components/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import EnterpriseCallout from "@/components/pricing/EnterpriseCallout";
import TrustBar from "@/components/pricing/TrustBar";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { Separator } from "@/components/ui/separator";
import { fetchPricing } from "@/lib/api-client";
import type { BillingCycle, PricingApiResponse } from "@/types";

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [data, setData] = useState<PricingApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchPricing()
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load pricing.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (isLoading) {
    return (
      <div className="pricing-page-root min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground" aria-live="polite">Loading pricing…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pricing-page-root min-h-screen flex items-center justify-center px-4">
        <ErrorMessage
          message={error ?? "Pricing data is unavailable."}
          onRetry={load}
          className="max-w-sm w-full"
        />
      </div>
    );
  }

  return (
    <div className="pricing-page-root min-h-screen">
      <div className="container max-w-5xl mx-auto px-4 py-14 space-y-16">
        <PricingHeader />

        <div className="flex flex-col items-center gap-6">
          <BillingToggle value={billing} onChange={setBilling} />
          <TrustBar />
        </div>

        <PricingGrid tiers={data.tiers} billing={billing} />

        <Separator />

        <FeatureComparisonTable features={data.features} />

        <Separator />

        <EnterpriseCallout />

        <PricingFAQ items={data.faq} />
      </div>
    </div>
  );
}
