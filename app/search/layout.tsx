import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for builders, ecosystems, and projects on the Stacks Bitcoin L2 network.",
  keywords: ["search Stacks builders", "find ecosystem", "Stacks projects", "Bitcoin L2 search"],
  openGraph: {
    title: "Search — Buildr",
    description:
      "Find builders, ecosystems, and projects on the Stacks Bitcoin L2 network.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
