export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_ECOSYSTEMS, MOCK_BUILDERS } from "@/lib/mock-data";
import { apiError, badRequest, notFound } from "@/lib/api-helpers";
import type { EcosystemDetailApiResponse } from "@/types";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext): Promise<NextResponse<EcosystemDetailApiResponse | { error: string; status: number }>> {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return badRequest("Missing ecosystem slug");
    }

    const sanitised = slug.trim().toLowerCase();
    if (sanitised.length === 0) {
      return badRequest("Invalid ecosystem slug");
    }

    const ecosystem = MOCK_ECOSYSTEMS.find(
      (e) => e.slug.toLowerCase() === sanitised
    );

    if (!ecosystem) {
      return notFound(`Ecosystem '${sanitised}'`);
    }

    const builders = MOCK_BUILDERS.filter((b) =>
      b.ecosystem.includes(ecosystem.category)
    ).sort((a, b) => a.rank - b.rank);

    const body: EcosystemDetailApiResponse = { ecosystem, builders };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("[GET /api/ecosystems/[slug]]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
