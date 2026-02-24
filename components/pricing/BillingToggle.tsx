"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { BillingCycle } from "@/types";

interface BillingToggleProps {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
  discountPercent?: number;
}

export default function BillingToggle({
  value,
  onChange,
  discountPercent = 20,
}: BillingToggleProps) {
  const isAnnual = value === "annual";

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Monthly
      </span>

      <Switch
        checked={isAnnual}
        onCheckedChange={(checked) => onChange(checked ? "annual" : "monthly")}
        aria-label="Toggle annual billing"
      />

      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-medium transition-colors ${
            isAnnual ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Annual
        </span>
        {isAnnual && (
          <Badge variant="default" className="text-[10px] px-1.5 py-0.5 bg-green-500 hover:bg-green-500 text-white">
            Save {discountPercent}%
          </Badge>
        )}
        {!isAnnual && (
          <span className="text-xs text-muted-foreground border border-dashed rounded-full px-2 py-0.5">
            Save {discountPercent}%
          </span>
        )}
      </div>
    </div>
  );
}
