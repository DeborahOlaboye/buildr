export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_ECOSYSTEMS, MOCK_BUILDERS } from "@/lib/mock-data";
import type { Ecosystem, Builder } from "@/types";

interface EcosystemDetailApiResponse {
  ecosystem: Ecosystem;
  builders: Builder[];
}

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;

  const ecosystem = MOCK_ECOSYSTEMS.find(
    (e) => e.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!ecosystem) {
    return NextResponse.json(
      { error: `Ecosystem '${slug}' not found` },
      { status: 404 }
    );
  }

  const builders = MOCK_BUILDERS.filter((b) =>
    b.ecosystem.includes(ecosystem.category)
  ).sort((a, b) => a.rank - b.rank);

  const body: EcosystemDetailApiResponse = { ecosystem, builders };
  return NextResponse.json(body);
}
