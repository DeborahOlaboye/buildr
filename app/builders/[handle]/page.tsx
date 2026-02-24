import React from "react";
import { Separator } from "@/components/ui/separator";
import BuilderProfileHero from "@/components/builders/BuilderProfileHero";
import BuilderStatGrid from "@/components/builders/BuilderStatGrid";
import BuilderNotFound from "@/components/builders/BuilderNotFound";
import { getInternalUrl } from "@/lib/config";

interface BuilderProfilePageProps {
  params: Promise<{ handle: string }>;
}

async function getBuilder(handle: string) {
  const res = await fetch(getInternalUrl(`/api/builders/${encodeURIComponent(handle)}`), {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.builder ?? null;
}

export default async function BuilderProfilePage({ params }: BuilderProfilePageProps) {
  const { handle } = await params;
  const builder = await getBuilder(handle);

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
