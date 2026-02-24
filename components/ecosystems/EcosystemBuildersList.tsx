import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatSTX } from "@/lib/utils";
import type { Builder } from "@/types";

interface EcosystemBuildersListProps {
  builders: Builder[];
  ecosystemName: string;
}

function BuilderRow({ builder }: { builder: Builder }) {
  const initials = builder.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      href={`/builders/${builder.handle}`}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group"
    >
      <span className="text-xs font-mono text-muted-foreground w-6 text-right shrink-0">
        #{builder.rank}
      </span>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={builder.avatarUrl} alt={builder.name} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium truncate">{builder.name}</span>
          {builder.isVerified && (
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          )}
        </div>
        <span className="text-xs text-muted-foreground">@{builder.handle}</span>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-primary">
          {formatSTX(builder.monthlyReward)}
        </p>
        <p className="text-xs text-muted-foreground">this cycle</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Link>
  );
}

export default function EcosystemBuildersList({
  builders,
  ecosystemName,
}: EcosystemBuildersListProps) {
  if (builders.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Builders in {ecosystemName}</h2>
        <div className="rounded-xl border bg-muted/20 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No builders tracked in this ecosystem yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">
          Builders in {ecosystemName}
        </h2>
        <span className="text-xs text-muted-foreground">
          {builders.length} builder{builders.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="rounded-xl border overflow-hidden divide-y">
        {builders.map((builder) => (
          <BuilderRow key={builder.id} builder={builder} />
        ))}
      </div>
    </div>
  );
}
