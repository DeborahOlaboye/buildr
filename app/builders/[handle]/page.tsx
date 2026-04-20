import React from "react";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import BuilderProfileHero from "@/components/builders/BuilderProfileHero";
import BuilderStatGrid from "@/components/builders/BuilderStatGrid";
import BuilderNotFound from "@/components/builders/BuilderNotFound";
import { MOCK_BUILDERS } from "@/lib/mock-data";

interface BuilderProfilePageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: BuilderProfilePageProps): Promise<Metadata> {
  const { handle } = await params;
  const builder = MOCK_BUILDERS.find(
    (b) => b.handle.toLowerCase() === handle.toLowerCase()
  );

  if (!builder) {
    return { title: `Builder @${handle} not found` };
  }

  return {
    title: `@${builder.handle} — ${builder.name}`,
    description: builder.bio ||
      `View ${builder.name}'s builder profile on Buildr. Rank #${builder.rank} with ${builder.contractsDeployed} contracts deployed.`,
    openGraph: {
      title: `${builder.name} (@${builder.handle}) — Buildr`,
      description: `Stacks builder rank #${builder.rank}. ${builder.contractsDeployed} contracts deployed, ${builder.githubContributions} GitHub contributions.`,
      type: "profile",
    },
    alternates: {
      canonical: `/builders/${builder.handle}`,
    },
  };
}

export default async function BuilderProfilePage({ params }: BuilderProfilePageProps) {
  const { handle } = await params;
  const builder = MOCK_BUILDERS.find(
    (b) => b.handle.toLowerCase() === handle.toLowerCase()
  ) ?? null;

  if (!builder) {
    return <BuilderNotFound handle={handle} />;
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <BuilderProfileHero builder={builder} />
      <Separator />
      <BuilderStatGrid builder={builder} />
    </div>
  );
}
