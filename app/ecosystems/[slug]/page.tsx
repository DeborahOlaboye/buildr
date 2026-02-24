import React from "react";
import { Separator } from "@/components/ui/separator";
import EcosystemDetailHero from "@/components/ecosystems/EcosystemDetailHero";
import EcosystemBuildersList from "@/components/ecosystems/EcosystemBuildersList";
import EcosystemNotFound from "@/components/ecosystems/EcosystemNotFound";
import { getInternalUrl } from "@/lib/config";

interface EcosystemDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getEcosystemDetail(slug: string) {
  const res = await fetch(getInternalUrl(`/api/ecosystems/${encodeURIComponent(slug)}`), {
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
