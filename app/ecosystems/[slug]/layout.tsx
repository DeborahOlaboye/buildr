import React from "react";
import type { Metadata } from "next";
import { MOCK_ECOSYSTEMS } from "@/lib/mock-data";

interface EcosystemSlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EcosystemSlugLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const ecosystem = MOCK_ECOSYSTEMS.find(
    (e) => e.slug.toLowerCase() === slug.toLowerCase()
  ) ?? null;

  if (!ecosystem) {
    return {
      title: "Ecosystem Not Found — Buildr",
      description: "This ecosystem does not exist on Buildr.",
    };
  }

  return {
    title: `${ecosystem.name} — Buildr Ecosystems`,
    description: ecosystem.description,
    keywords: [ecosystem.name, ecosystem.category, "Stacks", "Bitcoin L2", "builders", "TVL"],
    openGraph: {
      title: `${ecosystem.name} on Buildr`,
      description: `${ecosystem.builderCount} builders · ${ecosystem.category} · ${ecosystem.description}`,
      type: "website",
    },
  };
}

export default function EcosystemSlugLayout({ children }: EcosystemSlugLayoutProps) {
  return <>{children}</>;
}
