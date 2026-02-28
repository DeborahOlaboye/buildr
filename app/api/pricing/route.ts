export const runtime = 'edge';
import { NextResponse } from "next/server";
import { PRICING_TIERS, PRICING_FEATURES, PRICING_FAQ } from "@/lib/mock-data";
import type { PricingApiResponse } from "@/types";

export async function GET() {
  const body: PricingApiResponse = {
    tiers: PRICING_TIERS,
    features: PRICING_FEATURES,
    faq: PRICING_FAQ,
  };

  return NextResponse.json(body);
}
