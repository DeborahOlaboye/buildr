"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

const CONNECT_HREF = "/connect";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const desktopInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill search input when on the /search page
  useEffect(() => {
    if (pathname === "/search") {
      const q = searchParams.get("q") ?? "";
      setSearchValue(q);
      setMobileSearchValue(q);
      if (q) setSearchOpen(true);
    }
  }, [pathname, searchParams]);

  // Cmd/Ctrl+K shortcut to open and focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => desktopInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, mobileOpen]);

  function handleDesktopSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
    }
  }

  function handleMobileSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = mobileSearchValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setMobileOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" aria-label="Site header">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl" aria-label="Buildr home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground" aria-hidden="true">
            <Zap className="h-4 w-4" />
          </span>
          <span>Buildr</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
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
            <form onSubmit={handleDesktopSubmit} className="flex items-center gap-2">
              <div className="relative">
                <Input
                  ref={desktopInputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search builders, projects…"
                  className="w-56 pr-16"
                  autoFocus
                  aria-label="Search"
                />
                <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-60 sm:flex">
                  ESC
                </kbd>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => { setSearchOpen(false); setSearchValue(""); }}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { setSearchOpen(true); setTimeout(() => desktopInputRef.current?.focus(), 50); }}
              aria-label="Open search (⌘K)"
              title="Search (⌘K)"
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
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div id="mobile-nav" className="md:hidden border-t bg-background">
          <nav className="container flex flex-col py-4 gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
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
              <form onSubmit={handleMobileSubmit} className="flex items-center gap-2 px-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    value={mobileSearchValue}
                    onChange={(e) => setMobileSearchValue(e.target.value)}
                    placeholder="Search builders, projects…"
                    className="pl-9"
                    aria-label="Mobile search"
                  />
                </div>
                <Button type="submit" size="sm">Go</Button>
              </form>
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
