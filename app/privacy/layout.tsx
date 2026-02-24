import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Buildr",
  description: "Learn how Buildr collects, uses, and protects your personal data on the Stacks Bitcoin L2 network.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
