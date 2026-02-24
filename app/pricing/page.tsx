"use client";

import React, { useState } from "react";
import PricingHeader from "@/components/pricing/PricingHeader";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingGrid from "@/components/pricing/PricingGrid";
import FeatureComparisonTable from "@/components/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import EnterpriseCallout from "@/components/pricing/EnterpriseCallout";
import TrustBar from "@/components/pricing/TrustBar";
import { Separator } from "@/components/ui/separator";
import {
  PRICING_TIERS,
  PRICING_FEATURES,
  PRICING_FAQ,
} from "@/lib/mock-data";
import type { BillingCycle } from "@/types";

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

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
        <PricingGrid tiers={PRICING_TIERS} billing={billing} />

        <Separator />

        {/* Full feature comparison */}
        <FeatureComparisonTable features={PRICING_FEATURES} />

        <Separator />

        {/* Enterprise callout */}
        <EnterpriseCallout />

        {/* FAQ */}
        <PricingFAQ items={PRICING_FAQ} />
      </div>
    </div>
  );
}
