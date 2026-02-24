import React from "react";
import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/data-policy", label: "Data Policy" },
];

interface LegalLinksBarProps {
  /** Slug of the current page to exclude from the links */
  current: "/privacy" | "/terms" | "/data-policy";
}

export default function LegalLinksBar({ current }: LegalLinksBarProps) {
  const links = LEGAL_LINKS.filter((l) => l.href !== current);
  return (
    <div className="border-t pt-6 flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="hover:text-primary transition-colors">
          {l.label}
        </Link>
      ))}
    </div>
  );
}
