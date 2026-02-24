import React from "react";
import { Wallet, Github, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StartEarningCTA() {
  return (
    <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-6 space-y-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
        <Zap className="h-6 w-6 text-primary" />
      </div>

      <div>
        <h3 className="font-semibold text-base">Start Earning</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Buildr tracks your onchain and GitHub activity on Stacks. Connect your
          Bitcoin L2 wallet and GitHub profile to start earning rewards.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
        <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
          <Github className="h-4 w-4" />
          Connect GitHub
        </Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
        Already connected?
        <button className="text-primary hover:underline inline-flex items-center gap-0.5">
          View my activity <ArrowRight className="h-3 w-3" />
        </button>
      </p>
    </div>
  );
}
