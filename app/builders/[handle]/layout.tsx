import type { Metadata } from "next";

interface BuilderLayoutProps {
  children: React.ReactNode;
  params: Promise<{ handle: string }>;
}

async function getBuilder(handle: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${base}/api/builders/${encodeURIComponent(handle)}`, {
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
