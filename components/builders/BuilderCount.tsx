import React from "react";
import { Users } from "lucide-react";

interface BuilderCountProps {
  count: number;
  filtered?: boolean;
}

export default function BuilderCount({ count, filtered }: BuilderCountProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>
        <span className="font-semibold text-foreground">
          {count.toLocaleString()}
        </span>{" "}
        {filtered ? "result" : "Profile"}
        {count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
