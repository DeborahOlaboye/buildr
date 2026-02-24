import { NextRequest, NextResponse } from "next/server";
import { MOCK_ECOSYSTEMS, ECOSYSTEM_STATS } from "@/lib/mock-data";
import type { EcosystemCategory, EcosystemsApiResponse } from "@/types";

const VALID_CATEGORIES: EcosystemCategory[] = [
  "All",
  "DeFi",
  "NFT",
  "Gaming",
  "Infrastructure",
  "Social",
  "DAO",
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const rawCategory = searchParams.get("category") ?? "All";
  const category: EcosystemCategory = VALID_CATEGORIES.includes(
    rawCategory as EcosystemCategory
  )
    ? (rawCategory as EcosystemCategory)
    : "All";

  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = [10, 25, 50].includes(parseInt(searchParams.get("limit") ?? "25", 10))
    ? parseInt(searchParams.get("limit") ?? "25", 10)
    : 25;

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

  return NextResponse.json(body);
}
