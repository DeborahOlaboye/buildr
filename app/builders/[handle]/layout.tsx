import type { Metadata } from "next";
import { getInternalUrl } from "@/lib/config";

interface BuilderLayoutProps {
  children: React.ReactNode;
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

export async function generateMetadata({ params }: BuilderLayoutProps): Promise<Metadata> {
  const { handle } = await params;
  const builder = await getBuilder(handle);

  if (!builder) {
    return {
      title: "Builder Not Found — Buildr",
      description: "This builder profile does not exist on Buildr.",
    };
  }

  return {
    title: `${builder.name} (@${builder.handle}) — Buildr`,
    description: builder.bio,
    openGraph: {
      title: `${builder.name} on Buildr`,
      description: `Rank #${builder.rank} · ${builder.monthlyReward} STX this cycle · ${builder.contractsDeployed} contracts deployed`,
      type: "profile",
    },
  };
}

export default function BuilderProfileLayout({ children }: BuilderLayoutProps) {
  return <>{children}</>;
}
