import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Buildr | Stacks+ Membership",
  description:
    "Choose the Stacks+ membership tier that fits your building journey. Unlock advanced analytics, exclusive STX reward programs, and priority leaderboard visibility.",
  keywords: [
    "Stacks+",
    "Buildr pricing",
    "STX rewards",
    "builder membership",
    "Stacks Bitcoin",
    "blockchain builder",
    "STX subscription",
  ],
  openGraph: {
    title: "Stacks+ Membership Pricing — Buildr",
    description:
      "Unlock exclusive STX reward programs, verified builder badges, and deep analytics. Choose Free, Stacks+, or Enterprise.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacks+ Membership Pricing — Buildr",
    description:
      "Unlock exclusive STX rewards and analytics. Choose Free, Pro, or Enterprise.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
