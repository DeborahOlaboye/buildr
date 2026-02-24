import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STX Token — Buildr",
  description: "Learn about STX, the native token of the Stacks Bitcoin L2 network, and how it powers builder rewards on Buildr.",
};

export default function TokenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
