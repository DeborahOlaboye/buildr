import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builders",
  description:
    "Browse and rank the top builders on the Stacks Bitcoin L2 network. Search by name, handle, or ecosystem.",
};

export default function BuildersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
