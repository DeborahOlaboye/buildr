import { NextResponse } from "next/server";

export interface ApiErrorBody {
  error: string;
  status: number;
}

/** Return a JSON error response with the given status code. */
export function apiError(message: string, status: number): NextResponse<ApiErrorBody> {
  return NextResponse.json({ error: message, status }, { status });
}

/** Parse a query-string integer, returning `fallback` if the value is absent or NaN. */
export function parseIntParam(value: string | null, fallback: number): number {
  if (value === null) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Clamp a number between min and max (inclusive). */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
