export const runtime = 'edge';
import { NextResponse } from "next/server";
import { PRICING_TIERS, PRICING_FEATURES, PRICING_FAQ } from "@/lib/mock-data";
import { apiError } from "@/lib/api-helpers";
import type { PricingApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<PricingApiResponse | { error: string; status: number }>> {
  try {
    const body: PricingApiResponse = {
      tiers: PRICING_TIERS,
      features: PRICING_FEATURES,
      faq: PRICING_FAQ,
    };

    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch (err) {
    console.error("[GET /api/pricing]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
