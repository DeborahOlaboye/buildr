import React from "react";
import Link from "next/link";
import { PackageX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EcosystemNotFoundProps {
  slug: string;
}

export default function EcosystemNotFound({ slug }: EcosystemNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-5 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <PackageX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Ecosystem not found</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          No ecosystem with the slug{" "}
          <span className="font-mono text-foreground">{slug}</span> exists on
          Buildr yet.
        </p>
      </div>
      <Button variant="outline" asChild>
        <Link href="/ecosystems">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Ecosystems
        </Link>
      </Button>
    </div>
  );
}
