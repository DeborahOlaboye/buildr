import type { Metadata } from "next";
import { MOCK_BUILDERS } from "@/lib/mock-data";

interface BuilderLayoutProps {
  children: React.ReactNode;
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: BuilderLayoutProps): Promise<Metadata> {
  const { handle } = await params;
  const builder = MOCK_BUILDERS.find(
    (b) => b.handle.toLowerCase() === handle.toLowerCase()
  );

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
