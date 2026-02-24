import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Docs — Buildr",
  description: "Explore the Buildr REST API to access builder profiles, leaderboard data, ecosystem stats, and reward programs.",
};

export default function ApiDocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
