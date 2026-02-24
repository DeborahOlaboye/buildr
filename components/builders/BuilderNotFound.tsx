import React from "react";
import Link from "next/link";
import { UserX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderNotFoundProps {
  handle: string;
}

export default function BuilderNotFound({ handle }: BuilderNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-5 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <UserX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Builder not found</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          No builder with the handle{" "}
          <span className="font-mono text-foreground">@{handle}</span> exists on
          Buildr yet.
        </p>
      </div>
      <Button variant="outline" asChild>
        <Link href="/builders">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Leaderboard
        </Link>
      </Button>
    </div>
  );
}
