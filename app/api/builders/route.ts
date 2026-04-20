export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_BUILDERS, TOTAL_BUILDERS } from "@/lib/mock-data";
import type { BuildersApiResponse, RowsPerPageOption, SortMode } from "@/types";

const VALID_LIMITS: RowsPerPageOption[] = [10, 25, 50];

function isRowsPerPageOption(value: number): value is RowsPerPageOption {
  return VALID_LIMITS.includes(value as RowsPerPageOption);
}

export async function GET(request: NextRequest): Promise<NextResponse<BuildersApiResponse>> {
  const { searchParams } = request.nextUrl;

  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const rawSort = searchParams.get("sort");
  const sort: SortMode = rawSort === "alltime" ? "alltime" : "monthly";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const parsedLimit = parseInt(searchParams.get("limit") ?? "10", 10);
  const limit: RowsPerPageOption = isRowsPerPageOption(parsedLimit) ? parsedLimit : 10;

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
