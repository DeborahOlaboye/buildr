import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Buildr",
  description: "Updates, announcements, and insights from the Buildr team about building on Stacks Bitcoin L2.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
