import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect — Join Buildr",
  description:
    "Connect your Stacks wallet and GitHub to start earning $STX rewards for your onchain contributions.",
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
