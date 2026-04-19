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
    "Stacks DAO",
    "Stacks Gaming",
  ],
  openGraph: {
    title: "Stacks Ecosystems — Buildr",
    description:
      "Explore DeFi, NFT, Gaming, Infrastructure, Social, and DAO projects building on Stacks Bitcoin L2.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacks Ecosystems — Buildr",
    description:
      "Explore projects and protocols building on Stacks Bitcoin L2.",
  },
};

export default function EcosystemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
