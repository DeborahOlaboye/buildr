import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search — Buildr",
  description: "Search for builders and ecosystems on the Stacks Bitcoin L2 network.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
