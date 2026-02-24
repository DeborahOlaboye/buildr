import React from "react";
import { Zap, Shield, TrendingUp } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "STX-Gated Access",
    desc: "Premium tiers unlock exclusive $STX reward programs and boosted ranking.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    title: "Advanced Analytics",
    desc: "Deep-dive into your onchain activity and see exactly how your score is calculated.",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Verified Builder Badge",
    desc: "Stand out on the leaderboard with a verified checkmark and priority visibility.",
  },
];

export default function PricingHeader() {
  return (
    <section className="text-center space-y-6 py-4">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
        <Zap className="h-3 w-3" />
        Stacks+ Membership
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Build more. Earn more.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Unlock advanced analytics, exclusive reward programs, and priority
          leaderboard visibility — powered by your $STX contributions.
        </p>
      </div>

      {/* Highlight pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-4">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.title}
            className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center"
          >
            {h.icon}
            <span className="text-sm font-semibold">{h.title}</span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              {h.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
