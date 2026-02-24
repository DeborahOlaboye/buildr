import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Policy — Buildr",
  description: "Understand how Buildr processes and stores onchain and GitHub data for the builder rewards program.",
};

export default function DataPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
