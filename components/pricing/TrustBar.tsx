import React from "react";
import { ShieldCheck, RefreshCw, CreditCard, Zap } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    label: "7-day money-back guarantee",
  },
  {
    icon: <RefreshCw className="h-4 w-4" />,
    label: "Cancel anytime",
  },
  {
    icon: <CreditCard className="h-4 w-4" />,
    label: "Pay with USD or $STX",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    label: "Instant access on upgrade",
  },
];

export default function TrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <span className="text-primary">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}
