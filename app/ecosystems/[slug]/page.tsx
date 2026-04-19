import React from "react";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import EcosystemDetailHero from "@/components/ecosystems/EcosystemDetailHero";
import EcosystemBuildersList from "@/components/ecosystems/EcosystemBuildersList";
import EcosystemNotFound from "@/components/ecosystems/EcosystemNotFound";
import { MOCK_ECOSYSTEMS, MOCK_BUILDERS } from "@/lib/mock-data";

interface EcosystemDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EcosystemDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ecosystem = MOCK_ECOSYSTEMS.find(
    (e) => e.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!ecosystem) {
    return { title: `Ecosystem '${slug}' not found` };
  }

  return {
    title: ecosystem.name,
    description: ecosystem.description ||
      `Explore ${ecosystem.name} — a ${ecosystem.category} project building on Stacks Bitcoin L2 with ${ecosystem.builderCount} active builders.`,
    openGraph: {
      title: `${ecosystem.name} — Stacks Ecosystem on Buildr`,
      description: `${ecosystem.category} project with ${ecosystem.builderCount} active builders on Stacks.`,
      type: "website",
    },
  };
}

export default async function EcosystemDetailPage({ params }: EcosystemDetailPageProps) {
  const { slug } = await params;
  const ecosystem = MOCK_ECOSYSTEMS.find(
    (e) => e.slug.toLowerCase() === slug.toLowerCase()
  ) ?? null;

  if (!ecosystem) {
    return <EcosystemNotFound slug={slug} />;
  }

  const builders = MOCK_BUILDERS.filter((b) =>
    b.ecosystem.includes(ecosystem.category)
  ).sort((a, b) => a.rank - b.rank);

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <EcosystemDetailHero ecosystem={ecosystem} />
      <Separator />
      <EcosystemBuildersList builders={builders} ecosystemName={ecosystem.name} />
    </div>
  );
}
