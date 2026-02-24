import { NextRequest, NextResponse } from "next/server";
import { MOCK_BUILDERS } from "@/lib/mock-data";
import type { BuilderApiResponse } from "@/types";

interface RouteContext {
  params: Promise<{ handle: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { handle } = await params;

  const builder = MOCK_BUILDERS.find(
    (b) => b.handle.toLowerCase() === handle.toLowerCase()
  );

  if (!builder) {
    return NextResponse.json(
      { error: `Builder '${handle}' not found` },
      { status: 404 }
    );
  }

  const body: BuilderApiResponse = { builder };
  return NextResponse.json(body);
}
