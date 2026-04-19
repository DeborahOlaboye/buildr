import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builders",
  description:
    "Browse and rank the top builders on the Stacks Bitcoin L2 network. Search by name, handle, or ecosystem.",
  keywords: [
    "Stacks builders",
    "Bitcoin L2 developers",
    "Clarity developers",
    "builder leaderboard",
    "STX developers",
  ],
  openGraph: {
    title: "Top Stacks Builders — Buildr",
    description:
      "Discover and rank the most active builders on Stacks. Filter by ecosystem, sort by rewards or all-time activity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Stacks Builders — Buildr",
    description:
      "Discover the most active Stacks developers earning $STX rewards.",
  },
};

export default function BuildersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
