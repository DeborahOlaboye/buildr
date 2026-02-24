import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Endpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  example?: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/api/builders",
    description: "Returns a paginated list of builders sorted by monthly or all-time rewards.",
    params: [
      { name: "search", type: "string", required: false, description: "Filter by name, handle, or ecosystem" },
      { name: "sort", type: '"monthly" | "alltime"', required: false, description: "Sort order (default: monthly)" },
      { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
      { name: "limit", type: "10 | 25 | 50", required: false, description: "Results per page (default: 10)" },
    ],
    example: "/api/builders?sort=monthly&page=1&limit=10",
  },
  {
    method: "GET",
    path: "/api/builders/[handle]",
    description: "Returns a single builder profile by their unique handle.",
    example: "/api/builders/alexgm",
  },
  {
    method: "GET",
    path: "/api/ecosystems",
    description: "Returns a paginated list of ecosystems with optional category filtering.",
    params: [
      { name: "search", type: "string", required: false, description: "Filter by name or description" },
      { name: "category", type: "string", required: false, description: "Filter by category (DeFi, NFT, Gaming, etc.)" },
      { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
      { name: "limit", type: "number", required: false, description: "Results per page (default: 25)" },
    ],
    example: "/api/ecosystems?category=DeFi",
  },
  {
    method: "GET",
    path: "/api/ecosystems/[slug]",
    description: "Returns a single ecosystem and its associated builders.",
    example: "/api/ecosystems/alex-defi",
  },
  {
    method: "GET",
    path: "/api/rewards",
    description: "Returns the current active reward program, top 10 builders, total builder count, and FAQ items.",
    example: "/api/rewards",
  },
  {
    method: "GET",
    path: "/api/activity",
    description: "Returns recent platform activity feed items.",
    params: [
      { name: "limit", type: "number", required: false, description: "Max items to return (default: 20, max: 100)" },
    ],
    example: "/api/activity?limit=20",
  },
  {
    method: "GET",
    path: "/api/search",
    description: "Unified search across builders and ecosystems.",
    params: [
      { name: "q", type: "string", required: true, description: "Search query" },
    ],
    example: "/api/search?q=alex",
  },
  {
    method: "GET",
    path: "/api/pricing",
    description: "Returns all pricing tiers, feature comparison data, and FAQ items.",
    example: "/api/pricing",
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function ApiDocsPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground">
          The Buildr REST API lets you access builder profiles, leaderboard data, ecosystem stats,
          and reward program information. All endpoints return JSON and require no authentication
          for read access.
        </p>
      </div>

      {/* Base URL */}
      <div className="rounded-lg border p-4 bg-muted/30">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 font-medium">Base URL</p>
        <code className="text-sm font-mono text-foreground">https://buildr.app</code>
      </div>

      {/* Endpoints */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Endpoints</h2>
        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className="rounded-xl border overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 border-b">
              <span
                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold font-mono ${
                  METHOD_COLORS[ep.method]
                }`}
              >
                {ep.method}
              </span>
              <code className="text-sm font-mono font-medium">{ep.path}</code>
            </div>
            {/* Body */}
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">{ep.description}</p>

              {ep.params && ep.params.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Query Parameters
                  </p>
                  <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">Name</th>
                          <th className="px-3 py-2 text-left font-medium">Type</th>
                          <th className="px-3 py-2 text-left font-medium">Required</th>
                          <th className="px-3 py-2 text-left font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ep.params.map((p) => (
                          <tr key={p.name} className="border-t">
                            <td className="px-3 py-2 font-mono font-medium">{p.name}</td>
                            <td className="px-3 py-2 text-muted-foreground font-mono">{p.type}</td>
                            <td className="px-3 py-2">
                              {p.required ? (
                                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">required</Badge>
                              ) : (
                                <span className="text-muted-foreground">optional</span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-muted-foreground">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {ep.example && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Example</p>
                  <code className="block text-xs font-mono bg-muted rounded-lg px-3 py-2 text-foreground break-all">
                    {ep.example}
                  </code>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="rounded-xl border-2 border-dashed border-muted p-8 text-center space-y-2">
        <p className="font-medium">Rate limiting &amp; authentication</p>
        <p className="text-sm text-muted-foreground">
          Public read endpoints have a rate limit of 60 requests per minute per IP.
          Authenticated endpoints (coming soon) will support API keys for higher limits.
          Contact <span className="text-primary">api@buildr.app</span> for early access.
        </p>
      </div>
    </div>
  );
}
