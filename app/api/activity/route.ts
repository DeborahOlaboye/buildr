import { NextRequest, NextResponse } from "next/server";
import { MOCK_ACTIVITY_FEED } from "@/lib/mock-data";
import type { ActivityApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10))
  );

  const items = MOCK_ACTIVITY_FEED.slice(0, limit);

  const body: ActivityApiResponse = { items };
  return NextResponse.json(body);
}
