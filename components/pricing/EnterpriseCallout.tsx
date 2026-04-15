import React from "react";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnterpriseCallout() {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-muted/60 to-muted/20 p-8 text-center space-y-4">
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-3">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Building an ecosystem on Stacks?</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          Enterprise plans include custom reward programs, ecosystem spotlight placement, dedicated onboarding, and unlimited API access. Let&apos;s build together.
        </p>
        <Button className="mt-5 gap-2" asChild>
          <a href="mailto:hello@buildr.xyz">
            Contact our team <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
