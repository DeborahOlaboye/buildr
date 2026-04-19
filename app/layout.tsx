import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  APP_URL,
  SEO_SITE_NAME,
  SEO_LOCALE,
  SEO_TWITTER_HANDLE,
  SEO_DEFAULT_TITLE,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_KEYWORDS,
  SEO_OG_IMAGE,
} from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: SEO_DEFAULT_TITLE,
    template: `%s | ${SEO_SITE_NAME}`,
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: SEO_DEFAULT_KEYWORDS,
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description:
      "Earn $STX rewards by building on Stacks. Connect your Bitcoin L2 wallet and GitHub to get ranked.",
    type: "website",
    url: APP_URL,
    siteName: SEO_SITE_NAME,
    locale: SEO_LOCALE,
    images: [
      {
        url: SEO_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SEO_SITE_NAME} — Stacks Builder Rewards`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SEO_TWITTER_HANDLE,
    creator: SEO_TWITTER_HANDLE,
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [SEO_OG_IMAGE],
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
