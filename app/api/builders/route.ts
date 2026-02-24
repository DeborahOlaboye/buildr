import { NextRequest, NextResponse } from "next/server";
import { MOCK_BUILDERS, TOTAL_BUILDERS } from "@/lib/mock-data";
import type { BuildersApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const sort = searchParams.get("sort") === "alltime" ? "alltime" : "monthly";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = [10, 25, 50].includes(parseInt(searchParams.get("limit") ?? "10", 10))
    ? parseInt(searchParams.get("limit") ?? "10", 10)
    : 10;

  // Filter by search query
  const filtered = search
    ? MOCK_BUILDERS.filter(
        (b) =>
          b.name.toLowerCase().includes(search) ||
          b.handle.toLowerCase().includes(search) ||
          b.ecosystem.some((e) => e.toLowerCase().includes(search))
      )
    : MOCK_BUILDERS;

  // Sort
  const sorted = [...filtered].sort((a, b) =>
    sort === "monthly"
      ? b.monthlyReward - a.monthlyReward
      : b.allTimeReward - a.allTimeReward
  );

  // Paginate
  const start = (page - 1) * limit;
  const paginated = sorted.slice(start, start + limit);

  // Top 3 by monthly reward (always from unfiltered set)
  const topThree = [...MOCK_BUILDERS]
    .sort((a, b) => b.monthlyReward - a.monthlyReward)
    .slice(0, 3);

  const body: BuildersApiResponse = {
    builders: paginated,
    total: search ? filtered.length : TOTAL_BUILDERS,
    page,
    rowsPerPage: limit,
    topThree,
  };

  return NextResponse.json(body);
}
