import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest updates, guides, and announcements from Buildr — the Stacks builder rewards platform.",
  keywords: [
    "Stacks blog",
    "Bitcoin L2 builders",
    "builder rewards news",
    "Clarity development",
  ],
  openGraph: {
    title: "Buildr Blog — Stacks Builder Updates",
    description:
      "Latest news, guides, and announcements from the Buildr team.",
    type: "website",
  },
};

const POSTS = [
  {
    slug: "introducing-buildr",
    title: "Introducing Buildr: Builder Rewards for the Stacks Ecosystem",
    excerpt:
      "We&apos;re launching Buildr — a platform that tracks onchain activity and GitHub contributions from Stacks developers and distributes monthly $STX rewards to the most active builders.",
    category: "Announcement",
    date: "January 15, 2025",
    readTime: "4 min read",
  },
  {
    slug: "how-rewards-are-calculated",
    title: "How Monthly $STX Rewards Are Calculated",
    excerpt:
      "A deep dive into our reward scoring algorithm — how we weight smart contract deployments, GitHub contributions, and ecosystem participation to determine monthly payouts.",
    category: "Guide",
    date: "January 22, 2025",
    readTime: "6 min read",
  },
  {
    slug: "stacks-plus-launch",
    title: "Announcing Stacks+: Premium Analytics for Serious Builders",
    excerpt:
      "Stacks+ gives serious builders deeper insights into their onchain performance, advanced analytics dashboards, a verified badge, and priority support.",
    category: "Product",
    date: "February 1, 2025",
    readTime: "3 min read",
  },
  {
    slug: "q1-2025-rewards-recap",
    title: "Q1 2025 Rewards Recap: 500K STX Distributed to 847 Builders",
    excerpt:
      "We&apos;re thrilled to share the results of our first full quarter of builder rewards. Here&apos;s a breakdown of who earned the most, which ecosystems were most active, and what&apos;s coming next.",
    category: "Recap",
    date: "February 10, 2025",
    readTime: "8 min read",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Announcement: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Guide: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Product: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Recap: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function BlogPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Updates, guides, and announcements from the Buildr team.
        </p>
      </div>

      <div className="space-y-6">
        {POSTS.map((post) => (
          <article
            key={post.slug}
            className="group rounded-xl border p-6 hover:border-primary/50 transition-colors space-y-3"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground"
                }`}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h2>
            <p
              className="text-sm text-muted-foreground line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              Read more <ArrowRight className="h-4 w-4" />
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-xl border-2 border-dashed border-muted p-8 text-center space-y-2">
        <p className="font-medium">More posts coming soon</p>
        <p className="text-sm text-muted-foreground">
          Follow us on{" "}
          <a
            href="https://twitter.com/buildr_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            aria-label="Buildr on Twitter (opens in new tab)"
          >
            Twitter
          </a>{" "}
          for the latest updates.
        </p>
      </div>
    </div>
  );
}
