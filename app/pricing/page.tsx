"use client";

import React, { useState, useEffect } from "react";
import PricingHeader from "@/components/pricing/PricingHeader";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingGrid from "@/components/pricing/PricingGrid";
import FeatureComparisonTable from "@/components/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import EnterpriseCallout from "@/components/pricing/EnterpriseCallout";
import TrustBar from "@/components/pricing/TrustBar";
import { Separator } from "@/components/ui/separator";
import { fetchPricing } from "@/lib/api-client";
import type { BillingCycle, PricingApiResponse } from "@/types";

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [data, setData] = useState<PricingApiResponse | null>(null);

  useEffect(() => {
    fetchPricing().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="pricing-page-root min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading pricing…</p>
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
