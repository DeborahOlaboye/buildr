import type { Metadata } from "next";
import { getInternalUrl } from "@/lib/config";

interface EcosystemSlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

async function getEcosystem(slug: string) {
  const res = await fetch(getInternalUrl(`/api/ecosystems/${encodeURIComponent(slug)}`), {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.ecosystem ?? null;
}

export async function generateMetadata({ params }: EcosystemSlugLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const ecosystem = await getEcosystem(slug);

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
