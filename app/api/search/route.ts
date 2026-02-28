export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_BUILDERS, MOCK_ECOSYSTEMS } from "@/lib/mock-data";
import type {
  SearchApiResponse,
  BuilderSearchResult,
  EcosystemSearchResult,
} from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q")?.trim() ?? "";

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

  return NextResponse.json(body);
}
