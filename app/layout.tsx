import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Buildr — Stacks Builder Rewards",
    template: "%s | Buildr",
  },
  description:
    "Track onchain activity and GitHub contributions on Stacks. Earn $STX rewards as a top Bitcoin L2 builder.",
  keywords: ["Stacks", "Bitcoin L2", "builder rewards", "STX", "Clarity", "smart contracts"],
  openGraph: {
    title: "Buildr — Stacks Builder Rewards",
    description:
      "Earn $STX rewards by building on Stacks. Connect your Bitcoin L2 wallet and GitHub to get ranked.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system">
          <div className="min-h-screen flex flex-col">
            {/* Skip to main content — visible on focus for keyboard/screen reader users */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Suspense>
              <Navbar />
            </Suspense>
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
