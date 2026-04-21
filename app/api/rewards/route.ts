export const runtime = 'edge';
import { NextResponse } from "next/server";
import { CURRENT_REWARD_PROGRAM, MOCK_BUILDERS, FAQ_ITEMS } from "@/lib/mock-data";
import { apiError } from "@/lib/api-helpers";
import type { RewardsApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<RewardsApiResponse | { error: string; status: number }>> {
  try {
    const topBuilders = [...MOCK_BUILDERS]
      .sort((a, b) => b.monthlyReward - a.monthlyReward)
      .slice(0, 10);

    const body: RewardsApiResponse = {
      program: CURRENT_REWARD_PROGRAM,
      topBuilders,
      totalBuilders: MOCK_BUILDERS.length,
      faqItems: FAQ_ITEMS,
    };

    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[GET /api/rewards]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
