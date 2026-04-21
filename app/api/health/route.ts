import { NextResponse } from "next/server";
import { publicConfig } from "@/lib/config";
import { apiError } from "@/lib/api-helpers";

interface HealthResponse {
  status: "ok";
  timestamp: string;
  version: string;
  environment: string;
  liveData: boolean;
}

export async function GET(): Promise<NextResponse<HealthResponse | { error: string; status: number }>> {
  try {
    const body: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? "0.1.0",
      environment: process.env.NODE_ENV ?? "development",
      liveData: publicConfig.enableLiveData,
    };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[GET /api/health]", err);
    return apiError("Health check failed", 503);
  }
}

export function POST(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function PUT(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
export function DELETE(): NextResponse { return apiError("Method not allowed", 405) as NextResponse; }
