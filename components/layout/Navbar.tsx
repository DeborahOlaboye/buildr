"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

// Simulate subscription state — swap for real auth context when ready
const IS_PRO = false;

const NAV_LINKS = [
  { href: "/", label: "Rewards" },
  { href: "/builders", label: "Builders" },
  { href: "/ecosystems", label: "Ecosystems" },
  { href: "/pricing", label: "Pricing" },
];

// Connect CTA shown when the user is not yet connected/authenticated
const CONNECT_HREF = "/connect";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          <span>Buildr</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search builders, projects…"
                className="w-56"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
          <ThemeToggle />
          {IS_PRO ? (
            <div className="flex items-center gap-1.5">
              <Badge className="gap-1 text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">
                <Star className="h-3 w-3 fill-primary" />
                Stacks+ Member
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-xs" asChild>
                <Link href={CONNECT_HREF}>Connect Wallet</Link>
              </Button>
              <Button size="sm" className="gap-1.5" asChild>
                <Link href="/pricing">
                  <Zap className="h-3.5 w-3.5" />
                  Join Stacks+
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                  pathname === link.href
                    ? "bg-muted text-primary"
                    : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t mt-2">
              <div className="flex items-center gap-2 px-1">
                <Input placeholder="Search builders, projects…" />
              </div>
              {IS_PRO ? (
                <div className="flex items-center justify-center gap-1.5 mt-3 py-2 rounded-md bg-primary/10 border border-primary/20">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-sm font-medium text-primary">Stacks+ Member</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-3">
                  <Button variant="outline" className="w-full gap-1.5" asChild>
                    <Link href={CONNECT_HREF} onClick={() => setMobileOpen(false)}>
                      Connect Wallet
                    </Link>
                  </Button>
                  <Button className="w-full gap-1.5" asChild>
                    <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                      <Zap className="h-3.5 w-3.5" />
                      Join Stacks+
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
