import { NextResponse } from "next/server";
import { publicConfig } from "@/lib/config";

interface HealthResponse {
  status: "ok";
  timestamp: string;
  version: string;
  environment: string;
  liveData: boolean;
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const body: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
    environment: process.env.NODE_ENV ?? "development",
    liveData: publicConfig.enableLiveData,
  };
  return NextResponse.json(body);
}
