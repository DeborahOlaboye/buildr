import React from "react";
import { Separator } from "@/components/ui/separator";
import EcosystemDetailHero from "@/components/ecosystems/EcosystemDetailHero";
import EcosystemBuildersList from "@/components/ecosystems/EcosystemBuildersList";
import EcosystemNotFound from "@/components/ecosystems/EcosystemNotFound";

interface EcosystemDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getEcosystemDetail(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${base}/api/ecosystems/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function EcosystemDetailPage({ params }: EcosystemDetailPageProps) {
  const { slug } = await params;
  const detail = await getEcosystemDetail(slug);

  if (!detail) {
    return <EcosystemNotFound slug={slug} />;
  }

  const { ecosystem, builders } = detail;

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <EcosystemDetailHero ecosystem={ecosystem} />
      <Separator />
      <EcosystemBuildersList builders={builders} ecosystemName={ecosystem.name} />
    </div>
  );
}
