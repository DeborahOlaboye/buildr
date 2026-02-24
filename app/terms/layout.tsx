import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Buildr",
  description: "Read the Terms and Conditions governing your use of the Buildr platform on the Stacks Bitcoin L2 network.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
