export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_ACTIVITY_FEED } from "@/lib/mock-data";
import { apiError, parseIntParam, clamp } from "@/lib/api-helpers";
import type { ActivityApiResponse } from "@/types";

export async function GET(request: NextRequest): Promise<NextResponse<ActivityApiResponse | { error: string; status: number }>> {
  try {
    const { searchParams } = request.nextUrl;
    const limit = clamp(parseIntParam(searchParams.get("limit"), 20), 1, 100);

    const items = MOCK_ACTIVITY_FEED.slice(0, limit);

    const body: ActivityApiResponse = { items };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
    });
  } catch (err) {
    console.error("[GET /api/activity]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
