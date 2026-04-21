export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_BUILDERS, MOCK_ECOSYSTEMS } from "@/lib/mock-data";
import { apiError } from "@/lib/api-helpers";
import type {
  SearchApiResponse,
  BuilderSearchResult,
  EcosystemSearchResult,
} from "@/types";

const MAX_QUERY_LENGTH = 200;

export async function GET(request: NextRequest): Promise<NextResponse<SearchApiResponse | { error: string; status: number }>> {
  try {
  const { searchParams } = request.nextUrl;
  const rawQuery = searchParams.get("q")?.trim() ?? "";

  if (rawQuery.length > MAX_QUERY_LENGTH) {
    return apiError(`Query exceeds maximum length of ${MAX_QUERY_LENGTH} characters`, 400);
  }

  const query = rawQuery;

  if (!query) {
    const empty: SearchApiResponse = { query: "", builders: [], ecosystems: [], total: 0 };
    return NextResponse.json(empty);
  }

  const q = query.toLowerCase();

  const builders: BuilderSearchResult[] = MOCK_BUILDERS.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.handle.toLowerCase().includes(q) ||
      b.ecosystem.some((e) => e.toLowerCase().includes(q)) ||
      b.bio.toLowerCase().includes(q)
  ).map((b) => ({
    kind: "builder",
    id: b.id,
    handle: b.handle,
    name: b.name,
    avatarUrl: b.avatarUrl,
    rank: b.rank,
    monthlyReward: b.monthlyReward,
    isVerified: b.isVerified,
    ecosystem: b.ecosystem,
  }));

  const ecosystems: EcosystemSearchResult[] = MOCK_ECOSYSTEMS.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
  ).map((e) => ({
    kind: "ecosystem",
    id: e.id,
    slug: e.slug,
    name: e.name,
    logoUrl: e.logoUrl,
    category: e.category,
    builderCount: e.builderCount,
    isVerified: e.isVerified,
    isFeatured: e.isFeatured,
  }));

  const body: SearchApiResponse = {
    query,
    builders,
    ecosystems,
    total: builders.length + ecosystems.length,
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
  });
  } catch (err) {
    console.error("[GET /api/search]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
