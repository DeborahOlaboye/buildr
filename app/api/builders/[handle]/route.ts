export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { MOCK_BUILDERS } from "@/lib/mock-data";
import { apiError, badRequest, notFound } from "@/lib/api-helpers";
import type { BuilderApiResponse } from "@/types";

interface RouteContext {
  params: Promise<{ handle: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext): Promise<NextResponse<BuilderApiResponse | { error: string; status: number }>> {
  try {
    const { handle } = await params;

    if (!handle || typeof handle !== "string") {
      return badRequest("Missing builder handle");
    }

    const sanitised = handle.trim().toLowerCase();
    if (sanitised.length === 0) {
      return badRequest("Invalid builder handle");
    }

    const builder = MOCK_BUILDERS.find(
      (b) => b.handle.toLowerCase() === sanitised
    );

    if (!builder) {
      return notFound(`Builder '${sanitised}'`);
    }

    const body: BuilderApiResponse = { builder };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("[GET /api/builders/[handle]]", err);
    return apiError("Internal server error", 500);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
