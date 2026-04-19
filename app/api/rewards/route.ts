export const runtime = 'edge';
import { NextResponse } from "next/server";
import { CURRENT_REWARD_PROGRAM, MOCK_BUILDERS, FAQ_ITEMS } from "@/lib/mock-data";
import type { RewardsApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<RewardsApiResponse>> {
  const topBuilders = [...MOCK_BUILDERS]
    .sort((a, b) => b.monthlyReward - a.monthlyReward)
    .slice(0, 10);

  const body: RewardsApiResponse = {
    program: CURRENT_REWARD_PROGRAM,
    topBuilders,
    totalBuilders: MOCK_BUILDERS.length,
    faqItems: FAQ_ITEMS,
  };

  return NextResponse.json(body);
}
