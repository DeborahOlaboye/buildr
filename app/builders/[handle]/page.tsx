import React from "react";
import { Separator } from "@/components/ui/separator";
import BuilderProfileHero from "@/components/builders/BuilderProfileHero";
import BuilderStatGrid from "@/components/builders/BuilderStatGrid";
import BuilderNotFound from "@/components/builders/BuilderNotFound";
import { MOCK_BUILDERS } from "@/lib/mock-data";

interface BuilderProfilePageProps {
  params: Promise<{ handle: string }>;
}

export default async function BuilderProfilePage({ params }: BuilderProfilePageProps) {
  const { handle } = await params;
  const builder = MOCK_BUILDERS.find(
    (b) => b.handle.toLowerCase() === handle.toLowerCase()
  );

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
