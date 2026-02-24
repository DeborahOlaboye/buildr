import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Zap className="h-3 w-3" />
              </span>
              Buildr
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Builder rewards and ecosystem discovery for the Stacks Bitcoin L2
              network.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Rewards</Link></li>
              <li><Link href="/builders" className="hover:text-primary transition-colors">Builders</Link></li>
              <li><Link href="/ecosystems" className="hover:text-primary transition-colors">Ecosystems</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/api-docs" className="hover:text-primary transition-colors">API Docs</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/token" className="hover:text-primary transition-colors">Token</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/data-policy" className="hover:text-primary transition-colors">Data</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Buildr. Built for the Stacks ecosystem.</p>
          <p>Powered by Bitcoin.</p>
        </div>
      </div>
    </footer>
  );
}
