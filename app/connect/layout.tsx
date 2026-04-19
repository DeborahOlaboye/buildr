import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect — Join Buildr",
  description:
    "Connect your Stacks wallet and GitHub to start earning $STX rewards for your onchain contributions.",
  keywords: [
    "connect Stacks wallet",
    "link GitHub Stacks",
    "earn STX rewards",
    "join Buildr",
  ],
  openGraph: {
    title: "Connect Your Wallet & GitHub — Buildr",
    description:
      "Link your Bitcoin L2 wallet and GitHub to start earning $STX rewards for building on Stacks.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect & Earn — Buildr",
    description: "Link your Stacks wallet and GitHub to earn $STX builder rewards.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
