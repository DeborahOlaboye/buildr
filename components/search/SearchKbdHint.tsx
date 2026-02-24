import React from "react";

/**
 * Small keyboard shortcut hint chip shown next to the search icon.
 * Visible only on desktop (md+).
 */
export default function SearchKbdHint() {
  return (
    <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground select-none">
      <span className="text-xs">⌘</span>K
    </kbd>
  );
}
