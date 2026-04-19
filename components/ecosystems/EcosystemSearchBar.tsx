"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { debounce } from "@/lib/utils";

interface EcosystemSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EcosystemSearchBar({ value, onChange }: EcosystemSearchBarProps) {
  const [local, setLocal] = useState(value);

  const debouncedChange = useRef(
    debounce((v: string) => onChange(v), 300)
  ).current;

  useEffect(() => { setLocal(value); }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocal(e.target.value);
    debouncedChange(e.target.value);
  }

  function handleClear() {
    setLocal("");
    onChange("");
  }

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
      <Input
        value={local}
        onChange={handleChange}
        placeholder="Search builders, projects, ecosystems…"
        className="pl-9 pr-9"
        aria-label="Search builders, projects, ecosystems"
        role="searchbox"
      />
      {local && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-transparent"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
