export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_ECOSYSTEMS, ECOSYSTEM_STATS } from "@/lib/mock-data";
import { apiError, parseIntParam, clamp } from "@/lib/api-helpers";
import type { EcosystemCategory, EcosystemsApiResponse, RowsPerPageOption } from "@/types";

const VALID_CATEGORIES: EcosystemCategory[] = [
  "All",
  "DeFi",
  "NFT",
  "Gaming",
  "Infrastructure",
  "Social",
  "DAO",
];

const VALID_LIMITS: RowsPerPageOption[] = [10, 25, 50];

function isEcosystemCategory(value: string): value is EcosystemCategory {
  return VALID_CATEGORIES.includes(value as EcosystemCategory);
}

function isRowsPerPageOption(value: number): value is RowsPerPageOption {
  return VALID_LIMITS.includes(value as RowsPerPageOption);
}

export async function GET(request: NextRequest): Promise<NextResponse<EcosystemsApiResponse | { error: string; status: number }>> {
  try {
  const { searchParams } = request.nextUrl;

  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const rawCategory = searchParams.get("category") ?? "All";
  const category: EcosystemCategory = isEcosystemCategory(rawCategory) ? rawCategory : "All";

  const page = clamp(parseIntParam(searchParams.get("page"), 1), 1, 10_000);
  const parsedLimit = parseIntParam(searchParams.get("limit"), 25);
  const limit: RowsPerPageOption = isRowsPerPageOption(parsedLimit) ? parsedLimit : 25;

  // Filter
  const filtered = MOCK_ECOSYSTEMS.filter((e) => {
    const matchesCategory = category === "All" || e.category === category;
    const matchesSearch =
      !search ||
      e.name.toLowerCase().includes(search) ||
      e.description.toLowerCase().includes(search) ||
      e.category.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  // Paginate
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  // Featured (always from full set, max 3)
  const featured = MOCK_ECOSYSTEMS.filter((e) => e.isFeatured).slice(0, 3);

  // Category counts
  const cats: EcosystemCategory[] = [
    "DeFi",
    "NFT",
    "Gaming",
    "Infrastructure",
    "Social",
    "DAO",
  ];
  const categoryCounts: Record<string, number> = {
    All: MOCK_ECOSYSTEMS.length,
  };
  for (const cat of cats) {
    categoryCounts[cat] = MOCK_ECOSYSTEMS.filter(
      (e) => e.category === cat
    ).length;
  }

  const body: EcosystemsApiResponse = {
    ecosystems: paginated,
    total: filtered.length,
    page,
    rowsPerPage: limit,
    featured,
    stats: ECOSYSTEM_STATS,
    categoryCounts,
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
  } catch (err) {
    console.error("[GET /api/ecosystems]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
