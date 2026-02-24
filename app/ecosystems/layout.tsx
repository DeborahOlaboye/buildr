import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystems",
  description:
    "Discover projects, protocols, and ecosystems building on the Stacks Bitcoin L2 network — DeFi, NFT, Gaming, Infrastructure, Social, and DAO.",
  keywords: [
    "Stacks ecosystems",
    "Bitcoin L2 projects",
    "Stacks DeFi",
    "Stacks NFT",
    "Clarity protocols",
  ],
};

export default function EcosystemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
